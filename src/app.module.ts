import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { FlashcardCategoriesModule } from './modules/flashcard_categories/flashcard_categories.module';
import { SoapboxModule } from './modules/soapbox/soapbox.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    FlashcardsModule,
    FlashcardCategoriesModule,
    SoapboxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
