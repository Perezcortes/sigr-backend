import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propiedad } from '../entities';

@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad)
    private readonly propiedadRepository: Repository<Propiedad>,
  ) {}

  async createPropiedad(rentaId: string, propiedadData: any, tipoPropiedad: string, queryRunner: any): Promise<void> {
    const propiedad = this.propiedadRepository.create({
      ...propiedadData,
      rentaId,
      tipoPropiedad,
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