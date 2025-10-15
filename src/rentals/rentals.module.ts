// src/rentals/rentals.module.ts
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

// Importa las nuevas entidades que creamos para el inquilino, propietario y fiador
import { PersonaFisica } from './entities/tenant-pf.entity';
import { PersonaMoral } from './entities/tenant-pm.entity';
import { UsoPropiedad } from './entities/use-property.entity';
import { GuarantorPropertyGuarantee } from './entities/guarantor-property-guarantee.entity';
import { GuarantorEmploymentIncomePf } from './entities/guarantor-employment-income-pf.entity';
import { GuarantorLegalRepresentative } from './entities/guarantor-legal-representative.entity';
import { OwnerBankInfo } from './entities/owner-bank-info.entity';
import { OwnerProperty } from './entities/owner-property.entity';
import { OwnerLegalRepresentative } from './entities/owner-legal-representative.entity';

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
      // Registra las nuevas entidades aquí para que TypeOrm las conozca
      PersonaFisica,
      PersonaMoral,
      UsoPropiedad,
      GuarantorPropertyGuarantee,
      GuarantorEmploymentIncomePf,
      GuarantorLegalRepresentative,
      OwnerBankInfo,
      OwnerProperty,
      OwnerLegalRepresentative
    ]),
    AuthModule,
    UsersModule,
    OfficesModule,
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}