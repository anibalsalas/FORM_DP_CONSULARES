import {
  Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy, 
  Input, Output, EventEmitter,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Ficha1Service } from '../ficha1.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Max3DigitsDirective } from './max-3digits.directive';
import { environment } from '../../../../environments/environment';

type SN = 'S'|'N'|null;

type MatrizFilaCfg = {
  label: string;
  check: string;        
  gestion: string;      
  suficiente: string;   
  observaciones: string; 
  especifique?: string; 
};

type MatrizCfg = { filas: MatrizFilaCfg[]; ninguno: string };




@Component({
  selector: 'app-seccion-ficha4',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatRadioModule, MatCheckboxModule,
    MatButtonModule, MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, Max3DigitsDirective
  ],
  templateUrl: './seccion-ficha4.component.html',
  styleUrls: ['./seccion-ficha4.component.scss']
})
export class SeccionFicha4Component implements OnInit, OnDestroy {
  @Input() datosFicha4: any;
  @Input() activarAutosave!: boolean;
  
  @Input() idFicha: number | null = null;
  //@Output() guardar = new EventEmitter<any>();

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();

  @Output() seccionValidada = new EventEmitter<void>();
  ficha4Form: FormGroup;
  private autosaveLanzado = false;
  private hydrating = false;


  private revalidateP410: (() => void) | undefined;
  private revalidateP45: (() => void) | undefined;

  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();
  private readonly cdr = inject(ChangeDetectorRef);


  private readonly ficha1Service = inject(Ficha1Service);
  private readonly authService = inject(AuthService);


  roles: string[] = [];
  rolAdministrador: string = environment.rolAdministrador;
  rolComisionado: string = environment.rolComisionado;
  rolEspecialista: string = environment.rolEspecialista;

    limitarDigitosTextarea(event: any, maxLength: number = 500): void {
    const input = event.target;
    const valor = input.value; 
    if (valor.length > maxLength) {
      input.value = valor.slice(0, maxLength); 
    }
  }

  /** P4.8 Matriz */
  p48Rows = [
    {
      keyCheck: 'p48ALogistica',
      keyGest:  'p48AGestiones',
      keySuf:   'p48ASuficiente',
      keyObs:   'p48AEspecifique',
      label:    'Logística'
    },
    {
      keyCheck: 'p48BInfra',
      keyGest:  'p48BGestiones',
      keySuf:   'p48BSuficiente',
      keyObs:   'p48BEspecifique',
      label:    'Infraestructura'
    },
    {
      keyCheck: 'p48CPersonal',
      keyGest:  'p48CGestiones',
      keySuf:   'p48CSuficiente',
      keyObs:   'p48CEspecifique',
      label:    'Personal'
    },
    {
      keyCheck: 'p48DPresupuesto',
      keyGest:  'p48DGestiones',
      keySuf:   'p48DSuficiente',
      keyObs:   'p48DEspecifique',
      label:    'Presupuesto'
    },
    {
      keyCheck: 'p48EOtro',
      keyGest:  'p48EGestiones',
      keySuf:   'p48ESuficiente',
      keyObs:   'p48EEspecifique',
      label:    'Otro'
    }
  ];

  mxP48: MatrizCfg = {
  ninguno: 'p48Ninguno',
  filas: [
    { label:'Logística',      check:'p48ALogistica',  gestion:'p48AGestiones',  suficiente:'p48ASuficiente',  observaciones:'p48AEspecifique' },
    { label:'Infraestructura',check:'p48BInfra',      gestion:'p48BGestiones',  suficiente:'p48BSuficiente',  observaciones:'p48BEspecifique' },
    { label:'Personal',       check:'p48CPersonal',   gestion:'p48CGestiones',  suficiente:'p48CSuficiente',  observaciones:'p48CEspecifique' },
    { label:'Presupuesto',    check:'p48DPresupuesto',gestion:'p48DGestiones',  suficiente:'p48DSuficiente',  observaciones:'p48DEspecifique' },
    { label:'Otro',           check:'p48EOtro',       gestion:'p48EGestiones',  suficiente:'p48ESuficiente',  observaciones:'p48EEspecifique', especifique:'p48EOtroDetalle' },
  ]
};

  
  p410Instituciones = [
    'p410Mre','p410Reniec','p410Migraciones','p410Interpol','p410Inei','p410Jne','p410Onpe','p410Sunarp','p410PoderJudicial','p410Otro'
  ];

  today: Date = new Date();

  /**
 * Validador que requiere al menos un checkbox marcado en un grupo
 */
  private requireAtLeastOneFromGroup(checkboxKeys: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.ficha4Form) return null;
      
      const atLeastOneChecked = checkboxKeys.some(key => {
        const ctrl = this.f(key);
        return ctrl?.value === 'S';
      });
      
