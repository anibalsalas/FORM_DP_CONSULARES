import {
  Component, EventEmitter, Output, OnInit, Input, OnChanges,
  SimpleChanges, OnDestroy, inject, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
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

// Servicios y Directivas
import { Ficha1Service } from '../ficha1.service';
//import { AuthService } from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Max4DigitsDirective } from './max-4digits.directive';
import {Max3DigitsDirective} from './max-3digits';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
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
  selector: 'app-seccion-ficha3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule,
    Max3DigitsDirective, Max4DigitsDirective, MatRadioButton, MatRadioGroup, MatCheckbox, Max4DigitsDirective, Max4DigitsDirective
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './seccion-ficha3.component.html',
  styleUrls: ['./seccion-ficha3.component.scss']
})
export class SeccionFicha3Component implements OnInit, OnChanges, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha3: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  // ===== Estado =====
  ficha3Form: FormGroup;
  private destroy$ = new Subject<void>();
  private idFicha: number | null = null;
  private autosaveLanzado = false;
  private hydrating = false;

  // ===== Inyección =====
  private readonly fb           = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService  = inject(AuthService);
  private readonly dateAdapter  = inject(DateAdapter);
  private readonly cdr          = inject(ChangeDetectorRef);
  private camposBloqueadosPorCheckbox = new Set<string>();

    roles: string[] = [];
    rolAdministrador: string = environment.rolAdministrador;
    rolComisionado: string = environment.rolComisionado;
    rolEspecialista: string = environment.rolEspecialista;

  Nocuenta  = ['p31NoCuenta'];
  Iniciativas  = ['p34Cultural','p34Artistica','p34Comerciales','p34Religiosos','p34Otros'];
  Ninguna  = ['p39Ninguno'];
  Oficina  = ['p37Iniciativas','p37Mecanismo','p37Festividades','p37Programas','p37Otros'];

  sectorGrem = [
    { Sector: 'Nº Hombres', control: 'p38HombreIndustrial',control2:'p38HombreComerciante',control3:'p38HombreEstudiante',control4:'p38HombreOtro' },
    { Sector: 'Nº Mujeres', control: 'p38MujerIndustrial',control2:'p38MujerComerciante',control3:'p38MujerEstudiante',control4:'p38MujerOtro' }
  ];

  necesidadesData = [
    { tipo: 'Logística', checkControl: 'p39ALogistica', gestionControl: 'p39AGestiones', suficienteControl: 'p39ASuficiente', observacionesControl: 'p39AEspecifique'},
    { tipo: 'Infraestructura', checkControl: 'p39BInfra', gestionControl: 'p39BGestiones', suficienteControl: 'p39BSuficiente', observacionesControl: 'p39BEspecifique'},
    { tipo: 'Personal', checkControl: 'p39CPersonal', gestionControl: 'p39CGestiones', suficienteControl: 'p39CSuficiente', observacionesControl: 'p39CEspecifique'},
    { tipo: 'Presupuesto', checkControl: 'p39DPresupuesto', gestionControl: 'p39DGestiones', suficienteControl: 'p39DSuficiente', observacionesControl: 'p39DEspecifique'},
    { tipo: 'Otro, especifique:', checkControl: 'p39EOtro', especifiqueControl: 'p39EOtroDetalle', gestionControl: 'p39EGestiones', suficienteControl: 'p39ESuficiente', observacionesControl: 'p39EEspecifique'}
  ];
  private readonly P39_MAP: Record<string, string> = {
    p39ALogistica: 'p39ALogistica',
    p39BInfra: 'p39BInfra',
    p39CPersonal: 'p39CPersonal',
    p39DPresupuesto: 'p39DPresupuesto',
    p39EOtro: 'p39EOtro',
    p39Ninguno: 'p39Ninguno',
  };

  private readonly P311_MAP: Record<string, string> = {
    p311Mre: 'p311Mre',
    p311Reniec: 'p311Reniec',
    p311Migraciones: 'p311Migraciones',
    p311Interpol: 'p311Interpol',
    p311Inei: 'p311Inei',
    p311Jne: 'p311Jne',
    p311Onpe: 'p311Onpe',
    p311Sunarp: 'p311Sunarp',
    p311PoderJudicial: 'p311PoderJudicial',
    p311Otros: 'p311Otros',
    p311Ninguna: 'p311Ninguna',
    p311OtrosDetalle: 'p311OtrosDetalle',
  };


  private requireAtLeastOneP39(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha3Form) return null;
    
    const keys = ['p39ALogistica', 'p39BInfra', 'p39CPersonal', 'p39DPresupuesto', 'p39EOtro', 'p39Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha3Form.get(k);
      return ctrl?.value === 'S' || ctrl?.value === true;
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}


  constructor() {

    this.dateAdapter.setLocale('es-PE');
    this.ficha3Form = this.fb.group({
      idFicha: [null],
      idFichas3: [null],
      estado_s3: [''],
      valida_s3: [''],
      //  Aquí agregarás los campos específicos de la Sección 3
      p31NumAsocion:['', Validators.required],
      p31NoCuenta:[''],
      p32NumActividad:['', Validators.required],
      p33NumPersonas:['', Validators.required],
      p34Cultural:[''], p34Artistica:[''], p34Comerciales:[''], p34Religiosos:[''], p34Otros:[''], p34OtrosDetalles:[''],
      p34Any: [null, this.requireAtLeastOneFromGroup(this.Iniciativas)],
      p35CentroCultural:['', Validators.required],p36Calendario:['', Validators.required],
      p37Iniciativas:[''],p37Mecanismo:[''],p37Festividades:[''],p37Programas:[''],p37Otros:[''],p37OtrosDetalle:[''],
      p37Any: [null, this.requireAtLeastOneFromGroup(this.Oficina)],

      p38HombreIndustrial:[null, [Validators.required, this.nonNegativeInt()]],p38MujerIndustrial:[null, [Validators.required, this.nonNegativeInt()]],
      p38HombreComerciante:[null, [Validators.required, this.nonNegativeInt()]],p38MujerComerciante:[null, [Validators.required, this.nonNegativeInt()]],
      p38HombreEstudiante:[null, [Validators.required, this.nonNegativeInt()]],p38HombreOtro:[null, [Validators.required, this.nonNegativeInt()]],
      p38MujerEstudiante:[null, [Validators.required, this.nonNegativeInt()]],p38MujerOtro:[null, [Validators.required, this.nonNegativeInt()]],
      p38HombreOtroDetalle:[''],
      p39ALogistica:[false],
      p39AGestiones:[{ value: null, disabled: true }],
      p39ASuficiente:[{ value: null, disabled: true }],
     // p39AEspecifique:[null],
      p39AEspecifique:[null],

      p39BInfra:[null],
      p39BGestiones:[{ value: null, disabled: true }],
      p39BSuficiente:[{ value: null, disabled: true }],
      p39BEspecifique:[null],

      p39CPersonal:[null],
      p39CGestiones:[{ value: null, disabled: true }],
      p39CSuficiente:[{ value: null, disabled: true }],
      p39CEspecifique:[null],

      p39DPresupuesto:[null],
      p39DGestiones:[{ value: null, disabled: true }],
      p39DSuficiente:[{ value: null, disabled: true }],
      p39DEspecifique:[null],

      p39EOtro:[null],
      p39EGestiones:[{ value: null, disabled: true }],
      p39ESuficiente:[{ value: null, disabled: true }],
      p39EEspecifique:[null],
      p39EOtroDetalle:[{ value: '',  disabled: true }],

      p39Ninguno:[false],
      p310Recibe:['', Validators.required],

      p311Mre: [false],
      p311Reniec: [false],
      p311Migraciones: [false],
      p311Interpol: [false],
      p311Inei: [false],
      p311Jne: [false],
      p311Onpe: [false],
      p311Sunarp: [false],
      p311PoderJudicial: [false],
      p311Otros: [false],
      p311OtrosDetalle: [{ value: '', disabled: false }, [Validators.maxLength(200)]],
      p311Ninguna: [false],

      p39Any: [null, this.requireAtLeastOneP39()],


    });
    this.setupFormListeners();
  }

