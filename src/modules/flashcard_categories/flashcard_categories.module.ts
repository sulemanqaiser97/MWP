import { Module } from '@nestjs/common';
import { FlashcardCategoriesController } from './flashcard_categories.controller';
import { FlashcardCategoriesService } from './flashcard_categories.service';

@Module({
  controllers: [FlashcardCategoriesController],
  providers: [FlashcardCategoriesService],
})
export class FlashcardCategoriesModule {}
