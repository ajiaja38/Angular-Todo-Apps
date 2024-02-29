import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly confirmationService: ConfirmationService) {}

  dialog(
    event: Event,
    message: string,
    callBack: Function,
    key?: string
  ): void {
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
      key,
    });
  }
}
