import { Component, OnInit } from '@angular/core';
import { AuthGlobalService } from './services/auth-global.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public authUserId: string;
  constructor(
    private auth: AuthGlobalService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authUserId = this.auth.getUserId;
      }
    });
  }
}
