import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  Index,
} from 'sequelize-typescript';
import { User } from '../../auth/model/user.model';
import { Flashcard } from '../../flashcards/model/flashcards.model';

@Table({ tableName: 'flashcard_piles' })
export class FlashcardPileMapping extends Model<FlashcardPileMapping> {
  @PrimaryKey
  @AutoIncrement
  @Column
  mapping_id: number;

  @ForeignKey(() => User)
  @Column
  @Index('user_profile_index')
  user_id: number;

  @Column
  profile_id: number;

  @ForeignKey(() => Flashcard)
  @Column
  flashcard_id: number;

  @Column
  flashcard_value: string;

  @Column
  pile_category: string;

  @Column
  correctness_count: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Flashcard)
  flashcard: Flashcard;
}
