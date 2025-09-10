import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { Permission } from './entities/permission.entity';
import { HashidsService } from '../auth/hashids.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly hashidsService: HashidsService,
  ) {}

  /**
   * Obtiene todos los permisos de la base de datos.
   * @returns Un arreglo de objetos de permiso.
   */
  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  /**
   * Obtiene un permiso por su ID.
   * @param id El ID del permiso.
   * @returns Un objeto de permiso si se encuentra, de lo contrario lanza una excepción.
   */
  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException(`Permiso con ID ${id} no encontrado.`);
    }
    return permission;
  }

  /**
   * Crea un nuevo permiso en la base de datos.
   * @param createPermissionDto Los datos para crear el permiso.
   * @returns El permiso recién creado.
   */
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto as DeepPartial<Permission>);
    return this.permissionRepository.save(permission);
  }

  /**
   * Actualiza un permiso existente en la base de datos.
   * @param id El ID del permiso a actualizar.
   * @param updatePermissionDto Los datos para actualizar el permiso.
   * @returns El permiso actualizado.
   */
  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);
    this.permissionRepository.merge(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  /**
   * Elimina un permiso de la base de datos (eliminación lógica).
   * @param id El ID del permiso a eliminar.
   */
  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.softDelete(permission.id);
  }
}
