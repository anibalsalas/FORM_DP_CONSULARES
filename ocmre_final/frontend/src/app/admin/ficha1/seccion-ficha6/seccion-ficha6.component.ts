
/////////////////////////////////////////////////////////////////////
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

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule }     from '@angular/material/button';
import { MatInputModule }      from '@angular/material/input';
import { MatIconModule }       from '@angular/material/icon';
import { MatDividerModule }    from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';

// Servicios
import { Ficha1Service } from '../ficha1.service';
//import { AuthService } from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {Max3DigitsDirective} from '../seccion-ficha3/max-3digits';
import {Max4DigitsDirective} from './max-4digits.directive';
import {MatCheckbox} from '@angular/material/checkbox';
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
  selector: 'app-seccion-ficha6',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatRadioButton, MatRadioGroup, Max3DigitsDirective, Max4DigitsDirective, MatCheckbox
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './seccion-ficha6.component.html',
  styleUrls: ['./seccion-ficha6.component.scss']
})
export class SeccionFicha6Component implements OnInit, OnChanges, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha6: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  // ===== Estado =====
  ficha6Form: FormGroup;
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

  Ninguna  = ['p633Ninguno'];
  Ninguno  = ['p642Ninguno'];
  pasajerosNum = [
    { Pasajeros: 'Nº Hombres', control: 'p631Hombre2023',control2:'p631Hombre2024',control3:'p631Hombre2025'},
    { Pasajeros: 'Nº Mujeres', control: 'p631Mujer2023',control2:'p631Mujer2024',control3:'p631Mujer2025' },
    { Pasajeros: 'TOTAL', control: 'p631Total2023',control2:'p631Total2024',control3:'p631Total2025' },
    { Pasajeros: 'N° personas con discapacidad', control: 'p631Personas2023',control2:'p631Personas2024',control3:'p631Personas2025' }
  ];

  necesidadesData = [
    { tipo: 'Logística', checkControl: 'p633ALogistica', gestionControl: 'p633AGestiones', suficienteControl: 'p633ASuficiente', observacionesControl: 'p633AEspecifique'},
    { tipo: 'Infraestructura', checkControl: 'p633BInfra', gestionControl: 'p633BGestiones', suficienteControl: 'p633BSuficiente', observacionesControl: 'p633BEspecifique'},
    { tipo: 'Personal', checkControl: 'p633CPersonal', gestionControl: 'p633CGestiones', suficienteControl: 'p633CSuficiente', observacionesControl: 'p633CEspecifique'},
    { tipo: 'Presupuesto', checkControl: 'p633DPresupuesto', gestionControl: 'p633DGestiones', suficienteControl: 'p633DSuficiente', observacionesControl: 'p633DEspecifique'},
    { tipo: 'Otro, especifique:', checkControl: 'p633EOtro', especifiqueControl: 'p633EOtroDetalle', gestionControl: 'p633EGestiones', suficienteControl: 'p633ESuficiente', observacionesControl: 'p633EEspecifique'}
  ];
  private readonly P633_MAP: Record<string, string> = {
    p633ALogistica: 'p633ALogistica',
    p633BInfra: 'p633BInfra',
    p633CPersonal: 'p633CPersonal',
    p633DPresupuesto: 'p633DPresupuesto',
    p633EOtro: 'p633EOtro',
    p633Ninguno: 'p633Ninguno',
  };

  private readonly P635_MAP: Record<string, string> = {
    p635Mre: 'p635Mre',
    p635Reniec: 'p635Reniec',
    p635Migraciones: 'p635Migraciones',
    p635Interpol: 'p635Interpol',
    p635Inei: 'p635Inei',
    p635Jne: 'p635Jne',
    p635Onpe: 'p635Onpe',
    p635Sunarp: 'p635Sunarp',
    p635PoderJudicial: 'p635PoderJudicial',
    p635Otro: 'p635Otro',
    p635Ninguna: 'p635Ninguna',
    p635OtroDetalle: 'p635OtroDetalle',
  };

  private readonly P644_MAP: Record<string, string> = {
    p644Mre: 'p644Mre',
    p644Reniec: 'p644Reniec',
    p644Migraciones: 'p644Migraciones',
    p644Interpol: 'p644Interpol',
    p644Inei: 'p644Inei',
    p644Jne: 'p644Jne',
    p644Onpe: 'p644Onpe',
    p644Sunarp: 'p644Sunarp',
    p644PoderJudicial: 'p644PoderJudicial',
    p644Otro: 'p644Otro',
    p644OtroDetalle: 'p644OtroDetalle',
    p644Ninguna: 'p644Ninguna',

  };

  numSalvoconducto = [
    { Anio: 'N° Mayores de edad', control: 'p641Mayor2023',control2:'p641Mayor2024',control3:'p641Mayor2025'},
    { Anio: 'Nº Menores de edad', control: 'p641Menor2023',control2:'p641Menor2024',control3:'p641Menor2025' },
    { Anio: 'TOTAL', control: 'p641Total2023',control2:'p641Total2024',control3:'p641Total2025' }
  ];

  tipo = [
    { tipo: 'Logística', checkControl: 'p642ALogistica', gestionControl: 'p642AGestiones', suficienteControl: 'p642ASuficiente', observacionesControl: 'p642AEspecifique'},
    { tipo: 'Infraestructura', checkControl: 'p642BInfra', gestionControl: 'p642BGestiones', suficienteControl: 'p642BSuficiente', observacionesControl: 'p642BEspecifique'},
    { tipo: 'Personal', checkControl: 'p642CPersonal', gestionControl: 'p642CGestiones', suficienteControl: 'p642CSuficiente', observacionesControl: 'p642CEspecifique'},
    { tipo: 'Presupuesto', checkControl: 'p642DPresupuesto', gestionControl: 'p642DGestiones', suficienteControl: 'p642DSuficiente', observacionesControl: 'p642DEspecifique'},
    { tipo: 'Otro, especifique:', checkControl: 'p642EOtro', especifiqueControl: 'p642EOtroDetalle', gestionControl: 'p642EGestiones', suficienteControl: 'p642ESuficiente', observacionesControl: 'p642EEspecifique'}
  ];

  necesidadesData2 = [
    { tipo: 'Logística', checkControl: 'p642ALogistica', gestionControl: 'p642AGestiones', suficienteControl: 'p642ASuficiente', observacionesControl: 'p642AEspecifique'},
    { tipo: 'Infraestructura', checkControl: 'p642BInfra', gestionControl: 'p642BGestiones', suficienteControl: 'p642BSuficiente', observacionesControl: 'p642BEspecifique'},
    { tipo: 'Personal', checkControl: 'p642CPersonal', gestionControl: 'p642CGestiones', suficienteControl: 'p642CSuficiente', observacionesControl: 'p642CEspecifique'},
    { tipo: 'Presupuesto', checkControl: 'p642DPresupuesto', gestionControl: 'p642DGestiones', suficienteControl: 'p642DSuficiente', observacionesControl: 'p642DEspecifique'},
    { tipo: 'Otro, especifique:', checkControl: 'p642EOtro', especifiqueControl: 'p642EOtroDetalle', gestionControl: 'p642EGestiones', suficienteControl: 'p642ESuficiente', observacionesControl: 'p642EEspecifique'}
  ];

  private readonly P642_MAP: Record<string, string> = {
    p642ALogistica: 'p642ALogistica',
    p642BInfra: 'p642BInfra',
    p642CPersonal: 'p642CPersonal',
    p642DPresupuesto: 'p642DPresupuesto',
    p642EOtro: 'p642EOtro',
    p642Ninguno: 'p642Ninguno',
  };


  private requireAtLeastOneP633(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha6Form) return null;
    
    const keys = ['p633ALogistica', 'p633BInfra', 'p633CPersonal', 'p633DPresupuesto', 'p633EOtro', 'p633Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha6Form.get(k);
      return ctrl?.value === 'S' || ctrl?.value === true;
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

private requireAtLeastOneP642(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha6Form) return null;
    
    const keys = ['p642ALogistica', 'p642BInfra', 'p642CPersonal', 'p642DPresupuesto', 'p642EOtro', 'p642Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha6Form.get(k);
      return ctrl?.value === 'S' || ctrl?.value === true;
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

  constructor() {
    this.dateAdapter.setLocale('es-PE');

    // Inicialización mínima del formulario
    this.ficha6Form = this.fb.group({
      idFicha: [null],
      idFichas6: [null],
      estado_s6: [''],
      valida_s6: [''],
      p61Requiere:[null, Validators.required],
      p62Afirmativa:[''],
      p631Hombre2023:[''], p631Hombre2024:[''], p631Hombre2025:[''],
      p631Mujer2023:[''], p631Mujer2024:[''], p631Mujer2025:[''],
      p631Total2023:[''], p631Total2024:[''], p631Total2025:[''],
      p631Personas2023:[''], p631Personas2024:[''], p631Personas2025:[''],
      p632Cuenta:[null, Validators.required],

      p633ALogistica:[false],
      p633AGestiones:[{ value: null, disabled: true }],
      p633ASuficiente:[{ value: null, disabled: true }],
      p633AEspecifique:[{ value: null, disabled: true }],

      p633BInfra:[null],
      p633BGestiones:[{ value: null, disabled: true }],
      p633BSuficiente:[{ value: null, disabled: true }],
      p633BEspecifique:[{ value: null, disabled: true }],

      p633CPersonal:[null],
      p633CGestiones:[{ value: null, disabled: true }],
      p633CSuficiente:[{ value: null, disabled: true }],
      p633CEspecifique:[{ value: null, disabled: true }],

      p633DPresupuesto:[null],
      p633DGestiones:[{ value: null, disabled: true }],
      p633DSuficiente:[{ value: null, disabled: true }],
      p633DEspecifique:[{ value: null, disabled: true }],

      p633EOtro:[null],
      p633EGestiones:[{ value: null, disabled: true }],
      p633ESuficiente:[{ value: null, disabled: true }],
      p633EEspecifique:[{ value: null, disabled: true }],
      p633EOtroDetalle:[{ value: '',  disabled: true }],
      p633Ninguno:[false],

      p634Recibe:[null, Validators.required],

      p635Mre: [false],
      p635Reniec: [false],
      p635Migraciones: [false],
      p635Interpol: [false],
      p635Inei: [false],
      p635Jne: [false],
      p635Onpe: [false],
      p635Sunarp: [false],
      p635PoderJudicial: [false],
      p635Otro: [false],
      p635OtroDetalle: [{ value: '', disabled: false }, [Validators.maxLength(200)]],
      p635Ninguna: [false],
      p641Mayor2023:['', Validators.required], p641Mayor2024:['', Validators.required], p641Mayor2025:['', Validators.required],
      p641Menor2023:['', Validators.required], p641Menor2024:['', Validators.required], p641Menor2025:['', Validators.required],
      p641Total2023:[''], p641Total2024:[''], p641Total2025:[''],

      p643Recibe:[null, Validators.required],

      p644Mre: [false],
      p644Reniec: [false],
      p644Migraciones: [false],
      p644Interpol: [false],
      p644Inei: [false],
      p644Jne: [false],
      p644Onpe: [false],
      p644Sunarp: [false],
      p644PoderJudicial: [false],
      p644Otro: [false],
      p644OtroDetalle: [{ value: '', disabled: false }, [Validators.maxLength(200)]],
      p644Ninguna: [false],

      p642ALogistica:[false],
      p642AGestiones:[{ value: null, disabled: true }],
      p642ASuficiente:[{ value: null, disabled: true }],
      p642AEspecifique:[{ value: '',  disabled: true }],

      p642BInfra:[null],
      p642BGestiones:[{ value: null, disabled: true }],
      p642BSuficiente:[{ value: null, disabled: true }],
      p642BEspecifique:[{ value: '',  disabled: true }],

      p642CPersonal:[null],
      p642CGestiones:[{ value: null, disabled: true }],
      p642CSuficiente:[{ value: null, disabled: true }],
      p642CEspecifique:[{ value: '',  disabled: true }],

      p642DPresupuesto:[null],
      p642DGestiones:[{ value: null, disabled: true }],
      p642DSuficiente:[{ value: null, disabled: true }],
      p642DEspecifique:[{ value: '',  disabled: true }],

      p642EOtro:[null],
      p642EGestiones:[{ value: null, disabled: true }],
      p642ESuficiente:[{ value: null, disabled: true }],
      p642EEspecifique:[{ value: '',  disabled: true }],
      p642EOtroDetalle:[{ value: '',  disabled: true }],
      p642Ninguno:[false],
      p642Any: [null, this.requireAtLeastOneP642()],

      p633Any: [null, this.requireAtLeastOneP633()],
    });
    this.setupFormListeners();
  }

  ////PREGUNTA_6.3.5
  private setupP635Listeners(): void {
    const group = ['p635Mre','p635Reniec','p635Migraciones','p635Interpol','p635Inei','p635Jne','p635Onpe','p635Sunarp','p635PoderJudicial',
      'p635Otro'];

    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p635Ninguna')?.setValue(false, { emitEvent: false });
      });
    });

    // “Otro” (J) habilita detalle
    this.f('p635Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p635OtroDetalle')!;
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
    this.f('p635Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p635OtroDetalle')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
  ////PREGUNTA_6.3.5 FIN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 private bindEnableIfCheckedOrHasText(
  checkKey: string,
  textKey: string,
  validators: ValidatorFn[] = [Validators.maxLength(200)]
) {
  const chk  = this.f(checkKey);
  const text = this.f(textKey);
  if (!chk || !text) return;

  const isOn = (v: any) => v === 'S' || v === true || v === 1 || v === '1';

  const apply = () => {
    const checked = isOn(chk.value);
    const hasText = typeof text.value === 'string' && text.value.trim().length > 0;

    if (checked || hasText) {
      // Mantener habilitado si hay texto, aunque el check esté apagado
      text.enable({ emitEvent: false });
      text.setValidators(validators);
    } else {
      // Sin check y sin texto: limpiar y deshabilitar
      text.reset('', { emitEvent: false });
      text.clearValidators();
      text.disable({ emitEvent: false });
    }
    text.updateValueAndValidity({ emitEvent: false });
  };

  // Estado inicial (importante para cuando haces patchValue/hidratación)
  apply();

  // Reaccionar a cambios del check y del texto
  chk.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  text.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
}


  ///////PREGUNTA_6.3.3
  private setupP633Listeners(): void {
    const group = ['p633ALogistica','p633BInfra','p633CPersonal','p633DPresupuesto','p633EOtro'];


    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p633Ninguno')?.setValue(false, { emitEvent: false });
      });
    });


    [
  ['p633ALogistica', 'p633AEspecifique'],
  ['p633BInfra',     'p633BEspecifique'],
  ['p633CPersonal',  'p633CEspecifique'],
  ['p633DPresupuesto','p633DEspecifique'],
  ['p633EOtro',      'p633EEspecifique'],
].forEach(([chk, det]) => this.bindEnableIfCheckedOrHasText(chk, det));


  //   this.f('p633ALogistica')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
  //     const det = this.f('p633AEspecifique')!;

  //     if (ch) {
  //       det.enable({ emitEvent: false });
  //       det.setValidators([Validators.maxLength(200)]);
  //     } else {
  //       det.reset('', { emitEvent: false });
  //       det.clearValidators();
  //       det.disable({ emitEvent: false });
  //     }
  //     det.updateValueAndValidity({ emitEvent: false });
  //   });

  //    this.f('p633BInfra')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
  //     const det = this.f('p633BEspecifique')!;

  //     if (ch) {
  //       det.enable({ emitEvent: false });
  //       det.setValidators([Validators.maxLength(200)]);
  //     } else {
  //       det.reset('', { emitEvent: false });
  //       det.clearValidators();
  //       det.disable({ emitEvent: false });
  //     }
  //     det.updateValueAndValidity({ emitEvent: false });
  //   });

  //       this.f('p633CPersonal')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
  //     const det = this.f('p633CEspecifique')!;

  //     if (ch) {
  //       det.enable({ emitEvent: false });
  //       det.setValidators([Validators.maxLength(200)]);
  //     } else {
  //       det.reset('', { emitEvent: false });
  //       det.clearValidators();
  //       det.disable({ emitEvent: false });
  //     }
  //     det.updateValueAndValidity({ emitEvent: false });
  //   });

  // this.f('p633DPresupuesto')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
  //     const det = this.f('p633DEspecifique')!;

  //     if (ch) {
  //       det.enable({ emitEvent: false });
  //       det.setValidators([Validators.maxLength(200)]);
  //     } else {
  //       det.reset('', { emitEvent: false });
  //       det.clearValidators();
  //       det.disable({ emitEvent: false });
  //     }
  //     det.updateValueAndValidity({ emitEvent: false });
  //   });

  //   this.f('p633EOtro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
  //     const det = this.f('p633EEspecifique')!;

  //     if (ch) {
  //       det.enable({ emitEvent: false });
  //       det.setValidators([Validators.maxLength(200)]);
  //     } else {
  //       det.reset('', { emitEvent: false });
  //       det.clearValidators();
  //       det.disable({ emitEvent: false });
  //     }
  //     det.updateValueAndValidity({ emitEvent: false });
  //   });


 this.f('p633Ninguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
  const on = v === 'S' || v === true;
  if (!on) return;

  const checks = ['p633ALogistica','p633BInfra','p633CPersonal','p633DPresupuesto','p633EOtro'];
  const details = ['p633AEspecifique','p633BEspecifique','p633CEspecifique','p633DEspecifique','p633EEspecifique'];

  // Apaga checks
  checks.forEach(k => this.f(k)?.setValue(null, { emitEvent: false }));

  // Limpia y deshabilita detalles
  details.forEach(k => {
    const c = this.f(k);
    if (!c) return;
    c.reset('', { emitEvent: false });
    c.clearValidators();
    c.disable({ emitEvent: false });
    c.updateValueAndValidity({ emitEvent: false });
  });
});

  }
