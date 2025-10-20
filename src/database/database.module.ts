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
// Importar las nuevas entities de rentals
import { 
  Rental, 
  InquilinoPf, 
  InquilinoPm, 
  ObligadoSolidarioPf, 
  ObligadoSolidarioPm, 
  PropietarioPf, 
  PropietarioPm, 
  Propiedad 
} from '../rentals/entities';

const typeOrmFeature = TypeOrmModule.forFeature([
  Role,
  Permission,
  User,
  Office,
  Estate,
  City,
  RefreshToken,
  // Entities de rentals
  Rental,
  InquilinoPf,
  InquilinoPm,
  ObligadoSolidarioPf,
  ObligadoSolidarioPm,
  PropietarioPf,
  PropietarioPm,
  Propiedad,
]);

@Module({
  imports: [typeOrmFeature],
  providers: [InitialSeeder],
  exports: [InitialSeeder, typeOrmFeature],
})
export class DatabaseModule {}