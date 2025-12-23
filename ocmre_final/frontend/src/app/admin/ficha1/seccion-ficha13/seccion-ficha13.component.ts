import {
  Component, EventEmitter, Output, OnInit, Input, OnChanges,
  SimpleChanges, OnDestroy, inject, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule }     from '@angular/material/button';
import { MatInputModule }      from '@angular/material/input';
import { MatIconModule }       from '@angular/material/icon';
import { MatDividerModule }    from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule
} from '@angular/material/core';

// Servicios
import { Ficha1Service } from '../ficha1.service';
//import { AuthService } from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatCheckbox} from '@angular/material/checkbox';
import {Max4DigitsDirective} from '../seccion-ficha6/max-4digits.directive';
import {Max3DigitsDirective} from './max-3digits';
import { environment } from '../../../../environments/environment';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-seccion-ficha13',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatRadioButton, MatRadioGroup, MatCheckbox, Max4DigitsDirective, Max3DigitsDirective
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './seccion-ficha13.component.html',
  styleUrls: ['./seccion-ficha13.component.scss']
})
export class SeccionFicha13Component implements OnInit, OnChanges, OnDestroy {

   @Input() idFichaExternal!: number | null;
  @Input() codUnicoExternal!: string | null;

  // ===== Inputs/Outputs =====
  @Input() datosFicha13: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  // ===== Estado =====
  ficha13Form: FormGroup;
  private destroy$ = new Subject<void>();
  private idFicha: number | null = null;
  private autosaveLanzado = false;
  private hydrating = false;

  roles: string[] = [];
  rolAdministrador: string = environment.rolAdministrador;
  rolComisionado: string = environment.rolComisionado;
  rolEspecialista: string = environment.rolEspecialista;

  // ===== Inyección =====
  private readonly fb           = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService  = inject(AuthService);
  private readonly dateAdapter  = inject(DateAdapter);
  private readonly cdr          = inject(ChangeDetectorRef);
  private camposBloqueadosPorCheckbox = new Set<string>();
  Ninguna  = ['p135Ninguno'];
  Ninguna2  = ['p1312Ninguna'];
  Declaro  = ['declaracion'];



  Iniciativas  = ['p133Formulario','p133Virtual','p133Fisica'];

  anio = [
    { Anio: '2023', control: 'p1342023Recibida',control2:'p1342023Atendida',control3:'p1342023Denegada'},
    { Anio: '2024', control: 'p1342024Recibida',control2:'p1342024Atendida',control3:'p1342024Denegada' },
    { Anio: '2025', control: 'p1342025Recibida',control2:'p1342025Atendida',control3:'p1342025Denegada' }
  ];
  necesidadesData = [
    { tipo: 'Logística', checkControl: 'p135ALogistica', gestionControl: 'p135AGestiones', suficienteControl: 'p135ASuficiente', observacionesControl: 'p135AEspecifique'},
    { tipo: 'Infraestructura', checkControl: 'p135BInfra', gestionControl: 'p135BGestiones', suficienteControl: 'p135BSuficiente', observacionesControl: 'p135BEspecifique'},
    { tipo: 'Personal', checkControl: 'p135CPersonal', gestionControl: 'p135CGestiones', suficienteControl: 'p135CSuficiente', observacionesControl: 'p135CEspecifique'},
    { tipo: 'Presupuesto', checkControl: 'p135DPresupuesto', gestionControl: 'p135DGestiones', suficienteControl: 'p135DSuficiente', observacionesControl: 'p135DEspecifique'},
    { tipo: 'Otro, especifique:', checkControl: 'p135EOtro', especifiqueControl: 'p135EOtroDetalle', gestionControl: 'p135EGestiones', suficienteControl: 'p135ESuficiente', observacionesControl: 'p135EEspecifique'}
  ];
  private readonly P135_MAP: Record<string, string> = {
    p135ALogistica: 'p135ALogistica',
    p135BInfra: 'p135BInfra',
    p135CPersonal: 'p135CPersonal',
    p135DPresupuesto: 'p135DPresupuesto',
    p135EOtro: 'p135EOtro',
    p135Ninguno: 'p135Ninguno',
  };

  private readonly P137_MAP: Record<string, string> = {
    p137Mre: 'p137Mre',
    p137Reniec: 'p137Reniec',
    p137Migraciones: 'p137Migraciones',
    p137Interpol: 'p137Interpol',
    p137Inei: 'p137Inei',
    p137Jne: 'p137Jne',
    p137Onpe: 'p137Onpe',
    p137Sunarp: 'p137Sunarp',
    p137PoderJudicial: 'p137PoderJudicial',
    p137Otro: 'p137Otro',
    p137OtroDetalle: 'p137OtroDetalle',
    p137Ninguna: 'p137Ninguna',

  };
  anioP139 = [
    { AnioP: '2023', control: 'p1392023Reclamo',control2:'p1392023Queja',control3:'p1392023Sugerencia'},
    { AnioP: '2024', control: 'p1392024Reclamo',control2:'p1392024Queja',control3:'p1392024Sugerencia' },
    { AnioP: '2025', control: 'p1392025Reclamo',control2:'p1392025Queja',control3:'p1392025Sugerencia' }
  ];

  necesidadesData2 = [
    { tipo: 'Logística', checkControl: 'p1312ALogistica', gestionControl: 'p1312AGestiones', suficienteControl: 'p1312ASuficiente', observacionesControl: 'p1312AEspecifique'},
    { tipo: 'Infraestructura', checkControl: 'p1312BInfra', gestionControl: 'p1312BGestiones', suficienteControl: 'p1312BSuficiente', observacionesControl: 'p1312BEspecifique'},
    { tipo: 'Personal', checkControl: 'p1312CPersonal', gestionControl: 'p1312CGestiones', suficienteControl: 'p1312CSuficiente', observacionesControl: 'p1312CEspecifique'},
    { tipo: 'Presupuesto', checkControl: 'p1312DPresupuesto', gestionControl: 'p1312DGestiones', suficienteControl: 'p1312DSuficiente', observacionesControl: 'p1312DEspecifique'},
    { tipo: 'Otro, especifique:', checkControl: 'p1312EOtro', especifiqueControl: 'p1312EOtroDetalle', gestionControl: 'p1312EGestiones', suficienteControl: 'p1312ESuficiente', observacionesControl: 'p1312EEspecifique'}
  ];
  private readonly P1312_MAP: Record<string, string> = {
    p1312ALogistica: 'p1312ALogistica',
    p1312BInfra: 'p1312BInfra',
    p1312CPersonal: 'p1312CPersonal',
    p1312DPresupuesto: 'p1312DPresupuesto',
    p1312EOtro: 'p1312EOtro',
    p1312Ninguna: 'p1312Ninguna',
  };


  private readonly P1314_MAP: Record<string, string> = {
    p1314Mre: 'p1314Mre',
    p1314Reniec: 'p1314Reniec',
    p1314Migracion: 'p1314Migracion',
    p1314Interpol: 'p1314Interpol',
    p1314Inei: 'p1314Inei',
    p1314Jne: 'p1314Jne',
    p1314Onpe: 'p1314Onpe',
    p1314Sunarp: 'p1314Sunarp',
    p1314PoderJudicial: 'p1314PoderJudicial',
    p1314Otro: 'p1314Otro',
    p1314OtroDetalle: 'p1314OtroDetalle',
    p1314Ninguna: 'p1314Ninguna',

  };


