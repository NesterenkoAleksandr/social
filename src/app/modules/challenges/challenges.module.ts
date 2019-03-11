import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesItemComponent } from './components/challenges-item/challenges-item.component';
import { ChallengesPageComponent } from './components/challenges-page/challenges-page.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChallengesPageComponent,
    ChallengesItemComponent
  ],
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    SharedModule
  ]
})
export class ChallengesModule { }
