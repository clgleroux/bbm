import { Component, OnInit } from '@angular/core';
import { longOMDb, MovieService } from '../service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  movie!: longOMDb;
  isShowMore: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.movieService.getOneOMDb(id).subscribe((res) => {
        this.movie = res;
      });
  }

  showMore(): void {
    this.isShowMore = !this.isShowMore;
  }
}
