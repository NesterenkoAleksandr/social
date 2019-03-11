import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './components/news/news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewsComponent, NewsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    NewsComponent,
    NewsRoutingModule
  ]
})
export class NewsModule { }
