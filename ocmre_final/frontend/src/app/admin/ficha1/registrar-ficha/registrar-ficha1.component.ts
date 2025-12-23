
////////////////////////
import { ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostListener, inject, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import Swal from 'sweetalert2';
import { SeccionFicha1Component } from '../seccion-ficha1/seccion-ficha1.component';
import { SeccionFicha2Component } from '../seccion-ficha2/seccion-ficha2.component';
import { SeccionFicha3Component } from '../seccion-ficha3/seccion-ficha3.component';
import { SeccionFicha4Component } from '../seccion-ficha4/seccion-ficha4.component';
import { SeccionFicha5Component } from '../seccion-ficha5/seccion-ficha5.component';
import { SeccionFicha6Component } from '../seccion-ficha6/seccion-ficha6.component';
import { SeccionFicha7Component } from '../seccion-ficha7/seccion-ficha7.component';
import { SeccionFicha8Component } from '../seccion-ficha8/seccion-ficha8.component'; 

import { FichaPadronEntity } from '../../../models/ficha-padron.model';
import { Ficha1Service } from '../ficha1.service';
import { environment } from '../../../../environments/environment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Observable, startWith, map, takeUntil, Subject } from 'rxjs';
import { NoNegativosDirective } from '../../../shared/directives/no-negativos.directive';
import { UsuarioRolService } from '../../../services/usuario-rol.service';
import { SeccionFicha9Component } from '../seccion-ficha9/seccion-ficha9.component';
import { SeccionFicha10Component } from '../seccion-ficha10/seccion-ficha10.component';
import { MatIconModule } from '@angular/material/icon';
// import { AuthService } from '../../../services/auth.service';
import { SeccionFicha11Component } from '../seccion-ficha11/seccion-ficha11.component';
import { SeccionFicha12Component } from '../seccion-ficha12/seccion-ficha12.component';
import { SeccionFicha13Component } from '../seccion-ficha13/seccion-ficha13.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FichaStatusService } from './FichaStatusService';
import { Max3DigitsDirective } from './max-3digits.directive';
import { SubirArchivoComponent } from '../subir-archivo/subir-archivo.component';
import { AuthService } from '../../../auth/services/auth.service';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




export function yearValidator(requiredYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Si no hay valor, no hay nada que validar aquí.
    if (!value) {
      return null;
    }
    // --- INICIO DE LA CORRECCIÓN ---
    // 1. Convierte el valor a un objeto Date, sin importar si ya lo es o si es un string.
    const dateValue = new Date(value);

    // 2. Se comprueba si la fecha resultante es válida.
    // Si el string de entrada no era una fecha válida, getTime() devolverá NaN.
    if (isNaN(dateValue.getTime())) {
      // Devuelve un error genérico si el formato es irreconocible.
      return { fechaInvalida: true }; 
    }
    // --- FIN DE LA CORRECCIÓN ---

    // 3. Ahora sí podemos usar getFullYear() de forma segura.
    const year = dateValue.getFullYear();
    
    return year !== requiredYear 
      ? { anioInvalido: { anioRequerido: requiredYear, anioActual: year } } 
      : null;
  };
}

// Definición del tipo para las secciones
type SeccionKey = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10' | 's11' | 's12' | 's13';

const SECCIONES: SeccionKey[] = [
  's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'
];

// tipo global 
type SN = 'S' | 'N' | null;


export function rangoHorasValido(
  inicioKey: string,
  finKey: string,
  errorKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!(group instanceof FormGroup)) {
      return null;
    }

    const inicio = group.get(inicioKey)?.value as string | null;
    const fin    = group.get(finKey)?.value as string | null;

    // Si falta uno, no validamos este error
    if (!inicio || !fin) {
      return null;
    }

    // Formato "HH:mm" se puede comparar como string
    if (fin < inicio) {
      return { [errorKey]: true };
    }

    return null;
  };
}

// export const horaMananaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const value = control.value;
//   if (!value) {
//     return null;
//   }
//   if (value >= "05:00" && value <= "11:59") {
//     return null; // La hora es válida
//   }
//   return { horaMananaInvalida: true };
// };


// export const horaTardeNocheValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const value = control.value;
//   if (!value) {
//     return null;
//   }
//   if (value >= "12:00" && value <= "23:59") {
//     return null; 
//   }
//   return { horaTardeNocheInvalida: true };
// };


// export const horaRefriIniValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const value = control.value;
//   if (!value) {
//     return null;
//   }
//   if (value >= "05:00" && value <= "01:59") {
//     return null; 
//   }
//   return { horaMananaInvalida: true };
// };

// export const horaRefriFinValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const value = control.value;
//   if (!value) {
//     return null;
//   }
//   if (value >= "02:00" && value <= "23:59") {
//     return null; 
//   }
//   return { horaTardeNocheInvalida: true };
// };


/**
 * Validador de FormGroup que comprueba si 'horaRefriFin' es menor que 'horaRefriIni'.
 */
export const horaRefrigerioValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const inicio = control.get('horaRefrigerioInicio');
  const fin = control.get('horaRefrigerioFin');
  if (!inicio || !fin || !inicio.value || !fin.value) {
    return null;
  }
  if (fin.value < inicio.value) {
    return { horaFinMenorQueInicio: true };
  }
  return null;
};



export const horaEmergenciaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const inicio = control.get('horaEmergenciaInicio');
  const fin = control.get('horaEmergenciaFin');
  if (!inicio || !fin || !inicio.value || !fin.value) {
    return null;
  }
  if (fin.value < inicio.value) {
    return { horaFinMenorEmerQueInicio: true };
  }
  return null;
};

   
@Component({
  selector: 'app-registrar-ficha1',
  standalone: true,
  templateUrl: './registrar-ficha1.component.html',
   styleUrls: ['./registrar-ficha1.component.scss'] ,
  imports: [
    CommonModule, MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    SeccionFicha1Component, 
    SeccionFicha2Component, 
    SeccionFicha3Component, 
    SeccionFicha4Component,
    SeccionFicha5Component,
    SeccionFicha6Component,
    SeccionFicha7Component,
    SeccionFicha8Component,
    SeccionFicha9Component,
    SeccionFicha10Component,
    SeccionFicha11Component,
    SeccionFicha12Component,
    SeccionFicha13Component,
    MatSelectModule,        
    MatOptionModule,
    MatAutocompleteModule,
    MatSnackBarModule, Max3DigitsDirective, SubirArchivoComponent
  ],
  encapsulation: ViewEncapsulation.None
})



export class RegistrarFicha1Component implements OnInit {
  esExterno: boolean = false;
  rolOficinaConsular = environment.rolOficinaConsular;
  varToken = environment.varToken;


 
  fichaForm: FormGroup;
  idFichaGuardado: number | null = null;
  mensajeEstadoFicha: 'I' | 'C' | null = null;
  modoEdicion: boolean = false; 
//////////Busqueda dinámica /////////////////////////////
//filtroEntidadControl = new FormControl('');

  padronList: any[] = []; 
  entidadesFiltradas!: Observable<any[]>;
  mostrar: Record<SeccionKey, boolean> = {
    s1: false, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false, s8: false, s9: false, s10: false, s11: false, s12: false, s13: false
  };

  completadas: Record<SeccionKey, boolean> = {
    s1: false, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false, s8: false, s9: false, s10: false, s11: false, s12: false, s13: false
  };

  validadas: Record<SeccionKey, boolean> = {
  s1: false, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false, s8: false, s9: false, s10: false, s11: false, s12: false, s13: false
};


//////////////////////////Helpers, keys, conteos y scroll suave//////////////////////////////////////////////////////////////////////////////////////

seccionesKeys: SeccionKey[] = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'];

@ViewChild('statusBarRef', { static: false }) statusBarRef?: ElementRef<HTMLElement>;

totalCompletas(): number {
  return this.seccionesKeys.filter(k => !!this.completadas[k]).length;
}
totalValidadas(): number {
  return this.seccionesKeys.filter(k => !!this.validadas[k]).length;
}

getAriaLabel(k: SeccionKey): string {
  const c = this.completadas[k] ? 'completada' : 'incompleta';
  const v = this.validadas[k] ? 'validada' : 'no validada';
  return `Sección ${k.toUpperCase()}: ${c} y ${v}. Ir a la sección.`;
}

private getScrollContainer(el: HTMLElement): HTMLElement {
  let cur: HTMLElement | null = el.parentElement;
  const rx = /(auto|scroll|overlay)/;

  while (cur && cur !== document.body) {
    const cs = getComputedStyle(cur);
    if (rx.test(cs.overflowY) && cur.scrollHeight > cur.clientHeight) {
      return cur;
    }
    cur = cur.parentElement;
  }
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

scrollToSection(k: SeccionKey) {
  if (!this.mostrar[k]) {
    this.mostrar[k] = true;
    this.cdr.detectChanges();
  }

  const target = document.getElementById(k);
  if (!target) return;

  const container = this.getScrollContainer(target);

  const toolbarH = window.matchMedia('(max-width: 599px)').matches ? 56 : 64;
  const stickyH  = this.statusBarRef?.nativeElement?.offsetHeight ?? 56;
  const gap = 12;
  const offset = toolbarH + stickyH + gap;

  const y =
    target.getBoundingClientRect().top
    - container.getBoundingClientRect().top
    + container.scrollTop
    - offset;

  container.scrollTo({ top: y, behavior: 'smooth' });
}
/////////////////ABRE PANEL AL HACER SCROLL////////////////////////////////////
@ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
@ViewChildren(MatExpansionPanel, { read: ElementRef }) panelEls!: QueryList<ElementRef<HTMLElement>>;

// Abre el panel de la sección k y luego hace scroll suave
openAndScroll(k: SeccionKey) {
  // por si la sección aún no está renderizada por *ngIf
  if (!this.mostrar[k]) {
    this.mostrar[k] = true;
    this.cdr.detectChanges();
  }

  // localizar el panel por su id="sX" en el DOM para no depender del índice
  const els = this.panelEls?.toArray() ?? [];
  const idx = els.findIndex(e => e.nativeElement.id === k);
  if (idx === -1) return;

  const panel = this.panels.toArray()[idx];

  // abrir si está cerrado
  if (!panel.expanded) panel.open();

  // cuando empiece a expandirse, espera ~1 frame/animación y scrollea
  // (Angular Material usa ~225 ms por defecto)
  setTimeout(() => this.scrollToSection(k), 260);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
// get f(): { [key: string]: AbstractControl } {
//   return this.fichaForm.controls as { [key: string]: AbstractControl };
// }

cargosJefe = [
  { valor: 'A', texto: 'Embajador' },
  { valor: 'B', texto: 'Ministro' },
  { valor: 'C', texto: 'Ministro Consejero' },
  { valor: 'D', texto: 'Consejero' },
  { valor: 'E', texto: 'Primer Secretario' },
  { valor: 'F', texto: 'Segundo Secretario' },
  { valor: 'G', texto: 'Tercer Secretario' },
];

// // 👉 Lista de tipos de local (usada en *ngFor en el HTML)
 tiposLocal = [
    { valor: 'A', texto: 'Propio' },
    { valor: 'B', texto: 'Alquilado' },
    { valor: 'C', texto: 'Por convenio con alguna entidad del Estado Receptor' },
    { valor: 'D', texto: 'Otro' }
  ];

  // Getter para acceder a los controles del formulario
  get f() {
    return this.fichaForm.controls;
  }

  // Método auxiliar para los iconos del tipo de local
  getIconForTipoLocal(valor: string): string {
    const iconMap: { [key: string]: string } = {
      'A': 'apartment',
      'B': 'home',
      'C': 'business',
      'D': 'help_outline'
    };
    return iconMap[valor] || 'business';
  }

/////NO PERMITE ELEGIR FECHAS FUTURAS//////////
  private maxTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value;
    if (!v) return null;
    const d = new Date(v);
    if (isNaN(d.getTime())) return { fechaInvalida: true };
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    d.setHours(0,0,0,0);
    return d > hoy ? { fechaFutura: true } : null;
  };
}

// Asegúrate de importar los módulos necesarios en tu módulo:
// MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
// MatRadioModule, MatCheckboxModule, MatButtonModule, MatIconModule,
// MatDividerModule, MatButtonToggleModule

