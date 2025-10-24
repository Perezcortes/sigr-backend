import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropietarioPf, PropietarioPm } from '../entities';

@Injectable()
export class PropietarioService {
  constructor(
    @InjectRepository(PropietarioPf)
    private readonly propietarioPfRepository: Repository<PropietarioPf>,
    @InjectRepository(PropietarioPm)
    private readonly propietarioPmRepository: Repository<PropietarioPm>,
  ) {}

  async createPropietarioPersonaFisica(rentaId: string, propietarioPfData: any, queryRunner: any): Promise<void> {
    const propietarioPf = this.propietarioPfRepository.create({
      ...propietarioPfData,
      rentaId,
    });
    await queryRunner.manager.save(propietarioPf);
  }

  async createPropietarioPersonaMoral(rentaId: string, propietarioPmData: any, queryRunner: any): Promise<void> {
    const propietarioPm = this.propietarioPmRepository.create({
      ...propietarioPmData,
      rentaId,
    });
    await queryRunner.manager.save(propietarioPm);
  }

  async updatePropietarioPersonaFisica(propietarioId: string, updateData: any, queryRunner: any): Promise<void> {
    const estadoCivil = updateData.estado_civil?.toLowerCase() || 'soltero';
    const sexo = updateData.sexo?.toLowerCase() || 'masculino';
    const nacionalidad = updateData.nacionalidad?.toLowerCase() || 'mexicana';
    const tipoIdentificacion = updateData.tipo_identificacion?.toLowerCase() || 'ine';
    const regimenConyugal = updateData.regimen_conyugal?.toLowerCase();
    const formaPago = updateData.forma_pago?.toLowerCase() || 'efectivo';
    const tipoInmueble = updateData.tipo_inmueble?.toLowerCase();
    const usoInmueble = updateData.uso_inmueble?.toLowerCase();
    const ivaRenta = updateData.iva_renta?.toLowerCase();
    const frecuenciaPago = updateData.frecuencia_pago?.toLowerCase();
    const quienPagaMantenimiento = updateData.quien_paga_mantenimiento?.toLowerCase();
    const tipoRepresentacion = updateData.tipo_representacion?.toLowerCase();
    const repSexo = updateData.rep_sexo?.toLowerCase();
    const repTipoIdentificacion = updateData.rep_tipo_identificacion?.toLowerCase();

    await queryRunner.manager.update(PropietarioPf, propietarioId, {
      // DATOS PERSONALES
      nombres: updateData.nombres,
      apellidoPaterno: updateData.apellido_paterno,
      apellidoMaterno: updateData.apellido_materno,
      curp: updateData.curp,
      email: updateData.email,
      telefono: updateData.telefono,
      estadoCivil,
      regimenConyugal,
      sexo,
      nacionalidad,
      tipoIdentificacion,
      rfc: updateData.rfc,

      // DOMICILIO ACTUAL
      domCalle: updateData.dom_calle,
      domNumExt: updateData.dom_num_ext,
      domNumInt: updateData.dom_num_int,
      domCp: updateData.dom_cp,
      domColonia: updateData.dom_colonia,
      domMunicipio: updateData.dom_municipio,
      domEstado: updateData.dom_estado,
      domReferencias: updateData.dom_referencias,

      // DATOS DE PAGO
      formaPago,
      otraFormaPago: updateData.otra_forma_pago,
      titularCuenta: updateData.titular_cuenta,
      numeroCuenta: updateData.numero_cuenta,
      banco: updateData.banco,
      clabe: updateData.clabe,

      // DATOS DEL INMUEBLE
      tipoInmueble,
      usoInmueble,
      permiteMascotas: updateData.permite_mascotas,
      mascotasEspecificacion: updateData.mascotas_especificacion,
      precioRenta: updateData.precio_renta,
      ivaRenta,
      frecuenciaPago,
      otraFrecuencia: updateData.otra_frecuencia,
      condicionesPago: updateData.condiciones_pago,
      depositoGarantia: updateData.deposito_garantia,
      pagaMantenimiento: updateData.paga_mantenimiento,
      quienPagaMantenimiento,
      mantenimientoIncluido: updateData.mantenimiento_incluido,
      costoMantenimiento: updateData.costo_mantenimiento,
      instruccionesPago: updateData.instrucciones_pago,
      requiereSeguro: updateData.requiere_seguro,
      coberturaSeguro: updateData.cobertura_seguro,
      montoSeguro: updateData.monto_seguro,
      serviciosPagar: updateData.servicios_pagar,

      // DIRECCIÓN DEL INMUEBLE
      inmuebleCalle: updateData.inmueble_calle,
      inmuebleNumExt: updateData.inmueble_num_ext,
      inmuebleNumInt: updateData.inmueble_num_int,
      inmuebleCp: updateData.inmueble_cp,
      inmuebleColonia: updateData.inmueble_colonia,
      inmuebleMunicipio: updateData.inmueble_municipio,
      inmuebleEstado: updateData.inmueble_estado,
      inmuebleReferencias: updateData.inmueble_referencias,
      inmuebleInventario: updateData.inmueble_inventario,

      // REPRESENTACIÓN POR TERCERO
      representadoTercero: updateData.representado_tercero,
      tipoRepresentacion,

      // DATOS DEL REPRESENTANTE
      repNombres: updateData.rep_nombres,
      repApellidoPaterno: updateData.rep_apellido_paterno,
      repApellidoMaterno: updateData.rep_apellido_materno,
      repSexo,
      repCurp: updateData.rep_curp,
      repTipoIdentificacion,
      repRfc: updateData.rep_rfc,
      repTelefono: updateData.rep_telefono,
      repEmail: updateData.rep_email,

      // DOMICILIO DEL REPRESENTANTE
      repCalle: updateData.rep_calle,
      repNumExt: updateData.rep_num_ext,
      repNumInt: updateData.rep_num_int,
      repCp: updateData.rep_cp,
      repColonia: updateData.rep_colonia,
      repMunicipio: updateData.rep_municipio,
      repEstado: updateData.rep_estado,
      repReferencias: updateData.rep_referencias,
    });
  }

