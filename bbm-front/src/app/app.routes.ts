import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { ContestComponent } from './contest/contest.component';

export const routes: Routes = [
  {
    path: 'contest',
    component: ContestComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];
