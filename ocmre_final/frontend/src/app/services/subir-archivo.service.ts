import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ← Ajusta la ruta si es necesario
import { ArchivoAdjunto } from '../admin/ficha1/subir-archivo/subir-archivo.component';

export interface SubirArchivoResponse {
  mensaje: string;
  estado: string;
  archivos: ArchivoAdjunto[];
}

export interface EliminarArchivoResponse {
  mensaje: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  private readonly http = inject(HttpClient);
  //private readonly baseUrl = `${environment.apiUrl}`;
  private baseUrl = environment.api_url +'/api/ficha1'; // URL base del backend

  /**
   * Subir archivos al servidor
   */
  subirArchivos(archivos: File[], idFicha: number, idInputFile: string): Observable<SubirArchivoResponse> {
    const formData = new FormData();
    
    // Agregar archivos
    archivos.forEach((archivo) => {
      formData.append('archivo_adjunto', archivo);
    });
    
    // Agregar parámetros
    formData.append('id_ficha', idFicha.toString());
    formData.append('id_input_file', idInputFile);

    return this.http.post<SubirArchivoResponse>(`${this.baseUrl}/adjuntar-archivo`, formData);
  }

  /**
   * Listar archivos por idFicha e idInputFile
   */
  listarArchivos(idFicha: number, idInputFile: string): Observable<ArchivoAdjunto[]> {
    const params = new HttpParams()
      .set('id_ficha', idFicha.toString())
      .set('id_input_file', idInputFile);

    return this.http.get<ArchivoAdjunto[]>(`${this.baseUrl}/archivo/listar`, { params });
  }

  /**
   * Eliminar archivo por ID
   */
  eliminarArchivo(id: number): Observable<EliminarArchivoResponse> {
    return this.http.delete<EliminarArchivoResponse>(`${this.baseUrl}/archivo/eliminar/${id}`);
  }

  /**
   * Descargar archivo por ID
   */
  descargarArchivo(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/archivo/descargar/${id}`, {
      responseType: 'blob'
    });
  }

  /**
   * Listar fichas de sección 1 (si necesitas el listado de fichas)
   */
  listarFichasSeccion1(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/seccion1/listar`);
  }
}