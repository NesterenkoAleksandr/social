import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}
