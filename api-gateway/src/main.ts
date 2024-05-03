import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/all-exception-filter'; // Replace './path/to/AllExceptionsFilter' with the actual path to the AllExceptionsFilter module

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const logger = new Logger('ApiGateway');
  const basePath = process.env.basePath || 'api/v1';
  const host = process.env.host || 'localhost';
  const port = +process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());


  const config = new DocumentBuilder()
    .setTitle('API GATEWAY')
    .setDescription('The API GATEWAY for the application')
    .setVersion('1.0')
    .addTag('API GATEWAY')
    .addServer(basePath)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.setGlobalPrefix(basePath);
  await app.listen(port, host);
  logger.log(`Application is running on: http://${host}:${port}/${basePath}`);
  logger.log(`Swagger is running on: http://${host}:${port}/docs`);
}
bootstrap();
