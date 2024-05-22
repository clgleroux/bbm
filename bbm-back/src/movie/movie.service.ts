import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectModel } from '@nestjs/sequelize';
import { OMDbService } from 'src/service/omdb.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private movieRepository: typeof Movie,
    private readonly omdbService: OMDbService,
  ) {}

  async createByIMDbId(createMovieDto: CreateMovieDto) {
    const findOMDbMovie = await this.findOneByIMDbId(createMovieDto.imdbID);
    if (findOMDbMovie) {
      throw new Error('Movie existing');
    }

    const movieIMDb = (
      await this.omdbService.getMovieById(createMovieDto.imdbID)
    ).data;

    return await this.movieRepository.create({
      imdbID: createMovieDto.imdbID,
      title: movieIMDb.Title,
      poster: movieIMDb.Poster,
    });
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

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    // TODO : Sécuriser

    return await this.movieRepository.update(
      {
        imdbID: updateMovieDto.imdbID,
        title: updateMovieDto.title,
        poster: updateMovieDto.poster,
      },
      { where: { id } },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
