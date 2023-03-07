import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';
import { Flashcard } from './model/flashcards.model';

@Module({
  imports: [SequelizeModule.forFeature([Flashcard])],
  controllers: [FlashcardsController],
  providers: [FlashcardsService],
})
export class FlashcardsModule {}
