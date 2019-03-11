import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SearchComponent } from '../search/components/search/search.component';

@NgModule({
  declarations: [HeaderComponent, SearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    OverlayPanelModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
