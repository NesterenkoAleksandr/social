import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../interfaces/comment';
import {MessageService} from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.css']
})
export class FormCommentComponent implements OnInit, OnDestroy {

  @Input() isEdit: boolean;

  /** Идентификатор изображения */
  @Input() imageId: string;

  /** Текущий комментарий */
  @Input() comment: Comment;

  /** Идентификатор комментария */
  @Input() commentId: string;

  /** Событие "Комментарий Добавлен/Изменен" */
  @Output() commentChanged: EventEmitter<any> = new EventEmitter();

  /** Событие "Добавление/изменение комментариев отменено" */
  @Output() changeCanceled: EventEmitter<any> = new EventEmitter();

  private subscriptions: Array<Subscription> = [];

  constructor(private commentsService: CommentsService, private messageService: MessageService) { }

  ngOnInit() {
    this.comment = this.isEdit ? Object.assign({}, this.comment) : this.comment = Object.assign({});
  }

  /**
   * Обработка события "click" элемента "Submit"
   */
  public onSubmit() {
    if (this.commentId) {
      // Подкомментарий
      if (this.isEdit) {
        this.editSubComment();
      } else {
        this.addSubComment();
      }
    } else {
      // Комментарий
      if (this.isEdit) {
        this.editComment();
      } else {
        this.addComment();
      }
    }
  }

  /**
   * Добавить комментарий к изображению
   */
  public addComment() {
    this.subscriptions.push(this.commentsService.addComment(this.imageId, this.comment.text).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});

        if (!response.error) {
          this.comment = Object.assign({});
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    ));
  }

  /**
   * Изменить комментарий к изображению
   */
  public editComment() {
    this.subscriptions.push(this.commentsService.editComment(this.comment._id, this.comment.text).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});

        if (!response.error) {
          this.comment = Object.assign({});
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    ));
  }

  /**
   * Добавление подкомментария
   */
  public addSubComment() {
    this.subscriptions.push(this.commentsService.addSubComment(this.commentId, this.comment.text).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.comment = Object.assign({});
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    ));
  }

  /**
   * Изменение подкомментария
   */
  public editSubComment() {
    this.subscriptions.push(this.commentsService.editSubComment(this.commentId, this.comment._id, this.comment.text).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});

        if (!response.error) {
          this.comment = Object.assign({});
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    ));
  }

  /**
   * Отменить редактирование комментария
   */
  public cancel() {
    this.isEdit = false;
    this.comment = Object.assign({});
    this.changeCanceled.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}


