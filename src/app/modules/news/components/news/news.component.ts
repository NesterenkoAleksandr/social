import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() item: News;

  constructor() { }

  ngOnInit() {
  }
}
