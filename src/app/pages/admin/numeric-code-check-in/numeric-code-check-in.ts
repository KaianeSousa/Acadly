import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ValidationResult} from '../../../core/types/ValidationResult';
import {EnrollmentService} from '../../../core/service/enrollment-service';
import {finalize, switchMap, throwError} from 'rxjs';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {EventService} from '../../../core/service/event-service';
import {ToastService} from '../../../core/service/toast-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-qrcode-check-in',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './numeric-code-check-in.html',
  styleUrl: './numeric-code-check-in.scss'
})
export class NumericCodeCheckIn implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private enrollmentService = inject(EnrollmentService);
  private eventService = inject(EventService);
  private fb = inject(FormBuilder);

  checkinForm: FormGroup;
  isProcessing = false;
  validationResult: ValidationResult | null = null;
  readonly prefix = 'SUB';

  constructor() {
    this.checkinForm = this.fb.group({
      numericCode: ['', [
        Validators.required,
        Validators.pattern(/^\d{6}$/i)
      ]]
    });
  }

  get numericCode() {
    return this.checkinForm.get('numericCode');
  }

  ngOnInit(): void {
    this.numericCode!.valueChanges.subscribe(value => {
      if (!value) return;

      const formattedValue = value.replace(/[^0-9]/g, '');

      if (formattedValue !== value) {
        this.numericCode!.setValue(formattedValue, {emitEvent: false});
      }
    });
  }

  verifyCode() {
    if (this.checkinForm.invalid || this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    this.numericCode!.disable();
    this.validationResult = null;

    const digits = this.numericCode!.value;
    const fullCode = this.prefix + digits;

    this.eventService.getEvent().pipe(
      switchMap(activeEvent => {
        if (!activeEvent || !activeEvent.id) {
          return throwError(() => new Error('Nenhum evento ativo foi encontrado para o check-in.'));
        }

        return this.enrollmentService.validateNumericCode(activeEvent.id, fullCode);
      }),
      finalize(() => {
        this.isProcessing = false;
        this.numericCode!.enable();
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (apiResponse) => {
        let cssClass: 'success' | 'error' | 'warning' = 'success';
        if (apiResponse.status.includes('JÁ REGISTRADO') || apiResponse.status.includes('NÃO INICIADO') || apiResponse.status.includes('ENCERRADO')) {
          cssClass = 'warning';
        }
        this.validationResult = {
          message: apiResponse.message,
          participantName: apiResponse.participantName,
          eventName: apiResponse.eventName,
          cssClass: cssClass
        };
      },
      error: (err) => {
        this.validationResult = {
          message: err.error?.message || 'Código inválido ou erro inesperado.',
          cssClass: 'error'
        };
      },
    });
  }

  resetForm() {
    this.checkinForm.reset();
    this.numericCode!.enable();
    this.validationResult = null;
    this.isProcessing = false;
  }
}
