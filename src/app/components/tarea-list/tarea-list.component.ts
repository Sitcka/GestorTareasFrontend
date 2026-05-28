import { Component } from '@angular/core';
import { TareaListRow } from '../tarea-list-row/tarea-list-row.component';
import { TareaDto } from '../../models/tarea.model/tarea.model';
import { TareaCard } from '../tarea-card/tarea-card.component';

@Component({
  selector: 'app-tarea-list',
  imports: [TareaListRow, TareaCard],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css',
})
export class TareaList {

  tareas: TareaDto[] = [...Array(5)].map((_, i) => ({
    id: i + 1,
    titulo: ` Titulo de la tarea ${i + 1}`,
    descripcion: `Descripción de la tarea ${i + 1}`,
    fechaCreacion: new Date().toLocaleDateString(),
    fechaLimite: new Date(Date.now() + (i + 1) * 86400000).toLocaleDateString(),
    tipo: i % 3 === 0 ? 'Simple' : i % 3 === 1 ? 'Recurrente' : 'Prioritaria',
  }));
  // Propiedad para almacenar la tarea seleccionada
  tareaSeleccionada: TareaDto | null = null;
  onVerDetalles(id: number) {
    // Logica para mostrar los detalles de la tarea seleccionada
    this.tareaSeleccionada = this.tareas.find(t => t.id === id) || null;
  }
  onCerrarDetalles() {
    this.tareaSeleccionada = null;
  }
  onEliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    if (this.tareaSeleccionada && this.tareaSeleccionada.id === id) {
      this.tareaSeleccionada = null;
    }
  }
}
