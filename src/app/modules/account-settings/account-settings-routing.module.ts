import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsPageComponent } from './components/account-settings-page/account-settings-page.component';

const routes: Routes = [
  { path: '', component: AccountSettingsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
