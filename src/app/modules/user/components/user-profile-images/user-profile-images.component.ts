import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../interfaces/image';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';

@Component({
  selector: 'app-user-profile-images',
  templateUrl: './user-profile-images.component.html',
  styleUrls: ['./user-profile-images.component.css']
})
export class UserProfileImagesComponent implements OnInit {
  /** Id пользователя, данные которого просматриваются  */
  @Input() userId: string;

  /** Id авторизованого пользователя */
  @Input() authUserId: string;

  /** Массив изображений пользователя */
  public images: Image[];

  public uploadPhotosModalIsOpened = false;
  public photoViewModalIsOpened = false;

  public currentImageId: string;

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getImages();
  }

  /**
   * Получить c сервера фотографии пользователя
   */
  public getImages() {
    this.userService.getUserImages(this.userId).subscribe(
    (images: Array<Image>) => {
      this.images = images;
    });
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
   * Удалить изображение
   * @param imageId - идентификатор изображения
   * @param imageUrl - адрес изображения
   */
  public removeImage(imageId: string, imageUrl: string) {
    this.userService.removeUserImage(this.userId, imageId, imageUrl).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.getImages();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
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
          this.getImages();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}
