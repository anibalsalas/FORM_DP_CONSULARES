// import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule, MatTableDataSource } from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Ficha1Service } from './ficha1.service';
// import { FichaEntity } from '../../models/ficha.model';
// import { Router, RouterModule } from '@angular/router';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { AuthService } from '../../services/auth.service';
// import { MatSelectModule } from '@angular/material/select';
// import Swal from 'sweetalert2';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-ficha1',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatSnackBarModule,
//     RouterModule,
//     MatExpansionModule,
//     MatSelectModule,
//   ],
//   templateUrl: './ficha1.component.html',
//   styleUrls: ['./ficha1.component.scss'],
//   encapsulation: ViewEncapsulation.None ,

// })
// export class Ficha1Component implements OnInit {
//   displayedColumns: string[] = [
//     'idFicha',
//     'codUnico',
//     'estado',
//     'validacion',
//     'entidadPais',
//     'entidadProvincia',
//     'entidadDistrito',
//     'entidadNombre',
//    // 'nomUnidad',
//     'acciones',
//   ];
//   dataSource = new MatTableDataSource<FichaEntity>();

//   roles: string[] = [];

//   fichaForm: FormGroup; // Formulario reactivo para registrar/editar fichas
//   ficha: FichaEntity[] = []; // Lista de fichas asignadas
//   isEditing: boolean = false; // Bandera para saber si estamos editando

//   pageSizeOptions: number[] = [5, 10, 20, 50];
//   defaultPageSize: number = 20;
  
//   filtroEstado: string = '';
//   filtroRegion: string = '';
//   regionesUnicas: string[] = [];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(
//     private fichaService: Ficha1Service,
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     // Inicialización del formulario reactivo
//     this.fichaForm = this.fb.group({
//      // idFicha: [null], // Campo opcional para edición
//       idFicha: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
//       codUnico: ['', [Validators.required, Validators.maxLength(20)]],
//       entidadNombre: ['', [Validators.required, Validators.maxLength(500)]],
//      // nomUnidad: ['', [Validators.required, Validators.maxLength(500)]],
//       estado: ['', [Validators.required, Validators.maxLength(1)]],
//       entidadPais: ['', [Validators.required, Validators.maxLength(100)]],
//       entidadProvincia: ['', [Validators.required, Validators.maxLength(100)]],
//       entidadDistrito: ['', [Validators.required, Validators.maxLength(100)]],

 
//     });
//   }



// aplicarFiltros(): void {
//   this.dataSource.filterPredicate = (data: FichaEntity, filter: string): boolean => {
//     const estadoCoincide = this.filtroEstado ? data.estado === this.filtroEstado : true;
//     const regionCoincide = this.filtroRegion ? data.entidadPais === this.filtroRegion : true;
//     return estadoCoincide && regionCoincide;
//   };

//   this.dataSource.filter = `${this.filtroEstado}-${this.filtroRegion}`;
//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }

//   hasRole(role: string): boolean {
//     return this.roles.includes(role);
//   }

// tieneRolEspecialista(): boolean {
//   return this.authService.getRoles().includes('ESPECIALISTA');
// }




// async onEliminarFicha(ficha: FichaEntity): Promise<void> {
//   const result = await Swal.fire({
//     title: 'Eliminar ficha',
//     html: `
//       <div class="text-start">
//         <p class="mb-2">Por favor, registra la observación de eliminación:</p>
//       </div>
//     `,
//     input: 'textarea',
//     inputLabel: 'Observación (obligatoria)',
//     inputPlaceholder: 'Describe el motivo...',
//     inputAttributes: { maxlength: '500' },
//     showCancelButton: true,
//     confirmButtonText: 'Eliminar',
//     cancelButtonText: 'Cancelar',
//     confirmButtonColor: '#d33',
//     preConfirm: (value) => {
//       const v = (value || '').trim();
//       if (v.length < 5) {
//         Swal.showValidationMessage('Escribe al menos 5 caracteres.');
//         return false;
//       }
//       return v;
//     }
//   });

//   if (!result.isConfirmed) return;

//   const observacion = (result.value as string).trim(); //// GUARDO EN MEMORIA LA OBSERVACION

//   Swal.fire({
//     title: 'Eliminando...',
//     allowOutsideClick: false,
//     backdrop: 'rgba(0,0,0,0.4)',
//     didOpen: () => Swal.showLoading()
//   });

