import { Component, inject } from '@angular/core';
import { TareaDto } from '../../models/tarea.model/tarea.model';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaFormComponent } from '../tarea-form/tarea-form.component';

@Component({
  selector: 'app-tarea-card',
  imports: [TareaFormComponent],
  standalone: true,
  templateUrl: './tarea-card.component.html',
  styleUrl: './tarea-card.component.css',
})
export class TareaCard {
  // Montar la aplicacion en Azure App Service y los viernes no se publica nada
  operaciones = inject(TareaServiceTs);
  ruta = inject(ActivatedRoute);
  router = inject(Router);
  editando = false;
  tareaSeleccionada: TareaDto | null = null;

  async ngOnInit() {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.tareaSeleccionada = await this.operaciones.buscarTareaPorId(id) || null;
  }

  onVolverAtras() {
    this.router.navigate(['/tareas']);
  }

  onEliminarTarea(id: number) {
    this.operaciones.eliminarTarea(id);
    this.router.navigate(['/tareas']); // Navega de vuelta a la lista de tareas después de eliminar
  }

  onEditar() {
    this.editando = true;
  }

  onCancelarEdicion() {
    this.editando = false;
  }

  onCompletarEditar() {
    this.editando = false;
  }
}