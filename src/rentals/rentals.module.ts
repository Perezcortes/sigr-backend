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
import { InquilinoService } from './services/inquilino.service';
import { PropietarioService } from './services/propietario.service';
import { PropiedadService } from './services/propiedad.service';
import { ObligadoSolidarioService } from './services/obligado-solidario.service';

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
    PostalCodesModule,
  ],
  controllers: [RentalsController],
  providers: [
    RentalsService,
    InquilinoService,
    PropietarioService,
    PropiedadService,
    ObligadoSolidarioService,
  ],
  exports: [RentalsService],
})
export class RentalsModule {}