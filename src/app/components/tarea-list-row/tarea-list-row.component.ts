import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TareaDto } from '../../models/tarea.model/tarea.model';

@Component({
  selector: '[app-tarea-list-row]',
  imports: [],
  templateUrl: './tarea-list-row.component.html',
  styleUrl: './tarea-list-row.component.css',
})
export class TareaListRow {
  @Input() tarea!: TareaDto;
  // La fila recibe la tarea entera para mostrarla.
  @Output() verDetalles = new EventEmitter<number>();
  // La fila emite el id cuando el usuario quiere ver detalles.
 
  onVerDetalles() {
    this.verDetalles.emit(this.tarea.id);
  }
  // 
}
