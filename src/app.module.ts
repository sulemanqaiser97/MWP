import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { SoapboxModule } from './modules/soapbox/soapbox.module';
import { FlashcardCategoriesModule } from './modules/flashcard_categories/flashcard_categories.module';
import flashcardCategoriesSeeder from './seeders/flashcard-categories.seeder';
import { Sequelize } from 'sequelize-typescript';
import flashcardsSeeder from './seeders/flashcards.seeder';
import { FlashcardPilesModule } from './modules/flashcard_piles/flashcard_piles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
        logging: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProfileModule,
    FlashcardsModule,
    AuthModule,
    SoapboxModule,
    FlashcardCategoriesModule,
    FlashcardPilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly sequelize: Sequelize) {}
  async onModuleInit() {
    //await this.sequelize.sync();
    await flashcardCategoriesSeeder.up(this.sequelize.getQueryInterface());
    await flashcardsSeeder.up(this.sequelize.getQueryInterface());
  }
}
