// src/rentals/services/obligado-solidario.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObligadoSolidarioPf, ObligadoSolidarioPm } from '../entities';

@Injectable()
export class ObligadoSolidarioService {
  constructor(
    @InjectRepository(ObligadoSolidarioPf)
    private readonly obligadoPfRepository: Repository<ObligadoSolidarioPf>,
    @InjectRepository(ObligadoSolidarioPm)
    private readonly obligadoPmRepository: Repository<ObligadoSolidarioPm>,
  ) {}

  async createObligadoPersonaFisica(rentaId: string, obligadoPfData: any, queryRunner: any): Promise<void> {
    const obligadoPf = this.obligadoPfRepository.create({
      ...obligadoPfData,
      rentaId,
    });
    await queryRunner.manager.save(obligadoPf);
  }

  async createObligadoPersonaMoral(rentaId: string, obligadoPmData: any, queryRunner: any): Promise<void> {
    const obligadoPm = this.obligadoPmRepository.create({
      ...obligadoPmData,
      rentaId,
    });
    await queryRunner.manager.save(obligadoPm);
  }

  async updateObligadoPersonaFisica(obligadoId: string, updateData: any, queryRunner: any): Promise<void> {
    const nacionalidad = updateData.pf_nacionalidad?.toLowerCase() || 'mexicana';
    const sexo = updateData.pf_sexo?.toLowerCase() || 'femenino';
    const estadoCivil = updateData.pf_edo_civil?.toLowerCase() || 'soltero';
    const tipoEmpleo = updateData.pf_tipo_empleo?.toLowerCase() || 'empleado';
    const tipoIdentificacion = updateData.tipo_identificacion?.toLowerCase() || 'ine';

    await queryRunner.manager.update(ObligadoSolidarioPf, obligadoId, {
      // DATOS PERSONALES 
      nombres: updateData.pf_nombres,
      apellidoPaterno: updateData.pf_apellido_p,
      apellidoMaterno: updateData.pf_apellido_m,
      nacionalidad,
      nacionalidadEspecifique: updateData.pf_nacionalidad_especifique,
      sexo,
      estadoCivil,
      fechaNacimiento: updateData.pf_fecha_nac ? new Date(updateData.pf_fecha_nac) : undefined,
      tipoIdentificacion,
      curp: updateData.pf_curp,
      rfc: updateData.rfc,
      // Contacto
      email: updateData.email,
      confirmarEmail: updateData.confirmar_email,
      telefonoCelular: updateData.tel_cel,
      telefonoFijo: updateData.tel_fijo,
      // Relación con solicitante
      relacionSolicitante: updateData.relacion_solicitante,
      tiempoConocer: updateData.tiempo_conocer,

      // DATOS DEL CÓNYUGE 
      conyugeNombres: updateData.conyuge_nombres,
      conyugeApellidoPaterno: updateData.conyuge_apellido_p,
      conyugeApellidoMaterno: updateData.conyuge_apellido_m,
      conyugeTelefono: updateData.conyuge_telefono,

      // DOMICILIO ACTUAL 
      domCalle: updateData.dom_calle,
      domNumExt: updateData.dom_num_ext,
      domNumInt: updateData.dom_num_int,
      domCp: updateData.dom_cp,
      domColonia: updateData.dom_colonia,
      domMunicipio: updateData.dom_municipio,
      domEstado: updateData.dom_estado,

      // EMPLEO E INGRESOS 
      profesion: updateData.pf_profesion,
      tipoEmpleo,
      empresaTrabaja: updateData.pf_nom_empresa,
      fechaIngreso: updateData.pf_fecha_ing_empleo ? new Date(updateData.pf_fecha_ing_empleo) : undefined,
      ingresoMensual: updateData.pf_ing_mensual,

      // DOMICILIO EMPRESA
      empresaCalle: updateData.empresa_calle,
      empresaNumExt: updateData.empresa_num_ext,
      empresaNumInt: updateData.empresa_num_int,
      empresaCp: updateData.empresa_cp,
      empresaColonia: updateData.empresa_colonia,
      empresaMunicipio: updateData.empresa_municipio,
      empresaEstado: updateData.empresa_estado,
      empresaTelefono: updateData.empresa_telefono,
      empresaExtension: updateData.empresa_extension,

      // AUTORIZACIONES 
      autorizaInvestigacion: updateData.autoriza_investigacion,
      declaraVeracidad: updateData.declara_veracidad,

      // PROPIEDAD EN GARANTÍA (OPCIONAL) 
      garantiaCalle: updateData.garantia_calle,
      garantiaNumExt: updateData.garantia_num_ext,
      garantiaNumInt: updateData.garantia_num_int,
      garantiaCp: updateData.garantia_cp,
      garantiaColonia: updateData.garantia_colonia,
      garantiaMunicipio: updateData.garantia_municipio,
      garantiaEstado: updateData.garantia_estado,
      garantiaNumeroEscritura: updateData.garantia_numero_escritura,
      garantiaFechaEscritura: updateData.garantia_fecha_escritura ? new Date(updateData.garantia_fecha_escritura) : undefined,
      garantiaNotarioNombres: updateData.garantia_notario_nombres,
      garantiaNotarioApellidoPaterno: updateData.garantia_notario_apellido_p,
      garantiaNotarioApellidoMaterno: updateData.garantia_notario_apellido_m,
      garantiaNotarioNumero: updateData.garantia_notario_numero,
      garantiaNotarioLugar: updateData.garantia_notario_lugar,
      garantiaRegistroPublico: updateData.garantia_registro_publico,
      garantiaFolioReal: updateData.garantia_folio_real,
      garantiaFechaRegistro: updateData.garantia_fecha_registro ? new Date(updateData.garantia_fecha_registro) : undefined,
      garantiaBoletaPredial: updateData.garantia_boleta_predial,
    });
  }

