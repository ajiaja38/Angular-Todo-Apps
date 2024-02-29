import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TodoDto } from '../../data/interface';
import { TodoService } from '../../data/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../data/services/toast.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'card-todo',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule,
    SpinnerComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './card-todo.component.html',
})
export class CardTodoComponent implements OnInit {
  @Input() todo!: TodoDto;
  defaultImage: string =
    'https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  currentPage: string | undefined;
  isLoading: boolean = false;

  constructor(
    private readonly todoService: TodoService,
    private readonly routes: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.currentPage = this.routes.snapshot.routeConfig?.path;
  }

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }

  dialog(event: Event, message: string, callBack: Function): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message,
      header: 'Peringatan',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Ya',
      rejectLabel: 'Tidak',
      accept: () => {
        callBack();
      },
    });
  }

  confirmActionTodo(event: Event, id: string, status: boolean): void {
    const message: string = `Yakin akan ${
      this.currentPage === 'home' ? 'Mengarsipkan' : 'Mengaktifkan'
    } Todo?`;
    this.dialog(event, message, () => this.updateStatusTodo(id, status));
  }

  updateStatusTodo(id: string, status: boolean): void {
    this.isLoading = true;
    setTimeout(() => {
      this.todoService.updateStatusTodo(id, { status }).subscribe({
        next: () => {
          this.toastService.success(
            `Berhasil ${
              this.currentPage === 'home' ? 'Mengarsipkan' : 'Mengaktifkan'
            } Todo`
          );

          if (this.currentPage === 'home')
            this.router.navigateByUrl('/archive');
          if (this.currentPage === 'archive')
            this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastService.error(err.error.message);
        },
      });
      this.isLoading = false;
    }, 1500);
  }
}