  // private readonly GROUP_MotivoE = ['motivoNoExtraA','motivoNoExtraB','motivoNoExtraC'] as const;

  private readonly GROUP_MotivoE   = ['motivoNoExtraA','motivoNoExtraB','motivoNoExtraC'];
  private readonly GROUP_CA   = ['funcCanalAtencionA','funcCanalAtencionB','funcCanalAtencionC', 'funcCanalAtencionD'];

 constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private fichaService: Ficha1Service,
    private usuarioRolService: UsuarioRolService,
    private route: ActivatedRoute,
  private authService: AuthService,
  private fichaStatusService: FichaStatusService, // ⬅️ AÑADIDO
  ) {
    this.fichaForm = this.fb.group({

      idFicha: [null],
      idSestablecmnt: [null],
      usuRegistro: [''],
      fchRegistro: [null],
      usuActualiza: [''],
      fchActualiza: [null],
      estado: [''],

      // ========== ENTREVISTADOR ==========
      odmodOficina: ['', [Validators.maxLength(200)]],
      entrevNombre: [null],
      entrevTipoDoc: ['DNI', [Validators.maxLength(10)]],
      entrevNumDoc: ['', [Validators.pattern(/^\d{8,12}$/)]],
      entrevTelefono: ['', [Validators.maxLength(9), Validators.pattern(/^\d{1,9}$/)]],


      entrevCorreo: ['', [Validators.email, Validators.maxLength(200)]],


      funcTel:        [null],
      funcTelEmergencia: [null],
      funcCelular:    ['', [Validators.pattern(/^\d{9}$/)]],

      // horaAtencionInicio: ['', [Validators.required, Validators.maxLength(5)]],
      // horaAtencionFin:    ['', [Validators.maxLength(5)]],

      horaAtencionInicio:   [null],
      horaAtencionFin:      [null],

      horaRefrigerioInicio: [null],
      horaRefrigerioFin:    [null],

      // horaEmergenciaInicio: [null],
      // horaEmergenciaFin:    [null],

      horaEmergenciaInicio: [null, [Validators.required]], 
      horaEmergenciaFin: [null, [Validators.required]], 

      supFechaInicio: [null, [yearValidator(2025)]],
      supFechaFin: [null, [yearValidator(2025)]],
      // ========== ENTIDAD ==========
      entidadNombre: ['', [Validators.required, Validators.maxLength(200)]],
      entidadPais: ['', [Validators.maxLength(100)]],
      entidadContinente: ['', [Validators.maxLength(100)]],
      entidadCategoria: ['', [Validators.maxLength(1)]],
      entidadLugares: ['', [Validators.maxLength(500)]],
      entidadCantidad: [null],
      codUnico: ['', [Validators.maxLength(20)]],

     // codiDepeTde: [''],
      //txt_desc_depe_tde: [''],
      // ========== FUNCIONARIO / CONTACTO ==========

      funcCorreo: ['', [Validators.email, Validators.maxLength(200)]],

      // Canales de atención (flags tipo CHAR(1))
      funcCanalAtencionA: [false],
      funcCanalAtencionB: [false],
      funcCanalAtencionC: [false],
      funcCanalAtencionD: [false],
      funcAtencionOtro: [''],


                                                 
      

      atencionEmergencia: ['', [Validators.maxLength(1)]],

 


      brindaAtencionExtra: ['', [Validators.maxLength(1)]],
      atencionExtraDia: ['', [Validators.maxLength(1)]],
      motivoNoExtraA: [false, [Validators.maxLength(1)]],
      motivoNoExtraB: [false, [Validators.maxLength(1)]],
      motivoNoExtraC: [false, [Validators.maxLength(1)]],

      // Local de consumo / accesibilidad
      localconsuTipo: ['', [Validators.required, Validators.maxLength(1)]],
      localconsuTipoOtro: ['', [Validators.maxLength(200)]],
      localConsuRampa: ['', [Validators.maxLength(1)]],
      localConsuHigienico: ['', [Validators.maxLength(1)]],

      // Jefe consular
 

      nombreJefeConsular: ['', [Validators.required, Validators.maxLength(100)]],
      correoJefeConsular: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      celJefeConsular: ['', Validators.required],
      cargoJefeConsular: ['', [Validators.required, Validators.maxLength(1)]],
      resoluJefeConsular: ['', [Validators.required, Validators.maxLength(100)]],
      fechaJefeConsular: [null, [Validators.required, this.maxTodayValidator()]],

      // === Totales y desgloses (numéricos) ===
      nroAHombres: [null],
      nroBHombres: [null],
      nroCHombres: [null],
      nroDHombres: [null],
      nroEHombres: [null],
      nroFHombres: [null],
      nroTotalHombres: [null],

      nroAMujeres: [null],
      nroBMujeres: [null],
      nroCMujeres: [null],
      nroDMujeres: [null],
      nroEMujeres: [null],
      nroFMujeres: [null],
      nroTotalMujeres: [null],

      nroATotalHombres: [null],
      nroBTotalHombres: [null],
      nroCTotalHombres: [null],
      nroDTotalHombres: [null],
      nroETotalHombres: [null],
      nroFTotalHombres: [null],
      nroGTotalHombres: [null],

      hPeruanosPa: [null],
      hExtranjerosPa: [null],
      hNacionalidadPa: [{ value: null, disabled: true }],
      hTotalPa: [null],
      mPeruanasPa: [null],
      mExtranjerasPa: [null],
      mNacionalidadPa: [{ value: null, disabled: true }],
      mTotalPa: [null],
      tPeruanasPa: [null],
      tExtranjerasPa: [null],
      tNacionalidadPa: [{ value: null, disabled: true }],
      tTotalPa: [null],

      hPeruanosPs: [null],
      hExtranjerosPs: [null],
      hNacionalidadPs: [{ value: null, disabled: true }],
      hTotalPs: [null],
      mPeruanasPs: [null],
      mExtranjerasPs: [null],
      mNacionalidadPs: [{ value: null, disabled: true }],
      mTotalPs: [null],
      tPeruanasPs: [null],
      tExtranjerasPs: [null],
      tNacionalidadPs: [{ value: null, disabled: true }],
      tTotalPs: [null],

      hPeruanosV: [null],
      hExtranjerosV: [null],
      hNacionalidadV: [{ value: null, disabled: true }],
      hTotalV: [null],
      mPeruanasV: [null],
      mExtranjerasV: [null],
      mNacionalidadV: [{ value: null, disabled: true }],
      mTotalV: [null],
      tPeruanasV: [null],
      tExtranjerasV: [null],
      tNacionalidadV: [{ value: null, disabled: true }],
      tTotalV: [null],

      // === P2_2_* (flags y cantidades) ===
      p2223a: ['', [Validators.maxLength(1)]],
      p2224a: ['', [Validators.maxLength(1)]],
      p2225a: ['', [Validators.maxLength(1)]],
      p2223b: [null],
      p2223c: [''],
      p2223d: [null],
      p2223e: [null],
      p2223f: [null],
      p2224b: [null],
      p2224c: [null],
      p2224d: [null],
      p2224e: [null],
      p2224f: [null],
      p2225b: [null],
      p2225c: [null],
      p2225d: [null],
      p2225e: [null],
      p2225f: [null],

      porcenPersoA: [null],
      porcenPersoB: [null],
      porcenPersoC: [null],

      // --- Validación/Metadatos ---
      aceptar: ['', [Validators.maxLength(1)]],
      flagValidar: ['', [Validators.maxLength(1)]],
      usuValida: ['', [Validators.maxLength(30)]],
      fchValida: [null],
      codiDepeTde: ['', [Validators.maxLength(4), Validators.pattern(/^.{0,4}$/)]],
      txtDescDepeTde: ['', [Validators.maxLength(500)]],

      // --- Baja/estado de registro ---
      estadoRegistro: ['', [Validators.maxLength(1)]],
      observacionBaja: ['', [Validators.maxLength(500)]],
      fchBaja: [null], // LocalDateTime en backend
      usuBaja: ['', [Validators.maxLength(50)]],  
         
    },
      {
       // validators: RegistrarFicha1Component.fechaFinMayorIgualInicioValidator(),
         validators: [RegistrarFicha1Component.fechaFinMayorIgualInicioValidator(), horaRefrigerioValidator, horaEmergenciaValidator,
            rangoHorasValido('horaAtencionInicio', 'horaAtencionFin', 'horaFinMenorQueInicioAtencion'),
        rangoHorasValido('horaRefrigerioInicio', 'horaRefrigerioFin', 'horaFinMenorQueInicio'),
        rangoHorasValido('horaEmergenciaInicio', 'horaEmergenciaFin', 'horaFinMenorEmerQueInicio'),
         ]
      });
  }



 

    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setCodi_depe_tde(value: string) {
  this.fichaForm.get('codiDepeTde')?.setValue(value); 
}

  today: Date = new Date();



    private destroy$ = new Subject<void>();




    
