import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ToastService } from '../../../data/services/toast.service';
import { AuthService } from '../../../data/services/auth.service';
import { TokenService } from '../../../data/services/token.service';
import { UserService } from '../../../data/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterModule,
    ToastModule,
    PasswordModule,
    NgClass,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isBgHover: boolean = false;
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly toast: ToastService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  onSubmit(): void {
    this.isLoading = true;

    setTimeout(() => {
      const formData = this.loginForm;

      if (formData.controls['email'].errors) {
        this.toast.error('Email Tidak Boleh Kosong');
        this.isLoading = false;
        return;
      }

      if (formData.controls['name'].errors) {
        this.toast.error('Nama Tidak Boleh Kosong');
        this.isLoading = false;
        return;
      }

      if (formData.controls['password'].errors) {
        this.toast.error('Password Tidak Boleh Kosong');
        this.isLoading = false;
        return;
      }

      this.userService.registerUser(formData.value).subscribe({
        next: () => {
          this.authService
            .loginUser({
              email: formData.value.email,
              password: formData.value.password,
            })
            .subscribe({
              next: (response) => {
                const {
                  accessToken,
                  refreshToken,
                }: { accessToken: string; refreshToken: string } =
                  response.data;
                this.tokenService.setToken(accessToken, refreshToken, '/home');
              },
              error: (err) => {
                this.toast.error(err.error.message);
              },
            });
        },
        error: (err) => {
          this.toast.error(err.error.message);
        },
      });

      this.isLoading = false;
    }, 1500);
  }

  onHover(): void {
    this.isBgHover = !this.isBgHover;
  }
}
