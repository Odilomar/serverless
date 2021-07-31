import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      entities: [__dirname + '../**/*.entity{.ts,.js}'],
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
