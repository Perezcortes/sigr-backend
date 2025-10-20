import { Injectable } from '@nestjs/common';
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
    await queryRunner.manager.update(ObligadoSolidarioPf, obligadoId, {
      // Implementar campos específicos para obligado PF
      nombres: updateData.nombres,
      apellidoPaterno: updateData.apellidoPaterno,
      apellidoMaterno: updateData.apellidoMaterno,
      rfc: updateData.rfc,
      email: updateData.email,
      telefono: updateData.telefono,
      // ... otros campos
    });
  }

  async updateObligadoPersonaMoral(obligadoId: string, updateData: any, queryRunner: any): Promise<void> {
    await queryRunner.manager.update(ObligadoSolidarioPm, obligadoId, {
      // Implementar campos específicos para obligado PM
      nombreEmpresa: updateData.nombreEmpresa,
      rfc: updateData.rfc,
      email: updateData.email,
      telefono: updateData.telefono,
      // ... otros campos
    });
  }
}