import { Component, OnInit } from '@angular/core';
import { ChallengesService } from '../../services/challenges.service';
import { Challenge } from '../../interfaces/challenge';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-challenges-page',
  templateUrl: './challenges-page.component.html',
  styleUrls: ['./challenges-page.component.css']
})
export class ChallengesPageComponent implements OnInit {
  /** Текущая вкладка */
  public activeTab: string;

  /** Соревнования */
  public challenges$: Observable<Array<Challenge>>;

  constructor(private challengesService: ChallengesService) { }

  ngOnInit() {
    this.getChallenges(1, 0, 'open');
  }

  /**
   * Получить все соревнования
   * @param isActive - признак того, что соревнование активно
   * @param isClosed - признак того, что соревнование закрыто
   * @param activeTab - название текущей вкладки
   */
  public getChallenges(isActive: number, isClosed: number, activeTab: string) {
    this.activeTab = activeTab;

    this.challenges$ = this.challengesService.getChallenges(isActive, isClosed);
  }

}
