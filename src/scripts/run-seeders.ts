import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { seedInitialData } from '../database/seeders/initial.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const dataSource = app.get(DataSource);
  
  try {
    console.log('Ejecutando seeders...');
    await seedInitialData(dataSource);
    console.log('Seeders completados!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await app.close();
  }
}

bootstrap();