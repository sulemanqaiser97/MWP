import { IsEnum, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PileCategory } from '../enum/pile-category.enum';

export class FlashcardPileQueryParams {
  @ApiProperty({
    required: false,
    enum: PileCategory,
    example: PileCategory.WORKING,
    default: PileCategory.WORKING,
  })
  @IsEnum(PileCategory)
  category?: PileCategory = PileCategory.WORKING;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  profile_id: number;
}
