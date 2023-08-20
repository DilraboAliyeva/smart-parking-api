import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/filter-exception.http';
import {
  ApiSwaggerOptions,
  ApiTokenOptions,
} from './common/swagger/swagger.config';
import { logger } from './common/logger';
config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['debug', 'error', 'verbose', 'warn'],
      cors: true,
      bodyParser: true,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableShutdownHooks();
    app.use(helmet());

    const ApiDocs = SwaggerModule.createDocument(app, ApiSwaggerOptions);
    SwaggerModule.setup('docs', app, ApiDocs, ApiTokenOptions);

    await app.listen(process.env.PORT, () =>
      logger.info(`🚀 Listening on port ${process.env.PORT} 🚀`),
    );
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();