  async updatePropietarioPersonaMoral(propietarioId: string, updateData: any, queryRunner: any): Promise<void> {
    const formaPago = updateData.forma_pago?.toLowerCase() || 'efectivo';
    const repLegalSexo = updateData.rep_legal_sexo?.toLowerCase() || 'masculino';
    const tipoRepresentacion = updateData.tipo_representacion?.toLowerCase();
    const tipoInmueble = updateData.tipo_inmueble?.toLowerCase();
    const usoInmueble = updateData.uso_inmueble?.toLowerCase();
    const ivaRenta = updateData.iva_renta?.toLowerCase();
    const frecuenciaPago = updateData.frecuencia_pago?.toLowerCase();
    const quienPagaMantenimiento = updateData.quien_paga_mantenimiento?.toLowerCase();

    await queryRunner.manager.update(PropietarioPm, propietarioId, {
      // DATOS DE LA EMPRESA
      nombreEmpresa: updateData.nombre_empresa,
      rfc: updateData.rfc,
      email: updateData.email,
      telefono: updateData.telefono,

      // DOMICILIO DE LA EMPRESA
      domCalle: updateData.dom_calle,
      domNumExt: updateData.dom_num_ext,
      domNumInt: updateData.dom_num_int,
      domCp: updateData.dom_cp,
      domColonia: updateData.dom_colonia,
      domMunicipio: updateData.dom_municipio,
      domEstado: updateData.dom_estado,
      domReferencias: updateData.dom_referencias,

      // DATOS DE PAGO
      formaPago,
      otraFormaPago: updateData.otra_forma_pago,
      titularCuenta: updateData.titular_cuenta,
      numeroCuenta: updateData.numero_cuenta,
      banco: updateData.banco,
      clabe: updateData.clabe,

      // ACTA CONSTITUTIVA
      notarioNombres: updateData.notario_nombres,
      notarioApellidoPaterno: updateData.notario_apellido_paterno,
      notarioApellidoMaterno: updateData.notario_apellido_materno,
      numeroEscritura: updateData.numero_escritura,
      fechaConstitucion: updateData.fecha_constitucion ? new Date(updateData.fecha_constitucion) : undefined,
      notarioNumero: updateData.notario_numero,
      ciudadRegistro: updateData.ciudad_registro,
      estadoRegistro: updateData.estado_registro,
      numeroRegistro: updateData.numero_registro,
      giroComercial: updateData.giro_comercial,

      // APODERADO LEGAL/REPRESENTANTE
      repLegalNombres: updateData.rep_legal_nombres,
      repLegalApellidoPaterno: updateData.rep_legal_apellido_paterno,
      repLegalApellidoMaterno: updateData.rep_legal_apellido_materno,
      repLegalSexo,
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
      facultadesCiudadRegistro: updateData.facultades_ciudad_registro,
      facultadesEstadoRegistro: updateData.facultades_estado_registro,
      tipoRepresentacion,
      tipoRepresentacionOtro: updateData.tipo_representacion_otro,

      // DATOS DEL INMUEBLE
      tipoInmueble,
      usoInmueble,
      permiteMascotas: updateData.permite_mascotas,
      mascotasEspecificacion: updateData.mascotas_especificacion,
      precioRenta: updateData.precio_renta,
      ivaRenta,
      frecuenciaPago,
      otraFrecuencia: updateData.otra_frecuencia,
      condicionesPago: updateData.condiciones_pago,
      depositoGarantia: updateData.deposito_garantia,
      pagaMantenimiento: updateData.paga_mantenimiento,
      quienPagaMantenimiento,
      mantenimientoIncluido: updateData.mantenimiento_incluido,
      costoMantenimiento: updateData.costo_mantenimiento,
      instruccionesPago: updateData.instrucciones_pago,
      requiereSeguro: updateData.requiere_seguro,
      coberturaSeguro: updateData.cobertura_seguro,
      montoSeguro: updateData.monto_seguro,
      serviciosPagar: updateData.servicios_pagar,

      // DIRECCIÓN DEL INMUEBLE
      inmuebleCalle: updateData.inmueble_calle,
      inmuebleNumExt: updateData.inmueble_num_ext,
      inmuebleNumInt: updateData.inmueble_num_int,
      inmuebleCp: updateData.inmueble_cp,
      inmuebleColonia: updateData.inmueble_colonia,
      inmuebleMunicipio: updateData.inmueble_municipio,
      inmuebleEstado: updateData.inmueble_estado,
      inmuebleReferencias: updateData.inmueble_referencias,
      inmuebleInventario: updateData.inmueble_inventario,
    });
  }

