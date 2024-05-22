import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface shortOMDb {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface longOMDb extends shortOMDb {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  urlBack = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllOMDb(param?: { searchTitleMovie: string }): Observable<shortOMDb[]> {
    return this.http.get<shortOMDb[]>(`${this.urlBack}/movie/omdb/all`, {
      params: param,
    });
  }

  getOneOMDb(id: string): Observable<longOMDb> {
    return this.http.get<longOMDb>(`${this.urlBack}/movie/omdb/${id}`);
  }
}
