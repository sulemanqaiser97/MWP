import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FlashcardCategory } from './models/flashcard-category.model';

@Injectable()
export class FlashcardCategoriesService {
  constructor(
    @InjectModel(FlashcardCategory)
    private readonly flashcardCategoryModel: typeof FlashcardCategory,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<FlashcardCategory> {
    return this.flashcardCategoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<FlashcardCategory[]> {
    return this.flashcardCategoryModel.findAll();
  }
}
