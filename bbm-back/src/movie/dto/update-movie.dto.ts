import { CreateMovieDto } from './create-movie.dto';

export interface UpdateMovieDto extends CreateMovieDto {
  title: string;
  poster: string;
}