/////////////////HELPERS SOLO PARA GRUPO CHECKBOX ///////////////////////////

  private setupP311Listeners(): void {
    const group = ['p311Mre','p311Reniec','p311Migraciones','p311Interpol','p311Inei','p311Jne','p311Onpe','p311Sunarp','p311PoderJudicial','p311Otros'];

    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p311Ninguna')?.setValue(false, { emitEvent: false });
      });
    });

    // “Otro” (J) habilita detalle
    this.f('p311Otros')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p311OtrosDetalle')!;
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
    this.f('p311Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p311OtrosDetalle')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
  ///////PREGUNTA_3.9
  private setupP39Listeners(): void {
    const group = ['p39ALogistica','p39BInfra','p39CPersonal','p39DPresupuesto','p39EOtro'];

    // Si marcan A–J, apaga "Ninguna" (K)
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p39Ninguno')?.setValue(false, { emitEvent: false });
      });
    });


    // “Ninguna” (K) apaga A–J y el detalle
    this.f('p39Ninguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        // desactiva detalle "otro"
        const det = this.f('p39BGestiones')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
///////PREGUNTA_3.9 FIN

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ===== Validación “al menos una” por grupo condicional =====
  private ctrl(path: string): AbstractControl | null { return this.ficha3Form.get(path); }
  private readonly GROUP_CA   = ['p311Mre','p311Reniec','p311Migraciones', 'p311Interpol', 'p311Inei', 'p311Jne', 'p311Onpe', 'p311Sunarp', 'p311PoderJudicial', 'p311Otros', 'p311Ninguna'];


  private anyChecked(keys: string[]): boolean {
    return keys.some(k => !!this.ctrl(k)?.value);
  }

  public showGroupErrors = false;


 private isGroupTouched(keys: string[]): boolean {
  return keys.some(k => {
    const c = this.f(k);
    return !!c && (c.touched || c.dirty);
  });
}

// get invalidCA() {
//   const active = this.f('p310Recibe')?.value === 'S';
//   const any = this.anyChecked(this.GROUP_CA);

//   const shouldShow =
//     this.showAllErrors ||
//     this.showGroupErrors ||
//     this.isGroupTouched(this.GROUP_CA);

//   return active && shouldShow && !any;
// }

get showP39GroupError(): boolean {
  const anyCtrl = this.f('p39Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA(): boolean {
  const active = this.f('p310Recibe')?.value === 'S';
  const any = this.anyChecked(this.GROUP_CA);

  const shouldShow =
    this.showAllErrors ||
    this.showGroupErrors ||
    this.isGroupTouched(this.GROUP_CA);

  return active && shouldShow && !any;
}

// get invalidCA37() {
//   const any = this.anyChecked(this.Oficina);
//   const shouldShow =
//     this.showAllErrors ||
//     this.showGroupErrors ||
//     this.isGroupTouched(this.Oficina);

//   return shouldShow && !any;
// }

get invalidCA37(): boolean {
  const anyCtrl = this.f('p37Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA34(): boolean {
  const anyCtrl = this.f('p34Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

  private setupFormListeners(): void {

    //PARA PREGUNTA1.1.7
    this.f('p311Ninguna')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p311Mre','p311Reniec','p311Migraciones','p311Interpol','p311Inei','p311Jne','p311Onpe','p311Sunarp','p311PoderJudicial','p311Otros']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
        this.onOtroCheckboxChange3('p311Otros','p311OtrosDetalle');
        this.cdr.markForCheck();
      }
    });
    //PARA PREGUNTA 3.9
    this.f('p39Ninguno')?.valueChanges.subscribe((v) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p39ALogistica','p39BInfra','p39CPersonal','p39DPresupuesto','p39EOtro']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));

        // apaga/limpia el detalle de "Otro" si estaba habilitado
     //   this.onOtroCheckboxChange3('p39ALogistica','p39AEspecifique');
        this.onOtroCheckboxChange3('p39ALogistica','p39AGestiones');
        this.onOtroCheckboxChange3('p39ALogistica','p39ASuficiente');

        this.onOtroCheckboxChange3('p39BInfra','p39BGestiones');
        this.onOtroCheckboxChange3('p39BInfra','p39BSuficiente');
       // this.onOtroCheckboxChange3('p39BInfra','p39BEspecifique');

        this.onOtroCheckboxChange3('p39CPersonal','p39CGestiones');
        this.onOtroCheckboxChange3('p39CPersonal','p39CSuficiente');
        //this.onOtroCheckboxChange3('p39CPersonal','p39CEspecifique');

        this.onOtroCheckboxChange3('p39DPresupuesto','p39DGestiones');
        this.onOtroCheckboxChange3('p39DPresupuesto','p39DSuficiente');
       // this.onOtroCheckboxChange3('p39DPresupuesto','p39DEspecifique');

        this.onOtroCheckboxChange3('p39EOtro','p39EOtroDetalle');
        this.onOtroCheckboxChange3('p39EOtro','p39EGestiones');
        this.onOtroCheckboxChange3('p39EOtro','p39ESuficiente');
      //  this.onOtroCheckboxChange3('p39EOtro','p39EEspecifique');

        this.cdr.markForCheck();
      }
    });
///////////////////////////////////////////////////////////////////////////////



  }

  public onCheckboxChange(controlName: string, event: any): void {
    const checked = event.checked;
    const ctrl = this.f(controlName);
    ctrl?.setValue(checked ? 'S' : null);
    ctrl?.markAsDirty();
    ctrl?.markAsTouched();
    ctrl?.updateValueAndValidity({ emitEvent: true });

  }

