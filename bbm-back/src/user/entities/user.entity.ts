import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Table({
  tableName: 'users',
  modelName: 'user',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  pseudo: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  dateOfBirth: Date;

  @HasMany(() => Favorite)
  favorites: Favorite[];
}
