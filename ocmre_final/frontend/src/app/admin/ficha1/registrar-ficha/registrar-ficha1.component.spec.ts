import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ficha1Service } from '../ficha1.service';

@Component({
  selector: 'app-registrar-ficha',
  templateUrl: './registrar-ficha.component.html',
  styleUrls: ['./registrar-ficha.component.scss'],
})
export class RegistrarFicha1Component {
  fichaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fichaService: Ficha1Service,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Inicialización del formulario reactivo
    this.fichaForm = this.fb.group({
      codUnico: ['', [Validators.required, Validators.maxLength(20)]],
      nomEntidad: ['', [Validators.required, Validators.maxLength(500)]],
      nomUnidad: ['', [Validators.required, Validators.maxLength(500)]],
      estado: ['', [Validators.required, Validators.maxLength(1)]],
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      distrito: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  registrarFicha(): void {
    if (this.fichaForm.valid) {
      this.fichaService.registrarFicha(this.fichaForm.value).subscribe({
        next: () => {
          this.snackBar.open('Ficha registrada correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/fichas']); // Redirige a la lista de fichas
        },
        error: () => {
          this.snackBar.open('Error al registrar la ficha', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
    }
  }
}