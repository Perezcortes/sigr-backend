import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InquilinoPf, InquilinoPm } from '../entities';

@Injectable()
export class InquilinoService {
  constructor(
    @InjectRepository(InquilinoPf)
    private readonly inquilinoPfRepository: Repository<InquilinoPf>,
    @InjectRepository(InquilinoPm)
    private readonly inquilinoPmRepository: Repository<InquilinoPm>,
  ) {}

  async createInquilinoPersonaFisica(rentaId: string, inquilinoPfData: any, queryRunner: any): Promise<void> {
    console.log("DATOS RECIBIDOS EN createInquilinoPersonaFisica:", JSON.stringify(inquilinoPfData, null, 2));
    
    // Verificar y adaptar estructura (igual que tu código actual)
    if (!inquilinoPfData.datosPersonales && inquilinoPfData.nombres) {
      inquilinoPfData = this.adaptInquilinoPfStructure(inquilinoPfData);
    }

    const datosPersonales = inquilinoPfData.datosPersonales;
    const domicilioActual = inquilinoPfData.domicilioActual;
    const empleo = inquilinoPfData.empleo || {};
    const ingresos = inquilinoPfData.ingresos || {};

    const inquilinoPf = this.inquilinoPfRepository.create({
      // Datos Personales
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

      // Domicilio Actual
      domCalle: domicilioActual.domCalle,
      domNumExt: domicilioActual.domNumExt,
      domNumInt: domicilioActual.domNumInt,
      domCp: domicilioActual.domCp,
      domColonia: domicilioActual.domColonia,
      domMunicipio: domicilioActual.domMunicipio,
      domEstado: domicilioActual.domEstado,
      domReferencias: domicilioActual.domReferencias,
      situacionHabitacional: inquilinoPfData.situacionHabitacional,

      // Datos del Arrendador Actual
      ...(inquilinoPfData.arrendadorActual && {
        arrendadorNombres: inquilinoPfData.arrendadorActual.nombres,
        arrendadorApellidoPaterno: inquilinoPfData.arrendadorActual.apellidoPaterno,
        arrendadorApellidoMaterno: inquilinoPfData.arrendadorActual.apellidoMaterno,
        arrendadorTelefono: inquilinoPfData.arrendadorActual.telefono,
        rentaActual: inquilinoPfData.arrendadorActual.rentaActual,
        ocupaDesde: inquilinoPfData.arrendadorActual.ocupaDesde,
      }),

      // Empleo e Ingresos
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

  async createInquilinoPersonaMoral(rentaId: string, inquilinoPmData: any, queryRunner: any): Promise<void> {
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

  async updateInquilinoPersonaFisica(inquilinoId: string, updateData: any, queryRunner: any): Promise<void> {
    console.log('🔧 Actualizando Inquilino PF con ID:', inquilinoId);
  
    const nacionalidad = updateData.pf_nacionalidad?.toLowerCase() || 'mexicana';
    const sexo = updateData.pf_sexo?.toLowerCase() || 'femenino';
    const estadoCivil = updateData.pf_edo_civil?.toLowerCase() || 'soltero';
    const situacionHabitacional = updateData.sit_hab?.toLowerCase() || 'inquilino';
    const tipoEmpleo = updateData.pf_tipo_empleo?.toLowerCase() || 'empleado';

    await queryRunner.manager.update(InquilinoPf, inquilinoId, {
      // Datos personales
      nombres: updateData.pf_nombres,
      apellidoPaterno: updateData.pf_apellido_p,
      apellidoMaterno: updateData.pf_apellido_m,
      nacionalidad,
      sexo,
      estadoCivil,
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
      situacionHabitacional,
      // Empleo
      profesion: updateData.pf_profesion,
      tipoEmpleo,
      empresaTrabaja: updateData.pf_nom_empresa,
      fechaIngreso: updateData.pf_fecha_ing_empleo ? new Date(updateData.pf_fecha_ing_empleo) : undefined,
      ingresoComprobable: updateData.pf_ing_comprobable,
      ingresoNoComprobable: updateData.pf_ing_no_comprobable,
    });
  }

  async updateInquilinoPersonaMoral(inquilinoId: string, updateData: any, queryRunner: any): Promise<void> {
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
  }

  transformInquilinoPfToFormData(inquilinoPf: InquilinoPf): any {
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

  transformInquilinoPmToFormData(inquilinoPm: InquilinoPm): any {
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

  private adaptInquilinoPfStructure(inquilinoPfData: any): any {
    return {
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