      return atLeastOneChecked ? null : { requireOne: true };
    };
  }


  private requireAtLeastOneP48(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha4Form) return null;
    
    const keys = ['p48ALogistica', 'p48BInfra', 'p48CPersonal', 'p48DPresupuesto', 'p48EOtro', 'p48Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha4Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}
  
   constructor() {
     this.ficha4Form = this.fb.group({
    // Meta
    idFicha:       [null],
    idFichas4:     [null],
    estado_s4:      [''],
    valida_s4:      [''],
      
    // ----- P4.1 -----
    p41Convocado:  [null as SN, Validators.required],
    p41Fecha:      [{ value: null, disabled: true }],

    // ----- P4.2 -----
    p42NumHombre:  [{ value: null, disabled: true }],
    p42NumMujer:   [{ value: null, disabled: true }],

    // ----- P4.3 -----
    p43Ciudadanos: [null, Validators.required],

    // ----- P4.4 -----
    p44UltimoAnio: [null as string | null, Validators.required],

    // ----- P4.5 (motivos) -----
    p45Votantes:    [null as 'S'|null],
    p45Candidatos:  [null as 'S'|null],
    p45Apoyo:       [null as 'S'|null],
    p45Actualizar:  [null as 'S'|null],
    p45Otros:       [null as 'S'|null],
    p45OtrosDetalle:[{ value: '', disabled: true }],

    p45Any: [null, this.requireAtLeastOneFromGroup(['p45Votantes','p45Candidatos','p45Apoyo','p45Actualizar','p45Otros'])],

    // ----- P4.6 -----
    p46Consulado: [null as SN, Validators.required],
    p46Detalle:   [{ value: '', disabled: true }],

    // ----- P4.7 -----
    p47IndicarConsejo: [null as SN, Validators.required],

    // ----- P4.8 (matriz + ninguno) -----
    p48Ninguno:       [null as 'S'|null],

    p48ALogistica:    [null as 'S'|null],
    p48AGestiones:    [{ value: null as SN, disabled: true }],
    p48ASuficiente:   [{ value: null as SN, disabled: true }],
    p48AEspecifique:  [{ value: '', disabled: true }],

    p48BInfra:        [null as 'S'|null],
    p48BGestiones:    [{ value: null as SN, disabled: true }],
    p48BSuficiente:   [{ value: null as SN, disabled: true }],
    p48BEspecifique:  [{ value: '', disabled: true }],

    p48CPersonal:     [null as 'S'|null],
    p48CGestiones:    [{ value: null as SN, disabled: true }],
    p48CSuficiente:   [{ value: null as SN, disabled: true }],
    p48CEspecifique:  [{ value: '', disabled: true }],

    p48DPresupuesto:  [null as 'S'|null],
    p48DGestiones:    [{ value: null as SN, disabled: true }],
    p48DSuficiente:   [{ value: null as SN, disabled: true }],
    p48DEspecifique:  [{ value: '', disabled: true }],

    p48EOtro:         [null as 'S'|null],
    p48EGestiones:    [{ value: null as SN, disabled: true }],
    p48ESuficiente:   [{ value: null as SN, disabled: true }],
    p48EEspecifique:  [{ value: '', disabled: true }],
    p48EOtroDetalle:  [{ value: '', disabled: true }],

    // ----- P4.9 -----
    p49Recibe: [null as SN, Validators.required],

    // ----- P4.10 -----
    p410Mre:            [null as 'S'|null],
    p410Reniec:         [null as 'S'|null],
    p410Migraciones:    [null as 'S'|null],
    p410Interpol:       [null as 'S'|null],
    p410Inei:           [null as 'S'|null],
    p410Jne:            [null as 'S'|null],
    p410Onpe:           [null as 'S'|null],
    p410Sunarp:         [null as 'S'|null],
    p410PoderJudicial:  [null as 'S'|null],
    p410Otro:           [null as 'S'|null],
    p410OtroDetalle:    [{ value: '', disabled: true }],
    p410Ninguna:        [null as 'S'|null],


     p410Any: [null],

     p48Any: [null, this.requireAtLeastOneP48()],

   });
  }

//     ngOnInit(): void {
//   let isProcessing = false;
//   let isProcessingOtro = false;
  
//   if (this.idFicha) {
//     this.ficha4Form.get('idFicha')?.setValue(this.idFicha, { emitEvent: false });
//   }

//   if (this.datosFicha4) {
//     this.cargarDatosFormulario(this.datosFicha4);
//   }

//   // ====== Wiring de condicionales ======
//   this.bindYesEnablesRequired('p41Convocado', 'p41Fecha', [Validators.required]);
//   this.bindYesEnablesRequired('p41Convocado', 'p42NumHombre', [Validators.required]);
//   this.bindYesEnablesRequired('p41Convocado', 'p42NumMujer', [Validators.required]);
  
//   this.bindCheckEnablesRequiredText('p45Otros', 'p45OtrosDetalle');
//   this.bindRadioEnablesOn('p46Consulado', (v) => v === 'S', 'p46Detalle', [Validators.required]);
  
//   this.setupP48Matrix();
//  // this.bindYesRequiresAtLeastOne('p49Recibe', this.p410Instituciones, 'p410Group');

//   // 4.9: Recibe capacitaciones
//   this.f('p49Recibe')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
//     if (isProcessing) return;
//     isProcessing = true;

//     const isYes = v === 'S';
//     const isNingunaChecked = this.f('p410Ninguna')?.value === 'S';

//     this.toggleCtrlEnabled('p410Ninguna', !isYes, true);
//     if (isYes) {
//       this.f('p410Ninguna')?.setValue(null, { emitEvent: false });
//     }

//     const needOtroDet = isYes && this.f('p410Otro')?.value === 'S' && !isNingunaChecked;
//     this.toggleCtrlEnabled('p410OtroDetalle', needOtroDet, false, 
//                           needOtroDet ? [Validators.required] : []);

//     setTimeout(() => { isProcessing = false; }, 0);
//   });

//   // "Ninguna" en P4.10
//   this.f('p410Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
//     if (isProcessing) return;
//     isProcessing = true;

//     const isOn = v === 'S';
    
//     this.p410Instituciones.forEach(k => {
//       const ctrl = this.f(k);
//       if (!ctrl) return;
      
//       if (isOn) {
//         if (!ctrl.disabled) this.disableSoftWithString(ctrl);
//       } else {
//         if (ctrl.disabled) ctrl.enable({ emitEvent: false });
//       }
//     });

//     if (isOn) {
//       this.disableSoftWithString(this.f('p410OtroDetalle'));
//     } else {
//       const need = this.f('p410Otro')?.value === 'S' && this.f('p49Recibe')?.value === 'S';
//       this.toggleCtrlEnabled('p410OtroDetalle', need, false, 
//                             need ? [Validators.required] : []);
//     }

//     setTimeout(() => { isProcessing = false; }, 0);
//   });

//   this.f('p410Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
//     if (isProcessingOtro) return;
//     isProcessingOtro = true;
    
//     const need = v === 'S' && 
//                 this.f('p49Recibe')?.value === 'S' && 
//                 this.f('p410Ninguna')?.value !== 'S';
//     this.toggleCtrlEnabled('p410OtroDetalle', need, false, 
//                           need ? [Validators.required] : []);
    
//     setTimeout(() => { isProcessingOtro = false; }, 0);
//   });

//   this.bindAtLeastOneRequired(
//     ['p45Votantes','p45Candidatos','p45Apoyo','p45Actualizar','p45Otros'],
//     'p45Group'
//   );


//    const p45Keys = ['p45Votantes','p45Candidatos','p45Apoyo','p45Actualizar','p45Otros'];
//   this.revalidateP45 = this.bindRequireAtLeastOneWhenYes('p49Recibe', p45Keys, 'p45Any');

// }

ngOnInit(): void {
  if (this.idFicha) {
    this.ficha4Form.get('idFicha')?.setValue(this.idFicha, { emitEvent: false });
  }

  if (this.datosFicha4) {
    this.cargarDatosFormulario(this.datosFicha4);
  }

  this.bindYesEnablesRequired('p41Convocado', 'p41Fecha', [Validators.required]);
  this.bindYesEnablesRequired('p41Convocado', 'p42NumHombre', [Validators.required]);
  this.bindYesEnablesRequired('p41Convocado', 'p42NumMujer', [Validators.required]);
  
  this.bindCheckEnablesRequiredText('p45Otros', 'p45OtrosDetalle');
  this.bindRadioEnablesOn('p46Consulado', (v) => v === 'S', 'p46Detalle', [Validators.required]);
  
  this.setupP48Matrix();

  // ====== VALIDACIONES DE GRUPO ======
  this.revalidateP410 = this.bindRequireAtLeastOneWhenYes('p49Recibe', this.p410Instituciones, 'p410Any');
  
  const p45Keys = ['p45Votantes','p45Candidatos','p45Apoyo','p45Actualizar','p45Otros'];
  p45Keys.forEach(k => {
    this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.f('p45Any')?.updateValueAndValidity({ emitEvent: false });
    });
  });

  // ====== MANEJO DE "NINGUNA" EN P4.10 ======
  this.f('p410Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
    const isOn = v === 'S';
    
    if (isOn) {
      this.p410Instituciones.forEach(k => {
        const ctrl = this.f(k);
        if (ctrl && !ctrl.disabled) {
          this.disableSoftWithString(ctrl);
        }
      });
      
      this.disableSoftWithString(this.f('p410OtroDetalle'));
      
      this.f('p410Any')?.clearValidators();
      this.f('p410Any')?.updateValueAndValidity({ emitEvent: false });
    } else {
      if (this.f('p49Recibe')?.value === 'S') {
        this.revalidateP410?.();
      }
    }
  });

  this.f('p410Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
    const need = v === 'S' && 
                this.f('p49Recibe')?.value === 'S' && 
                this.f('p410Ninguna')?.value !== 'S';
    
    this.toggleCtrlEnabled('p410OtroDetalle', need, false, 
                          need ? [Validators.required] : []);
  });
}

