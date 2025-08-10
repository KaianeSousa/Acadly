import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
})
export class FormComponent {
  nome: string = '';
  email: string = '';
  relacao: string = '';
  participar: string = '';

  onSubmit() {
    console.log('Formulário enviado:', { nome: this.nome, email: this.email, relacao: this.relacao, participar: this.participar });

  }
}