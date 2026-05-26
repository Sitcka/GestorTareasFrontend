import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from "@angular/common";
// Two-way binding Two-way binding sincroniza automáticamente un input de formulario con una propiedad de la clase en ambas direcciones. Se
// usa con [(ngModel)] y requiere importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = "";
  password: string = "";

  async onSubmit() : Promise<void>{
    //Aqui ira la llamada a la API en el dia 10
  }
}
