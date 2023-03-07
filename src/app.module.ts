import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { FlashcardCategoriesModule } from './modules/flashcard_categories/flashcard_categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/auth/model/user.model';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthModule } from './modules/jwt-auth/jwt-auth.module';
import { AuthMiddleware } from './modules/jwt-auth/middleware/auth.middleware';
import { UserController } from './modules/user/user.controller';
import { ProfileController } from './modules/profile/profile.controller';
import { UserProfileMappingModule } from './modules/user_profile_mapping/user_profile_mapping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // models: [User],
        autoLoadModels: true,
        synchronize: true,
        logging: false
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProfileModule,
    FlashcardsModule,
    FlashcardCategoriesModule,
    AuthModule,
    JwtAuthModule,
    UserProfileMappingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UserController,
        ProfileController
      );
  }
}
