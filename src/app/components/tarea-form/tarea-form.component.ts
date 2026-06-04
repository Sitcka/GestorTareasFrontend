import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css',
})
export class TareaFormComponent {
  // FormBuilder no cambia el numero de instancias, solo te da una forma mas comoda de construir el mismo FormGroup y FormControl por debajo.
  // Entonces lo dejare con FormBuilder por facilidad, pero se podría hacer exactamente lo mismo sin FormBuilder.
  formularioInyeccion = inject(FormBuilder);
  operaciones = inject(TareaServiceTs);
  @Output() formularioEnviado = new EventEmitter<void>();
  @Output() completarEditar = new EventEmitter<void>();
  formulario: FormGroup = this.formularioInyeccion.group({
    titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    descripcion: ['', [Validators.minLength(50), Validators.maxLength(500)]],
    fechaLimite: ['', [Validators.required]],
    tipo: ['Simple', [Validators.required, Validators.pattern('^(Prioritaria|Recurrente|Simple)$')]],
  });

  onEnviarFormulario() {
    if (this.formulario.invalid) {
      console.log('Formulario no válido');
      return;
    } else {
      const nuevaTarea = {
        titulo: this.formulario.value.titulo,
        descripcion: this.formulario.value.descripcion,
        fechaLimite: this.formulario.value.fechaLimite,
        tipo: this.formulario.value.tipo,
      };
      this.operaciones.crearTarea(nuevaTarea);
      this.formularioEnviado.emit();
      this.formulario.reset({
        titulo: '',
        descripcion: '',
        fechaLimite: '',
        tipo: 'Simple',
      });
    }
  }
  

}