//   try {
//     await firstValueFrom(this.fichaService.darBajaFicha(ficha.idFicha, observacion)); //// ENVÍO AL BACKEND LA OBSERVACIÓN
//     Swal.close();

//     this.cargarFichas();

//       Swal.fire({
//         icon: 'success',
//         title: 'Ficha eliminada correctamente',
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 2500,
//         timerProgressBar: true
//       });
//   } catch (e) {
//     Swal.close();
//     this.snackBar.open('Error al eliminar la ficha', 'Cerrar', {
//       duration: 3000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//       panelClass: ['snackbar-error'],
//     });
//   }
// }


// cargarFichas(): void {
//   this.fichaService.listarFichas().subscribe({
//     next: (fichas) => {
//       // Oculta las que están dadas de baja (estadoRegistro = 'X')
//       const activas = fichas.filter(f => (f as any).estadoRegistro !== 'X');

//       this.dataSource.data = activas;
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;

//       this.regionesUnicas = [
//         ...new Set(
//           activas
//             .map(f => f.entidadPais)
//             .filter((r): r is string => !!r)
//         )
//       ].sort();
//     },
//     error: () => {
//       this.snackBar.open('Error al cargar las fichas', 'Cerrar', {
//         duration: 3000,
//         horizontalPosition: 'right',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-error'],
//       });
//     },
//   });
// }


//   ngOnInit(): void {
//     this.cargarFichas();
//     this.roles = this.authService.getRoles(); 
//   }



//   applyFilter(event: Event): void {
//     const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
//     this.dataSource.filter = filterValue;

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }


//   selectedRowIndex: number | null = null;

//   onRowClicked(row: any) {
//     this.selectedRowIndex = row.idFicha;
//   }



//   registrarFicha(): void {
//     if (this.fichaForm.valid) {
//       this.fichaService.registrarFicha(this.fichaForm.value).subscribe({
//         next: () => {
//           this.cargarFichas();
//           this.fichaForm.reset();
//           this.snackBar.open('Ficha registrada correctamente', 'Cerrar', {
//             duration: 3000,
//             horizontalPosition: 'right',
//             verticalPosition: 'top',
//             panelClass: ['snackbar-success'],
//           });
//         },
//         error: () => {
//           this.snackBar.open('Error al registrar la ficha', 'Cerrar', {
//             duration: 3000,
//             horizontalPosition: 'right',
//             verticalPosition: 'top',
//             panelClass: ['snackbar-error'],
//           });
//         },
//       });
//     }
//   }

// editarFicha(ficha: FichaEntity): void {
//   localStorage.removeItem('idFichaPantbc');
//   localStorage.removeItem('fichaPantbc');

//   localStorage.setItem('idFichaPantbc', ficha.idFicha.toString());
//   localStorage.setItem('fichaPantbc', JSON.stringify(ficha));

//   for (let i = 1; i <= 10; i++) {
//     localStorage.removeItem(`pantbc_s${i}`);
//   }
//   localStorage.removeItem('pantbc_completadas');

//     this.router.navigate(['/dashboard/ficha1/registrar', ficha.idFicha]); 

// }



//   limpiarFichaPantbc(): void {
//     localStorage.removeItem('fichaPantbc');
//     localStorage.removeItem('idFichaPantbc');
//     localStorage.removeItem('pantbc_secciones');
//     localStorage.removeItem('pantbc_s1'); 
//   }



//   getEstadoFichaVisual(estado: 'C' | 'I' | null): { texto: string, clase: string } {
//   switch (estado) {
//     case 'C':
//       return { texto: 'Ficha completa', clase: 'badge bg-success' };
//     case 'I':
//       return { texto: 'Ficha en Proceso', clase: 'badge bg-warning text-dark' };
//     default:
//       return { texto: 'Sin estado', clase: 'badge bg-secondary' };
//   }
// }



// getFlagValidarVisual(flag: any) {
//   const flagStr = flag?.toString();  
//   switch (flagStr) {
//     case '1':
//       return { clase: 'bg-success text-white', texto: 'Validada' };
//     default:
//       return { clase: 'bg-secondary text-white', texto: 'No validada' };
//   }
// }


