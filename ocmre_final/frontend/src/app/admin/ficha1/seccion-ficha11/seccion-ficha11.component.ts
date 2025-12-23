import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, inject
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule }      from '@angular/material/radio';
import { MatButtonModule }     from '@angular/material/button';
import { MatInputModule }      from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule }   from '@angular/material/checkbox';
import { MatIconModule }       from '@angular/material/icon';
import { MatDividerModule }    from '@angular/material/divider';

import Swal from 'sweetalert2';

import { Ficha1Service } from '../ficha1.service';
//import { AuthService }   from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';
// (Opcionales si ya los usas en S5/S7/S9)
import { Max4DigitsDirective } from './max-4digits.directive';
import { NumericInputDirective } from './appNumericInput.directive';
import { Max3DigitsDirective } from './max-3digits.directive';
import { Max8DigitsDirective } from './max-8digits.directive';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;

@Component({
  selector: 'app-seccion-ficha11',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatDividerModule,Max3DigitsDirective,Max8DigitsDirective,
    // quita si no existen en tu proyecto
    Max4DigitsDirective, NumericInputDirective
  ],
  templateUrl: './seccion-ficha11.component.html',
  styleUrls: ['./seccion-ficha11.component.scss']
})
export class SeccionFicha11Component implements OnInit, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha11: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar           = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada     = new EventEmitter<void>();

  // ===== Estado local =====
  ficha11Form: FormGroup;
  idFicha: number | null = null;

  private destroy$ = new Subject<void>();
  private autosaveLanzado = false;

  // ===== Inyección =====
  private readonly fb           = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService  = inject(AuthService);

    roles: string[] = [];
    rolAdministrador: string = environment.rolAdministrador;
    rolComisionado: string = environment.rolComisionado;
    rolEspecialista: string = environment.rolEspecialista;
  // ===== Catálogos / matrices =====
  p114Rows = [
    { check: 'p114ALogistica',   gest: 'p114AGestiones',   suf: 'p114ASuficiente',   esp: 'p114AEspecifique' },
    { check: 'p114BInfra',       gest: 'p114BGestiones',   suf: 'p114BSuficiente',   esp: 'p114BEspecifique' },
    { check: 'p114CPersonal',    gest: 'p114CGestiones',   suf: 'p114CSuficiente',   esp: 'p114CEspecifique' },
    { check: 'p114DPresupuesto', gest: 'p114DGestiones',   suf: 'p114DSuficiente',   esp: 'p114DEspecifique' },
    { check: 'p114EOtro',        gest: 'p114EGestiones',   suf: 'p114ESuficiente',   esp: 'p114EEspecifique', otroDet: 'p114EOtroDetalle' },
  ];

  p116Instituciones = [
    'p116MRE','p116RENIEC','p116MIGRACIONES','p116INTERPOL','p116INEI',
    'p116JNE','p116ONPE','p116SUNARP','p116PoderJudicial','p116Otro'
  ];
  

  private requireAtLeastOneP113(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha11Form) return null;
    
    const keys = ['p113Actividades', 'p113Difusion', 'p113No', 'p113Otro'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha11Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

  private requireAtLeastOneP114(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha11Form) return null;
    
    const checkKeys = ['p114ALogistica', 'p114BInfra', 'p114CPersonal', 'p114DPresupuesto', 'p114EOtro'];
    const anyChecked = checkKeys.some(k => {
      const ctrl = this.ficha11Form.get(k);
      return ctrl?.value === 'S';
    });
    
    const ningunoS = this.ficha11Form.get('p114Ninguno')?.value === 'S';
    
    return (anyChecked || ningunoS) ? null : { requireOne: true };
  };
}

  constructor() {
    this.ficha11Form = this.fb.group({
      // Meta
      idFichas11: [null],
      idFicha:    [null],
      estado_s11: [''],
      valida_s11: [''],

      // ===== 11.1 =====
      p111Cantidad2016: [null, this.nonNegativeInt()],
      p111Cantidad2021: [null, this.nonNegativeInt()],

      // ===== 11.2 (ausentismo: números y porcentaje) =====
      // 2016
      p1122016Numero:      [null, this.nonNegativeInt()],
      p1122016Primera:     [null, this.nonNegativeInt()],
      p1122016Segunda:     [null, this.nonNegativeInt()],
      p1122016Porcentaje:  [null, this.percent0to100()],
      p1122016PrimeraPorc: [null, this.percent0to100()],
      p1122016SegundaPorc: [null, this.percent0to100()],
      // 2021
      p1122021Numero:      [null, this.nonNegativeInt()],
      p1122021Primera:     [null, this.nonNegativeInt()],
      p1122021Segunda:     [null, this.nonNegativeInt()],
      p1122021Porcentaje:  [null, this.percent0to100()],
      p1122021PrimeraPorc: [null, this.percent0to100()],
      p1122021SegundaPorc: [null, this.percent0to100()],

      // ===== 11.3 (medidas) =====
      p113Actividades:  [null as 'S' | null],
      p113Difusion:     [null as 'S' | null],
      p113No:           [null as 'S' | null],
      p113Otro:         [null as 'S' | null],
      p113OtroDetalle:  [{ value: '', disabled: true }],

      // ===== 11.4 (necesidades / matriz con ninguno) =====
      p114ALogistica:   [null as 'S' | null],
      p114AGestiones:   [{ value: null as SN, disabled: true }],
      p114ASuficiente:  [{ value: null as SN, disabled: true }],
      p114AEspecifique: [{ value: '', disabled: true }],

      p114BInfra:       [null as 'S' | null],
      p114BGestiones:   [{ value: null as SN, disabled: true }],
      p114BSuficiente:  [{ value: null as SN, disabled: true }],
      p114BEspecifique: [{ value: '', disabled: true }],

      p114CPersonal:    [null as 'S' | null],
      p114CGestiones:   [{ value: null as SN, disabled: true }],
      p114CSuficiente:  [{ value: null as SN, disabled: true }],
      p114CEspecifique: [{ value: '', disabled: true }],

      p114DPresupuesto: [null as 'S' | null],
      p114DGestiones:   [{ value: null as SN, disabled: true }],
      p114DSuficiente:  [{ value: null as SN, disabled: true }],
      p114DEspecifique: [{ value: '', disabled: true }],

      p114EOtro:        [null as 'S' | null],
      p114EGestiones:   [{ value: null as SN, disabled: true }],
      p114ESuficiente:  [{ value: null as SN, disabled: true }],
      p114EEspecifique: [{ value: '', disabled: true }],
      p114EOtroDetalle: [{ value: '', disabled: true }],

      p114Ninguno: [null as 'S' | null],

      // ===== 11.5 / 11.6 (capacitaciones + entidades) =====
      p115Recibe: [null as SN, Validators.required],
      p116MRE:             [null as 'S' | null],
      p116RENIEC:          [null as 'S' | null],
      p116MIGRACIONES:     [null as 'S' | null],
      p116INTERPOL:        [null as 'S' | null],
      p116INEI:            [null as 'S' | null],
      p116JNE:             [null as 'S' | null],
      p116ONPE:            [null as 'S' | null],
      p116SUNARP:          [null as 'S' | null],
      p116PoderJudicial:   [null as 'S' | null],
      p116Otro:            [null as 'S' | null],
      p116OtroDetalle:     [{ value: '', disabled: true }],
      p116Ninguna:         [null as 'S' | null],

      p113Any: [null, this.requireAtLeastOneP113()],

      p114Any: [null, this.requireAtLeastOneP114()],

    });
  }


    private ctrl(path: string): AbstractControl | null { return this.ficha11Form.get(path); }

   private readonly  actividades = ['p113Actividades', 'p113Difusion', 'p113No', 'p113Otro'];

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

