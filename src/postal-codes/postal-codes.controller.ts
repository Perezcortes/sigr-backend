import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PostalCodesService } from './postal-codes.service';

@ApiTags('postal-codes')
@Controller('postal-codes')
export class PostalCodesController {
  constructor(private readonly postalCodesService: PostalCodesService) {}

  @Get(':cp')
  @ApiOperation({ summary: 'Obtener información de un código postal' })
  @ApiParam({ name: 'cp', description: 'Código postal de 5 dígitos', example: '68000' })
  @ApiResponse({ status: 200, description: 'Información del código postal obtenida exitosamente.' })
  @ApiResponse({ status: 400, description: 'Código postal inválido o no encontrado.' })
  async getInfoByCp(@Param('cp') cp: string) {
    // Validar que el código postal sea un número de 5 dígitos
    if (!/^\d{5}$/.test(cp)) {
      throw new BadRequestException('El código postal debe ser un número de 5 dígitos.');
    }
    return this.postalCodesService.getInfoByPostalCode(cp);
  }
}
