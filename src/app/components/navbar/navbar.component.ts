import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceTs } from '../../services/auth.service/auth.service';
import { Signal } from '@angular/core';
import { UsuarioDto } from '../../models/usuario.model/usuario.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  usuarioActual!: Signal<UsuarioDto | null>;

  constructor(
    private authService: AuthServiceTs,
    private router: Router,
  ) {
    this.usuarioActual = this.authService.usuarioAutenticado;
  }

  // Ir a editar perfil
  irAEditarPerfil(): void {
    this.router.navigate(['/editar-perfil']);
  }

  // Logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}