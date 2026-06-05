import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TareaDto } from '../../models/tarea.model/tarea.model';

type TareaSimpleRequest = {
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  prioridad: string;
  usuarioId: number;
};

type TareaPrioritariaRequest = TareaSimpleRequest & {
  nivelUrgencia: number;
};

type TareaRecurrenteRequest = TareaSimpleRequest & {
  intervaloDias: number;
};

@Injectable({
  providedIn: 'root',
})
export class TareaServiceTs {
  private readonly baseUrl = 'http://localhost:5097/api/Tareas';
  private _tareas = signal<TareaDto[]>([]);

  public readonly tareas = this._tareas.asReadonly();

  constructor(private http: HttpClient) {}

  async obtenerTareas(): Promise<void> {
    try {
      const tareas = await firstValueFrom(this.http.get<TareaDto[]>(this.baseUrl));
      this._tareas.set(tareas);
    } catch (error) {
      console.error('Error al cargar tareas', error);
    }
  }

  async eliminarTarea(id: number): Promise<{ success: boolean; message: string }> {
    try {
      await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
      this._tareas.update(tareas => tareas.filter(tarea => tarea.id !== id));
      return { success: true, message: 'Tarea eliminada correctamente' };
    } catch (error) {
      console.error('Error al eliminar tarea', error);
      return { success: false, message: 'Error al eliminar tarea' };
    }
  }

  async crearTarea(tarea: {
    titulo: string;
    descripcion: string;
    fechaLimite: string;
    prioridad: string;
    tipo: string;
    usuarioId: number;
    nivelUrgencia?: number;
    intervaloDias?: number;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const rutaCreacion = this.getRutaCreacion(tarea.tipo);

      let body: TareaSimpleRequest | TareaPrioritariaRequest | TareaRecurrenteRequest = {
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        fechaLimite: tarea.fechaLimite,
        prioridad: tarea.prioridad,
        usuarioId: tarea.usuarioId,
      };

      if (rutaCreacion === 'prioritaria') {
        body = {
          ...body,
          nivelUrgencia: tarea.nivelUrgencia ?? 1,
        };
      }

      if (rutaCreacion === 'recurrente') {
        body = {
          ...body,
          intervaloDias: tarea.intervaloDias ?? 1,
        };
      }

      const nuevaTarea = await firstValueFrom(
        this.http.post<TareaDto>(`${this.baseUrl}/${rutaCreacion}`, body)
      );
      this._tareas.update(tareas => [...tareas, nuevaTarea]);
      return { success: true, message: 'Tarea creada correctamente' };
    } catch (error) {
      console.error('Error al crear tarea', error);
      const mensaje = this.extractErrorMessage(error, 'Error al crear tarea');
      return { success: false, message: mensaje };
    }
  }

  private getRutaCreacion(tipo: string): string {
    switch (tipo) {
      case 'Prioritaria':
        return 'prioritaria';
      case 'Recurrente':
        return 'recurrente';
      default:
        return 'simple';
    }
  }

  async actualizarTarea(id: number, tareaActualizada: Omit<TareaDto, 'id' | 'fechaCreacion'>): Promise<{ success: boolean; message: string }> {
    try {
      const rutaActualizacion = this.getRutaActualizacion(tareaActualizada.tipo ?? tareaActualizada.tipoTarea ?? 'Simple');
      const tarea = await firstValueFrom(
        this.http.put<TareaDto>(`${this.baseUrl}/${id}/${rutaActualizacion}`, tareaActualizada)
      );
      this._tareas.update(tareas => tareas.map(t => t.id === id ? tarea : t));
      return { success: true, message: 'Tarea actualizada correctamente' };
    } catch (error) {
      console.error('Error al actualizar tarea', error);
      const mensaje = this.extractErrorMessage(error, 'Error al actualizar tarea');
      return { success: false, message: mensaje };
    }
  }

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (error && typeof error === 'object' && 'message' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typed = error as any;
      if (typed.error && typeof typed.error === 'object') {
        return typed.error.message ?? typed.error.title ?? fallback;
      }
      return typed.message ?? fallback;
    }
    return fallback;
  }

  private getRutaActualizacion(tipo: string): string {
    switch (tipo) {
      case 'Prioritaria':
        return 'prioritaria';
      case 'Recurrente':
        return 'recurrente';
      default:
        return 'simple';
    }
  }

  async buscarTareaPorId(id: number): Promise<TareaDto | undefined> {
    const tareaLocal = this._tareas().find(t => t.id === id);
    if (tareaLocal) {
      return tareaLocal;
    }

    try {
      return await firstValueFrom(this.http.get<TareaDto>(`${this.baseUrl}/${id}`));
    } catch (error) {
      console.error('Error al obtener tarea por id', error);
      return undefined;
    }
  }
}