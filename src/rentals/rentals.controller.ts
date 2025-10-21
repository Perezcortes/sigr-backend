import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { RentalsService } from "./rentals.service";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { Rental } from "./entities/rental.entity";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "../auth/guards/auth.guards";
import { Permissions } from "../auth/guards/auth.guards";

@ApiTags("rentals")
@Controller("rentals")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post("manual")
  @Permissions("crear_rentas")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Crear una renta de forma manual",
    description: 'Crea una nueva renta junto con los datos del inquilino, propietario, propiedad y obligado solidario. Requiere el permiso "crear_rentas".',
  })
  @ApiBody({ type: CreateRentalDto })
  @ApiResponse({ status: 201, description: "Renta creada exitosamente.", type: Rental })
  @ApiResponse({ status: 400, description: "Datos de entrada inválidos." })
  async createManual(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalsService.createManualRental(createRentalDto);
  }

  @Get()
  @Permissions("ver_rentas")
  @ApiOperation({ summary: "Obtener todas las rentas", description: 'Devuelve una lista de todas las rentas. Requiere el permiso "ver_rentas".' })
  @ApiResponse({ status: 200, description: "Lista de rentas obtenida exitosamente.", type: [Rental] })
  async findAll(): Promise<Rental[]> {
    return this.rentalsService.findAllRentals();
  }

  @Get(":id")
  @Permissions("ver_rentas")
  @ApiOperation({ summary: "Obtener una renta por ID" })
  @ApiResponse({ status: 200, description: "Renta obtenida exitosamente.", type: Rental })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async findOne(@Param("id") id: string): Promise<Rental> {
    return this.rentalsService.findOneRental(id);
  }

  @Get(":id/inquilino")
  @Permissions("ver_rentas")
  @ApiOperation({ summary: "Obtener datos del inquilino por ID de renta" })
  @ApiResponse({ status: 200, description: "Datos del inquilino obtenidos exitosamente." })
  @ApiResponse({ status: 404, description: "Renta o inquilino no encontrado." })
  async getTenantByRentalId(@Param("id") rentalId: string): Promise<any> {
    return this.rentalsService.findTenantByRentalId(rentalId);
  }

  @Put(":id/inquilino")
  @Permissions("editar_rentas")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Actualizar datos del inquilino" })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: "Inquilino actualizado exitosamente." })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async updateTenant(@Param("id") rentalId: string, @Body() updateTenantDto: any): Promise<Rental> {
    return this.rentalsService.updateTenant(rentalId, updateTenantDto);
  }

  // =================== OBLIGADO SOLIDARIO ===================
  @Get(":id/obligado")
  @Permissions("ver_rentas")
  @ApiOperation({ summary: "Obtener datos del obligado solidario por ID de renta" })
  @ApiResponse({ status: 200, description: "Datos del obligado solidario obtenidos exitosamente." })
  @ApiResponse({ status: 404, description: "Renta u obligado no encontrado." })
  async getObligadoByRentalId(@Param("id") rentalId: string): Promise<any> {
    return this.rentalsService.findObligadoByRentalId(rentalId);
  }

  @Put(":id/obligado")
  @Permissions("editar_rentas")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Actualizar datos del obligado solidario" })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: "Obligado solidario actualizado exitosamente." })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async updateObligado(@Param("id") rentalId: string, @Body() updateObligadoDto: any): Promise<Rental> {
    return this.rentalsService.updateObligado(rentalId, updateObligadoDto);
  }

  @Put(":id/propietario")
  @Permissions("editar_rentas")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Actualizar datos del propietario" })
  @ApiResponse({ status: 200, description: "Propietario actualizado exitosamente." })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async updateOwner(@Param("id") rentalId: string, @Body() updateOwnerDto: any): Promise<Rental> {
    return this.rentalsService.updateOwner(rentalId, updateOwnerDto);
  }

  @Put(":id/propiedad")
  @Permissions("editar_rentas")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Actualizar datos de la propiedad" })
  @ApiResponse({ status: 200, description: "Propiedad actualizada exitosamente." })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async updateProperty(@Param("id") rentalId: string, @Body() updatePropertyDto: any): Promise<Rental> {
    return this.rentalsService.updateProperty(rentalId, updatePropertyDto);
  }

  @Put(":id/status")
  @Permissions("editar_rentas")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Cambiar estado de la renta" })
  @ApiResponse({ status: 200, description: "Estado actualizado exitosamente." })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async updateStatus(@Param("id") rentalId: string, @Body() statusDto: { status: string }): Promise<Rental> {
    return this.rentalsService.updateStatus(rentalId, statusDto.status);
  }

  @Delete(":id")
  @Permissions("eliminar_rentas")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Eliminar una renta" })
  @ApiResponse({ status: 200, description: "Renta eliminada exitosamente." })
  @ApiResponse({ status: 404, description: "Renta no encontrada." })
  async remove(@Param("id") id: string): Promise<{ message: string }> {
    return this.rentalsService.removeRental(id);
  }
}
