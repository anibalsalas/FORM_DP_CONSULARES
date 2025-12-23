import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Rol, RolService } from '../../services/rol.service';
import { UsuarioRol, UsuarioRolService } from '../../services/usuario-rol.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule,
    MatFormFieldModule, // Para <mat-form-field> y <mat-label>
    MatInputModule,     // Para <input matInput>
    MatIconModule,      // Para <mat-icon>
    MatButtonModule,    // Para botones con Angular Material
    MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule   // Si usas tablas en la plantilla
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  dataSource!: MatTableDataSource<Rol>;
  displayedColumns: string[] = ['idRol', 'nombre', 'descripcion', 'acciones'];

  asignaciones: UsuarioRol[] = [];
  rolForm: FormGroup;
  asignacionForm: FormGroup;

  @ViewChild('paginatorRoles') paginator!: MatPaginator;
  @ViewChild('paginatorAsignaciones') paginatorAsignaciones!: MatPaginator;
  
  @ViewChild('sortRoles') sort!: MatSort;
  @ViewChild('sortAsignaciones') sortAsignaciones!: MatSort;
  

  constructor(
    private rolService: RolService,
    private usuarioRolService: UsuarioRolService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.rolForm = this.fb.group({
      idRol: ['', [
       
        Validators.pattern('^[0-9]+$'),      
        Validators.maxLength(5)
      ]],
      nombre: ['', [
        Validators.required,
        Validators.pattern('^[A-ZÑÁÉÍÓÚ _]+$'), 
        Validators.maxLength(200)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.pattern('^[A-ZÑÁÉÍÓÚ ]+$'),  
        Validators.maxLength(500)
      ]]
    });

    this.asignacionForm = this.fb.group({
      usuarioUsu: ['', Validators.required],
      idRol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarAsignaciones();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  cargarRoles(): void {
    this.rolService.listarRoles().subscribe((data) => {
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  crearRol(): void {
    if (this.rolForm.valid) {
      this.rolService.crearRol(this.rolForm.value).subscribe(() => {
        this.cargarRoles();
        this.rolForm.reset();

        this.snackBar.open('✅ Registro guardado exitosamente', 'Cerrar', {
          duration: 3000,               // 3 segundos
          horizontalPosition: 'right',  // A la derecha
          verticalPosition: 'top',      // Arriba
          panelClass: ['snackbar-success'] // Clase CSS personalizada opcional
        });
      }, error => {
        this.snackBar.open('❌ Error al guardar el registro', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'] // Clase CSS para error
        });
      });
    }
  }
  
  
 dataSourceAsignaciones!: MatTableDataSource<UsuarioRol>;
 displayedColumnsAsignaciones: string[] = ['usuarioUsu', 'idRol', 'acciones'];


 cargarAsignaciones(): void {
   this.usuarioRolService.listarAsignaciones().subscribe((data) => {
     this.asignaciones = data;
     this.dataSourceAsignaciones = new MatTableDataSource(this.asignaciones);
     this.dataSourceAsignaciones.paginator = this.paginatorAsignaciones;
     this.dataSourceAsignaciones.sort = this.sortAsignaciones;
   });
   
 }

 applyFilterAsignaciones(event: Event): void {
   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
   this.dataSourceAsignaciones.filter = filterValue;
 }


 toUpperCase(controlName: string): void {
  const control = this.rolForm.get(controlName);
  if (control) {
    const value = control.value?.toUpperCase() || '';
    control.setValue(value, { emitEvent: false });
  }
}

onNumberInput(event: any): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, ''); // Elimina cualquier cosa que no sea número
  this.rolForm.get('idRol')?.setValue(input.value);
}

  asignarRol(): void {
    if (this.asignacionForm.valid) {
      this.usuarioRolService.asignarRol(this.asignacionForm.value).subscribe(() => {
        this.cargarAsignaciones();
        this.asignacionForm.reset();
      });
    }
  }

  eliminarAsignacion(usuarioUsu: string, idRol: number): void {
    this.usuarioRolService.eliminarAsignacion(usuarioUsu, idRol).subscribe(() => {
      this.cargarAsignaciones();
    });
  }

  // 🚀 👇 Aquí es donde debes agregar los métodos de editar y eliminar rol:
  editarRol(rol: Rol): void {
    // Aquí puedes abrir un dialog para editar si quieres
    console.log('Editar rol:', rol);
  }

  eliminarRol(rol: Rol): void {
    if (confirm(`¿Seguro que deseas eliminar el rol ${rol.nombre}?`)) {
      this.rolService.eliminarRol(rol.idRol).subscribe(() => {
        this.cargarRoles();
      });
    }
  }


  // Método para permitir solo letras y espacios (con mayúsculas)
onNombreInput(): void {
  const control = this.rolForm.get('nombre');
  if (control) {
    const value = control.value || '';
    const filteredValue = value
      .toUpperCase()
      .replace(/[^A-ZÑÁÉÍÓÚ _]/g, '');  // ✅ Solo letras y espacios
    control.setValue(filteredValue, { emitEvent: false });
  }
}

onDescripcionInput(): void {
  const control = this.rolForm.get('descripcion');
  if (control) {
    const value = control.value || '';
    const filteredValue = value
      .toUpperCase()
      .replace(/[^A-ZÑÁÉÍÓÚ ]/g, '');  // ✅ Solo letras y espacios
    control.setValue(filteredValue, { emitEvent: false });
  }
}
}
