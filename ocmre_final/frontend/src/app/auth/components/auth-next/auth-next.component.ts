import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ObtenerTokenComand } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { PkceService } from '../../services/pkce.service';
// import * as moment from 'moment';

@Component({
  selector: 'app-auth-next',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-next.component.html',
  styleUrl: './auth-next.component.scss',
})
export class AuthNextComponent implements OnInit {

  private readonly TOKEN = environment.varToken;
  private readonly REFRESH_TOKEN = environment.varRefToken;
  // private readonly url_web = environment.urlWeb;
  private readonly client = environment.client;
  private readonly rolOficinaConsular = environment.rolOficinaConsular;

  // private readonly con_app_name =
  //   `con_app_${this.client}_${moment().format('YYYYMMDD')}`;

  sesion_estado: string | null = null;
  codigo: string | null = null;
  state: string | null = null;

  cargado = false;
  con_error = false;
  logeando = false;

  path_auth = environment.pathAuth;
  // path_inicial = environment.pathInicial;
  mensaje_error: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    // private readonly titleService: Title,
    private readonly router: Router,
    private readonly authService: AuthService,
    // private readonly msgs: MsgsService,
    private readonly pkceService: PkceService
  ) {}

  ngOnInit(): void {
    // this.titleService.setTitle('IDAU CONEXIÓN');

    this.route.queryParams.subscribe(params => {
      this.sesion_estado = params['sesion_estado'] ?? null;
      this.codigo = params['codigo'] ?? null;
      this.state = params['state'] ?? null;
    });

    this.next();
  }

  next(): void {
    const savedState = this.pkceService.getOauthState();

    if (!this.state || !savedState || this.state !== savedState) {
      this.mensaje_error = 'Problemas con OAuth2 Authorization Code + PKCE';
      this.cargado = true;
      this.con_error = true;
      return;
    }

    const codeVerifier = this.pkceService.getCodeVerifier();
    if (!codeVerifier) {
      this.mensaje_error = 'No se encontró el código verificador.';
      this.cargado = true;
      this.con_error = true;
      return;
    }

    this.getCredenciales(codeVerifier);
  }

  getCredenciales(codeVerifier: string): void {

    const comand: ObtenerTokenComand = {
      sesion_estado: this.sesion_estado ?? '',
      codigo: this.codigo ?? '',
      client: this.client,
      code_verifier: codeVerifier,
    };

    this.authService.obtenerCredencial(comand).subscribe({
      next: res => {
        this.cargado = true;

        localStorage.setItem(this.TOKEN, res.access_token);
        localStorage.setItem(this.REFRESH_TOKEN, res.refresh_token);

        this.pkceService.clearPkceCodes();

        this.nextConfirm();
      },
      error: err => {
        this.cargado = true;
        // this.msgs.error(err);
        this.con_error = true;
      },
    });
  }

  nextConfirm(): void {
    const scopes = this.authService.getScopes();
    const esOficinaConsul = scopes.includes(this.rolOficinaConsular);
    if (esOficinaConsul) {
      this.router.navigate(['/dashboard/ficha1/']); 
    } else {
      this.router.navigate(['/dashboard']); 
    }
  }

  loginApp(): void {
    this.router.navigateByUrl(this.path_auth);
  }
}