openDatepicker(picker: MatDatepicker<any>, ctrlName: string, ev?: Event) {
  ev?.preventDefault();
  if (this.f(ctrlName)?.disabled) return;
  picker.open();
}

private cargarDatosFormulario(datos: any): void {
  if (!datos) return;

  this.ficha4Form.patchValue({
     idFicha:   datos.idFicha,
    idFichas4: datos.idFichas4,
    estado_s4: datos.estado_s4,
    valida_s4: datos.valida_s4,
    
    // P4.1
    p41Convocado: datos.p41Convocado,
    p41Fecha: datos.p41Fecha ? new Date(datos.p41Fecha) : null,
    
    // P4.2
    p42NumHombre: datos.p42NumHombre,
    p42NumMujer: datos.p42NumMujer,
    
    // P4.3
    p43Ciudadanos: datos.p43Ciudadanos,
    
    // P4.4
    p44UltimoAnio: datos.p44UltimoAnio,
    
    // P4.5
    p45Votantes: datos.p45Votantes === 'S' ? 'S' : null,
    p45Candidatos: datos.p45Candidatos === 'S' ? 'S' : null,
    p45Apoyo: datos.p45Apoyo === 'S' ? 'S' : null,
    p45Actualizar: datos.p45Actualizar === 'S' ? 'S' : null,
    p45Otros: datos.p45Otros === 'S' ? 'S' : null,
    p45OtrosDetalle: datos.p45OtrosDetalle,
    
    // P4.6
    p46Consulado: datos.p46Consulado,
    p46Detalle: datos.p46Detalle,
    
    // P4.7
    p47IndicarConsejo: datos.p47IndicarConsejo,
    
    // P4.8 - Checkboxes
    p48Ninguno: datos.p48Ninguno === 'S' ? 'S' : null,
    p48ALogistica: datos.p48ALogistica === 'S' ? 'S' : null,
    p48AGestiones: datos.p48AGestiones,
    p48ASuficiente: datos.p48ASuficiente,
    p48AEspecifique: datos.p48AEspecifique,
    
    p48BInfra: datos.p48BInfra === 'S' ? 'S' : null,
    p48BGestiones: datos.p48BGestiones,
    p48BSuficiente: datos.p48BSuficiente,
    p48BEspecifique: datos.p48BEspecifique,
    
    p48CPersonal: datos.p48CPersonal === 'S' ? 'S' : null,
    p48CGestiones: datos.p48CGestiones,
    p48CSuficiente: datos.p48CSuficiente,
    p48CEspecifique: datos.p48CEspecifique,
    
    p48DPresupuesto: datos.p48DPresupuesto === 'S' ? 'S' : null,
    p48DGestiones: datos.p48DGestiones,
    p48DSuficiente: datos.p48DSuficiente,
    p48DEspecifique: datos.p48DEspecifique,
    
    p48EOtro: datos.p48EOtro === 'S' ? 'S' : null,
    p48EGestiones: datos.p48EGestiones,
    p48ESuficiente: datos.p48ESuficiente,
    p48EEspecifique: datos.p48EEspecifique,
    p48EOtroDetalle: datos.p48EOtroDetalle,
    
    // P4.9
    p49Recibe: datos.p49Recibe,
    
    // P4.10
    p410Mre: datos.p410Mre === 'S' ? 'S' : null,
    p410Reniec: datos.p410Reniec === 'S' ? 'S' : null,
    p410Migraciones: datos.p410Migraciones === 'S' ? 'S' : null,
    p410Interpol: datos.p410Interpol === 'S' ? 'S' : null,
    p410Inei: datos.p410Inei === 'S' ? 'S' : null,
    p410Jne: datos.p410Jne === 'S' ? 'S' : null,
    p410Onpe: datos.p410Onpe === 'S' ? 'S' : null,
    p410Sunarp: datos.p410Sunarp === 'S' ? 'S' : null,
    p410PoderJudicial: datos.p410PoderJudicial === 'S' ? 'S' : null,
    p410Otro: datos.p410Otro === 'S' ? 'S' : null,
    p410OtroDetalle: datos.p410OtroDetalle,
    p410Ninguna: datos.p410Ninguna === 'S' ? 'S' : null,
  }, { emitEvent: false });

  // Marca como pristine después de cargar
  this.ficha4Form.markAsPristine();
  
  console.log(' Datos cargados en el formulario:', datos);
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['datosFicha4']?.currentValue) {
    this.populateForm(changes['datosFicha4'].currentValue);
  }

