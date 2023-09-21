import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../basic/base.component';
import { LoginService } from '../../../shared/services/login.service';
import { UserLogin } from '../../models/user.model';
import { EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES } from './login.config';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyNotificationService } from 'src/app/shared/services/company-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm!: FormGroup;
  workEmail!: string;
  password!: string;
  isLoginSuccessful: boolean = false;
  isLoginFailed: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private notificationService: CompanyNotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      workEmail: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: UserLogin = {
        workEmail: this.loginForm.get('workEmail')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.loginService.login(user).subscribe(
        () => {
          this.isLoginSuccessful = true;
          this.isLoginFailed = false;
          this.dialogRef.close();
          this.notificationService.showSuccessMessage({
            title: 'Success',
            body: 'Login successful!',
          });
        },
        (error) => {
          this.isLoginSuccessful = false;
          this.isLoginFailed = true;
        },
      );
    } else {
      this.isLoginSuccessful = false;
      this.isLoginFailed = false;
    }
  }

  protected readonly EMAIL_ERROR_MESSAGES = EMAIL_ERROR_MESSAGES;
  protected readonly PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES;
}
