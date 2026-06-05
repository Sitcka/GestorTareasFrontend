import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterLink } from '@angular/router';
import { AuthServiceTs } from '../../services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  email: string = "";
  password: string = "";
  nombre: string = "";
  modoRegistro: boolean = false;
  mensajeError: string = "";
  mensajeExito: string = "";

  constructor(private authService: AuthServiceTs, private router: Router) {}

  toggleModo(): void {
    this.modoRegistro = !this.modoRegistro;
    this.limpiarMensajes();
  }

  async onSubmit(): Promise<void> {
    this.limpiarMensajes();

    if (this.modoRegistro) {
      await this.registrar();
    } else {
      await this.login();
    }
  }

  private async registrar(): Promise<void> {
    const resultado = await this.authService.registrarUsuario(this.nombre, this.email);

    if (resultado.success) {
      this.mensajeExito = resultado.message;
      this.limpiarFormulario();
      setTimeout(() => {
        this.router.navigate(['/tareas']);
      }, 500);
    } else {
      this.mensajeError = resultado.message;
    }
  }

  private async login(): Promise<void> {
    const resultado = await this.authService.login(this.email, this.password);

    if (resultado.success) {
      this.mensajeExito = resultado.message;
      this.limpiarFormulario();
      setTimeout(() => {
        this.router.navigate(['/tareas']);
      }, 1000);
    } else {
      this.mensajeError = resultado.message;
    }
  }

  private limpiarFormulario(): void {
    this.email = "";
    this.password = "";
    this.nombre = "";
  }

  private limpiarMensajes(): void {
    this.mensajeError = "";
    this.mensajeExito = "";
  }
}
