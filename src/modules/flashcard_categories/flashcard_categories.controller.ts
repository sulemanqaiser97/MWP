import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FlashcardCategory } from './models/flashcard-category.model';
import { FlashcardCategoriesService } from './flashcard_categories.service';

@Controller('flashcard-categories')
export class FlashcardCategoriesController {
  constructor(
    private readonly flashcardCategoriesService: FlashcardCategoriesService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<FlashcardCategory> {
    return this.flashcardCategoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<FlashcardCategory[]> {
    return this.flashcardCategoriesService.findAll();
  }
}
