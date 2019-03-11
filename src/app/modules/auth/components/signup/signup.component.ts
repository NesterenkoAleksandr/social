import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { ServerResponse } from '../../../../interfaces/server-response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public SignUpForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    // Init form
    this.SignUpForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      nickname: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z0-9]*')]),
      first_name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]*')]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]*')]),
      phone: new FormControl('', [Validators.required]),
      gender_orientation: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z0-9]*')]),
      country: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]*')]),
      date_of_birth_day: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
      date_of_birth_month: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      date_of_birth_year: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2018)]),
    });
  }

  /**
   * Обрабочтик события "Submit" формы SignUp
   */
  public onSignUp() {
    // Обьект с данными нового пользователя
    const user: User = {
      email: this.SignUpForm.get('email').value,
      password: this.SignUpForm.get('password').value,
      nickname: this.SignUpForm.get('nickname').value,
      first_name: this.SignUpForm.get('first_name').value,
      last_name: this.SignUpForm.get('last_name').value,
      phone: this.SignUpForm.get('phone').value,
      gender_orientation: this.SignUpForm.get('gender_orientation').value,
      city: this.SignUpForm.get('city').value,
      country: this.SignUpForm.get('country').value,
      date_of_birth_day: this.SignUpForm.get('date_of_birth_day').value,
      date_of_birth_month: this.SignUpForm.get('date_of_birth_month').value,
      date_of_birth_year: this.SignUpForm.get('date_of_birth_year').value
    };

    this.authService.signUp(user).subscribe(
      (res: ServerResponse) => {
        if (res.error) {
          this.messageService.add({severity: 'error', summary: 'Error message', detail: res.message});
        } else {
          this.messageService.add({severity: 'success', summary: 'Success mesage', detail: res.message});
          this.router.navigate(['/auth/login']);
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Server error:', detail: error.message})
    );
  }

}
