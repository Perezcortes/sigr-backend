import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { Rental } from './entities/rental.entity';
import { Tenant } from './entities/tenant.entity';
import { Owner } from './entities/owner.entity';
import { Guarantor } from './entities/guarantor.entity';
import { Property } from './entities/property.entity';
import { Formalization } from './entities/formalization.entity';
import { Activation } from './entities/activation.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { OfficesModule } from '../offices/offices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rental,
      Tenant,
      Owner,
      Guarantor,
      Property,
      Formalization,
      Activation,
      User,
    ]),
    AuthModule,
    UsersModule,
    OfficesModule,
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService], // Solo exporta el servicio
})
export class RentalsModule {}
