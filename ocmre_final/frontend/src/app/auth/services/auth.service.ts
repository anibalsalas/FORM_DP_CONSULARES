import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppInfo, CredencialResul, CuentaBasico, ObtenerTokenComand, RutasAcceso, UrlLogin } from '../interfaces/auth.interface';
import { TokensService } from './tokens.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Tokens } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private apiUrlAuth = environment.apiUrlAuth;
  private http = inject(HttpClient);
  private tokensService = inject(TokensService);
  private router = inject(Router);

  cuentaBasico() {
    const api = this.apiUrlAuth+'cuenta/basico';
    return this.http.get<CuentaBasico>(api);
  }

  urlLogin(client: string = environment.client) {
    let continuar = environment.continuar;
    let urlSso = environment.urlSso;
    let data = {'client': client,
      'continuar': continuar,
      'url_sso': urlSso};
    let url = this.apiUrlAuth+'auth/url_login';
    return this.http.post<UrlLogin>(url, data);
  }

  obtenerCredencial(comand: ObtenerTokenComand) {
    let url = this.apiUrlAuth+'auth/obtener-credencial';
    return this.http.post<CredencialResul>(url, comand);
  }

  setearTokens(creden: CredencialResul){
    this.tokensService.setTokens(creden.access_token, creden.refresh_token);
  }

  rutasAcceso() {
    let url = this.apiUrlAuth+'servidores/rutas_acceso';
    return this.http.get<RutasAcceso>(url);
  }

  infoApp(client: string = environment.client) {
    let url = this.apiUrlAuth+'aplicaciones/info_app?client='+client;
    return this.http.get<AppInfo>(url);
  }

  removeTokens(): void {
    this.tokensService.removeTokens();
  }

  signOff() {
    let url =  this.apiUrlAuth+'auth/sign_off';
    return this.http.post(url,null);
  }

  irAppAuth(): void {
    this.router.navigate(['/auth']);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(environment.varRefToken);
    return this.http.post<any>(`${this.apiUrlAuth}auth/refresh`, { refresh_token: refreshToken })
      .pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.access_token);
    }));
  }

  private storeJwtToken(access_token: string) {
    localStorage.setItem(environment.varToken, access_token);
  }

  getScopes(): string[] {
    const token = localStorage.getItem(environment.varToken);
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      let rawScopes = payload.scope || [];
      if (typeof rawScopes === 'string') {
        rawScopes = rawScopes.split(' ');
      }
      const cleanedScopes = rawScopes.map((scope: string) =>
        scope.startsWith('ROLE_') ? scope.substring(5) : scope
      );
      return cleanedScopes;
    } catch (e) {
      console.error('Error parsing token payload:', e);
      return [];
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(environment.varToken);
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = payload.exp * 1000 < Date.now(); // Verifica si el token ha expirado
      return !isTokenExpired; // Retorna true si el token no ha expirado
    } catch (e) {
      console.error('Error parsing token payload:', e);
      return false; // Si el token es inválido, retorna false
    }
  }

  // getUsuarioLogueado(): string | null {
  //   const token = localStorage.getItem(environment.varToken);
  //   if (!token) return null;

  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.user?.nombre_completo?.trim() || null;
  //   } catch (e) {
  //     console.error('Error al obtener usuario del token:', e);
  //     return null;
  //   }
  // }

  irAppSso(): void {
    this.router.navigate(['/auth']);
  }

  getUsuarioLogueado(): string | null {
    const token = localStorage.getItem(environment.varToken);;
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.name?.trim() || null;
    } catch (e) {
      console.error('Error al obtener usuario del token:', e);
      return null;
    }
  }


  getCodUnicoUsuario(): string | null {
    return this.getUsuarioLogueado();
  }

}