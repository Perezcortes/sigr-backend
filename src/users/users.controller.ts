/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

interface User {
  id: number;
  name: string;
  email: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {

  private users: User[] = [
    {
      id: 1,
      name: 'Carlos',
      email: 'carlos@rentas.com',
    },
    {
      id: 2,
      name: 'Roberto',
      email: 'Roberto@rentas.com',
    },
    {
      id: 3,
      name: 'Marina',
      email: 'marina@rentas.com',
    },
  ];

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Retorna la lista completa de usuarios registrados en el sistema de rentas'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Carlos' },
          email: { type: 'string', example: 'carlos@rentas.com' }
        }
      }
    }
  })
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar usuario por ID',
    description: 'Busca y retorna un usuario específico usando su ID único'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único del usuario a buscar',
    type: 'string',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario encontrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Carlos' },
        email: { type: 'string', example: 'carlos@rentas.com' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'string', example: 'User not found' }
      }
    }
  })
  findUser(@Param('id') id: string): User | { error: string } {
    const user = this.users.find((user) => user.id === Number(id));
    if (!user) {
      return {
        error: 'User not found',
      };
    }
    return user;
  }

  @Post()
  @ApiOperation({ 
    summary: 'Crear nuevo usuario',
    description: 'Crea y registra un nuevo usuario en el sistema de rentas'
  })
  @ApiBody({
    description: 'Datos del nuevo usuario',
    schema: {
      type: 'object',
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number', example: 4 },
        name: { type: 'string', example: 'Ana López' },
        email: { type: 'string', example: 'ana@rentas.com' }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 4 },
        name: { type: 'string', example: 'Ana López' },
        email: { type: 'string', example: 'ana@rentas.com' }
      }
    }
  })
  createUser(@Body() body: User): User {
    this.users.push(body);
    return body;
  }
}