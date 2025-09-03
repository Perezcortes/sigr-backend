import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('SIGR Backend API')
    .setDescription('Sistema de Gestión de Rentas - API Documentation')
    .setVersion('1.0')
    .addTag('app', 'Endpoints generales de la aplicación')
    .addTag('users', 'Operaciones relacionadas con usuarios')
    .addTag('offices', 'Operaciones relacionadas con oficinas')
    .addTag('auth', 'Operaciones de autenticación')
    .addBearerAuth() // Para JWT cuando se implementes
    .addServer('http://localhost:3000', 'Desarrollo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'SIGR API Documentation',
    customfavIcon: '/favicon.ico',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`Aplicación corriendo en: http://localhost:${port}`);
  console.log(`Documentación Swagger en: http://localhost:${port}/api-docs`);
}
bootstrap();