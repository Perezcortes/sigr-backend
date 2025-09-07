import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { OfficesService } from './offices.service';
import { Office } from './entities/office.entity';
import { CreateOfficeDto, UpdateOfficeDto } from './dto/offices.dto';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';

@ApiTags('offices')
@Controller('offices')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @Permissions('crear_oficinas')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva oficina', description: 'Crea una nueva oficina en el sistema, requiere el permiso "crear_oficinas".' })
  @ApiBody({ type: CreateOfficeDto })
  @ApiResponse({ status: 201, description: 'Oficina creada exitosamente.', type: Office })
  async create(@Body() createOfficeDto: CreateOfficeDto): Promise<Office> {
    return this.officesService.create(createOfficeDto);
  }

  @Get()
  @Permissions('ver_oficinas')
  @ApiOperation({ summary: 'Obtener todas las oficinas', description: 'Retorna una lista de todas las oficinas, requiere el permiso "ver_oficinas".' })
  @ApiResponse({ status: 200, description: 'Lista de oficinas obtenida exitosamente.', type: [Office] })
  async findAll(): Promise<Office[]> {
    return this.officesService.findAll();
  }

  @Get(':id')
  @Permissions('ver_oficinas')
  @ApiOperation({ summary: 'Obtener una oficina por ID', description: 'Busca y retorna una oficina por su ID, requiere el permiso "ver_oficinas".' })
  @ApiParam({ name: 'id', description: 'ID de la oficina a buscar' })
  @ApiResponse({ status: 200, description: 'Oficina encontrada exitosamente.', type: Office })
  @ApiResponse({ status: 404, description: 'Oficina no encontrada.' })
  async findOne(@Param('id') id: string): Promise<Office> {
    return this.officesService.findOne(Number(id));
  }

  @Patch(':id')
  @Permissions('editar_oficinas')
  @ApiOperation({ summary: 'Actualizar una oficina', description: 'Actualiza una oficina existente, requiere el permiso "editar_oficinas".' })
  @ApiParam({ name: 'id', description: 'ID de la oficina a actualizar' })
  @ApiBody({ type: UpdateOfficeDto })
  @ApiResponse({ status: 200, description: 'Oficina actualizada exitosamente.', type: Office })
  @ApiResponse({ status: 404, description: 'Oficina no encontrada.' })
  async update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto): Promise<Office> {
    return this.officesService.update(Number(id), updateOfficeDto);
  }

  @Delete(':id')
  @Permissions('eliminar_oficinas')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una oficina', description: 'Elimina una oficina de forma lógica (soft delete), requiere el permiso "eliminar_oficinas".' })
  @ApiParam({ name: 'id', description: 'ID de la oficina a eliminar' })
  @ApiResponse({ status: 204, description: 'Oficina eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Oficina no encontrada.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.officesService.remove(Number(id));
  }
}
