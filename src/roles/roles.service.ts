import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado.`);
    }
    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { permissions, ...roleData } = createRoleDto;

    const role = this.roleRepository.create(roleData);

    if (permissions && permissions.length > 0) {
      const foundPermissions = await this.permissionRepository.findBy({ id: In(permissions) });
      if (foundPermissions.length !== permissions.length) {
        throw new BadRequestException('Uno o más permisos no son válidos.');
      }
      role.permissions = foundPermissions;
    }

    return this.roleRepository.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    const { permissions, ...roleData } = updateRoleDto;

    if (permissions !== undefined) {
      const foundPermissions = await this.permissionRepository.findBy({ id: In(permissions) });
      if (foundPermissions.length !== permissions.length) {
        throw new BadRequestException('Uno o más permisos no son válidos.');
      }
      // Reemplaza los permisos existentes con los nuevos
      role.permissions = foundPermissions;
    }

    this.roleRepository.merge(role, roleData);
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.softDelete(role.id);
  }
}
