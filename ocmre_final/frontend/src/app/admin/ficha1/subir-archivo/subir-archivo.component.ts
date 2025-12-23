import { Component, Input, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Ficha1Service } from '../ficha1.service';

export interface ArchivoAdjunto {
  id: number;
  nombreOriginal: string;
  rutaArchivo: string;
  tipoMime: string;
  tamanio: number;
  fechaSubida: string;
  idFicha: number;
  idInputFile: string;
}

@Component({
  selector: 'app-subir-archivo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.scss']
})
export class SubirArchivoComponent implements OnInit {

  @Input() idFicha!: number;
  @Input() codUnico!: string;
  @Input() idInputFile: string = 'arch';

  archivosSubidos: { 
    id: number;
    nombreOriginal: string;
    tipoMime: string;
    rutaArchivo: string;
  }[] = [];
  isLoading = false;
  uploadProgress = 0;

  public fichaService = inject(Ficha1Service);
  private cdr = inject(ChangeDetectorRef); 

  ngOnInit(): void {
    this.recargarListaArchivos();
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

    const inputElement = event.target;
    this.isLoading = true;
    this.uploadProgress = 0;

    this.fichaService.subirArchivos(formData).subscribe({
      next: (httpEvent: any) => {
        if (httpEvent.type === HttpEventType.UploadProgress) {
          if (httpEvent.total) {
            this.uploadProgress = Math.round(100 * httpEvent.loaded / httpEvent.total);
            console.log(`📊 Progreso de subida: ${this.uploadProgress}%`);
          }
        }
        else if (httpEvent.type === HttpEventType.Response) {
          console.log('✅ Archivo subido exitosamente:', httpEvent.body);
          
          this.isLoading = false;
          this.uploadProgress = 0;
          
          inputElement.value = '';
          
          Swal.fire({
            icon: 'success',
            title: 'Archivo(s) subido(s) correctamente',
            timer: 2000,
            showConfirmButton: false,
          });
          
  
          setTimeout(() => {
            this.recargarListaArchivos();
          }, 300);
        }
      },
      error: (error) => {
        console.error('❌ Error al subir archivo:', error);
        this.isLoading = false;
        this.uploadProgress = 0;
        inputElement.value = '';
        
        Swal.fire('Error', 'No se pudo subir el archivo.', 'error');
      }
    });
  }

  eliminarArchivo(archivo: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El archivo será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fichaService.eliminarArchivo(archivo.id).subscribe({
          next: () => {
            // Actualizar la lista localmente para respuesta inmediata
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
            
            // Recargar desde el servidor para asegurar sincronización
            setTimeout(() => this.recargarListaArchivos(), 500);
          },
          error: (error) => {
            console.error('Error al eliminar archivo:', error);
            Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error');
          }
        });
      }
    });
  }

  recargarListaArchivos() {
    if (!this.idFicha) {
      console.warn('No se puede recargar: idFicha no está definido');
      return;
    }
    
    console.log('🔄 Recargando lista de archivos...');
    
    this.fichaService.listarArchivos(this.idFicha).subscribe({
      next: (respuesta) => {
        console.log('📥 Respuesta del servidor:', respuesta);
        
        // Crear una nueva referencia del array para forzar la detección de cambios
        this.archivosSubidos = [...(respuesta || [])];
        
        console.log(`📋 Archivos cargados: ${this.archivosSubidos.length}`);
        console.log('📋 Lista actual:', this.archivosSubidos);
        
        // Forzar la detección de cambios manualmente
        this.cdr.detectChanges();
        
        // Verificación adicional
        console.log('✅ Vista actualizada - Total archivos en memoria:', this.archivosSubidos.length);
      },
      error: (error) => {
        console.error('Error al cargar archivos:', error);
        this.archivosSubidos = [];
        this.cdr.detectChanges();
      }
    });
  }

  descargarArchivo(archivo: any): void {
    if (!archivo || !archivo.id) {
      console.error("Archivo inválido o sin ID");
      Swal.fire('Error', 'No se pudo identificar el archivo a descargar.', 'error');
      return;
    }

    this.fichaService.descargarArchivoPorId(archivo.id).subscribe({
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