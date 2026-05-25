import { Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: '[app-tarea-card]',
  standalone: true, 
  imports: [NgClass],
  templateUrl: './tarea-card.html',
  styleUrl: './tarea-card.css',
})
export class TareaCard {
  titulo = 'Titulo';
  descripcion = 'Descripción';
  fechaCreacion = new Date().toLocaleDateString();
  fechaLimite = new Date().toLocaleDateString();
  tipo = 'Completada'; 
}
