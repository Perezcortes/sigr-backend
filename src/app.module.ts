import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { OfficesController } from './offices/offices.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, OfficesController],
  providers: [AppService],
})
export class AppModule {}