  async updateObligadoPersonaMoral(obligadoId: string, updateData: any, queryRunner: any): Promise<void> {
    await queryRunner.manager.update(ObligadoSolidarioPm, obligadoId, {
      // DATOS DE LA EMPRESA 
      nombreEmpresa: updateData.pm_razon_social,
      rfc: updateData.rfc,
      email: updateData.email,
      telefono: updateData.tel_cel,
      antiguedadEmpresa: updateData.pm_antiguedad,
      ingresoMensual: updateData.pm_ing_mensual,
      actividadesEmpresa: updateData.pm_actividades,

      // DOMICILIO EMPRESA 
      domCalle: updateData.dom_calle,
      domNumExt: updateData.dom_num_ext,
      domNumInt: updateData.dom_num_int,
      domCp: updateData.dom_cp,
      domColonia: updateData.dom_colonia,
      domMunicipio: updateData.dom_municipio,
      domEstado: updateData.dom_estado,

      // ACTA CONSTITUTIVA 
      notarioNombres: updateData.pm_notario_nombre,
      notarioApellidoPaterno: updateData.pm_notario_apellido_p,
      notarioApellidoMaterno: updateData.pm_notario_apellido_m,
      numeroEscritura: updateData.pm_escritura_num,
      fechaConstitucion: updateData.pm_fecha_const ? new Date(updateData.pm_fecha_const) : undefined,
      notarioNumero: updateData.pm_notario_num,
      ciudadRegistro: updateData.pm_ciudad_reg,
      estadoRegistro: updateData.pm_estado_reg,
      numeroRegistro: updateData.pm_reg_num,
      giroComercial: updateData.pm_giro_comercial,

      // REPRESENTANTE LEGAL 
      repLegalNombres: updateData.rep_legal_nombres,
      repLegalApellidoPaterno: updateData.rep_legal_apellido_p,
      repLegalApellidoMaterno: updateData.rep_legal_apellido_m,
      repLegalSexo: updateData.rep_legal_sexo,
      repLegalRfc: updateData.rep_legal_rfc,
      repLegalCurp: updateData.rep_legal_curp,
      repLegalEmail: updateData.rep_legal_email,
      repLegalTelefono: updateData.rep_legal_telefono,

      // DOMICILIO REPRESENTANTE LEGAL
      repLegalCalle: updateData.rep_legal_calle,
      repLegalNumExt: updateData.rep_legal_num_ext,
      repLegalNumInt: updateData.rep_legal_num_int,
      repLegalCp: updateData.rep_legal_cp,
      repLegalColonia: updateData.rep_legal_colonia,
      repLegalMunicipio: updateData.rep_legal_municipio,
      repLegalEstado: updateData.rep_legal_estado,

      // FACULTADES DEL REPRESENTANTE 
      facultadesActa: updateData.facultades_acta,
      facultadesEscrituraNumero: updateData.facultades_escritura_numero,
      facultadesNotarioNumero: updateData.facultades_notario_numero,
      facultadesFechaEscritura: updateData.facultades_fecha_escritura ? new Date(updateData.facultades_fecha_escritura) : undefined,
      facultadesNumeroInscripcion: updateData.facultades_numero_inscripcion,
      facultadesFechaInscripcion: updateData.facultades_fecha_inscripcion ? new Date(updateData.facultades_fecha_inscripcion) : undefined,
      facultadesCiudadRegistro: updateData.facultades_ciudad_registro,
      facultadesEstadoRegistro: updateData.facultades_estado_registro,
      tipoRepresentacion: updateData.tipo_representacion,
      tipoRepresentacionOtro: updateData.tipo_representacion_otro,

      // PROPIEDAD EN GARANTÍA (OPCIONAL) 
      garantiaCalle: updateData.garantia_calle,
      garantiaNumExt: updateData.garantia_num_ext,
      garantiaNumInt: updateData.garantia_num_int,
      garantiaCp: updateData.garantia_cp,
      garantiaColonia: updateData.garantia_colonia,
      garantiaMunicipio: updateData.garantia_municipio,
      garantiaEstado: updateData.garantia_estado,
      garantiaNumeroEscritura: updateData.garantia_numero_escritura,
      garantiaFechaEscritura: updateData.garantia_fecha_escritura ? new Date(updateData.garantia_fecha_escritura) : undefined,
      garantiaNotarioNombres: updateData.garantia_notario_nombres,
      garantiaNotarioApellidoPaterno: updateData.garantia_notario_apellido_p,
      garantiaNotarioApellidoMaterno: updateData.garantia_notario_apellido_m,
      garantiaNotarioNumero: updateData.garantia_notario_numero,
      garantiaNotarioLugar: updateData.garantia_notario_lugar,
      garantiaRegistroPublico: updateData.garantia_registro_publico,
      garantiaFolioReal: updateData.garantia_folio_real,
      garantiaFechaRegistro: updateData.garantia_fecha_registro ? new Date(updateData.garantia_fecha_registro) : undefined,
      garantiaBoletaPredial: updateData.garantia_boleta_predial,
    });
  }

