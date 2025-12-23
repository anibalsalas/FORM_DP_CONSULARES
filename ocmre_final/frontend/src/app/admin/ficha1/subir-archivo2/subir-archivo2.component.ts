import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Ficha1Service } from '../ficha1.service';

@Component({
  selector: 'app-subir-archivo2',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './subir-archivo2.component.html',
  styleUrls: ['./subir-archivo2.component.scss']
})
export class SubirArchivoComponent2 implements OnInit {

  //@Input() id!: number;
  @Input() idFicha!: number;
  @Input() codUnico!: string;
  @Input() idInputFile: string = 's12_arch';

  @Output() archivoSubido = new EventEmitter<any>();
  @Output() archivoEliminado = new EventEmitter<void>();

  archivosSubidos: { 
     id: number;
    nombreOriginal: string;
    tipoMime: string;
    rutaArchivo: string;
  }[] = [];
  isLoading = false;

  public fichaService = inject(Ficha1Service);
  private cdr = inject(ChangeDetectorRef); 

  ngOnInit(): void {
    this.recargarListaArchivos2();
  }


  onFileSelected(event: any) {
  const files: File[] = Array.from(event.target.files);
  if (files.length === 0) return;

  if (!this.idFicha) {
    Swal.fire('Error', 'No se puede subir el archivo porque no se ha identificado la ficha principal.', 'error');
    return;
  }

  const formData = new FormData();
  files.forEach((file) => formData.append('archivo_adjunto', file));
  formData.append('id_ficha', this.idFicha.toString());

  this.isLoading = true;

  this.fichaService.subirArchivos2(formData).subscribe({
    next: (event: any) => {
      if (event.type === HttpEventType.Response) {
        this.isLoading = false;
        
        Swal.fire({
          icon: 'success',
          title: event.body?.mensaje || 'Cargado correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
        
        this.recargarListaArchivos2();
        
        // ✅ EMITIR EVENTO AL PADRE
        const archivoSubido = {
          nombre: files[0]?.name || 'archivo',
          id: event.body?.id || null
        };
        this.archivoSubido.emit(archivoSubido);
        console.log('📤 [SubirArchivo] Emitiendo evento archivoSubido:', archivoSubido);
      }
    },
    error: () => {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error al subir archivos',
        text: 'Verifica el formato o tamaño del archivo',
      });
    },
  });
}

  // onFileSelected(event: any) {
  //   const files: File[] = Array.from(event.target.files);
  //   if (files.length === 0) return;

  //    // Se añade una guarda para asegurar que tenemos el idFicha antes de subir.
  //   if (!this.idFicha) {
  //     Swal.fire('Error', 'No se puede subir el archivo porque no se ha identificado la ficha principal.', 'error');
  //     return;
  //   }


  //   const formData = new FormData();
  //   files.forEach((file) => formData.append('archivo_adjunto', file));
  //   formData.append('id_ficha', this.idFicha.toString());
   

  //   this.isLoading = true;

  //   this.fichaService.subirArchivos2(formData).subscribe({
  //     next: (event: any) => {
  //   if (event.type === HttpEventType.Response) {
  //     this.isLoading = false;
  //     Swal.fire({
  //       icon: 'success',
  //       title: event.body?.mensaje || 'Cargado correctamente',
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //     this.recargarListaArchivos2();
  //   }
  // },
  //     error: () => {
  //       this.isLoading = false;
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error al subir archivos',
  //         text: 'Verifica el formato o tamaño del archivo',
  //       });
  //     },
  //   });
  // }

 
    // eliminarArchivo2(archivo: any) {
    //   Swal.fire({
    //     title: '¿Estás seguro?',
    //     text: 'El archivo será eliminado permanentemente.',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Sí, eliminar',
    //     cancelButtonText: 'Cancelar'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.fichaService.eliminarArchivo2(archivo.id).subscribe({
    //         next: () => {
    //           // Actualizar la lista localmente para respuesta inmediata
    //           this.archivosSubidos = this.archivosSubidos.filter((a) => a.id !== archivo.id);
              
    //           // Forzar detección de cambios
    //           this.cdr.detectChanges();
              
    //           Swal.fire({
    //             icon: 'success',
    //             title: 'Eliminado',
    //             text: 'El archivo ha sido eliminado.',
    //             timer: 1500,
    //             showConfirmButton: false
    //           });
              
    //           // Recargar desde el servidor para asegurar sincronización
    //           setTimeout(() => this.recargarListaArchivos2(), 500);
    //         },
    //         error: (error) => {
    //           console.error('Error al eliminar archivo:', error);
    //           Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error');
    //         }
    //       });
    //     }
    //   });
    // }

