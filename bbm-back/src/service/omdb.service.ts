import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OMDbService {
  url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

  constructor(private readonly httpService: HttpService) {}

  async getMovieById(id: string) {
    return await axios.get(this.url + `&i=${id}`);
  }

  async getMovies(param: { s?: string; page?: number }) {
    return (
      await axios.get(
        `${this.url}&type=movie&s=${param.s}&page=${param.page ?? 1}`,
      )
    ).data;
  }
}
