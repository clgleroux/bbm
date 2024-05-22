import { Component, OnInit } from '@angular/core';
import { ContestService } from '../service/contest.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-contest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.scss',
})
export class ContestComponent implements OnInit {
  contestCurrent!: any[];
  resultContestCurrent!: any[];

  isShowDetails: boolean = false;

  constructor(private readonly contestService: ContestService) {}

  ngOnInit(): void {
    this.contestService.getResultContestCurrentWeek().subscribe((res) => {
      this.resultContestCurrent = res;
    });
  }

  showDetails(): void {
    this.isShowDetails = !this.isShowDetails;
    if (this.isShowDetails)
      this.contestService.getContestCurrentWeek().subscribe((res) => {
        this.contestCurrent = res;
      });
  }

  deleteFavorite(id: number): void {
    this.contestService.delete(id).subscribe((res) => {
      this.refreshData();
    });
  }

  refreshData() {
    forkJoin({
      contestCurrent: this.contestService.getContestCurrentWeek(),
      resultContestCurrent: this.contestService.getResultContestCurrentWeek(),
    }).subscribe(({ contestCurrent, resultContestCurrent }) => {
      this.contestCurrent = contestCurrent;
      this.resultContestCurrent = resultContestCurrent;
    });
  }
}
