import { 
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, inject, ChangeDetectorRef 
} from '@angular/core';
import { 
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import Swal from 'sweetalert2';

import { Ficha1Service } from '../ficha1.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Max4DigitsDirective } from './max-4digits.directive';
import { NumericInputDirective } from './appNumericInput.directive';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;


@Component({
  selector: 'app-seccion-ficha10',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatDividerModule,
    Max4DigitsDirective, NumericInputDirective
  ],
  templateUrl: './seccion-ficha10.component.html',
  styleUrls: ['./seccion-ficha10.component.scss']
})
export class SeccionFicha10Component implements OnInit, OnDestroy {

  @Input() datosFicha10: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  ficha10Form: FormGroup;
  idFicha: number | null = null;

  private destroy$ = new Subject<void>();
  private autosaveLanzado = false;

  private readonly fb = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  roles: string[] = [];
  rolAdministrador: string = environment.rolAdministrador;
  rolComisionado: string = environment.rolComisionado;
  rolEspecialista: string = environment.rolEspecialista;

  p106Rows = [
    { check: 'p106ALogistica', gest: 'p106AGestiones', suf: 'p106ASuficiente', esp: 'p106AEspecifique' },
    { check: 'p106BInfra', gest: 'p106BGestiones', suf: 'p106BSuficiente', esp: 'p106BEspecifique' },
    { check: 'p106CPersonal', gest: 'p106CGestiones', suf: 'p106CSuficiente', esp: 'p106CEspecifique' },
    { check: 'p106DPresupuesto', gest: 'p106DGestiones', suf: 'p106DSuficiente', esp: 'p106DEspecifique' },
    { check: 'p106EOtro', gest: 'p106EGestiones', suf: 'p106ESuficiente', esp: 'p106EEspecifique', otroDet: 'p106EOtroDetalle' },
  ];

  p108Instituciones: string[] = [
    'p108Mre', 'p108Reniec', 'p108Migraciones', 'p108Interpol', 'p108Inei',
    'p108Jne', 'p108Onpe', 'p108Sunarp', 'p108PoderJudicial', 'p108Otro'
  ];

  p104Actividades: string[] = [
    'p104Registro', 'p104Civil', 'p104Dni', 'p104Pasaporte', 'p104Legal',
    'p104Autorizacion', 'p104Certificado', 'p104Penales', 'p104Policial', 'p104Otro'
  ];

  pretty104(k: string): string {
    const map: Record<string, string> = {
      p104Registro: 'Registro de nacionales',
      p104Civil: 'Registro civil',
      p104Dni: 'DNI',
      p104Pasaporte: 'Pasaportes',
      p104Legal: 'Legalizaciones',
      p104Autorizacion: 'Autorización de viaje de menor de edad',
      p104Certificado: 'Certificado de supervivencia',
      p104Penales: 'Antecedentes penales',
      p104Policial: 'Antecedentes policiales',
      p104Otro: 'Otro(s)'
    };
    return map[k] ?? k;
  }

  private label108: Record<string, string> = {
    p108Mre: 'MRE',
    p108Reniec: 'RENIEC',
    p108Migraciones: 'Migraciones',
    p108Interpol: 'INTERPOL',
    p108Inei: 'INEI',
    p108Jne: 'JNE',
    p108Onpe: 'ONPE',
    p108Sunarp: 'SUNARP',
    p108PoderJudicial: 'Poder Judicial',
  };

  private readonly LABELS: Record<string, string> = {
    p106ALogistica: 'Logística',
    p106BInfra: 'Infraestructura',
    p106CPersonal: 'Personal',
    p106DPresupuesto: 'Presupuesto',
    p106EOtro: 'Otro',
  };

