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

  crearTarea(tarea: Omit<TareaDto, 'id' | 'fechaCreacion'>) {
    const nuevaTarea: TareaDto = {
      id: this._tareas().length > 0 ? Math.max(...this._tareas().map(t => t.id)) + 1 : 1,
      fechaCreacion: new Date().toLocaleDateString(),
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaLimite: tarea.fechaLimite,
      tipo: tarea.tipo,
    };
    this._tareas.update(tareas => [...tareas, nuevaTarea]);
  }

  actualizarTarea(id: number, tareaActualizada: Omit<TareaDto, 'id' | 'fechaCreacion'>) {
    this._tareas.update(tareas => tareas.map(tarea => 
      tarea.id === id ? { ...tarea, ...tareaActualizada } : tarea
    ));
  }

  buscarTareaPorId(id: number): TareaDto | undefined {
    return this._tareas().find(tarea => tarea.id === id);
  }

}
