import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { seedInitialData } from './initial.seeder';

async function bootstrap() {
  try {
    console.log('Iniciando proceso de seeding...');
    
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('Ejecutando seeders...');
    await seedInitialData(dataSource);
    
    console.log('Seeding completado exitosamente');
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('Error en seeding:', error);
    process.exit(1);
  }
}

bootstrap();