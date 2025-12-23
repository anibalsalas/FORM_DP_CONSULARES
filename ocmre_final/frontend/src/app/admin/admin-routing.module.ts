import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard'; // asegúrate de importar bien
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { Ficha1Component } from './ficha1/ficha1.component';
import { RegistrarFicha1Component } from './ficha1/registrar-ficha/registrar-ficha1.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,  // 👈 Este es el layout
    canActivate: [AuthGuard],        // Opcional si tienes AuthGuard
    // children: [
    //   { path: 'usuarios', component: UsuariosComponent },
    //   { path: 'roles', component: RolesComponent },
    //   { path: 'ficha', component: FichaComponent }, // Ruta para la lista de fichas
    //   { path: 'ficha/registrar-ficha', component: RegistrarFichaComponent }, // Ruta para registrar fichas
    //   { path: '', redirectTo: 'usuarios', pathMatch: 'full' }  // 👈 Ruta por defecto
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'roles', component: RolesComponent },
      { 
        path: 'ficha', 
        component: Ficha1Component, 
        canActivate: [AuthGuard], 
        data: { roles: ['COMISIONADO', 'ESPECIALISTA'] } 
      },
      { 
        path: 'ficha/registrar-ficha', 
        component: RegistrarFicha1Component, 
        canActivate: [AuthGuard], 
        data: { roles: ['COMISIONADO', 'ESPECIALISTA'] } 
      },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
