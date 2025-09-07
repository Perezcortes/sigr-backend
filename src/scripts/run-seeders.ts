import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { InitialSeeder } from '../database/seeders/initial.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    console.log('Ejecutando seeders...');
    
    const seeder = app.get(InitialSeeder);
    await seeder.seed();
    
    console.log('Seeders completados!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await app.close();
  }
}

bootstrap();