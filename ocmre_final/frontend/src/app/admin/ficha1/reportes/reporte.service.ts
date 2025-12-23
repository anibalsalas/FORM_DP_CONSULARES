// src/app/reportes/reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
// Ajusta la ruta según tu estructura real

@Injectable({ providedIn: 'root' })
export class ReporteService1 {
  /**
   * Si tu env usa environment.api_url, usa esa.
   * Si usa environment.apiUrl, cambia aquí.
   */
  private base = `${environment.api_url}/api/reportes`;

  constructor(private http: HttpClient) {}

  /** Descarga el XLSX global de la Sección 1 (sin filtros) */
  descargarS1ExcelGlobal(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.base}/seccion/1.xlsx`, {
      responseType: 'blob',
      observe: 'response'
    });
  }




  /** Descargar XLSX de una sección específica. Si no se pasa sección, usa el endpoint genérico */
  descargarSeccion1(section?: number): Observable<HttpResponse<Blob>> {
    const url = section ? `${this.base}/seccion/${section}.xlsx` : `${this.base}/seccion1.xlsx`;
    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob'
    });
  }



    descargarSeccion2(section?: number): Observable<HttpResponse<Blob>> {
    const url = section ? `${this.base}/seccion/${section}.xlsx` : `${this.base}/seccion2.xlsx`;
    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob'
    });
  }


     descargarSeccion3(section?: number): Observable<HttpResponse<Blob>> {
    const url = section ? `${this.base}/seccion/${section}.xlsx` : `${this.base}/seccion3.xlsx`;
    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob'
    });
  }


     descargarSeccion4(section?: number): Observable<HttpResponse<Blob>> {
    const url = section ? `${this.base}/seccion/${section}.xlsx` : `${this.base}/seccion4.xlsx`;
    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob'
    });
  }


}



