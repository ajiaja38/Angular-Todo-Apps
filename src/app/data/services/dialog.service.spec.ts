import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { ConfirmationService } from 'primeng/api';

describe('DialogService', () => {
  let service: DialogService;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: ConfirmationService, useValue: spy },
      ],
    });
    service = TestBed.inject(DialogService);
    confirmationServiceSpy = TestBed.inject(
      ConfirmationService
    ) as jasmine.SpyObj<ConfirmationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call confirmationService.confirm method', () => {
    const event = { target: {} } as Event;
    const message = 'Are you sure?';
    const callback = jasmine.createSpy('callback');
    const key = 'testKey';

    service.dialog(event, message, callback, key);

    expect(confirmationServiceSpy.confirm).toHaveBeenCalledWith({
      target: event.target as EventTarget,
      message: message,
      header: 'Peringatan',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Ya',
      rejectLabel: 'Tidak',
      accept: jasmine.any(Function),
      key,
    });
  });
});
