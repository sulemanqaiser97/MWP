import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { FindOptions, Op } from 'sequelize';
import { FlashcardPileUpdateRequestDto } from './dto/flashcard_pile_update_request.dto';
import { PileCategory } from './enum/pile-category.enum';
import { FlashcardPileMapping } from './model/flashcard_piles.model';

@Injectable()
export class FlashcardPilesService {
  constructor(
    @InjectModel(FlashcardPileMapping)
    private readonly flashcardPileMappingModel: typeof FlashcardPileMapping,
  ) {}

  async getFlashcardPiles(
    userId: number,
    profileId: number,
    pileCategory: string,
  ) {
    try {
      const where: FindOptions<FlashcardPileMapping>['where'] = {};
      where.user_id = userId;
      where.profile_id = profileId;
      if (pileCategory) where.pile_category = { [Op.eq]: pileCategory };

      const flashcardPileMappings =
        await this.flashcardPileMappingModel.findAll({ where });
      return flashcardPileMappings;
    } catch (error) {
      throw new Error(`Failed to fetch flashcard piles: ${error.message}`);
    }
  }

  async createFlashcardPileMappings(
    flashcardPileMappings: FlashcardPileMapping[],
  ) {
    try {
      await this.flashcardPileMappingModel.bulkCreate(flashcardPileMappings);
    } catch (error) {
      throw new Error(
        `Failed to create flashcard pile mappings: ${error.message}`,
      );
    }
  }

  async updateFlashcardPiles(
    userId: number,
    profileId: number,
    {
      category,
      update_correctness = [],
    }: Partial<FlashcardPileUpdateRequestDto>,
  ): Promise<void> {
    const whereUpdate = {
      user_id: userId,
      profile_id: profileId,
      flashcard_id: { [Op.in]: update_correctness },
    };

    const updateWorking = async () => {
      await this.flashcardPileMappingModel.update(
        { correctness_count: sequelize.literal('correctness_count + 1') },
        { where: whereUpdate },
      );
      await this.flashcardPileMappingModel.update(
        { pile_category: PileCategory.MASTERY },
        { where: { correctness_count: 3, ...whereUpdate } },
      );
    };

    const updateMastery = async () => {
      await this.flashcardPileMappingModel.update(
        { correctness_count: sequelize.literal('correctness_count - 1') },
        { where: whereUpdate },
      );
      await this.flashcardPileMappingModel.update(
        { pile_category: PileCategory.WORKING },
        { where: { correctness_count: 0, ...whereUpdate } },
      );
    };

    try {
      if (category == PileCategory.WORKING) await updateWorking();
      if (category == PileCategory.MASTERY) await updateMastery();
    } catch (error) {
      throw new Error(`Error updating flashcard piles: ${error.message}`);
    }
  }
}