public activarAutosaveS1 = false;
public activarAutosaveS2 = false;
public activarAutosaveS3 = false;
public activarAutosaveS4 = false;
public activarAutosaveS5 = false;
public activarAutosaveS6 = false;
public activarAutosaveS7 = false;
public activarAutosaveS8 = false;
public activarAutosaveS9 = false;
public activarAutosaveS10 = false;
public activarAutosaveS11 = false;
public activarAutosaveS12 = false;
public activarAutosaveS13 = false;

avisarSeccion1Opened() { this.activarAutosaveS1 = true; }
//avisarSeccion2Opened() { this.activarAutosaveS2 = true; }

public avisarSeccion2Opened(): void {
    console.log('🔵 Panel S2 abierto');
    // ✅ Activar autosave después de un pequeño delay
    // para asegurar que los datos ya se hidrataron
    setTimeout(() => {
      this.activarAutosaveS2 = true;
      console.log('✅ Autosave S2 activado');
    }, 500);
  }

avisarSeccion3Opened() { this.activarAutosaveS3 = true; }
avisarSeccion4Opened() { this.activarAutosaveS4 = true; }
avisarSeccion5Opened() { this.activarAutosaveS5 = true; }
avisarSeccion6Opened() { this.activarAutosaveS6 = true; }
avisarSeccion7Opened() { this.activarAutosaveS7 = true; }
avisarSeccion8Opened() { this.activarAutosaveS8 = true; }
avisarSeccion9Opened() { this.activarAutosaveS9 = true; }
avisarSeccion10Opened() { this.activarAutosaveS10 = true; }
avisarSeccion11Opened() { this.activarAutosaveS11 = true; }
avisarSeccion12Opened() { this.activarAutosaveS12 = true; }
avisarSeccion13Opened() { this.activarAutosaveS13 = true; }

private mapearCheckboxesMotivosParaGuardar(fichaData: any): void {
  fichaData.motivoNoExtraA = fichaData.motivoNoExtraA ? 'S' : null;
  fichaData.motivoNoExtraB = fichaData.motivoNoExtraB ? 'S' : null;
  fichaData.motivoNoExtraC = fichaData.motivoNoExtraC ? 'S' : null;
}
private mapearCheckboxesParaGuardar(fichaData: any): void {
  fichaData.funcCanalAtencionA = fichaData.funcCanalAtencionA ? 'S' : null;
  fichaData.funcCanalAtencionB = fichaData.funcCanalAtencionB ? 'S' : null;
  fichaData.funcCanalAtencionC = fichaData.funcCanalAtencionC ? 'S' : null;
  fichaData.funcCanalAtencionD = fichaData.funcCanalAtencionD ? 'S' : null;
}

guardarFicha(): void {
  this.showGroupErrors = true;
   this.verificarCamposInvalidos();    
  if (this.fichaForm.invalid) {
    this.fichaForm.markAllAsTouched();
   // this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
    Swal.fire('Formulario Incompleto', 'Por favor, complete todos los campos requeridos.', 'warning');
    return;
  }



  const fichaData = { ...this.fichaForm.value, estado: 'I' };
  this.mapearCheckboxesParaGuardar(fichaData);
  this.mapearCheckboxesMotivosParaGuardar(fichaData);


  if (this.idFichaGuardado) {
    // --- LÓGICA DE ACTUALIZACIÓN ---
    this.fichaService.obtenerFichaCompletaPorId(this.idFichaGuardado).subscribe({
      next: (dto) => {
        const fichaOriginal = dto.ficha;
        const dataActualizada = { ...fichaOriginal, ...fichaData };

        this.http.put(`${environment.api_url}/api/ficha1/actualizarFicha/${this.idFichaGuardado}`, dataActualizada)
          .subscribe({
            next: () => {
              localStorage.setItem('fichaPantbc', JSON.stringify(dataActualizada));
              Swal.fire({ icon: 'success', title: 'Ficha actualizada correctamente', showConfirmButton: false, timer: 2000 });
            },
            error: (err) => {
              console.error('Error al actualizar la ficha:', err);
              Swal.fire('Error', 'No se pudo actualizar la ficha.', 'error');
            }
          });
      },
      error: (err) => {
        console.error('Error al cargar ficha original para actualizar:', err);
      }
    });
  } else {
    // --- LÓGICA DE CREACIÓN ---
    this.http.post<any>(`${environment.api_url}/api/ficha1/guardarFicha`, fichaData)
      .subscribe({
        next: (response) => {
          this.idFichaGuardado = response.idFicha || null;

          // 🔁 Propagamos el nuevo ID a todas las secciones
          for (let i = 1; i <= 13; i++) {
          //  const key = `s${i}` as SeccionKey

            (this as any)[`datosFicha${i}`] = {
              ...(this as any)[`datosFicha${i}`],
              idFicha: this.idFichaGuardado
            };
          }

          this.fichaStatusService.setBulk(this.completadas, this.validadas);

          // ✅ Todo ok
          Object.keys(this.mostrar).forEach(key => this.mostrar[key as SeccionKey] = true);
          this.mensajeEstadoFicha = 'I';

          Swal.fire({
            icon: 'success',
            title: 'Ficha guardada correctamente',
            text: `ID: ${this.idFichaGuardado}`,
            showConfirmButton: false,
            timer: 2500
          });
        },
        error: (err) => {
          console.error('Error al guardar la ficha:', err);
          Swal.fire('Error', 'No se pudo guardar la ficha.', 'error');
        }
      });
  }
}

  

  cancelar(): void {
    this.router.navigate(['/dashboard/ficha']);
  }



actualizarEstadoSeccion(seccionKey: SeccionKey, estado: string): void {
  this.completadas[seccionKey] = (estado === 'C');
  this.fichaStatusService.setCompletada(seccionKey, this.completadas[seccionKey]);
  this.evaluarEstadoFichaCompleta();
}


todasSeccionesGuardadas(): boolean {
  for (let i = 1; i <= 13; i++) {
    const datos = localStorage.getItem(`pantbc_s${i}`);
    
    // Validación para evitar el error
    if (!datos) return false;

    try {
      const parsed = JSON.parse(datos);

      if (!parsed || typeof parsed !== 'object') return false;

      const valores = Object.values(parsed);
      if (valores.some(v => v === null || v === '')) return false;
    } catch (e) {
      console.error(`❌ Error parseando sección ${i}:`, e);
      return false;
    }
  }
  return true;
}


 private habilitarPanelesDeSeccion(): void {
    Object.keys(this.mostrar).forEach(key => (this.mostrar as any)[key] = true);
  }


cargarDatosUsuario(): void {
  this.usuarioRolService.obtenerDatosUsuario().subscribe({
    next: (usuario: any | null) => {
      if (!usuario) {
        console.warn('⚠️ No se obtuvieron datos de usuario, usando token');
        this.setEntrevistadorFromToken();
        return;
      }

      const update: any = {};

      if (usuario.codiDepeTde) update.codiDepeTde = usuario.codiDepeTde;
      if (usuario.txtDescDepeTde) update.txtDescDepeTde = usuario.txtDescDepeTde;
      if (usuario.usuarioUsu) update.usuRegistro = usuario.usuarioUsu;
      
      if (Object.keys(update).length > 0) {
        this.fichaForm.patchValue(update, { emitEvent: false });
        console.log('🟢 Ficha actualizada con datos de usuario:', update);
      } else {
        console.warn('⚠️ No hay valores válidos, usando token');
        this.setEntrevistadorFromToken();
      }
    },
    error: (error) => {
      console.error('❌ Error al cargar datos de usuario:', error);
      this.setEntrevistadorFromToken();
    }
  });
}



