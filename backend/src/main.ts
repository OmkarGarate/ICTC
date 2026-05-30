import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import cookieParser from 'cookie-parser';
import { DataSource } from 'typeorm';
import { seedBlogTags } from './database/seeders/blog-tags.seeder';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  // ✅ CORS — read allowed origins from env in production instead of hardcoding
  // In .env: CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
  // In development fallback: localhost ports 5173 and 5174
  const corsOriginsEnv = configService.get<string>('CORS_ORIGINS');
  const allowedOrigins = corsOriginsEnv
    ? corsOriginsEnv.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:5174'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ✅ Cookie parser
  app.use(cookieParser());

  // ✅ Serve uploads folder
  const uploadPath = join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  // ✅ Global configs
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: false }));

  // ✅ Swagger setup — disable in production to avoid exposing API surface
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Hospital API')
      .setDescription('Hospital Management Backend APIs with integrated authentication')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // ✅ Run seeders
  const dataSource = app.get(DataSource);
  await seedBlogTags(dataSource);

  // ✅ Port from env
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
  if (nodeEnv !== 'production') {
    console.log(`📄 Swagger: http://localhost:${port}/api/docs`);
  }
}

bootstrap();