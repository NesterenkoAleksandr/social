import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AuthGlobalService } from '../../../../services/auth-global.service';
import { MessageService } from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  /** Пользователь, данные которого просматриваются */
  public user: User;

  /** Изображения пользователя, данные которого просматриваются */
  public images: Array<string>;

  /** Идентификаторы пользователей на которых подписан тек. авт. пользователь  */
  public followings: Array<string>;

  /** Текущая вкладка */
  public activeTab = 'selfies';

  /** Id пользователя, данные которого просматриваются  */
  public userProfileId: string;

  /** Id авторизованого пользователя */
  public authUserId: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private auth: AuthGlobalService,
    private messageService: MessageService
  ) {  }

  ngOnInit() {
    this.subscriptions.push(this.activeRoute.params.subscribe(res => {
      this.userProfileId = res.id;
      this.authUserId = this.auth.getUserId;
      this.getUserInfo(this.userProfileId);
      // this.getUserFollows();
    }));
  }

  /**
   * Получить данные пользователя по его идентификатору
   * @param userProfileId - идентификатор пользователя
   */
  public getUserInfo(userProfileId: string) {
    this.subscriptions.push(this.userService.getUserInfo(userProfileId).subscribe((data: User) => {
      this.user = data;
      this.images = data.my_images;
    }));
  }

  /**
   * Загрузить обложку на профиль пользователя
   * @param input - элемент выбора файла
   */
  public uploadCover(input) {
    this.subscriptions.push(this.userService.uploadCover(this.authUserId, input.files[0]).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.getUserInfo(this.userProfileId);
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
