import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { OMDbService } from 'src/service/omdb.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SequelizeModule.forFeature([Movie]), HttpModule],
  controllers: [MovieController],
  providers: [MovieService, OMDbService],
})
export class MovieModule {}
