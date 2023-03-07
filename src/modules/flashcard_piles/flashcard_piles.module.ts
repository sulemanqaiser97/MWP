import { Module } from '@nestjs/common';
import { FlashcardPilesService } from './flashcard_piles.service';
import { FlashcardPilesController } from './flashcard_piles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlashcardPileMapping } from './model/flashcard_piles.model';
import { FlashcardsService } from '../flashcards/flashcards.service';
import { Flashcard } from '../flashcards/model/flashcards.model';

@Module({
  imports: [SequelizeModule.forFeature([FlashcardPileMapping, Flashcard])],
  controllers: [FlashcardPilesController],
  providers: [FlashcardPilesService, FlashcardsService],
})
export class FlashcardPilesModule {}
