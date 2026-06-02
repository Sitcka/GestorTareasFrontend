import { Component, inject } from '@angular/core';
import { TareaListRow } from '../tarea-list-row/tarea-list-row.component';
import { TareaDto } from '../../models/tarea.model/tarea.model';
import { TareaCard } from '../tarea-card/tarea-card.component';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [TareaListRow],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css',
})
export class TareaList {
   operaciones = inject(TareaServiceTs);
   router = inject(Router);
  // Propiedad para almacenar la tarea seleccionada
  onVerDetalles(id: number) {
    this.router.navigate(['/tareas', id]); // Navega a la ruta de detalles de tarea
  }

  onEliminarTarea(id: number) {
    this.operaciones.eliminarTarea(id);
    this.router.navigate(['/tareas']); // Navega de vuelta a la lista de tareas después de eliminar
  }
  // Signal para almacenar las tareas
  // ngOnInit() 
}