  public pretty(key: string): string {
    return this.LABELS[key] ?? key;
  }


//   private requireAtLeastOneP106(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     if (!this.ficha10Form) return null;
    
//     const keys = ['p106ALogistica', 'p106BInfra', 'p106CPersonal', 'p106DPresupuesto', 'p106EOtro', 'p106Ninguno'];
//     const atLeastOne = keys.some(k => {
//       const ctrl = this.ficha10Form.get(k);
//       return ctrl?.value === 'S';
//     });
    
//     return atLeastOne ? null : { requireOne: true };
//   };
// }

private requireAtLeastOneP106(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha10Form) return null;
    
    const keys = ['p106ALogistica', 'p106BInfra', 'p106CPersonal', 'p106DPresupuesto', 'p106EOtro', 'p106Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha10Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

/**
 * Validador para 10.4: Al menos una actividad debe estar marcada
 */
private requireAtLeastOneP104(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha10Form) return null;
    
    // Verificar que al menos una actividad esté marcada
    const atLeastOne = this.p104Actividades.some(k => {
      const ctrl = this.ficha10Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}



  constructor() {
    this.ficha10Form = this.fb.group({
      idFichas10: [null],
      idFicha: [null],
      estado_s10: [''],
      valida_s10: [''],

      p101Realizo: [null as SN, Validators.required],
      p101Afirmativa: [{ value: null, disabled: true }, [this.nonNegativeInt(), Validators.max(9999)]],
      p102Realizo: [null as SN, Validators.required],
      p102Afirmativa: [{ value: null, disabled: true }, [this.nonNegativeInt(), Validators.max(9999)]],
      p103Realizo: [null as SN, Validators.required],
      p103Afirmativa: [{ value: null, disabled: true }, [this.nonNegativeInt(), Validators.max(9999)]],

      p104Any: [null, this.requireAtLeastOneP104()],

      p104Registro: [null as 'S' | null],
      p104Civil: [null as 'S' | null],
      p104Dni: [null as 'S' | null],
      p104Pasaporte: [null as 'S' | null],
      p104Legal: [null as 'S' | null],
      p104Autorizacion: [null as 'S' | null],
      p104Certificado: [null as 'S' | null],
      p104Penales: [null as 'S' | null],
      p104Policial: [null as 'S' | null],
      p104Otro: [null as 'S' | null],
      p104OtroDetalle: [{ value: '', disabled: true }],
      p104Ninguno: [null],

      p105Personas2023: [{ value: '', disabled: true }],
      p105Personas2024: [{ value: '', disabled: true }],
      p105Personas2025: [{ value: '', disabled: true }],

      p106ALogistica: [null as 'S' | null],
      p106AGestiones: [{ value: null as SN, disabled: true }],
      p106ASuficiente: [{ value: null as SN, disabled: true }],
      p106AEspecifique: [{ value: '', disabled: true }],

      p106BInfra: [null as 'S' | null],
      p106BGestiones: [{ value: null as SN, disabled: true }],
      p106BSuficiente: [{ value: null as SN, disabled: true }],
      p106BEspecifique: [{ value: '', disabled: true }],

      p106CPersonal: [null as 'S' | null],
      p106CGestiones: [{ value: null as SN, disabled: true }],
      p106CSuficiente: [{ value: null as SN, disabled: true }],
      p106CEspecifique: [{ value: '', disabled: true }],

      p106DPresupuesto: [null as 'S' | null],
      p106DGestiones: [{ value: null as SN, disabled: true }],
      p106DSuficiente: [{ value: null as SN, disabled: true }],
      p106DEspecifique: [{ value: '', disabled: true }],

      p106EOtro: [null as 'S' | null],
      p106EGestiones: [{ value: null as SN, disabled: true }],
      p106ESuficiente: [{ value: null as SN, disabled: true }],
      p106EEspecifique: [{ value: '', disabled: true }],
      p106EOtroDetalle: [{ value: '', disabled: true }],

      p106Ninguno: [null as 'S' | null],

      p107Recibe: [null as SN, Validators.required],
      p108Mre: [null as 'S' | null],
      p108Reniec: [null as 'S' | null],
      p108Migraciones: [null as 'S' | null],
      p108Interpol: [null as 'S' | null],
      p108Inei: [null as 'S' | null],
      p108Jne: [null as 'S' | null],
      p108Onpe: [null as 'S' | null],
      p108Sunarp: [null as 'S' | null],
      p108PoderJudicial: [null as 'S' | null],
      p108Otro: [null as 'S' | null],
      p108OtroDetalle: [{ value: '', disabled: true }],
      p108Ninguno: [null as 'S' | null],
      p106Any: [null, this.requireAtLeastOneP106()],

    });
  }

   ngOnInit(): void {
  this.idFicha = this.datosFicha10?.idFicha ?? null;
  if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

  if (this.datosFicha10) this.populateForm(this.datosFicha10);

  // Configuración para 10.1, 10.2, 10.3
  this.bindYesEnables('p101Realizo', 'p101Afirmativa', [this.nonNegativeInt(), Validators.max(9999)]);
  this.bindYesEnables('p102Realizo', 'p102Afirmativa', [this.nonNegativeInt(), Validators.max(9999)]);
  this.bindYesEnables('p103Realizo', 'p103Afirmativa', [this.nonNegativeInt(), Validators.max(9999)]);

  this.bindYesEnables('p101Realizo', 'p105Personas2023', [this.nonNegativeInt(), Validators.max(9999)]);
  this.bindYesEnables('p102Realizo', 'p105Personas2024', [this.nonNegativeInt(), Validators.max(9999)]);
  this.bindYesEnables('p103Realizo', 'p105Personas2025', [this.nonNegativeInt(), Validators.max(9999)]);

  // Limpieza de los checkboxes de 10.4 cuando las respuestas son NO en 10.1, 10.2 y 10.3
  this.checkAndClearCheckboxes();
  // Lógica para "Otro" detalle 10.4
  this.setupP104OtroDetalle();

  // Configurar la matriz de necesidades
  this.setupMatrix(this.p106Rows, 'p106Ninguno');
  this.bindYesEnables('p106AGestiones', 'p106ASuficiente', [Validators.required]);
  this.bindYesEnables('p106BGestiones', 'p106BSuficiente', [Validators.required]);
  this.bindYesEnables('p106CGestiones', 'p106CSuficiente', [Validators.required]);
  this.bindYesEnables('p106DGestiones', 'p106DSuficiente', [Validators.required]);
  this.bindYesEnables('p106EGestiones', 'p106ESuficiente', [Validators.required]);

  // Configuración para 10.7/10.8
  this.setup107To108();

  if (this.activarAutosave && !this.autosaveLanzado) {
    this.autosaveSilencioso();
    this.autosaveLanzado = true;
  }
}

private enableCheckboxes10_4(): void {
  // Habilitar todos los checkboxes de 10.4
  const actividades = this.p104Actividades;
  actividades.forEach((actividad) => {
    this.f(actividad)?.enable({ emitEvent: false }); // Habilita el checkbox
  });
  // Habilitar "Otro" detalle en 10.4
  this.f('p104OtroDetalle')?.enable({ emitEvent: false });
}
/**
 * Lógica para limpiar el grupo de checkboxes de 10.4 si todas las respuestas en 10.1, 10.2 y 10.3 son "NO"
 */
private checkAndClearCheckboxes(): void {
  // Verifica si alguna de las tres respuestas es "Sí"
  const p101RealizoValue = this.f('p101Realizo')?.value;
  const p102RealizoValue = this.f('p102Realizo')?.value;
  const p103RealizoValue = this.f('p103Realizo')?.value;

  // Si alguna es "Sí", habilitamos los checkboxes de 10.4
  if (p101RealizoValue === 'S' || p102RealizoValue === 'S' || p103RealizoValue === 'S') {
    this.enableCheckboxes10_4();  // Habilita el grupo de checkboxes
  } else {
    this.clearAndDisableCheckboxes10_4();  // Si todas son "NO", limpiamos y deshabilitamos
  }

  // Escuchar cambios en las respuestas de 10.1, 10.2 y 10.3
  this.f('p101Realizo')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.checkAndClearCheckboxes());
  this.f('p102Realizo')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.checkAndClearCheckboxes());
  this.f('p103Realizo')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.checkAndClearCheckboxes());
}

