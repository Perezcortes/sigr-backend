import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permissions.dto';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';
import { HashidsService } from '../auth/hashids.service';

@ApiTags('permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly hashidsService: HashidsService,
  ) {}

  @Post()
  @Permissions('gestionar_permisos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo permiso', description: 'Crea un nuevo permiso en el sistema, requiere el permiso "gestionar_permisos".' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponse({ status: 201, description: 'Permiso creado exitosamente.', type: Permission })
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = await this.permissionsService.create(createPermissionDto);
    const permissionWithEncodedId = { ...permission, id: this.hashidsService.encode(permission.id) };
    return permissionWithEncodedId as any;
  }

  @Get()
  @Permissions('ver_permisos')
  @ApiOperation({ summary: 'Listar todos los permisos', description: 'Retorna una lista de todos los permisos, requiere el permiso "ver_permisos".' })
  @ApiResponse({ status: 200, description: 'Lista de permisos obtenida exitosamente.', type: [Permission] })
  async findAll(): Promise<Permission[]> {
    const permissions = await this.permissionsService.findAll();
    return permissions.map(permission => {
      const permissionWithEncodedId = { ...permission, id: this.hashidsService.encode(permission.id) };
      return permissionWithEncodedId as any;
    });
  }

  @Get(':id')
  @Permissions('ver_permisos')
  @ApiOperation({ summary: 'Obtener un permiso por ID', description: 'Busca y retorna un permiso por su ID, requiere el permiso "ver_permisos".' })
  @ApiParam({ name: 'id', description: 'ID del permiso a buscar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiResponse({ status: 200, description: 'Permiso encontrado exitosamente.', type: Permission })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado.' })
  async findOne(@Param('id') id: string): Promise<Permission> {
    const permissionId = this.hashidsService.decode(id);
    if (permissionId === null) {
      throw new NotFoundException('ID de permiso inválido.');
    }
    const permission = await this.permissionsService.findOne(Number(permissionId));
    const permissionWithEncodedId = { ...permission, id: this.hashidsService.encode(permission.id) };
    return permissionWithEncodedId as any;
  }

  @Patch(':id')
  @Permissions('gestionar_permisos')
  @ApiOperation({ summary: 'Actualizar un permiso', description: 'Actualiza un permiso existente, requiere el permiso "gestionar_permisos".' })
  @ApiParam({ name: 'id', description: 'ID del permiso a actualizar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiBody({ type: UpdatePermissionDto })
  @ApiResponse({ status: 200, description: 'Permiso actualizado exitosamente.', type: Permission })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado.' })
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permissionId = this.hashidsService.decode(id);
    if (permissionId === null) {
      throw new NotFoundException('ID de permiso inválido.');
    }
    const permission = await this.permissionsService.update(Number(permissionId), updatePermissionDto);
    const permissionWithEncodedId = { ...permission, id: this.hashidsService.encode(permission.id) };
    return permissionWithEncodedId as any;
  }

  @Delete(':id')
  @Permissions('gestionar_permisos')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un permiso', description: 'Elimina un permiso de forma lógica (soft delete), requiere el permiso "gestionar_permisos".' })
  @ApiParam({ name: 'id', description: 'ID del permiso a eliminar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiResponse({ status: 204, description: 'Permiso eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    const permissionId = this.hashidsService.decode(id);
    if (permissionId === null) {
      throw new NotFoundException('ID de permiso inválido.');
    }
    await this.permissionsService.remove(Number(permissionId));
  }
}
