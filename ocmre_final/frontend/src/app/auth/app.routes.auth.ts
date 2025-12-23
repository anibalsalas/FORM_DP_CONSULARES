import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/auth-index/auth-index.component').then(m => m.AuthIndexComponent),
        data: { title: 'Autenticación - Página inicial' }
      },
      {
        path: 'next',
        loadComponent: () => import('./components/auth-next/auth-next.component').then(m => m.AuthNextComponent),
        data: { title: 'Autenticación con código' }
      },
    ]
  }
];