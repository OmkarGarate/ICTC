import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

import { CentersModule } from './modules/centers/centers.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { ServicesModule } from './modules/services/services.module';
import { CancersModule } from './modules/cancers/cancers.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BlogsModule } from './modules/blogs/blogs.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({

        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User],

        autoLoadEntities: true,
        synchronize: true,  // ❗ turn OFF in production

      }),
    }),

    AuthModule,

    CentersModule,
    DoctorsModule,
    ServicesModule,
    CancersModule,
    BlogsModule

  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
