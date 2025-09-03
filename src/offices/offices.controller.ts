import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

interface Office {
  id: number;
  name: string;
  address: string;
  city: string;
}

@ApiTags("offices")
@Controller("offices")
export class OfficesController {
  private offices: Office[] = [
    {
      id: 1,
      name: "Oficina Central",
      address: "Av. Independencia 123",
      city: "Huajuapan de León",
    },
    {
      id: 2,
      name: "Sucursal Norte",
      address: "Calle Morelos 456",
      city: "Oaxaca",
    },
  ];

  @Get()
  @ApiOperation({
    summary: "Obtener todas las oficinas",
    description: "Retorna la lista de todas las oficinas disponibles para rentas",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de oficinas obtenida exitosamente",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number", example: 1 },
          name: { type: "string", example: "Oficina Central" },
          address: { type: "string", example: "Av. Independencia 123" },
          city: { type: "string", example: "Huajuapan de León" },
        },
      },
    },
  })
  getOffices(): Office[] {
    return this.offices;
  }
}
