import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-unauthorized',
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card color="warn">
      <h2>🚫 Acceso no autorizado</h2>
      <p>No tienes permisos para acceder a esta sección.</p>
    </mat-card>
  `
})
export class UnauthorizedComponent {}
