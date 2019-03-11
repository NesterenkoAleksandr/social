import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  public news: Array<News>;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  /**
   * Получить список последних новостей
   * @param page - страница
   * @param count - к-во последнихновостей
   */
  public getNews(page: number = 1, count: number = 15) {
    this.newsService.getNews(page, count).subscribe(
      (news: Array<News>) => {
        this.news =  news;
      }
    );
  }
}
