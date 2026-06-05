
export interface TareaDto {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  fechaLimite: string;
  tipo?: string;
  tipoTarea?: string;
  prioridad?: number | 'Baja' | 'Media' | 'Alta' | string;
  estado?: string;
  estaVencida?: boolean;
  nivelUrgencia?: number;
  intervaloDias?: number;
  usuarioId?: number;
  nombreUsuario?: string;
  proximaOcurrencia?: string;
}