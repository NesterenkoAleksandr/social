import { Component, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../../../modules/user/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy {
  public users: Array<User>;

  public isResultShow = false;

  private subscription: Subscription;

  constructor(private searchService: SearchService) { }

  /**
   * Обработка события "Изменение условия поиска"
   * @param searchText - условие поиска
   */
  public changeSearchText(searchText: string) {
    if (searchText.length < 3) {
      this.isResultShow = false;
      return;
    }

    this.isResultShow = true;
    this.subscription = this.searchService.searchUser(searchText).subscribe(
      (users: Array<User>) => {
        this.users = users;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
