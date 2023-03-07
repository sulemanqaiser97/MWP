import { QueryInterface } from 'sequelize';
import { FlashcardCategoryEnum } from 'src/modules/flashcard_categories/enum/flashcard-category.enum';
import { Flashcard } from '../modules/flashcards/model/flashcards.model';

const flashcardData = {
  sounds: [
    { level: 1, value: '/f/' },
    { level: 1, value: '/ch/' },
    { level: 1, value: '/ŏ/' },
    { level: 1, value: '/īnd/' },
  ],
  colorCodedWords: [
    { level: 1, value: 'f-l -o -ck' },
    { level: 1, value: 'ch-ild' },
    { level: 1, value: 'p-o-d' },
    { level: 1, value: 'm-ind' },
  ],
  wholeWords: [
    { level: 1, value: 'first' },
    { level: 1, value: 'chase' },
    { level: 1, value: 'song' },
    { level: 1, value: 'kind' },
  ],
};

const flashCards = [];

const categories = [
  { type: 'sounds', id: FlashcardCategoryEnum.SOUNDS },
  { type: 'colorCodedWords', id: FlashcardCategoryEnum.COLOR_CODED_WORDS },
  { type: 'wholeWords', id: FlashcardCategoryEnum.WHOLE_WORDS },
];

const now = new Date();
categories.forEach((category) => {
  flashcardData[category.type].forEach((card) => {
    flashCards.push({
      category_id: category.id,
      level: card.level,
      value: card.value,
      createdAt: now,
      updatedAt: now,
    });
  });
});

export default {
  async up(queryInterface: QueryInterface) {
    try {
      const count = await Flashcard.count();
      if (!count) {
        await queryInterface.bulkInsert(Flashcard.tableName, flashCards, {});
      }
    } catch (error) {
      console.error('Error seeding flashcards ', error);
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete(Flashcard.tableName, null, {});
  },
};