  async findObligadoByRentalId(rentalId: string): Promise<any> {
    //console.log('Buscando obligado solidario para rentalId:', rentalId);
    
    const obligadoPf = await this.obligadoPfRepository.findOne({
      where: { rentaId: rentalId },
    });

    if (obligadoPf) {
      return this.transformObligadoPfToFormData(obligadoPf);
    }

    const obligadoPm = await this.obligadoPmRepository.findOne({
      where: { rentaId: rentalId },
    });

    if (obligadoPm) {
      return this.transformObligadoPmToFormData(obligadoPm);
    }

    throw new NotFoundException("Datos del obligado solidario no encontrados");
  }

  async updateObligado(rentalId: string, updateData: any, queryRunner: any): Promise<void> {
    //console.log('Actualizando obligado solidario para rentalId:', rentalId);
    
    const isPersonaFisica = updateData.tipo_persona === 'PF' || updateData.pf_nombres;
    
    if (isPersonaFisica) {
      const obligadoPf = await this.obligadoPfRepository.findOne({
        where: { rentaId: rentalId },
      });
      
      if (!obligadoPf) {
        throw new NotFoundException('Obligado solidario (PF) no encontrado para actualizar');
      }
      
      await this.updateObligadoPersonaFisica(obligadoPf.id, updateData, queryRunner);
    } else {
      const obligadoPm = await this.obligadoPmRepository.findOne({
        where: { rentaId: rentalId },
      });
      
      if (!obligadoPm) {
        throw new NotFoundException('Obligado solidario (PM) no encontrado para actualizar');
      }
      
      await this.updateObligadoPersonaMoral(obligadoPm.id, updateData, queryRunner);
    }
  }