  eliminarArchivo2(archivo: any) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'El archivo será eliminado permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.fichaService.eliminarArchivo2(archivo.id).subscribe({
        next: () => {
          // Actualizar la lista localmente
          this.archivosSubidos = this.archivosSubidos.filter((a) => a.id !== archivo.id);
          
          // Forzar detección de cambios
          this.cdr.detectChanges();
          
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El archivo ha sido eliminado.',
            timer: 1500,
            showConfirmButton: false
          });
          
          // ✅ EMITIR EVENTO AL PADRE
          this.archivoEliminado.emit();
          console.log('📤 [SubirArchivo] Emitiendo evento archivoEliminado');
          
          // Recargar desde el servidor
          setTimeout(() => this.recargarListaArchivos2(), 500);
        },
        error: (error) => {
          console.error('Error al eliminar archivo:', error);
          Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error');
        }
      });
    }
  });
}

  // recargarListaArchivos2() {
  //   if (!this.idFicha) {
  //     console.warn('No se puede recargar: idFicha no está definido');
  //     return;
  //   }
    
  //   console.log('🔄 Recargando lista de archivos...');
    
  //   this.fichaService.listarArchivos2(this.idFicha).subscribe({
  //     next: (respuesta) => {
  //       console.log('📥 Respuesta del servidor:', respuesta);
        
  //       // Crear una nueva referencia del array para forzar la detección de cambios
  //       this.archivosSubidos = [...(respuesta || [])];
        
  //       console.log(`📋 Archivos cargados: ${this.archivosSubidos.length}`);
  //       console.log('📋 Lista actual:', this.archivosSubidos);
        
  //       // Forzar la detección de cambios manualmente
  //       this.cdr.detectChanges();
        
  //       // Verificación adicional
  //       console.log('✅ Vista actualizada - Total archivos en memoria:', this.archivosSubidos.length);
  //     },
  //     error: (error) => {
  //       console.error('Error al cargar archivos:', error);
  //       this.archivosSubidos = [];
  //       this.cdr.detectChanges();
  //     }
  //   });
  // }


recargarListaArchivos2() {
  if (!this.idFicha) {
    console.warn('No se puede recargar: idFicha no está definido');
    return;
  }
  
  console.log('🔄 Recargando lista de archivos...');
  
  this.fichaService.listarArchivos2(this.idFicha).subscribe({
    next: (respuesta) => {
      console.log('📥 Respuesta del servidor:', respuesta);
      
      // Crear nueva referencia del array
      this.archivosSubidos = [...(respuesta || [])];
      
      console.log(`📋 Archivos cargados: ${this.archivosSubidos.length}`);
      
      // Forzar detección de cambios
      this.cdr.detectChanges();
      
      // ✅ SI HAY ARCHIVOS, EMITIR AL PADRE (para marcar como válido)
      if (this.archivosSubidos.length > 0) {
        const primerArchivo = {
          nombre: this.archivosSubidos[0].nombreOriginal,
          id: this.archivosSubidos[0].id
        };
        this.archivoSubido.emit(primerArchivo);
        console.log('📤 [SubirArchivo] Archivo existente detectado, emitiendo:', primerArchivo);
      } else {
        // ✅ SI NO HAY ARCHIVOS, EMITIR ELIMINADO
        this.archivoEliminado.emit();
        console.log('📤 [SubirArchivo] No hay archivos, emitiendo archivoEliminado');
      }
      
      console.log('✅ Vista actualizada - Total archivos:', this.archivosSubidos.length);
    },
    error: (error) => {
      console.error('Error al cargar archivos:', error);
      this.archivosSubidos = [];
      this.cdr.detectChanges();
      
      // ✅ ERROR AL CARGAR, EMITIR ELIMINADO
      this.archivoEliminado.emit();
    }
  });
}


descargarArchivo2(archivo: any): void {
    // CORRECCIÓN: Nos aseguramos de que el objeto 'archivo' y su 'id' existan.
    if (!archivo || !archivo.id) {
        console.error("Intento de descarga fallido: el objeto 'archivo' es inválido o no tiene un ID.");
        Swal.fire('Error', 'No se pudo identificar el archivo a descargar.', 'error');
        return;
    }
  
    // CORRECCIÓN: Se llama al servicio pasándole el ID del archivo específico, no el 'this.id' del componente.
    this.fichaService.descargarArchivo2PorId(archivo.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = archivo.nombreOriginal || `archivo_${archivo.id}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error) => {
        console.error('Error al descargar el archivo:', error);
        Swal.fire('Error', 'No se pudo descargar el archivo.', 'error');
      }
    });
  }



}
