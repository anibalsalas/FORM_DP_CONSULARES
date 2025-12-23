// import { Component } from "@angular/core";
// import { ReporteService1 } from "./reporte.service";

// @Component({
//   selector: 'app-reporte-seccion1',
//   template: `
//     <button mat-raised-button color="primary" (click)="exportar()">
//       Exportar Sección 1 (xlsx)
//     </button>
//   `
// })
// export class ReporteSeccion1Component {
//   constructor(private rep: ReporteService1) {}

//   exportar() {
//     this.rep.descargarSeccion1().subscribe({
//       next: (resp) => {
//         const blob = resp.body!;
//         const cd = resp.headers.get('content-disposition');
//         let filename = 'seccion1.xlsx';
//         if (cd) {
//           const m = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(cd);
//           if (m?.[1]) filename = m[1].replace(/['"]/g, '');
//         }
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url; a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         URL.revokeObjectURL(url);
//       },
//       error: (err) => {
//         console.error('Error exportando Sección 1:', err);
//         alert('No se pudo descargar el reporte.');
//       }
//     });
//   }
// }
/////////////////////////////



// reporte-seccion1.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ReporteService1 } from './reporte.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-reporte-seccion1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './reportes1.component.html',
  styleUrls: ['./reportes1.component.scss']
})
export class ReporteSeccion1Component {
  loading = false;
  secciones = Array.from({ length: 13 }, (_, i) => i + 1);
  selectedSection = 1;

  constructor(private rep: ReporteService1) {}

  exportar() {
    this.loading = true;

    this.getExporterFor(this.selectedSection)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (resp) => this.saveXlsx(resp, `seccion${this.selectedSection}.xlsx`),
        error: (err) => {
          console.error(`Error exportando Sección ${this.selectedSection}:`, err);
          alert('No se pudo descargar el reporte.');
        }
      });
  }

  private getExporterFor(seccion: number) {
    switch (seccion) {
      case 1:
        return this.rep.descargarSeccion1();
      case 2:
        return this.rep.descargarSeccion2(); 
      case 3:
        return this.rep.descargarSeccion3(); 
      case 4:
        return this.rep.descargarSeccion4(); 
      default:
        return this.rep.descargarSeccion1();
    }
  }

 
  private saveXlsx(resp: HttpResponse<Blob>, fallbackName: string) {
    const blob = resp.body!;
    const cd = resp.headers.get('content-disposition');
    let filename = fallbackName;
    if (cd) {
      const m = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(cd);
      if (m?.[1]) filename = m[1].replace(/['"]/g, '');
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
}
