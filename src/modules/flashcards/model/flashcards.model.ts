import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FlashcardCategory } from '../../flashcard_categories/model/flashcard-category.model';

@Table({ tableName: 'flashcards' })
export class Flashcard extends Model<Flashcard> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => FlashcardCategory)
  @Column
  category_id: number;

  @BelongsTo(() => FlashcardCategory)
  category: FlashcardCategory;

  @Column
  level: number;

  @Column
  value: string;
}
