import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'users', loadChildren: './modules/user/user.module#UserModule', canActivate: [AuthGuard] },
  { path: 'challenges', loadChildren: './modules/challenges/challenges.module#ChallengesModule' },
  { path: 'news', loadChildren: './modules/news/news.module#NewsModule' },
  { path: 'legal', loadChildren: './modules/legal/legal.module#LegalModule' },
  { path: '', loadChildren: './modules/auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
