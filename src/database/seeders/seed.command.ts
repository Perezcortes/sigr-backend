// src/database/seeders/seed.command.ts
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { InitialSeeder } from './initial.seeder';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Office } from '../../offices/entities/office.entity';
import { Estate } from '../../offices/entities/estate.entity';
import { City } from '../../offices/entities/city.entity';

import databaseConfig from '../../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig) => ({
        ...dbConfig,
        entities: [Role, Permission, User, Office, Estate, City],
        synchronize: true, // Solo para desarrollo
      }),
    }),
    TypeOrmModule.forFeature([
      Role,
      Permission,
      User,
      Office,
      Estate,
      City,
    ]),
  ],
  providers: [InitialSeeder],
})
class SeedModule {}

async function runSeeders() {
  try {
    console.log('🚀 Iniciando aplicación para seeders...');
    
    const app = await NestFactory.createApplicationContext(SeedModule);
    const seeder = app.get(InitialSeeder);
    
    await seeder.seed();
    
    await app.close();
    console.log('✅ Seeders ejecutados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
    process.exit(1);
  }
}

runSeeders();

// src/scripts/run-seeders.ts
import { execSync } from 'child_process';

console.log('🌱 Ejecutando seeders...');

try {
  execSync('ts-node -r tsconfig-paths/register src/database/seeders/seed.command.ts', {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('Error ejecutando seeders:', error);
  process.exit(1);
}