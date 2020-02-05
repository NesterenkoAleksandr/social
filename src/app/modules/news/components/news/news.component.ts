import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { News } from '../../interfaces/news';
import { UserService } from '../../../../modules/user/services/user.service';
import { MessageService } from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  @Input() item: News;

  /** Идентификатор авторизованого пользователя */
  @Input() authUserId: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPhotoPreview =  new EventEmitter<{imageId: string, imagesIds: Array<string>}>();

  // Идентификаторы изображений новости
  public imagesIds: Array<string>;

  public picturesLength = 0;

  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.picturesLength = this.item.pictures.length;
    this.imagesIds = this.item.pictures.map(image => image._id);
  }

  /**
   * Открыть модальное окно
   * @param imageId - идентификатор изображения
   */
  public showPhotoPreview(imageId: string) {
    this.onPhotoPreview.emit({imageId, imagesIds: this.imagesIds});
  }

  /**
   * Проверка на то, что тек. авт. пользователь лайкнул это изображение
   * @param likes - идентификаторы пользователей, которые лайкнули тек. изображение
   */
  public isLiked(likes: Array<string>): boolean {
    return !likes ? false : likes.some((userId) => userId === this.authUserId);
  }

  /**
   * Лайкнуть/дизлайкнуть изображение
   * @param imageId - идентификатор изображения
   */
  public toggleImageLike(imageId: string, element) {
    this.subscription = this.userService.toggleImageLike(imageId).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          element.classList.toggle('active');
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
