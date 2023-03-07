import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { Flashcard } from './model/flashcards.model';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel(Flashcard) private readonly flashcardModel: typeof Flashcard,
  ) {}

  async findAllFlashcards(
    categoryId?: number,
    level?: number,
    maxCount = 20,
    excludeIds?: number[],
  ): Promise<Flashcard[]> {
    const where: FindOptions<Flashcard>['where'] = {};
    if (categoryId) where.category_id = categoryId;
    if (level) where.level = level;
    if (excludeIds) where.id = { [Op.notIn]: excludeIds };

    return this.flashcardModel.findAll({
      where,
      limit: maxCount,
    });
  }
}