if (changes['activarAutosave']?.currentValue === true && !this.autosaveLanzado) {
  if (this.shouldAutosave(true)) {      // <— fuerza primera vez
    this.autosaveSilencioso();
    this.autosaveLanzado = true;
  }
}
}


 

   private shouldAutosave(initial = false): boolean {
  if (!this.idFicha && !this.f('idFicha')?.value) return false;
  if (initial) return true;             // fuerza en apertura
  return this.ficha4Form.dirty;         // después, solo si hay cambios
}




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ======= Helpers de acceso =======
  public showAllErrors = false; // Mantiene visibles los errores

  f(path: string) { return this.ficha4Form.get(path) as AbstractControl | null; }

   public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }

  isDisabled(name: string): boolean { return !!this.f(name)?.disabled; }

  isCheckboxChecked(name: string): boolean { return this.f(name)?.value === 'S'; }


// onCheckboxChange(name: string, ev: any) {
//   const ctrl = this.f(name);
//   if (!ctrl || ctrl.disabled) return;

//   const checked = !!ev?.checked;
  
//   // Usar setValue con emitEvent controlado
//   ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
//   ctrl.markAsDirty();
//   ctrl.markAsTouched();
  
// }

/**
 * Maneja cambios en checkboxes
 *  Marca como touched y revalida grupos
 */

onCheckboxChange(name: string, ev: any) {
  const ctrl = this.f(name);
  if (!ctrl || ctrl.disabled) return;

  const checked = !!ev?.checked;
  
  ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
  ctrl.markAsDirty();
  ctrl.markAsTouched();
  
  //  Revalida controles ocultos
  this.revalidateCheckboxGroups(name);
}

/**
 * Revalida los controles ocultos cuando cambia un checkbox de un grupo
 */
