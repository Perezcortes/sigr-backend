import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Propiedad } from "../entities";

@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad)
    private readonly propiedadRepository: Repository<Propiedad>,
  ) {}

  async createPropiedad(rentaId: string, propiedadData: any, queryRunner: any): Promise<void> {
    const propiedad = this.propiedadRepository.create({
      rentaId,
      // Campos de domicilio
      domCalle: propiedadData.dom_calle,
      domNumExt: propiedadData.dom_num_ext,
      domNumInt: propiedadData.dom_num_int,
      domCp: propiedadData.dom_cp,
      domColonia: propiedadData.dom_colonia,
      domMunicipio: propiedadData.dom_municipio,
      domEstado: propiedadData.dom_estado,
      domReferencias: propiedadData.dom_referencias,
      // Campos del inmueble
      tipoPropiedad: propiedadData.tipoPropiedad,
      usoSuelo: propiedadData.uso_suelo,
      permiteMascotas: propiedadData.permite_mascotas,
      mascotasEspecifique: propiedadData.mascotas_especifique,
      precioRenta: propiedadData.precio_renta,
      ivaRenta: propiedadData.iva_renta,
      frecuenciaPago: propiedadData.frecuencia_pago,
      otraFrecuencia: propiedadData.otra_frecuencia,
      condicionesPago: propiedadData.condiciones_pago,
      depositoGarantia: propiedadData.deposito_garantia,
      pagaMantenimiento: propiedadData.paga_mantenimiento,
      quienPagaMantenimiento: propiedadData.quien_paga_mantenimiento,
      mantenimientoIncluido: propiedadData.mantenimiento_incluido,
      costoMantenimiento: propiedadData.costo_mantenimiento,
      instruccionesPago: propiedadData.instrucciones_pago,
      requiereSeguro: propiedadData.requiere_seguro,
      coberturaSeguro: propiedadData.cobertura_seguro,
      montoSeguro: propiedadData.monto_seguro,
      serviciosPagar: propiedadData.servicios_pagar,
      inventario: propiedadData.inventario,
    });

    await queryRunner.manager.save(propiedad);
  }

  async updatePropiedad(propiedadId: string, updateData: any, queryRunner: any): Promise<void> {
    await queryRunner.manager.update(Propiedad, propiedadId, {
      // Campos de domicilio
      domCalle: updateData.dom_calle,
      domNumExt: updateData.dom_num_ext,
      domNumInt: updateData.dom_num_int,
      domCp: updateData.dom_cp,
      domColonia: updateData.dom_colonia,
      domMunicipio: updateData.dom_municipio,
      domEstado: updateData.dom_estado,
      domReferencias: updateData.dom_referencias,
      // Campos del inmueble
      tipoPropiedad: updateData.tipoPropiedad,
      usoSuelo: updateData.uso_suelo,
      permiteMascotas: updateData.permite_mascotas,
      mascotasEspecifique: updateData.mascotas_especifique,
      precioRenta: updateData.precio_renta,
      ivaRenta: updateData.iva_renta,
      frecuenciaPago: updateData.frecuencia_pago,
      otraFrecuencia: updateData.otra_frecuencia,
      condicionesPago: updateData.condiciones_pago,
      depositoGarantia: updateData.deposito_garantia,
      pagaMantenimiento: updateData.paga_mantenimiento,
      quienPagaMantenimiento: updateData.quien_paga_mantenimiento,
      mantenimientoIncluido: updateData.mantenimiento_incluido,
      costoMantenimiento: updateData.costo_mantenimiento,
      instruccionesPago: updateData.instrucciones_pago,
      requiereSeguro: updateData.requiere_seguro,
      coberturaSeguro: updateData.cobertura_seguro,
      montoSeguro: updateData.monto_seguro,
      serviciosPagar: updateData.servicios_pagar,
      inventario: updateData.inventario,
    });
  }

  transformPropiedadToFormData(propiedad: Propiedad): any {
    return {
      // Campos de domicilio
      dom_calle: propiedad.domCalle,
      dom_num_ext: propiedad.domNumExt,
      dom_num_int: propiedad.domNumInt,
      dom_cp: propiedad.domCp,
      dom_colonia: propiedad.domColonia,
      dom_municipio: propiedad.domMunicipio,
      dom_estado: propiedad.domEstado,
      dom_referencias: propiedad.domReferencias,
      // Campos del inmueble
      tipoPropiedad: propiedad.tipoPropiedad,
      uso_suelo: propiedad.usoSuelo,
      permite_mascotas: propiedad.permiteMascotas,
      mascotas_especifique: propiedad.mascotasEspecifique,
      precio_renta: propiedad.precioRenta,
      iva_renta: propiedad.ivaRenta,
      frecuencia_pago: propiedad.frecuenciaPago,
      otra_frecuencia: propiedad.otraFrecuencia,
      condiciones_pago: propiedad.condicionesPago,
      deposito_garantia: propiedad.depositoGarantia,
      paga_mantenimiento: propiedad.pagaMantenimiento,
      quien_paga_mantenimiento: propiedad.quienPagaMantenimiento,
      mantenimiento_incluido: propiedad.mantenimientoIncluido,
      costo_mantenimiento: propiedad.costoMantenimiento,
      instrucciones_pago: propiedad.instruccionesPago,
      requiere_seguro: propiedad.requiereSeguro,
      cobertura_seguro: propiedad.coberturaSeguro,
      monto_seguro: propiedad.montoSeguro,
      servicios_pagar: propiedad.serviciosPagar,
      inventario: propiedad.inventario,
    };
  }
}