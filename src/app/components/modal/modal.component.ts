import {Component, EventEmitter, OnInit, Output, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Participant} from '../../core/types/Participant';
import {ClassificationService} from '../../core/service/classification-service';
import {ParticipantService} from '../../core/service/participant-service';
import {EventService} from '../../core/service/event-service';
import {ToastService} from '../../core/service/toast-service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  eventId?: number;
  @Output() closeModal = new EventEmitter<void>();
  participantForm: FormGroup;
  classificationTypes: string[] = [];
  isModalOpen = false;
  dropdownOpen = false;
  errorMessage: string | null = null;
  isSubmitting = false;

  private classificationService = inject(ClassificationService);
  private participantService = inject(ParticipantService);
  private eventService = inject(EventService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  constructor() {
    this.participantForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      presenca: [true],
      tipoIngresso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTypes();

    this.eventService.getEvent().subscribe({
      next: (eventData) => {
        this.eventId = eventData.id!;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar evento ativo: ' + (error.message || 'Tente novamente.');
      }
    });
  }

  getTypes() {
    this.classificationService.getClassificationTypes().subscribe(data => {
      this.classificationTypes = data;
    })
  }

  openModal() {
    this.isModalOpen = true;
    this.errorMessage = null;
  }

  close() {
    this.isModalOpen = false;
    this.participantForm.reset();
    this.errorMessage = null;
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.participantForm.invalid || !this.eventId) {
      this.participantForm.markAllAsTouched();
      if (!this.eventId) {
        this.toastService.showError("Evento não encontrado");
      }
      return;
    }

    this.isSubmitting = true;
    this.participantForm.disable();
    const participant: Participant = {
      name: this.participantForm.get('nome')?.value,
      email: this.participantForm.get('email')?.value,
      participantType: this.participantForm.get('tipoIngresso')?.value,
    };

    this.participantService.createParticipant(this.eventId, participant)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.participantForm.enable();
        })
      )
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Participante cadastrado com sucesso! Verifique seu email para confirmar o ingresso.');
          this.close();
        },
        error: (error) => {
          this.toastService.showError('Erro ao cadastrar participante: ' + (error.error.message || 'Tente novamente.'));
        },
      });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => {
      this.dropdownOpen = false;
      this.participantForm.get('tipoIngresso')?.markAsTouched();
    }, 150);
  }


  selectOption(value: string, event: Event) {
    event.stopPropagation();
    const control = this.participantForm.get('tipoIngresso');
    control?.setValue(value);
    control?.markAsDirty();
    control?.markAsTouched();
    control?.updateValueAndValidity();
    this.dropdownOpen = false;
  }

  get nome() {
    return this.participantForm.get('nome');
  }

  get email() {
    return this.participantForm.get('email');
  }

  get tipoIngresso() {
    return this.participantForm.get('tipoIngresso');
  }
}
