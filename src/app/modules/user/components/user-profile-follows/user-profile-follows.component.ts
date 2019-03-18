import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ServerResponse } from 'src/app/interfaces/server-response';

@Component({
  selector: 'app-user-profile-follows',
  templateUrl: './user-profile-follows.component.html',
  styleUrls: ['./user-profile-follows.component.css']
})
export class UserProfileFollowsComponent implements OnInit, OnChanges {

  /** Id пользователя, данные которого просматриваются  */
  @Input() userId: string;

  /** Id авторизованого пользователя */
  @Input() authUserId: string;

  /** Follovers or followings */
  @Input() path: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChanged = new EventEmitter<boolean>();

  /** Список пользователей на которых подписан authUserId */
  public followings: Array<string>;

  /** Массив с данными по подписчикам пользователя */
  public users: Array<User>;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import ('@angular/core').SimpleChanges): void {
    this.getAuthUserFollows();
    this.getUserFollows();
  }

  /**
   * Получить c сервера данные по подписчикам пользователя
   */
  public getUserFollows() {
    this.userService.getUserFollowings(this.authUserId, this.path).subscribe(
      (users: Array<User>) => {
        this.users = users;
      }
    );
  }

  /**
   * Получить c сервера данные по всем подпискам authUserId
   */
  public getAuthUserFollows() {
    this.userService.getUserFollowings(this.authUserId, 'followers').subscribe(
      (users: Array<User>) => {
        this.followings = this.followings = users.map((user => user._id));
      }
    );
  }

  /**
   * Проверка на то, что authUserId подписан на userId
   * @param userId - идентификатор пользователя, подписку на которого необходимо проверить
   * @param followings - идентификаторы пользователей, на которых подписан authUserId
   */
  public isFollowing(userId: string, followings: Array<string>): boolean {
    if (!followings) {
      return false;
    }
    return followings.some((id) => id === userId);
  }

  /**
   * Подписаться/отписаться от пользователя
   * @param userId - идентификатор пользователя
   */
  public toggleFollow(userId: string) {
    this.userService.toggleFollowing(userId).subscribe(
      (response: ServerResponse) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.getAuthUserFollows();
          this.onChanged.emit(true);
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}
