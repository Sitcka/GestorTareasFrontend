import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarea-card',
  standalone: true, 
  templateUrl: './tarea-card.html',
  styleUrl: './tarea-card.css',
})
export class TareaCard {
  titulo = 'Titulo';
  descripcion = 'Descripción';
  fechaCreacion = new Date().toLocaleDateString();
  fechaLimite = new Date().toLocaleDateString();
  tipo = 'Completada';
  // @Input() tarea!: TareaDto; 
}
