import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'flashcard_categories', timestamps: true })
export class FlashcardCategory extends Model<FlashcardCategory> {
  @Column({
    primaryKey: true,
    allowNull: false,
  })
  category_id: number;

  @Column({
    allowNull: false,
  })
  category_name: string;

  @Column({
    allowNull: true,
  })
  description: string;
}
