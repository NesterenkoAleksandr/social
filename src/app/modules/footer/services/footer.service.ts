import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnFooterSubscribeAnswer } from '../interfaces/on-footer-subscribe-answer';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

/**
 * Подписаться на рассылку электронной почты
 * @param email - имя электронной почты
 */
  public subsribe(email: string): Observable<OnFooterSubscribeAnswer> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<OnFooterSubscribeAnswer>(`${this.apiUrl}/public/subscribe`,
    { email },
    httpHeaders);
  }
}