//   eliminarFicha(idFicha: number): void {
//     if (confirm('¿Estás seguro de que deseas eliminar esta ficha?')) {
//       this.fichaService.eliminarFicha(idFicha).subscribe({
//         next: () => {
//           this.cargarFichas();
//           this.snackBar.open('Ficha eliminada correctamente', 'Cerrar', {
//             duration: 3000,
//             horizontalPosition: 'right',
//             verticalPosition: 'top',
//             panelClass: ['snackbar-success'],
//           });
//         },
//         error: () => {
//           this.snackBar.open('Error al eliminar la ficha', 'Cerrar', {
//             duration: 3000,
//             horizontalPosition: 'right',
//             verticalPosition: 'top',
//             panelClass: ['snackbar-error'],
//           });
//         },
//       });
//     }
//   }
// }




import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { debounceTime, distinctUntilChanged, startWith, combineLatest, firstValueFrom } from 'rxjs';

import { Ficha1Service } from './ficha1.service';
import { FichaEntity } from '../../models/ficha.model';
// import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-ficha1',
  standalone: true,
  templateUrl: './ficha1.component.html',
  styleUrls: ['./ficha1.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    // Material
    MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule,
    MatSelectModule, MatChipsModule, MatTooltipModule, MatMenuModule, MatProgressBarModule,
    MatDatepickerModule,  // ← necesario para datepicker
    MatNativeDateModule,  // ← adaptador nativo de fechas
    MatAutocompleteModule
  ]
})
export class Ficha1Component {
  esExterno = false; 
  esEspecialista = false;
  esAdmin = false;
  rolEspecialista = environment.rolEspecialista;
  rolAdministrador = environment.rolAdministrador;
  
  onNuevaFichaClick = (): void => {
    // Limpieza de estado previo
    const keys = [
      'fichaPantbc',
      'idFichaPantbc',
      'pantbc_secciones',
      'pantbc_completadas',
      'pantbc_s1','pantbc_s2','pantbc_s3','pantbc_s4','pantbc_s5',
      'pantbc_s6','pantbc_s7','pantbc_s8','pantbc_s9','pantbc_s10'
    ];
    keys.forEach(k => localStorage.removeItem(k));
  };


  // ====== Tabla ======
  displayedColumns = [
    'idFicha', 'codUnico', 'validacion', 'estado',
    'entidadPais', 'entidadLugares',
    'entidadNombre', 'acciones'
  ] as const;

  dataSource = new MatTableDataSource<FichaEntity>([]);
  loading = false;

  // ====== Filtros reactivos ======
  searchCtrl = new FormControl<string>('', { nonNullable: true });
  estadoCtrl  = new FormControl<string>('', { nonNullable: true });            // '' | 'C' | 'I'
  regionCtrl  = new FormControl<string[]>([], { nonNullable: true });          // múltiples regiones

  regionesUnicas: string[] = [];
  //roles: string[] = this.authService.getRoles();
  roles: string[] = [];
  // Mapeos visuales (pill)
  mapEstado: Record<string, { label: string; class: string }> = {
    C: { label: 'Completa',   class: 'pill--success' },
    I: { label: 'En proceso', class: 'pill--warn' }
  };

  mapValidacion: Record<string, { label: string; class: string }> = {
    '1': { label: 'Validada',   class: 'pill--success' },
    '0': { label: 'No validada', class: 'pill--neutral' }
  };

  // paginator/sort con setters para que funcionen aunque el ViewChild llegue después
  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { if (p) this.dataSource.paginator = p; }
  @ViewChild(MatSort) set sort(s: MatSort) { if (s) this.dataSource.sort = s; }

  constructor(
    private fichaService: Ficha1Service,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    // 1) ÚNICO PREDICADO DE FILTRO
    this.dataSource.filterPredicate = (row, json) => {
      const f = JSON.parse(json) as { q: string; estado: string; regiones: string[] };
      const toTxt = (v: unknown) => (v ?? '').toString().toLowerCase();

      const matchText =
        !f.q ||
        toTxt(row.entidadNombre).includes(f.q) ||
        toTxt(row.codUnico).includes(f.q)     ||
        toTxt(row.entidadPais).includes(f.q) ||
        String(row.idFicha).includes(f.q);

      const matchEstado = !f.estado || row.estado === f.estado;
      const matchRegion = !f.regiones?.length || f.regiones.includes(row.entidadPais ?? '');

      return matchText && matchEstado && matchRegion;
    };

    // 2) COMBINA FILTROS CON DEBOUNCE
    combineLatest([
      this.searchCtrl.valueChanges.pipe(startWith(''), debounceTime(200), distinctUntilChanged()),
      this.estadoCtrl.valueChanges.pipe(startWith('')),
      this.regionCtrl.valueChanges.pipe(startWith([] as string[]))
    ]).subscribe(([q, estado, regiones]) => {
      this.dataSource.filter = JSON.stringify({ q: (q || '').toLowerCase(), estado, regiones });
      if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    });
  }