// --- Método cargarDatosUsuarioExterno con Logs ---
// En RegistrarFicha1Component.ts
private cargarDatosUsuarioExterno(): void {
    console.log('--- cargarDatosUsuarioExterno: Iniciando ---');

    const codUnicoEntidad = this.authService.getCodUnicoUsuario();
    const usuarioToken = this.obtenerUsuarioDelToken();
    
    console.log('codUnicoEntidad:', codUnicoEntidad);
    console.log('usuarioToken:', usuarioToken);

    if (!codUnicoEntidad || !usuarioToken) {
        console.error('❌ COD_UNICO o Usuario nulo');
        this.setEntrevistadorFromToken();
        return;
    }

    // Setear datos básicos
    this.fichaForm.patchValue({ 
        entrevNombre: usuarioToken,
        usuRegistro: usuarioToken
    }, { emitEvent: false });

    // Cargar datos de la entidad
    this.fichaService.obtenerDatosEntidadPorCodUnico(codUnicoEntidad).subscribe({
        next: (datosEntidad) => {
            console.log('✅ Datos de entidad recibidos:', datosEntidad);
            if (datosEntidad) {
                // ✅ CONFIGURAR FLAGS PARA BLOQUEAR
                this.entidadReadonly = true;
                this.entidadValida = true;
                this.mostrarBotonHabilitar = false; 
                
                // ✅ PATCH VALUE CON DATOS DE LA ENTIDAD
                this.fichaForm.patchValue({
                    entidadNombre: datosEntidad.nom_entidad, 
                   // entidadRuc: datosEntidad.ruc, 
                    codUnico: datosEntidad.cod_unico, 
                    entidadPais: datosEntidad.des_departament,
                    entidadLugares: datosEntidad.des_provincia,
                    nombreJefeConsular: datosEntidad.nom_autoridad,
                    funcTel: datosEntidad.telefono,
                    funcTelEmergencia: datosEntidad.telef_emer
                }, { emitEvent: false });
                
              //  this.fichaForm.get('entidadNombre')?.disable(); 
                console.log('✅ Campo entidadNombre bloqueado para usuario externo');
            }
        },
        error: (err) => {
            console.error('❌ ERROR al obtener datos de entidad:', err);
            this.mostrarBotonHabilitar = false;
        }
    });
}

 private verificarCamposInvalidos(): void {
    console.warn('--- INICIO DE VERIFICACIÓN DE Formulario Incompleto (S1) ---');
    Object.keys(this.fichaForm.controls).forEach(nombreControl => {
      const control = this.fichaForm.get(nombreControl);
      if (control && control.invalid) {
        console.log(`❌ Campo Inválido: '%c${nombreControl}'`, 'color: red; font-weight: bold;', {
          valor: control.value,
          estado: control.status,
          errores: control.errors
        });
      }
    });
    console.warn('--- FIN DE VERIFICACIÓN ---');
  }


 private setupAllFormListeners(): void {
  const brindaCtrl = this.g('brindaAtencionExtra');
  const selectDia  = this.g('atencionExtraDia');

  brindaCtrl.valueChanges.pipe(startWith(brindaCtrl.value as SN)).subscribe((v: SN) => {
    if (v === 'S') {
      this.enableRequired(selectDia);
      // OFF motivos
      this.GROUP_MotivoE.forEach(k => {
        const c = this.g(k)!;
        c.setValue(false, { emitEvent: false });
        c.clearValidators();
        c.disable({ emitEvent: false });
        c.updateValueAndValidity({ emitEvent: false });
      });
    } else if (v === 'N') {
      this.disableAndClear(selectDia);
      // ON motivos
      this.GROUP_MotivoE.forEach(k => {
        const c = this.g(k)!;
        c.enable({ emitEvent: false });
        c.updateValueAndValidity({ emitEvent: false });
      });
    } else {
      this.disableAndClear(selectDia);
      this.GROUP_MotivoE.forEach(k => {
        const c = this.g(k)!;
        c.setValue(false, { emitEvent: false });
        c.clearValidators();
        c.disable({ emitEvent: false });
        c.updateValueAndValidity({ emitEvent: false });
      });
    }
    // revalida raíz (vive el validador de motivos)
    this.fichaForm.updateValueAndValidity({ emitEvent: false });
  });

  // Emergencia
  const emergCtrl = this.g('atencionEmergencia');
  emergCtrl.valueChanges.pipe(startWith(emergCtrl.value as SN)).subscribe((v: SN) => {
    const hi = this.g('horaEmergenciaInicio');
    const hf = this.g('horaEmergenciaFin');
    if (v === 'S') {
      this.enableRequired(hi);
      this.enableRequired(hf);
    } else {
      this.disableAndClear(hi);
      this.disableAndClear(hf);
    }
  });
}

  // =========================
  // Validador del subgrupo
  // =========================

private motivosRequiredWhenNo(): ValidatorFn {
  return (fg: AbstractControl): ValidationErrors | null => {
    const opcion = fg.get('brindaAtencionExtra')?.value as 'S' | 'N' | null;
    if (opcion !== 'N') return null;
    const anyChecked = this.GROUP_MotivoE.some(k => !!fg.get(k)?.value);
    return anyChecked ? null : { motivosRequired: true };
  };
}


