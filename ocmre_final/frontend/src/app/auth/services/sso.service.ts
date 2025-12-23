import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ValidarAuth } from '../interfaces/sso.interface';
import { TokensService } from './tokens.service';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Tokens } from '../interfaces/auth.interface';


@Injectable({ providedIn: 'root' })
export class SsoService {
  
  private apiUrlAuth = environment.apiUrlAuth;
  // private feUrlSSO = '';

  private http = inject(HttpClient);
  private tokensService = inject(TokensService);
  private router = inject(Router);

  autorizacion() {
    return this.http.get<ValidarAuth>(this.apiUrlAuth+'autorizacion');
  }

  irAppSso(): void {
    this.router.navigate(['/auth']);
    // console.warn("Ir a login");
    // window.location.href = this.feUrlSSO+"/";
  }

  irPerfil():void{
    // window.location.href = this.feUrlSSO+"/plataforma/perfil";
  }

  cerrarSession(){
    
  }

}