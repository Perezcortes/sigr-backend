/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {

  private users: User[] = [
    {
      id: 1,
      name: 'Calos',
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
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
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
  createUser(@Body() body: User): User {
    this.users.push(body);
    return body;
  }

}
