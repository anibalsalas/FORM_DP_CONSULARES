// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly base = (environment.api_url || '').replace(/\/+$/, '');
  private readonly apiUrl = `${this.base}/api/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { usuarioUsu: string; passwordUsu: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(environment.varToken, res.token);

          this.router.navigate(['/dashboard/ficha']);

        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(environment.varToken)
    // return localStorage.getItem(environment.varToken);
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = payload.exp * 1000 < Date.now(); 
      return !isTokenExpired; 
    } catch (e) {
      console.error('Error parsing token payload:', e);
      return false; 
    }
  }
  
  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const rawRoles = payload.roles || [];

      if (rawRoles.length === 0) {
        return ['COMISIONADO'];
      }
 

      const cleanedRoles = rawRoles.map((role: string) =>
        role.startsWith('ROLE_') ? role.substring(5) : role
      );

    return cleanedRoles;
    
    } catch (e) {
      console.error('Error parsing token payload:', e);
      return [];
    }
  }
  
  

  // ✅ Función para redireccionar según los roles
  private redirectByRole(roles: string[]): void {
    if (roles.some(role => role.includes('COMISIONADO'))) {
      this.router.navigate(['/admin']);
    } else if (roles.some(role => role.includes('ESPECIALISTA'))) {
      this.router.navigate(['/especialista']);
    } else if (roles.some(role => role.includes('EXTERNO'))) {
      this.router.navigate(['/externo']);
    } else {
      this.logout();
    }
  }
  

  // ✅ Logout con limpieza del token y redirección al login
  logout(): void {
    localStorage.removeItem(environment.varToken);
    this.router.navigate(['/']);
  }



  getUsuarioLogueado(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub?.trim() || null;
  } catch (e) {
    console.error('Error al obtener usuario del token:', e);
    return null;
  }
}


  getCodUnicoUsuario(): string | null {
    return this.getUsuarioLogueado();
  }
  
}
