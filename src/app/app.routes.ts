import { Routes } from '@angular/router';
import { Login } from './components/login/login.component';
import { DashboardLayout } from './components/dashboard-layout/dashboard-layout.component';
import { TareaList } from './components/tarea-list/tarea-list.component';
import { TareaCard } from './components/tarea-card/tarea-card.component';
import { TareaFormComponent } from './components/tarea-form/tarea-form.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

export const routes: Routes = [
  // 1. Redirección inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. Ruta publica (Pantalla completa)
  { path: 'login', component: Login },

  // 3. Rutas privadas protegidas por el Layout (Comparten Header y Navbar)
  {
    path: '',
    component: DashboardLayout,
    // canActivate: [
    //   AuthGuard
    // ],
    // Rutas hijas que se mostrarán dentro del DashboardLayout
    children: [
      { path: 'tareas', component: TareaList },
      { path: 'completadas', component: TareaList },
      { path: 'pendientes', component: TareaList },
      { path: 'categorias', component: TareaList },
      { path: 'prioridades', component: TareaList },
      { path: 'hoy', component: TareaList },
      { path: 'editar-perfil', component: UsuarioFormComponent },
      // Cuando crees los componentes de perfil y configuracion, los cambias aquia
      // Cuando crees los componentes de perfil y configuración, los cambias aquí:
      { path: 'configuracion', component: TareaList },
      { path: 'perfil', component: TareaList },
    ],
  },

  // 4. Comodín de seguridad
  { path: '**', redirectTo: 'login' },
];