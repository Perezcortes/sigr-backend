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
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
