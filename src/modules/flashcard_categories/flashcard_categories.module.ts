import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlashcardCategoriesController } from './flashcard_categories.controller';
import { FlashcardCategoriesService } from './flashcard_categories.service';
import { FlashcardCategory } from './model/flashcard-category.model';

@Module({
  imports: [SequelizeModule.forFeature([FlashcardCategory])],
  controllers: [FlashcardCategoriesController],
  providers: [FlashcardCategoriesService],
})
export class FlashcardCategoriesModule {}
