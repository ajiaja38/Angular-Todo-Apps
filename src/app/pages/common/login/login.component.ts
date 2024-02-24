import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../data/services/toast.service';
import { PasswordModule } from 'primeng/password';
import { NgClass } from '@angular/common';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AuthService } from '../../../data/services/auth.service';
import { TokenService } from '../../../data/services/token.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.style.scss',
})
export class LoginComponent {
  isBgHover: boolean = false;
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly toast: ToastService,
    private readonly auth: AuthService,
    private readonly token: TokenService
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

      if (formData.controls['password'].errors) {
        this.toast.error('Password Tidak Boleh Kosong');
        this.isLoading = false;
        return;
      }

      this.toast.success('Berhasil Login');
      this.isLoading = false;
    }, 1500);
  }

  onHover(): void {
    this.isBgHover = !this.isBgHover;
  }
}