get invalidCA113() {
  const any = this.anyChecked(this.actividades);
  const shouldShow =
    this.showAllErrors ||
    this.showGroupErrors ||
    this.isGroupTouched(this.actividades);

  return shouldShow && !any;
}

  // ===== Ciclo de vida =====
  ngOnInit(): void {
    // idFicha desde input
    this.idFicha = this.datosFicha11?.idFicha ?? null;
    if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });
    // Cargar datos si existen
    if (this.datosFicha11) this.populateForm(this.datosFicha11);


     if (this.datosFicha11) this.populateForm(this.datosFicha11);

      // Validar checkboxes
      //this.validateCheckboxes();

      // Llamar a otras funciones de configuración
      this.setup113Medidas();
      this.setup116Medidas();

    // 11.4 (matriz + ninguno)
    this.setupMatrix(this.p114Rows, 'p114Ninguno');
    // Gestiones -> Suficiente (radio dependiente) en 11.4
    this.bindYesEnables('p114AGestiones', 'p114ASuficiente', [Validators.required]);
    this.bindYesEnables('p114BGestiones', 'p114BSuficiente', [Validators.required]);
    this.bindYesEnables('p114CGestiones', 'p114CSuficiente', [Validators.required]);
    this.bindYesEnables('p114DGestiones', 'p114DSuficiente', [Validators.required]);
    this.bindYesEnables('p114EGestiones', 'p114ESuficiente', [Validators.required]);

    // 11.5 (radio) -> 11.6 (grupo checkboxes, requiere 1 si p115Recibe='S')
    this.bindYesRequiresAnyCheckboxSimple(
      'p115Recibe',
      this.p116Instituciones,
      'p116Group',
      'p116Ninguna',
      'p116Otro',
      'p116OtroDetalle'
    );

    // Autosave (opcional)
    if (this.activarAutosave && !this.autosaveLanzado) {
      this.autosaveSilencioso();
      this.autosaveLanzado = true;
    }

    this.initTotales112();

    this.f('p114Ninguno')?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.f('p114Any')?.updateValueAndValidity({ emitEvent: false });
    });

  }


  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== Helpers de acceso =====
  f(path: string) { return this.ficha11Form.get(path) as AbstractControl | null; }
   public showAllErrors = false; 

   public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }
  isChecked(name: string): boolean { return this.f(name)?.value === 'S'; }