/**
 * Limpia y deshabilita los checkboxes de 10.4
 */
private clearAndDisableCheckboxes10_4(): void {
  // Limpiar y deshabilitar todos los checkboxes relacionados con 10.4
  const actividades = this.p104Actividades;
  actividades.forEach((actividad) => {
    this.f(actividad)?.setValue(null, { emitEvent: false }); // Limpia el valor
    this.disableSoft(this.f(actividad), true, true); // Deshabilita el campo
  });
  // Limpiar y deshabilitar "Otro" detalle en 10.4
  this.f('p104OtroDetalle')?.setValue('', { emitEvent: false });
  this.disableSoft(this.f('p104OtroDetalle'), true, true);
}
 

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

private setupP104OtroDetalle(): void {
  const otroCtrl = this.f('p104Otro');
  if (!otroCtrl) return;

  // Estado inicial
  if (otroCtrl.value === 'S') {
    const det = this.f('p104OtroDetalle');
    det?.enable({ emitEvent: false });
    det?.setValidators([Validators.required]);
    det?.updateValueAndValidity({ emitEvent: false });
  }

  // Al cambiar, habilita/deshabilita solo el detalle
  otroCtrl.valueChanges
    .pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    )
    .subscribe(v => {
      const det = this.f('p104OtroDetalle');
      if (!det) return;

      if (v === 'S') {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.required]);
      } else {
        det.disable({ emitEvent: false });
        det.setValue('', { emitEvent: false });
        det.clearValidators();
      }
      det.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    });
}
  
  private setup107To108(): void {
    const yesCtrl = this.f('p107Recibe');
    if (!yesCtrl) return;

    const apply = () => {
      const isYes = yesCtrl.value === 'S';

      if (!isYes) {
        const errs = yesCtrl.errors || {};
        const { p108Group, ...rest } = errs as any;
        yesCtrl.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
        return;
      }

      const anyInstitution = this.p108Instituciones.some(k => this.f(k)?.value === 'S');
      const noneSelected = this.f('p108Ninguno')?.value === 'S';
      const ok = anyInstitution || noneSelected;

      const curr = yesCtrl.errors || {};
      if (!ok) {
        yesCtrl.setErrors({ ...curr, p108Group: true }, { emitEvent: false });
        yesCtrl.markAsTouched();
      } else {
        const { p108Group: _, ...rest } = curr as any;
        yesCtrl.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
      }

      this.cdr.markForCheck();
    };

    apply();
    yesCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);

    this.p108Instituciones.forEach(k => {
      this.f(k)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
    });
    this.f('p108Ninguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  // ===== Populate =====
 private populateForm(d: any): void {
    this.idFicha = d?.idFicha ?? this.idFicha;
    this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    this.ficha10Form.patchValue({
      idFichas10: d.idFichas10 ?? null,
      idFicha: d.idFicha ?? this.idFicha,
      estado_s10: d.estado_s10 ?? '',
      valida_s10: d.valida_s10 ?? '',

      p101Realizo: d.p101Realizo ?? null,
      p101Afirmativa: d.p101Afirmativa ?? null,
      p102Realizo: d.p102Realizo ?? null,
      p102Afirmativa: d.p102Afirmativa ?? null,
      p103Realizo: d.p103Realizo ?? null,
      p103Afirmativa: d.p103Afirmativa ?? null,

      p104Registro: d.p104Registro ?? null,
      p104Civil: d.p104Civil ?? null,
      p104Dni: d.p104Dni ?? null,
      p104Pasaporte: d.p104Pasaporte ?? null,
      p104Legal: d.p104Legal ?? null,
      p104Autorizacion: d.p104Autorizacion ?? null,
      p104Certificado: d.p104Certificado ?? null,
      p104Penales: d.p104Penales ?? null,
      p104Policial: d.p104Policial ?? null,
      p104Otro: d.p104Otro ?? null,
      p104OtroDetalle: d.p104OtroDetalle ?? '',

      p105Personas2023: d.p105Personas2023 ?? null,
      p105Personas2024: d.p105Personas2024 ?? null,
      p105Personas2025: d.p105Personas2025 ?? null,

      p106ALogistica: d.p106ALogistica ?? null,
      p106AGestiones: d.p106AGestiones ?? null,
      p106ASuficiente: d.p106ASuficiente ?? null,
      p106AEspecifique: d.p106AEspecifique ?? '',
      p106BInfra: d.p106BInfra ?? null,
      p106BGestiones: d.p106BGestiones ?? null,
      p106BSuficiente: d.p106BSuficiente ?? null,
      p106BEspecifique: d.p106BEspecifique ?? '',
      p106CPersonal: d.p106CPersonal ?? null,
      p106CGestiones: d.p106CGestiones ?? null,
      p106CSuficiente: d.p106CSuficiente ?? null,
      p106CEspecifique: d.p106CEspecifique ?? '',
      p106DPresupuesto: d.p106DPresupuesto ?? null,
      p106DGestiones: d.p106DGestiones ?? null,
      p106DSuficiente: d.p106DSuficiente ?? null,
      p106DEspecifique: d.p106DEspecifique ?? '',
      p106EOtro: d.p106EOtro ?? null,
      p106EGestiones: d.p106EGestiones ?? null,
      p106ESuficiente: d.p106ESuficiente ?? null,
      p106EEspecifique: d.p106EEspecifique ?? '',
      p106EOtroDetalle: d.p106EOtroDetalle ?? '',
      p106Ninguno: d.p106Ninguno ?? null,

      p107Recibe: d.p107Recibe ?? null,
      p108Mre: d.p108Mre ?? null,
      p108Reniec: d.p108Reniec ?? null,
      p108Migraciones: d.p108Migraciones ?? null,
      p108Interpol: d.p108Interpol ?? null,
      p108Inei: d.p108Inei ?? null,
      p108Jne: d.p108Jne ?? null,
      p108Onpe: d.p108Onpe ?? null,
      p108Sunarp: d.p108Sunarp ?? null,
      p108PoderJudicial: d.p108PoderJudicial ?? null,
      p108Ninguno: d.p108Ninguno ?? null,
      p108Otro: d.p108Otro ?? null,
      p108OtroDetalle: d.p108OtroDetalle ?? '',
    }, { emitEvent: false });


  this.f('p104Any')?.updateValueAndValidity({ emitEvent: false });
      this.f('p106Any')?.updateValueAndValidity({ emitEvent: false });


    if ((d?.estado_s10 ?? '') !== 'C') {
      this.showAllErrors = true;
      this.persistRequiredErrors();
    }

    if (this.f('p104Otro')?.value === 'S') {
      this.f('p104OtroDetalle')?.enable({ emitEvent: false });
      this.f('p104OtroDetalle')?.setValidators([Validators.required]);
    }

    this.ficha10Form.markAsPristine();
    console.debug('[S10] form poblado:', this.ficha10Form.getRawValue());
  }

  public charLen(controlName: string): number {
    const v = this.f(controlName)?.value;
    return typeof v === 'string' ? v.length : 0;
  }


        private persistRequiredErrors(): void {
        const keys = Object.keys(this.ficha10Form.controls);
        keys.forEach(k => {
          const c = this.ficha10Form.get(k);
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


  // ===== Helpers de acceso =====
  f(path: string) { return this.ficha10Form.get(path) as AbstractControl | null; }
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
  
  if (this.p104Actividades.includes(name)) {
    this.f('p104Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  const p106Keys = ['p106ALogistica', 'p106BInfra', 'p106CPersonal', 'p106DPresupuesto', 'p106EOtro', 'p106Ninguno'];
  if (p106Keys.includes(name)) {
    this.f('p106Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

  //   onCheck(name: string, ev: any) {
  //   const c = this.f(name); if (!c) return;
  //   const checked = !!ev?.checked;
  //   c.setValue(checked ? 'S' : null);
  // }


  isDisabled108(name: string): boolean {
    const c = this.f(name);
    return !c || c.disabled || this.f('p107Recibe')?.value !== 'S';
    }

   isDisabled104(name: string): boolean {
  const ctrl = this.f(name);
  if (!ctrl || ctrl.disabled) return true; 
  const p101 = this.f('p101Realizo')?.value as string | undefined;
  const p102 = this.f('p102Realizo')?.value as string | undefined;
  const p103 = this.f('p103Realizo')?.value as string | undefined;


    return p101 !== 'S' && p102 !== 'S' && p103 !== 'S';

}

  

   public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }

  // ===== Skip-logic comunes (mismo set que ya usamos en S5/S7/S9) =====
private bindYesEnables(sourceKey: string, targetKey: string, validators: any[] = []) {
  const src = this.f(sourceKey), trg = this.f(targetKey);
  if (!src || !trg) return;
  const apply = (v: any) => {
    if (v === 'S') {
      trg.enable({ emitEvent: false });
      trg.setValidators(validators);
    } else {
      trg.setValue(null, { emitEvent: false }); // Limpiar valor
      this.disableSoft(trg, true, true);
    }
    trg.updateValueAndValidity({ emitEvent: false });
    this.cdr.markForCheck();
  };
  apply(src.value);
  src.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
}

  private setupMatrix(rows: any[], noneKey: string) {
    // “Ninguno”
    this.f(noneKey)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      if (v === 'S') {
        rows.forEach(r => {
          const ck = this.f(r.check);
          if (!ck) return;
          ck.setValue(null, { emitEvent: false });
          this.disableRow(r);
        });
      }
    });

    // Cada fila: check ⇒ habilita gest/suf/esp (+ otroDetalle si corresponde)
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

      // Estado inicial
      const initOn = this.f(r.check)?.value === 'S';
      initOn ? this.enableRow(r) : this.disableRow(r);
      if (r.otroDet) {
        const need = this.f(r.check)?.value === 'S';
        this.toggleCtrl(r.otroDet, !!need, false, need ? [Validators.required] : []);
      }
    });
  }



  onNinguna108Change(ev: MatCheckboxChange) {
  this.onCheck('p108Ninguno', ev); // conserva tu forma de setear 'S'|null

   const checked = !!ev?.checked;
    const noneCtrl = this.f('p108Ninguno');
    if (!noneCtrl) return;
    noneCtrl.setValue(checked ? 'S' : null, { emitEvent: true });


  const others = [
  'p108Mre','p108Reniec','p108Migraciones','p108Interpol','p108Inei',
    'p108Jne','p108Onpe','p108Sunarp','p108PoderJudicial','p108Otro'
  ];

  if (checked) {
    // Marcar "Ninguna" => limpiar y bloquear todo lo demás
    others.forEach(k => this.disableSoft(this.f(k), true, true));
    this.disableSoft(this.f('p108OtroDetalle'), true, true);
  } else {
    // Quitar "Ninguna" => re-habilitar el grupo (reglas finas las gestiona apply116Rules)
    others.forEach(k => this.f(k)?.enable({ emitEvent: false }));
    if (this.f('p108Otro')?.value === 'S') {
      const det = this.f('p108OtroDetalle');
      det?.enable({ emitEvent: false });
      det?.setValidators([Validators.required]);
      det?.updateValueAndValidity({ emitEvent: false });
    }
  }

  // Validación ancla: si "Ninguna" está activa, no exigir selección de instituciones
  const yesCtrl = this.f('p107Recibe');
  if (yesCtrl) {
    const curr = yesCtrl.errors || {};
    const { p108Group, ...rest } = curr as any;
    yesCtrl.setErrors(checked ? null : (Object.keys(rest).length ? rest : null), { emitEvent: false });
  }
}

  pretty108(key: string): string {
    return this.label108[key] ?? key.replace('p108', '');
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

  private toggleCtrl(name: string, enabled: boolean, _isNumber = false, validators: any[] = []) {
    const c = this.f(name); if (!c) return;
    if (enabled) {
      c.enable({ emitEvent: false });
      c.setValidators(validators);
    } else {
      this.disableSoft(c, true, true);
    }
    c.updateValueAndValidity({ emitEvent: false });
  }


  // ===== Guardar / Validar =====
public guardarSeccion10(): void { this.guardarDatos('C'); }
public guardarSeccion10Incompleta(): void { this.guardarDatos('I'); }

private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  this.ficha10Form.updateValueAndValidity({ emitEvent: false });
  
  //  VALIDACIÓN: SI ESTABA COMPLETA (C) PERO AHORA ES INVÁLIDA → CAMBIAR A INCOMPLETA (I)
  const estadoActual = this.f('estado_s10')?.value;
  
  if (estadoActual === 'C' && this.ficha10Form.invalid) {
    console.warn('[S10] Cambio de estado: C → I (campos requeridos sin completar)');
    
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
  if (estado === 'C' && this.ficha10Form.invalid) {
    this.ficha10Form.markAllAsTouched();
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
      this.fichaService.guardarFichaSeccion10(payload).pipe(takeUntil(this.destroy$))
    );
    
    Swal.close();
    
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: resp?.mensaje || 'Sección 10 guardada correctamente',
      timer: 2000,
      showConfirmButton: false
    });

    //  Actualizar estado en el formulario
    this.ficha10Form.patchValue({ estado_s10: estado }, { emitEvent: false });
    this.ficha10Form.markAsPristine();
    
    //  Solo limpiar flags si se guardó correctamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estado); //  Emitir el estado correcto

    localStorage.setItem('pantbc_s10', JSON.stringify(payload));
    
  } catch (e: any) {
    Swal.close();
    console.error('[S10 guardar ERR]', e?.status, e?.message, e?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la sección 10.',
      confirmButtonColor: '#e74c3c'
    });
  }
}

  public validarSeccion(): void {
    const estado = this.f('estado_s10')?.value;
    const idFichas10 = this.f('idFichas10')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas10, valida_s10: '1' };
    this.fichaService.validarFichaSeccion10(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s10')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 10 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S10:', err);
        Swal.fire('Error', 'No se pudo validar la sección 10.', 'error');
      }
    });
  }

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha10Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha10Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha10Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion10(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S10 autosave OK]', { estado }),
      error: (err) => console.error('[S10 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }

  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha10Form.getRawValue();
  delete raw.p104Any;
    delete raw.p106Any;

    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s10 = estado;
    return raw;
  }

  private nonNegativeInt() {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 ? null : { nonNegativeInt: true };
    };
  }

  private disableSoft(ctrl: AbstractControl | null, clearValidators = true, clearValue = true) {
    if (!ctrl) return;
    if (clearValidators) ctrl.clearValidators();
    if (clearValue) ctrl.setValue(null, { emitEvent: false });
    ctrl.disable({ emitEvent: false });
    ctrl.updateValueAndValidity({ emitEvent: false });
  }


   limitarDigitosTextarea(event: any, maxLength: number = 500): void {
    const input = event.target;
    const valor = input.value; 
    if (valor.length > maxLength) {
      input.value = valor.slice(0, maxLength); 
    }
  }
  
  private logInvalids(): void {
    console.warn('--- S10 INVÁLIDO ---');
    Object.keys(this.ficha10Form.controls).forEach(k => {
      const c = this.ficha10Form.get(k);
      if (c && c.invalid) {
        console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
    console.warn('Form errors (root):', this.ficha10Form.errors);
  }


public showGroupErrors = false; 

// ============================================
// GETTER PARA VALIDACION DE GRUPO
// ============================================

get showP106GroupError(): boolean {
  const anyCtrl = this.f('p106Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

// AGREGAR ESTE GETTER NUEVO
/**
 * Mostrar error de validación para grupo 10.4
 */
get showP104GroupError(): boolean {
  const anyCtrl = this.f('p104Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}
}
