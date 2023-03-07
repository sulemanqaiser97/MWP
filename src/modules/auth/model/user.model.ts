import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @IsEmail
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  role: string;

  @AllowNull(false)
  @Column
  phone_number: string;
}