  async findPropietarioByRentalId(rentalId: string): Promise<any> {
    const propietarioPf = await this.propietarioPfRepository.findOne({
      where: { rentaId: rentalId },
    });

    if (propietarioPf) {
      return this.transformPropietarioPfToFormData(propietarioPf);
    }

    const propietarioPm = await this.propietarioPmRepository.findOne({
      where: { rentaId: rentalId },
    });

    if (propietarioPm) {
      return this.transformPropietarioPmToFormData(propietarioPm);
    }

    throw new NotFoundException("Datos del propietario no encontrados");
  }

  async updatePropietario(rentalId: string, updateData: any, queryRunner: any): Promise<void> {
    const isPersonaFisica = updateData.tipo_persona === 'PF' || updateData.nombres;
    
    if (isPersonaFisica) {
      const propietarioPf = await this.propietarioPfRepository.findOne({
        where: { rentaId: rentalId },
      });
      
      if (!propietarioPf) {
        throw new NotFoundException('Propietario (PF) no encontrado para actualizar');
      }
      
      await this.updatePropietarioPersonaFisica(propietarioPf.id, updateData, queryRunner);
    } else {
      const propietarioPm = await this.propietarioPmRepository.findOne({
        where: { rentaId: rentalId },
      });
      
      if (!propietarioPm) {
        throw new NotFoundException('Propietario (PM) no encontrado para actualizar');
      }
      
      await this.updatePropietarioPersonaMoral(propietarioPm.id, updateData, queryRunner);
    }
  }

