import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FlashcardsService } from '../flashcards/flashcards.service';
import { Flashcard } from '../flashcards/model/flashcards.model';
import { FlashcardPileQueryParams } from './dto/flashcard_piles_query.dto';
import {
  FlashcardPileDto,
  FlashcardPileResponseDto,
} from './dto/flashcard_piles_response.dto';
import { FlashcardPileUpdateRequestDto } from './dto/flashcard_pile_update_request.dto';
import { PileCategory } from './enum/pile-category.enum';
import { FlashcardPilesService } from './flashcard_piles.service';
import { FlashcardPileMapping } from './model/flashcard_piles.model';

@ApiTags('flashcard-piles')
@Controller('flashcard-piles')
export class FlashcardPilesController {
  constructor(
    private readonly flashcardPilesService: FlashcardPilesService,
    private readonly flashcardsService: FlashcardsService,
  ) {}

  @Get()
  async getFlashcardPiles(
    @Query() queryParams: FlashcardPileQueryParams,
  ): Promise<FlashcardPileResponseDto> {
    const category = queryParams.category || PileCategory.WORKING;
    const flashcardPileMappings =
      await this.flashcardPilesService.getFlashcardPiles(
        queryParams.user_id,
        queryParams.profile_id,
        category,
      );

    const responseDTO = new FlashcardPileResponseDto();
    responseDTO.flashcards = new Array<FlashcardPileDto>();
    responseDTO.category = category;

    if (flashcardPileMappings.length != 0) {
      flashcardPileMappings.map((flashcardPile) => {
        responseDTO.flashcards.push({
          flashcard_Id: flashcardPile.flashcard_id,
          flashcard_Value: flashcardPile.flashcard_value,
          correctness_Count: 0,
        });
      });
      return responseDTO;
    }

    const flashcards = await this.flashcardsService.findAllFlashcards();

    const flashcardPiles: FlashcardPileMapping[] = flashcards.map(
      (flashcard) => {
        return {
          flashcard_id: flashcard.id,
          flashcard_value: flashcard.value,
          pile_category: PileCategory.WORKING,
          correctness_count: 0,
          user_id: queryParams.user_id,
          profile_id: queryParams.profile_id,
        } as FlashcardPileMapping;
      },
    );

    this.flashcardPilesService.createFlashcardPileMappings(flashcardPiles);

    flashcards.map((flashcard: Flashcard) => {
      responseDTO.flashcards.push({
        flashcard_Id: flashcard.id,
        flashcard_Value: flashcard.value,
        correctness_Count: 0,
      });
    });

    return responseDTO;
  }

  @Put('update_correctness')
  @ApiQuery({ name: 'user_id', required: true })
  @ApiQuery({ name: 'profile_id', required: true })
  @ApiBody({ type: FlashcardPileUpdateRequestDto })
  async updateFlashcardPiles(
    @Query()
    queryDto: Pick<FlashcardPileUpdateRequestDto, 'user_id' | 'profile_id'>,
    @Body()
    bodyDto: Omit<FlashcardPileUpdateRequestDto, 'user_id' | 'profile_id'>,
  ) {
    await this.flashcardPilesService.updateFlashcardPiles(
      queryDto.user_id,
      queryDto.profile_id,
      bodyDto,
    );
  }
}
