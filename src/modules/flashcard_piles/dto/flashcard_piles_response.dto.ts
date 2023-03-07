import { ApiProperty } from '@nestjs/swagger';

export class FlashcardPileDto {
  @ApiProperty()
  flashcard_Id: number;

  @ApiProperty()
  flashcard_Value: string;

  @ApiProperty()
  correctness_Count: number;
}

export class FlashcardPileResponseDto {
  @ApiProperty()
  category: string;

  @ApiProperty({ type: [FlashcardPileDto] })
  flashcards: FlashcardPileDto[];
}
