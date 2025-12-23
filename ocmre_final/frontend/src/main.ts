// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app-routing.module';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { AuthInterceptor } from './app/interceptors/auth.interceptor';

// // --> 1.  proveedores de fecha
// import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
// import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

// // --> 2. formato de fecha que deseas
// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(
//       withInterceptors([AuthInterceptor])
//     ),

//     // --> 3. proveedores de formato aquí
//     provideMomentDateAdapter(MY_DATE_FORMATS),
//     { provide: MAT_DATE_LOCALE, useValue: 'es-PE' } // 'es-PE' para Perú
//   ]
// }).catch(err => console.error(err));



import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor'; // <-- ruta correcta a TU interceptor

// Fecha (Angular Material + Moment)
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // Interceptores Http (orden importa si agregas más a futuro)
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),

    // Moment DateAdapter + formatos y locale
    provideMomentDateAdapter(MY_DATE_FORMATS),
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ],
}).catch(err => console.error(err));
