import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PileCategory } from '../enum/pile-category.enum';

export class FlashcardPileUpdateRequestDto {
  @ApiProperty({
    description: 'The ID of the user who owns the flashcard pile',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    description: 'The ID of the profile the flashcard pile belongs to',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  profile_id: number;

  @ApiProperty({
    description: 'The category of the flashcard pile (working or mastery)',
    enum: PileCategory,
    example: PileCategory.WORKING,
  })
  @IsEnum(PileCategory)
  category: PileCategory;

  @ApiProperty({
    type: [Number],
    description:
      'Array of flashcard IDs to update the correctness count and pile category. If category is "working", count increments by 1. At count 3, pile category changes to "mastery". If category is "mastery", count decrements by 1. At count 0, pile category changes to "working".',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  update_correctness: number[];
}
