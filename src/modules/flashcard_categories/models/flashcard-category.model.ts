import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'flashcard_categories' })
export class FlashcardCategory extends Model<FlashcardCategory> {
  @Column({ primaryKey: true, autoIncrement: true })
  category_id: number;

  @Column
  category_name: string;

  @Column
  description: string;
}
