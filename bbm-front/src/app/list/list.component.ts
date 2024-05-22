import { Component, OnInit } from '@angular/core';
import { MovieService, shortOMDb } from '../service/movie.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  movies!: shortOMDb[];
  searchTitleMovie!: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.searchTitleMovie = params['s'];
    });
  }

  ngOnInit(): void {
    if (this.searchTitleMovie) this.search();
  }

  search(): void {
    this.movieService
      .getAllOMDb({ searchTitleMovie: this.searchTitleMovie })
      .subscribe((res) => {
        this.movies = res;
      });
  }
}
