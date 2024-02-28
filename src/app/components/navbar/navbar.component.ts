import { Component, HostListener, OnInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../data/services/toast.service';
import { ToastModule } from 'primeng/toast';
import { TokenService } from '../../data/services/token.service';
import { AuthService } from '../../data/services/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterLink, RouterModule } from '@angular/router';

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
  providers: [ConfirmationService],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isLoading: boolean = false;
  position: string = 'top-right';

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService
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

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Kamu Yakin ingin logout?',
      header: 'Peringatan',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
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
      },
      key: 'positionDialog',
    });
  }
}
