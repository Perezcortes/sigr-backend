import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Configuraciones
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

// Entidades necesarias para el seeder
import { User } from './users/entities/user.entity';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { Office } from './offices/entities/office.entity';
import { Estate } from './offices/entities/estate.entity';
import { City } from './offices/entities/city.entity';
import { Rental } from './rentals/entities/rental.entity';
import { Tenant } from './rentals/entities/tenant.entity';
import { Owner } from './rentals/entities/owner.entity';
import { Guarantor } from './rentals/entities/guarantor.entity';
import { Activation } from './rentals/entities/activation.entity';

// Módulos
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { OfficesModule } from './offices/offices.module';
import { PostalCodesModule } from './postal-codes/postal-codes.module';
import { LocationsModule } from './locations/locations.module';
import { RentalsModule } from './rentals/rentals.module';
import { DatabaseModule } from './database/database.module';

// Guards globales
import { JwtAuthGuard } from './auth/guards/auth.guards';

// Seeders
import { InitialSeeder } from './database/seeders/initial.seeder';
import { Property } from './rentals/entities/property.entity';
import { Formalization } from './rentals/entities/formalization.entity';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig) => dbConfig,
    }),

    // CORRECCIÓN: Importar todos los repositorios que el seeder necesita.
    TypeOrmModule.forFeature([
      User,
      RefreshToken,
      Role,
      Permission,
      Office,
      Estate,
      City,
      Rental,
      Tenant,
      Owner,
      Property,
      Formalization,
      Activation,
    ]),

    // Módulos de funcionalidad
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    OfficesModule,
    PostalCodesModule,
    LocationsModule,
    RentalsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    InitialSeeder, // Agregar el seeder aquí
    // Aplicar JwtAuthGuard globalmente (opcional)
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
