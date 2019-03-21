import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsPageComponent } from './components/account-settings-page/account-settings-page.component';
import { RouterModule } from '@angular/router';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';

@NgModule({
  declarations: [AccountSettingsPageComponent],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    RouterModule
  ],
  exports: [
    AccountSettingsPageComponent
  ]
})
export class AccountSettingsModule { }
