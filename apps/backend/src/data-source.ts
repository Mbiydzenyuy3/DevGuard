import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './modules/user/entity/user.entity';
// import other entities here as you create them, e.g. Project

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'devguard_db',
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ['dist/migrations/*.js'],
});
