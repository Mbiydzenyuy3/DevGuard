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

// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

const expressApp = express();
let server: any;

// Boot as serverless handler (Lambda) — keep existing behavior
async function bootstrapServerless() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  await app.init();
  return expressApp;
}

// Boot as a regular HTTP server (useful for local dev / Docker/ECS)
export async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`DevGuard API listening on http://localhost:${port}`);
}

if (process.env.RUN_MODE === 'local') {
  // When you want to run locally: RUN_MODE=local npm run start:dev
  bootstrapLocal().catch(err => {
    logger.error(err);
    process.exit(1);
  });
}

// Serverless handler export
export const handler = async (event: any, context: any) => {
  if (!server) {
    const app = await bootstrapServerless();
    server = serverlessExpress(app);
  }
  return server(event, context);
};
