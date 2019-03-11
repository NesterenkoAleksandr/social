import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewService } from '../../services/photo-view.service';
import { Image } from '../../../user/interfaces/image';
import { NgForm} from '@angular/forms';
import { AuthGlobalService } from 'src/app/services/auth-global.service';
import { MessageService } from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';
import { UserService } from '../../../../modules/user/services/user.service';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view-modal.component.html',
  styleUrls: ['./photo-view-modal.component.css']
})
export class PhotoViewModalComponent implements OnInit {
  @Input() imageId: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public image: Image;

  /** Id авторизованого пользователя */
  public authUserId: string;

  constructor(
    private photoViewService: PhotoViewService,
    private auth: AuthGlobalService,
    private messageService: MessageService,
    public userService: UserService
    ) { }

  ngOnInit() {
    this.authUserId = this.auth.getUserId;
    this.getImage();
  }

  /**
   * Получить изображение
   */
  public getImage() {
    this.photoViewService.getImage(this.imageId).subscribe((image: Image) => {
      this.image = image;
    });
  }

  /**
   * Закрытие модального окна
   */
  public closeModal() {
    this.onClose.emit();
  }

  /**
   * Изменить заголовок и описание изображения
   */
  public onSubmit() {
    this.photoViewService.editImageInfo(this.imageId, this.image.title, this.image.description).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.getImage();
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
          this.getImage();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}