import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UsuarioDto } from '../../models/usuario.model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceTs {
  private readonly baseUrl = 'http://localhost:5097/api/Usuarios';
  private _usuarioAutenticado = signal<UsuarioDto | null>(null);

  public readonly usuarioAutenticado = this._usuarioAutenticado.asReadonly();

  constructor(private http: HttpClient) {}

  async registrarUsuario(nombre: string, email: string): Promise<{ success: boolean; message: string }> {
    try {
      const usuarioCreado = await firstValueFrom(
        this.http.post<UsuarioDto>(this.baseUrl, {
          nombre,
          email,
          esAdmin: false,
        })
      );

      this._usuarioAutenticado.set(usuarioCreado);
      return { success: true, message: 'Usuario creado correctamente' };
    } catch (error) {
      console.error('Error al crear usuario', error);

      if (error instanceof HttpErrorResponse) {
        const detalle = error.error?.message || error.error?.title || error.message;
        return { success: false, message: detalle || 'Error al crear usuario' };
      }

      return { success: false, message: 'Error al crear usuario' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const usuarios = await this.obtenerTodosUsuarios();
      const usuario = usuarios.find(
        (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
      );

      if (!usuario) {
        return { success: false, message: 'Email no encontrado' };
      }

      this._usuarioAutenticado.set(usuario);
      return { success: true, message: 'Login exitoso' };
    } catch (error) {
      return { success: false, message: 'Error al obtener usuarios' };
    }
  }

  logout(): void {
    this._usuarioAutenticado.set(null);
  }

  obtenerUsuarioAutenticado(): UsuarioDto | null {
    return this._usuarioAutenticado();
  }

  estaAutenticado(): boolean {
    return this._usuarioAutenticado() !== null;
  }

  async obtenerTodosUsuarios(): Promise<UsuarioDto[]> {
    return await firstValueFrom(this.http.get<UsuarioDto[]>(this.baseUrl));
  }

  async actualizarUsuario(usuarioActualizado: UsuarioDto): Promise<{ success: boolean; message: string }> {
    try {
      const dto = {
        nombre: usuarioActualizado.nombre,
        email: usuarioActualizado.email,
        esAdmin: usuarioActualizado.esAdmin,
      };

      const url = `${this.baseUrl}/${usuarioActualizado.id}`;
      const usuario = await firstValueFrom(this.http.put<UsuarioDto>(url, dto));

      this._usuarioAutenticado.set(usuario);
      return { success: true, message: 'Usuario actualizado correctamente' };
    } catch (error) {
      return { success: false, message: 'Error al actualizar usuario' };
    }
  }
}
