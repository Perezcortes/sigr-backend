import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.dto';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';
import { HashidsService } from '../auth/hashids.service';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly hashidsService: HashidsService,
  ) {}

  @Post()
  @Permissions('gestionar_roles')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo rol', description: 'Crea un nuevo rol con permisos, requiere el permiso "gestionar_roles".' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente.', type: Role })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.rolesService.create(createRoleDto);
    const roleWithEncodedId = { ...role, id: this.hashidsService.encode(role.id) };
    return roleWithEncodedId as any;
  }

  @Get()
  @Permissions('ver_roles')
  @ApiOperation({ summary: 'Listar todos los roles', description: 'Retorna una lista de todos los roles, requiere el permiso "ver_roles".' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida exitosamente.', type: [Role] })
  async findAll(): Promise<Role[]> {
    const roles = await this.rolesService.findAll();
    return roles.map(role => {
      const roleWithEncodedId = { ...role, id: this.hashidsService.encode(role.id) };
      return roleWithEncodedId as any;
    });
  }

  @Get(':id')
  @Permissions('ver_roles')
  @ApiOperation({ summary: 'Obtener un rol por ID', description: 'Busca y retorna un rol por su ID, requiere el permiso "ver_roles".' })
  @ApiParam({ name: 'id', description: 'ID del rol a buscar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiResponse({ status: 200, description: 'Rol encontrado exitosamente.', type: Role })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async findOne(@Param('id') id: string): Promise<Role> {
    const roleId = this.hashidsService.decode(id);
    if (roleId === null) {
      throw new NotFoundException('ID de rol inválido.');
    }
    const role = await this.rolesService.findOne(Number(roleId));
    const roleWithEncodedId = { ...role, id: this.hashidsService.encode(role.id) };
    return roleWithEncodedId as any;
  }

  @Patch(':id')
  @Permissions('gestionar_roles')
  @ApiOperation({ summary: 'Actualizar un rol', description: 'Actualiza un rol existente, requiere el permiso "gestionar_roles".' })
  @ApiParam({ name: 'id', description: 'ID del rol a actualizar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente.', type: Role })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    const roleId = this.hashidsService.decode(id);
    if (roleId === null) {
      throw new NotFoundException('ID de rol inválido.');
    }
    const role = await this.rolesService.update(Number(roleId), updateRoleDto);
    const roleWithEncodedId = { ...role, id: this.hashidsService.encode(role.id) };
    return roleWithEncodedId as any;
  }

  @Delete(':id')
  @Permissions('gestionar_roles')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un rol', description: 'Elimina un rol de forma lógica (soft delete), requiere el permiso "gestionar_roles".' })
  @ApiParam({ name: 'id', description: 'ID del rol a eliminar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiResponse({ status: 204, description: 'Rol eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    const roleId = this.hashidsService.decode(id);
    if (roleId === null) {
      throw new NotFoundException('ID de rol inválido.');
    }
    return this.rolesService.remove(Number(roleId));
  }
}
