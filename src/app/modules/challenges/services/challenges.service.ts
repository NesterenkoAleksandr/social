import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Challenge, ChallengesResponse } from '../interfaces/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Получить все соревнования
   * @param isActive - соревнование открыто
   * @param isClosed - соревнование закрыто
   */
  public getChallenges(isActive: number, isClosed: number): Observable<Array<Challenge>> {
    let params = new HttpParams();
    params = params.append('isActive', isActive.toString());
    params = params.append('isClosed', isClosed.toString());

    return this.http.get<ChallengesResponse>(`${this.apiUrl}/public/challenges/list`, {params}).pipe(
      map((data: ChallengesResponse) => {
        return data.challenges;
      })
    );
  }
}
