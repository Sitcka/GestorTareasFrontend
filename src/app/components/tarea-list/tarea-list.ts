import { Component } from '@angular/core';
import { TareaListRow } from '../tarea-list-row/tarea-list-row';
import { TareaDto } from '../../models/tarea.model/tarea.model';

@Component({
  selector: 'app-tarea-list',
  imports: [TareaListRow],
  templateUrl: './tarea-list.html',
  styleUrl: './tarea-list.css',
})
export class TareaList {

  tareas: TareaDto[] = [...Array(5)].map((_, i) => ({
    id: i + 1,
    titulo: `Tarea ${i + 1}`,
    descripcion: `Descripción de la tarea ${i + 1}`,
    fechaCreacion: new Date().toLocaleDateString(),
    fechaLimite: new Date(Date.now() + (i + 1) * 86400000).toLocaleDateString(),
    tipo: i % 2 === 0 ? 'Completada' : 'Pendiente',
  }));
  onVerDetalles(id: number) {
    console.log('Ver detalles de la tarea con id', id);
  }
}
