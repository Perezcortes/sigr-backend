import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Estate } from '../offices/entities/estate.entity';
import { City } from '../offices/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estate, City])
  ],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