  private readonly P132_MAP: Record<string, string> = {
    p132Contratacion: 'p132Contratacion',
    p132Personal: 'p132Personal',
    p132Planeamiento: 'p132Planeamiento',
    p132Actividades: 'p132Actividades',
    p132Presupuesto: 'p132Presupuesto',
    p132Otro: 'p132Otro',
    p132OtroDetalle: 'p132OtroDetalle',

  };

private requireAtLeastOneP135(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha13Form) return null;
    
    const checkKeys = ['p135ALogistica', 'p135BInfra', 'p135CPersonal', 'p135DPresupuesto', 'p135EOtro'];
    const anyChecked = checkKeys.some(k => {
      const ctrl = this.ficha13Form.get(k);
      return ctrl?.value === 'S' || ctrl?.value === true;
    });
    
    const ningunoChecked = this.ficha13Form.get('p135Ninguno')?.value === 'S' || 
                           this.ficha13Form.get('p135Ninguno')?.value === true;
    
    return (anyChecked || ningunoChecked) ? null : { requireOne: true };
  };
}


private requireAtLeastOneP1312(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha13Form) return null;
    
    const checkKeys = ['p1312ALogistica', 'p1312BInfra', 'p1312CPersonal', 'p1312DPresupuesto', 'p1312EOtro'];
    const anyChecked = checkKeys.some(k => {
      const ctrl = this.ficha13Form.get(k);
      return ctrl?.value === 'S' || ctrl?.value === true;
    });
    
    const ningunaChecked = this.ficha13Form.get('p1312Ninguna')?.value === 'S' || 
                           this.ficha13Form.get('p1312Ninguna')?.value === true;
    
    return (anyChecked || ningunaChecked) ? null : { requireOne: true };
  };
}

  constructor() {
    this.dateAdapter.setLocale('es-PE');

    // Formulario base (estructura mínima)
    this.ficha13Form = this.fb.group({
      idFicha: [null],
      idFichas13: [null],
      estado_s13: [''],
      valida_s13: [''],


      p131Oficina:[null, Validators.required],



      p133Formulario:[''],
      p133Virtual:[''],
      p133Fisica:[''],

      p1342023Recibida:[''],p1342023Atendida:[''],p1342023Denegada:[''],
      p1342024Recibida:[''],p1342024Atendida:[''],p1342024Denegada:[''],
      p1342025Recibida:[''],p1342025Atendida:[''],p1342025Denegada:[''],

      p135ALogistica:[false],
      p135AGestiones:[{ value: null, disabled: true }],
      p135ASuficiente:[{ value: null, disabled: true }],
      p135AEspecifique:[null],

      p135BInfra:[null],
      p135BGestiones:[{ value: null, disabled: true }],
      p135BSuficiente:[{ value: null, disabled: true }],
      p135BEspecifique:[null],

      p135CPersonal:[null],
      p135CGestiones:[{ value: null, disabled: true }],
      p135CSuficiente:[{ value: null, disabled: true }],
      p135CEspecifique:[null],

      p135DPresupuesto:[null],
      p135DGestiones:[{ value: null, disabled: true }],
      p135DSuficiente:[{ value: null, disabled: true }],
      p135DEspecifique:[null],

      p135EOtro:[null],
      p135EGestiones:[{ value: null, disabled: true }],
      p135ESuficiente:[{ value: null, disabled: true }],
      p135EEspecifique:[null],
      p135EOtroDetalle:[{ value: '',  disabled: true }],
      p135Ninguno:[false],

      p135Any: [null, this.requireAtLeastOneP135()],

      p136Recibe:['', Validators.required],
      p137Mre: [false], p137Reniec: [false], p137Migraciones: [false],
      p137Interpol: [false], p137Inei: [false], p137Jne: [false],
      p137Onpe: [false], p137Sunarp: [false], p137PoderJudicial: [false], p137Otro: [false],
      p137OtroDetalle: [{ value: '', disabled: false }, [Validators.maxLength(200)]],
      p137Ninguna: [false],
      p138Cuenta:['', Validators.required],

      p1392023Reclamo:[''],p1392023Queja:[''],p1392023Sugerencia:[''],
      p1392024Reclamo:[''],p1392024Queja:[''],p1392024Sugerencia:[''],
      p1392025Reclamo:[''],p1392025Queja:[''],p1392025Sugerencia:[''],
      p1310Oficina:['', Validators.required],
      p1311Afirmativa:[''],

      p1312ALogistica:[false],
      p1312AGestiones:[{ value: null, disabled: true }],
      p1312ASuficiente:[{ value: null, disabled: true }],
      p1312AEspecifique:[null],

      p1312BInfra:[null],
      p1312BGestiones:[{ value: null, disabled: true }],
      p1312BSuficiente:[{ value: null, disabled: true }],
      p1312BEspecifique:[false],

      p1312CPersonal:[null],
      p1312CGestiones:[{ value: null, disabled: true }],
      p1312CSuficiente:[{ value: null, disabled: true }],
      p1312CEspecifique:[null],

      p1312DPresupuesto:[null],
      p1312DGestiones:[{ value: null, disabled: true }],
      p1312DSuficiente:[{ value: null, disabled: true }],
      p1312DEspecifique:[null],

      p1312EOtro:[null],
      p1312EGestiones:[{ value: null, disabled: true }],
      p1312ESuficiente:[{ value: null, disabled: true }],
      p1312EEspecifique:[null],
      p1312EOtroDetalle:[{ value: '',  disabled: true }],


      p1312Ninguna:[false],
      p1312Any: [null, this.requireAtLeastOneP1312()],

      p1313Recibe:['', Validators.required],
      p1314Mre: [false], p1314Reniec: [false], p1314Migracion: [false],
      p1314Interpol: [false], p1314Inei: [false], p1314Jne: [false],
      p1314Onpe: [false], p1314Sunarp: [false], p1314PoderJudicial: [false], p1314Otro: [false],
      p1314OtroDetalle: [{ value: '', disabled: false }, [Validators.maxLength(200)]],
      p1314Ninguna: [false],
      comentario:[''],
      declaracion:['', Validators.required],
      p132Contratacion:[false],
      p132Personal:[false],
      p132Planeamiento:[false],
      p132Actividades:[false],
      p132Presupuesto:[false],
      p132Otro: [false],
      p132OtroDetalle: [{ value: '', disabled: false }, [Validators.maxLength(200)]],
      // 🧩 Aquí agregarás los campos específicos de la Sección 13,
    });
    this.setupFormListeners();


  }

  ///////PREGUNTA_13.5
  private setupP135Listeners(): void {
    const group = ['p135ALogistica','p135BInfra','p135CPersonal','p135DPresupuesto','p135EOtro'];


    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p135Ninguno')?.setValue(false, { emitEvent: false });
      });
    });
 
    // “Otro” (J) habilita detalle
    this.f('p135ALogistica')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p135AEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

       this.f('p135BInfra')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p135BEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([ Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

       this.f('p135CPersonal')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p135CEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([ Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

          this.f('p135DPresupuesto')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p135DEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([ Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

          this.f('p135EOtro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p135EEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([ Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    // “Ninguna” (K) apaga A–J y el detalle
    this.f('p135Ninguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p135BGestiones')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
///////PREGUNTA_13.5 FIN


  ///////PREGUNTA_13.7
  private setupP137Listeners(): void {
    const group = ['p137Mre','p137Reniec','p137Migraciones','p137Interpol','p137Inei','p137Jne','p137Onpe','p137Sunarp','p137PoderJudicial','p137Otro'];

    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p137Ninguna')?.setValue(false, { emitEvent: false });
      });
    });

    // “Otro” (J) habilita detalle
    this.f('p137Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p137OtroDetalle')!;
      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.required, Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    // “Ninguna” (K) apaga A–J y el detalle
    this.f('p137Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p137OtroDetalle')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
  ///////13.7. fim
  ///////PREGUNTA_13.12
  private setupP1312Listeners(): void {
    const group = ['p1312ALogistica','p1312BInfra','p1312CPersonal','p1312DPresupuesto','p1312EOtro'];


    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p1312Ninguna')?.setValue(false, { emitEvent: false });
      });
    });

    this.f('p1312ALogistica')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p1312AEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: true });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    this.f('p1312BInfra')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p1312BEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: true });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    this.f('p1312CPersonal')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p1312CEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });


     this.f('p1312DPresupuesto')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p1312DEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([ Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    this.f('p1312EOtro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p1312EEspecifique')!;

      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([ Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    // “Ninguna” (K) apaga A–J y el detalle
    this.f('p1312Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p1312BGestiones')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
///////PREGUNTA_13.12 FIN
///////PREGUNTA_13.14
  private setupP1314Listeners(): void {
    const group = ['p1314Mre','p1314Reniec','p1314Migracion','p1314Interpol','p1314Inei','p1314Jne','p1314Onpe','p1314Sunarp','p1314PoderJudicial','p1314Otro'];

    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p1314Ninguna')?.setValue(false, { emitEvent: false });
      });
    });

    // “Otro” (J) habilita detalle
    this.f('p1314Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p1314OtroDetalle')!;
      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.required, Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });

    // “Ninguna” (K) apaga A–J y el detalle
    this.f('p1314Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p1314OtroDetalle')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
  ///////13.14 fim
