import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './components/legal/legal.component';
import { GeneralComponent } from './components/general/general.component';
import { TermsComponent } from './components/terms/terms.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { RightsComponent } from './components/rights/rights.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LegalComponent, GeneralComponent, TermsComponent, ConditionsComponent, RightsComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    LegalRoutingModule,
    RouterModule
  ]
})
export class LegalModule { }
