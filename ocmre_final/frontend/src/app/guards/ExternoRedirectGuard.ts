import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta a AuthService sea correcta

@Injectable({
  providedIn: 'root'
})
export class ExternoRedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // 1. Obtener los roles del usuario logueado
    const roles = this.authService.getRoles();
    const esExterno = roles.includes('EXTERNO');

    // 2. Si el usuario es EXTERN, lo redirigimos a la ruta de registro
    if (esExterno) {
      console.log('Usuario externo detectado. Redirigiendo automáticamente a la ruta de registro.');
      return this.router.createUrlTree(['/dashboard/ficha1/']);
    }

    // 3. Si el usuario NO es externo (es COMISIONADO, ESPECIALISTA, etc.), permite el acceso al listado.
    return true;
  }
}
