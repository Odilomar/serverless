import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserModule } from './user/user.module.js';

config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(DB_HOST),
      port: Number(DB_PORT),
      username: String(DB_USER),
      password: String(DB_PASS),
      database: String(DB_NAME),
      entities: [__dirname + '../**/*.entity{.ts,.js}'],
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      synchronize: true,
      logging: true,
      dropSchema: false,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