    get canVerRegistrar(): boolean {
    return !this.esExterno;
  }


  // ====== Ciclo de vida ======
  ngOnInit(): void {
     const roles = this.authService.getScopes() || [];
        this.esExterno = roles.some(r => r.toUpperCase().includes('EXTERNO'));
        this.esEspecialista = roles.some(r => r.toUpperCase().includes('ESPECIALISTA'));
        this.esAdmin = roles.some(r => r.toUpperCase().includes('ADMINISTRADOR'));


    this.roles = roles;

    this.cargarFichas();

  //   const roles = this.authService.getRoles() || [];
  }

  // ====== Data ======
  cargarFichas(): void {
    this.loading = true;
    this.fichaService.listarFichas().subscribe({
      next: (fichas) => {
        // Oculta dadas de baja (estadoRegistro = 'X')
        const activas = (fichas || []).filter(f => (f as any).estadoRegistro !== 'X');

        this.dataSource.data = activas;
        this.regionesUnicas = [...new Set(activas.map(f => f.entidadPais).filter(Boolean) as string[])].sort();

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al cargar las fichas', 'Cerrar', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['snackbar-error'],
        });
        this.cdr.markForCheck();
      }
    });
  }

  // ====== Acciones UI ======
  get tieneFiltrosActivos(): boolean {
    return !!this.searchCtrl.value || !!this.estadoCtrl.value || (this.regionCtrl.value?.length ?? 0) > 0;
  }

  resetFiltros(): void {
    this.searchCtrl.setValue('');
    this.estadoCtrl.setValue('');
    this.regionCtrl.setValue([]);
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  trackById = (_: number, row: FichaEntity) => row?.idFicha;

  editarFicha(row: FichaEntity): void {
    // Limpia estado previo y navega a edición
    localStorage.removeItem('idFichaPantbc');
    localStorage.removeItem('fichaPantbc');
    for (let i = 1; i <= 10; i++) localStorage.removeItem(`pantbc_s${i}`);
    localStorage.removeItem('pantbc_completadas');

    localStorage.setItem('idFichaPantbc', String(row.idFicha));
    localStorage.setItem('fichaPantbc', JSON.stringify(row));

    this.router.navigate(['/dashboard/ficha1/registrar', row.idFicha]);
  }

  verFicha(row: FichaEntity): void {
    // Si tienes una ruta de solo lectura, puedes navegar allí
    // this.router.navigate(['/dashboard/ficha1/ver', row.idFicha]);
    this.editarFicha(row); // por ahora reusa edición
  }

  async onEliminarFicha(ficha: FichaEntity): Promise<void> {
    const result = await Swal.fire({
      title: 'Eliminar ficha',
      html: `<div class="text-start"><p class="mb-2">Registra la observación de eliminación:</p></div>`,
      input: 'textarea',
      inputLabel: 'Observación (obligatoria)',
      inputPlaceholder: 'Describe el motivo...',
      inputAttributes: { maxlength: '500' },
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      preConfirm: (value) => {
        const v = (value || '').trim();
        if (v.length < 5) {
          Swal.showValidationMessage('Escribe al menos 5 caracteres.');
          return false;
        }
        return v;
      }
    });

    if (!result.isConfirmed) return;
    const observacion = (result.value as string).trim();

    Swal.fire({ title: 'Eliminando...', allowOutsideClick: false, backdrop: 'rgba(0,0,0,0.4)', didOpen: () => Swal.showLoading() });

    try {
      await firstValueFrom(this.fichaService.darBajaFicha(ficha.idFicha, observacion));
      Swal.close();
      this.cargarFichas();
      Swal.fire({ icon: 'success', title: 'Ficha eliminada correctamente', toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true });
    } catch {
      Swal.close();
      this.snackBar.open('Error al eliminar la ficha', 'Cerrar', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }
  }

  // Compatibilidad si quieres disparar la búsqueda desde (keyup)
  applyFilter(ev: Event) {
    const v = (ev.target as HTMLInputElement).value ?? '';
    this.searchCtrl.setValue(v);
  }
}