///////PREGUNTA_6.3.3 FIN


  ///////PREGUNTA_6.4.2
  private setupP642Listeners(): void {
    const group = ['p642ALogistica','p642BInfra','p642CPersonal','p642DPresupuesto','p642EOtro'];


    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p642Ninguno')?.setValue(false, { emitEvent: false });
      });
    });



        [
  ['p642ALogistica', 'p642AEspecifique'],
  ['p642BInfra',     'p642BEspecifique'],
  ['p642CPersonal',  'p642CEspecifique'],
  ['p642DPresupuesto','p642DEspecifique'],
  ['p642EOtro',      'p642EEspecifique'],
].forEach(([chk, det]) => this.bindEnableIfCheckedOrHasText(chk, det));


    // “Otro” (J) habilita detalle
    
    // “Ninguna” (K) apaga A–J y el detalle
    this.f('p642Ninguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p642BGestiones')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
///////PREGUNTA_6.4.2 FIN

  ///////PREGUNTA_6.4.4
  private setupP644Listeners(): void {
    const group = ['p644Mre','p644Reniec','p644Migraciones','p644Interpol','p644Inei','p644Jne','p644Onpe','p644Sunarp','p644PoderJudicial','p644Otro'];

    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p644Ninguna')?.setValue(false, { emitEvent: false });
      });
    });

    // “Otro” (J) habilita detalle
    this.f('p644Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p644OtroDetalle')!;
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
    this.f('p644Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p644OtroDetalle')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
  ///////6.4.4 fim
  // ===== Ciclo de vida =====

  private disableSoftWithNull(ctrl: AbstractControl | null) {
    if (!ctrl) return;                       // ← protege null
    ctrl.reset({ value: null, disabled: true });
    ctrl.clearValidators();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  ///suma631
  calcularTotales(): void {
    this.ficha6Form.get('p631Hombre2023')?.valueChanges.subscribe(() => this.actualizarTotal2023());
    this.ficha6Form.get('p631Mujer2023')?.valueChanges.subscribe(() => this.actualizarTotal2023());

    this.ficha6Form.get('p631Hombre2024')?.valueChanges.subscribe(() => this.actualizarTotal2024());
    this.ficha6Form.get('p631Mujer2024')?.valueChanges.subscribe(() => this.actualizarTotal2024());

    this.ficha6Form.get('p631Hombre2025')?.valueChanges.subscribe(() => this.actualizarTotal2025());
    this.ficha6Form.get('p631Mujer2025')?.valueChanges.subscribe(() => this.actualizarTotal2025());
  }
  actualizarTotal2023(): void {
    const hombres = this.ficha6Form.get('p631Hombre2023')?.value || 0;
    const mujeres = this.ficha6Form.get('p631Mujer2023')?.value || 0;
    this.ficha6Form.get('p631Total2023')?.setValue(hombres + mujeres, { emitEvent: false });
  }

  actualizarTotal2024(): void {
    const hombres = this.ficha6Form.get('p631Hombre2024')?.value || 0;
    const mujeres = this.ficha6Form.get('p631Mujer2024')?.value || 0;
    this.ficha6Form.get('p631Total2024')?.setValue(hombres + mujeres, { emitEvent: false });
  }

  actualizarTotal2025(): void {
    const hombres = this.ficha6Form.get('p631Hombre2025')?.value || 0;
    const mujeres = this.ficha6Form.get('p631Mujer2025')?.value || 0;
    this.ficha6Form.get('p631Total2025')?.setValue(hombres + mujeres, { emitEvent: false });
  }



// ===== Validación “al menos una” por grupo condicional =====
  private ctrl(path: string): AbstractControl | null { return this.ficha6Form.get(path); }
  private readonly GROUP_CA   = ['p635Mre','p635Reniec','p635Migraciones', 'p635Interpol', 'p635Inei', 'p635Jne', 'p635Onpe', 'p635Sunarp', 'p635PoderJudicial', 'p635Otro', 'p635Ninguna'];
  private readonly GROUP_CAP   = ['p644Mre','p644Reniec','p644Migraciones', 'p644Interpol', 'p644Inei', 'p644Jne', 'p644Onpe', 'p644Sunarp', 'p644PoderJudicial', 'p644Otro', 'p644Ninguna'];

  private anyChecked(keys: string[]): boolean {
    return keys.some(k => !!this.ctrl(k)?.value);
  }
  public showGroupErrors = false;

  // get invalidCA() {
  //   return this.showGroupErrors && !this.anyChecked(this.GROUP_CA);
  // }

   private isGroupTouched(keys: string[]): boolean {
  return keys.some(k => {
    const c = this.f(k);
    return !!c && (c.touched || c.dirty);
  });
}

  get invalidCA() {
  const active = this.f('p634Recibe')?.value === 'S';
  const any = this.anyChecked(this.GROUP_CA);
  const shouldShow =
    this.showAllErrors ||
    this.showGroupErrors ||
    this.isGroupTouched(this.GROUP_CA);

  return active && shouldShow && !any;
}




  get invalidCAP() {
  const active = this.f('p643Recibe')?.value === 'S';
  const any = this.anyChecked(this.GROUP_CAP);
  const shouldShow =
    this.showAllErrors ||
    this.showGroupErrors ||
    this.isGroupTouched(this.GROUP_CAP);

  return active && shouldShow && !any;
}
  // get invalidCAP() {
  //   return this.showGroupErrors && !this.anyChecked(this.GROUP_CAP);
  // }


/**
 * Verifican si deben mostrar el error 
 */

  get showP633GroupError(): boolean {
  const anyCtrl = this.f('p633Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get showP642GroupError(): boolean {
  const anyCtrl = this.f('p642Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}
/***********************************************************/

  private setupFormListeners(): void {

    //PARA PREGUNTA 6.3.5
    this.f('p635Ninguna')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p635Mre','p635Reniec','p635Migraciones','p635Interpol','p635Inei','p635Jne','p635Onpe','p635Sunarp','p635PoderJudicial','p635Otro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange6('p635Otro','p635OtroDetalle');
        this.cdr.markForCheck();
      }
    });
    //PARA PREGUNTA 6.3.3
    this.f('p633Ninguno')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p633ALogistica','p633BInfra','p633CPersonal','p633DPresupuesto','p633EOtro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange6('p633ALogistica','p633AGestiones');
        this.onOtroCheckboxChange6('p633ALogistica','p633ASuficiente');
       this.onOtroCheckboxChange6('p633ALogistica','p633AEspecifique');

        this.onOtroCheckboxChange6('p633BInfra','p633BGestiones');
        this.onOtroCheckboxChange6('p633BInfra','p633BSuficiente');
        this.onOtroCheckboxChange6('p633BInfra','p633BEspecifique');

        this.onOtroCheckboxChange6('p633CPersonal','p633CGestiones');
        this.onOtroCheckboxChange6('p633CPersonal','p633CSuficiente');
        this.onOtroCheckboxChange6('p633CPersonal','p633CEspecifique');

        this.onOtroCheckboxChange6('p633DPresupuesto','p633DGestiones');
        this.onOtroCheckboxChange6('p633DPresupuesto','p633DSuficiente');
        this.onOtroCheckboxChange6('p633DPresupuesto','p633DEspecifique');

        this.onOtroCheckboxChange6('p633EOtro','p633EOtroDetalle');
        this.onOtroCheckboxChange6('p633EOtro','p633EGestiones');
        this.onOtroCheckboxChange6('p633EOtro','p633ESuficiente');
        this.onOtroCheckboxChange6('p633EOtro','p633EEspecifique');

        this.cdr.markForCheck();
      }

    });
    //PARA PREGUNTA 6.4.4
    this.f('p642Ninguno')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p642ALogistica','p642BInfra','p642CPersonal','p642DPresupuesto','p642EOtro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange6('p642ALogistica','p642AGestiones');
        this.onOtroCheckboxChange6('p642ALogistica','p642ASuficiente');
        this.onOtroCheckboxChange6('p642ALogistica','p642AEspecifique');

        this.onOtroCheckboxChange6('p642BInfra','p642BGestiones');
        this.onOtroCheckboxChange6('p642BInfra','p642BSuficiente');
        this.onOtroCheckboxChange6('p642BInfra','p642BEspecifique');

        this.onOtroCheckboxChange6('p642CPersonal','p642CGestiones');
        this.onOtroCheckboxChange6('p642CPersonal','p642CSuficiente');
        this.onOtroCheckboxChange6('p642CPersonal','p642CEspecifique');

        this.onOtroCheckboxChange6('p642DPresupuesto','p642DGestiones');
        this.onOtroCheckboxChange6('p642DPresupuesto','p642DSuficiente');
        this.onOtroCheckboxChange6('p642DPresupuesto','p642DEspecifique');

        this.onOtroCheckboxChange6('p642EOtro','p642EOtroDetalle');
        this.onOtroCheckboxChange6('p642EOtro','p642EGestiones');
        this.onOtroCheckboxChange6('p642EOtro','p642ESuficiente');
        this.onOtroCheckboxChange6('p642EOtro','p642EEspecifique');

        this.cdr.markForCheck();
      }

    });
    //PARA PREGUNTA 6.3.5
    this.f('p644Ninguna')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p644Mre','p644Reniec','p644Migraciones','p644Interpol','p644Inei','p644Jne','p644Onpe','p644Sunarp','p644PoderJudicial','p644Otro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange6('p644Otro','p644OtroDetalle');
        this.cdr.markForCheck();
      }
    });


  }
  ngOnInit(): void {
    this.calcularTotales();

 

    this.controlarRadioSiNo('p61Requiere', 'p62Afirmativa', 'S');
    this.setupP633Listeners();
    this.setupP635Listeners();
    this.setupP642Listeners();
    this.setupP644Listeners();


    [
      ['p633ALogistica', 'p633AGestiones'],['p633ALogistica'],
      ['p633BInfra', 'p633BGestiones'],['p633BInfra'],
      ['p633CPersonal', 'p633CGestiones'],['p633CPersonal'],
      ['p633DPresupuesto', 'p633DGestiones'],['p633DPresupuesto'],
      ['p633EOtro', 'p633EGestiones'],['p633EOtro'],['p633EOtro', 'p633EOtroDetalle']
    ].forEach(([chk, txt]) => this.bindEnableRequiredAuto6(chk, txt));
    this.controlarRadioSiNo('p633AGestiones', 'p633ASuficiente', 'S');
    this.controlarRadioSiNo('p633BGestiones', 'p633BSuficiente', 'S');
    this.controlarRadioSiNo('p633CGestiones', 'p633CSuficiente', 'S');
    this.controlarRadioSiNo('p633DGestiones', 'p633DSuficiente', 'S');
    this.controlarRadioSiNo('p633EGestiones', 'p633ESuficiente', 'S');

// 6.3.5: el “especifique” arranca deshabilitado
//     this.disableSoftWithNull(this.f('p635Mre'));

    // Si respondió “No” (N) en p215OrganoLinea ⇒ habilitar + required p215Especifique
    this.bindRadioEnablesOn6(
      'p634Recibe', v => v === 'S',
      ['p635Mre','p635Reniec','p635Migraciones','p635Interpol','p635Inei',
        'p635Jne','p635Onpe','p635Sunarp','p635PoderJudicial','p635Otro','p635Ninguna'
      ],
      [Validators.requiredTrue]
    );
    // 🔹 Controlar el campo "p311OtrosDetalle"
    this.controlarDetalleOtros();

    this.controlarSuma('p641Mayor2023', 'p641Menor2023', 'p641Total2023');
    this.controlarSuma('p641Mayor2024', 'p641Menor2024', 'p641Total2024');
    this.controlarSuma('p641Mayor2025', 'p641Menor2025', 'p641Total2025');

    this.bindRadioEnablesOn6(
      'p643Recibe', v => v === 'S',
      ['p644Mre','p644Reniec','p644Migraciones','p644Interpol','p644Inei',
        'p644Jne','p644Onpe','p644Sunarp','p644PoderJudicial','p644Otro','p644Ninguna'
      ],
      [Validators.requiredTrue]
    );
    this.controlarDetalleOtrosP644();
    [
      ['p642ALogistica', 'p642AGestiones'],['p642ALogistica'],
      ['p642BInfra', 'p642BGestiones'],['p642BInfra'],
      ['p642CPersonal', 'p642CGestiones'],['p642CPersonal'],
      ['p642DPresupuesto', 'p642DGestiones'],['p642DPresupuesto'],
      ['p642EOtro', 'p642EGestiones'],['p642EOtro'],['p642EOtro', 'p642EOtroDetalle']
    ].forEach(([chk, txt]) => this.bindEnableRequiredAuto6(chk, txt));
    this.controlarRadioSiNo('p642AGestiones', 'p642ASuficiente', 'S');
    this.controlarRadioSiNo('p642BGestiones', 'p642BSuficiente', 'S');
    this.controlarRadioSiNo('p642CGestiones', 'p642CSuficiente', 'S');
    this.controlarRadioSiNo('p642DGestiones', 'p642DSuficiente', 'S');
    this.controlarRadioSiNo('p642EGestiones', 'p642ESuficiente', 'S');



  this.setupDisabilityValidation('p631Total2023', 'p631Personas2023');
  this.setupDisabilityValidation('p631Total2024', 'p631Personas2024');
  this.setupDisabilityValidation('p631Total2025', 'p631Personas2025');

  }


  // Método Helper para validar lógica de negocio
