import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { OnLoginAnswer } from '../../interfaces/OnLoginAnswer';
import { Router } from '@angular/router';
import { AuthGlobalService } from 'src/app/services/auth-global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private auth: AuthGlobalService
  ) { }

  ngOnInit() {
    if (!this.auth.isTokenExpired()) {
      this.router.navigate([`/users/${this.auth.getUserId}`]);
    }
    // Init form
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    
    this.authService.login(email, password).subscribe((data: OnLoginAnswer) => {
      if (data.error) {
        this.messageService.add({severity:'error', summary:'Server error', detail: data.message});
      } else {
        this.router.navigate([`/users/${data.id}`]);
      }
    });
  }
}
