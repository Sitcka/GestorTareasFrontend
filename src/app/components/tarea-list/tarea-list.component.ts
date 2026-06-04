import { Component, inject, signal} from '@angular/core';
import { TareaListRow } from '../tarea-list-row/tarea-list-row.component';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { Router } from '@angular/router';
import { TareaFormComponent } from '../tarea-form/tarea-form.component';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [TareaListRow, TareaFormComponent],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css',
})
export class TareaList {
  // ActivatedRoute le permite a TareaCard leer el id de la tarea directamente desde la URL /tareas/:id, sin necesidad de recibir ese id como @Input desde TareaList.
  // PROPIEDADES
  operaciones = inject(TareaServiceTs);
  router = inject(Router);
  modalAbierto = signal(false);


  onVerDetalles(id: number) {
    this.router.navigate(['/tareas', id]); // Navega a la ruta de detalles de tarea
  }

  onEliminarTarea(id: number) {
    this.operaciones.eliminarTarea(id);
    this.router.navigate(['/tareas']); // Navega de vuelta a la lista de tareas después de eliminar
  }
  // Mostrar la lista y, cuando el usuario elija una fila, cambiar la URL para que el router abra la pantalla correcta.
  // Signal para almacenar las tareas
  // ngOnInit() 

  onModalAbierto() {
    this.modalAbierto.set(true);
  }

  onModalCerrado() {
    this.modalAbierto.set(false);
  }

  dialogo() {
    console.log('click overlay');
  }
}
