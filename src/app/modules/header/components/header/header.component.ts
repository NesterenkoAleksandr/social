import { Component, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  @Input() authUserId: string;

  private subscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  /**
   * Обработчик события "Click" элемента "Sign Out"
   */
  public onLogOut() {
    this.subscription = this.auth.logOut().subscribe(
      res => {
        if (res) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
