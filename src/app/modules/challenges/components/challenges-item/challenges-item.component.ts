import { Component, Input } from '@angular/core';
import { Challenge } from '../../interfaces/challenge';

@Component({
  selector: 'app-challenges-item',
  templateUrl: './challenges-item.component.html',
  styleUrls: ['./challenges-item.component.css']
})
export class ChallengesItemComponent {
  /** Соревнование */
  @Input() challenge: Challenge;

  constructor() { }

}
