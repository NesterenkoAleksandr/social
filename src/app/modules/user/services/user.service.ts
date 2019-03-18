import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { User, Follows } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../interfaces/image';
import { Images } from '../interfaces/images';
import { ServerResponse } from '../../../interfaces/server-response';


@Injectable()
export class UserService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Получить данные пользователя по его Id
   * @param id - идентификатор пользователя
   */
  public getUserInfo(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/public/users/get-info/${id}`);
  }

  /**
   * Получить все изображения пользователя
   * @param id - идентификатор пользователя
   */
  public getUserImages(id: string): Observable<Array<Image>> {
    return this.http.get<Images>(`${this.apiUrl}/public/users/my-images/${id}`).pipe(
      map((data: Images) => {
        return data.images;
      })
    );
  }

  /**
   * Удалить изображение
   * @param userId - идентификатор пользователя
   * @param imageId - идентификатор изображения
   * @param imageUrl - адресс изображения
   */
  public removeUserImage(userId: string, imageId: string, imageUrl: string): Observable<ServerResponse> {
    const divideUrl = imageUrl.split('/');

    const options = {
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        image_id: imageId,
        image_url: `${divideUrl[divideUrl.length - 2]}/${divideUrl[divideUrl.length - 1]}`
      })
    };

    return this.http.delete<ServerResponse>(`${this.apiUrl}/public/users/remove-photo/${userId}`, options);
  }

  /**
   * Получить избранные изображения пользователя
   * @param userId - идентификатор пользователя
   * @param part -
   * @param limit -
   */
  public getUserFavorites(userId: string, part: number = 1, limit: number = 20): Observable<Array<Image>> {
    return this.http.get<Images>(`${this.apiUrl}/public/users/my-favorites/${userId}?part=${part}&limit=${limit}`).pipe(
      map((data: Images) => {
        return data.images;
      })
    );
  }

  /**
   * Получить подписки или подписчиков пользователя
   * @param userId - идентификатор пользователя
   * @param path - followers or followings
   * @param part - часть
   * @param limit - к-во элементов
   */
  public getUserFollowings(userId: string, path: string = 'followers', part: number = 1, limit: number = 6): Observable<Array<any>> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Follows>(`${this.apiUrl}/public/users/my-followers-followings/${userId}?part=${part}&limit=${limit}&path=${path}`).pipe(
      map((data: Follows) => {
        return data.users;
      })
    );
  }

  /**
   * Лайкнуть/дизлайкнуть изображение
   * @param imageId - идентификатор изображения
   */
  public toggleImageLike(imageId: string): Observable<ServerResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.put<ServerResponse>(`${this.apiUrl}/public/users/like-photo/${imageId}`, httpHeaders);
  }

  /**
   * Подписаться/отписаться от пользователя
   * @param userId - идентификатор пользователя
   */
  public toggleFollowing(userId: string): Observable<ServerResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.put<ServerResponse>(`${this.apiUrl}/public/users/following/${userId}`, httpHeaders);
  }

  /**
   * Загрузить обложку на профиль пользователя
   * @param userId - идентификатор авторизованого пользователя
   * @param file - файл изображения
   */
  public uploadCover(userId: string, file: any): Observable<ServerResponse> {
    const formData = new FormData();
    formData.append('coverImg', file);

    return this.http.post<ServerResponse>(`${this.apiUrl}/public/users/upload-cover/${userId}`, formData);
  }
}
