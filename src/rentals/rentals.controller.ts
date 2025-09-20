import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, NotFoundException, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/rental.dto';
import { JwtAuthGuard, PermissionsGuard, Permissions } from '../auth/guards/auth.guards';
import { Rental } from './entities/rental.entity';

@ApiTags('rentals')
@Controller('rentals')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post('manual')
  @Permissions('crear_rentas')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una renta de forma manual',
    description: 'Crea una nueva renta junto con los datos del inquilino, propietario, propiedad y obligado solidario. Requiere el permiso "crear_rentas".',
  })
  @ApiBody({ type: CreateRentalDto })
  @ApiResponse({ status: 201, description: 'Renta creada exitosamente.', type: Rental })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createManual(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalsService.createManualRental(createRentalDto);
  }

  @Get()
  @Permissions('ver_rentas')
  @ApiOperation({ summary: 'Obtener todas las rentas', description: 'Devuelve una lista de todas las rentas. Requiere el permiso "ver_rentas".' })
  @ApiResponse({ status: 200, description: 'Lista de rentas obtenida exitosamente.', type: [Rental] })
  async findAll(): Promise<Rental[]> {
    return this.rentalsService.findAllRentals();
  }
}