  transformObligadoPfToFormData(obligadoPf: ObligadoSolidarioPf): any {
    const fechaNacimiento = obligadoPf.fechaNacimiento ? new Date(obligadoPf.fechaNacimiento) : null;
    const fechaIngreso = obligadoPf.fechaIngreso ? new Date(obligadoPf.fechaIngreso) : null;
    const garantiaFechaEscritura = obligadoPf.garantiaFechaEscritura ? new Date(obligadoPf.garantiaFechaEscritura) : null;
    const garantiaFechaRegistro = obligadoPf.garantiaFechaRegistro ? new Date(obligadoPf.garantiaFechaRegistro) : null;

    return {
      tipo_persona: "PF",
      // DATOS PERSONALES 
      pf_nombres: obligadoPf.nombres,
      pf_apellido_p: obligadoPf.apellidoPaterno,
      pf_apellido_m: obligadoPf.apellidoMaterno,
      pf_nacionalidad: obligadoPf.nacionalidad,
      pf_nacionalidad_especifique: obligadoPf.nacionalidadEspecifique,
      pf_sexo: obligadoPf.sexo,
      pf_edo_civil: obligadoPf.estadoCivil,
      pf_fecha_nac: fechaNacimiento ? fechaNacimiento.toISOString().split("T")[0] : "",
      tipo_identificacion: obligadoPf.tipoIdentificacion,
      pf_curp: obligadoPf.curp,
      rfc: obligadoPf.rfc,
      // Contacto
      email: obligadoPf.email,
      confirmar_email: obligadoPf.confirmarEmail,
      tel_cel: obligadoPf.telefonoCelular,
      tel_fijo: obligadoPf.telefonoFijo,
      // Relación con solicitante
      relacion_solicitante: obligadoPf.relacionSolicitante,
      tiempo_conocer: obligadoPf.tiempoConocer,

      // DATOS DEL CÓNYUGE 
      conyuge_nombres: obligadoPf.conyugeNombres,
      conyuge_apellido_p: obligadoPf.conyugeApellidoPaterno,
      conyuge_apellido_m: obligadoPf.conyugeApellidoMaterno,
      conyuge_telefono: obligadoPf.conyugeTelefono,

      // DOMICILIO ACTUAL 
      dom_calle: obligadoPf.domCalle,
      dom_num_ext: obligadoPf.domNumExt,
      dom_num_int: obligadoPf.domNumInt,
      dom_cp: obligadoPf.domCp,
      dom_colonia: obligadoPf.domColonia,
      dom_municipio: obligadoPf.domMunicipio,
      dom_estado: obligadoPf.domEstado,

      // EMPLEO E INGRESOS 
      pf_profesion: obligadoPf.profesion,
      pf_tipo_empleo: obligadoPf.tipoEmpleo,
      pf_nom_empresa: obligadoPf.empresaTrabaja,
      pf_fecha_ing_empleo: fechaIngreso ? fechaIngreso.toISOString().split("T")[0] : "",
      pf_ing_mensual: obligadoPf.ingresoMensual,

      // DOMICILIO EMPRESA 
      empresa_calle: obligadoPf.empresaCalle,
      empresa_num_ext: obligadoPf.empresaNumExt,
      empresa_num_int: obligadoPf.empresaNumInt,
      empresa_cp: obligadoPf.empresaCp,
      empresa_colonia: obligadoPf.empresaColonia,
      empresa_municipio: obligadoPf.empresaMunicipio,
      empresa_estado: obligadoPf.empresaEstado,
      empresa_telefono: obligadoPf.empresaTelefono,
      empresa_extension: obligadoPf.empresaExtension,

      // AUTORIZACIONES 
      autoriza_investigacion: obligadoPf.autorizaInvestigacion,
      declara_veracidad: obligadoPf.declaraVeracidad,

      // PROPIEDAD EN GARANTÍA 
      garantia_calle: obligadoPf.garantiaCalle,
      garantia_num_ext: obligadoPf.garantiaNumExt,
      garantia_num_int: obligadoPf.garantiaNumInt,
      garantia_cp: obligadoPf.garantiaCp,
      garantia_colonia: obligadoPf.garantiaColonia,
      garantia_municipio: obligadoPf.garantiaMunicipio,
      garantia_estado: obligadoPf.garantiaEstado,
      garantia_numero_escritura: obligadoPf.garantiaNumeroEscritura,
      garantia_fecha_escritura: garantiaFechaEscritura ? garantiaFechaEscritura.toISOString().split("T")[0] : "",
      garantia_notario_nombres: obligadoPf.garantiaNotarioNombres,
      garantia_notario_apellido_p: obligadoPf.garantiaNotarioApellidoPaterno,
      garantia_notario_apellido_m: obligadoPf.garantiaNotarioApellidoMaterno,
      garantia_notario_numero: obligadoPf.garantiaNotarioNumero,
      garantia_notario_lugar: obligadoPf.garantiaNotarioLugar,
      garantia_registro_publico: obligadoPf.garantiaRegistroPublico,
      garantia_folio_real: obligadoPf.garantiaFolioReal,
      garantia_fecha_registro: garantiaFechaRegistro ? garantiaFechaRegistro.toISOString().split("T")[0] : "",
      garantia_boleta_predial: obligadoPf.garantiaBoletaPredial,
    };
  }

