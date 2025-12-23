import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  //imports: [CommonModule, MatCardModule],
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  constructor() {
    console.log('✅ UsuariosComponent cargado correctamente');
  }
}
