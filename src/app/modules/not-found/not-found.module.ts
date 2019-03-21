import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundRoutingModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
