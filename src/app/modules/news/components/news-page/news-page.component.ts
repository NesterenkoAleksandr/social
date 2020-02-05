import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news';
import { AuthGlobalService } from '../../../../services/auth-global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  public news$: Observable<Array<News>>;

  /** Отобразить прелоадер */
  public isShowLoader = true;

  /** Id авторизованого пользователя */
  public authUserId: string;

  public photoViewModalIsOpened = false;
  public currentImageId: string;
  public imagesIds: Array<string>;

  constructor(
    private newsService: NewsService,
    private auth: AuthGlobalService) { }

  ngOnInit() {
    this.authUserId = this.auth.getUserId;
    this.getNews();
  }

  /**
   * Получить список последних новостей
   * @param page - страница
   * @param count - к-во последнихновостей
   */
  public getNews(page: number = 1, count: number = 15) {
    this.news$ = this.newsService.getNews(page, count);
  }

  /**
   * Открыть модальное окно
   * @param imageId - идентификатор изображения
   */
  public showPhotoViewModal(imageId: string, imagesIds: Array<string>) {
    if (!imageId || !imagesIds) {
      return;
    }
    this.currentImageId = imageId;
    this.imagesIds = imagesIds;
    this.photoViewModalIsOpened = true;
  }
}
