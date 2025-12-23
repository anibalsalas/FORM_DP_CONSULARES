import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioRol {
  usuarioUsu: string;
  idRol: number;
  codiDepeTde: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {
  private apiUrl = environment.api_url +'/api/usuario-roles';

  constructor(private http: HttpClient) {}

  listarAsignaciones(): Observable<UsuarioRol[]> {
    return this.http.get<UsuarioRol[]>(this.apiUrl);
  }

  asignarRol(asignacion: UsuarioRol): Observable<UsuarioRol> {
    return this.http.post<UsuarioRol>(this.apiUrl, asignacion);
  }

  eliminarAsignacion(usuarioUsu: string, idRol: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?usuarioUsu=${usuarioUsu}&idRol=${idRol}`);
  }

    obtenerDatosUsuario(): Observable<UsuarioRol> {
    return this.http.get<UsuarioRol>(`${this.apiUrl}/datos`);
  }

 

}
