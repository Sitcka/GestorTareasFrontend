import { Component } from '@angular/core';
import { TareaCard } from '../tarea-card/tarea-card';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-tarea-list',
  imports: [TareaCard],
  templateUrl: './tarea-list.html',
  styleUrl: './tarea-list.css',
})
export class TareaList {}
