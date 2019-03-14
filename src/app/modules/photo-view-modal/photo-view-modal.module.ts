import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoViewModalComponent } from './components/photo-view-modal/photo-view-modal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [PhotoViewModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CommentsModule,
    RouterModule,
    LoaderModule
  ],
  exports: [
    PhotoViewModalComponent
  ]
})
export class PhotoViewModalModule { }
