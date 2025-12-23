import { Component, HostListener, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta
// import { AuthService } from '../../services/auth.service'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormGroup } from '@angular/forms';
import { FichaStatusService, SeccionKey, StatusMap } from '../ficha1/registrar-ficha/FichaStatusService';
import { Ficha1Service } from '../ficha1/ficha1.service';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,

  imports: [MatSidenavModule, MatExpansionModule, MatToolbarModule, MatListModule, RouterModule, CommonModule, MatIconModule, MatMenuModule]
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  fotoRec: string | null = null;
  roles: string[] = [];
  esExterno = false; 
  tieneFichaPropia = false;
  ocultarRegistrar = false; 
  //userName = 'Admin'; // Nombre del usuario para mostrar en la barra de herramientas
  isSidebarOpened = true;
 // 1) Estado único de visibilidad: mostrar = true/false
  mostrarRegistrar = false;

  rolAdministrador: string = environment.rolAdministrador;
  rolComisionado: string = environment.rolComisionado;
  rolEspecialista: string = environment.rolEspecialista;
  rolOficinaConsular: string = environment.rolOficinaConsular;

  constructor(private router: Router, private authService: AuthService, private fichaStatusService: FichaStatusService, private ficha1Service: Ficha1Service) {}


  // Detectar el tamaño de la pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSidebarOpened = event.target.innerWidth > 600;
  }



   get canVerRegistrar(): boolean {
    return !this.esExterno;
  }


  // ngOnInit() {

  // const roles = this.authService.getRoles() || [];
  //   this.esExterno = roles.includes('EXTERNO');
    
  //   const storedState = localStorage.getItem('sidebarState');
  //   this.isSidebarOpened = storedState !== null ? JSON.parse(storedState) : true;

  //   this.roles = this.authService.getRoles(); 

  //   this.userName = this.authService.getUsuarioLogueado();

  // }

  
  ngOnInit() {
    const roles = this.authService.getScopes() || [];
    // 2) Detecta EXTERNO aunque venga como ROLE_/ROL_/prefijos
    this.esExterno = roles.some(r => r.toUpperCase().includes('OFICINA_CONSULAR_MRE'));
    this.roles = roles;
    // this.userName = this.authService.getUsuarioLogueado();
    this.getCuentaBasico();

    if (this.esExterno) {
      // 3) Fail-closed: mientras consulta, NO mostrar el botón
      this.mostrarRegistrar = false;

      this.ficha1Service.existeFichaDelUsuario().subscribe({
        next: (existe) => {
          this.tieneFichaPropia = existe;
          // Externo solo ve el botón si NO tiene ficha
          this.mostrarRegistrar = !this.tieneFichaPropia;
        },
        error: () => {
          // Si falla el endpoint, por seguridad no muestres el botón al externo
          this.mostrarRegistrar = false;
        }
      });
    } else {
      // Internos siempre ven el botón
      this.mostrarRegistrar = true;
    }
  }


  

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
    localStorage.setItem('sidebarState', JSON.stringify(this.isSidebarOpened));
  }



  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }


  logout() {
    // console.log('Cerrando sesión...');
    // Utiliza el método logout del AuthService en lugar de hacerlo manualmente
    // this.authService.signOff();
    
    this.authService.signOff().subscribe(
      res=> {
        // this.toastr.info('Sesión cerrada, vuelva pronto');
        this.authService.removeTokens();
        this.router.navigate(['/auth']);
      },
      error=> {
        this.router.navigate(['/auth']);
      }
    );
  }

  getCuentaBasico() {
    this.authService.cuentaBasico().subscribe(
      res=> {
        this.userName = res.usuario.toUpperCase();
        this.fotoRec = res.foto_rec;
      },
      error=> {
      }
    );
  }



}