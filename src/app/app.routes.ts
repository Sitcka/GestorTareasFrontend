import { Routes } from '@angular/router';
import { TareaList } from './components/tarea-list/tarea-list';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareaList },
  { path: 'crear-tarea', component: TareaList },
  { path: 'completadas', component: TareaList },
  { path: 'pendientes', component: TareaList },
  { path: 'categorias', component: TareaList },
  { path: 'prioridades', component: TareaList },
  { path: 'hoy', component: TareaList },
  { path: 'proximas', component: TareaList },
  { path: 'configuracion', component: TareaList },
  { path: 'perfil', component: TareaList },
  { path: '**', redirectTo: 'tareas' }
];