private motivosRequiredWhenNoCA(): ValidatorFn {
  return (fg: AbstractControl): ValidationErrors | null => {
    const anyChecked = this.GROUP_CA.some(k => !!fg.get(k)?.value);
    return anyChecked ? null : { motivosRequired: true };
  };
}

  // =========================
  // Utilidades mínimas
  // =========================
  private enableRequired(ctrl: AbstractControl) {
    ctrl.enable({ emitEvent: false });
    ctrl.addValidators(Validators.required);
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  private disableAndClear(ctrl: AbstractControl) {
    ctrl.clearValidators();
    ctrl.setValue(null, { emitEvent: false });
    ctrl.disable({ emitEvent: false });
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  private enableGroup(group: FormGroup) {
    Object.values(group.controls).forEach(c => c.enable({ emitEvent: false }));
  }

  private disableGroupAndClear(group: FormGroup) {
    Object.values(group.controls).forEach((c: AbstractControl) => {
      c.setValue(false, { emitEvent: false });
      c.clearValidators();
      c.disable({ emitEvent: false });
      c.updateValueAndValidity({ emitEvent: false });
    });
  }

  // =========================
  // Getters/Helpers
  // =========================


  /**
   * Helper para TS: obtiene un control por ruta (evita el conflicto con `get f()` del HTML).
   * Usa this.g('campo') en lugar de f('campo').
   */
  private g(path: string): AbstractControl {
    return this.fichaForm.get(path)!;
  }

  /**
   * Si ya tienes en tu componente:
   *   get f() { return this.fichaForm.controls; }
   * NO lo toques. Sigue funcionando para el HTML: f['brindaAtencionExtra'], etc.
   */

  /** Subgrupo de motivos */
  get motivos(): FormGroup {
    return this.fichaForm.get('motivos') as FormGroup;
  }

    /** =========================
 *  HELPERS NÚMEROS / SETTERS
 *  ========================= */
private n = (k: string): number =>
  Number(this.fichaForm.get(k)?.value || 0);

private set = (k: string, v: number) => {
  const c = this.fichaForm.get(k);
  if (!c) return;
  if (c.disabled) c.enable({ emitEvent: false }); 
  c.setValue(v, { emitEvent: false });
  c.updateValueAndValidity({ emitEvent: false });
};

/** ==========================================================
 *  1) FUNCIONARIOS/AS CONSULARES (A..F) + columna "Total"
 *  Campos:
 *   - Hombres:  nroAHombres..nroFHombres,  nroTotalHombres (columna Total)
 *   - Mujeres:  nroAMujeres..nroFMujeres,  nroTotalMujeres (columna Total)
 *   - TOTAL( por columna ): nroATotalHombres..nroFTotalHombres
 *   - TOTAL final (última celda): nroGTotalHombres
 *  ========================================================== */
private colsConsulares = ['A','B','C','D','E','F'];

private recomputeConsulares(): void {
  // Totales por columna (A..F)
  let sumaH = 0, sumaM = 0, sumaTotCol = 0;

  this.colsConsulares.forEach(col => {
    const h = this.n(`nro${col}Hombres`);
    const m = this.n(`nro${col}Mujeres`);
    const totCol = h + m;

    this.set(`nro${col}TotalHombres`, totCol);

    sumaH += h;
    sumaM += m;
    sumaTotCol += totCol;
  });

  // Totales de filas (columna "Total")
  this.set('nroTotalHombres', sumaH);
  this.set('nroTotalMujeres', sumaM);

  // TOTAL final (última celda TOTAL)
  this.set('nroGTotalHombres', sumaTotCol);
}

/** Suscriptores para disparar la suma de consulares */
private wireConsulares(): void {
  const keys: string[] = [];
  this.colsConsulares.forEach(col => {
    keys.push(`nro${col}Hombres`, `nro${col}Mujeres`);
  });

  keys.forEach(k => {
    this.fichaForm.get(k)?.valueChanges.subscribe(() => this.recomputeConsulares());
  });

  // cálculo inicial
  this.recomputeConsulares();
}


/** ==========================================================
 *  2) TABLA "Personal administrativo" (sufijo Pa)
 *  Columnas: Peruanos, Extranjeros, Nacionalidad, Total
 *  Filas:    Nº Hombres, Nº Mujeres, TOTAL
 *  Reglas:
 *   tPeruanasPa     = hPeruanosPa + mPeruanasPa
 *   tExtranjerasPa  = hExtranjerosPa + mExtranjerasPa
 *   tNacionalidadPa = hNacionalidadPa + mNacionalidadPa
 *   hTotalPa        = hPeruanosPa + hExtranjerosPa + hNacionalidadPa
 *   mTotalPa        = mPeruanasPa + mExtranjerasPa + mNacionalidadPa
 *   tTotalPa        = tPeruanasPa + tExtranjerasPa + tNacionalidadPa
 *  ========================================================== */
private recomputePa(): void {
  const hPer = this.n('hPeruanosPa');
  const hExt = this.n('hExtranjerosPa');
  //const hNac = this.n('hNacionalidadPa');

  const mPer = this.n('mPeruanasPa');
  const mExt = this.n('mExtranjerasPa');
 // const mNac = this.n('mNacionalidadPa');

  const tPer = hPer + mPer;
  const tExt = hExt + mExt;
  //const tNac = hNac + mNac;

  const hTot = hPer + hExt ;
  const mTot = mPer + mExt ;
  //const tTot = tPer + tExt + tNac;
  const tTot = tPer + tExt ;


  this.set('tPeruanasPa', tPer);
  this.set('tExtranjerasPa', tExt);
 // this.set('tNacionalidadPa', tNac);

  this.set('hTotalPa', hTot);
  this.set('mTotalPa', mTot);
  this.set('tTotalPa', tTot);
}

private wirePa(): void {
  const keys = [
    'hPeruanosPa','hExtranjerosPa','hNacionalidadPa',
    'mPeruanasPa','mExtranjerasPa','mNacionalidadPa'
  ];
  keys.forEach(k => this.fichaForm.get(k)?.valueChanges.subscribe(() => this.recomputePa()));
  this.recomputePa();
}

/** ==========================================================
 *  3) TABLA "Personal de servicio" (sufijo Ps)
 *  Misma lógica que Pa, cambiando sufijos a Ps
 *  ========================================================== */
private recomputePs(): void {
  const hPer = this.n('hPeruanosPs');
  const hExt = this.n('hExtranjerosPs');
 // const hNac = this.n('hNacionalidadPs');

  const mPer = this.n('mPeruanasPs');
  const mExt = this.n('mExtranjerasPs');
  //const mNac = this.n('mNacionalidadPs');

  const tPer = hPer + mPer;
  const tExt = hExt + mExt;
  //const tNac = hNac + mNac;

  const hTot = hPer + hExt ;
  const mTot = mPer + mExt ;
  const tTot = tPer + tExt ;

  this.set('tPeruanasPs', tPer);
  this.set('tExtranjerasPs', tExt);
  //this.set('tNacionalidadPs', tNac);

  this.set('hTotalPs', hTot);
  this.set('mTotalPs', mTot);
  this.set('tTotalPs', tTot);
}

private wirePs(): void {
  const keys = [
    'hPeruanosPs','hExtranjerosPs','hNacionalidadPs',
    'mPeruanasPs','mExtranjerasPs','mNacionalidadPs'
  ];
  keys.forEach(k => this.fichaForm.get(k)?.valueChanges.subscribe(() => this.recomputePs()));
  this.recomputePs();
}

/** ==========================================================
 *  4) TABLA "Voluntarios" (sufijo V)
 *  Misma lógica que Pa/Ps, cambiando sufijos a V
 *  ========================================================== */
private recomputeV(): void {
  const hPer = this.n('hPeruanosV');
  const hExt = this.n('hExtranjerosV');
 // const hNac = this.n('hNacionalidadV');

  const mPer = this.n('mPeruanasV');
  const mExt = this.n('mExtranjerasV');
//  const mNac = this.n('mNacionalidadV');

  const tPer = hPer + mPer;
  const tExt = hExt + mExt;
//  const tNac = hNac + mNac;

  const hTot = hPer + hExt ;
  const mTot = mPer + mExt ;
  const tTot = tPer + tExt ;

  this.set('tPeruanasV', tPer);
  this.set('tExtranjerasV', tExt);
 // this.set('tNacionalidadV', tNac);

  this.set('hTotalV', hTot);
  this.set('mTotalV', mTot);
  this.set('tTotalV', tTot);
}

private wireV(): void {
  const keys = [
    'hPeruanosV','hExtranjerosV','hNacionalidadV',
    'mPeruanasV','mExtranjerasV','mNacionalidadV'
  ];
  keys.forEach(k => this.fichaForm.get(k)?.valueChanges.subscribe(() => this.recomputeV()));
  this.recomputeV();
}

/** Llama a estos en ngOnInit(), después de buildForm(): */
private wireAllTables(): void {
  this.wireConsulares();
  this.wirePa();
  this.wirePs();
  this.wireV();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/** ===== Helpers rápidos ===== */
private gx = (k: string) => this.fichaForm.get(k)!;
private setx = (k: string, v: any) => this.gx(k).setValue(v, { emitEvent: false });

/** % 0..100 */
private percentRange(): ValidatorFn {
  return (c: AbstractControl) => {
    const v = c.value;
    if (v === null || v === '' || v === undefined) return null;
    const n = Number(v);
    return !Number.isFinite(n) || n < 0 || n > 100 ? { percentRange: true } : null;
  };
}

/** Reaplica required + percentRange a un control (%) cuando corresponde */
private enablePercentRequired(ctrl: AbstractControl) {
  ctrl.enable({ emitEvent: false });
  ctrl.setValidators([Validators.required, this.percentRange()]);
  ctrl.updateValueAndValidity({ emitEvent: false });
}


/** Valida y ajusta una fila (año) según la regla del cuadro */
private updateYearRow(prefix: 'p2223' | 'p2224' | 'p2225') {
  const A = this.gx(`${prefix}a`).value as 'S' | 'N' | '' | null;
  const B = this.gx(`${prefix}b`).value as 'S' | 'N' | '' | null; // Sí/No
  const D = this.gx(`${prefix}d`).value as 'S' | 'N' | '' | null; // Sí/No
  const Cc = this.gx(`${prefix}c`);
  const Ec = this.gx(`${prefix}e`);
  const Fc = this.gx(`${prefix}f`);

  // F siempre habilitado con % 0..100
  Fc.enable({ emitEvent: false });
  Fc.removeValidators(Validators.required);
  Fc.addValidators(this.percentRange());
  Fc.updateValueAndValidity({ emitEvent: false });

  // Si A = "S" (monto igual) => B, C, D, E no aplican
  if (A === 'S') {
    // B y D se muestran como select pero no aplican
    const Bb = this.gx(`${prefix}b`);
    const Dd = this.gx(`${prefix}d`);
    this.disableAndClear(Bb);
    this.disableAndClear(Dd);

    // C y E %
    this.disableAndClear(Cc);
    this.disableAndClear(Ec);
    // Marcadores de error de fila
    this.clearRowError(prefix);
    return;
  }

  // A !== "S"  (A = "N" o vacío) => B y D habilitados como Sí/No,
  // C requerido si B="S", E requerido si D="S".
  const Bb = this.gx(`${prefix}b`);
  const Dd = this.gx(`${prefix}d`);
  Bb.enable({ emitEvent: false });
  Dd.enable({ emitEvent: false });

  // Exclusión mutua B vs D
  if (B === 'S') {
    // Si B=Sí -> reducción => D debe ser "N" o vacío y E apagado
    if (Dd.value === 'S') this.setx(`${prefix}d`, 'N');
    this.enablePercentRequired(Cc);     // C requerido %
    this.disableAndClear(Ec);           // E no aplica
  } else if (D === 'S') {
    // Si D=Sí -> incremento => B debe ser "N" o vacío y C apagado
    if (Bb.value === 'S') this.setx(`${prefix}b`, 'N');
    this.enablePercentRequired(Ec);     // E requerido %
    this.disableAndClear(Cc);           // C no aplica
  } else {
    // No eligió B ni D => C y E apagados
    this.disableAndClear(Cc);
    this.disableAndClear(Ec);
  }

  // Error de fila: cuando A="N" debe elegir exactamente uno de B o D como "S"
  const needsChoice = (A === 'N');
  const exactlyOne =
    (B === 'S' && D !== 'S') || (D === 'S' && B !== 'S');

  if (needsChoice && !exactlyOne) {
    this.setRowError(prefix, true);
  } else {
    this.clearRowError(prefix);
  }
}

/** Flag interno de error por fila (para pintar mensaje en el template) */
rowErr: Record<'p2223'|'p2224'|'p2225', boolean> = { p2223: false, p2224: false, p2225: false };
private setRowError(prefix: 'p2223'|'p2224'|'p2225', v: boolean) { this.rowErr[prefix] = v; }
private clearRowError(prefix: 'p2223'|'p2224'|'p2225') { this.rowErr[prefix] = false; }

/** Suscripciones y aplicación inicial */
private wireP22() {
  (['p2223','p2224','p2225'] as const).forEach(prefix => {
    ['a','b','c','d','e','f'].forEach(suffix => {
      this.g(`${prefix}${suffix}`).valueChanges.subscribe(() => this.updateYearRow(prefix));
    });
    // Estado inicial
    this.updateYearRow(prefix);
  });
}


private enableRequiredMayor0(ctrl: AbstractControl | null, validators: ValidatorFn[] = [Validators.required]): void {
  if (!ctrl) return;
  ctrl.enable({ emitEvent: false });
  ctrl.setValidators(validators);
  ctrl.updateValueAndValidity({ emitEvent: false });
}

private disableSoftWithNull(ctrl: AbstractControl | null): void {
  if (!ctrl) return;
  ctrl.clearValidators();
  ctrl.setValue(null, { emitEvent: false });
  ctrl.disable({ emitEvent: false });
  ctrl.updateValueAndValidity({ emitEvent: false });
}

// private ctrl(path: string): AbstractControl | null {
//   return this.fichaForm.get(path);
// }

private bindCantidadHabilitaNacionalidad(countKey: string, nationalityKey: string): void {
  const countCtrl = this.ctrl(countKey);
  const natCtrl   = this.ctrl(nationalityKey);
  if (!countCtrl || !natCtrl) return;

  const apply = (val: any) => {
    const n = (val === '' || val === null || val === undefined) ? null : Number(val);
    const ok = n !== null && Number.isFinite(n) && n > 0;

    if (ok) {
      natCtrl.enable({ emitEvent: false });
      natCtrl.setValidators([Validators.required]);
    } else {
      natCtrl.clearValidators();
      natCtrl.setValue(null, { emitEvent: false });
      natCtrl.disable({ emitEvent: false });
    }
    natCtrl.updateValueAndValidity({ emitEvent: false });
    this.cdr.markForCheck?.();
  };

  apply(countCtrl.value);
  countCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
}

ngOnInit(): void {
  console.log('--- ngOnInit: Iniciando componente ---');

  this.bindCantidadHabilitaNacionalidad('hExtranjerosPa', 'hNacionalidadPa');
  this.bindCantidadHabilitaNacionalidad('mExtranjerasPa', 'mNacionalidadPa');
  this.bindCantidadHabilitaNacionalidad('tExtranjerasPa', 'tNacionalidadPa');


    this.bindCantidadHabilitaNacionalidad('hExtranjerosPs', 'hNacionalidadPs');
  this.bindCantidadHabilitaNacionalidad('mExtranjerasPs', 'mNacionalidadPs');
  this.bindCantidadHabilitaNacionalidad('tExtranjerasPs', 'tNacionalidadPs');

    this.bindCantidadHabilitaNacionalidad('hExtranjerosV', 'hNacionalidadV');
  this.bindCantidadHabilitaNacionalidad('mExtranjerasV', 'mNacionalidadV');
  this.bindCantidadHabilitaNacionalidad('tExtranjerasV', 'tNacionalidadV');

  // 1) Detectar tipo de usuario primero
  const rolez = this.authService.getScopes() || [];
  this.esExterno = rolez.includes(this.rolOficinaConsular);
  console.log(`ngOnInit - Roles: [${rolez.join(', ')}], ¿Es Externo?: ${this.esExterno}`);

  // 2) Validadores y listeners base
  this.cargarDatosUsuario();
  this.fichaForm.addValidators(this.motivosRequiredWhenNo());
  this.fichaForm.addValidators(this.motivosRequiredWhenNoCA());
  this.setupAllFormListeners();
  this.wireAllTables();
  this.wireP22();

  // 3) Suscripciones de estados de sección (con takeUntil)
  SECCIONES.forEach(key => {
    this.fichaForm.get(`estado_${key}`)?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(valor => {
        if (valor === 'I') this.validadas[key] = false;
      });
  });

  // 4) Cargar datos según tipo de usuario
  if (this.esExterno) {
    console.log('ngOnInit - Usuario EXTERNO detectado');
    this.cargarDatosUsuarioExterno();
    // No se configura autocomplete ni se carga padrón para externos
  } else {
    console.log('ngOnInit - Usuario INTERNO detectado');

    // 4.1 Datos del entrevistador interno
    this.fichaService.obtenerDatosEntrevistador()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Datos del entrevistador interno:', data);
          if (!data) {
            this.setEntrevistadorFromToken();
            return;
          }
          this.fichaForm.patchValue({
            txtDescDepeTde: data.txt_desc_depe_tde ?? null,
            entrevNombre:   data.txt_comisionado ?? data.usuarioUsu ?? this.obtenerUsuarioDelToken(),
            usuRegistro:    data.usuarioUsu ?? this.obtenerUsuarioDelToken()
          }, { emitEvent: false });
        },
        error: (err) => {
          console.error('Error al obtener datos de entrevistador:', err);
          this.setEntrevistadorFromToken();
        }
      });

    // 4.2 Padrón (una sola vez) + filtro autocomplete
    this.fichaService.obtenerPadron()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // Orden personalizado
          this.padronList = data.sort((a, b) => {
            const getClave = (nombre: string) => {
              const palabras = nombre.split(' ');
              return palabras.length >= 4 ? palabras.slice(3).join(' ') : palabras.join(' ');
            };
            const claveA = getClave(a.nom_entidad).toLowerCase();
            const claveB = getClave(b.nom_entidad).toLowerCase();
            return claveA.localeCompare(claveB);
          });

          // Para onEntidadBlur()
          this.cargarEntidadesDisponibles(this.padronList);

          // Autocomplete SIEMPRE mapea a string => array
          const ctrlEntidad = this.fichaForm.get('entidadNombre')!;
          this.entidadesFiltradas = ctrlEntidad.valueChanges.pipe(
            startWith(ctrlEntidad.value || ''),
            map(v => typeof v === 'string' ? v : (v?.nom_entidad ?? '')),
            map(nombre => this._filtrarEntidades(nombre))
          );

          console.log(`✅ Padrón cargado: ${this.padronList.length} entidades`);
        },
        error: (err) => console.error('❌ Error al obtener padrón:', err)
      });
  }

  // 5) Manejo de ruta (edición vs nuevo)
  this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      const idFicha = params.get('id');
      if (idFicha) {
        this.modoEdicion = true;
        this.idFichaGuardado = +idFicha;
        this.fichaForm.reset();
        SECCIONES.forEach(k => {
          this.mostrar[k] = false;
          this.completadas[k] = false;
        });
        this.cargarFichaCompleta(this.idFichaGuardado);
      } else {
        this.modoEdicion = false;
        this.idFichaGuardado = null;
        this.fichaForm.reset();
        SECCIONES.forEach(k => {
          this.mostrar[k] = false;
          this.completadas[k] = false;
        });
      }
    });

  // 6) Restaurar estado de secciones
  const seccionesGuardadas = localStorage.getItem('pantbc_secciones');
  if (seccionesGuardadas) this.mostrar = JSON.parse(seccionesGuardadas);

  const completadasGuardadas = localStorage.getItem('pantbc_completadas');
  if (completadasGuardadas) {
    this.completadas = JSON.parse(completadasGuardadas);
  } else {
    SECCIONES.forEach(k => this.completadas[k] = false);
  }

  // 7) Validadores dinámicos (solo si existen controles)
  const nivelPca = this.fichaForm.get('nivelPca');
  nivelPca?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((valor) => {
      const detalleControl = this.fichaForm.get('nivelDetallePca');
      if (valor === 'E') {
        detalleControl?.setValidators([Validators.required, Validators.maxLength(498)]);
      } else {
        detalleControl?.clearValidators();
        detalleControl?.setValue('', { emitEvent: false });
      }
      detalleControl?.updateValueAndValidity({ emitEvent: false });
    });

  const timeFuncioPca = this.fichaForm.get('timeFuncioPca');
  timeFuncioPca?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((valor) => {
      const detalleControl = this.fichaForm.get('timeFuncioDetallePca');
      if (valor === 'F') {
        detalleControl?.setValidators([Validators.required, Validators.maxLength(498)]);
      } else {
        detalleControl?.clearValidators();
        detalleControl?.setValue('', { emitEvent: false });
      }
      detalleControl?.updateValueAndValidity({ emitEvent: false });
    });

  console.log('📋 Valor actual de txtDescDepeTde:', this.fichaForm.get('txtDescDepeTde')?.value);
  console.log('--- ngOnInit: Finalizado ---');
}


