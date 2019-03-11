import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoViewModalComponent } from './components/photo-view-modal/photo-view-modal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
  declarations: [PhotoViewModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CommentsModule
  ],
  exports: [
    PhotoViewModalComponent
  ]
})
export class PhotoViewModalModule { }
