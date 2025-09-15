// src/config/database.config.ts

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'sigr_user',
    password: process.env.DATABASE_PASSWORD || 'sigr_password',
    database: process.env.DATABASE_NAME || 'sigr_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    // Añadí esta línea solo para desarrollo
    //dropSchema: process.env.NODE_ENV === 'development'
  }),
);