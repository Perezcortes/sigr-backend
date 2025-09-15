import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitialSeeder } from './seeders/initial.seeder';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { User } from '../users/entities/user.entity';
import { Office } from '../offices/entities/office.entity';
import { Estate } from '../offices/entities/estate.entity';
import { City } from '../offices/entities/city.entity';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { Rental } from '../rentals/entities/rental.entity';
import { Tenant } from '../rentals/entities/tenant.entity';
import { Owner } from '../rentals/entities/owner.entity';
import { Guarantor } from '../rentals/entities/guarantor.entity';
import { Property } from '../rentals/entities/property.entity';
import { Formalization } from '../rentals/entities/formalization.entity';
import { Activation } from '../rentals/entities/activation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      Permission,
      User,
      Office,
      Estate,
      City,
      RefreshToken,
      Rental,
      Tenant,
      Owner,
      Guarantor,
      Property,
      Formalization,
      Activation,
    ]),
  ],
  providers: [InitialSeeder],
  exports: [InitialSeeder],
})
export class DatabaseModule {}