/////// PREGUNTA_13.2
  private setupP132Listeners(): void {
    this.f('p132Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p132OtroDetalle')!;
      if (ch) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.required, Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    });
  }


  // ===== Ciclo de vida =====


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFicha13']?.currentValue) {
      this.populateForm(changes['datosFicha13'].currentValue);
    }

    if (changes['activarAutosave']?.currentValue === true && !this.autosaveLanzado) {
      if (this.shouldAutosave()) {
        this.autosaveSilencioso();
        this.autosaveLanzado = true;
      } else {
        console.debug('[S13] Autosave omitido al abrir');
      }
    }
  }
// ===== Validación “al menos una” por grupo condicional =====
  private ctrl(path: string): AbstractControl | null {
    return this.ficha13Form.get(path);
  }

// Grupos existentes
private readonly GROUP_CAP = [
  'p137Mre','p137Reniec','p137Migraciones','p137Interpol','p137Inei',
  'p137Jne','p137Onpe','p137Sunarp','p137PoderJudicial','p137Otro','p137Ninguna'
];

  private readonly GROUP_CAPP = [
    'p1314Mre','p1314Reniec','p1314Migracion','p1314Interpol','p1314Inei',
    'p1314Jne','p1314Onpe','p1314Sunarp','p1314PoderJudicial','p1314Otro','p1314Ninguna'
  ];

// ✅ Nuevo grupo para 13.2
  private readonly GROUP_CAP132 = [
    'p132Contratacion','p132Personal','p132Planeamiento','p132Actividades','p132Presupuesto','p132Otro'
  ];

  private anyChecked(keys: string[]): boolean {
    return keys.some(k => !!this.ctrl(k)?.value);
  }

  public showGroupErrors = false;

 

 // 13.7 depende de p136Recibe
get invalidCAP() {
  return this.showGroupErrors
    && this.f('p136Recibe')?.value === 'S'
    && !this.anyChecked(this.GROUP_CAP);
}

// 13.14 depende de p1313Recibe
get invalidCAPP() {
  return this.showGroupErrors
    && this.f('p1313Recibe')?.value === 'S'
    && !this.anyChecked(this.GROUP_CAPP);
}

// 13.2 depende de p131Oficina




  private setupFormListeners(): void {

//PARA PREGUNTA 6.3.3
    this.f('p135Ninguno')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p135ALogistica','p135BInfra','p135CPersonal','p135DPresupuesto','p135EOtro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange13('p135ALogistica','p135AGestiones');
        this.onOtroCheckboxChange13('p135ALogistica','p135ASuficiente');
       // this.onOtroCheckboxChange13('p135ALogistica','p135AEspecifique');

        this.onOtroCheckboxChange13('p135BInfra','p135BGestiones');
        this.onOtroCheckboxChange13('p135BInfra','p135BSuficiente');
        this.onOtroCheckboxChange13('p135BInfra','p135BEspecifique');

        this.onOtroCheckboxChange13('p135CPersonal','p135CGestiones');
        this.onOtroCheckboxChange13('p135CPersonal','p135CSuficiente');
        this.onOtroCheckboxChange13('p135CPersonal','p135CEspecifique');

        this.onOtroCheckboxChange13('p135DPresupuesto','p135DGestiones');
        this.onOtroCheckboxChange13('p135DPresupuesto','p135DSuficiente');
        this.onOtroCheckboxChange13('p135DPresupuesto','p135DEspecifique');

        this.onOtroCheckboxChange13('p135EOtro','p135EOtroDetalle');
        this.onOtroCheckboxChange13('p135EOtro','p135EGestiones');
        this.onOtroCheckboxChange13('p135EOtro','p135ESuficiente');
        this.onOtroCheckboxChange13('p135EOtro','p135EEspecifique');

        this.cdr.markForCheck();
      }

    });
/////////////////////////////FIN 6.3.3
    //PARA PREGUNTA 6.3.7
    this.f('p137Ninguna')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p137Mre','p137Reniec','p137Migraciones','p137Interpol','p137Inei','p137Jne','p137Onpe','p137Sunarp','p137PoderJudicial','p137Otro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange13('p137Otro','p137OtroDetalle');
        this.cdr.markForCheck();
      }
    });
//PARA PREGUNTA 6.3.7 FIN

//PARA PREGUNTA 13.12
    this.f('p1312Ninguna')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p1312ALogistica','p1312BInfra','p1312CPersonal','p1312DPresupuesto','p1312EOtro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange13('p1312ALogistica','p1312AGestiones');
        this.onOtroCheckboxChange13('p1312ALogistica','p1312ASuficiente');
        this.onOtroCheckboxChange13('p1312ALogistica','p1312AEspecifique');

        this.onOtroCheckboxChange13('p1312BInfra','p1312BGestiones');
        this.onOtroCheckboxChange13('p1312BInfra','p1312BSuficiente');
        this.onOtroCheckboxChange13('p1312BInfra','p1312BEspecifique');

        this.onOtroCheckboxChange13('p1312CPersonal','p1312CGestiones');
        this.onOtroCheckboxChange13('p1312CPersonal','p1312CSuficiente');
        this.onOtroCheckboxChange13('p1312CPersonal','p1312CEspecifique');

        this.onOtroCheckboxChange13('p1312DPresupuesto','p1312DGestiones');
        this.onOtroCheckboxChange13('p1312DPresupuesto','p1312DSuficiente');
        this.onOtroCheckboxChange13('p1312DPresupuesto','p1312DEspecifique');

        this.onOtroCheckboxChange13('p1312EOtro','p1312EOtroDetalle');
        this.onOtroCheckboxChange13('p1312EOtro','p1312EGestiones');
        this.onOtroCheckboxChange13('p1312EOtro','p1312ESuficiente');
        this.onOtroCheckboxChange13('p1312EOtro','p1312EEspecifique');

        this.cdr.markForCheck();
      }

    });
