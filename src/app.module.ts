import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Configuraciones
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

// Módulos
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { OfficesModule } from './offices/offices.module';

// Guards globales
import { JwtAuthGuard } from './auth/guards/auth.guards';

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

    // Módulos de funcionalidad
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    OfficesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Aplicar JwtAuthGuard globalmente (opcional)
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}