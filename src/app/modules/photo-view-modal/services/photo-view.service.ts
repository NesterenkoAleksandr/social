import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Image } from '../../user/interfaces/image';
import { ServerResponse } from '../../../interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class PhotoViewService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Get image by Id
   * @param id - image Id
   */
  public getImage(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/public/users/image-info/${id}`);
  }

  /**
   * Изменение заголовка и описания изображения
   * @param imageId - идентификатор изображения
   * @param imgTitle - заголовок изображения
   * @param imageDescription - описание изображения
   */
  public editImageInfo(imageId: string, imgTitle: string, imageDescription: string): Observable<ServerResponse> {
    const body = {description: imageDescription, title: imgTitle };
    return this.http.put <ServerResponse>(`${this.apiUrl}/public/users/image-info/${imageId}`, body);
  }
}