/////////////////////////////FIN 13.12
    /////PARA PREGUNTA 13.14
    this.f('p1314Ninguna')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p1314Mre','p1314Reniec','p1314Migracion','p1314Interpol','p1314Inei','p1314Jne','p1314Onpe','p1314Sunarp','p1314PoderJudicial','p1314Otro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange13('p1314Otro','p1314OtroDetalle');
        this.cdr.markForCheck();
      }
    });
//PARA PREGUNTA 13.14FIN

  }



  ngOnInit(): void {



    
    this.setupP135Listeners();
    this.setupP137Listeners();
    this.setupP1312Listeners();
    this.setupP1314Listeners();
    this.setupP132Listeners();
    this.bindP138ToP139();
    [
      ['p135ALogistica', 'p135AGestiones'],['p135ALogistica'],
      ['p135BInfra', 'p135BGestiones'],['p135BInfra'],
      ['p135CPersonal', 'p135CGestiones'],['p135CPersonal'],
      ['p135DPresupuesto', 'p135DGestiones'],['p135DPresupuesto'],
      ['p135EOtro', 'p135EGestiones'],['p135EOtro'],['p135EOtro', 'p135EOtroDetalle']
    ].forEach(([chk, txt]) => this.bindEnableRequiredAuto13(chk, txt));
    this.controlarRadioSiNo('p135AGestiones', 'p135ASuficiente', 'S');
    this.controlarRadioSiNo('p135BGestiones', 'p135BSuficiente', 'S');
    this.controlarRadioSiNo('p135CGestiones', 'p135CSuficiente', 'S');
    this.controlarRadioSiNo('p135DGestiones', 'p135DSuficiente', 'S');
    this.controlarRadioSiNo('p135EGestiones', 'p135ESuficiente', 'S');

    this.bindRadioEnablesOn13(
      'p136Recibe', v => v === 'S',
      ['p137Mre','p137Reniec','p137Migraciones','p137Interpol','p137Inei',
        'p137Jne','p137Onpe','p137Sunarp','p137PoderJudicial','p137Otro','p137Ninguna'
      ],
      [Validators.requiredTrue]
    );
    this.controlarDetalleOtrosP137();


    this.controlarRadioSiNo('p1310Oficina', 'p1311Afirmativa', 'S');

    [
      ['p1312ALogistica', 'p1312AGestiones'],['p1312ALogistica'],
      ['p1312BInfra', 'p1312BGestiones'],['p1312BInfra'],
      ['p1312CPersonal', 'p1312CGestiones'],['p1312CPersonal'],
      ['p1312DPresupuesto', 'p1312DGestiones'],['p1312DPresupuesto'],
      ['p1312EOtro', 'p1312EGestiones'],['p1312EOtro'],['p1312EOtro', 'p1312EOtroDetalle']
    ].forEach(([chk, txt]) => this.bindEnableRequiredAuto13(chk, txt));
    this.controlarRadioSiNo('p1312AGestiones', 'p1312ASuficiente', 'S');
    this.controlarRadioSiNo('p1312BGestiones', 'p1312BSuficiente', 'S');
    this.controlarRadioSiNo('p1312CGestiones', 'p1312CSuficiente', 'S');
    this.controlarRadioSiNo('p1312DGestiones', 'p1312DSuficiente', 'S');
    this.controlarRadioSiNo('p1312EGestiones', 'p1312ESuficiente', 'S');

    this.bindRadioEnablesOn13(
      'p1313Recibe', v => v === 'S',
      ['p1314Mre','p1314Reniec','p1314Migracion','p1314Interpol','p1314Inei',
        'p1314Jne','p1314Onpe','p1314Sunarp','p1314PoderJudicial','p1314Otro','p1314Ninguna'
      ],
      [Validators.requiredTrue]
    );
    this.controlarDetalleOtrosP1314();

    this.bindRadioEnablesOn132(
      'p131Oficina', v => v === 'S',
      ['p132Contratacion','p132Personal','p132Planeamiento','p132Actividades','p132Presupuesto','p132Otro'
      ],
      [Validators.requiredTrue]
    );
    this.controlarDetalleOtrosP132();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public isCheckboxChecked13(controlName: string): boolean { return this.f(controlName)?.value === 'S'; }

public onCheckboxChange13(controlName: string, event: any): void {
  const checked = !!event?.checked;
  const ctrl = this.f(controlName);
  ctrl?.setValue(checked ? 'S' : null);
  ctrl?.markAsDirty();
  ctrl?.markAsTouched();
  ctrl?.updateValueAndValidity({ emitEvent: true });
  
  const p135Keys = ['p135ALogistica', 'p135BInfra', 'p135CPersonal', 'p135DPresupuesto', 'p135EOtro', 'p135Ninguno'];
  if (p135Keys.includes(controlName)) {
    this.f('p135Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  const p1312Keys = ['p1312ALogistica', 'p1312BInfra', 'p1312CPersonal', 'p1312DPresupuesto', 'p1312EOtro', 'p1312Ninguna'];
  if (p1312Keys.includes(controlName)) {
    this.f('p1312Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  this.cdr.markForCheck();
}

  public label(ctrl: string) {
    // Etiquetas “bonitas” para checkboxes listados en arreglos (puedes personalizar) CHECKBOX
    const map: Record<string,string> = {

      p132Actividades:'Actividades oficiales ',p132Presupuesto:'Presupuesto',p132Otro:'Otro',
      p133Formulario:'Formulario de la página web',p133Virtual:'Mesa de partes virtual - correo',p133Fisica:'Mesa de partes física',
      p135ALogistica:'',p135BInfra:'',p135CPersonal:'',p135DPresupuesto:'',p135EOtro:'',p135Ninguno:'Ninguno',
      p1312ALogistica:'',p1312BInfra:'',p1312CPersonal:'',p1312DPresupuesto:'',p1312EOtro:'',p1312Ninguna:'Ninguno',declaracion:''
    };
    return map[ctrl] ?? ctrl;
  }


  // ===== Helpers =====
  public f(path: string) { return this.ficha13Form.get(path); }
   public showAllErrors = false; 

   public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }

  // ===== Guardar =====
  public guardarSeccion13(): void { this.guardarDatos('C'); }
  public guardarSeccion13Incompleta(): void { this.guardarDatos('I'); }

  private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {
  // ✅ 1. Activar visualización de errores
  this.showAllErrors = true;
  this.showGroupErrors = true;

  // ✅ 2. Revalidar controles ocultos de matrices
  this.f('p135Any')?.updateValueAndValidity({ emitEvent: false });
  this.f('p1312Any')?.updateValueAndValidity({ emitEvent: false });
  
  // ✅ 3. Actualizar validez del formulario
  this.ficha13Form.updateValueAndValidity({ emitEvent: false });

  // ✅ 4. Determinar estado destino
  const isFormValid = this.ficha13Form.valid;
  const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && isFormValid) ? 'C' : 'I';

  // ✅ 5. Si pidió Completo pero está incompleto: avisar y CONTINUAR guardando
  if (estadoSolicitado === 'C' && estadoDestino === 'I') {
    this.ficha13Form.markAllAsTouched();
    this.logInvalidFields(); // ← Agregar este método (opcional, ayuda a debug)

    await Swal.fire({
      icon: 'warning',
      title: 'Faltan respuestas',
      text: 'Completa los campos obligatorios antes de guardar como COMPLETA. Se guardará como INCOMPLETA.',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false
    });
    // ⚠️ NO hacer return - continuar guardando como 'I'
  }

  // ✅ 6. Preparar payload
  const payload = this.prepareSaveData(estadoDestino);

  // ✅ 7. Mostrar spinner
  Swal.fire({
    title: 'Guardando...',
    text: 'Por favor espere',
    allowOutsideClick: false,
    backdrop: 'rgba(0,0,0,0.69)',
    showConfirmButton: false,
    willOpen: () => Swal.showLoading()
  });

  try {
    // ✅ 8. Enviar al backend
    const resp = await lastValueFrom(
      this.fichaService.guardarFichaSeccion13(payload).pipe(takeUntil(this.destroy$))
    );

    Swal.close();

    // ✅ 9. Mensaje de éxito diferenciado
    const mensaje = estadoDestino === 'C'
      ? (resp?.mensaje || 'Sección 13 guardada como COMPLETA.')
      : (resp?.mensaje || 'Sección 13 guardada como INCOMPLETA.');

    await Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });

    // ✅ 10. Actualizar estado del formulario
    this.ficha13Form.patchValue({ estado_s13: estadoDestino }, { emitEvent: false });
    
    if ((resp as any)?.idFichas13 && !this.f('idFichas13')?.value) {
      this.f('idFichas13')?.setValue((resp as any).idFichas13, { emitEvent: false });
    }

    // ✅ 11. Limpiar errores solo si guardó exitosamente
    if (estadoDestino === 'C') {
      this.ficha13Form.markAsPristine();
      this.showAllErrors = false;
      this.showGroupErrors = false;
    }

    // ✅ 12. Emitir eventos al componente padre
    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estadoDestino);

  } catch (err: any) {
    Swal.close();
    console.error('[S13 guardar ERR]', err?.status, err?.message, err?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la Sección 13.',
      confirmButtonText: 'Entendido'
    });
  }
}