// private obtenerUsuarioDelToken(): string | null {
//     // Reutiliza la lógica de tu AuthService si es posible, o impleméntala aquí
//     return this.authService.getCodUnicoUsuario(); // O como la hayas llamado
// }

  obtenerUsuarioDelToken(): string | null {
  try {
    const token = localStorage.getItem(this.varToken);
    
    if (!token) {
      console.warn('⚠️ No hay token disponible');
      return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || null;
  } catch (error) {
    console.error('❌ Error al decodificar token:', error);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    return null;
  }
}
    private _filtrarEntidades(valor: string): any[] {
    const valorLower = valor.toLowerCase();
    return this.padronList.filter(entidad =>
      entidad.nom_entidad.toLowerCase().includes(valorLower)
    );
  }


  
entidadReadonly: boolean = false;
entidadValida: boolean = false;
entidadesDisponibles: any[] = []; // Array con todas las entidades disponibles



onEntidadSelected(event: MatAutocompleteSelectedEvent): void {

  const nombreSeleccionado = event.option.value;
  this.entidadValida = true;
  this.entidadReadonly = true;

  const seleccionado = this.padronList.find(p => p.nom_entidad === nombreSeleccionado);
  if (!seleccionado) return;

  this.fichaForm.patchValue({
   // entidadRuc: seleccionado.ruc,
    codUnico: seleccionado.cod_unico,
     entidadPais: seleccionado.des_departament,
     entidadLugares: seleccionado.des_provincia,
    // entidadDistrito: seleccionado.des_distrito,
   // entidadCorreo: seleccionado.correo,
    nombreJefeConsular:seleccionado.nom_autoridad,
    funcTel: seleccionado.telefono,
    funcTelEmergencia: seleccionado.telef_emer
  }, { emitEvent: false });

  // ✅ Solo verificar duplicados si es NUEVO registro
  if (!this.idFichaGuardado) {
    this.fichaService.verificarEntidadActiva(seleccionado.nom_entidad).subscribe({
      next: (existeActiva) => {
        const control = this.fichaForm.get('entidadNombre');
        control?.setErrors(existeActiva ? { entidadDuplicada: true } : null);
        if (existeActiva) console.warn('⚠️ Ya existe una ficha ACTIVA para esta entidad.');
      },
      error: (err) => console.error('❌ Error al verificar entidad activa:', err)
    });
  } else {
    // si en algún momento validas en edición, podrías usar:
    // this.fichaService.verificarEntidadActiva(seleccionado.nom_entidad, this.idFichaGuardado)...
    const control = this.fichaForm.get('entidadNombre');
    const errores = control?.errors;
    if (errores && errores['entidadDuplicada']) {
      delete errores['entidadDuplicada'];
      control?.setErrors(Object.keys(errores).length ? errores : null);
    }
  }
}


// 3. Método para validar cuando el usuario pierde el foco del campo (blur)
onEntidadBlur(): void {
  // ⛔ Si el campo está en readonly, no validar ni tocar errores
  if (this.entidadReadonly) return;

  const valorIngresado = this.fichaForm.get('entidadNombre')?.value;

  if (!valorIngresado || valorIngresado.trim() === '') {
    this.entidadValida = false;
    this.entidadReadonly = false;
    return;
  }

  const entidadEncontrada = this.entidadesDisponibles.find(
    entidad => entidad.nom_entidad === valorIngresado
  );

  if (entidadEncontrada) {
    this.entidadValida = true;
    this.entidadReadonly = true;
    console.log('✅ Entidad válida por escritura exacta');
  } else {
    this.entidadValida = false;
    this.entidadReadonly = false;
    this.fichaForm.get('entidadNombre')?.setErrors({ entidadNoValida: true });
    console.log('❌ Texto ingresado no es una entidad válida');
  }
}

// 4. Método para validar mientras escribe (input)
onEntidadInput(): void {
  const valorActual = this.fichaForm.get('entidadNombre')?.value;
  
  // Si está escribiendo después de haber seleccionado algo, resetear validación
  if (this.entidadValida && !this.entidadReadonly) {
    this.entidadValida = false;
    
    // Limpiar el error personalizado si existe
    const errores = this.fichaForm.get('entidadNombre')?.errors;
    if (errores && errores['entidadNoValida']) {
      delete errores['entidadNoValida'];
      if (Object.keys(errores).length === 0) {
        this.fichaForm.get('entidadNombre')?.setErrors(null);
      } else {
        this.fichaForm.get('entidadNombre')?.setErrors(errores);
      }
    }
  }
}



// 6. Método para limpiar completamente
limpiarEntidad(): void {
  this.fichaForm.get('entidadNombre')?.setValue('');
  this.entidadReadonly = false;
  this.entidadValida = false;
  this.fichaForm.get('entidadNombre')?.setErrors(null);
  
  console.log('Campo limpiado');
}

// 7. Método para inicializar las entidades disponibles
// LLAMA ESTE MÉTODO cuando cargues las entidades desde el backend
cargarEntidadesDisponibles(entidades: any[]): void {
  this.entidadesDisponibles = entidades;
}

// 8. Getters para el template
private _mostrarBotonHabilitarOverride: boolean | null = null;

get mostrarBotonHabilitar(): boolean {
  return this._mostrarBotonHabilitarOverride !== null
    ? this._mostrarBotonHabilitarOverride
    : (this.entidadReadonly && !!this.fichaForm.get('entidadNombre')?.value);
}

set mostrarBotonHabilitar(value: boolean) {
  this._mostrarBotonHabilitarOverride = value;
}

get tieneErrorEntidadNoValida(): boolean {
  return this.fichaForm.get('entidadNombre')?.hasError('entidadNoValida') || false;
}

get campoEstaVacio(): boolean {
  const valor = this.fichaForm.get('entidadNombre')?.value;
  return !valor || valor.trim() === '';
}
///////////////////////////////////////////////////////////////////

// private setEntrevistadorFromToken(): void {
//   const usuario = this.obtenerUsuarioDelToken();
//   this.fichaForm.patchValue({
//     codiDepeTde: null,
//     txtDescDepeTde: null,
//     usuRegistro: usuario
//   }, { emitEvent: false });
// }

/**
 * Parchea solo los campos que existen en el formulario.
 * Evita errores si algún control no está presente en este layout.
 */
private safePatch(values: Record<string, any>): void {
  const safe: Record<string, any> = {};
  Object.keys(values).forEach(k => {
    if (this.fichaForm.contains(k)) safe[k] = values[k];
  });
  this.fichaForm.patchValue(safe, { emitEvent: false });
}

private setEntrevistadorFromToken(): void {
  const usuario = this.obtenerUsuarioDelToken();

  if (!usuario) {
    console.warn('⚠️ No se pudo obtener usuario del token');
    this.router.navigate(['/login']);
    return;
  }

  // 🔐 Parcheo seguro
  this.safePatch({
    codiDepeTde: null,
    txtDescDepeTde: null,
    usuRegistro: usuario
  });

  console.log('🟢 Usuario del token asignado:', usuario);
   


}



      get txtDescDepeTdeControl(): FormControl {
      return this.fichaForm.get('txtDescDepeTde') as FormControl;
    }
    
    get txtComisionadoControl(): FormControl {
      return this.fichaForm.get('txt_comisionado') as FormControl;
    
    }

  guardarFichaCompleta(): void {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  
    const dto = {
      ficha: this.fichaForm.value,
      ficha1: JSON.parse(localStorage.getItem('pantbc_s1') || '{}'),
      ficha2: JSON.parse(localStorage.getItem('pantbc_s2') || '{}'),
      ficha3: JSON.parse(localStorage.getItem('pantbc_s3') || '{}'),
      ficha4: JSON.parse(localStorage.getItem('pantbc_s4') || '{}'),
      ficha5: JSON.parse(localStorage.getItem('pantbc_s5') || '{}'),
      ficha6: JSON.parse(localStorage.getItem('pantbc_s6') || '{}'),
      ficha7: JSON.parse(localStorage.getItem('pantbc_s7') || '{}'),
      ficha8: JSON.parse(localStorage.getItem('pantbc_s8') || '{}'),
      ficha9: JSON.parse(localStorage.getItem('pantbc_s9') || '{}'),
      ficha10: JSON.parse(localStorage.getItem('pantbc_s10') || '{}'),
      ficha11: JSON.parse(localStorage.getItem('pantbc_s11') || '{}'),
      ficha12: JSON.parse(localStorage.getItem('pantbc_s12') || '{}'),
      ficha13: JSON.parse(localStorage.getItem('pantbc_s13') || '{}'),


    };
  
    dto.ficha.idFicha = this.idFichaGuardado;
    dto.ficha1.idFichas1 = this.idFichaGuardado;
    dto.ficha2.idFichas2 = this.idFichaGuardado;
    dto.ficha3.idFichas3 = this.idFichaGuardado;
    dto.ficha4.idFichas4 = this.idFichaGuardado;
    dto.ficha5.idFichas5 = this.idFichaGuardado;
    dto.ficha6.idFichas6 = this.idFichaGuardado;
    dto.ficha7.idFichas7 = this.idFichaGuardado;
    dto.ficha8.idFichas8 = this.idFichaGuardado;
    dto.ficha9.idFichas9 = this.idFichaGuardado;
    dto.ficha10.idFichas10 = this.idFichaGuardado;
   dto.ficha11.idFichas11 = this.idFichaGuardado;
    dto.ficha12.idFichas12 = this.idFichaGuardado;
    dto.ficha13.idFichas13 = this.idFichaGuardado;
    

    const todasCompletadas = Object.values(this.completadas).every(val => val === true);
    dto.ficha.estado = todasCompletadas ? 'C' : 'I';
  
    this.http.post('/api/ficha1/guardarFichaCompleta', dto, { headers }).subscribe({
      next: () => {
        this.mensajeEstadoFicha = dto.ficha.estado;

  
        if (dto.ficha.estado === 'C') {
          Swal.fire('Éxito', 'Felicidades, ficha guardada completa.', 'success');
        } else {
          Swal.fire('Aviso', 'Aún falta completar el llenado de la ficha.', 'info');
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo guardar la ficha completa.', 'error');
      }
    });
  }
  

  get estadoFichaMensaje(): { texto: string; clase: string } | null {
    if (this.mensajeEstadoFicha === 'I') {
      return { texto: 'Registro de ficha incompleta', clase: 'alert-warning' };
    } else if (this.mensajeEstadoFicha === 'C') {
      return { texto: 'Registro de ficha completa', clase: 'alert-success' };
    }
    return null;
  }

  estadoSecciones = {
  s1: 'I',
  s2: 'I',
  s3: 'I',
  s4: 'I',
  s5: 'I',
  s6: 'I',
  s7: 'I',
  s8: 'I',
  s9: 'I',
  s10: 'I'
};

actualizarFichaComoCompleta(): void {
  if (this.idFichaGuardado) {
    this.http.put(`${environment.api_url}/api/ficha1/marcarcompleta/${this.idFichaGuardado}`, {}).subscribe({
      next: () => {
        console.log('Ficha marcada como completa');
      },
      error: err => {
        console.error('Error al marcar como completa', err);
      }
    });
  }
}



 private evaluarEstadoFichaCompleta(): void {
    const todosCompletos = Object.values(this.completadas).every(c => c === true);
    this.mensajeEstadoFicha = todosCompletos ? 'C' : 'I';
    if (todosCompletos) {
      this.actualizarFichaComoCompleta();
    }
  }

/////////////////////////////////////////////
permitirSoloLetrasEspacios(event: KeyboardEvent): void {
  const tecla = event.key;

  // Permitir teclas de control
  const teclasPermitidas = [
    'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'
  ];

  const esLetra = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]$/.test(tecla);

  if (!esLetra && !teclasPermitidas.includes(tecla)) {
    event.preventDefault(); // Bloquea la tecla
  }
}

convertirAMayusculas(controlName: string): void {
  const control = this.fichaForm.get(controlName);
  if (control) {
    const valor = control.value || '';
    control.setValue(valor.toUpperCase(), { emitEvent: false });
  }
}



private obtenerHeaders(): HttpHeaders | undefined {
  const token = localStorage.getItem('token');
  return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
}



datosFicha1: any; 
datosFicha2: any; 
datosFicha3: any; 
datosFicha4: any; 
datosFicha5: any; 
datosFicha6: any;
datosFicha7: any; 
datosFicha8: any; 
datosFicha9: any; 
datosFicha10: any; 
datosFicha11: any; 
datosFicha12: any; 
datosFicha13: any; 

  private parseLocalDate(fecha: any): Date | null {
  if (!fecha) return null;

  // Si viene ya como Date
  if (fecha instanceof Date) {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  }

  // Si viene como string tipo '2025-10-05T00:00:00' o '2025-10-05'
  const dateStr = fecha.toString().substring(0, 10); // toma solo YYYY-MM-DD
  const [year, month, day] = dateStr.split('-').map(Number);

  // ⚡️ Este constructor crea fecha local sin ajuste UTC
  return new Date(year, month - 1, day);
}


cargarFichaCompleta(id: number | null): void {
  if (!id) {
    console.warn("Intento de cargar ficha completa con un ID nulo. Operación cancelada.");
    return;
  }

  this.fichaService.obtenerFichaCompletaPorId(id).pipe(takeUntil(this.destroy$)).subscribe({
    next: (dto) => {
      this.fichaForm.reset();

      if (dto.ficha) {
 
      const mapped = {
          supFechaInicio: this.parseLocalDate(dto.ficha.supervisionFechaInicio),
          supFechaFin:    this.parseLocalDate(dto.ficha.supervisionFechaFin),
          // ... otros campos 1:1 que sí existan en tu form
        };
        // dto.ficha.supervisionFechaInicio = this.parseLocalDate(dto.ficha.supervisionFechaInicio);
        // dto.ficha.supervisionFechaFin = this.parseLocalDate(dto.ficha.supervisionFechaFin);

        console.log('🕓 Fecha original desde backend:', dto.ficha.supervisionFechaInicio);
        console.log('📅 Fecha normalizada en local:', dto.ficha.supervisionFechaFin);

        this.fichaForm.patchValue(dto.ficha);

       this.fichaForm.patchValue({
          funcCanalAtencionA: dto.ficha.funcCanalAtencionA === 'S',
          funcCanalAtencionB: dto.ficha.funcCanalAtencionB === 'S',
          funcCanalAtencionC: dto.ficha.funcCanalAtencionC === 'S',
          funcCanalAtencionD: dto.ficha.funcCanalAtencionD === 'S',
          motivoNoExtraA: dto.ficha.motivoNoExtraA === 'S',
          motivoNoExtraB: dto.ficha.motivoNoExtraB === 'S',
          motivoNoExtraC: dto.ficha.motivoNoExtraC === 'S',
        }, { emitEvent: false });


        this.idFichaGuardado = dto.ficha.idFicha;
        this.mensajeEstadoFicha = dto.ficha.estado ?? null;
        localStorage.setItem('fichaPantbc', JSON.stringify(dto.ficha));
      } else {
        console.warn('⚠️ dto.ficha es null para el ID:', id);
      }

      for (let i = 1; i <= 13; i++) {
        const key = `s${i}` as SeccionKey;
        const fichaKey = `ficha${i}` as keyof typeof dto;
        const datosSeccion = dto[fichaKey];
        const datosPropName = `datosFicha${i}`;

        if (datosSeccion) {
          (this as any)[datosPropName] = { ...datosSeccion, idFicha: this.idFichaGuardado };
          const estadoKey = `estado_${key}` as keyof typeof datosSeccion;
          const validaKey = `valida_${key}` as keyof typeof datosSeccion;
          this.completadas[key] = datosSeccion[estadoKey] === 'C';
          this.validadas[key] = datosSeccion[validaKey] === '1';
        } else {
          (this as any)[datosPropName] = { idFicha: this.idFichaGuardado };
        }
      }

      if (this.mostrar.s2) this.activarAutosaveS2 = !!this.idFichaGuardado;
      if (this.mostrar.s3) this.activarAutosaveS3 = !!this.idFichaGuardado;
      if (this.mostrar.s4) this.activarAutosaveS4 = !!this.idFichaGuardado;
      if (this.mostrar.s5) this.activarAutosaveS5 = !!this.idFichaGuardado;
      this.habilitarPanelesDeSeccion();
      this.evaluarEstadoFichaCompleta();
    },
    error: (err) => Swal.fire('Error', 'No se pudo cargar la ficha completa.', 'error')
  });
}

////////////////////FUNCTIONES VALIDACIÓN ////////////////
permitirSoloNumerosCel(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const tecla = event.key;
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (teclasPermitidas.includes(tecla)) {
      return;
    }
    const textoSeleccionado = input.selectionStart !== input.selectionEnd;
    if (valorActual.length >= 16 && !textoSeleccionado) {
      event.preventDefault();
      return;
    }
    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
    }
  }

