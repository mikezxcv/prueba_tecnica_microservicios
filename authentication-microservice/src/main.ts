import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 3000,
    },
  });
  await app.listen();
  logger.log(
    'Microservice Authentication is listening in port ' + process.env.PORT ||
      3000,
  );
}
bootstrap();
