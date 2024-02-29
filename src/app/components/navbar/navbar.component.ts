import { Component, HostListener } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../data/services/toast.service';
import { ToastModule } from 'primeng/toast';
import { TokenService } from '../../data/services/token.service';
import { AuthService } from '../../data/services/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar-user',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    SpinnerComponent,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  providers: [ConfirmationService],
})
export class NavbarComponent {
  isLoading: boolean = false;
  position: string = 'top-right';

  constructor(
    private readonly toastService: ToastService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setPosition();
  }

  setPosition(): void {
    if (window.innerWidth < 768) {
      this.position = 'bottom-right';
    } else {
      this.position = 'top-right';
    }
  }

  logout(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.authService.logout().subscribe({
        next: () => {
          this.tokenService.logout();
        },
        error: (error) => {
          this.toastService.error(error);
        },
      });
      this.isLoading = false;
    }, 1500);
  }

  logoutConfirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Kamu Yakin Ingin Keluar?',
      header: 'Peringatan',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Ya',
      rejectLabel: 'Tidak',
      accept: () => {
        this.logout();
      },
      key: 'positionDialog',
    });
  }
}
