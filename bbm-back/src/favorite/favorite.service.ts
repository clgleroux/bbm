import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { endOfWeek, startOfWeek } from 'date-fns';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite)
    private favoriteRepository: typeof Favorite,
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(Movie)
    private movieRepository: typeof Movie,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const findUser = await this.userRepository.findByPk(
      createFavoriteDto.userId,
    );
    if (!findUser) {
      throw new Error("User doesn't exist");
    }

    const findMovie = await this.movieRepository.findByPk(
      createFavoriteDto.movieId,
    );
    if (!findMovie) {
      throw new Error("Movie doesn't exist");
    }

    const now = new Date();
    const startDate = startOfWeek(now);
    const endDate = endOfWeek(now);

    const userFavorites = await this.favoriteRepository.findAll({
      where: {
        userId: createFavoriteDto.userId,
        createdAt: { [Op.between]: [startDate, endDate] },
      },
    });

    if (userFavorites.length >= 3) {
      throw new Error('More 3 favorites');
    }

    // TODO : vérifier voter plusieurs fois pour le même

    return await this.favoriteRepository.create({
      userId: createFavoriteDto.userId,
      movieId: createFavoriteDto.movieId,
    });
  }

  async findAll() {
    return await this.favoriteRepository.findAll({ include: [User, Movie] });
  }

  async findAllUserByMovieId(movieId: number) {
    return await this.favoriteRepository.findAll({
      where: { movieId },
      include: [User],
    });
  }

  async findAllMovieByUserId(userId) {
    return await this.favoriteRepository.findAll({
      where: { userId },
      include: [Movie],
    });
  }

  async findAllCurrentWeek() {
    const now = new Date();
    const startDate = startOfWeek(now);
    const endDate = endOfWeek(now);

    return await this.favoriteRepository.findAll({
      where: { createdAt: { [Op.between]: [startDate, endDate] } },
      include: [User, Movie],
    });
  }

  async findResultCurrentWeek() {
    const now = new Date();
    const startDate = startOfWeek(now);
    const endDate = endOfWeek(now);

    return await this.favoriteRepository.findAll({
      where: { createdAt: { [Op.between]: [startDate, endDate] } },
      include: [Movie],
      attributes: [
        'Movie.id',
        [Sequelize.fn('COUNT', 'Movie.id'), 'MovieCount'],
      ],
      group: ['Movie.id'],
      order: [[Sequelize.literal('MovieCount'), 'DESC']],
    });
  }

  async findOne(id: number) {
    return await this.favoriteRepository.findOne({
      where: { id },
    });
  }

  async findByUser(userId: number) {
    return await this.favoriteRepository.findAll({
      where: { userId },
    });
  }

  async findByMovie(movieId: number) {
    return await this.favoriteRepository.findAll({
      where: { movieId },
    });
  }

  async findAllInWeek(date: Date) {
    const startDate = startOfWeek(date);
    const endDate = endOfWeek(date);

    return await this.favoriteRepository.findAll({
      where: {
        createdAt: { $between: [startDate, endDate] },
      },
    });
  }

  async remove(id: number) {
    return await this.favoriteRepository.destroy({ where: { id } });
  }
}
