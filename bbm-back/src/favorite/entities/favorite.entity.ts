import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'favorites',
  modelName: 'favorite',
})
export class Favorite extends Model {
  // Création d'un ID car concours toutes les semaines
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => Movie)
  @AllowNull(false)
  @Column
  movieId: number;

  @BelongsTo(() => Movie)
  movie: Movie;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // CreatedAt et UpdatedAt grace a `Model`
}
