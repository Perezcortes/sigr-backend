import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { Rental, InquilinoPf, InquilinoPm, ObligadoSolidarioPf, ObligadoSolidarioPm, PropietarioPf, PropietarioPm, Propiedad } from "./entities";
import { PostalCodesService } from "../postal-codes/postal-codes.service";

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(InquilinoPf)
    private readonly inquilinoPfRepository: Repository<InquilinoPf>,
    @InjectRepository(InquilinoPm)
    private readonly inquilinoPmRepository: Repository<InquilinoPm>,
    @InjectRepository(ObligadoSolidarioPf)
    private readonly obligadoPfRepository: Repository<ObligadoSolidarioPf>,
    @InjectRepository(ObligadoSolidarioPm)
    private readonly obligadoPmRepository: Repository<ObligadoSolidarioPm>,
    @InjectRepository(PropietarioPf)
    private readonly propietarioPfRepository: Repository<PropietarioPf>,
    @InjectRepository(PropietarioPm)
    private readonly propietarioPmRepository: Repository<PropietarioPm>,
    @InjectRepository(Propiedad)
    private readonly propiedadRepository: Repository<Propiedad>,
    private readonly postalCodesService: PostalCodesService,
  ) {}

  async createManualRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    //console.log("DATOS RECIBIDOS EN createManualRental:", JSON.stringify(createRentalDto, null, 2));
    const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validar código postal de la propiedad
      if (createRentalDto.propiedad?.cp) {
        await this.validatePostalCode(createRentalDto.propiedad.cp);
      }

      // Crear la renta principal
      const rental = this.rentalRepository.create({
        tipoInquilino: createRentalDto.tipoInquilino,
        tipoObligado: createRentalDto.tipoObligado || "fisica", // Valor por defecto
        tipoPropietario: createRentalDto.tipoPropietario || "fisica", // Valor por defecto
        tipoPropiedad: createRentalDto.tipoPropiedad || "casa", // Valor por defecto
        observaciones: createRentalDto.observaciones,
        usuarioCreacion: createRentalDto.usuarioCreacion,
        estado: "pendiente",
      });

      const savedRental = await queryRunner.manager.save(rental);

      // Crear propiedad si se proporciona
      if (createRentalDto.propiedad) {
        const propiedad = this.propiedadRepository.create({
          ...createRentalDto.propiedad,
          rentaId: savedRental.id,
          tipoPropiedad: createRentalDto.tipoPropiedad,
        });
        await queryRunner.manager.save(propiedad);
      }

      // Crear inquilino según el tipo
      if (createRentalDto.tipoInquilino === "fisica" && createRentalDto.inquilinoPf) {
        //console.log("CREANDO INQUILINO PF:", createRentalDto.inquilinoPf);
        await this.createInquilinoPersonaFisica(savedRental.id, createRentalDto.inquilinoPf, queryRunner);
      } else if (createRentalDto.tipoInquilino === "moral" && createRentalDto.inquilinoPm) {
        await this.createInquilinoPersonaMoral(savedRental.id, createRentalDto.inquilinoPm, queryRunner);
      }

      // Crear propietario según el tipo (datos básicos por defecto)
      if (createRentalDto.tipoPropietario === "fisica" && createRentalDto.propietarioPf) {
        const propietarioPf = this.propietarioPfRepository.create({
          ...createRentalDto.propietarioPf,
          rentaId: savedRental.id,
        });
        await queryRunner.manager.save(propietarioPf);
      } else if (createRentalDto.tipoPropietario === "moral" && createRentalDto.propietarioPm) {
        const propietarioPm = this.propietarioPmRepository.create({
          ...createRentalDto.propietarioPm,
          rentaId: savedRental.id,
        });
        await queryRunner.manager.save(propietarioPm);
      }

      await queryRunner.commitTransaction();
      return await this.findOneRental(savedRental.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error al crear la renta: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  // Método auxiliar para crear inquilino persona física
  private async createInquilinoPersonaFisica(rentaId: string, inquilinoPfData: any, queryRunner: any): Promise<void> {
    console.log("DATOS RECIBIDOS EN createInquilinoPersonaFisica:", JSON.stringify(inquilinoPfData, null, 2));
    // Verificar la estructura
    if (!inquilinoPfData.datosPersonales) {
      console.log("ERROR: datosPersonales es undefined");
      console.log("Estructura actual de inquilinoPfData:", Object.keys(inquilinoPfData));

      // Si viene con estructura plana, adaptarnos temporalmente
      if (inquilinoPfData.nombres) {
        //console.log("Los datos vienen en estructura plana, adaptando...");
        inquilinoPfData = {
          datosPersonales: {
            nombres: inquilinoPfData.nombres,
            apellidoPaterno: inquilinoPfData.apellidoPaterno,
            apellidoMaterno: inquilinoPfData.apellidoMaterno,
            nacionalidad: inquilinoPfData.nacionalidad,
            nacionalidadEspecifique: inquilinoPfData.nacionalidadEspecifique,
            sexo: inquilinoPfData.sexo,
            estadoCivil: inquilinoPfData.estadoCivil,
            email: inquilinoPfData.email,
            tipoIdentificacion: inquilinoPfData.tipoIdentificacion,
            fechaNacimiento: inquilinoPfData.fechaNacimiento,
            rfc: inquilinoPfData.rfc,
            curp: inquilinoPfData.curp,
            telefonoCelular: inquilinoPfData.telefonoCelular,
            telefonoFijo: inquilinoPfData.telefonoFijo,
          },
          domicilioActual: {
            domCalle: inquilinoPfData.domCalle,
            domNumExt: inquilinoPfData.domNumExt,
            domNumInt: inquilinoPfData.domNumInt,
            domCp: inquilinoPfData.domCp,
            domColonia: inquilinoPfData.domColonia,
            domMunicipio: inquilinoPfData.domMunicipio,
            domEstado: inquilinoPfData.domEstado,
            domReferencias: inquilinoPfData.domReferencias,
          },
          situacionHabitacional: inquilinoPfData.situacionHabitacional,
          empleo: {
            profesion: inquilinoPfData.profesion,
            tipoEmpleo: inquilinoPfData.tipoEmpleo,
            empresaTrabaja: inquilinoPfData.empresaTrabaja,
            fechaIngreso: inquilinoPfData.fechaIngreso,
            ingresoComprobable: inquilinoPfData.ingresoComprobable,
            ingresoNoComprobable: inquilinoPfData.ingresoNoComprobable,
          },
        };
      }
    }

    const datosPersonales = inquilinoPfData.datosPersonales;
    const domicilioActual = inquilinoPfData.domicilioActual;
    const empleo = inquilinoPfData.empleo || {};

    console.log("Estructura procesada - datosPersonales:", datosPersonales);
    console.log("Estructura procesada - domicilioActual:", domicilioActual);

    const ingresos = inquilinoPfData.ingresos || {};

    const inquilinoPf = this.inquilinoPfRepository.create({
      // Datos Personales (de datosPersonales)
      nombres: datosPersonales.nombres,
      apellidoPaterno: datosPersonales.apellidoPaterno,
      apellidoMaterno: datosPersonales.apellidoMaterno,
      nacionalidad: datosPersonales.nacionalidad,
      nacionalidadEspecifique: datosPersonales.nacionalidadEspecifique,
      sexo: datosPersonales.sexo,
      estadoCivil: datosPersonales.estadoCivil,
      email: datosPersonales.email,
      tipoIdentificacion: datosPersonales.tipoIdentificacion,
      fechaNacimiento: datosPersonales.fechaNacimiento ? new Date(datosPersonales.fechaNacimiento) : undefined,
      rfc: datosPersonales.rfc,
      curp: datosPersonales.curp,
      telefonoCelular: datosPersonales.telefonoCelular,
      telefonoFijo: datosPersonales.telefonoFijo,

      // Domicilio Actual (de domicilioActual)
      domCalle: domicilioActual.domCalle,
      domNumExt: domicilioActual.domNumExt,
      domNumInt: domicilioActual.domNumInt,
      domCp: domicilioActual.domCp,
      domColonia: domicilioActual.domColonia,
      domMunicipio: domicilioActual.domMunicipio,
      domEstado: domicilioActual.domEstado,
      domReferencias: domicilioActual.domReferencias,
      situacionHabitacional: inquilinoPfData.situacionHabitacional,

      // Datos del Arrendador Actual (si aplica)
      ...(inquilinoPfData.arrendadorActual && {
        arrendadorNombres: inquilinoPfData.arrendadorActual.nombres,
        arrendadorApellidoPaterno: inquilinoPfData.arrendadorActual.apellidoPaterno,
        arrendadorApellidoMaterno: inquilinoPfData.arrendadorActual.apellidoMaterno,
        arrendadorTelefono: inquilinoPfData.arrendadorActual.telefono,
        rentaActual: inquilinoPfData.arrendadorActual.rentaActual,
        ocupaDesde: inquilinoPfData.arrendadorActual.ocupaDesde,
      }),

      // Empleo e Ingresos (de empleo e ingresos)
      profesion: empleo.profesion,
      tipoEmpleo: empleo.tipoEmpleo,
      empresaTrabaja: empleo.empresaTrabaja,
      fechaIngreso: empleo.fechaIngreso ? new Date(empleo.fechaIngreso) : undefined,
      ingresoComprobable: ingresos.ingresoComprobable,
      ingresoNoComprobable: ingresos.ingresoNoComprobable,

      rentaId,
    });

    await queryRunner.manager.save(inquilinoPf);
  }

  // Método auxiliar para crear inquilino persona moral
  private async createInquilinoPersonaMoral(rentaId: string, inquilinoPmData: any, queryRunner: any): Promise<void> {
    const inquilinoPm = this.inquilinoPmRepository.create({
      // Datos de la Empresa 
      nombreEmpresa: inquilinoPmData.nombreEmpresa, 
      email: inquilinoPmData.email,
      dominio: inquilinoPmData.dominio,
      rfc: inquilinoPmData.rfc,
      telefono: inquilinoPmData.telefono,
      ingresoMensual: inquilinoPmData.ingresoMensual, 

      // Domicilio de la Empresa
      domCalle: inquilinoPmData.domCalle,
      domNumExt: inquilinoPmData.domNumExt,
      domNumInt: inquilinoPmData.domNumInt,
      domCp: inquilinoPmData.domCp,
      domColonia: inquilinoPmData.domColonia,
      domMunicipio: inquilinoPmData.domMunicipio,
      domEstado: inquilinoPmData.domEstado,

      // Acta Constitutiva 
      notarioNombres: inquilinoPmData.notarioNombres, 
      notarioApellidoPaterno: inquilinoPmData.notarioApellidoPaterno, 
      notarioApellidoMaterno: inquilinoPmData.notarioApellidoMaterno, 
      numeroEscritura: inquilinoPmData.numeroEscritura, 
      fechaConstitucion: inquilinoPmData.fechaConstitucion ? new Date(inquilinoPmData.fechaConstitucion) : undefined, 
      notarioNumero: inquilinoPmData.notarioNumero, 
      ciudadRegistro: inquilinoPmData.ciudadRegistro, 
      estadoRegistro: inquilinoPmData.estadoRegistro, 
      numeroRegistro: inquilinoPmData.numeroRegistro, 
      giroComercial: inquilinoPmData.giroComercial,

      rentaId,
    });

    await queryRunner.manager.save(inquilinoPm);
  }

  async findAllRentals(): Promise<any[]> {
    const rentals = await this.rentalRepository.find({
      relations: ["inquilinoPf", "inquilinoPm", "propiedad", "propietarioPf", "propietarioPm", "obligadoPf", "obligadoPm"],
      order: { fechaCreacion: "DESC" },
    });

    // Transformar los datos para el frontend
    return rentals.map((rental) => ({
      ...rental,
      // Aplanar las relaciones para facilitar el acceso en el frontend
      inquilinos_pf: rental.inquilinoPf ? [rental.inquilinoPf] : [],
      inquilinos_pm: rental.inquilinoPm ? [rental.inquilinoPm] : [],
      propiedades: rental.propiedad ? [rental.propiedad] : [],
      propietarios_pf: rental.propietarioPf ? [rental.propietarioPf] : [],
      propietarios_pm: rental.propietarioPm ? [rental.propietarioPm] : [],
    }));
  }

  async findOneRental(id: string): Promise<any> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ["inquilinoPf", "inquilinoPm", "propiedad", "propietarioPf", "propietarioPm", "obligadoPf", "obligadoPm"],
    });

    if (!rental) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }

    return {
      ...rental,
      inquilinos_pf: rental.inquilinoPf ? [rental.inquilinoPf] : [],
      inquilinos_pm: rental.inquilinoPm ? [rental.inquilinoPm] : [],
      propiedades: rental.propiedad ? [rental.propiedad] : [],
      propietarios_pf: rental.propietarioPf ? [rental.propietarioPf] : [],
      propietarios_pm: rental.propietarioPm ? [rental.propietarioPm] : [],
    };
  }

  async updateTenant(rentalId: string, updateTenantDto: any): Promise<Rental> {
  console.log('🔄 Actualizando inquilino para rentalId:', rentalId);
  console.log('📦 Datos recibidos para actualizar:', JSON.stringify(updateTenantDto, null, 2));
  
  const rental = await this.findOneRental(rentalId);
  console.log('📋 Rental encontrado - tipoInquilino:', rental.tipoInquilino);

  const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    if (rental.tipoInquilino === "fisica" && rental.inquilinoPf) {
      console.log('👤 Actualizando Inquilino PF con ID:', rental.inquilinoPf.id);
      await this.updateInquilinoPersonaFisica(rental.inquilinoPf.id, updateTenantDto, queryRunner);
    } else if (rental.tipoInquilino === "moral" && rental.inquilinoPm) {
      console.log('🏢 Actualizando Inquilino PM con ID:', rental.inquilinoPm.id);
      await this.updateInquilinoPersonaMoral(rental.inquilinoPm.id, updateTenantDto, queryRunner);
    } else {
      console.log('❌ No se pudo encontrar el inquilino para actualizar');
      throw new NotFoundException('Inquilino no encontrado para actualizar');
    }

    await queryRunner.commitTransaction();
    console.log('✅ Actualización completada exitosamente');
    return await this.findOneRental(rentalId);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('💥 Error al actualizar el inquilino:', error);
    throw new BadRequestException(`Error al actualizar el inquilino: ${error.message}`);
  } finally {
    await queryRunner.release();
  }
}

  private async updateInquilinoPersonaFisica(inquilinoId: string, updateData: any, queryRunner: any): Promise<void> {
    console.log('🔧 Actualizando Inquilino PF con ID:', inquilinoId);
  
  // Normalizar valores de enum a minúsculas
  const nacionalidad = updateData.pf_nacionalidad?.toLowerCase() || 'mexicana';
  const sexo = updateData.pf_sexo?.toLowerCase() || 'femenino';
  const estadoCivil = updateData.pf_edo_civil?.toLowerCase() || 'soltero';
  const situacionHabitacional = updateData.sit_hab?.toLowerCase() || 'inquilino';
  const tipoEmpleo = updateData.pf_tipo_empleo?.toLowerCase() || 'empleado';

  console.log('📝 Valores normalizados:', {
    nacionalidad,
    sexo,
    estadoCivil,
    situacionHabitacional,
    tipoEmpleo
  });

  await queryRunner.manager.update(InquilinoPf, inquilinoId, {
    // Datos personales - CON VALORES NORMALIZADOS
    nombres: updateData.pf_nombres,
    apellidoPaterno: updateData.pf_apellido_p,
    apellidoMaterno: updateData.pf_apellido_m,
    nacionalidad: nacionalidad, 
    sexo: sexo,   
    estadoCivil: estadoCivil, 
    fechaNacimiento: updateData.pf_fecha_nac ? new Date(updateData.pf_fecha_nac) : undefined,
    curp: updateData.pf_curp,
    // Contacto
    email: updateData.email,
    rfc: updateData.rfc,
    telefonoCelular: updateData.tel_cel,
    telefonoFijo: updateData.tel_fijo,
    // Domicilio
    domCalle: updateData.dom_calle,
    domNumExt: updateData.dom_num_ext,
    domNumInt: updateData.dom_num_int,
    domCp: updateData.dom_cp,
    domColonia: updateData.dom_colonia,
    domMunicipio: updateData.dom_municipio,
    domEstado: updateData.dom_estado,
    situacionHabitacional: situacionHabitacional, 
    // Empleo
    profesion: updateData.pf_profesion,
    tipoEmpleo: tipoEmpleo, 
    empresaTrabaja: updateData.pf_nom_empresa,
    fechaIngreso: updateData.pf_fecha_ing_empleo ? new Date(updateData.pf_fecha_ing_empleo) : undefined,
    ingresoComprobable: updateData.pf_ing_comprobable,
    ingresoNoComprobable: updateData.pf_ing_no_comprobable,
  });
}

  
private async updateInquilinoPersonaMoral(inquilinoId: string, updateData: any, queryRunner: any): Promise<void> {
  //console.log('Actualizando Inquilino PM con ID:', inquilinoId);
  //console.log('Datos específicos para PM:', updateData);
  
  try {
    await queryRunner.manager.update(InquilinoPm, inquilinoId, {
      // Datos de la empresa
      nombreEmpresa: updateData.pm_razon_social,
      dominio: updateData.pm_dominio,
      ingresoMensual: updateData.pm_ing_mensual,
      // Contacto
      email: updateData.email,
      rfc: updateData.rfc,
      telefono: updateData.tel_cel,
      // Domicilio
      domCalle: updateData.dom_calle,
      domNumExt: updateData.dom_num_ext,
      domNumInt: updateData.dom_num_int,
      domCp: updateData.dom_cp,
      domColonia: updateData.dom_colonia,
      domMunicipio: updateData.dom_municipio,
      domEstado: updateData.dom_estado,
      // Acta constitutiva
      notarioNombres: updateData.pm_notario_nombre,
      notarioApellidoPaterno: updateData.pm_notario_apellido_p,
      notarioApellidoMaterno: updateData.pm_notario_apellido_m,
      numeroEscritura: updateData.pm_escritura_num,
      fechaConstitucion: updateData.pm_fecha_const ? new Date(updateData.pm_fecha_const) : undefined,
      notarioNumero: updateData.pm_notario_num,
      ciudadRegistro: updateData.pm_ciudad_reg,
      estadoRegistro: updateData.pm_estado_reg,
      numeroRegistro: updateData.pm_reg_num,
      giroComercial: updateData.uso_giro_neg,
    });
    //console.log('Inquilino PM actualizado exitosamente');
  } catch (error) {
    //console.error('Error en updateInquilinoPersonaMoral:', error);
    throw error;
  }
}

  async updateOwner(rentalId: string, updateOwnerDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    // Lógica para actualizar propietario según el tipo
    // Implementar según sea necesario
    return rental;
  }

  async updateProperty(rentalId: string, updatePropertyDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    // Lógica para actualizar propiedad
    // Implementar según sea necesario
    return rental;
  }

  async updateStatus(rentalId: string, status: string): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    rental.estado = status;
    return this.rentalRepository.save(rental);
  }

  async removeRental(id: string): Promise<{ message: string }> {
    const result = await this.rentalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }
    return { message: "Renta eliminada exitosamente" };
  }

  private async validatePostalCode(cp: string): Promise<void> {
    try {
      await this.postalCodesService.getInfoByPostalCode(cp);
    } catch (error) {
      throw new BadRequestException(`Código postal ${cp} no válido: ${error.message}`);
    }
  }

  async findTenantByRentalId(rentalId: string): Promise<any> {
    //console.log("Buscando inquilino para rentalId:", rentalId);

    try {
      const rental = await this.rentalRepository.findOne({
        where: { id: rentalId },
        relations: ["inquilinoPf", "inquilinoPm", "propiedad"],
      });

      //console.log("Rental encontrado:", rental);
      //console.log("InquilinoPf:", rental?.inquilinoPf);
      //console.log("InquilinoPm:", rental?.inquilinoPm);
      //console.log("Propiedad:", rental?.propiedad);

      if (!rental) {
        //console.log("Rental no encontrado");
        throw new NotFoundException(`Renta con ID ${rentalId} no encontrada`);
      }

      // Transformar los datos al formato que espera el frontend
      if (rental.tipoInquilino === "fisica" && rental.inquilinoPf) {
        const transformedData = this.transformInquilinoPfToFormData(rental.inquilinoPf);
        //console.log("Datos transformados PF:", transformedData);
        return transformedData;
      } else if (rental.tipoInquilino === "moral" && rental.inquilinoPm) {
        const transformedData = this.transformInquilinoPmToFormData(rental.inquilinoPm);
        //console.log("Datos transformados PM:", transformedData);
        return transformedData;
      }

      //console.log("No se encontraron datos del inquilino");
      throw new NotFoundException("Datos del inquilino no encontrados");
    } catch (error) {
      //console.error("Error en findTenantByRentalId:", error);
      throw error;
    }
  }

  private transformInquilinoPfToFormData(inquilinoPf: InquilinoPf): any {
    // Convierte fechas de string a Date si es necesario
    const fechaNacimiento = inquilinoPf.fechaNacimiento ? new Date(inquilinoPf.fechaNacimiento) : null;

    const fechaIngreso = inquilinoPf.fechaIngreso ? new Date(inquilinoPf.fechaIngreso) : null;

    return {
      tipo_persona: "PF",
      // Datos personales
      pf_nombres: inquilinoPf.nombres,
      pf_apellido_p: inquilinoPf.apellidoPaterno,
      pf_apellido_m: inquilinoPf.apellidoMaterno,
      pf_nacionalidad: inquilinoPf.nacionalidad,
      pf_sexo: inquilinoPf.sexo,
      pf_edo_civil: inquilinoPf.estadoCivil,
      pf_fecha_nac: fechaNacimiento ? fechaNacimiento.toISOString().split("T")[0] : "",
      pf_curp: inquilinoPf.curp,
      // Contacto
      email: inquilinoPf.email,
      rfc: inquilinoPf.rfc,
      tel_cel: inquilinoPf.telefonoCelular,
      tel_fijo: inquilinoPf.telefonoFijo,
      // Domicilio
      dom_calle: inquilinoPf.domCalle,
      dom_num_ext: inquilinoPf.domNumExt,
      dom_num_int: inquilinoPf.domNumInt,
      dom_cp: inquilinoPf.domCp,
      dom_colonia: inquilinoPf.domColonia,
      dom_municipio: inquilinoPf.domMunicipio,
      dom_estado: inquilinoPf.domEstado,
      sit_hab: inquilinoPf.situacionHabitacional,
      // Arrendador actual
      arr_act_nombre: inquilinoPf.arrendadorNombres,
      arr_act_apellido_p: inquilinoPf.arrendadorApellidoPaterno,
      arr_act_apellido_m: inquilinoPf.arrendadorApellidoMaterno,
      arr_act_tel: inquilinoPf.arrendadorTelefono,
      arr_act_renta: inquilinoPf.rentaActual,
      arr_act_ano: inquilinoPf.ocupaDesde,
      // Empleo
      pf_profesion: inquilinoPf.profesion,
      pf_tipo_empleo: inquilinoPf.tipoEmpleo,
      pf_nom_empresa: inquilinoPf.empresaTrabaja,
      pf_fecha_ing_empleo: fechaIngreso ? fechaIngreso.toISOString().split("T")[0] : "",
      pf_ing_comprobable: inquilinoPf.ingresoComprobable,
      pf_ing_no_comprobable: inquilinoPf.ingresoNoComprobable,
    };
  }

  private transformInquilinoPmToFormData(inquilinoPm: InquilinoPm): any {
    // Convierte la fecha de string a Date si es necesario
    const fechaConstitucion = inquilinoPm.fechaConstitucion ? new Date(inquilinoPm.fechaConstitucion) : null;

    return {
      tipo_persona: "PM",
      // Datos de la empresa
      pm_razon_social: inquilinoPm.nombreEmpresa,
      pm_dominio: inquilinoPm.dominio,
      pm_ing_mensual: inquilinoPm.ingresoMensual,
      // Contacto
      email: inquilinoPm.email,
      rfc: inquilinoPm.rfc,
      tel_cel: inquilinoPm.telefono,
      // Domicilio
      dom_calle: inquilinoPm.domCalle,
      dom_num_ext: inquilinoPm.domNumExt,
      dom_num_int: inquilinoPm.domNumInt,
      dom_cp: inquilinoPm.domCp,
      dom_colonia: inquilinoPm.domColonia,
      dom_municipio: inquilinoPm.domMunicipio,
      dom_estado: inquilinoPm.domEstado,
      // Acta constitutiva
      pm_notario_nombre: inquilinoPm.notarioNombres,
      pm_notario_apellido_p: inquilinoPm.notarioApellidoPaterno,
      pm_notario_apellido_m: inquilinoPm.notarioApellidoMaterno,
      pm_escritura_num: inquilinoPm.numeroEscritura,
      pm_fecha_const: fechaConstitucion ? fechaConstitucion.toISOString().split("T")[0] : "",
      pm_notario_num: inquilinoPm.notarioNumero,
      pm_ciudad_reg: inquilinoPm.ciudadRegistro,
      pm_estado_reg: inquilinoPm.estadoRegistro,
      pm_reg_num: inquilinoPm.numeroRegistro,
      uso_giro_neg: inquilinoPm.giroComercial,
    };
  }
}
