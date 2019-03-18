import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Image } from '../../interfaces/image';
import { UserService } from '../../services/user.service';
import { ServerResponse } from '../../../../interfaces/server-response';
@Component({
  selector: 'app-user-profile-favourites',
  templateUrl: './user-profile-favourites.component.html',
  styleUrls: ['./user-profile-favourites.component.css']
})
export class UserProfileFavouritesComponent implements OnInit, OnChanges {
  /** Id пользователя, данные которого просматриваются  */
  @Input() userId: string;

  /** Id авторизованого пользователя */
  @Input() authUserId: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChanged = new EventEmitter<boolean>();

  /** Массив изображений пользователя */
  public images: Image[];

  // Идентификаторы лайкнутых пользователем изображений
  public imagesIds: Array<string>;

  public photoViewModalIsOpened = false;
  public currentImageId: string;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import ('@angular/core').SimpleChanges): void {
    this.getUserFavorites();
  }

  /**
   * Проверка на то, что тек. авт. пользователь лайкнул это изображение
   * @param likes - идентификаторы пользователей, которые лайкнули тек. изображение
   */
  public isLiked(likes: Array<string>): boolean {
    return likes.some((userId) => userId === this.authUserId);
  }

  /**
   * Получить c сервера избранные фотографии пользователя
   */
  public getUserFavorites() {
    this.userService.getUserFavorites(this.userId).subscribe(
      (images: Array<Image>) => {
        this.images = images;
        this.imagesIds = images.map(image => image._id);
      }
    );
  }

  /**
   * Открыть модальное окно
   * @param imageId - идентификатор изображения
   */
  public showPhotoViewModal(imageId: string) {
    this.currentImageId = imageId;
    this.photoViewModalIsOpened = true;
  }

  /**
   * Лайкнуть/дизлайкнуть изображение
   * @param imageId - идентификатор изображения
   */
  public toggleImageLike(imageId: string) {
    this.userService.toggleImageLike(imageId).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.getUserFavorites();
          this.onChanged.emit(true);
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}
