import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classification } from '../../core/types/Classification';
import { Participant } from '../../core/types/Participant';
import { ClassificationService } from '../../core/service/classification-service';
import { ParticipantService } from '../../core/service/participant-service';
import { EventService } from '../../core/service/event-service'; 

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  eventId?: number;
  @Input() classifications: Classification[] = [];
  @Output() closeModal = new EventEmitter<void>();
  participantForm: FormGroup;
  isModalOpen = false;
  dropdownOpen = false;
  errorMessage: string | null = null;

  private classificationService = inject(ClassificationService);
  private participantService = inject(ParticipantService);
  private eventService = inject(EventService);
  private fb = inject(FormBuilder);

  constructor() {
    this.participantForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      presenca: [false],
      tipoIngresso: ['', Validators.required],  
    });
  }
  ngOnInit(): void {
    this.classificationService.getClassificationsByType().subscribe({
      next: (data) => {
        this.classifications = data;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar classificações: ' + (error.message || 'Tente novamente.');
      },
    });
    
    this.eventService.getEvent().subscribe({
      next: (eventData) => {
        this.eventId = eventData.id;  
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar evento ativo: ' + (error.message || 'Tente novamente.');
      }
    });
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
    console.log(this.eventId);
    if (this.participantForm.valid && this.eventId) {
      const participant: Participant = {
        name: this.participantForm.get('nome')?.value,
        email: this.participantForm.get('email')?.value,
        participantType: this.participantForm.get('tipoIngresso')?.value.toUpperCase(),
      };

      this.participantService.createParticipant(this.eventId, participant).subscribe({
        next: (response) => {
          alert(response);
          this.close();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao cadastrar participante: ' + (error.error || error.message);
        },
      });
    } else {
      this.participantForm.markAllAsTouched();
      if (!this.eventId) {
        this.errorMessage = 'ID do evento não fornecido.';
      }
    }
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
  

  selectOption(value: string, event: MouseEvent) {
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