onCheck(name: string, ev: any) {
  const c = this.f(name); 
  if (!c) return;
  
  const checked = !!ev?.checked;
  c.setValue(checked ? 'S' : null);
  c.markAsDirty();
  c.markAsTouched();
  
  // Revalida P11.4
  const p114Keys = ['p114ALogistica', 'p114BInfra', 'p114CPersonal', 'p114DPresupuesto', 'p114EOtro'];
  if (p114Keys.includes(name)) {
    this.f('p114Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // Revalida P11.3
  const p113Keys = ['p113Actividades', 'p113Difusion', 'p113No', 'p113Otro'];
  if (p113Keys.includes(name)) {
    this.f('p113Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

  /** Devuelve la longitud (número de caracteres) del control tipo texto (safe) */
  public charLen(controlName: string): number {
    const v = this.f(controlName)?.value;
    return typeof v === 'string' ? v.length : 0;
  }

isDisabled116(name: string): boolean {
  const c = this.f(name);
  const recibe = this.f('p115Recibe')?.value === 'S';
  const none = this.f('p116Ninguna')?.value === 'S';
  return !c || c.disabled || !recibe || none;
}

  public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }

  // ===== Poblar formulario =====
  private populateForm(d: any): void {
    this.idFicha = d?.idFicha ?? this.idFicha;
    this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    this.ficha11Form.patchValue({
      // Meta
      idFichas11: d.idFichas11 ?? null,
      idFicha:    d.idFicha ?? this.idFicha,
      estado_s11: d.estado_s11 ?? '',
      valida_s11: d.valida_s11 ?? '',

      // 11.1
      p111Cantidad2016: d.p111Cantidad2016 ?? null,
      p111Cantidad2021: d.p111Cantidad2021 ?? null,

      // 11.2 (2016)
      p1122016Numero:      d.p1122016Numero ?? null,
      p1122016Primera:     d.p1122016Primera ?? null,
      p1122016Segunda:     d.p1122016Segunda ?? null,
      p1122016Porcentaje:  d.p1122016Porcentaje ?? null,
      p1122016PrimeraPorc: d.p1122016PrimeraPorc ?? null,
      p1122016SegundaPorc: d.p1122016SegundaPorc ?? null,
      // 11.2 (2021)
      p1122021Numero:      d.p1122021Numero ?? null,
      p1122021Primera:     d.p1122021Primera ?? null,
      p1122021Segunda:     d.p1122021Segunda ?? null,
      p1122021Porcentaje:  d.p1122021Porcentaje ?? null,
      p1122021PrimeraPorc: d.p1122021PrimeraPorc ?? null,
      p1122021SegundaPorc: d.p1122021SegundaPorc ?? null,

      // 11.3
      p113Actividades: d.p113Actividades ?? null,
      p113Difusion:    d.p113Difusion ?? null,
      p113No:          d.p113No ?? null,
      p113Otro:        d.p113Otro ?? null,
      p113OtroDetalle: d.p113OtroDetalle ?? '',

      // 11.4
      p114ALogistica:   d.p114ALogistica ?? null,
      p114AGestiones:   d.p114AGestiones ?? null,
      p114ASuficiente:  d.p114ASuficiente ?? null,
      p114AEspecifique: d.p114AEspecifique ?? '',
      p114BInfra:       d.p114BInfra ?? null,
      p114BGestiones:   d.p114BGestiones ?? null,
      p114BSuficiente:  d.p114BSuficiente ?? null,
      p114BEspecifique: d.p114BEspecifique ?? '',
      p114CPersonal:    d.p114CPersonal ?? null,
      p114CGestiones:   d.p114CGestiones ?? null,
      p114CSuficiente:  d.p114CSuficiente ?? null,
      p114CEspecifique: d.p114CEspecifique ?? '',
      p114DPresupuesto: d.p114DPresupuesto ?? null,
      p114DGestiones:   d.p114DGestiones ?? null,
      p114DSuficiente:  d.p114DSuficiente ?? null,
      p114DEspecifique: d.p114DEspecifique ?? '',
      p114EOtro:        d.p114EOtro ?? null,
      p114EGestiones:   d.p114EGestiones ?? null,
      p114ESuficiente:  d.p114ESuficiente ?? null,
      p114EEspecifique: d.p114EEspecifique ?? '',
      p114EOtroDetalle: d.p114EOtroDetalle ?? '',
      p114Ninguno:      d.p114Ninguno ?? null,

      // 11.5 / 11.6
      p115Recibe:         d.p115Recibe ?? null,
      p116MRE:            d.p116MRE ?? null,
      p116RENIEC:         d.p116RENIEC ?? null,
      p116MIGRACIONES:    d.p116MIGRACIONES ?? null,
      p116INTERPOL:       d.p116INTERPOL ?? null,
      p116INEI:           d.p116INEI ?? null,
      p116JNE:            d.p116JNE ?? null,
      p116ONPE:           d.p116ONPE ?? null,
      p116SUNARP:         d.p116SUNARP ?? null,
      p116PoderJudicial:  d.p116PoderJudicial ?? null,
      p116Otro:           d.p116Otro ?? null,
      p116OtroDetalle:    d.p116OtroDetalle ?? '',
      p116Ninguna:        d.p116Ninguna ?? null,
    }, { emitEvent: false });

      this.f('p113Any')?.updateValueAndValidity({ emitEvent: false }); 

      this.f('p114Any')?.updateValueAndValidity({ emitEvent: false });


      if ((d?.estado_s11 ?? '') !== 'C') {
      this.showAllErrors = true;        // ⬅️ clave para persistir mensajes
      this.persistRequiredErrors();     // opcional pero recomendado
    }

    // Ajustes iniciales dependientes
    this.apply113Rules();

    this.p114Rows.forEach(r => {
      const on = this.f(r.check)?.value === 'S';
      on ? this.enableRow(r) : this.disableRow(r);
      if (r.otroDet) {
        const need = on;
        this.toggleCtrl(r.otroDet, need, false, need ? [Validators.required] : []);
      }
    });


    this.apply116Rules();

    this.ficha11Form.markAsPristine();
    console.debug('[S11] form poblado:', this.ficha11Form.getRawValue());
  }




  
permitirSoloNumerosMax4(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const tecla = event.key;
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (teclasPermitidas.includes(tecla)) {
      return;
    }
    const textoSeleccionado = input.selectionStart !== input.selectionEnd;
    if (valorActual.length >= 4 && !textoSeleccionado) {
      event.preventDefault();
      return;
    }
    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
    }
  }
  
  
  permitirSoloNumerosMax5(event: KeyboardEvent): void {
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
  
        private persistRequiredErrors(): void {
        const keys = Object.keys(this.ficha11Form.controls);
        keys.forEach(k => {
          const c = this.ficha11Form.get(k);
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



// private validateCheckboxes(): void {
//   // Validar si no se ha marcado ninguna opción de 11.3
//   const actividades = ['p113Actividades', 'p113Difusion', 'p113No', 'p113Otro'];
//   const allUnchecked = actividades.every(k => this.f(k)?.value === null);

//   // Si no se marca ninguna opción, mostrar mensaje y marcar como requerido
//   if (allUnchecked) {
//     this.f('p113Actividades')?.setErrors({ required: true });
//     this.f('p113Difusion')?.setErrors({ required: true });
//     this.f('p113No')?.setErrors({ required: true });
//     this.f('p113Otro')?.setErrors({ required: true });
//   } else {
//     // Si se marca alguna opción, limpiar el error
//     this.f('p113Actividades')?.setErrors(null);
//     this.f('p113Difusion')?.setErrors(null);
//     this.f('p113No')?.setErrors(null);
//     this.f('p113Otro')?.setErrors(null);
//   }
// }

private setup113Medidas(): void {
  // Habilita o deshabilita los controles dependiendo de las respuestas
  ['p113Actividades', 'p113Difusion', 'p113Otro'].forEach(k => {
    this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => this.apply113Rules());
  });

  this.f('p113Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
    const need = v === 'S';
    this.toggleCtrl('p113OtroDetalle', need, false, need ? [Validators.required] : []);
  });
  this.apply113Rules();
}

private apply113Rules(): void {
  const none = this.f('p113No')?.value === 'S';
  const others = ['p113Actividades', 'p113Difusion', 'p113Otro'];
  if (none) {
    others.forEach(k => this.disableSoft(this.f(k), true, true));
    this.disableSoft(this.f('p113OtroDetalle'), true, true);
  } else {
    others.forEach(k => this.f(k)?.enable({ emitEvent: false }));
    if (others.some(k => this.f(k)?.value === 'S')) {
      this.f('p113No')?.setValue(null, { emitEvent: false });
    }
  }
}

// Función para activar o desactivar los checkboxes
private toggleCtrl(name: string, enabled: boolean, _isNumber = false, validators: any[] = []) {
  const c = this.f(name); 
  if (!c) return;
  if (enabled) {
    c.enable({ emitEvent: false });
    c.setValidators(validators);
  } else {
    this.disableSoft(c, true, true);
  }
  c.updateValueAndValidity({ emitEvent: false });
}

   





   private setup116Medidas(): void {
    this.f('p116Ninguna')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(_ => this.apply116Rules());
    [   'p116MRE','p116RENIEC','p116MIGRACIONES','p116INTERPOL','p116INEI',
    'p116JNE','p116ONPE','p116SUNARP','p116PoderJudicial','p116Otro'].forEach(k => {
      this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(_ => this.apply116Rules());
    });

    this.f('p116Otro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      const need = v === 'S';
      this.toggleCtrl('p116OtroDetalle', need, false, need ? [Validators.required] : []);
    });
    this.apply116Rules();
    const otroInit = this.f('p116Otro')?.value === 'S';
    this.toggleCtrl('p116OtroDetalle', !!otroInit, false, otroInit ? [Validators.required] : []);

  }


    private apply116Rules(): void {
    const none = this.f('p116Ninguna')?.value === 'S';
    const others = ['p116MRE','p116RENIEC','p116MIGRACIONES','p116INTERPOL','p116INEI',
    'p116JNE','p116ONPE','p116SUNARP','p116PoderJudicial','p116Otro'];
    if (none) {
      others.forEach(k => this.disableSoft(this.f(k), true, true));
      this.disableSoft(this.f('p116OtroDetalle'), true, true);
    } else {
      others.forEach(k => this.f(k)?.enable({ emitEvent: false }));
      if (others.some(k => this.f(k)?.value === 'S')) {
        this.f('p116Ninguna')?.setValue(null, { emitEvent: false });
      }
    }
  }

  // ===== Skip-logic comunes =====
  private bindYesEnables(sourceKey: string, targetKey: string, validators: any[] = []) {
    const src = this.f(sourceKey), trg = this.f(targetKey);
    if (!src || !trg) return;
    const apply = (v: any) => {
      if (v === 'S') {
        trg.enable({ emitEvent: false });
        trg.setValidators(validators);
      } else {
        this.disableSoft(trg, true, true);
      }
      trg.updateValueAndValidity({ emitEvent: false });
    };
    apply(src.value);
    src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  private setupMatrix(rows: any[], noneKey: string) {
    // “Ninguno”
    this.f(noneKey)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      const isNone = v === 'S';
      rows.forEach(r => {
        const ck = this.f(r.check);
        if (!ck) return;
        if (isNone) {
          ck.setValue(null, { emitEvent: false });
          this.disableRow(r);
        }
      });
    });

    // Cada fila
    rows.forEach(r => {
      this.f(r.check)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
        const on = v === 'S';
        if (on) this.f(noneKey)?.setValue(null, { emitEvent: false });
        on ? this.enableRow(r) : this.disableRow(r);

        if (r.otroDet) {
          const need = v === 'S';
          this.toggleCtrl(r.otroDet, need, false, need ? [Validators.required] : []);
        }
      });

      // Estado inicial ya se ajustó en populateForm
    });
  }







  onNinguna116Change(ev: MatCheckboxChange) {
  this.onCheck('p116Ninguna', ev); // conserva tu forma de setear 'S'|null
  const checked = !!ev?.checked;

  const others = [
    'p116MRE','p116RENIEC','p116MIGRACIONES','p116INTERPOL','p116INEI',
    'p116JNE','p116ONPE','p116SUNARP','p116PoderJudicial','p116Otro'
  ];

  if (checked) {
    // Marcar "Ninguna" => limpiar y bloquear todo lo demás
    others.forEach(k => this.disableSoft(this.f(k), true, true));
    this.disableSoft(this.f('p116OtroDetalle'), true, true);
  } else {
    // Quitar "Ninguna" => re-habilitar el grupo (reglas finas las gestiona apply116Rules)
    others.forEach(k => this.f(k)?.enable({ emitEvent: false }));
    if (this.f('p116Otro')?.value === 'S') {
      const det = this.f('p116OtroDetalle');
      det?.enable({ emitEvent: false });
      det?.setValidators([Validators.required]);
      det?.updateValueAndValidity({ emitEvent: false });
    }
  }

  // Validación ancla: si "Ninguna" está activa, no exigir selección de instituciones
  const yesCtrl = this.f('p115Recibe');
  if (yesCtrl) {
    const curr = yesCtrl.errors || {};
    const { p116Group, ...rest } = curr as any;
    yesCtrl.setErrors(checked ? null : (Object.keys(rest).length ? rest : null), { emitEvent: false });
  }
}

  /** Requiere al menos un checkbox del grupo cuando yesKey === 'S'. */
      private bindYesRequiresAnyCheckboxSimple(
        yesKey: string,
        checkKeys: string[],
        anchorErrorKey: string,
        noneKey?: string,
        otroKey?: string,
        otroDetKey?: string
      ): void {
        const yesCtrl = this.f(yesKey);
        if (!yesCtrl) return;

        let busy = false;

        const apply = () => {
          if (busy) return; busy = true;
          const isYes = yesCtrl.value === 'S';

          if (!isYes) {
            // NO: limpiar + deshabilitar todo (incluye "Ninguna" y "Otro detalle")
            checkKeys.forEach(k => this.disableSoft(this.f(k), true, true));
            if (noneKey)    this.disableSoft(this.f(noneKey), true, true);
            if (otroDetKey) this.disableSoft(this.f(otroDetKey), true, true);

            // quitar error ancla si lo hubiera
            const errs = yesCtrl.errors || {};
            if (anchorErrorKey in (errs || {})) {
              const { [anchorErrorKey]: _, ...rest } = errs as any;
              yesCtrl.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
            }
            busy = false; 
            return;
          }

          // SÍ: habilitar grupo (ya NO deshabilitamos "Ninguna")
          checkKeys.forEach(k => this.f(k)?.enable({ emitEvent: false }));
          if (noneKey) this.f(noneKey)?.enable({ emitEvent: false });

          const isNone = !!noneKey && this.f(noneKey!)?.value === 'S';

          // Si "Ninguna" está marcada, limpiar/bloquear el resto
          if (isNone) {
            checkKeys.forEach(k => this.disableSoft(this.f(k), true, true));
            if (otroDetKey) this.disableSoft(this.f(otroDetKey), true, true);
          } else {
            // Manejo de "Otro (detalle)" condicionado
            if (otroKey && otroDetKey) {
              const otroMarcado = this.f(otroKey)?.value === 'S';
              if (otroMarcado) {
                const det = this.f(otroDetKey);
                det?.enable({ emitEvent: false });
                det?.setValidators([Validators.required]);
                det?.updateValueAndValidity({ emitEvent: false });
              } else {
                this.disableSoft(this.f(otroDetKey), true, true);
              }
            }
          }

          // Validación: al menos uno marcado o "Ninguna" marcada
          const anyInstitution = checkKeys.some(k => this.f(k)?.value === 'S');
          const noneSelected   = !!noneKey && this.f(noneKey!)?.value === 'S';
          const ok = anyInstitution || noneSelected;

          const curr = yesCtrl.errors || {};
          if (!ok) {
            yesCtrl.setErrors({ ...curr, [anchorErrorKey]: true }, { emitEvent: false });
            yesCtrl.markAsTouched();
          } else {
            const { [anchorErrorKey]: _, ...rest } = curr as any;
            yesCtrl.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
          }

          busy = false;
        };

        // Estado inicial + suscripciones
        apply();
        yesCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
        checkKeys.forEach(k => this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(apply));
        if (noneKey) this.f(noneKey)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(apply);
        if (otroKey) this.f(otroKey)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(apply);
      }

  private enableRow(r: { gest: string; suf: string; esp: string }) {
    [r.gest, r.suf].forEach(k => {
      const c = this.f(k);
      c?.enable({ emitEvent: false });
      c?.setValidators([Validators.required]);
      c?.updateValueAndValidity({ emitEvent: false });
    });
    const esp = this.f(r.esp);
    esp?.enable({ emitEvent: false });
    esp?.clearValidators();
    esp?.updateValueAndValidity({ emitEvent: false });
  }

  private disableRow(r: { gest: string; suf: string; esp: string; otroDet?: string }) {
    [r.gest, r.suf].forEach(k => this.disableSoft(this.f(k), true, true));
    this.disableSoft(this.f(r.esp), true, true);
    if (r.otroDet) this.disableSoft(this.f(r.otroDet), true, true);
  }

  // private toggleCtrl(name: string, enabled: boolean, _isNumber = false, validators: any[] = []) {
  //   const c = this.f(name); if (!c) return;
  //   if (enabled) {
  //     c.enable({ emitEvent: false });
  //     c.setValidators(validators);
  //   } else {
  //     this.disableSoft(c, true, true);
  //   }
  //   c.updateValueAndValidity({ emitEvent: false });
  // }

  // ===== Guardar / Validar =====
  public guardarSeccion11(): void { this.guardarDatos('C'); }
  public guardarSeccion11Incompleta(): void { this.guardarDatos('I'); }

  private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  this.ficha11Form.updateValueAndValidity({ emitEvent: false });
  
  //  VALIDACIÓN: SI ESTABA COMPLETA (C) PERO AHORA ES INVÁLIDA → CAMBIAR A INCOMPLETA (I)
  const estadoActual = this.f('estado_s11')?.value;
  
  if (estadoActual === 'C' && this.ficha11Form.invalid) {
    console.warn('⚠️ [S11] Cambio de estado: C → I (campos requeridos sin completar)');
    
    estado = 'I'; // Forzar a Incompleta
    
    await Swal.fire({
      icon: 'warning',
      title: 'Sección cambiada a Incompleta',
      html: 'La sección tenía estado <strong>"Completa"</strong> pero ahora tiene campos requeridos sin completar.<br><br>Se guardará como <strong>"Incompleta"</strong>.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f39c12'
    });
  }
  
  //  VALIDACIÓN NORMAL: SI SE INTENTA GUARDAR COMO COMPLETA PERO ES INVÁLIDA
  if (estado === 'C' && this.ficha11Form.invalid) {
    this.ficha11Form.markAllAsTouched();
    this.showAllErrors = true;
    this.showGroupErrors = true;
    this.logInvalids();
    
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Incompleto',
      text: 'Completa los campos requeridos antes de guardar como "Completa".',
      confirmButtonText: 'Revisar',
      confirmButtonColor: '#e74c3c'
    });
    return;
  }

  const payload = this.prepareSaveData(estado);
  
  Swal.fire({ 
    title: 'Guardando...', 
    allowOutsideClick: false, 
    didOpen: () => Swal.showLoading() 
  });
  
  try {
    const resp = await lastValueFrom(
      this.fichaService.guardarFichaSeccion11(payload).pipe(takeUntil(this.destroy$))
    );
    
    Swal.close();
    
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: resp?.mensaje || 'Sección 11 guardada correctamente',
      timer: 2000,
      showConfirmButton: false
    });

    // ✅ Actualizar estado en el formulario
    this.ficha11Form.patchValue({ estado_s11: estado }, { emitEvent: false });
    this.ficha11Form.markAsPristine();
    
    // ✅ Solo limpiar flags si se guardó correctamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estado); // ✅ Emitir el estado correcto

    localStorage.setItem('pantbc_s11', JSON.stringify(payload));
    
  } catch (e: any) {
    Swal.close();
    console.error('[S11 guardar ERR]', e?.status, e?.message, e?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la sección 11.',
      confirmButtonColor: '#e74c3c'
    });
  }
}



