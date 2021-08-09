import { NestFactory } from '@nestjs/core';
import { Handler, Context } from 'aws-lambda';

import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import { AppModule } from './app.module';
import * as serverless from 'aws-serverless-express';
import { proxy } from 'aws-serverless-express';

const binaryMimeTypes: string[] = [];
let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

function bootstrapServer(): Promise<Server> {
  const expressApp = require('express')();
  const adapter = new ExpressAdapter(expressApp);
  return NestFactory.create(AppModule, adapter, { logger: false })
    .then((app) => app.init())
    .then(() => serverless.createServer(expressApp));
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
