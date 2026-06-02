import { Injectable, signal } from '@angular/core';
import { TareaDto } from '../../models/tarea.model/tarea.model';

@Injectable({
  providedIn: 'root',
})
export class TareaServiceTs {
  private _tareas = signal<TareaDto[]>([...Array(5)].map((_, i) => ({
    id: i + 1,
    titulo: ` Titulo de la tarea ${i + 1}`,
    descripcion: `Descripción de la tarea ${i + 1}`,
    fechaCreacion: new Date().toLocaleDateString(),
    fechaLimite: new Date(Date.now() + (i + 1) * 86400000).toLocaleDateString(),
    tipo: i % 3 === 0 ? 'Simple' : i % 3 === 1 ? 'Recurrente' : 'Prioritaria',
  }))); 

  public readonly tareas = this._tareas.asReadonly();



  eliminarTarea(id: number) {
    this._tareas.update(tareas => tareas.filter(tarea => tarea.id !== id));
  }

}
