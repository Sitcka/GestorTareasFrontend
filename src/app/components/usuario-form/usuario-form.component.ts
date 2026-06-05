import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceTs } from '../../services/auth.service/auth.service';
import { UsuarioDto } from '../../models/usuario.model/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent implements OnInit {
  // Propiedades del formulario
  nombre: string = '';
  email: string = '';

  // Control de mensajes
  mensajeError: string = '';
  mensajeExito: string = '';

  // Usuario actual
  usuarioActual: UsuarioDto | null = null;

  constructor(
    private authService: AuthServiceTs,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Cargar datos del usuario actual
  private cargarDatos(): void {
    this.usuarioActual = this.authService.obtenerUsuarioAutenticado();

    if (!this.usuarioActual) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar datos en el formulario
    this.nombre = this.usuarioActual.nombre;
    this.email = this.usuarioActual.email;
  }

  // Guardar cambios del usuario
  guardarCambios(): void {
    this.limpiarMensajes();

    if (!this.nombre.trim()) {
      this.mensajeError = 'El nombre no puede estar vacio';
      return;
    }

    if (!this.email.trim()) {
      this.mensajeError = 'El email no puede estar vacio';
      return;
    }

    if (!this.usuarioActual) {
      this.router.navigate(['/login']);
      return;
    }

    const usuarioActualizado: UsuarioDto = {
      ...this.usuarioActual,
      nombre: this.nombre,
      email: this.email,
    };

    this.authService.actualizarUsuario(usuarioActualizado)
      .then(resultado => {
        if (resultado.success) {
          this.mensajeExito = resultado.message;

          // Navegamos un poco después, sin cambiar más el estado
          setTimeout(() => {
            this.router.navigate(['/tareas']);
          }, 1500);
        } else {
          this.mensajeError = resultado.message;
        }
      })
      .catch(() => {
        this.mensajeError = 'Error al actualizar usuario';
      });
  }

  // Cancelar
  cancelar(): void {
    this.router.navigate(['/tareas']);
  }

  // Limpiar formulario
  private limpiarFormulario(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  // Limpiar mensajes
  private limpiarMensajes(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
  }
}