/**
 * Registra en consola todos los campos inválidos
 *  Útil para debugging durante desarrollo
 */
private logInvalidFields(): void {
  console.warn('=== SECCIÓN 13 - CAMPOS INVÁLIDOS ===');
  
  Object.keys(this.ficha13Form.controls).forEach(controlName => {
    const control = this.ficha13Form.get(controlName);
    
    if (control && control.invalid) {
      console.log(
        `❌ ${controlName}:`,
        {
          valor: control.value,
          estado: control.status,
          errores: control.errors,
          disabled: control.disabled
        }
      );
    }
  });
  
  console.warn('=== FIN VERIFICACIÓN ===');
}
//   private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {
//   this.showAllErrors = true;
//   this.showGroupErrors = true;

//   this.ficha13Form.updateValueAndValidity({ emitEvent: false });

//   const formOk = this.ficha13Form.valid;
//   const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && formOk) ? 'C' : 'I';

//   if (estadoSolicitado === 'C' && estadoDestino === 'I') {
//     this.ficha13Form.markAllAsTouched();
//     Swal.fire('Faltan respuestas', 'Completa los campos obligatorios antes de guardar como COMPLETA.', 'warning');
//     return; 
//   }

//   const payload = this.prepareSaveData(estadoDestino);

//   Swal.fire({
//     title: 'Guardando...',
//     allowOutsideClick: false,
//     backdrop: 'rgba(0,0,0,0.3)',
//     didOpen: () => Swal.showLoading()
//   });

//   try {
//     const resp = await lastValueFrom(
//       this.fichaService.guardarFichaSeccion13(payload).pipe(takeUntil(this.destroy$))
//     );

//     Swal.close();
//     Swal.fire(
//       'Listo',
//       resp?.mensaje || (estadoDestino === 'C' ? 'Sección 13 guardada (Completa).' : 'Sección 13 guardada (Incompleta).'),
//       'success'
//     );

//     this.showAllErrors = false;
//     this.showGroupErrors = false;

//     this.onGuardar.emit();
//     this.onEstadoActualizado.emit(payload.estado_s13);
//     this.ficha13Form.patchValue({ estado_s13: estadoDestino }, { emitEvent: false });
//     this.ficha13Form.markAsPristine();

