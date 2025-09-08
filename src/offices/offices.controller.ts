import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';

import { OfficesService } from './offices.service';
import { Office } from './entities/office.entity';
import { CreateOfficeDto, UpdateOfficeDto, FilterOfficeDto } from './dto/offices.dto';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';
import { HashidsService } from '../auth/hashids.service';

@ApiTags('offices')
@Controller('offices')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class OfficesController {
  constructor(
    private readonly officesService: OfficesService,
    private readonly hashidsService: HashidsService,
  ) {}

  @Post()
  @Permissions('crear_oficinas')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva oficina', description: 'Crea una nueva oficina en el sistema, requiere el permiso "crear_oficinas".' })
  @ApiBody({ type: CreateOfficeDto })
  @ApiResponse({ status: 201, description: 'Oficina creada exitosamente.', type: Office })
  async create(@Body() createOfficeDto: CreateOfficeDto): Promise<Office> {
    const office = await this.officesService.create(createOfficeDto);
    const officeWithEncodedId = { ...office, id: this.hashidsService.encode(office.id) };
    return officeWithEncodedId as any;
  }

  @Get()
  @Permissions('ver_oficinas')
  @ApiOperation({ summary: 'Obtener todas las oficinas con filtros', description: 'Retorna una lista de todas las oficinas, permitiendo filtros por búsqueda general y campos específicos. Requiere el permiso "ver_oficinas".' })
  @ApiQuery({ name: 'search', required: false, description: 'Búsqueda por nombre, responsable, clave, o correo.' })
  @ApiQuery({ name: 'cityId', required: false, description: 'Filtro por ID de ciudad.' })
  @ApiQuery({ name: 'estateId', required: false, description: 'Filtro por ID de estado.' })
  @ApiQuery({ name: 'estatus_actividad', required: false, description: 'Filtro por estado de actividad (true/false).' })
  @ApiResponse({ status: 200, description: 'Lista de oficinas obtenida exitosamente.', type: [Office] })
  async findAll(@Query() filters: FilterOfficeDto): Promise<Office[]> {
    const offices = await this.officesService.findAll(filters);
    return offices.map(office => {
      const officeWithEncodedId = { ...office, id: this.hashidsService.encode(office.id) };
      return officeWithEncodedId as any;
    });
  }

  @Get(':id')
  @Permissions('ver_oficinas')
  @ApiOperation({ summary: 'Obtener una oficina por ID', description: 'Busca y retorna una oficina por su ID, requiere el permiso "ver_oficinas".' })
  @ApiParam({ name: 'id', description: 'ID de la oficina a buscar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiResponse({ status: 200, description: 'Oficina encontrada exitosamente.', type: Office })
  @ApiResponse({ status: 404, description: 'Oficina no encontrada.' })
  async findOne(@Param('id') id: string): Promise<Office> {
    const officeId = this.hashidsService.decode(id);
    if (officeId === null) {
      throw new NotFoundException('ID de oficina inválido.');
    }
    const office = await this.officesService.findOne(Number(officeId));
    const officeWithEncodedId = { ...office, id: this.hashidsService.encode(office.id) };
    return officeWithEncodedId as any;
  }

  @Patch(':id')
  @Permissions('editar_oficinas')
  @ApiOperation({ summary: 'Actualizar una oficina', description: 'Actualiza una oficina existente, requiere el permiso "editar_oficinas".' })
  @ApiParam({ name: 'id', description: 'ID de la oficina a actualizar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiBody({ type: UpdateOfficeDto })
  @ApiResponse({ status: 200, description: 'Oficina actualizada exitosamente.', type: Office })
  @ApiResponse({ status: 404, description: 'Oficina no encontrada.' })
  async update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto): Promise<Office> {
    const officeId = this.hashidsService.decode(id);
    if (officeId === null) {
      throw new NotFoundException('ID de oficina inválido.');
    }
    const office = await this.officesService.update(Number(officeId), updateOfficeDto);
    const officeWithEncodedId = { ...office, id: this.hashidsService.encode(office.id) };
    return officeWithEncodedId as any;
  }

  @Delete(':id')
  @Permissions('eliminar_oficinas')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una oficina', description: 'Elimina una oficina de forma lógica (soft delete), requiere el permiso "eliminar_oficinas".' })
  @ApiParam({ name: 'id', description: 'ID de la oficina a eliminar (hash)', type: 'string', example: 'hg234234jkh' })
  @ApiResponse({ status: 204, description: 'Oficina eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Oficina no encontrada.' })
  async remove(@Param('id') id: string): Promise<void> {
    const officeId = this.hashidsService.decode(id);
    if (officeId === null) {
      throw new NotFoundException('ID de oficina inválido.');
    }
    return this.officesService.remove(Number(officeId));
  }
}
