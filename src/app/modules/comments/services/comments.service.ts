import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Удалить комментарий
   * @param commentId - идентификатор комментария
   * @param imageId - идентификатор изображения
   */
  public deleteComment(commentId: string, imageId: string): Observable<ServerResponse> {
    const options = {
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        image_id: imageId
      })
    };

    return this.http.delete<ServerResponse>(`${this.apiUrl}/public/users/comment/${commentId}`, options);
  }

  public deleteSubComment(commentId: string, subCommentId: string): Observable<ServerResponse> {
    const options = {
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        sub_comment_id: subCommentId
      })
    };

    return this.http.delete<ServerResponse>(`${this.apiUrl}/public/users/sub-comment/${commentId}`, options);
  }

  /**
   * Добавить комментарий к изображению
   * @param imageId - идентификатор изображения
   * @param comment - текст комментария
   */
  public addComment(imageId: string, comment: string): Observable<ServerResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<ServerResponse>(`${this.apiUrl}/public/users/comment/${imageId}`, { comment_text: comment }, httpHeaders);
  }

  /**
   * Добавление подкомментария
   * @param commentId - идентификатор комментария
   * @param subCommentText - текст подкомментария
   */
  public addSubComment(commentId: string, subCommentText: string): Observable<ServerResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<ServerResponse>(`${this.apiUrl}/public/users/reply-comment/${commentId}`,
    { comment_text: subCommentText }, httpHeaders);
  }

  /**
   * Изменение комментария
   * @param commentId - идентификатор комментария
   * @param comment - текст комментария
   */
  public editComment(commentId: string, comment: string): Observable<ServerResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.put<ServerResponse>(`${this.apiUrl}/public/users/comment/${commentId}`, { comment_text: comment }, httpHeaders);
  }

  public editSubComment(commentId: string, subCommentId: string, subCommentText: string): Observable<ServerResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.put<ServerResponse>(`${this.apiUrl}/public/users/sub-comment/${commentId}`, {
      comment_text: subCommentText,
      sub_comment_id: subCommentId
    }, httpHeaders);
  }
}