private logInvalids(): void {
  console.warn('--- S11 INVÁLIDO ---');
  Object.keys(this.ficha11Form.controls).forEach(k => {
    const c = this.ficha11Form.get(k);
    if (c && c.invalid) {
      console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
    }
  });
  console.warn('Form errors (root):', this.ficha11Form.errors);
}

// AGREGAR ESTE MÉTODO NUEVO PARA DEBUGGING
/**
 * Método de debugging para verificar estado de validación 11.6
 */
public debugP116Validation(): void {
  console.log('🔍 [S11] Estado de validación 11.6:');
  
  const p115Recibe = this.f('p115Recibe');
  console.log('   p115Recibe:', {
    value: p115Recibe?.value,
    valid: p115Recibe?.valid,
    errors: p115Recibe?.errors,
    disabled: p115Recibe?.disabled
  });
  
  const instituciones = [
    'p116MRE', 'p116RENIEC', 'p116MIGRACIONES', 'p116INTERPOL', 'p116INEI',
    'p116JNE', 'p116ONPE', 'p116SUNARP', 'p116PoderJudicial', 'p116Otro', 'p116Ninguna'
  ];
  
  console.log('   Instituciones marcadas:');
  instituciones.forEach(k => {
    const control = this.f(k);
    if (control?.value === 'S') {
      console.log(`      ✅ ${k}: ${control.value}`);
    }
  });
  
  const anyMarcado = instituciones.some(k => this.f(k)?.value === 'S');
  console.log(`   ¿Al menos una marcada?: ${anyMarcado}`);
  
  console.log('   Estado formulario completo:');
  console.log('      valid:', this.ficha11Form.valid);
  console.log('      invalid:', this.ficha11Form.invalid);
}
  // private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  //   this.ficha11Form.updateValueAndValidity({ emitEvent: false });
  //   if (estado === 'C' && this.ficha11Form.invalid) {
  //     this.ficha11Form.markAllAsTouched();
  //      this.showAllErrors = true;
  //   this.showGroupErrors = true;

  //     this.logInvalids();
  //     Swal.fire('Formulario Incompleto', 'Completa los campos requeridos.', 'warning');
  //     return;
  //   }

  //   const payload = this.prepareSaveData(estado);
  //   Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //   try {
  //     const resp = await lastValueFrom(
  //       this.fichaService.guardarFichaSeccion11(payload).pipe(takeUntil(this.destroy$))
  //     );
  //     Swal.close();
  //     Swal.fire('Listo', resp?.mensaje || 'Sección 11 guardada', 'success');

  //       this.showAllErrors = false;
  //       this.showGroupErrors = false;
  //     this.ficha11Form.patchValue({ estado_s11: estado }, { emitEvent: false });
  //     this.ficha11Form.markAsPristine();


  //     this.onGuardar.emit();
  //     this.onEstadoActualizado.emit(payload.estado_s11);

  //     localStorage.setItem('pantbc_s11', JSON.stringify(payload));
  //   } catch (e: any) {
  //     Swal.close();
  //     console.error('[S11 guardar ERR]', e?.status, e?.message, e?.error);
  //     Swal.fire('Error', 'No se pudo guardar la sección 11.', 'error');
  //   }
  // }

  public validarSeccion(): void {
    const estado = this.f('estado_s11')?.value;
    const idFichas11 = this.f('idFichas11')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas11, valida_s11: '1' };
    this.fichaService.validarFichaSeccion11(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s11')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 11 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S11:', err);
        Swal.fire('Error', 'No se pudo validar la sección 11.', 'error');
      }
    });
  }

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha11Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha11Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha11Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion11(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S11 autosave OK]', { estado }),
      error: (err) => console.error('[S11 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }

  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha11Form.getRawValue();
     delete raw.p113Any;
     delete raw.p114Any
    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s11 = estado;
    return raw;
  }

  // ===== Validadores =====
  private nonNegativeInt() {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 ? null : { nonNegativeInt: true };
    };
  }
  private percent0to100() {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 && n <= 100 ? null : { percent: true };
    };
  }

  // ===== Util =====
  private disableSoft(ctrl: AbstractControl | null, clearValidators = true, clearValue = true) {
    if (!ctrl) return;
    if (clearValidators) ctrl.clearValidators();
    if (clearValue) ctrl.setValue(null, { emitEvent: false });
    ctrl.disable({ emitEvent: false });
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  // private logInvalids(): void {
  //   console.warn('--- S11 INVÁLIDO ---');
  //   Object.keys(this.ficha11Form.controls).forEach(k => {
  //     const c = this.ficha11Form.get(k);
  //     if (c && c.invalid) {
  //       console.warn(` ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
  //     }
  //   });
  //   console.warn('Form errors (root):', this.ficha11Form.errors);
  // }


  ////////////////////

  // ===== Helpers de totales 11.2 =====
private toInt(v: any): number | null {
  if (v === null || v === '' || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

private setIfChanged(ctrlName: string, value: number | null) {
  const c = this.f(ctrlName);
  if (!c) return;
  const curr = c.value ?? null;
  if (curr !== value) c.setValue(value, { emitEvent: false });
}

/** Suma números: Primera + Segunda -> Total */
private sumRowNumbers(aKey: string, bKey: string, totalKey: string) {
  const a = this.toInt(this.f(aKey)?.value);
  const b = this.toInt(this.f(bKey)?.value);
  if (a === null && b === null) {
    this.setIfChanged(totalKey, null);
    return;
  }
  const total = (a ?? 0) + (b ?? 0);
  this.setIfChanged(totalKey, total);
}

/** Suma porcentajes: Primera(%) + Segunda(%) -> Total(%) */
private sumRowPercentages(aKey: string, bKey: string, totalKey: string, clamp100 = false) {
  const a = this.toInt(this.f(aKey)?.value);
  const b = this.toInt(this.f(bKey)?.value);
  if (a === null && b === null) {
    this.setIfChanged(totalKey, null);
    return;
  }
  let total = (a ?? 0) + (b ?? 0);
  if (clamp100) total = Math.max(0, Math.min(100, total)); // opcional: limitar 0–100
  this.setIfChanged(totalKey, total);
}

/** Calcula ambas sumas para una fila (2016 o 2021) */
private calcTotalesFila(year: 2016 | 2021, clampPercent = false) {
  // Números
  this.sumRowNumbers(
    `p112${year}Primera`,
    `p112${year}Segunda`,
    `p112${year}Numero`
  );
  // Porcentaje
  this.sumRowPercentages(
    `p112${year}PrimeraPorc`,
    `p112${year}SegundaPorc`,
    `p112${year}Porcentaje`,
    clampPercent
  );
}

/** Suscribe cambios para recalcular automáticamente los totales */
private bindTotales112() {
  ([2016, 2021] as const).forEach(year => {
    // Recalcular cuando cambien “Primera” o “Segunda” (números)
    this.f(`p112${year}Primera`)?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calcTotalesFila(year));
    this.f(`p112${year}Segunda`)?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calcTotalesFila(year));

    // Recalcular cuando cambien “Primera(%)” o “Segunda(%)”
    this.f(`p112${year}PrimeraPorc`)?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calcTotalesFila(year, /* clampPercent */ false));
    this.f(`p112${year}SegundaPorc`)?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calcTotalesFila(year, /* clampPercent */ false));
  });
}

/** Llamar una vez al iniciar (y opcionalmente tras cargar datos) */
private initTotales112() {
  this.bindTotales112();
  // cálculo inicial (por si ya vienen valores del backend)
  this.calcTotalesFila(2016);
  this.calcTotalesFila(2021);
}

////////////////////////////////////////////////////////////////////////////////////


  limitarDigitosTextarea(event: any, maxLength: number = 500): void {
    const input = event.target;
    const valor = input.value; 
    if (valor.length > maxLength) {
      input.value = valor.slice(0, maxLength); 
    }
  }

// GETTER PARA VALIDACION DE GRUPO

get showP113GroupError(): boolean {
  const anyCtrl = this.f('p113Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get showP114GroupError(): boolean {
  const anyCtrl = this.f('p114Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}
}