//   } catch (e: any) {
//     Swal.close();
//     console.error('[S13 guardar ERR]', e?.status, e?.message, e?.error);
//     Swal.fire('Error', 'No se pudo guardar la sección 13.', 'error');
//   }
// }

  // private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {

  //    this.showGroupErrors = true;

  //   this.ficha13Form.updateValueAndValidity({ emitEvent: false });

  //   const formOk = this.ficha13Form.valid;
  //   const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && formOk) ? 'C' : 'I';

  //   if (estadoSolicitado === 'C' && estadoDestino === 'I') {
  //     this.ficha13Form.markAllAsTouched();
  //     Swal.fire('Faltan respuestas', 'Completa los campos obligatorios antes de guardar como COMPLETA.', 'warning');
  //   }

  //   const payload = this.prepareSaveData(estadoDestino);

  //   Swal.fire({
  //     title: 'Guardando...',
  //     allowOutsideClick: false,
  //     backdrop: 'rgba(0,0,0,0.3)',
  //     didOpen: () => Swal.showLoading()
  //   });

  //   try {
  //     const resp = await lastValueFrom(
  //       this.fichaService.guardarFichaSeccion13(payload).pipe(takeUntil(this.destroy$))
  //     );

  //     Swal.close();
  //     Swal.fire(
  //       'Listo',
  //       resp?.mensaje || (estadoDestino === 'C' ? 'Sección 13 guardada (Completa).' : 'Sección 13 guardada (Incompleta).'),
  //       'success'
  //     );

  //     this.onGuardar.emit();
  //     this.onEstadoActualizado.emit(payload.estado_s13);
  //     this.ficha13Form.patchValue({ estado_s13: estadoDestino }, { emitEvent: false });
  //     this.ficha13Form.markAsPristine();

  //   } catch (e: any) {
  //     Swal.close();
  //     console.error('[S13 guardar ERR]', e?.status, e?.message, e?.error);
  //     Swal.fire('Error', 'No se pudo guardar la sección 13.', 'error');
  //   }
  // }

  // ===== Autosave =====
  private shouldAutosave(): boolean {
    if (this.hydrating) return false;
    if (!this.idFicha) return false;
    if (!this.ficha13Form.dirty) return false;
    return true;
  }

  private autosaveSilencioso(): void {
    if (!this.shouldAutosave()) return;

    const estadoActual = this.f('estado_s13')?.value as 'C' | 'I' | '' | null;
    const estadoDestino: 'C' | 'I' =
      (estadoActual === 'C' && this.ficha13Form.valid) ? 'C' : 'I';

    const payload = this.prepareSaveData(estadoDestino);

    this.fichaService.guardarFichaSeccion13(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => console.debug('[S13 autosave OK]', { estadoDestino, res }),
        error: (err) => console.error('[S13 autosave ERR]', err?.status, err?.message, err?.error)
      });
  }

  // ===== Validación =====
  public validarSeccion(): void {
      const estado = this.f('estado_s13')?.value;
      const idFichas13 = this.f('idFichas13')?.value ?? this.idFicha;
      if (!this.idFicha) {
        Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
        return;
      }
      if (estado !== 'C') {
        Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
        return;
      }
  
      const payload = { idFichas13, valida_s13: '1' };
      this.fichaService.validarFichaSeccion13(payload).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.f('valida_s13')?.setValue('1', { emitEvent: false });
          this.seccionValidada.emit();
          Swal.fire({ icon: 'success', title: 'Sección 13 Validada', showConfirmButton: false, timer: 2000 });
        },
        error: (err) => {
          console.error('Error al validar S13:', err);
          Swal.fire('Error', 'No se pudo validar la sección 13.', 'error');
        }
      });
    }

  // ===== Populate / Hidratar =====
  private populateForm(data: any): void {
    this.idFicha = data?.idFicha ?? this.idFicha;
    this.ficha13Form.patchValue(data, { emitEvent: false });

    this.f('p135Any')?.updateValueAndValidity({ emitEvent: false });
  this.f('p1312Any')?.updateValueAndValidity({ emitEvent: false });

  //=====  13.7 (A–K): API --> Form =====
    const p137Keys = Object.keys(this.P137_MAP);
    p137Keys.forEach(formKey => {
      const apiKey = this.P137_MAP[formKey];
      if (formKey === 'p137OtroDetalle') return;
      const apiVal = (data as any)?.[apiKey];
      this.f(formKey)?.setValue(apiVal === 'S', { emitEvent: false });
    });

    const jMarcado = !!this.f('p137Otro')?.value;
    const jotroAPI = (data as any)?.[this.P137_MAP['p137OtroDetalle']] ?? '';
    this.f('p137OtroDetalle')?.setValue(jotroAPI, { emitEvent: false });

    const det644 = this.f('p137OtroDetalle')!;
    if (jMarcado) {
      det644.enable({ emitEvent: false });
      det644.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      det644.clearValidators();
      det644.disable({ emitEvent: false });
    }
    det644.updateValueAndValidity({ emitEvent: false });

    //=====  13.7 (A–K): API --> Form ===== FIN

    //=====  13.14 (A–K): API --> Form =====
    const p1314Keys = Object.keys(this.P1314_MAP);
    p1314Keys.forEach(formKey => {
      const apiKey = this.P1314_MAP[formKey];
      if (formKey === 'p1314OtroDetalle') return;
      const apiVal = (data as any)?.[apiKey];
      this.f(formKey)?.setValue(apiVal === 'S', { emitEvent: false });
    });

    const jMarcado2 = !!this.f('p1314Otro')?.value;
    const jotroAPI2 = (data as any)?.[this.P1314_MAP['p1314OtroDetalle']] ?? '';
    this.f('p1314OtroDetalle')?.setValue(jotroAPI2, { emitEvent: false });

    const det64 = this.f('p1314OtroDetalle')!;
    if (jMarcado2) {
      det64.enable({ emitEvent: false });
      det64.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      det64.clearValidators();
      det64.disable({ emitEvent: false });
    }
    det64.updateValueAndValidity({ emitEvent: false });


//=====  13.2 (A–K): API --> Form =====
    const p132Keys = Object.keys(this.P132_MAP);
    p132Keys.forEach(formKey => {
      const apiKey = this.P132_MAP[formKey];
      if (formKey === 'p132OtroDetalle') return;
      const apiVal = (data as any)?.[apiKey];
      this.f(formKey)?.setValue(apiVal === 'S', { emitEvent: false });
    });

    const jMarcado13 = !!this.f('p132Otro')?.value;
    const jotroAPI13 = (data as any)?.[this.P132_MAP['p132OtroDetalle']] ?? '';
    this.f('p132OtroDetalle')?.setValue(jotroAPI13, { emitEvent: false });

    const det643 = this.f('p132OtroDetalle')!;
    if (jMarcado13) {
      det643.enable({ emitEvent: false });
      det643.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      det643.clearValidators();
      det643.disable({ emitEvent: false });
    }
    det643.updateValueAndValidity({ emitEvent: false });
    //=====  13.7 (A–K): API --> Form ===== FIN


    if ((data?.estado_s13 ?? '') !== 'C') {
      this.showAllErrors = true;
      this.persistRequiredErrors();
    }



  }



  

   private persistRequiredErrors(): void {
        const keys = Object.keys(this.ficha13Form.controls);
        keys.forEach(k => {
          const c = this.ficha13Form.get(k);
          if (!c) return;

          // hasValidator existe desde Angular 14
          const hasReq = typeof (c as any).hasValidator === 'function'
            ? (c as any).hasValidator(Validators.required)
            : false;

          if (!c.disabled && hasReq) {
            c.updateValueAndValidity({ emitEvent: false });
            if (c.hasError('required')) {
              c.markAsTouched({ onlySelf: true });
              c.markAsDirty({ onlySelf: true });
            }
          }
        });
      }


  // ===== Utilidades =====
  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha13Form.getRawValue();
    const payload: any = { ...raw };


    delete payload.p135Any;
    delete payload.p1312Any;

