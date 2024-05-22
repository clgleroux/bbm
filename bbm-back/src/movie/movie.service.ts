import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private movieRepository: typeof Movie,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const findOMDbMovie = await this.movieRepository.findOne({
      where: { imdbID: createMovieDto.imdbID },
    });
    if (findOMDbMovie) {
      throw new Error('Movie existing');
    }

    return await this.movieRepository.create({ createMovieDto });
  }

  async findAll() {
    return await this.movieRepository.findAll();
  }

  async findOne(id: number) {
    return await this.movieRepository.findByPk(id);
  }

  async findOneByIMDbId(imdbID: string) {
    return await this.movieRepository.findOne({
      where: {
        imdbID: imdbID,
      },
    });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
