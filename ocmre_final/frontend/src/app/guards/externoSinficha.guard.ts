// import { Router } from "express";
// import { Ficha1Service } from "../admin/ficha1/ficha1.service";
// import { AuthService } from "../services/auth.service";
// import { CanActivate } from "@angular/router";
// import { Injectable } from "@angular/core";
// import { catchError, map, Observable, of } from "rxjs";

// @Injectable({ providedIn: 'root' })
// export class ExternoSinFichaGuard implements CanActivate {
//   constructor(
//     private auth: AuthService,
//     private ficha1: Ficha1Service,
//     private router: Router
//   ) {}

  

//   canActivate(): Observable<boolean> {
//     const esExterno = (this.auth.getRoles() || []).includes('EXTERNO');
//     if (!esExterno) return of(true);

//     return this.ficha1.existeFichaDelUsuario().pipe(
//       map(existe => {
//         if (existe) { this.router.navigate(['/dashboard/ficha1']); return false; }
//         return true;
//       }),
//       catchError(() => of(true))
//     );
//   }
// }
