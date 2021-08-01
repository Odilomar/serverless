import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Handler, Context } from 'aws-lambda';

import { ExpressAdapter } from '@nestjs/platform-express';
import awsServerlessExpress from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { Server } from 'http';
import express from 'express';

import { config } from 'dotenv';
import path from 'path';

const UserModule = require(path.resolve('user', 'user.module.js')) || require('./user/user.module');
// import { UserModule } from path.resolve(__dirname, 'user', 'user.module.js');

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
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      logging: true,
      dropSchema: false,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    }),
    UserModule,
  ],
})
export class AppModule { }

const binaryMimeTypes: string[] = [];
let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

const bootstrapServer = async (): Promise<Server> => {
  try {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use(eventContext());

    await app.init();
    return awsServerlessExpress.createServer(
      expressApp,
      undefined,
      binaryMimeTypes,
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const handler: Handler = async (event, context: Context) => {
  if (!cachedServer) {
    const server = await bootstrapServer();
    cachedServer = server;
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
