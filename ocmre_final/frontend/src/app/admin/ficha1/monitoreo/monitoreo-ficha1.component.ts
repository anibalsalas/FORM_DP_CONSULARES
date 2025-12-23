import { Component, OnInit } from '@angular/core';
import { Ficha1Service } from '../ficha1.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-ficha1-region',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,     
    MatIconModule,      
    MatButtonModule,    
    MatCardModule,
    FormsModule,
    MatProgressBarModule, 
    MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule   // Si usas tablas en la plantilla
  ],
   templateUrl: './monitoreo-ficha1.component.html',
  styleUrls: ['./monitoreo-ficha1.component.scss'],
})

export class Ficha1MonitoreoComponent implements OnInit {
 resumenOriginal: any[] = [];
  resumenFiltrado: any[] = [];
  regionesUnicas: string[] = [];
  regionSeleccionada: string = '';


  displayedColumns = ['region', 'completas',  'faltanRegistrar', 'total', 'porcentajeAvance'];
  resumenData = new MatTableDataSource<any>();

  constructor(private fichaService: Ficha1Service) {}


  filtrarPorRegion(): void {
    if (!this.regionSeleccionada) {
      this.resumenFiltrado = [...this.resumenOriginal];
    } else {
      this.resumenFiltrado = this.resumenOriginal.filter(f => f.region === this.regionSeleccionada);
    }
  }

  getTotal(columna: 'completas' | 'faltanRegistrar' | 'total'): number {
    return this.resumenFiltrado.reduce((sum, row) => sum + (row[columna] || 0), 0);
  }
  
  ngOnInit(): void {
    this.fichaService.getResumenPorRegion().subscribe({
      next: (data) => {
        this.resumenOriginal = data;
        this.regionesUnicas = [...new Set(data.map((f: { region: any; }) => f.region).filter((r: null) => r != null))] as string[];
        this.filtrarPorRegion();
      },
      error: (err) => console.error('Error al cargar resumen:', err)
    });
  }
}
