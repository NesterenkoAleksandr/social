import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './components/comment/comment.component';
import { FormCommentComponent } from './components/form-comment/form-comment.component';

@NgModule({
  declarations: [CommentComponent, FormCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CommentComponent,
    FormCommentComponent
  ]
})
export class CommentsModule { }
