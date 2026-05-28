import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TareaDto } from '../../models/tarea.model/tarea.model';

@Component({
  selector: 'app-tarea-card',
  // standalone: true, 
  templateUrl: './tarea-card.component.html',
  styleUrl: './tarea-card.component.css',
})
export class TareaCard {
  @Input() tarea!: TareaDto; 
  @Output() cerrarDetalles = new EventEmitter<number>();
  @Output() eliminarTarea = new EventEmitter<number>();

  onEliminar() {
    this.eliminarTarea.emit(this.tarea.id);
  }
  
  onCerrarDetalles() {
    this.cerrarDetalles.emit(this.tarea.id);
    console.log('Cerrar detalles de la tarea con id:', this.tarea.id);
  }

  
}
