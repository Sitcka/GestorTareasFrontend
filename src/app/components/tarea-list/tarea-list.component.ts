import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { TareaListRow } from '../tarea-list-row/tarea-list-row.component';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { AuthServiceTs } from '../../services/auth.service/auth.service';
import { Router } from '@angular/router';
import { TareaFormComponent } from '../tarea-form/tarea-form.component';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [TareaListRow, TareaFormComponent],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css',
})
export class TareaList implements OnInit {
  // ActivatedRoute le permite a TareaCard leer el id de la tarea directamente desde la URL /tareas/:id, sin necesidad de recibir ese id como @Input desde TareaList.
  // PROPIEDADES
  operaciones = inject(TareaServiceTs);
  authService = inject(AuthServiceTs);
  router = inject(Router);
  modalAbierto = signal(false);

  tareasVisibles = computed(() => {
    const usuario = this.authService.obtenerUsuarioAutenticado();
    const todas = this.operaciones.tareas();
    return usuario ? todas.filter(tarea => tarea.usuarioId === usuario.id) : todas;
  });

  onVerDetalles(id: number) {
    this.router.navigate(['/tareas', id]); // Navega a la ruta de detalles de tarea
  }

  async onEliminarTarea(id: number) {
    await this.operaciones.eliminarTarea(id);
    this.router.navigate(['/tareas']); // Navega de vuelta a la lista de tareas después de eliminar
  }

  ngOnInit(): void {
    this.operaciones.obtenerTareas();
  }

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
