import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly messageService: MessageService) {}

  success(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sukses',
      detail: message,
    });
  }

  info(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  warn(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Peringatan',
      detail: message,
    });
  }

  error(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
