import { Controller, Get, Param, UseGuards, Post, Body, HttpCode, HttpStatus, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from './dto/users.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('ver_usuarios')
  @ApiOperation({
    summary: 'Obtener todos los usuarios con filtros',
    description: 'Retorna la lista completa de usuarios registrados en el sistema, permitiendo filtros por búsqueda general y campos específicos. Requiere el permiso "ver_usuarios".',
  })
  @ApiQuery({ name: 'search', required: false, description: 'Búsqueda por nombre, apellido o correo.' })
  @ApiQuery({ name: 'roleId', required: false, description: 'Filtro por ID de rol.' })
  @ApiQuery({ name: 'officeId', required: false, description: 'Filtro por ID de oficina.' })
  @ApiQuery({ name: 'is_active', required: false, description: 'Filtro por estado de actividad (true/false).' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente.',
    type: [User],
  })
  async findAll(@Query() filters: FilterUserDto): Promise<User[]> {
    return this.usersService.findAll(filters);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('ver_usuarios')
  @ApiOperation({
    summary: 'Buscar usuario por ID',
    description: 'Busca y retorna un usuario específico usando su ID único, requiere el permiso "ver_usuarios".',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del usuario a buscar',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(PermissionsGuard)
  @Permissions('crear_usuarios')
  @ApiOperation({
    summary: 'Crear nuevo usuario',
    description: 'Crea una nueva cuenta de usuario, requiere el permiso "crear_usuarios".',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente.',
    type: User,
  })
  async create(@Body() createUserData: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserData);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('editar_usuarios')
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza la información de un usuario existente, requiere el permiso "editar_usuarios".',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del usuario a actualizar',
    type: 'string',
    example: '1',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  async update(@Param('id') id: string, @Body() updateUserData: UpdateUserDto): Promise<User> {
    return this.usersService.update(Number(id), updateUserData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PermissionsGuard)
  @Permissions('eliminar_usuarios')
  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario de forma lógica (soft delete), requiere el permiso "eliminar_usuarios".',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del usuario a eliminar',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(Number(id));
  }
}
