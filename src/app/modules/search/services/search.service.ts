import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Найти пользователя
   * @param searchText - условие для поиска
   */
  public searchUser(searchText: string) {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post(`${this.apiUrl}/public/users/search-users`, { search_text: searchText }, httpHeaders);
  }
}
