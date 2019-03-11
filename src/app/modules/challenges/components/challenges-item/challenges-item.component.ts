import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from '../../interfaces/challenge';

@Component({
  selector: 'app-challenges-item',
  templateUrl: './challenges-item.component.html',
  styleUrls: ['./challenges-item.component.css']
})
export class ChallengesItemComponent implements OnInit {
  /** Соревнование */
  @Input() challenge: Challenge;

  constructor() { }

  ngOnInit() {  }

}
