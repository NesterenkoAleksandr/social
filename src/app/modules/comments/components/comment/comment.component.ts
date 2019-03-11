import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { MessageService } from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() isComment: boolean;

  /** Комментарий */
  @Input() comment: Comment;

  /** Идентификатор комментария к которому привязывается подкомментарий */
  @Input() commentId: string;

  /** Id авторизованого пользователя */
  @Input() authUserId: string;

  /** Событие "Комментарий удален" */
  @Output() commentChanged: EventEmitter<any> = new EventEmitter();

  /** Признак того, что выполняется изменение комментария/подкомментария */
  public isEdit: boolean;

  /** Признак того, что выполняется добавление нового комментария/подкомментария */
  public isAdd: boolean;

  constructor(private commentsService: CommentsService, private messageService: MessageService) { }

  ngOnInit() {  }

  /** Отмена добавления/изменения записи */
  onCanceled() {
    this.isEdit = false;
    this.isAdd = false;
  }

  /**
   * Удалить комментарий
   * @param commentId - идентификатор комментария
   * @param imageId - идентификатор изображения
   */
  public deleteComment(commentId: string, imageId: string) {
    this.commentsService.deleteComment(commentId, imageId).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }

  /**
   * Удалить подкмментарий
   * @param commentId - идентификатор комментария
   * @param subCommentId - идентификатор подкрмментария
   */
  public deleteSubComment(commentId: string, subCommentId: string) {
    this.commentsService.deleteSubComment(commentId, subCommentId).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}
