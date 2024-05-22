import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  urlBack = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getContestCurrentWeek(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBack}/favorite/current-week`);
  }

  getResultContestCurrentWeek(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBack}/favorite/result/current-week`);
  }

  delete(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.urlBack}/favorite/${id}`);
  }
}