  transformObligadoPmToFormData(obligadoPm: ObligadoSolidarioPm): any {
    const fechaConstitucion = obligadoPm.fechaConstitucion ? new Date(obligadoPm.fechaConstitucion) : null;
    const facultadesFechaEscritura = obligadoPm.facultadesFechaEscritura ? new Date(obligadoPm.facultadesFechaEscritura) : null;
    const facultadesFechaInscripcion = obligadoPm.facultadesFechaInscripcion ? new Date(obligadoPm.facultadesFechaInscripcion) : null;
    const garantiaFechaEscritura = obligadoPm.garantiaFechaEscritura ? new Date(obligadoPm.garantiaFechaEscritura) : null;
    const garantiaFechaRegistro = obligadoPm.garantiaFechaRegistro ? new Date(obligadoPm.garantiaFechaRegistro) : null;

    return {
      tipo_persona: "PM",
      // DATOS DE LA EMPRESA 
      pm_razon_social: obligadoPm.nombreEmpresa,
      rfc: obligadoPm.rfc,
      email: obligadoPm.email,
      tel_cel: obligadoPm.telefono,
      pm_antiguedad: obligadoPm.antiguedadEmpresa,
      pm_ing_mensual: obligadoPm.ingresoMensual,
      pm_actividades: obligadoPm.actividadesEmpresa,

      // DOMICILIO EMPRESA 
      dom_calle: obligadoPm.domCalle,
      dom_num_ext: obligadoPm.domNumExt,
      dom_num_int: obligadoPm.domNumInt,
      dom_cp: obligadoPm.domCp,
      dom_colonia: obligadoPm.domColonia,
      dom_municipio: obligadoPm.domMunicipio,
      dom_estado: obligadoPm.domEstado,

      // ACTA CONSTITUTIVA 
      pm_notario_nombre: obligadoPm.notarioNombres,
      pm_notario_apellido_p: obligadoPm.notarioApellidoPaterno,
      pm_notario_apellido_m: obligadoPm.notarioApellidoMaterno,
      pm_escritura_num: obligadoPm.numeroEscritura,
      pm_fecha_const: fechaConstitucion ? fechaConstitucion.toISOString().split("T")[0] : "",
      pm_notario_num: obligadoPm.notarioNumero,
      pm_ciudad_reg: obligadoPm.ciudadRegistro,
      pm_estado_reg: obligadoPm.estadoRegistro,
      pm_reg_num: obligadoPm.numeroRegistro,
      pm_giro_comercial: obligadoPm.giroComercial,

      // REPRESENTANTE LEGAL 
      rep_legal_nombres: obligadoPm.repLegalNombres,
      rep_legal_apellido_p: obligadoPm.repLegalApellidoPaterno,
      rep_legal_apellido_m: obligadoPm.repLegalApellidoMaterno,
      rep_legal_sexo: obligadoPm.repLegalSexo,
      rep_legal_rfc: obligadoPm.repLegalRfc,
      rep_legal_curp: obligadoPm.repLegalCurp,
      rep_legal_email: obligadoPm.repLegalEmail,
      rep_legal_telefono: obligadoPm.repLegalTelefono,

      // DOMICILIO REPRESENTANTE LEGAL 
      rep_legal_calle: obligadoPm.repLegalCalle,
      rep_legal_num_ext: obligadoPm.repLegalNumExt,
      rep_legal_num_int: obligadoPm.repLegalNumInt,
      rep_legal_cp: obligadoPm.repLegalCp,
      rep_legal_colonia: obligadoPm.repLegalColonia,
      rep_legal_municipio: obligadoPm.repLegalMunicipio,
      rep_legal_estado: obligadoPm.repLegalEstado,

      // FACULTADES DEL REPRESENTANTE 
      facultades_acta: obligadoPm.facultadesActa,
      facultades_escritura_numero: obligadoPm.facultadesEscrituraNumero,
      facultades_notario_numero: obligadoPm.facultadesNotarioNumero,
      facultades_fecha_escritura: facultadesFechaEscritura ? facultadesFechaEscritura.toISOString().split("T")[0] : "",
      facultades_numero_inscripcion: obligadoPm.facultadesNumeroInscripcion,
      facultades_fecha_inscripcion: facultadesFechaInscripcion ? facultadesFechaInscripcion.toISOString().split("T")[0] : "",
      facultades_ciudad_registro: obligadoPm.facultadesCiudadRegistro,
      facultades_estado_registro: obligadoPm.facultadesEstadoRegistro,
      tipo_representacion: obligadoPm.tipoRepresentacion,
      tipo_representacion_otro: obligadoPm.tipoRepresentacionOtro,

      // PROPIEDAD EN GARANTÍA 
      garantia_calle: obligadoPm.garantiaCalle,
      garantia_num_ext: obligadoPm.garantiaNumExt,
      garantia_num_int: obligadoPm.garantiaNumInt,
      garantia_cp: obligadoPm.garantiaCp,
      garantia_colonia: obligadoPm.garantiaColonia,
      garantia_municipio: obligadoPm.garantiaMunicipio,
      garantia_estado: obligadoPm.garantiaEstado,
      garantia_numero_escritura: obligadoPm.garantiaNumeroEscritura,
      garantia_fecha_escritura: garantiaFechaEscritura ? garantiaFechaEscritura.toISOString().split("T")[0] : "",
      garantia_notario_nombres: obligadoPm.garantiaNotarioNombres,
      garantia_notario_apellido_p: obligadoPm.garantiaNotarioApellidoPaterno,
      garantia_notario_apellido_m: obligadoPm.garantiaNotarioApellidoMaterno,
      garantia_notario_numero: obligadoPm.garantiaNotarioNumero,
      garantia_notario_lugar: obligadoPm.garantiaNotarioLugar,
      garantia_registro_publico: obligadoPm.garantiaRegistroPublico,
      garantia_folio_real: obligadoPm.garantiaFolioReal,
      garantia_fecha_registro: garantiaFechaRegistro ? garantiaFechaRegistro.toISOString().split("T")[0] : "",
      garantia_boleta_predial: obligadoPm.garantiaBoletaPredial,
    };
  }
}