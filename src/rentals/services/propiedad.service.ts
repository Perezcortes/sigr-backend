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
    // Mapear los campos del DTO combinado a la entidad
    const propiedad = this.propiedadRepository.create({
      rentaId,
      // Campos de domicilio
      domCalle: propiedadData.calle,
      domNumExt: propiedadData.numExt,
      domNumInt: propiedadData.numInt,
      domCp: propiedadData.cp,
      domColonia: propiedadData.colonia,
      domMunicipio: propiedadData.municipio,
      domEstado: propiedadData.estado,
      domReferencias: propiedadData.referencias,
      // Campos del inmueble
      tipoPropiedad: propiedadData.tipoInmueble,
      usoSuelo: propiedadData.usoSuelo,
      permiteMascotas: propiedadData.mascotas,
      mascotasEspecifique: propiedadData.mascotasEspecifique,
      precioRenta: propiedadData.precioRenta,
      ivaRenta: propiedadData.ivaRenta,
      frecuenciaPago: propiedadData.frecuenciaPago,
      otraFrecuencia: propiedadData.otraFrecuencia,
      condicionesPago: propiedadData.condicionesPago,
      depositoGarantia: propiedadData.depositoGarantia,
      pagaMantenimiento: propiedadData.pagaMantenimiento,
      quienPagaMantenimiento: propiedadData.quienPagaMantenimiento,
      mantenimientoIncluido: propiedadData.mantenimientoIncluido,
      costoMantenimiento: propiedadData.costoMantenimiento,
      instruccionesPago: propiedadData.instruccionesPago,
      requiereSeguro: propiedadData.requiereSeguro,
      coberturaSeguro: propiedadData.coberturaSeguro,
      montoSeguro: propiedadData.montoSeguro,
      serviciosPagar: propiedadData.serviciosPagar,
      inventario: propiedadData.inventario,
    });

    await queryRunner.manager.save(propiedad);
  }

  async updatePropiedad(propiedadId: string, updateData: any, queryRunner: any): Promise<void> {
    await queryRunner.manager.update(Propiedad, propiedadId, {
      // Implementar campos específicos para propiedad
      calle: updateData.calle,
      numeroExterior: updateData.numeroExterior,
      numeroInterior: updateData.numeroInterior,
      colonia: updateData.colonia,
      municipio: updateData.municipio,
      estado: updateData.estado,
      cp: updateData.cp,
      // ... otros campos
    });
  }
}
