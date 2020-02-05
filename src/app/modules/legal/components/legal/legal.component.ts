import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit, OnDestroy {
  /** Текущая вкладка */
  public activeTab: string;
  private subsription: Subscription;

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subsription = this.activeRoute.params.subscribe(res => {
      this.activeTab = res.page ||  'general';
    });
  }

  ngOnDestroy() {
    if (this.subsription) {
      this.subsription.unsubscribe();
    }
  }
}