private revalidateCheckboxGroups(changedCheckbox: string): void {
  // P4.10 - Instituciones
  if (this.p410Instituciones.includes(changedCheckbox) || changedCheckbox === 'p410Ninguna') {
    this.f('p410Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // P4.5 - Motivos
  const p45Keys = ['p45Votantes','p45Candidatos','p45Apoyo','p45Actualizar','p45Otros'];
  if (p45Keys.includes(changedCheckbox)) {
    this.f('p45Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // P4.8 - Necesidades
  const p48Keys = ['p48ALogistica', 'p48BInfra', 'p48CPersonal', 'p48DPresupuesto', 'p48EOtro', 'p48Ninguno'];
  if (p48Keys.includes(changedCheckbox)) {
    this.f('p48Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

private getRequiredControlNames(): string[] {
  const keys = Object.keys(this.ficha4Form.controls);
  return keys.filter(k => {
    const c = this.ficha4Form.get(k);
    const hasReq = !!c && typeof (c as any).hasValidator === 'function'
      ? (c as any).hasValidator(Validators.required)
      : false;
    return !!c && !c.disabled && hasReq;
  });
}

private persistRequiredErrors(): void {
  const keys = this.getRequiredControlNames();
  keys.forEach(k => {
    const c = this.ficha4Form.get(k)!;
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

  if (!(this.showAllErrors || control.touched || control.dirty)) return '';

  if (control.hasError('required')) {
    const custom = this.CUSTOM_MESSAGES?.[controlName]?.['required'];
    return custom ?? 'Este campo es requerido';
  }

  if (control.hasError('requireOne')) {
    const custom = this.CUSTOM_MESSAGES?.[controlName]?.['requireOne'];
    return custom ?? 'Debe seleccionar al menos una opción';
  }

  if (control.hasError('min')) {
    return 'El valor debe ser mayor o igual a 0';
  }

  if (control.hasError('exceedsTotal')) {
    const e = control.getError('exceedsTotal') as { max?: number } | null;
    return `No puede exceder ${e?.max ?? 'el máximo permitido'}`;
  }

  if (control.hasError('positiveInt')) {
    return 'Debe ser un número entero positivo';
  }

  return 'Campo inválido';
}



public hasError(controlName: string, errorType: string): boolean {
  const control = this.f(controlName);
  if (!control) return false;


  const shouldShow = this.showAllErrors || control.touched || control.dirty;
  
  return !!(control.hasError(errorType) && shouldShow);
}

  public showGroupErrors = false;




  // ============================================
// GETTERS PARA VALIDACIONES DE GRUPO
// ============================================

get showP48GroupError(): boolean {
  const anyCtrl = this.f('p48Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidP410(): boolean {
  const anyCtrl = this.f('p410Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}


get invalidP45(): boolean {
  const anyCtrl = this.f('p45Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}


get showP410GroupError(): boolean {
  const p49 = this.f('p49Recibe');
  
  // Solo mostrar si el control está tocado O si estamos mostrando todos los errores
  const shouldShow = this.showAllErrors || this.showGroupErrors || p49?.touched;
  
  // Verificar que:
  // 1. Se debe mostrar el error (por alguna de las condiciones anteriores)
  // 2. p49Recibe === 'S'
  // 3. Existe el error 'p410Group'
  return !!(
    shouldShow && 
    p49?.value === 'S' && 
    p49?.errors?.['p410Group']
  );
}

/**
 * Verifica si debe mostrar el error de "al menos un motivo" (P4.5)
 * Respeta showAllErrors, showGroupErrors
 */
get showP45GroupError(): boolean {
  const shouldShow = this.showAllErrors || this.showGroupErrors;
  return !!(shouldShow && this.ficha4Form.errors?.['p45Group']);
}

/////////////////////////////////////////////////////////////////////////////////////

private showErrorsAndPersist(): void {
  this.showAllErrors = true;
  this.showGroupErrors = true; // ← agrega esto
  this.ficha4Form.markAllAsTouched();
  this.persistRequiredErrors();
  this.cdr.markForCheck();
  this.scrollToFirstError();
}

private scrollToFirstError(): void {
  try {
    const el = document.querySelector(
      '.ng-invalid[formcontrolname], mat-form-field.ng-invalid, .mat-mdc-form-field.ng-invalid'
    ) as HTMLElement | null;
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch {}
}


  private disableSoftWithString(ctrl: AbstractControl | null) {
    if (!ctrl) return;
    ctrl.reset({ value: '', disabled: true });
    ctrl.clearValidators();
  }





  private bindYesEnablesRequired(sourceKey: string, targetKey: string, validators: any[] = [Validators.required]) {
    const src = this.f(sourceKey), trg = this.f(targetKey);
    if (!src || !trg) return;

    const apply = (v: any) => {
      if (v === 'S') {
        trg.enable({ emitEvent:false });
        trg.setValidators(validators);
      } else {
        this.disableSoftWithNull(trg); // num/fecha
      }
      trg.updateValueAndValidity({ emitEvent:false });
    };
    apply(src.value);
    src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  private bindRadioEnablesOn(sourceKey: string, predicate: (v:any)=>boolean, targetKey: string, validators: any[] = [Validators.required]) {
    const src = this.f(sourceKey), trg = this.f(targetKey);
    if (!src || !trg) return;
    const apply = (v:any) => {
      if (predicate(v)) {
        trg.enable({ emitEvent:false });
        trg.setValidators(validators);
      } else {
        this.disableSoftWithString(trg); // textos
      }
      trg.updateValueAndValidity({ emitEvent:false });
    };
    apply(src.value);
    src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }







private bindRequireAtLeastOneWhenYes(
  yesKey: string,
  checkKeys: string[],
  hiddenCtrlKey: string
): () => void {
  const yes = this.f(yesKey);
  const hidden = this.f(hiddenCtrlKey);
  if (!yes || !hidden) return () => {};

  let isValidating = false;

  const validate = () => {
    if (isValidating) return;
    isValidating = true;

    const isYes = yes.value === 'S';
    const isNingunaChecked = hiddenCtrlKey === 'p410Any' 
      ? this.f('p410Ninguna')?.value === 'S' 
      : false;

    // 1️⃣ Habilita/deshabilita checkboxes
    checkKeys.forEach(k => {
      const c = this.f(k);
      if (!c) return;
      
      if (isYes && !isNingunaChecked) {
        if (c.disabled) c.enable({ emitEvent: false });
      } else {
        if (!c.disabled) this.disableSoftWithString(c);
      }
    });

    // 2️⃣ Aplicar validador al control oculto si corresponde
    if (isYes && !isNingunaChecked) {
      hidden.setValidators([this.requireAtLeastOneFromGroup(checkKeys)]);
    } else {
      hidden.clearValidators();
    }
    hidden.updateValueAndValidity({ emitEvent: false });

    isValidating = false;
  };

  // Validación inicial
  validate();

  // Reaccionar a cambios
  yes.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => validate());
  
  checkKeys.forEach(k => {
    this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => validate());
  });

  // Si hay "Ninguna", también escucharla
  if (hiddenCtrlKey === 'p410Any') {
    this.f('p410Ninguna')?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => validate());
  }

  // 👈 Devolver función de revalidación
  return validate;
}



  private bindCheckEnablesRequiredText(checkKey: string, textKey: string) {
    const chk = this.f(checkKey), txt = this.f(textKey);
    if (!chk || !txt) return;
    const apply = (v:any) => {
      if (v === 'S') {
        txt.enable({ emitEvent:false });
        txt.setValidators([Validators.required]);
      } else {
        this.disableSoftWithString(txt);
      }
      txt.updateValueAndValidity({ emitEvent:false });
    };
    apply(chk.value);
    chk.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  private bindP48_GestionSuficiente(gestKey: string, sufKey: string) {
  const g = this.f(gestKey);
  const s = this.f(sufKey);
  if (!g || !s) return;

  const apply = (val: any) => {
    if (val === 'S') {
      s.enable({ emitEvent:false });
      s.setValidators([Validators.required]);
    } else {
      this.disableSoftWithSN(s);          
    }
    s.updateValueAndValidity({ emitEvent:false });
  };

  apply(g.value);
  g.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
}

  private setupP48Matrix() {
    this.f('p48Ninguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      const isOn = v === 'S';
      this.p48Rows.forEach(r => {
        if (isOn) {
          this.f(r.keyCheck)?.setValue(null, { emitEvent:false });
          this.disableRow(r);
        }
      });
    });

    this.p48Rows.forEach(r => {
      this.f(r.keyCheck)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
        const on = v === 'S';
        if (on) {
          if (this.f('p48Ninguno')?.value === 'S') {
            this.f('p48Ninguno')?.setValue(null, { emitEvent:false });
          }
          this.enableRow(r);
        } else {
          this.disableRow(r);
        }
      });

      const initOn = this.f(r.keyCheck)?.value === 'S';
      if (initOn) this.enableRow(r); else this.disableRow(r);
    });

    this.f('p48EOtro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      const need = v === 'S';
      this.toggleCtrlEnabled('p48EOtroDetalle', need, false, need ? [Validators.required] : []);
    });
    const need = this.f('p48EOtro')?.value === 'S';
    this.toggleCtrlEnabled('p48EOtroDetalle', !!need, false, need ? [Validators.required] : []);



     this.p48Rows.forEach(r => {
        this.bindP48_GestionSuficiente(r.keyGest, r.keySuf);
      });

  }



  private enableRow(r: {keyGest:string,keySuf:string,keyObs:string}) {
  const g = this.f(r.keyGest), s = this.f(r.keySuf), o = this.f(r.keyObs);
  // Habilita Gestiones + Observaciones
  g?.enable({ emitEvent:false }); g?.setValidators([Validators.required]);
  o?.enable({ emitEvent:false });

  // Suficiente depende del valor actual de Gestiones
  if (g?.value === 'S') {
    s?.enable({ emitEvent:false }); s?.setValidators([Validators.required]);
  } else {
    this.disableSoftWithSN(s); // null + disabled
  }

  g?.updateValueAndValidity({ emitEvent:false });
  s?.updateValueAndValidity({ emitEvent:false });
  o?.updateValueAndValidity({ emitEvent:false });
}

private disableRow(r: {keyGest:string,keySuf:string,keyObs:string}) {
  this.disableSoftWithSN(this.f(r.keyGest));
  this.disableSoftWithSN(this.f(r.keySuf));
  this.disableSoftWithString(this.f(r.keyObs));
}

  // ======= Utilidades de enable/disable =======
  private toggleCtrlEnabled(name: string, enabled: boolean, isNumberOrDate = false, validators: any[] = []) {
    const c = this.f(name); if (!c) return;
    if (enabled) {
      c.enable({ emitEvent:false });
      c.setValidators(validators);
    } else {
      isNumberOrDate ? this.disableSoftWithNull(c) : this.disableSoftWithString(c);
    }
    c.updateValueAndValidity({ emitEvent:false });
  }
  private disableSoftWithNull(ctrl: AbstractControl | null) {
    if (!ctrl) return;
    ctrl.reset({ value: null, disabled: true });
    ctrl.clearValidators();
  }
  private disableSoftWithSN(ctrl: AbstractControl | null) {
    if (!ctrl) return;
    ctrl.reset({ value: null, disabled: true });
    ctrl.clearValidators();
  }


permitirSoloNumeros(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const tecla = event.key;
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (teclasPermitidas.includes(tecla)) {
      return;
    }
    const textoSeleccionado = input.selectionStart !== input.selectionEnd;
    if (valorActual.length >= 5 && !textoSeleccionado) {
      event.preventDefault();
      return;
    }
    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
    }
  }

   public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }


  private transformarValoresCheckbox(formData: any): any {
    const transformedData = { ...formData };
    Object.keys(transformedData).forEach(key => {
      if (typeof transformedData[key] === 'boolean') {
        transformedData[key] = transformedData[key] ? 'S' : '';
      }
    });
    return transformedData;
  }

  
 private autosaveSilencioso(): void {
  const id = this.idFicha ?? this.f('idFicha')?.value;
  if (!id) {
    console.warn('Autosave cancelado: no hay idFicha.');
    return;
  }
  const seccionData = this.prepareSaveData('I');
  this.ficha1Service.guardarFichaSeccion4(seccionData)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => console.log('🟢 Autosave sección 4 OK'),
      error: (err) => {
        console.error('🔴 Autosave sección 4 ERROR:', err);
        // útil para detectar si el problema es 401/403 del backend:
        if (err?.status === 401 || err?.status === 403) {
          console.warn('Token inválido/expirado o roles insuficientes en autosave.');
        }
      }
    });
}

 
// private enforceGroupRules(): void {
//   const k45 = ['p45Votantes','p45Candidatos','p45Apoyo','p45Actualizar','p45Otros'];
//   const any45 = k45.some(k => this.f(k)?.value === 'S');
//   const fe = { ...(this.ficha4Form.errors || {}) };
//   if (!any45) fe['p45Group'] = true; else delete fe['p45Group'];
//   this.ficha4Form.setErrors(Object.keys(fe).length ? fe : null);

//   const rec = this.f('p49Recibe')?.value === 'S';
//   const ning = this.f('p410Ninguna')?.value === 'S';
//   const keys410 = ['p410Mre','p410Reniec','p410Migraciones','p410Interpol','p410Inei','p410Jne','p410Onpe','p410Sunarp','p410PoderJudicial','p410Otro'];
//   const any410 = keys410.some(k => this.f(k)?.value === 'S');
//   const prev49 = this.f('p49Recibe')?.errors || {};
//   if (rec && !ning && !any410) {
//     this.f('p49Recibe')?.setErrors({ ...prev49, p410Group: true });
//   } else {
//     if ('p410Group' in prev49) delete prev49['p410Group'];
//     this.f('p49Recibe')?.setErrors(Object.keys(prev49).length ? prev49 : null);
//   }
//   this.f('p49Recibe')?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
// }

private logInvalids(): void {
  console.warn('--- FORM INVALID ---');
  Object.keys(this.ficha4Form.controls).forEach(k => {
    const c = this.f(k);
    if (c && c.invalid) {
      console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
    }
  });
  console.warn('Form errors (root):', this.ficha4Form.errors);
}


public guardarSeccion4(): void {
  this.guardarDatos('C');
}

public guardarSeccion4Incompleta(): void {
  this.guardarDatos('I');
}


private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {
  //  1. Activar visualización de errores
  this.showAllErrors = true;
  this.showGroupErrors = true;

  //  2. Actualizar validaciones
  this.ficha4Form.updateValueAndValidity({ emitEvent: false });

  //  3. Determinar estado destino basado en validez del formulario
  const formOk = this.ficha4Form.valid;
  const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && formOk) ? 'C' : 'I';

  //  4. Si pidió Completo pero está incompleto, avisar y esperar confirmación
  if (estadoSolicitado === 'C' && estadoDestino === 'I') {
    this.ficha4Form.markAllAsTouched();
    this.verificarCamposInvalidos();
    this.persistRequiredErrors();
    this.scrollToFirstError();
    
    // ESPERAR a que el usuario presione OK antes de continuar
    await Swal.fire({
      icon: 'warning',
      title: 'Faltan respuestas',
      text: 'Completa los campos obligatorios antes de guardar como COMPLETA. Se guardará como INCOMPLETA.',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false
    });
    //  NO hacer return - continuar después de que presione OK
  }

  //  5. Mostrar spinner de carga
  Swal.fire({
    title: 'Guardando...',
    text: 'Por favor espere',
    backdrop: `rgba(0,0,0,0.5)`,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  });

  //  6. Preparar payload con el estado determinado
  const seccionData = this.prepareSaveData(estadoDestino);
  console.debug('[S4] Guardando con estado:', estadoDestino, 'payload:', seccionData);

  try {
    //  7. Enviar al backend
    const respuesta = await lastValueFrom(
      this.ficha1Service.guardarFichaSeccion4(seccionData).pipe(takeUntil(this.destroy$))
    );

    Swal.close();

    //  8. Mensaje de éxito diferenciado
    const mensaje = estadoDestino === 'C'
      ? (respuesta.mensaje || 'Sección 4 guardada como COMPLETA.')
      : (respuesta.mensaje || 'Sección 4 guardada como INCOMPLETA.');

    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });

    //  9. Actualizar estado del formulario
    this.ficha4Form.patchValue({ estado_s4: estadoDestino }, { emitEvent: false });
    this.ficha4Form.markAsPristine();

    //  10. Limpiar errores solo si guardó exitosamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    //  11. Emitir eventos al componente padre
    this.onGuardar.emit();
    this.onEstadoActualizado.emit(seccionData.estado_s4);

  } catch (err) {
    Swal.close();
    console.error('[S4 guardar ERR]', err);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la Sección 4.',
      confirmButtonText: 'Entendido'
    });
  }
}

// private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
//   //this.enforceGroupRules();
//   this.ficha4Form.updateValueAndValidity({ emitEvent: false });

//   if (estado === 'C' && this.ficha4Form.invalid) {
//     this.ficha4Form.markAllAsTouched();
//     this.verificarCamposInvalidos();
//     this.showErrorsAndPersist(); //siempre visible
//     Swal.fire('Formulario Incompleto', 'Por favor, complete todos los campos requeridos.', 'warning');
//     return;
//   }

//   // Muestra loader
//   Swal.fire({
//     title: 'Guardando...',
//     text: 'Por favor espere',
//     backdrop: `rgba(0,0,0,0.5)`,
//     allowOutsideClick: false,
//     showConfirmButton: false,
//     willOpen: () => {
//       Swal.showLoading();
//     }
//   });

//   const seccionData = this.prepareSaveData(estado);

//   try {
//     const respuesta = await lastValueFrom(
//       this.ficha1Service.guardarFichaSeccion4(seccionData).pipe(takeUntil(this.destroy$))
//     );

//     Swal.fire({
//       icon: 'success',
//       title: respuesta.mensaje || (estado === 'C' ? 'Sección Guardada' : 'Guardado Parcialmente'),
//       showConfirmButton: true,
//     });

//     this.onGuardar.emit();
//     this.onEstadoActualizado.emit(seccionData.estado_s4);
//     this.ficha4Form.markAsPristine();

//   } catch (err) {
//     console.error('Error al guardar sección 4:', err);
//     Swal.fire('Error', 'No se pudo guardar la Sección 4.', 'error');
//   }
// }


public validarSeccion(): void {
  const estado = this.ficha4Form.get('estado_s4')?.value;
  const idFicha = this.idFicha;

  if (!idFicha) {
    Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
    return;
  }

  if (estado !== 'C') {
    Swal.fire({
      icon: 'warning',
      title: 'Validación no permitida',
      text: 'La sección 4 debe estar guardada como "Completa" para poder validarla.',
    });
    return;
  }

  const payload = { idFichas4: idFicha, valida_s4: '1' };

  this.ficha1Service.validarFichaSeccion4(payload)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.ficha4Form.get('valida_s4')?.setValue('1');
        this.seccionValidada.emit();
        Swal.fire({
          icon: 'success',
          title: 'Sección 4 Validada',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (err) => {
        console.error('Error al validar la sección 4:', err);
        Swal.fire('Error', 'No se pudo validar la sección 4.', 'error');
      }
    });
}


private populateForm(data: any): void {
    this.idFicha = data?.idFicha ?? this.idFicha;
  this.ficha4Form.patchValue(data, { emitEvent: false });

  //  Revalidar controles ocultos después de hidratar
  this.revalidateP410?.();
  this.f('p45Any')?.updateValueAndValidity({ emitEvent: false });
  this.f('p48Any')?.updateValueAndValidity({ emitEvent: false }); 

  // Si sigue inválido tras hidratar, lo hago visible
  this.ficha4Form.updateValueAndValidity({ emitEvent: false });
  if (this.ficha4Form.invalid) {
    this.showAllErrors = true;
    this.persistRequiredErrors();
    this.cdr.markForCheck();
  }


  }


  
private verificarCamposInvalidos(): void {
  console.warn('=== CAMPOS INVÁLIDOS ===');
  Object.keys(this.ficha4Form.controls).forEach(key => {
    const control = this.f(key);
    if (control && control.invalid) {
      console.warn(`❌ ${key}:`, {
        value: control.value,
        errors: control.errors,
        disabled: control.disabled
      });
    }
  });
  
  // Errores a nivel de formulario (como p45Group, p410Group)
  if (this.ficha4Form.errors) {
    console.warn('❌ Errores del formulario (root):', this.ficha4Form.errors);
  }
}

private prepareSaveData(estado: 'C' | 'I'): any {
  const rawValue = this.ficha4Form.getRawValue();
  const seccionData = this.transformarValoresCheckbox(rawValue);
  
  delete seccionData.p410Any;
  delete seccionData.p45Any;
  delete seccionData.p48Any; 


  seccionData.idFicha = this.idFicha || seccionData.idFicha;
  seccionData.estado_s4 = estado;

  console.log(
    '%c[prepareSaveData] - Objeto final listo para enviar al backend:',
    'color: green; font-weight: bold;',
    {
      payloadCompleto: seccionData,
      idFichaEnPayload: seccionData.idFicha,
      estado: estado
    }
  );

  return seccionData;
}




}