private setupDisabilityValidation(totalControlName: string, discapControlName: string) {
  const totalCtrl = this.ficha6Form.get(totalControlName);
  const discapCtrl = this.ficha6Form.get(discapControlName);

  if (!totalCtrl || !discapCtrl) return;

  // Escuchar cambios en ambos para revalidar
  const validate = () => {
    const total = Number(totalCtrl.value || 0);
    const discap = Number(discapCtrl.value || 0);

    if (discap > total) {
      discapCtrl.setErrors({ maxDisabilityExceeded: true }); // <--- Esto activa tu mat-error
    } else {
      // Si tiene error required, no lo borres, si no, null
      if (discapCtrl.hasError('required')) return;
      discapCtrl.setErrors(null);
    }
  };

  discapCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
  totalCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
}
// Reemplaza el bloque en ngOnChanges por uno que fuerce el autosave inicial
ngOnChanges(changes: SimpleChanges): void {
  if (changes['datosFicha6']?.currentValue) {
    this.populateForm(changes['datosFicha6'].currentValue);
  }

// Y en ngOnChanges:
if (changes['activarAutosave']?.currentValue === true && !this.autosaveLanzado) {
  if (this.shouldAutosave(true)) {      
    this.autosaveSilencioso();
    this.autosaveLanzado = true;
  }
}
}


   private shouldAutosave(initial = false): boolean {
  if (!this.idFicha && !this.f('idFicha')?.value) return false;
  if (initial) return true;             // fuerza en apertura
  return this.ficha6Form.dirty;         // después, solo si hay cambios
}



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // public onCheckboxChange6(controlName: string, event: any): void {
  //   const checked = !!event?.checked;
  //   const ctrl = this.f(controlName);
  //   ctrl?.setValue(checked ? 'S' : null);
  //   ctrl?.markAsDirty();
  //   ctrl?.markAsTouched();
  //   ctrl?.updateValueAndValidity({ emitEvent: true });
  //   this.cdr.markForCheck();
  // }

  public onCheckboxChange6(controlName: string, event: any): void {
  const checked = !!event?.checked;
  const ctrl = this.f(controlName);
  ctrl?.setValue(checked ? 'S' : null);
  ctrl?.markAsDirty();
  ctrl?.markAsTouched();
  ctrl?.updateValueAndValidity({ emitEvent: true });
  
  //Revalidaciones
  const p633Keys = ['p633ALogistica', 'p633BInfra', 'p633CPersonal', 'p633DPresupuesto', 'p633EOtro', 'p633Ninguno'];
  if (p633Keys.includes(controlName)) {
    this.f('p633Any')?.updateValueAndValidity({ emitEvent: false });
  }

    const p642Keys = ['p642ALogistica', 'p642BInfra', 'p642CPersonal', 'p642DPresupuesto', 'p642EOtro', 'p642Ninguno'];
  if (p642Keys.includes(controlName)) {
    this.f('p642Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  this.cdr.markForCheck();
}

  public label(ctrl: string) {
    // Etiquetas “bonitas” para checkboxes listados en arreglos (puedes personalizar) CHECKBOX
    const map: Record<string,string> = {
      p633ALogistica:'',p633BInfra:'',p633CPersonal:'',p633DPresupuesto:'',p633EOtro:'',p633Ninguno:'Ninguno',p642Ninguno:'Ninguno'
    };
    return map[ctrl] ?? ctrl;
  }
  // ===== Helpers template =====
  public f(path: string) { return this.ficha6Form.get(path); }
  
  public showAllErrors = false; // Mantiene visibles los errores

   public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }

  public isCheckboxChecked(controlName: string): boolean { return this.f(controlName)?.value === 'S'; }

    private refreshRowValidators(r: { check: string; gestion: string; suficiente: string }): void {
    const checked = this.f(r.check)?.value === 'S';

    const g = this.f(r.gestion);
    const s = this.f(r.suficiente);

    if (checked) {
      g?.setValidators([Validators.required]);
      s?.setValidators([Validators.required]);
    } else {
      g?.clearValidators();
      s?.clearValidators();
      g?.setValue(null);
      s?.setValue(null);
      g?.markAsPristine();
      s?.markAsPristine();
    }

    g?.updateValueAndValidity({ emitEvent: false });
    s?.updateValueAndValidity({ emitEvent: false });
  }

  // ===== Guardar =====
  public guardarSeccion6(): void { this.guardarDatos('C'); }
  public guardarSeccion6Incompleta(): void { this.guardarDatos('I'); }

  private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {



    // Sincroniza validadores condicionales antes de decidir
      this.necesidadesData?.forEach((r: any) => this.refreshRowValidators(r));
      this.necesidadesData2?.forEach((r: any) => this.refreshRowValidators(r));

    this.ficha6Form.updateValueAndValidity({ emitEvent: false });

    const formOk = this.ficha6Form.valid;
    const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && formOk) ? 'C' : 'I';

    if (estadoSolicitado === 'C' && estadoDestino === 'I') {
      this.ficha6Form.markAllAsTouched();
      Swal.fire('Faltan respuestas', 'Completa los campos obligatorios antes de guardar como COMPLETA.', 'warning');
    }

    const payload = this.prepareSaveData(estadoDestino);

    Swal.fire({
      title: 'Guardando...',
      allowOutsideClick: false,
      backdrop: 'rgba(0,0,0,0.3)',
      didOpen: () => Swal.showLoading()
    });

    try {
      const resp = await lastValueFrom(
        this.fichaService.guardarFichaSeccion6(payload).pipe(takeUntil(this.destroy$))
      );

      Swal.close();
      Swal.fire(
        'Listo',
        resp?.mensaje || (estadoDestino === 'C' ? 'Sección 6 guardada (Completa).' : 'Sección 6 guardada (Incompleta).'),
        'success'
      );

      this.onGuardar.emit();
      this.onEstadoActualizado.emit(payload.estado_s6);
      this.ficha6Form.patchValue({ estado_s6: estadoDestino }, { emitEvent: false });
      this.ficha6Form.markAsPristine();

    } catch (e: any) {
      Swal.close();
      console.error('[S6 guardar ERR]', e?.status, e?.message, e?.error);
      Swal.fire('Error', 'No se pudo guardar la sección 6.', 'error');
    }
  }



  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha6Form.getRawValue();
    const payload: any = { ...raw };

    const p635Keys = Object.keys(this.P635_MAP);

    p635Keys.forEach(formKey => {
      const apiKey = this.P635_MAP[formKey];

      if (formKey === 'p635OtroDetalle') {
        const jMarcado = !!raw['p635Otro'];
        payload[apiKey] = jMarcado ? (raw['p635OtroDetalle'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });

    const p644Keys = Object.keys(this.P644_MAP);

    p644Keys.forEach(formKey => {
      const apiKey = this.P644_MAP[formKey];

      if (formKey === 'p644OtroDetalle') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p644Otro'];
        payload[apiKey] = jMarcado ? (raw['p644OtroDetalle'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });


    const p39Keys = Object.keys(this.P633_MAP);

    p39Keys.forEach(formKey => {
      const apiKey = this.P633_MAP[formKey];

      if (formKey === 'p633AEspecifique') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p633ALogistica'];
        payload[apiKey] = jMarcado ? (raw['p633AEspecifique'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });

    const p64Keys = Object.keys(this.P642_MAP);

    p64Keys.forEach(formKey => {
      const apiKey = this.P642_MAP[formKey];

      if (formKey === 'p642AEspecifique') {
        // Solo mandar detalle si J está marcado
        const jMarcado = !!raw['p642ALogistica'];
        payload[apiKey] = jMarcado ? (raw['p642AEspecifique'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });

    // Eliminación de controles ocultos del payload
     delete payload.p633Any;
     delete payload.p642Any; 

    payload.idFicha = this.idFicha ?? payload.idFicha;
    payload.estado_s6 = estado;
    return payload;
  }


  private autosaveSilencioso(): void {
    if (!this.shouldAutosave()) return;

    const estadoActual = this.f('estado_s6')?.value as 'C' | 'I' | '' | null;
    const estadoDestino: 'C' | 'I' =
      (estadoActual === 'C' && this.ficha6Form.valid) ? 'C' : 'I';

    const payload = this.prepareSaveData(estadoDestino);

    this.fichaService.guardarFichaSeccion6(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => console.debug('[S6 autosave OK]', { estadoDestino, res }),
        error: (err) => console.error('[S6 autosave ERR]', err?.status, err?.message, err?.error)
      });
  }

  public validarSeccion(): void {
    const estado = this.ficha6Form.get('estado_s6')?.value;
    const idFicha = this.idFicha;

    if (!idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'La sección 6 debe estar guardada como "Completa" para validarla.', 'warning');
      return;
    }

    const payload = { idFichas6: idFicha, valida_s6: '1' };
    this.fichaService.validarFichaSeccion6(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.ficha6Form.get('valida_s6')?.setValue('1');
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 6 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar la sección 6:', err);
        Swal.fire('Error', 'No se pudo validar la sección 6.', 'error');
      }
    });
  }

/** Devuelve las keys de controles con Validators.required actualmente activo y habilitado */
private getRequiredControlNames(): string[] {
  const keys = Object.keys(this.ficha6Form.controls);
  return keys.filter(k => {
    const c = this.ficha6Form.get(k);
    // hasValidator existe desde Angular 14
    const hasReq = !!c && typeof (c as any).hasValidator === 'function'
      ? (c as any).hasValidator(Validators.required)
      : false;
    return !!c && !c.disabled && hasReq;
  });
}

  private persistRequiredErrors(): void {
  const keys = this.getRequiredControlNames();
  keys.forEach(k => {
    const c = this.ficha6Form.get(k)!;
    // re-evaluar antes de decidir
    c.updateValueAndValidity({ emitEvent: false });

    if (!c.disabled && c.hasError('required')) {
      c.markAsTouched({ onlySelf: true });
      c.markAsDirty({ onlySelf: true });
    }
  });
  this.cdr.markForCheck();
}

private readonly CUSTOM_MESSAGES: Record<string, Partial<Record<string, string>>> = {

  p214Labor: { required: 'Seleccionar una opción.' },
  p215Especifique: { required: 'Debe seleccionar almenos una opción.' },

};

public getErrorMessage(controlName: string): string {
  const control = this.f(controlName);
  if (!control) return '';

  // No mostrar si no debe
  if (!(this.showAllErrors || control.touched || control.dirty)) return '';

  // 1) required
  if (control.hasError('required')) {
    const custom = this.CUSTOM_MESSAGES?.[controlName]?.['required'];
    return custom ?? 'Este campo es requerido';
  }

  // 2) requireOne (casos de “al menos una opción”)
  if (control.hasError('requireOne')) {
    const custom = this.CUSTOM_MESSAGES?.[controlName]?.['requireOne'];
    return custom ?? 'Debe seleccionar al menos una opción';
  }

  // 3) min
  if (control.hasError('min')) {
    return 'El valor debe ser mayor o igual a 0';
  }

  // 4) exceedsTotal (ejemplo con payload de error)
  if (control.hasError('exceedsTotal')) {
    const e = control.getError('exceedsTotal') as { max?: number } | null;
    return `No puede exceder ${e?.max ?? 'el máximo permitido'}`;
  }

  // 5) positiveInt
  if (control.hasError('positiveInt')) {
    return 'Debe ser un número entero positivo';
  }

  return 'Campo inválido';
}


/**
 * Verifica si un control tiene un error específico
 * ✅ Respeta showAllErrors para mostrar errores en validación completa
 */
public hasError(controlName: string, errorType: string): boolean {
  const control = this.f(controlName);
  if (!control) return false;


  const shouldShow = this.showAllErrors || control.touched || control.dirty;
  
  return !!(control.hasError(errorType) && shouldShow);
}


private showErrorsAndPersist(): void {
  this.showAllErrors = true;
  this.showGroupErrors = true; // ← agrega esto
  this.ficha6Form.markAllAsTouched();
  this.persistRequiredErrors();
  this.cdr.markForCheck();
}


  // ===== Populate / Hidratar =====
  private populateForm(data: any): void {
    this.idFicha = data?.idFicha ?? this.idFicha;
    this.ficha6Form.patchValue(data, { emitEvent: false });


    // ===== 3) 6.3.5 (A–K): API --> Form =====
    const p635Keys = Object.keys(this.P635_MAP);
    p635Keys.forEach(formKey => {
      const apiKey = this.P635_MAP[formKey];
      if (formKey === 'p635OtroDetalle') return;
      const apiVal = (data as any)?.[apiKey];
      this.f(formKey)?.setValue(apiVal === 'S', { emitEvent: false });
    });

    const jMarcado635 = !!this.f('p635Otro')?.value;
    const jotroAPI635 = (data as any)?.[this.P635_MAP['p635OtroDetalle']] ?? '';
    this.f('p635OtroDetalle')?.setValue(jotroAPI635, { emitEvent: false });

    const det635 = this.f('p635OtroDetalle')!;
    if (jMarcado635) {
      det635.enable({ emitEvent: false });
      det635.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      det635.clearValidators();
      det635.disable({ emitEvent: false });
    }
    det635.updateValueAndValidity({ emitEvent: false });


// ===== 3) 6.4.4 (A–K): API --> Form =====
    const p644Keys = Object.keys(this.P644_MAP);
    p644Keys.forEach(formKey => {
      const apiKey = this.P644_MAP[formKey];
      if (formKey === 'p644OtroDetalle') return;
      const apiVal = (data as any)?.[apiKey];
      this.f(formKey)?.setValue(apiVal === 'S', { emitEvent: false });
    });

    const jMarcado = !!this.f('p644Otro')?.value;
    const jotroAPI = (data as any)?.[this.P644_MAP['p644OtroDetalle']] ?? '';
    this.f('p644OtroDetalle')?.setValue(jotroAPI, { emitEvent: false });

    const det644 = this.f('p644OtroDetalle')!;
    if (jMarcado) {
      det644.enable({ emitEvent: false });
      det644.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      det644.clearValidators();
      det644.disable({ emitEvent: false });
    }
    det644.updateValueAndValidity({ emitEvent: false });


  this.f('p633Any')?.updateValueAndValidity({ emitEvent: false });
  this.f('p642Any')?.updateValueAndValidity({ emitEvent: false });

      //  Si sigue inválido tras hidratar,  lo hago visible
    this.ficha6Form.updateValueAndValidity({ emitEvent: false });
    if (this.ficha6Form.invalid) {
      this.showAllErrors = true;
      this.persistRequiredErrors();
      this.cdr.markForCheck();
    }


  }

  // ===== Utilidades =====
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



////HELPER PARA EL TEXTAREA////

  public charLen(controlName: string): number {
    const v = this.f(controlName)?.value;
    return typeof v === 'string' ? v.length : 0;
  }
  ////////////////////

  private controlarRadioSiNo(
    radioControlName: string,
    detalleControlName: string,
    habilitarValor: string
  ): void {
    const radio = this.ficha6Form.get(radioControlName);
    const detalle = this.ficha6Form.get(detalleControlName);
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

  onOtroCheckboxChange6(nombreCheckbox: string, nombreDetalle: string) {
    const marcado = !!this.ficha6Form.get(nombreCheckbox)?.value; // true si 'S' o true
    const detalle = this.ficha6Form.get(nombreDetalle);
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

  private bindEnableRequiredAuto6(triggerKey: string, targetKey: string) {
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

  private bindRadioEnablesOn6(
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
      const detalleOtros = this.f('p635OtroDetalle');
      if (!active && detalleOtros) {
        detalleOtros.reset('', { emitEvent: false });
        detalleOtros.disable({ emitEvent: false });
        detalleOtros.clearValidators();
        detalleOtros.updateValueAndValidity({ emitEvent: false });
      }

// 🔹 Nuevo: limpiar y desactivar el detalle "Otros" cuando se deshabilite todo el grupo
      const detalleOtrosP = this.f('p644OtroDetalle');
      if (!active && detalleOtrosP) {
        detalleOtrosP.reset('', { emitEvent: false });
        detalleOtrosP.disable({ emitEvent: false });
        detalleOtrosP.clearValidators();
        detalleOtrosP.updateValueAndValidity({ emitEvent: false });
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

  private controlarSuma(
    campo1Name: string,
    campo2Name: string,
    totalName: string
  ): void {
    const campo1 = this.ficha6Form.get(campo1Name);
    const campo2 = this.ficha6Form.get(campo2Name);
    const total = this.ficha6Form.get(totalName);

    if (!campo1 || !campo2 || !total) return;

    // Función para aplicar la suma
    const aplicarSuma = () => {
      const v1 = Number(campo1.value) || 0;
      const v2 = Number(campo2.value) || 0;
      total.setValue(v1 + v2, { emitEvent: false });
    };

    // Ejecuta la primera vez (por si ya hay datos cargados)
    aplicarSuma();

    // Escucha los cambios en ambos campos
    campo1.valueChanges.subscribe(() => aplicarSuma());
    campo2.valueChanges.subscribe(() => aplicarSuma());
  }
  private controlarDetalleOtros(): void {
    const otro = this.f('p635Otro')!;
    const detalle = this.f('p635OtroDetalle')!;

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
  private controlarDetalleOtrosP644(): void {
    const otroP = this.f('p644Otro')!;
    const detalle = this.f('p644OtroDetalle')!;

    // Monitoreamos cambios del checkbox "p311Otros"
    otroP.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        detalle.enable();
        detalle.setValidators([Validators.required]);
      } else {
        detalle.reset();
        detalle.disable();
        detalle.clearValidators();
      }
      detalle.updateValueAndValidity();
    });

    if (!otroP.value) {
      detalle.disable();
    }
  }


private validateDisability(controlName: string, year: string): void {
  const hombres = this.f(`p631Hombre${year}`)?.value || 0;
  const mujeres = this.f(`p631Mujer${year}`)?.value || 0;
  const total = hombres + mujeres;

  const discapacidad = this.f(`p631Personas${year}`)?.value || 0;

  // Si la discapacidad excede el total de hombres y mujeres, agrega un error
  if (discapacidad > total) {
    this.f(`p631Personas${year}`)?.setErrors({ maxDisabilityExceeded: true });
  } else {
    // Limpia el error si la condición no se cumple
    this.f(`p631Personas${year}`)?.setErrors(null);
  }

  this.f(`p631Personas${year}`)?.updateValueAndValidity();
}


g(campo: string): AbstractControl | null {
  return this.ficha6Form.get(campo);
}

}
