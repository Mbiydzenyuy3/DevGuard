// // main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import serverlessExpress from 'serverless-http';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import express from 'express';

// const expressApp = express();
// let server: any;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
//   app.enableCors();
//   await app.init();
//   return expressApp;
// }

// export const handler = async (event: any, context: any) => {
//   if (!server) {
//     const app = await bootstrap();
//     server = serverlessExpress(app);
//   }
//   return server(event, context);
// };

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
