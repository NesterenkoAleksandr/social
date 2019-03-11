import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthGlobalService } from '../services/auth-global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthGlobalService,
    private router: Router
  ) {

  }

  /**
   *
   * @param route -
   * @param state -
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
