import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
// entidades adicionales que UsersService necesita
import { Role } from '../roles/entities/role.entity';
import { Office } from '../offices/entities/office.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      // Agregar los repositorios de Role y Office para que estén disponibles
      Role,
      Office,
    ]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    // Los Guards ya son provistos por el AuthModule, no es necesario incluirlos aquí
  ],
  exports: [UsersService],
})
export class UsersModule {}
