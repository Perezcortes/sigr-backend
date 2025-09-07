// src/offices/offices.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficesController } from './offices.controller';
import { Office } from './entities/office.entity';
import { Estate } from './entities/estate.entity';
import { City } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Office, Estate, City])],
  controllers: [OfficesController],
  exports: [TypeOrmModule],
})
export class OfficesModule {}