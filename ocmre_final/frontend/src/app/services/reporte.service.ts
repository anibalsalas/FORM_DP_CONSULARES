// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs';

// export interface ReporteDTO {
//   valueReporte: string;
//   nombreReporte: string;
//   tokenReporte: string;
// }

// @Injectable({ providedIn: 'root' })
// export class ReporteService {

//   private url = `${environment.api_url}/api/reportes/listar`;
//   constructor(private http: HttpClient) {}

//   obtenerReportes(): Observable<ReporteDTO[]> {
//     return this.http.get<ReporteDTO[]>(this.url);
//   }
// }
