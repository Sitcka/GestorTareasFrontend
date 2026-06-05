import {
  Component,
  inject,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TareaServiceTs } from '../../services/tarea.service/tarea.service';
import { AuthServiceTs } from '../../services/auth.service/auth.service';
import { TareaDto } from '../../models/tarea.model/tarea.model';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css',
})
export class TareaFormComponent implements OnInit, OnChanges {
  // FormBuilder no cambia el numero de instancias, solo te da una forma mas comoda de construir el mismo FormGroup y FormControl por debajo.
  // Entonces lo dejare con FormBuilder por facilidad, pero se podría hacer exactamente lo mismo sin FormBuilder.
  formularioInyeccion = inject(FormBuilder);
  operaciones = inject(TareaServiceTs);
  authService = inject(AuthServiceTs);

  // Si viene una tarea, el formulario funcionará en modo edición;
  // si no viene, funcionará en modo creación (como hasta ahora).
  @Input() tarea: TareaDto | null = null;

  @Output() formularioEnviado = new EventEmitter<void>();

  // En creación: true (se puede editar).
  // En edición: empieza en false (solo lectura) hasta pulsar "Editar".
  editMode = true;

  formulario: FormGroup = this.formularioInyeccion.group({
    titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    descripcion: ['', [Validators.minLength(50), Validators.maxLength(500)]],
    fechaLimite: ['', [Validators.required]],
    prioridad: ['1', [Validators.required, Validators.pattern('^(0|1|2)$')]],
    tipo: ['Simple', [Validators.required, Validators.pattern('^(Prioritaria|Recurrente|Simple)$')]],
    nivelUrgencia: [1, [Validators.min(1)]],
    intervaloDias: [1, [Validators.min(1)]],
  });

  ngOnInit(): void {
    if (this.tarea) {
      this.rellenarFormularioDesdeTarea();
      this.editMode = false; // detalle: solo lectura al inicio
      this.formulario.disable();
    } else {
      this.editMode = true; // creación: editable desde el inicio
      this.formulario.enable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarea']) {
      if (this.tarea) {
        this.rellenarFormularioDesdeTarea();
        this.editMode = false;
        this.formulario.disable();
      } else {
        this.editMode = true;
        this.formulario.enable();
      }
    }
  }

  private rellenarFormularioDesdeTarea(): void {
    this.formulario.patchValue({
      titulo: this.tarea?.titulo ?? '',
      descripcion: this.tarea?.descripcion ?? '',
      fechaLimite: this.tarea?.fechaLimite ?? '',
      prioridad: this.prioridadValor(this.tarea?.prioridad),
      tipo: this.tarea?.tipo ?? this.tarea?.tipoTarea ?? 'Simple',
      nivelUrgencia: this.tarea?.nivelUrgencia ?? 1,
      intervaloDias: this.tarea?.intervaloDias ?? 1,
    });
  }

  private prioridadValor(prioridad?: number | string): string {
    if (typeof prioridad === 'number') {
      return prioridad.toString();
    }

    switch (prioridad) {
      case 'Baja':
        return '0';
      case 'Media':
        return '1';
      case 'Alta':
        return '2';
      default:
        return '1';
    }
  }

  activarEdicion(): void {
    this.editMode = true;
    this.formulario.enable();
  }

  cancelarEdicionLocal(): void {
    if (this.tarea) {
      this.rellenarFormularioDesdeTarea();
      this.editMode = false;
      this.formulario.disable();
    } else {
      this.formulario.reset({
        titulo: '',
        descripcion: '',
        fechaLimite: '',
        prioridad: '1',
        tipo: 'Simple',
      });
    }
  }

  async onEnviarFormulario() {
    if (this.formulario.invalid) {
      console.log('Formulario no válido');
      this.formulario.markAllAsTouched();
      return;
    }

    const usuario = this.authService.obtenerUsuarioAutenticado();
    if (!usuario) {
      console.error('Debes iniciar sesión para crear una tarea');
      return;
    }

    const tareaDto: any = {
      titulo: this.formulario.value.titulo,
      descripcion: this.formulario.value.descripcion,
      fechaLimite: this.formulario.value.fechaLimite,
      prioridad: Number(this.formulario.value.prioridad),
      tipo: this.formulario.value.tipo,
      usuarioId: usuario.id,
    };

    if (this.formulario.value.tipo === 'Prioritaria') {
      tareaDto.nivelUrgencia = this.formulario.value.nivelUrgencia;
    }

    if (this.formulario.value.tipo === 'Recurrente') {
      tareaDto.intervaloDias = this.formulario.value.intervaloDias;
    }

    if (this.tarea) {
      const resultado = await this.operaciones.actualizarTarea(this.tarea.id, tareaDto);
      if (resultado.success) {
        this.editMode = false;
        this.formulario.disable();
      } else {
        console.error(resultado.message);
      }
    } else {
      const resultado = await this.operaciones.crearTarea(tareaDto);
      if (resultado.success) {
        this.formulario.reset({
          titulo: '',
          descripcion: '',
          fechaLimite: '',
          prioridad: '1',
          tipo: 'Simple',
        });
      } else {
        console.error(resultado.message);
      }
    }

    this.formularioEnviado.emit();
  }
}