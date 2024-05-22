import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { OMDbService } from 'src/service/omdb.service';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly omdbService: OMDbService,
  ) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.createByIMDbId(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Get('omdb/all')
  async findAllOMDbMovie(@Query() search: { searchTitleMovie: string }) {
    console.log(search);
    const infoMovie = await this.omdbService.getMovie({
      s: search.searchTitleMovie,
    });
    const movies = [...infoMovie.Search];
    const number = Math.ceil(infoMovie.totalResults / 10);

    const promises = [];

    for (let index = 2; index <= number; index++) {
      promises.push(
        this.omdbService.getMovie({ s: search.searchTitleMovie, page: index }),
      );
    }

    // Tout les requests en même temps pour être plus rapide
    // TODO : mettre en place une pagination sur le front et donc en back
    const results = await Promise.all(promises);

    results.forEach((result) => {
      movies.push(...result.Search);
    });

    return movies;
  }

  @Get('omdb/:id')
  async findOMDbMovieById(@Param('id') id: string) {
    return (await this.omdbService.getMovieById(id)).data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
