import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';
import { Office } from './entities/office.entity';
import { City } from './entities/city.entity';
import { Estate } from './entities/estate.entity';
import { AuthModule } from '../auth/auth.module';
import { PermissionsGuard } from '../auth/guards/auth.guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([Office, City, Estate]),
    AuthModule,
  ],
  controllers: [OfficesController],
  providers: [OfficesService, PermissionsGuard],
  exports: [OfficesService],
})
export class OfficesModule {}
