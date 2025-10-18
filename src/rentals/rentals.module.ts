import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { 
  Rental, 
  InquilinoPf, 
  InquilinoPm, 
  ObligadoSolidarioPf, 
  ObligadoSolidarioPm, 
  PropietarioPf, 
  PropietarioPm, 
  Propiedad 
} from './entities';
import { PostalCodesModule } from '../postal-codes/postal-codes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rental,
      InquilinoPf,
      InquilinoPm,
      ObligadoSolidarioPf,
      ObligadoSolidarioPm,
      PropietarioPf,
      PropietarioPm,
      Propiedad,
    ]),
    PostalCodesModule, // Agregar esta línea
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}