import { Component, inject } from '@angular/core';
import { TareaListRow } from '../tarea-list-row/tarea-list-row.component';
import { TareaDto } from '../../models/tarea.model/tarea.model';
import { TareaCard } from '../tarea-card/tarea-card.component';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [TareaListRow, TareaCard],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css',
})
export class TareaList {

  operaciones = inject(TareaServiceTs);
  // Propiedad para almacenar la tarea seleccionada
  tareaSeleccionada: TareaDto | null = null;
  onVerDetalles(id: number) {
    // Logica para mostrar los detalles de la tarea seleccionada
    this.tareaSeleccionada = this.operaciones.tareas().find(tarea => tarea.id === id) || null;
  }
  onCerrarDetalles() {
    this.tareaSeleccionada = null;
  }
  onEliminarTarea(id: number) {
    this.operaciones.eliminarTarea(id);
    if (this.tareaSeleccionada && this.tareaSeleccionada.id === id) {
      this.tareaSeleccionada = null;
    }
  }
  // Signal para almacenar las tareas
  // ngOnInit() 
}
