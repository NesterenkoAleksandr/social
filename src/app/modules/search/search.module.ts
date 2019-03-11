import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
