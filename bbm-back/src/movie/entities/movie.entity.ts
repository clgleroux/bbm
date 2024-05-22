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
  tableName: 'movies',
  modelName: 'movies',
})
export class Movie extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  imdbID: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  poster: string;

  @HasMany(() => Favorite)
  favorites: Favorite[];
}