// ===== 13_5: Form(booleans) --> API(minúsculas, 'S'|'') =====
    const p135Keys = Object.keys(this.P135_MAP);

    p135Keys.forEach(formKey => {
      const apiKey = this.P135_MAP[formKey];

      if (formKey === 'p135AEspecifique') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p135ALogistica'];
        payload[apiKey] = jMarcado ? (raw['p135AEspecifique'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });


// ===== 13.7.: Form(booleans) --> API(minúsculas, 'S'|'') =====
    const p137Keys = Object.keys(this.P137_MAP);

    p137Keys.forEach(formKey => {
      const apiKey = this.P137_MAP[formKey];

      if (formKey === 'p137OtroDetalle') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p137Otro'];
        payload[apiKey] = jMarcado ? (raw['p137OtroDetalle'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });
    // ===== 13.7.: Form(booleans) --> API(minúsculas, 'S'|'') ===== FIN


    // ===== 13_12: Form(booleans) --> API(minúsculas, 'S'|'') =====
    const p1312Keys = Object.keys(this.P1312_MAP);

    p1312Keys.forEach(formKey => {
      const apiKey = this.P1312_MAP[formKey];

      if (formKey === 'p1312AEspecifique') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p1312ALogistica'];
        payload[apiKey] = jMarcado ? (raw['p1312AEspecifique'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });

    // ===== 13_12: Form(booleans) --> API(minúsculas, 'S'|'') ===== FIN

    // ===== 13.7.: Form(booleans) --> API(minúsculas, 'S'|'') =====
    const p1314Keys = Object.keys(this.P1314_MAP);

    p1314Keys.forEach(formKey => {
      const apiKey = this.P1314_MAP[formKey];

      if (formKey === 'p1314OtroDetalle') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p1314Otro'];
        payload[apiKey] = jMarcado ? (raw['p1314OtroDetalle'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });
    // ===== 13.7.: Form(booleans) --> API(minúsculas, 'S'|'') ===== FIN
// ===== 13.7.: Form(booleans) --> API(minúsculas, 'S'|'') =====
    const p132Keys = Object.keys(this.P132_MAP);

    p132Keys.forEach(formKey => {
      const apiKey = this.P132_MAP[formKey];

      if (formKey === 'p132OtroDetalle') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p132Otro'];
        payload[apiKey] = jMarcado ? (raw['p132OtroDetalle'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });
    // ===== 13.7.: Form(booleans) --> API(minúsculas, 'S'|'') ===== FIN

    payload.idFicha = this.idFicha ?? payload.idFicha;
    payload.estado_s13 = estado;
    return payload;
  }

  private enableRequired(ctrl: AbstractControl, validators: ValidatorFn[] = [Validators.required]) {
    ctrl.enable({ emitEvent: false });
    ctrl.setValidators(validators);
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  private disableSoft(ctrl: AbstractControl) {
    ctrl.reset({ value: '', disabled: true });
    ctrl.clearValidators();
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

  public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }

  private bindCheckEnablesRequiredText132(checkKey: string, textKey: string) {
    const chk  = this.f(checkKey);
    const text = this.f(textKey);
    if (!chk || !text) return;

    const apply = (val: any) => {
      const isOn = (val === 'S' || val === true);
      if (isOn) {
        // habilita + required
        this.enableRequired(text, [Validators.required]);
      } else {
        // limpia y deshabilita (sin required)
        this.disableSoft(text);
      }
      this.cdr.markForCheck();
    };

    // estado inicial + suscripciones
    apply(chk.value);
    chk.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }
  onOtroCheckboxChange13(nombreCheckbox: string, nombreDetalle: string) {
    const marcado = !!this.ficha13Form.get(nombreCheckbox)?.value; // true si 'S' o true
    const detalle = this.ficha13Form.get(nombreDetalle);
    if (marcado) {
      detalle?.enable();
      detalle?.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      detalle?.reset();
      detalle?.disable();
      detalle?.clearValidators();
      detalle?.setErrors(null);
    }
    detalle?.updateValueAndValidity();
  }
  private bindEnableRequiredAuto13(triggerKey: string, targetKey: string) {
    const trigger = this.f(triggerKey);
    const target = this.f(targetKey);
    if (!trigger || !target) return;

    const apply = (val: any) => {
      // 🔍 Detecta si debe habilitar el campo
      const isActive =
        val === 'S' ||                // valor tipo radio/char
        val === true ||               // checkbox
        (typeof val === 'number' && val !== 0) || // número distinto de 0
        (typeof val === 'string' && val.trim() !== ''); // texto no vacío

      if (isActive) {
        // Habilita el campo y lo marca como requerido
        this.enableRequired(target, [Validators.required]);
      } else {
        // Limpia, deshabilita y quita validadores
        this.disableSoft(target);
      }

      this.cdr.markForCheck();
    };

    // Aplica al iniciar + escucha cambios
    apply(trigger.value);
    trigger.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }
  ////HELPER PARA EL TEXTAREA////

  public charLen(controlName: string): number {
    const v = this.f(controlName)?.value;
    return typeof v === 'string' ? v.length : 0;
  }
  private controlarRadioSiNo(
    radioControlName: string,
    detalleControlName: string,
    habilitarValor: string
  ): void {
    const radio = this.ficha13Form.get(radioControlName);
    const detalle = this.ficha13Form.get(detalleControlName);
    if (!radio || !detalle) return;
    const aplicar = () => {
      const bloqueado = this.camposBloqueadosPorCheckbox.has(detalleControlName);
      if (radio.value !== habilitarValor) {
        detalle.reset();
        detalle.disable({ onlySelf: true });
        detalle.clearValidators();
      } else if (!bloqueado) {
        detalle.enable({ onlySelf: true });
        detalle.setValidators([Validators.required]);
      }
      detalle.updateValueAndValidity();
    };
    setTimeout(() => aplicar(), 0);
    radio.valueChanges.subscribe(() => aplicar());
  }


  private bindRadioEnablesOn13(
    sourceKey: string,
    predicate: (v: any) => boolean,
    targetKeys: string | string[],
    validators: ValidatorFn[] = [Validators.requiredTrue]
  ) {
    const src = this.f(sourceKey);
    const targets = Array.isArray(targetKeys)
      ? targetKeys.map(k => this.f(k))
      : [this.f(targetKeys)];

    if (!src) return;

    const actualizarValidadores = () => {
      const algunoMarcado = targets.some(t => !!t?.value);
      targets.forEach(t => {
        if (!t) return;
        if (algunoMarcado) {
          // ya hay uno marcado --> quitar required
          t.clearValidators();
        } else {
          // ninguno marcado --> poner required
          t.setValidators(validators);
        }
        t.updateValueAndValidity({ emitEvent: false });
      });
    };

    const apply = (val: any) => {
      const active = predicate(val);
      targets.forEach(t => {
        if (!t) return;
        if (active) {
          t.enable({ emitEvent: false });
        } else {
          t.reset(false, { emitEvent: false });
          t.clearValidators();
          t.disable({ emitEvent: false });
        }
        t.updateValueAndValidity({ emitEvent: false });
      });

      // 🔹 Nuevo: limpiar y desactivar el detalle "Otros" cuando se deshabilite todo el grupo
      const detalleOtros = this.f('p137OtroDetalle');
      if (!active && detalleOtros) {
        detalleOtros.reset('', { emitEvent: false });
        detalleOtros.disable({ emitEvent: false });
        detalleOtros.clearValidators();
        detalleOtros.updateValueAndValidity({ emitEvent: false });
      }

// 🔹 Nuevo: limpiar y desactivar el detalle "Otros" cuando se deshabilite todo el grupo
      const detalleOtros2 = this.f('p1314OtroDetalle');
      if (!active && detalleOtros2) {
        detalleOtros2.reset('', { emitEvent: false });
        detalleOtros2.disable({ emitEvent: false });
        detalleOtros2.clearValidators();
        detalleOtros2.updateValueAndValidity({ emitEvent: false });
      }


      // Aplica validación cruzada solo si el grupo está activo
      if (active) actualizarValidadores();
    };
    // Aplica inicialmente y escucha cambios del radio
    apply(src.value);
    src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);

    // Escucha cambios en los checkboxes del grupo
    targets.forEach(t => {
      t?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (predicate(src.value)) actualizarValidadores();
      });
    });

    this.cdr.markForCheck();
  }

  private controlarDetalleOtrosP137(): void {
    const otro = this.f('p137Otro')!;
    const detalle = this.f('p137OtroDetalle')!;

    // Monitoreamos cambios del checkbox "p311Otros"
    otro.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        detalle.enable();
        // detalle.setValidators([Validators.required]);
      } else {
        detalle.reset();
        detalle.disable();
        detalle.clearValidators();
      }
      detalle.updateValueAndValidity();
    });

    // Estado inicial al cargar el formulario
    if (!otro.value) {
      detalle.disable();
    }
  }
  private controlarDetalleOtrosP1314(): void {
    const otro2 = this.f('p1314Otro')!;
    const detalle = this.f('p1314OtroDetalle')!;

    // Monitoreamos cambios del checkbox "p311Otros"
    otro2.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        detalle.enable();
        // detalle.setValidators([Validators.required]);
      } else {
        detalle.reset();
        detalle.disable();
        detalle.clearValidators();
      }
      detalle.updateValueAndValidity();
    });

    // Estado inicial al cargar el formulario
    if (!otro2.value) {
      detalle.disable();
    }
  }




  private bindRadioEnablesOn132(
    sourceKey: string,
    predicate: (v: any) => boolean,
    targetKeys: string | string[],
    validators: ValidatorFn[] = [Validators.requiredTrue]
  ) {
    const src2 = this.f(sourceKey);
    const targets = Array.isArray(targetKeys)
      ? targetKeys.map(k => this.f(k))
      : [this.f(targetKeys)];

    if (!src2) return;

    const actualizarValidadores = () => {
      const algunoMarcado = targets.some(t => !!t?.value);
      targets.forEach(t => {
        if (!t) return;
        if (algunoMarcado) {
          // ya hay uno marcado --> quitar required
          t.clearValidators();
        } else {
          // ninguno marcado --> poner required
          t.setValidators(validators);
        }
        t.updateValueAndValidity({ emitEvent: false });
      });
    };

    const apply = (val: any) => {
      const active2 = predicate(val);
      targets.forEach(t => {
        if (!t) return;
        if (active2) {
          t.enable({ emitEvent: false });
        } else {
          t.reset(false, { emitEvent: false });
          t.clearValidators();
          t.disable({ emitEvent: false });
        }
        t.updateValueAndValidity({ emitEvent: false });
      });

      // 🔹 Nuevo: limpiar y desactivar el detalle "Otros" cuando se deshabilite todo el grupo
// 🔹 Nuevo: limpiar y desactivar el detalle "Otros" cuando se deshabilite todo el grupo
      const detalleOtros6 = this.f('p132OtroDetalle');
      if (!active2 && detalleOtros6) {
        detalleOtros6.reset('', { emitEvent: false });
        detalleOtros6.disable({ emitEvent: false });
        detalleOtros6.clearValidators();
        detalleOtros6.updateValueAndValidity({ emitEvent: false });
      }

      // Aplica validación cruzada solo si el grupo está activo
      if (active2) actualizarValidadores();
    };
    // Aplica inicialmente y escucha cambios del radio
    apply(src2.value);
    src2.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);

    // Escucha cambios en los checkboxes del grupo
    targets.forEach(t => {
      t?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (predicate(src2.value)) actualizarValidadores();
      });
    });

    this.cdr.markForCheck();
  }
  private controlarDetalleOtrosP132(): void {
    const otro6 = this.f('p132Otro')!;
    const detalle = this.f('p132OtroDetalle')!;

    // Monitoreamos cambios del checkbox "p311Otros"
    otro6.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        detalle.enable();
        // detalle.setValidators([Validators.required]);
      } else {
        detalle.reset();
        detalle.disable();
        detalle.clearValidators();
      }
      detalle.updateValueAndValidity();
    });

    // Estado inicial al cargar el formulario
    if (!otro6.value) {
      detalle.disable();
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////

// ✅ Habilita/Deshabilita y limpia TODOS los campos de la tabla 13.9 según 13.8
private bindP138ToP139(): void {
  const src = this.f('p138Cuenta');
  if (!src) return;

  // Tomamos los nombres desde tu propia definición anioP139
  const keys = this.anioP139.flatMap(k => [k.control, k.control2, k.control3]);
  const ctrls = keys
    .map(k => this.f(k))
    .filter((c): c is AbstractControl => !!c);

  const apply = (val: any) => {
    const active = (val === 'S'); // "Sí" activa 13.9
    ctrls.forEach(c => {
      if (active) {
        c.enable({ emitEvent: false });
        // Validador numérico no negativo (opcional agregar maxLength/patrón si quieres duplicar la directiva)
        c.setValidators([this.nonNegativeInt()]);
      } else {
        // "No" --> deshabilitar y LIMPIAR
        c.reset('', { emitEvent: false });
        c.clearValidators();
        c.disable({ emitEvent: false });
      }
      c.updateValueAndValidity({ emitEvent: false });
    });

    this.cdr.markForCheck();
  };

  // Estado inicial y suscripción
  apply(src.value);
  src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
}

// (Opcional) utilitario si alguna vez necesitas limpiar 13.9 manualmente
private clearP139(): void {
  const keys = this.anioP139.flatMap(k => [k.control, k.control2, k.control3]);
  keys.forEach(k => {
    const c = this.f(k);
    if (!c) return;
    c.reset('', { emitEvent: false });
    c.updateValueAndValidity({ emitEvent: false });
  });
}




  // private ctrl(path: string): AbstractControl | null { return this.ficha13Form.get(path); }

  // private anyChecked(keys: string[]): boolean {
  //   return keys.some(k => !!this.ctrl(k)?.value);
  // }

  // public showGroupErrors = false;


 private isGroupTouched(keys: string[]): boolean {
  return keys.some(k => {
    const c = this.f(k);
    return !!c && (c.touched || c.dirty);
  });
}

private readonly GROUP_CA133   = ['p133Formulario','p133Virtual','p133Fisica'];

get invalidCA133() {
  const any = this.anyChecked(this.GROUP_CA133);
  const shouldShow =
    this.showAllErrors ||
    this.showGroupErrors ||
    this.isGroupTouched(this.GROUP_CA133);

 return shouldShow && !any;
}



 private readonly GROUP_CA137 = ['p137Mre','p137Reniec','p137Migraciones','p137Interpol','p137Inei','p137Jne','p137Onpe','p137Sunarp','p137PoderJudicial','p137Otro'];

 
 get invalidCA137(): boolean {
    const recibeCapac = this.f('p136Recibe')?.value;
    if (recibeCapac !== 'S') return false;

    const anyChecked = this.GROUP_CA137.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return ctrl?.value === true;
    });

    const groupTouched = this.GROUP_CA137.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return !!(ctrl && (ctrl.touched || ctrl.dirty));
    });

    const shouldShow = this.showAllErrors || groupTouched;
    return shouldShow && !anyChecked;
  }


 private readonly GROUP_CA1314 = ['p1314Mre','p1314Reniec','p1314Migracion','p1314Interpol','p1314Inei','p1314Jne','p1314Onpe','p1314Sunarp','p1314PoderJudicial','p1314Otro'];

   get invalidCA1314(): boolean {
    const recibeCapac = this.f('p1313Recibe')?.value;
    if (recibeCapac !== 'S') return false;

    const anyChecked = this.GROUP_CA1314.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return ctrl?.value === true;
    });

    const groupTouched = this.GROUP_CA1314.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return !!(ctrl && (ctrl.touched || ctrl.dirty));
    });

    const shouldShow = this.showAllErrors || groupTouched;
    return shouldShow && !anyChecked;
  }

 private readonly GROUP_CA132 = ['p132Contratacion','p132Personal','p132Planeamiento','p132Actividades','p132Presupuesto','p132Otro'];

   get invalidCAP132(): boolean {
    const recibeCapac = this.f('p131Oficina')?.value;
    if (recibeCapac !== 'S') return false;

    const anyChecked = this.GROUP_CA132.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return ctrl?.value === true;
    });

    const groupTouched = this.GROUP_CA132.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return !!(ctrl && (ctrl.touched || ctrl.dirty));
    });

    const shouldShow = this.showAllErrors || groupTouched;
    return shouldShow && !anyChecked;
  }


 

// ============================================
// GETTERS PARA VALIDACIONES DE GRUPO
// ============================================


get showP135GroupError(): boolean {
  const anyCtrl = this.f('p135Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}


get showP1312GroupError(): boolean {
  const anyCtrl = this.f('p1312Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

}
