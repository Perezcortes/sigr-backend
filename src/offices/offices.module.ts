import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfficesController } from './offices.controller';
//import { OfficesService } from './offices.service';
import { Office } from './entities/office.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Office, User])],
  controllers: [OfficesController],
  //providers: [OfficesService],
  //exports: [OfficesService],
})
export class OfficesModule {}