  transformPropietarioPfToFormData(propietarioPf: PropietarioPf): any {
    return {
      tipo_persona: "PF",
      // DATOS PERSONALES
      nombres: propietarioPf.nombres,
      apellido_paterno: propietarioPf.apellidoPaterno,
      apellido_materno: propietarioPf.apellidoMaterno,
      curp: propietarioPf.curp,
      email: propietarioPf.email,
      telefono: propietarioPf.telefono,
      estado_civil: propietarioPf.estadoCivil,
      regimen_conyugal: propietarioPf.regimenConyugal,
      sexo: propietarioPf.sexo,
      nacionalidad: propietarioPf.nacionalidad,
      tipo_identificacion: propietarioPf.tipoIdentificacion,
      rfc: propietarioPf.rfc,

      // DOMICILIO ACTUAL
      dom_calle: propietarioPf.domCalle,
      dom_num_ext: propietarioPf.domNumExt,
      dom_num_int: propietarioPf.domNumInt,
      dom_cp: propietarioPf.domCp,
      dom_colonia: propietarioPf.domColonia,
      dom_municipio: propietarioPf.domMunicipio,
      dom_estado: propietarioPf.domEstado,
      dom_referencias: propietarioPf.domReferencias,

      // DATOS DE PAGO
      forma_pago: propietarioPf.formaPago,
      otra_forma_pago: propietarioPf.otraFormaPago,
      titular_cuenta: propietarioPf.titularCuenta,
      numero_cuenta: propietarioPf.numeroCuenta,
      banco: propietarioPf.banco,
      clabe: propietarioPf.clabe,

      // DATOS DEL INMUEBLE
      tipo_inmueble: propietarioPf.tipoInmueble,
      uso_inmueble: propietarioPf.usoInmueble,
      permite_mascotas: propietarioPf.permiteMascotas,
      mascotas_especificacion: propietarioPf.mascotasEspecificacion,
      precio_renta: propietarioPf.precioRenta,
      iva_renta: propietarioPf.ivaRenta,
      frecuencia_pago: propietarioPf.frecuenciaPago,
      otra_frecuencia: propietarioPf.otraFrecuencia,
      condiciones_pago: propietarioPf.condicionesPago,
      deposito_garantia: propietarioPf.depositoGarantia,
      paga_mantenimiento: propietarioPf.pagaMantenimiento,
      quien_paga_mantenimiento: propietarioPf.quienPagaMantenimiento,
      mantenimiento_incluido: propietarioPf.mantenimientoIncluido,
      costo_mantenimiento: propietarioPf.costoMantenimiento,
      instrucciones_pago: propietarioPf.instruccionesPago,
      requiere_seguro: propietarioPf.requiereSeguro,
      cobertura_seguro: propietarioPf.coberturaSeguro,
      monto_seguro: propietarioPf.montoSeguro,
      servicios_pagar: propietarioPf.serviciosPagar,

      // DIRECCIÓN DEL INMUEBLE
      inmueble_calle: propietarioPf.inmuebleCalle,
      inmueble_num_ext: propietarioPf.inmuebleNumExt,
      inmueble_num_int: propietarioPf.inmuebleNumInt,
      inmueble_cp: propietarioPf.inmuebleCp,
      inmueble_colonia: propietarioPf.inmuebleColonia,
      inmueble_municipio: propietarioPf.inmuebleMunicipio,
      inmueble_estado: propietarioPf.inmuebleEstado,
      inmueble_referencias: propietarioPf.inmuebleReferencias,
      inmueble_inventario: propietarioPf.inmuebleInventario,

      // REPRESENTACIÓN POR TERCERO
      representado_tercero: propietarioPf.representadoTercero,
      tipo_representacion: propietarioPf.tipoRepresentacion,

      // DATOS DEL REPRESENTANTE
      rep_nombres: propietarioPf.repNombres,
      rep_apellido_paterno: propietarioPf.repApellidoPaterno,
      rep_apellido_materno: propietarioPf.repApellidoMaterno,
      rep_sexo: propietarioPf.repSexo,
      rep_curp: propietarioPf.repCurp,
      rep_tipo_identificacion: propietarioPf.repTipoIdentificacion,
      rep_rfc: propietarioPf.repRfc,
      rep_telefono: propietarioPf.repTelefono,
      rep_email: propietarioPf.repEmail,

      // DOMICILIO DEL REPRESENTANTE
      rep_calle: propietarioPf.repCalle,
      rep_num_ext: propietarioPf.repNumExt,
      rep_num_int: propietarioPf.repNumInt,
      rep_cp: propietarioPf.repCp,
      rep_colonia: propietarioPf.repColonia,
      rep_municipio: propietarioPf.repMunicipio,
      rep_estado: propietarioPf.repEstado,
      rep_referencias: propietarioPf.repReferencias,
    };
  }

