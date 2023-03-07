import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlashcardQueryDto } from './dto/flashcard_query.dto';
import { FlashcardsService } from './flashcards.service';

@ApiTags('Flashcards')
@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardService: FlashcardsService) {}

  @Get()
  async findAllFlashcards(@Query() queryDto: FlashcardQueryDto) {
    return this.flashcardService.findAllFlashcards(
      queryDto.category_id,
      queryDto.level,
      queryDto.maxCount,
    );
  }
}
