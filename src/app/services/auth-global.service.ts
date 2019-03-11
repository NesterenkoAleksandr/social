import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGlobalService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  constructor() {}

  /** Получить токен из localStorage */
  get getToken() {
    return localStorage.getItem('mlp_client_token');
  }

  /** Получить Id пользователя из токена */
  get getUserId() {
    return this.getToken ? this.jwtHelper.decodeToken(this.getToken).id : null;
  }

  /** Проверка того, что время жизни токена еще не истекло */
  public isTokenExpired() {
    return this.jwtHelper.isTokenExpired(this.getToken);
  }
}