/** Devuelve las keys de controles con Validators.required actualmente activo y habilitado */
private getRequiredControlNames(): string[] {
  const keys = Object.keys(this.ficha3Form.controls);
  return keys.filter(k => {
    const c = this.ficha3Form.get(k);
    // hasValidator existe desde Angular 14
    const hasReq = !!c && typeof (c as any).hasValidator === 'function'
      ? (c as any).hasValidator(Validators.required)
      : false;
    return !!c && !c.disabled && hasReq;
  });
}

/** Marca como touched/dirty todos los requeridos inválidos (para que muestren error sin interacción) */
private persistRequiredErrors(): void {
  const keys = this.getRequiredControlNames();
  keys.forEach(k => {
    const c = this.ficha3Form.get(k)!;
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
  p310Recibe: { required: 'Debe seleccionar una opción.' },

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
 * Respeta showAllErrors para mostrar errores en validación completa
 */
public hasError(controlName: string, errorType: string): boolean {
  const control = this.f(controlName);
  if (!control) return false;


  const shouldShow = this.showAllErrors || control.touched || control.dirty;
  
  return !!(control.hasError(errorType) && shouldShow);
}




/**
 * 🧪 Método de testing para verificar estado de checkboxes
 * Uso en consola: component.debugCheckboxGroup('p2110Psicologico', ['p2111Presencial', 'p2111Llamada', 'p2111Videolla'])
 */
  private disableSoftWithString(ctrl: AbstractControl | null) {
    if (!ctrl) return;
    ctrl.reset({ value: '', disabled: true });
    ctrl.clearValidators();
  }
/** Requiere al menos un checkbox en S cuando yesKey === 'S'. Aplica a P4.10 (Recibe=Sí). */
// Devuelve una función revalidate() para forzar la validación tras cargar/patch
private bindYesRequiresAtLeastOne(
  yesKey: string,
  checkKeys: string[],
  anchorErrorKey = 'group'
): () => void {
  const yes = this.f(yesKey);
  if (!yes) return () => {};

  let isValidating = false;

  const validate = () => {
    if (isValidating) return;
    isValidating = true;

    const isYes = yes.value === 'S';

    // 1) Habilita/Deshabilita
    checkKeys.forEach(k => {
      const c = this.f(k);
      if (!c) return;
      if (isYes) {
        if (c.disabled) c.enable({ emitEvent: false });
      } else {
        if (!c.disabled) this.disableSoftWithString(c);
      }
    });

    // 2) Error “al menos uno”
    const currentErrors = yes.errors || {};
    if (isYes) {
      const anyChecked = checkKeys.some(k => this.f(k)?.value === 'S');
      if (!anyChecked) {
        yes.setErrors({ ...currentErrors, [anchorErrorKey]: true }, { emitEvent: false });
        yes.markAsTouched(); // opcional para mostrarlo sin interacción del usuario
      } else {
        const { [anchorErrorKey]: _removed, ...rest } = currentErrors;
        yes.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
      }
    } else {
      if (anchorErrorKey in currentErrors) {
        const { [anchorErrorKey]: _removed, ...rest } = currentErrors;
        yes.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
      }
    }

    isValidating = false;
  };

  // Validación inicial (por si ya hay valores)
  validate();

  // Reaccionar a cambios
  yes.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => validate());
  checkKeys.forEach(k => this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => validate()));

  // 👈 devolvemos el “gatillo” para revalidar manualmente tras patchValue
  return validate;
}



  isDisabled(name: string): boolean { return !!this.f(name)?.disabled; }


/**
 * Marca un control como tocado manualmente
 * 💡 Útil para forzar la visualización de errores
 */
public markAsTouched(controlName: string): void {
  const control = this.f(controlName);
  if (control) {
    control.markAsTouched();
    control.updateValueAndValidity();
    this.cdr.markForCheck();
    
    console.log(`👆 ${controlName} marcado como tocado`);
  }
}


/**
 * Validador que requiere al menos un checkbox marcado en un grupo
 */
private requireAtLeastOneFromGroup(checkboxKeys: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!this.ficha3Form) return null;
    
    const atLeastOneChecked = checkboxKeys.some(key => {
      const ctrl = this.f(key);
      return ctrl?.value === 'S';
    });
    
    return atLeastOneChecked ? null : { requireOne: true };
  };
}

  // ===== Ciclo de vida =====
  ngOnInit(): void {
    this.setupP311Listeners();
    this.setupP39Listeners();
    [['p31NoCuenta', 'p31NumAsocion'],].forEach(([chk, txt]) => this.bindCheckEnablesRequiredText3(chk, txt));
    [['p34Otros', 'p34OtrosDetalles'],].forEach(([chk, txt]) => this.bindCheckEnablesRequiredTextOtro(chk, txt));
    [['p37Otros', 'p37OtrosDetalle'],].forEach(([chk, txt]) => this.bindCheckEnablesRequiredTextOtro(chk, txt));

    [
      ['p39ALogistica', 'p39AGestiones'],['p39ALogistica'],
      ['p39BInfra', 'p39BGestiones'],['p39BInfra'],
      ['p39CPersonal', 'p39CGestiones'],['p39CPersonal'],
      ['p39DPresupuesto', 'p39DGestiones'],['p39DPresupuesto'],
      ['p39EOtro', 'p39EGestiones'],['p39EOtro'],['p39EOtro', 'p39EOtroDetalle']
    ].forEach(([chk, txt]) => this.bindEnableRequiredAuto(chk, txt));
    
    this.controlarRadioSiNo('p39AGestiones', 'p39ASuficiente', 'S');
    this.controlarRadioSiNo('p39BGestiones', 'p39BSuficiente', 'S');
    this.controlarRadioSiNo('p39CGestiones', 'p39CSuficiente', 'S');
    this.controlarRadioSiNo('p39DGestiones', 'p39DSuficiente', 'S');
    this.controlarRadioSiNo('p39EGestiones', 'p39ESuficiente', 'S');





// 2.1.5: el “especifique” arranca deshabilitado
//     this.disableSoftWithNull(this.f('p311Mre'));

    // Si respondió “No” (N) en p215OrganoLinea ⇒ habilitar + required p215Especifique
    this.bindRadioEnablesOn3(
      'p310Recibe', v => v === 'S',
      ['p311Mre','p311Reniec','p311Migraciones','p311Interpol','p311Inei',
        'p311Jne','p311Onpe','p311Sunarp','p311PoderJudicial','p311Otros','p311Ninguna'
      ],
      [Validators.requiredTrue]
    );
    // 🔹 Controlar el campo "p311OtrosDetalle"
    this.controlarDetalleOtros();
  }

  private disableSoftWithNull(ctrl: AbstractControl | null) {
    if (!ctrl) return;                       // ← protege null
    ctrl.reset({ value: null, disabled: true });
    ctrl.clearValidators();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFicha3']?.currentValue) {
      this.populateForm(changes['datosFicha3'].currentValue);
    }

    if (changes['activarAutosave']?.currentValue === true && !this.autosaveLanzado) {
      if (this.shouldAutosave()) {
        this.autosaveSilencioso();
        this.autosaveLanzado = true;
      } else {
        console.debug('[S3] Autosave omitido al abrir');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  // public onCheckboxChange3(controlName: string, event: any): void {
  //   const checked = !!event?.checked;
  //   const ctrl = this.f(controlName);
  //   ctrl?.setValue(checked ? 'S' : null);
  //   ctrl?.markAsDirty();
  //   ctrl?.markAsTouched();
  //   ctrl?.updateValueAndValidity({ emitEvent: true });
  //   this.cdr.markForCheck();
  // }

  public onCheckboxChange3(controlName: string, event: any): void {
  const checked = !!event?.checked;
  const ctrl = this.f(controlName);
  ctrl?.setValue(checked ? 'S' : null);
  ctrl?.markAsDirty();
  ctrl?.markAsTouched();
  ctrl?.updateValueAndValidity({ emitEvent: true });
  
  // REVALIDAR GRUPOS DE CHECKBOXES REQUERIDOS
  this.revalidateCheckboxGroups3(controlName);
  
  this.cdr.markForCheck();
}

/**
 * Revalida los controles ocultos cuando cambia un checkbox de un grupo
 */
private revalidateCheckboxGroups3(changedCheckbox: string): void {
  // 3.4 - Iniciativas
  if (this.Iniciativas.includes(changedCheckbox)) {
    this.f('p34Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // 3.7 - Oficina
  if (this.Oficina.includes(changedCheckbox)) {
    this.f('p37Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  const p39Keys = ['p39ALogistica', 'p39BInfra', 'p39CPersonal', 'p39DPresupuesto', 'p39EOtro', 'p39Ninguno'];
  if (p39Keys.includes(changedCheckbox)) {
    this.f('p39Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

  public label(ctrl: string) {
    const map: Record<string,string> = {
      p31NoCuenta:'*',p34Cultural:'Culturales',p34Artistica:'Artísticas',p34Comerciales:'Comerciales',p34Religiosos:'Religiosas',p34Otros:'Otras',
      p37Iniciativas:'Iniciativas de regularización migratoria ',p37Mecanismo:'Mecanismos de participación',
      p37Festividades:'Festividades y celebraciones',p37Programas:'Programas de asistencia',p37Otros:'Otros',
      p39ALogistica:'',p39BInfra:'',p39CPersonal:'',p39DPresupuesto:'',p39EOtro:'',p39Ninguno:'Ninguno'
    };
    return map[ctrl] ?? ctrl;
  }
  // ===== Helpers template =====
  public f(path: string) { return this.ficha3Form.get(path); }

  public showAllErrors = false; // Mantiene visibles los errores

    public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }


  // ===== Guardar =====
  public guardarSeccion3(): void { this.guardarDatos('C'); }
  public guardarSeccion3Incompleta(): void { this.guardarDatos('I'); }


  private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {
  // 1. Activar visualización de errores
  this.showAllErrors = true;
  this.showGroupErrors = true;

  // 2. Sincronizar validadores de matrices antes de validar
  this.necesidadesData?.forEach((r: any) => this.refreshRowValidators(r));
  this.ficha3Form.updateValueAndValidity({ emitEvent: false });

  // 3. Determinar estado destino basado en validez del formulario
  const formOk = this.ficha3Form.valid;
  const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && formOk) ? 'C' : 'I';

  // 4. Si pidió Completo pero está incompleto, avisar y esperar confirmación
  if (estadoSolicitado === 'C' && estadoDestino === 'I') {
    this.ficha3Form.markAllAsTouched();
    this.persistRequiredErrors();
    this.scrollToFirstError();
    
    await Swal.fire({
      icon: 'warning',
      title: 'Faltan respuestas',
      text: 'Completa los campos obligatorios antes de guardar como COMPLETA. Se guardará como INCOMPLETA.',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false
    });
  }

  // 5. Mostrar spinner de carga
  Swal.fire({
    title: 'Guardando...',
    allowOutsideClick: false,
    backdrop: 'rgba(0,0,0,0.3)',
    didOpen: () => Swal.showLoading()
  });

  // 6. Preparar payload con el estado determinado
  const payload = this.prepareSaveData(estadoDestino);
  console.debug('[S3] Guardando con estado:', estadoDestino, 'payload:', payload);

  try {
    // 7. Enviar al backend
    const resp = await lastValueFrom(
      this.fichaService.guardarFichaSeccion3(payload).pipe(takeUntil(this.destroy$))
    );

    Swal.close();

    // 8. Mensaje de éxito diferenciado
    const mensaje = estadoDestino === 'C'
      ? (resp?.mensaje || 'Sección 3 guardada como COMPLETA.')
      : (resp?.mensaje || 'Sección 3 guardada como INCOMPLETA.');

    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });

    // 9. Actualizar estado del formulario
    this.ficha3Form.patchValue({ estado_s3: estadoDestino }, { emitEvent: false });
    this.ficha3Form.markAsPristine();

    // 10. Limpiar errores solo si guardó exitosamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    // 11. Emitir eventos al componente padre
    this.onGuardar.emit();
    this.onEstadoActualizado.emit(payload.estado_s3);

  } catch (e: any) {
    Swal.close();
    console.error('[S3 guardar ERR]', e?.status, e?.message, e?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la sección 3.',
      confirmButtonText: 'Entendido'
    });
  }
}

  // private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {

  //       this.necesidadesData?.forEach((r: any) => this.refreshRowValidators(r));
  //       this.ficha3Form.updateValueAndValidity({ emitEvent: false });

  //       const formOk = this.ficha3Form.valid;

  //       if (estadoSolicitado === 'C' && !formOk) {
  //         this.showErrorsAndPersist(); 
  //         await Swal.fire('Faltan respuestas', 'Completa los campos requeridos antes de guardar como COMPLETA.', 'warning');
  //         return;
  //       }

  //       const estadoDestino: 'C' | 'I' = formOk ? 'C' : 'I';

  //   if (estadoSolicitado === 'C' && estadoDestino === 'I') {
  //     this.ficha3Form.markAllAsTouched();
  //     Swal.fire('Faltan respuestas', 'Completa los campos requeridos antes de guardar como COMPLETA.', 'warning');
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
  //       this.fichaService.guardarFichaSeccion3(payload).pipe(takeUntil(this.destroy$))
  //     );

  //     Swal.close();
  //     Swal.fire(
  //       'Listo',
  //       resp?.mensaje || (estadoDestino === 'C' ? 'Sección 3 guardada (Completa).' : 'Sección 3 guardada (Incompleta).'),
  //       'success'
  //     );

  //     this.onGuardar.emit();
  //     this.onEstadoActualizado.emit(payload.estado_s3);
  //     this.ficha3Form.patchValue({ estado_s3: estadoDestino }, { emitEvent: false });
  //     this.ficha3Form.markAsPristine();

  //   } catch (e: any) {
  //     Swal.close();
  //     console.error('[S3 guardar ERR]', e?.status, e?.message, e?.error);
  //     Swal.fire('Error', 'No se pudo guardar la sección 3.', 'error');
  //   }
  // }

  private shouldAutosave(): boolean {
    if (this.hydrating) return false;
    if (!this.idFicha) return false;
    if (!this.ficha3Form.dirty) return false;
    return true;
  }

  // private prepareSaveData(estado: 'C' | 'I') {
  //   const raw = this.ficha3Form.getRawValue();
  //   const payload: any = { ...raw };

  //   // ===== 1.1.7: Form(booleans) --> API(minúsculas, 'S'|'') =====
  //   const p311Keys = Object.keys(this.P311_MAP);

  //   p311Keys.forEach(formKey => {
  //     const apiKey = this.P311_MAP[formKey];

  //     if (formKey === 'p311OtrosDetalle') {
  //       // Solo mandar detalle si J está marcado
  //       const jMarcado = !!raw['p311Otros'];
  //       payload[apiKey] = jMarcado ? (raw['p311OtrosDetalle'] || '') : '';
  //     } else {
  //       payload[apiKey] = raw[formKey] ? 'S' : '';
  //     }
  //   });



  //   // ===== 3.9: Form(booleans) --> API(minúsculas, 'S'|'') =====
  //   const p39Keys = Object.keys(this.P39_MAP);

  //   p39Keys.forEach(formKey => {
  //     const apiKey = this.P39_MAP[formKey];

  //     if (formKey === 'p39AEspecifique') {
  //       // Solo mandar detalle si J está marcado
  //       const jMarcado = !!raw['p39ALogistica'];
  //       payload[apiKey] = jMarcado ? (raw['p39AEspecifique'] || '') : '';
  //     } else {
  //       payload[apiKey] = raw[formKey] ? 'S' : '';
  //     }
  //   });
  //   // Asegurar que los metadatos también vayan en el payload
  //   payload.idFicha = this.idFicha ?? raw.idFicha;
  //   payload.estado_s3 = estado;

  //   return payload; // Retorna el objeto transformado
  // }



  private prepareSaveData(estado: 'C' | 'I') {
  const raw = this.ficha3Form.getRawValue();
  const payload: any = { ...raw };


    delete payload.p34Any;
    delete payload.p37Any;
    delete payload.p39Any;

  Object.keys(this.P311_MAP).forEach(formKey => {
    const apiKey = this.P311_MAP[formKey];
    if (formKey === 'p311OtrosDetalle') {
      payload[apiKey] = raw['p311Otros'] ? (raw['p311OtrosDetalle'] || '') : '';
    } else {
      payload[apiKey] = raw[formKey] ? 'S' : '';
    }
  });

  // 3.9: flags y también gestiones/suficiente/observaciones/detalle
  const rows = [
    { chk:'p39ALogistica', gest:'p39AGestiones', suf:'p39ASuficiente', obs:'p39AEspecifique' },
    { chk:'p39BInfra',     gest:'p39BGestiones', suf:'p39BSuficiente', obs:'p39BEspecifique' },
    { chk:'p39CPersonal',  gest:'p39CGestiones', suf:'p39CSuficiente', obs:'p39CEspecifique' },
    { chk:'p39DPresupuesto',gest:'p39DGestiones',suf:'p39DSuficiente', obs:'p39DEspecifique' },
    { chk:'p39EOtro',      gest:'p39EGestiones', suf:'p39ESuficiente', obs:'p39EEspecifique', det:'p39EOtroDetalle' },
  ];

  rows.forEach(r => {
    // checkbox principal a 'S'|''
    payload[r.chk] = raw[r.chk] ? 'S' : '';
    // si marcaron la fila, manda sus campos; si no, límpialos
    const active = !!raw[r.chk];
    payload[r.gest] = active ? (raw[r.gest] ?? null) : null;         // 'S' | 'N' | null
    payload[r.suf]  = active ? (raw[r.suf]  ?? null) : null;         // 'S' | 'N' | null
    payload[r.obs]  = active ? (raw[r.obs]  ?? '')   : '';
    if (r.det) payload[r.det] = active ? (raw[r.det] ?? '') : '';
  });

  payload.p39Ninguno = raw.p39Ninguno ? 'S' : '';

  // metadatos
  payload.idFicha   = this.idFicha ?? raw.idFicha;
  payload.estado_s3 = estado;
  return payload;
}



  private autosaveSilencioso(): void {
    if (!this.shouldAutosave()) return;

    const estadoActual = this.f('estado_s3')?.value as 'C' | 'I' | '' | null;
    const estadoDestino: 'C' | 'I' =
      (estadoActual === 'C' && this.ficha3Form.valid) ? 'C' : 'I';

    const payload = this.prepareSaveData(estadoDestino);

    this.fichaService.guardarFichaSeccion3(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => console.debug('[S3 autosave OK]', { estadoDestino, res }),
        error: (err) => console.error('[S3 autosave ERR]', err?.status, err?.message, err?.error)
      });
  }

  public validarSeccion(): void {
    const estado = this.ficha3Form.get('estado_s3')?.value;
    const idFicha = this.idFicha;

    if (!idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'La sección 3 debe estar guardada como "Completa" para validarla.', 'warning');
      return;
    }

    const payload = { idFichas3: idFicha, valida_s3: '1' };
    this.fichaService.validarFichaSeccion3(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.ficha3Form.get('valida_s3')?.setValue('1');
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 3 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar la sección 3:', err);
        Swal.fire('Error', 'No se pudo validar la sección 3.', 'error');
      }
    });
  }

  private populateForm(data: any): void {
    this.idFicha = data?.idFicha ?? this.idFicha;
    this.ficha3Form.patchValue(data, { emitEvent: false });

    const toInt  = (v: any) => (v === null || v === undefined || v === '') ? null : Number(v);

      this.f('p34Any')?.updateValueAndValidity({ emitEvent: false });
      this.f('p37Any')?.updateValueAndValidity({ emitEvent: false });
      this.f('p39Any')?.updateValueAndValidity({ emitEvent: false });

    this.ficha3Form.patchValue({
      p38HombreIndustrial: toInt(data.p38HombreIndustrial),
      p38MujerIndustrial: toInt(data.p38MujerIndustrial),
      p38HombreComerciante: toInt(data.p38HombreComerciante),
      p38MujerComerciante: toInt(data.p38MujerComerciante),
      p38HombreEstudiante: toInt(data.p38HombreEstudiante),
      p38HombreOtro: toInt(data.p38HombreOtro),
      p38MujerEstudiante: toInt(data.p38MujerEstudiante),
      p38MujerOtro: toInt(data.p38MujerOtro),

    }, { emitEvent:false });


    ///////////////////////

    // ===== 3) 3.11 (A–K): API --> Form =====
    const p11Keys = Object.keys(this.P311_MAP);
    p11Keys.forEach(formKey => {
      const apiKey = this.P311_MAP[formKey];
      if (formKey === 'p311OtrosDetalle') return;
      const apiVal = (data as any)?.[apiKey];
      this.f(formKey)?.setValue(apiVal === 'S', { emitEvent: false });
    });

    const jMarcado = !!this.f('p311Otros')?.value;
    const jotroAPI = (data as any)?.[this.P311_MAP['p311OtrosDetalle']] ?? '';
    this.f('p311OtrosDetalle')?.setValue(jotroAPI, { emitEvent: false });

    const det = this.f('p311OtrosDetalle')!;
    if (jMarcado) {
      det.enable({ emitEvent: false });
      det.setValidators([Validators.required, Validators.maxLength(200)]);
    } else {
      det.clearValidators();
      det.disable({ emitEvent: false });
    }
  //  det.updateValueAndValidity({ emitEvent: false });

      if (this.f('p310Recibe')?.value === 'S' && !this.anyChecked(this.GROUP_CA)) {
      this.showGroupErrors = true;
      }

  //  Si sigue inválido tras hidratar,  lo hago visible
    this.ficha3Form.updateValueAndValidity({ emitEvent: false });
    if (this.ficha3Form.invalid) {
      this.showAllErrors = true;
      this.persistRequiredErrors();
      this.cdr.markForCheck();
    }


    this.f('p34Any')?.updateValueAndValidity({ emitEvent: false });
      this.f('p37Any')?.updateValueAndValidity({ emitEvent: false });
      
      // Si sigue inválido tras hidratar, lo hago visible
      this.ficha3Form.updateValueAndValidity({ emitEvent: false });
      if (this.ficha3Form.invalid) {
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


  private bindCheckEnablesRequiredText3(checkKey: string, textKey: string) {
    const chk  = this.f(checkKey);
    const text = this.f(textKey);
    if (!chk || !text) return;

    const apply = (val: any) => {
      const isOn = (val === 'S' || val === true);

      if (isOn) {
        // 🔴 Si el checkbox está activo --> limpiar, deshabilitar y quitar required
        text.reset();
        text.clearValidators();
        text.disable({ emitEvent: false });
      } else {
        // 🟢 Si NO está activo --> habilitar y aplicar Validators.required
        text.enable({ emitEvent: false });
        text.setValidators([Validators.required]);
      }

      // actualiza validadores
      text.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    };

    // estado inicial
    apply(chk.value);

    // escucha cambios en el checkbox
    chk.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  private bindCheckEnablesRequiredTextOtro(checkKey: string, textKey: string) {
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
  private bindEnableRequiredAuto(triggerKey: string, targetKey: string) {
    const trigger = this.f(triggerKey);
    const target = this.f(targetKey);
    if (!trigger || !target) return;

    const apply = (val: any) => {
      // 🔍 Detecta si debe habilitar el campo
      const isActive =
        val === 'S' ||                // valor tipo radio/char
        val === true ||               // checkbox
        (typeof val === 'number' && val !== 0) ; // número distinto de 0
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
  private bindEnableRequiredAutoRevertido(triggerKey: string, targetKeys: string | string[]) {
    const trigger = this.f(triggerKey);
    const targets = Array.isArray(targetKeys) ? targetKeys.map(k => this.f(k)) : [this.f(targetKeys)];
    if (!trigger) return;

    const apply = (val: any) => {
      const isActive =
        val === 'S' ||
        val === true ||
        (typeof val === 'number' && val !== 0);

      targets.forEach(target => {
        if (!target) return;

        if (isActive) {
          // 🔒 Limpia y deshabilita completamente
          target.reset();
          target.disable({ emitEvent: false });
          target.clearValidators();
        } else {
          // 🔓 Habilita nuevamente (sin validadores)
          target.enable({ emitEvent: false });
        }

        target.updateValueAndValidity({ emitEvent: false });
      });

      this.cdr.markForCheck();
    };

    // Aplica al iniciar + escucha cambios
    apply(trigger.value);
    trigger.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }
  /////////////////


  onOtroCheckboxChange3(nombreCheckbox: string, nombreDetalle: string) {
    const marcado = !!this.ficha3Form.get(nombreCheckbox)?.value; // true si 'S' o true
    const detalle = this.ficha3Form.get(nombreDetalle);
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

  private bindRadioEnablesOn3(
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
          t.clearValidators();
        } else {
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
      const detalleOtros = this.f('p311OtrosDetalle');
      if (!active && detalleOtros) {
        detalleOtros.reset('', { emitEvent: false });
        detalleOtros.disable({ emitEvent: false });
        detalleOtros.clearValidators();
        detalleOtros.updateValueAndValidity({ emitEvent: false });
      }

      if (active) actualizarValidadores();
    };

    // Inicializar y suscribirse
    apply(src.value);
    src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);

    targets.forEach(t => {
      t?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (predicate(src.value)) actualizarValidadores();
      });
    });

    this.cdr.markForCheck();
  }

  private controlarRadioSiNo(
    radioControlName: string,
    detalleControlName: string,
    habilitarValor: string
  ): void {
    const radio = this.ficha3Form.get(radioControlName);
    const detalle = this.ficha3Form.get(detalleControlName);
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
  private controlarDetalleOtros(): void {
    const otros = this.f('p311Otros')!;
    const detalle = this.f('p311OtrosDetalle')!;

    // Monitoreamos cambios del checkbox "p311Otros"
    otros.valueChanges.subscribe((checked: boolean) => {
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

    // Estado inicial al cargar el formulario
    if (!otros.value) {
      detalle.disable();
    }
  }




  ////////////////////////////////////////////////////////



private showErrorsAndPersist(): void {
  this.showAllErrors = true;
  this.showGroupErrors = true; // ← agrega esto
  this.ficha3Form.markAllAsTouched();
  this.persistRequiredErrors();
  this.cdr.markForCheck();
  this.scrollToFirstError();
}


/** Scroll suave al primer control inválido (mejor UX). */
private scrollToFirstError(): void {
  try {
    const el = document.querySelector(
      '.ng-invalid[formcontrolname], mat-form-field.ng-invalid, .mat-mdc-form-field.ng-invalid'
    ) as HTMLElement | null;
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch {}
}
}
