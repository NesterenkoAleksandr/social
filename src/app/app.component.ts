import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGlobalService } from './services/auth-global.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  /** Отобразить прелоадер */
  public isShowLoader = true;

  public authUserId: string;

  private subscription: Subscription;

  constructor(
    private auth: AuthGlobalService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isShowLoader = true;
      }
      if (event instanceof NavigationEnd) {
        this.authUserId = this.auth.getUserId;

        setTimeout(() => {
          this.isShowLoader = false;
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
