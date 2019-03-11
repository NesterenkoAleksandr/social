import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../../../modules/user/interfaces/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public users: Array<User>;

  public isResultShow = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

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
    this.searchService.searchUser(searchText).subscribe(
      (users: Array<User>) => {
        this.users = users;
      }
    );
  }
}
