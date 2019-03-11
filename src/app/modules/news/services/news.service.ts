import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsResponse, News } from '../interfaces/news';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Получить новости
   * @param page - номер страницы
   * @param count - к-во новостей
   */
  public getNews(page: number, count: number): Observable<Array<News>> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/public/news?page=${page}&count=${count}`).pipe(
      map((data: NewsResponse) => {
        return data.news;
      })
    );
  }
}
