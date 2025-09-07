import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.dto';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Permissions('gestionar_roles')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo rol', description: 'Crea un nuevo rol con permisos, requiere el permiso "gestionar_roles".' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente.', type: Role })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Permissions('ver_roles')
  @ApiOperation({ summary: 'Listar todos los roles', description: 'Retorna una lista de todos los roles, requiere el permiso "ver_roles".' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida exitosamente.', type: [Role] })
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Permissions('ver_roles')
  @ApiOperation({ summary: 'Obtener un rol por ID', description: 'Busca y retorna un rol por su ID, requiere el permiso "ver_roles".' })
  @ApiParam({ name: 'id', description: 'ID del rol a buscar' })
  @ApiResponse({ status: 200, description: 'Rol encontrado exitosamente.', type: Role })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(Number(id));
  }

  @Patch(':id')
  @Permissions('gestionar_roles')
  @ApiOperation({ summary: 'Actualizar un rol', description: 'Actualiza un rol existente, requiere el permiso "gestionar_roles".' })
  @ApiParam({ name: 'id', description: 'ID del rol a actualizar' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente.', type: Role })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(Number(id), updateRoleDto);
  }

  @Delete(':id')
  @Permissions('gestionar_roles')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un rol', description: 'Elimina un rol de forma lógica (soft delete), requiere el permiso "gestionar_roles".' })
  @ApiParam({ name: 'id', description: 'ID del rol a eliminar' })
  @ApiResponse({ status: 204, description: 'Rol eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(Number(id));
  }
}
