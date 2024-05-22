import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @Get('current-week')
  async findAllCurrentWeek() {
    return await this.favoriteService.findAllCurrentWeek();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Get('movie/:id')
  findAllUserByMovieId(@Param('id') id: string) {
    return this.favoriteService.findAllUserByMovieId(+id);
  }

  @Get('user/:id')
  findAllMovieByUserId(@Param('id') id: string) {
    return this.favoriteService.findAllMovieByUserId(+id);
  }

  @Get('result/current-week')
  async findResultCurrentWeek() {
    return await this.favoriteService.findResultCurrentWeek();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.favoriteService.remove(+id);
    return { id };
  }
}
