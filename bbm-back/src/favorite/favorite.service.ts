import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { endOfWeek, startOfWeek } from 'date-fns';

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

    return await this.favoriteRepository.create({ createFavoriteDto });
  }

  async findAll() {
    return await this.favoriteRepository.findAll();
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

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async remove(id: number) {
    return await this.favoriteRepository.destroy({ where: { id } });
  }
}
