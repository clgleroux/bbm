import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './entities/favorite.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Module({
  imports: [SequelizeModule.forFeature([Favorite, User, Movie])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