  transformPropietarioPmToFormData(propietarioPm: PropietarioPm): any {
    const fechaConstitucion = propietarioPm.fechaConstitucion ? new Date(propietarioPm.fechaConstitucion) : null;
    const facultadesFechaEscritura = propietarioPm.facultadesFechaEscritura ? new Date(propietarioPm.facultadesFechaEscritura) : null;

    return {
      tipo_persona: "PM",
      // DATOS DE LA EMPRESA
      nombre_empresa: propietarioPm.nombreEmpresa,
      rfc: propietarioPm.rfc,
      email: propietarioPm.email,
      telefono: propietarioPm.telefono,

      // DOMICILIO DE LA EMPRESA
      dom_calle: propietarioPm.domCalle,
      dom_num_ext: propietarioPm.domNumExt,
      dom_num_int: propietarioPm.domNumInt,
      dom_cp: propietarioPm.domCp,
      dom_colonia: propietarioPm.domColonia,
      dom_municipio: propietarioPm.domMunicipio,
      dom_estado: propietarioPm.domEstado,
      dom_referencias: propietarioPm.domReferencias,

      // DATOS DE PAGO
      forma_pago: propietarioPm.formaPago,
      otra_forma_pago: propietarioPm.otraFormaPago,
      titular_cuenta: propietarioPm.titularCuenta,
      numero_cuenta: propietarioPm.numeroCuenta,
      banco: propietarioPm.banco,
      clabe: propietarioPm.clabe,

      // ACTA CONSTITUTIVA
      notario_nombres: propietarioPm.notarioNombres,
      notario_apellido_paterno: propietarioPm.notarioApellidoPaterno,
      notario_apellido_materno: propietarioPm.notarioApellidoMaterno,
      numero_escritura: propietarioPm.numeroEscritura,
      fecha_constitucion: fechaConstitucion ? fechaConstitucion.toISOString().split("T")[0] : "",
      notario_numero: propietarioPm.notarioNumero,
      ciudad_registro: propietarioPm.ciudadRegistro,
      estado_registro: propietarioPm.estadoRegistro,
      numero_registro: propietarioPm.numeroRegistro,
      giro_comercial: propietarioPm.giroComercial,

      // APODERADO LEGAL/REPRESENTANTE
      rep_legal_nombres: propietarioPm.repLegalNombres,
      rep_legal_apellido_paterno: propietarioPm.repLegalApellidoPaterno,
      rep_legal_apellido_materno: propietarioPm.repLegalApellidoMaterno,
      rep_legal_sexo: propietarioPm.repLegalSexo,
      rep_legal_curp: propietarioPm.repLegalCurp,
      rep_legal_email: propietarioPm.repLegalEmail,
      rep_legal_telefono: propietarioPm.repLegalTelefono,

      // DOMICILIO REPRESENTANTE LEGAL
      rep_legal_calle: propietarioPm.repLegalCalle,
      rep_legal_num_ext: propietarioPm.repLegalNumExt,
      rep_legal_num_int: propietarioPm.repLegalNumInt,
      rep_legal_cp: propietarioPm.repLegalCp,
      rep_legal_colonia: propietarioPm.repLegalColonia,
      rep_legal_municipio: propietarioPm.repLegalMunicipio,
      rep_legal_estado: propietarioPm.repLegalEstado,

      // FACULTADES DEL REPRESENTANTE
      facultades_acta: propietarioPm.facultadesActa,
      facultades_escritura_numero: propietarioPm.facultadesEscrituraNumero,
      facultades_notario_numero: propietarioPm.facultadesNotarioNumero,
      facultades_fecha_escritura: facultadesFechaEscritura ? facultadesFechaEscritura.toISOString().split("T")[0] : "",
      facultades_numero_inscripcion: propietarioPm.facultadesNumeroInscripcion,
      facultades_ciudad_registro: propietarioPm.facultadesCiudadRegistro,
      facultades_estado_registro: propietarioPm.facultadesEstadoRegistro,
      tipo_representacion: propietarioPm.tipoRepresentacion,
      tipo_representacion_otro: propietarioPm.tipoRepresentacionOtro,

      // DATOS DEL INMUEBLE
      tipo_inmueble: propietarioPm.tipoInmueble,
      uso_inmueble: propietarioPm.usoInmueble,
      permite_mascotas: propietarioPm.permiteMascotas,
      mascotas_especificacion: propietarioPm.mascotasEspecificacion,
      precio_renta: propietarioPm.precioRenta,
      iva_renta: propietarioPm.ivaRenta,
      frecuencia_pago: propietarioPm.frecuenciaPago,
      otra_frecuencia: propietarioPm.otraFrecuencia,
      condiciones_pago: propietarioPm.condicionesPago,
      deposito_garantia: propietarioPm.depositoGarantia,
      paga_mantenimiento: propietarioPm.pagaMantenimiento,
      quien_paga_mantenimiento: propietarioPm.quienPagaMantenimiento,
      mantenimiento_incluido: propietarioPm.mantenimientoIncluido,
      costo_mantenimiento: propietarioPm.costoMantenimiento,
      instrucciones_pago: propietarioPm.instruccionesPago,
      requiere_seguro: propietarioPm.requiereSeguro,
      cobertura_seguro: propietarioPm.coberturaSeguro,
      monto_seguro: propietarioPm.montoSeguro,
      servicios_pagar: propietarioPm.serviciosPagar,

      // DIRECCIÓN DEL INMUEBLE
      inmueble_calle: propietarioPm.inmuebleCalle,
      inmueble_num_ext: propietarioPm.inmuebleNumExt,
      inmueble_num_int: propietarioPm.inmuebleNumInt,
      inmueble_cp: propietarioPm.inmuebleCp,
      inmueble_colonia: propietarioPm.inmuebleColonia,
      inmueble_municipio: propietarioPm.inmuebleMunicipio,
      inmueble_estado: propietarioPm.inmuebleEstado,
      inmueble_referencias: propietarioPm.inmuebleReferencias,
      inmueble_inventario: propietarioPm.inmuebleInventario,
    };
  }
}