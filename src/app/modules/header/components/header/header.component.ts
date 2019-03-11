import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() authUserId: string;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Обработчик события "Click" элемента "Sign Out"
   */
  public onLogOut() {
    this.auth.logOut().subscribe(
      res => {
        if (res) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }
}
