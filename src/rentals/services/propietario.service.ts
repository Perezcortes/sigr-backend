import { Injectable } from '@nestjs/common';
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
    await queryRunner.manager.update(PropietarioPf, propietarioId, {
      // Implementar campos específicos para propietario PF
      nombres: updateData.nombres,
      apellidoPaterno: updateData.apellidoPaterno,
      apellidoMaterno: updateData.apellidoMaterno,
      rfc: updateData.rfc,
      email: updateData.email,
      telefono: updateData.telefono,
      // ... otros campos
    });
  }

  async updatePropietarioPersonaMoral(propietarioId: string, updateData: any, queryRunner: any): Promise<void> {
    await queryRunner.manager.update(PropietarioPm, propietarioId, {
      // Implementar campos específicos para propietario PM
      nombreEmpresa: updateData.nombreEmpresa,
      rfc: updateData.rfc,
      email: updateData.email,
      telefono: updateData.telefono,
      // ... otros campos
    });
  }
}