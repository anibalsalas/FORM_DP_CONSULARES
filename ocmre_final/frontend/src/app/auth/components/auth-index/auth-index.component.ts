import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PkceService } from '../../services/pkce.service';
@Component({
  selector: 'app-auth-index',
  imports: [
    CommonModule
  ],
  templateUrl: './auth-index.component.html',
  styleUrl: './auth-index.component.scss',
  standalone: true,
})
export class AuthIndexComponent {

  private authService = inject(AuthService);
  private pkceService = inject(PkceService);

  cargado: boolean = false;

  ngOnInit(): void {
    this.ejecutarEnOrden();
  }

  async ejecutarEnOrden() {
    try {
      await this.getUrlLogin();
    } catch (err) {
      // this.msgs.show_error(err);
    }
  }

  async getUrlLogin(){
    const { codeChallenge } = await this.pkceService.generateCodeVerifierAndChallenge();
    const state = this.pkceService.getState();

    this.authService.urlLogin().subscribe({
      next: (res) => {
        this.cargado  = true;
        const authUrl = res.url+
        `&state=${state}` +
        `&code_challenge=${encodeURIComponent(codeChallenge)}`;
        // console.log(authUrl);
        window.location.href = authUrl;
      },
      error: (err) => {
        // this.msgs.show_error(err);
        this.cargado  = true;
      }
    });
  }



}
