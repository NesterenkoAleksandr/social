import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnLoginAnswer } from './../interfaces/OnLoginAnswer';
import { User } from '../interfaces/User';
import { ServerResponse } from '../../../interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    httpBackend: HttpBackend
  ) {
    this.http = new HttpClient(httpBackend);
  }

  /**
   * Подключение к серверу
   * @param email - адрес электронной почты
   * @param password - пароль
   */
  login(email: string, password: string): Observable<OnLoginAnswer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/login`, { email, password }, httpOptions).pipe(
      map((res: OnLoginAnswer): OnLoginAnswer => {
        if (!res.error) {
          localStorage.setItem('mlp_client_token', res.token);
        }

        return res;
      })
    );
  }

  /**
   * Выход из системы
   */
  public logOut(): Observable<boolean> {
    localStorage.removeItem('mlp_client_id');
    localStorage.removeItem('mlp_client_token');
    return  of(true);
  }

  /**
   * Регистрация нового пользователя
   * @param user - данные для регистрации нового пользователя
   */
  public signUp(user: User): Observable<ServerResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<ServerResponse>(`${this.apiUrl}/public/auth/signup`, user, httpOptions);
  }
}
