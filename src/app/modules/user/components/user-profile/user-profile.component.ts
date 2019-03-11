import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AuthGlobalService } from 'src/app/services/auth-global.service';
import {MessageService} from 'primeng/api';
import { ServerResponse } from '../../../../interfaces/server-response';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  /** Пользователь, данные которого просматриваются */
  public user: User;

  /** Текущая вкладка */
  public activeTab = 'selfies';

  /** Id пользователя, данные которого просматриваются  */
  public userProfileId: string;

  /** Id авторизованого пользователя */
  public authUserId: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private auth: AuthGlobalService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.userProfileId = this.activeRoute.snapshot.params.id;
    this.authUserId = this.auth.getUserId;

    this.getUserInfo(this.userProfileId);
  }

  /**
   * Получить данные пользователя по его идентификатору
   * @param userProfileId - идентификатор пользователя
   */
  public getUserInfo(userProfileId: string) {
    this.userService.getUserInfo(userProfileId).subscribe((data: User) => {
      this.user = data;
    });
  }

  /**
   * Загрузить обложку на профиль пользователя
   * @param input - элемент выбора файла
   */
  public uploadCover(input) {
    this.userService.uploadCover(this.authUserId, input.files[0]).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.getUserInfo(this.userProfileId);
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
      );
  }
}
