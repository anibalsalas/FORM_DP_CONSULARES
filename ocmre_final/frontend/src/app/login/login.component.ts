

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="logo-placeholder"></div>

        <p class="subtitle">Utilice su usuario y clave de sgd-plusnet</p>
        <h1 style="font-size: 1.4rem; color: #013a4c !important; font-weight: 800; margin-bottom: 30px;">Supervisión MRE</h1>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Usuario</mat-label>
            <input matInput formControlName="username" placeholder="Usuario" autocomplete="username" />
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
              El usuario es requerido.
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contraseña</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Contraseña" autocomplete="current-password" />
            <button  mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button" aria-label="Toggle password visibility"  >
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-icon matPrefix>vpn_key</mat-icon>
             <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              La contraseña es requerida.
            </mat-error>
          </mat-form-field>


          <button mat-flat-button  type="submit" [disabled]="loading || loginForm.invalid" class="submit-button">
            <mat-icon>login</mat-icon>
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>

          <mat-error *ngIf="errorMessage" class="server-error">{{ errorMessage }}</mat-error>
        </form>

        
      </div>
    </div>
  `,
  styles: [`
   
    .login-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f0f2f5;
      font-family: sans-serif;
    }
      .mat-mdc-unelevated-button .mdc-button__label{
          color: #fff !important;
        }

        .mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled{
        color: #fff !important;
        }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 40px 30px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      text-align: center;
    }
    .full-width {
      width: 100%;
      margin-bottom: 5px;
    }
    .submit-button {
      width: 100%;
      background-color: #013a4c !important;

      // padding: 10px 0;
       margin-top: 20px;
       margin-bottom: 15px;
    }
    .footer-text {
      margin-top: 10px;
      font-size: 0.9em;
      color: #666;
    }
    .footer-text a {
      color: #fff;
      text-decoration: none;
    }
  .logo-placeholder {
      width: 150px;
      height: 60px;
      margin: 0 auto 1rem;
 
      background-image: url('data:image/png;base64,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');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    .server-error {
      margin-top: 10px;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup;
  loading = false;
  errorMessage: string = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('🟢 LoginComponent cargado correctamente');
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Al iniciar el componente, intentamos cargar las credenciales guardadas.
    // this.cargarCredencialesGuardadas();
    this.router.navigate(['/auth']);
    // this.cargarCredencialesGuardadas();
  }


  private cargarCredencialesGuardadas(): void {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      this.loginForm.patchValue({
        username: rememberedUser,
        rememberMe: true
      });
    }
  }



  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = ''; 

    if (this.loginForm.value.rememberMe) {
      localStorage.setItem('rememberedUser', this.loginForm.value.username);
    } else {
      localStorage.removeItem('rememberedUser');
    }

    const loginRequest = {
      usuarioUsu: this.loginForm.value.username,
      passwordUsu: this.loginForm.value.password
    };

    console.log('Credenciales enviadas:', loginRequest);

    this.authService.login(loginRequest).subscribe({
      next: (res) => {
        console.log('✅ Login correcto:', res);
        if (res.token) {
          localStorage.setItem('token', res.token);

          // === INICIO DE LA LÓGICA DE REDIRECCIÓN POR ROL ===
          const roles = this.authService.getRoles(); 
          const esExterno = roles.includes('EXTERNO');

          if (esExterno) {
            console.log('Usuario externo detectado. Redirigiendo a /dashboard/ficha1/registrar...');
            this.router.navigate(['/dashboard/ficha1/']); 
          } else {
            console.log('Usuario interno detectado. Redirigiendo al dashboard principal...');
      
            this.router.navigate(['/dashboard']); 
          }

        } else {
          this.errorMessage = 'Token no recibido del servidor';
        }
        this.loading = false; 
      },
      error: (err) => {
        console.error('❌ Error de login:', err);
        this.errorMessage = 'Usuario o contraseña inválido';
        this.loading = false;
      }
    });
  }
  
}
