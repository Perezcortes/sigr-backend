/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';

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
  getUserById(@Param('id') id: string): User | undefined {
    return this.users.find(user => user.id === Number(id)) || undefined;
  }


}
