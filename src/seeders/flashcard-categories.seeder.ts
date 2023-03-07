import { QueryInterface } from 'sequelize';
import { FlashcardCategoryEnum } from 'src/modules/flashcard_categories/enum/flashcard-category.enum';
import { FlashcardCategory } from '../modules/flashcard_categories/model/flashcard-category.model';

const categories = [
  {
    category_id: FlashcardCategoryEnum.SOUNDS,
    category_name: 'Sounds',
    description: 'Individual phonemes, pronounced in isolation.',
  },
  {
    category_id: FlashcardCategoryEnum.COLOR_CODED_WORDS,
    category_name: 'Color coded words',
    description: 'Words with each phoneme colored differently.',
  },
  {
    category_id: FlashcardCategoryEnum.WHOLE_WORDS,
    category_name: 'Whole words',
    description: 'Complete words, pronounced as a whole.',
  },
  {
    category_id: FlashcardCategoryEnum.SILLY_WORDS,
    category_name: 'Silly words',
    description: 'Silly  words, used for fun and practice.',
  },
];

const now = new Date();
const categoriesWithTimestamps = categories.map((category) => ({
  ...category,
  createdAt: now,
  updatedAt: now,
}));

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      const count = await FlashcardCategory.count();
      if (!count) {
        await queryInterface.bulkInsert(
          FlashcardCategory.tableName,
          categoriesWithTimestamps,
        );
      }
    } catch (error) {
      console.error('Error seeding flashcard categories ', error);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(FlashcardCategory.tableName, null, {});
  },
};
