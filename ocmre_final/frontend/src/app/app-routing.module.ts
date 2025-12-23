
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { authRoutes } from './auth/app.routes.auth';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  ...authRoutes,
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
        data: { roles: ['COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'OFICINA_CONSULAR_MRE', 'ADMINISTRADOR_MRE'] }, 
    children: [
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./admin/usuarios/usuarios.component').then(m => m.UsuariosComponent),
          data: { roles: ['COMISIONADO_MRE', 'ADMINISTRADOR_MRE'] } 

      },
      
      {
        path: 'roles',
        loadComponent: () =>
          import('./admin/roles/roles.component').then(m => m.RolesComponent),
        data: { roles: ['ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] } 

      },

      ///////////////////////////////////////////////////////////////////////////////////////////////////
      {
          path: 'ficha1',
          children: [
            {
              path: '',
              loadComponent: () =>
                import('./admin/ficha1/ficha1.component').then(m => m.Ficha1Component),
              data: { roles: ['OFICINA_CONSULAR_MRE', 'COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
            },
            {
              path: 'monitoreo',
              loadComponent: () =>
                import('./admin/ficha1/monitoreo/monitoreo-ficha1.component').then(m => m.Ficha1MonitoreoComponent),

              data: { roles: ['ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
            },

               {
              path: 'reportes',
              loadComponent: () =>
                import('./admin/ficha1/reportes/reportes1.component').then(m => m.ReporteSeccion1Component),
              data: { roles: ['ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
            },


            {
              path: 'registrar',
              loadComponent: () =>
                import('./admin/ficha1/registrar-ficha/registrar-ficha1.component').then(m => m.RegistrarFicha1Component),
              data: { roles: ['OFICINA_CONSULAR_MRE','COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
            },
            {
              path: 'registrar/:id',
              loadComponent: () =>
                import('./admin/ficha1/registrar-ficha/registrar-ficha1.component').then(m => m.RegistrarFicha1Component),
              data: { roles: ['OFICINA_CONSULAR_MRE','COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
            },
          ]
        },
        
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  { path: '**', redirectTo: '' }
];



// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard';
// // 1. Importar el nuevo Guard
// import { ExternoRedirectGuard } from './guards/ExternoRedirectGuard'; 

// export const routes: Routes = [
//   { path: '', component: LoginComponent },
//   {
//     path: 'dashboard', 
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'OFICINA_CONSULAR_MRE', 'ADMINISTRADOR_MRE'] }, 
//     children: [
//       {
//         path: 'usuarios',
//         loadComponent: () =>
//           import('./admin/usuarios/usuarios.component').then(m => m.UsuariosComponent),
//         data: { roles: ['COMISIONADO_MRE', 'ADMINISTRADOR_MRE'] } 

//       },
//       {
//         path: 'roles',
//         loadComponent: () =>
//           import('./admin/roles/roles.component').then(m => m.RolesComponent),
//         data: { roles: ['ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] } 

//       },

//       ///////////////////////////////////////////////////////////////////////////////////////////////////
//       {
//         path: 'ficha1',
//         children: [
//           {
//             path: '',
//             loadComponent: () =>
//               import('./admin/ficha1/ficha1.component').then(m => m.Ficha1Component),
//             // Aplicar el Guard: Si es externo, redirige a 'registrar'. Si no, carga el componente de listado.
//             canActivate: [ExternoRedirectGuard], 
//             data: { roles: ['OFICINA_CONSULAR_MRE', 'COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
//           },
//           {
//             path: 'monitoreo',
//             loadComponent: () =>
//               import('./admin/ficha1/monitoreo/monitoreo-ficha1.component').then(m => m.Ficha1MonitoreoComponent),

//             data: { roles: ['ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
//           },
//           // {
//           //   path: 'reportes',
//           //   loadComponent: () =>
//           //     import('./admin/ficha1/reportes/reportes-ficha1.component').then(m => m.Reporte1Component),
//           //   data: { roles: ['ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
//           // },
//           {
//             path: 'registrar',
//             loadComponent: () =>
//               import('./admin/ficha1/registrar-ficha/registrar-ficha1.component').then(m => m.RegistrarFicha1Component),
//             data: { roles: ['OFICINA_CONSULAR_MRE','COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
//           },
//           {
//             path: 'registrar/:id',
//             loadComponent: () =>
//               import('./admin/ficha1/registrar-ficha/registrar-ficha1.component').then(m => m.RegistrarFicha1Component),
//             data: { roles: ['OFICINA_CONSULAR_MRE','COMISIONADO_MRE', 'ESPECIALISTA_MRE', 'ADMINISTRADOR_MRE'] }
//           },
//         ]
//       },
//       // Si la navegación a 'dashboard' no tiene sub-ruta, redirige a 'usuarios' por defecto
//       { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
//     ]
//   },
//   {
//     path: 'unauthorized',
//     loadComponent: () =>
//       import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
//   },
//   { path: '**', redirectTo: '' }
// ];







