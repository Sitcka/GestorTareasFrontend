import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TareaDto } from '../../models/tarea.model/tarea.model';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarea-card',
  standalone: true,
  templateUrl: './tarea-card.component.html',
  styleUrl: './tarea-card.component.css',
})
export class TareaCard {
  operaciones = inject(TareaServiceTs);
  ruta = inject(ActivatedRoute);
  router = inject(Router);
  tareaSeleccionada: TareaDto | null = null;
  ngOnInit() {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.tareaSeleccionada = this.operaciones.tareas().find(tarea => tarea.id === id) || null;
  }
  onVolverAtras(){
    this.router.navigate(['/tareas']);
  }






}