permitirSoloNumeros(event: KeyboardEvent): void {
  // Obtenemos el elemento input para acceder a su valor y selección
  const input = event.target as HTMLInputElement;
  const valorActual = input.value;
  const tecla = event.key;
  
  // Teclas que siempre deben ser permitidas (para borrar, navegar, etc.)
  const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

  // 1. Si la tecla es una de las permitidas, no hacemos nada y dejamos que funcione.
  if (teclasPermitidas.includes(tecla)) {
    return;
  }

  // 2. Verificamos si ya se alcanzó la longitud máxima de 4 caracteres.
  //    Y nos aseguramos de que no haya texto seleccionado para ser reemplazado.
  const textoSeleccionado = input.selectionStart !== input.selectionEnd;
  if (valorActual.length >= 8 && !textoSeleccionado) {
    // Si ya hay 4 números y no se está reemplazando, prevenimos la acción.
    event.preventDefault();
    return;
  }

  // 3. Finalmente, nos aseguramos de que la tecla presionada sea un número.
  if (!/^[0-9]$/.test(tecla)) {
    event.preventDefault();
  }
}

/**
 * Permite la entrada de números en un input, restringiendo el valor
 * final a un máximo de 100 y una longitud de 3 dígitos.
 */

permitirNumerosHasta100(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  const tecla = event.key;
  
  const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

  if (teclasPermitidas.includes(tecla)) {
    return;
  }
  
  if (!/^[0-9]$/.test(tecla)) {
    event.preventDefault();
    return;
  }
  
  const valorActual = input.value;


  if (valorActual === '0') {
      event.preventDefault();
      return;
  }
  
  const posInicio = input.selectionStart ?? 0;
  const posFin = input.selectionEnd ?? 0;

  const valorFuturoStr = valorActual.slice(0, posInicio) + tecla + valorActual.slice(posFin);

  // 5. Convertimos a número y validamos que no exceda 100.
  const numeroFuturo = parseInt(valorFuturoStr, 10);

  if (numeroFuturo > 100) {
    event.preventDefault();
  }
}


static fechaFinMayorIgualInicioValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const inicio = formGroup.get('supFechaInicio')?.value;
    const fin    = formGroup.get('supFechaFin')?.value;

    if (inicio && fin && new Date(fin) < new Date(inicio)) {
      return { fechaInvalida: true };
    }
    return null;
  };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
get fichaCompletamenteValidada(): boolean {
  return Object.values(this.validadas).every(v => v);
}


actualizarFlagFichaValidada(): void {
  if (this.idFichaGuardado) {
    this.fichaService.marcarFichaComoValidada(this.idFichaGuardado).subscribe({
      next: () => {
        console.log('✅ Flag de ficha validada actualizado correctamente.');
        Swal.fire('Ficha Validada', 'La ficha ha sido validada completamente.', 'success');
      },
      error: err => {
        console.error('Error al actualizar el flag_validar', err);
      }
    });
  }
}


marcarSeccionValidada(numero: number): void {
  const key = `s${numero}` as SeccionKey;
  this.validadas[key] = true;
  // ⬇️ publica al servicio
  this.fichaStatusService.setValidada(key, true);

  if (this.fichaCompletamenteValidada) { 
    this.actualizarFlagFichaValidada();
  }
}


onOtroCheckboxChange(checkboxName: string, textFieldName: string, event: any): void {
  const checkboxControl = this.fichaForm.get(checkboxName);
  const textControl = this.fichaForm.get(textFieldName);

  if (event.checked) {
    textControl?.setValidators([Validators.required, Validators.maxLength(200)]);
  } else {
    textControl?.reset();
    textControl?.clearValidators();
  }
  textControl?.updateValueAndValidity();
}


validarLongitudMaxima(controlName: string, maxLength: number): void {
  const control = this.fichaForm.get(controlName);
  if (!control) return;
  const valor = control.value || '';
  if (valor.length > maxLength) {
    control.setValue(valor.substring(0, maxLength), { emitEvent: false });
  }
}



get showStatusBar(): boolean {
  return this.idFichaGuardado != null && this.idFichaGuardado > 0;
}


// ===== Utilidades de validación / estado =============================================
  private ctrl(path: string): AbstractControl | null { return this.fichaForm.get(path); }

  // 🟧 enableRequired YA ESTÁ IMPLEMENTADO EN LA LINEA 706 

  // private enableRequired(ctrl: AbstractControl): void {
  //   ctrl.enable({ emitEvent: false });
  //   ctrl.setValidators([Validators.required]);
  //   ctrl.updateValueAndValidity({ emitEvent: false });
  // }

 private disableSoft(
    ctrl: AbstractControl, 
    clearValidators = true, 
    clearValue = false  
): void {
    if (clearValidators) ctrl.clearValidators();
    if (clearValue) ctrl.setValue(null, { emitEvent: false }); 
    ctrl.disable({ emitEvent: false });
    ctrl.updateValueAndValidity({ emitEvent: false });
}

  private nonNegativeInt(): ValidatorFn {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 ? null : { nonNegativeInt: true };
    };
  }

private toggleCheckboxGroup(names: string[], enabled: boolean, clearWhenDisable = true) {
  names.forEach(n => {
    const c = this.ctrl(n)!;
    if (enabled) {
      c.enable({ emitEvent: false });
    } else {
      if (clearWhenDisable) c.setValue(false, { emitEvent: false });
      c.disable({ emitEvent: false });
    }
    c.updateValueAndValidity({ emitEvent: false });
  });
}

  // ===== Validación “al menos una” por grupo condicional =====
  private anyChecked(keys: string[]): boolean {
    return keys.some(k => !!this.ctrl(k)?.value);
  }

    public showGroupErrors = false;


    get invalidHE() {
      return this.showGroupErrors && !this.anyChecked(this.GROUP_MotivoE);
    }

     get invalidCA() {
      return this.showGroupErrors && !this.anyChecked(this.GROUP_CA);
    }


   limitarDigitosTextarea(event: any, maxLength: number = 98): void {
    const input = event.target;
    const valor = input.value; 
    if (valor.length > maxLength) {
      input.value = valor.slice(0, maxLength); 
    }
  }


  // Solo letras (A-Z, a-z), tildes, ü/Ü, ñ/Ñ y espacio; recorta a maxLength
permitirSoloTextoYEspacios55(event: Event, maxLength: number = 55): void {
  const input = event.target as HTMLTextAreaElement;
  let v = input.value;

  // Quita todo lo que no sea letra o espacio (no admite números ni signos)
  v = v.replace(/[^A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+/g, '');

  // Aplica longitud máxima
  if (v.length > maxLength) v = v.slice(0, maxLength);

  // Refleja el valor saneado y notifica a Angular (Reactive Forms)
  if (v !== input.value) {
    input.value = v;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

// Solo letras (A-Z, a-z), tildes, ü/Ü, ñ/Ñ y espacio; recorta a maxLength
permitirSoloTextoYEspacios100(event: Event, maxLength: number = 100): void {
  const input = event.target as HTMLTextAreaElement;
  let v = input.value;

  // Quita todo lo que no sea letra o espacio (no admite números ni signos)
  v = v.replace(/[^A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+/g, '');

  // Aplica longitud máxima
  if (v.length > maxLength) v = v.slice(0, maxLength);

  // Refleja el valor saneado y notifica a Angular (Reactive Forms)
  if (v !== input.value) {
    input.value = v;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

// (Opcional) Bloquea la tecla Enter para evitar saltos de línea
bloquearEnter(e: KeyboardEvent): void {
  if (e.key === 'Enter') e.preventDefault();
}
 
}
  

