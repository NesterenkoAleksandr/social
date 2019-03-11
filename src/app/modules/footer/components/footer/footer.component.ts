import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { NgForm } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { OnFooterSubscribeAnswer } from '../../interfaces/on-footer-subscribe-answer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public email: string;

  constructor(private footerService: FooterService, private messageService: MessageService) { }

  ngOnInit() {
  }

  /** Подписаться на рассылку по электронной почте */
  public  onSubscribe() {
    this.footerService.subsribe(this.email).subscribe(
      (response: OnFooterSubscribeAnswer) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message}),
      () => this.email = null
    );
  }
}
