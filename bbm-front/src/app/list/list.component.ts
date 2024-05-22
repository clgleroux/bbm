import { Component, OnInit } from '@angular/core';
import { MovieService, shortOMDb } from '../service/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  movies!: shortOMDb[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllOMDb().subscribe((res) => {
      this.movies = res;
    });
  }
}
