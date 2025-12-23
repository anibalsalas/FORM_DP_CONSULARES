import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
// import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const expectedRoles = route.data['roles'] as string[] || [];  //  Lee los roles esperados
    const userRoles = this.authService.getScopes();               // Obtiene los roles del JWT

    if (!isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }

    if (expectedRoles.length === 0) {
      return true;  //  Si no hay roles esperados, deja entrar
    }

    const hasRole = userRoles.some(role => expectedRoles.includes(role));

    if (!hasRole) {
      this.router.navigate(['/unauthorized']);  // 🚫 Si no tiene el rol, redirige a unauthorized
      return false;
    }

    return true;  // Si está logueado y tiene el rol, permite el acceso
  }
}
