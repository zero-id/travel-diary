import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { UserController } from './user/user.controller';
import { JourneyModule } from './journey/journey.module';
import { JourneyController } from './journey/journey.controller';
import { CloudinaryUploadMiddleware } from './middleware/upload-file/upload-file.middleware';
import { ConfigModule } from '@nestjs/config';
import { BookmarkModule } from './bookmark/bookmark.module';
import * as joi from 'joi';
import { BookmarkController } from './bookmark/bookmark.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    JourneyModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        CLOUDINARY_CLOUD_NAME: joi.string().required(),
        CLOUDINARY_CLOUD_API_KEY: joi.string().required(),
        CLOUDINARY_CLOUD_SECRET: joi.string().required(),
      }),
    }),
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryUploadMiddleware],
})
export class AppModule {
  constructor(
    private readonly cloudinaryUploadMiddleware: CloudinaryUploadMiddleware,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, this.cloudinaryUploadMiddleware.use('image'))
      .forRoutes(
        {
          path: 'journey',
          method: RequestMethod.POST,
        },
        {
          path: 'journey/:id',
          method: RequestMethod.PATCH,
        },
      );
    consumer
      .apply(AuthMiddleware, this.cloudinaryUploadMiddleware.use('avatar'))
      .forRoutes(
        {
          path: 'user',
          method: RequestMethod.PATCH,
        },
        {
          path: 'user',
          method: RequestMethod.DELETE,
        },
        {
          path: 'user/detail',
          method: RequestMethod.GET,
        },
      );
    consumer.apply(AuthMiddleware).forRoutes(BookmarkController, {
      path: 'journey/user',
      method: RequestMethod.GET,
    });
  }
}
