import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Mensaje de bienvenida',
    description: 'Endpoint principal que retorna un saludo de la API'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Mensaje de bienvenida exitoso',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  @ApiOperation({ 
    summary: 'Health check',
    description: 'Endpoint para verificar que la API está funcionando correctamente'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API funcionando correctamente',
    schema: {
      type: 'string',
      example: 'pong'
    }
  })
  ping(): string {
    return 'pong';
  }
}