import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    OverlayPanelModule,
    SearchModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
