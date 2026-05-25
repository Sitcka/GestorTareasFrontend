import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  // selector — el nombre de la etiqueta HTML del componente
  // en index.html se sustituye por este componente
  selector: 'app-root',
  // imports — otros componentes, directivas o pipes que usa la plantilla
  // Equivalente a los using de C#
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
  // NGModule — dependencias. Los NgModules han quedado obsoletos en
  // Angular 19, por lo que ya no se usan
})
export class App {
  protected readonly title = signal('gestor-tareas-frontend');
}
