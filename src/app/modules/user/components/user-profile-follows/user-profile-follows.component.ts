import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

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

  /** Массив с данными по подписчикам пользователя */
  public users: Array<User>;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import ('@angular/core').SimpleChanges): void {
    this.getUserFollows();
  }

  /**
   * Получить c сервера данные по подписчикам пользователя
   */
  public getUserFollows() {
    this.userService.getUserFollowings(this.userId, this.path).subscribe(
      (users: Array<User>) => {
        this.users = users;
      }
    );
  }
}
