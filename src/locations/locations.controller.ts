import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { Estate } from '../offices/entities/estate.entity';
import { City } from '../offices/entities/city.entity';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('estates/by-name')
  @ApiOperation({ summary: 'Obtener un estado por su nombre' })
  @ApiQuery({ name: 'nombre', description: 'Nombre del estado a buscar', example: 'Oaxaca' })
  @ApiResponse({ status: 200, description: 'Estado encontrado exitosamente.', type: Estate })
  @ApiResponse({ status: 404, description: 'Estado no encontrado.' })
  async findEstateByName(@Query('nombre') nombre: string): Promise<Estate> {
    if (!nombre) {
      throw new NotFoundException('El nombre del estado es requerido.');
    }
    return this.locationsService.findEstateByName(nombre);
  }

  @Get('cities/by-name')
  @ApiOperation({ summary: 'Obtener una ciudad por su nombre' })
  @ApiQuery({ name: 'nombre', description: 'Nombre de la ciudad a buscar', example: 'Oaxaca de Juárez' })
  @ApiResponse({ status: 200, description: 'Ciudad encontrada exitosamente.', type: City })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada.' })
  async findCityByName(@Query('nombre') nombre: string): Promise<City> {
    if (!nombre) {
      throw new NotFoundException('El nombre de la ciudad es requerido.');
    }
    return this.locationsService.findCityByName(nombre);
  }
}
