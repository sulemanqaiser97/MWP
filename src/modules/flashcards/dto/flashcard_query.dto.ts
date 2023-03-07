import { ApiPropertyOptional } from '@nestjs/swagger';

export class FlashcardQueryDto {
  @ApiPropertyOptional({
    description: 'The category ID to filter flashcards by.',
    type: Number,
  })
  category_id?: number;

  @ApiPropertyOptional({
    description: 'The level to filter flashcards by.',
    type: Number,
  })
  level?: number;

  @ApiPropertyOptional({
    description: 'The maximum number of flashcards to return.',
    type: Number,
    default: 20,
  })
  maxCount?: number;
}
