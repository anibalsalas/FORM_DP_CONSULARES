import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, inject
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators, 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule }      from '@angular/material/radio';
import { MatButtonModule }     from '@angular/material/button';
import { MatInputModule }      from '@angular/material/input';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatIconModule }       from '@angular/material/icon';
import { MatDividerModule }    from '@angular/material/divider';

import Swal from 'sweetalert2';

import { Ficha1Service } from '../ficha1.service';
//import { AuthService }   from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';
// (opcionales si ya los usas)
import { Max3DigitsDirective } from './max-3digits.directive';
import { NumericInputDirective } from './appNumericInput.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;

@Component({
  selector: 'app-seccion-ficha8',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatDividerModule,
    Max3DigitsDirective, NumericInputDirective,MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './seccion-ficha8.component.html',
  styleUrls: ['./seccion-ficha8.component.scss']
})
export class SeccionFicha8Component implements OnInit, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha8: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar           = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada     = new EventEmitter<void>();

  // ===== Estado local =====
  ficha8Form: FormGroup;
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
  // ===== Catálogos / helpers UI =====
  readonly p82Opciones = [
    { value: 'A', label: '01 día' },
    { value: 'B', label: 'De 02 a 4 días' },
    { value: 'C', label: 'De 05 a 10 días' },
    { value: 'D', label: 'De 11 a 15 días' },
    { value: 'E', label: 'Más de 16 días' },
  ];

  // 8.8 (matriz)
  p89Rows = [
    { check: 'p89ALogistica',   gest: 'p89AGestiones',   suf: 'p89ASuficiente',   esp: 'p89AEspecifique' },
    { check: 'p89BInfra',       gest: 'p89BGestiones',   suf: 'p89BSuficiente',   esp: 'p89BEspecifique' },
    { check: 'p89CPersonal',    gest: 'p89CGestiones',   suf: 'p89CSuficiente',   esp: 'p89CEspecifique' },
    { check: 'p89DPresupuesto', gest: 'p89DGestiones',   suf: 'p89DSuficiente',   esp: 'p89DEspecifique' },
    { check: 'p89EOtro',        gest: 'p89EGestiones',   suf: 'p89ESuficiente',   esp: 'p89EEspecifique', otroDet: 'p89EOtroDetale' },
  ];

  // 8.10 instituciones
  p811Instituciones = [
    'p811Mre','p811Reniec','p811Migraciones','p811Interpol','p811Inei',
    'p811Jne','p811Onpe','p811Sunarp','p811PoderJudicial','p811Otro'
  ];


  p87DocOptions = [
  { key: 'p87DocA', label: 'a. Poder por escritura pública' },
  { key: 'p87DocB', label: 'b. Poder fuera de registro' },
  { key: 'p87DocC', label: 'c. Poder por carta con firma legalizada' },
];


  // Etiquetas para UI (por si quieres pretty-print)
  private readonly LABELS: Record<string,string> = {
    p89ALogistica: 'Logística',
    p89BInfra: 'Infraestructura',
    p89CPersonal: 'Personal',
    p89DPresupuesto: 'Presupuesto',
    p89EOtro: 'Otro',
    p89Ninguno: 'Ninguno',
    p811Mre: 'MRE', p811Reniec: 'RENIEC', p811Migraciones: 'Migraciones',
    p811Interpol: 'INTERPOL', p811Inei: 'INEI', p811Jne: 'JNE',
    p811Onpe: 'ONPE', p811Sunarp: 'SUNARP', p811PoderJudicial: 'Poder Judicial',
    p811Otro: 'Otro(s)'
  };
  public pretty(key: string): string { return this.LABELS[key] ?? key; }


  private requireAtLeastOneP89(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha8Form) return null;
    
    const keys = ['p89ALogistica', 'p89BInfra', 'p89CPersonal', 'p89DPresupuesto', 'p89EOtro', 'p89Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha8Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}
private requireAtLeastOneP87(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha8Form) return null;
    
    const keys = ['p87DocA', 'p87DocB', 'p87DocC'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha8Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

  constructor() {
    this.ficha8Form = this.fb.group({
      // Meta
      idFichas8: [null],
      idFicha:   [null],
      estado_s8: [''],
      valida_s8: [''],

      // ===== 8.1 / 8.2 =====
      p81Requiere:   [null as SN, Validators.required],
      p82Afirmativa: [{ value: null as string | null, disabled: true }], // A..E

      // ===== 8.3 Autorización + conteos + asuntos =====
      p83Oficina:            [null as SN, Validators.required],
      p83Procedimiento2023:  [{ value: null, disabled: true }, this.nonNegativeInt()],
      p83Procedimiento2024:  [{ value: null, disabled: true }, this.nonNegativeInt()],
      p83Procedimiento2025:  [{ value: null, disabled: true }, this.nonNegativeInt()],
      p83Asuntos:            [{ value: '',  disabled: true },  Validators.maxLength(500)],

      // ===== 8.3 (tabla documentación) => p84... =====
      p84Autorizacion2023: [null, this.nonNegativeInt()],
      p84Autorizacion2024: [null, this.nonNegativeInt()],
      p84Autorizacion2025: [null, this.nonNegativeInt()],

      p84Certificados2023: [null, this.nonNegativeInt()],
      p84Certificados2024: [null, this.nonNegativeInt()],
      p84Certificados2025: [null, this.nonNegativeInt()],

      p84Legalizacion2023: [null, this.nonNegativeInt()],
      p84Legalizacion2024: [null, this.nonNegativeInt()],
      p84Legalizacion2025: [null, this.nonNegativeInt()],

      p84Copias2023: [null, this.nonNegativeInt()],
      p84Copias2024: [null, this.nonNegativeInt()],
      p84Copias2025: [null, this.nonNegativeInt()],

      p84Poderes2023: [null, this.nonNegativeInt()],
      p84Poderes2024: [null, this.nonNegativeInt()],
      p84Poderes2025: [null, this.nonNegativeInt()],

      p84Escritura2023: [null, this.nonNegativeInt()],
      p84Escritura2024: [null, this.nonNegativeInt()],
      p84Escritura2025: [null, this.nonNegativeInt()],

      p84Testamentos2023: [null, this.nonNegativeInt()],
      p84Testamentos2024: [null, this.nonNegativeInt()],
      p84Testamentos2025: [null, this.nonNegativeInt()],

      // ===== 8.4 / 8.5 / 8.6 / 8.7 =====
      p85Cuenta:          [null as SN, Validators.required], // Registro de instrumentos públicos
      // 8.5 del Word: tipos de documento; la entidad solo tiene un CHAR(1) p87EspecifiqueDoc
      // lo modelamos como radio (opción única) y lo habilitamos si p86Funcionario = 'S'
      p86Funcionario:     [null as SN, Validators.required],// tiene firma/sello registrado
      p87EspecifiqueDoc:[{ value: null as string | null, disabled: true }], // 'E' | 'F' | 'C'
      p88Afirmatica:    [{ value: null as string | null, disabled: true }], // fecha (yyyy-mm-dd)

      // ===== 8.8 Matriz necesidades + Ninguno =====
      p89ALogistica:  [null as 'S' | null],
      p89AGestiones:  [{ value: null as SN, disabled: true }],
      p89ASuficiente: [{ value: null as SN, disabled: true }],
      p89AEspecifique:[{ value: '', disabled: true }],

      p89BInfra:      [null as 'S' | null],
      p89BGestiones:  [{ value: null as SN, disabled: true }],
      p89BSuficiente: [{ value: null as SN, disabled: true }],
      p89BEspecifique:[{ value: '', disabled: true }],

      p89CPersonal:   [null as 'S' | null],
      p89CGestiones:  [{ value: null as SN, disabled: true }],
      p89CSuficiente: [{ value: null as SN, disabled: true }],
      p89CEspecifique:[{ value: '', disabled: true }],

      p89DPresupuesto:[null as 'S' | null],
      p89DGestiones:  [{ value: null as SN, disabled: true }],
      p89DSuficiente: [{ value: null as SN, disabled: true }],
      p89DEspecifique:[{ value: '', disabled: true }],

      p89EOtro:       [null as 'S' | null],
      p89EGestiones:  [{ value: null as SN, disabled: true }],
      p89ESuficiente: [{ value: null as SN, disabled: true }],
      p89EEspecifique:[{ value: '', disabled: true }],
      p89EOtroDetale: [{ value: '', disabled: true }], // OJO: DETALE (así viene en DB)

      p89Ninguno: [null as 'S' | null],
      // ===== 8.9 / 8.10 =====
      p810Recibe:       [null as SN, Validators.required],
      p811Mre:              [null as 'S' | null],
      p811Reniec:           [null as 'S' | null],
      p811Migraciones:      [null as 'S' | null],
      p811Interpol:         [null as 'S' | null],
      p811Inei:             [null as 'S' | null],
      p811Jne:              [null as 'S' | null],
      p811Onpe:             [null as 'S' | null],
      p811Sunarp:           [null as 'S' | null],
      p811PoderJudicial:    [null as 'S' | null],
      p811Otro:             [null as 'S' | null],
      p811OtroDetalle:      [{ value: '', disabled: true }],
      p811Ninguna:          [null as 'S' | null],

        p87DocA: [null as 'S' | null],
        p87DocB: [null as 'S' | null],
        p87DocC: [null as 'S' | null],

        p87Group: [null, this.requireAtLeastOneP87()],
    
       // p87Group: [null],
        p89Any: [null, this.requireAtLeastOneP89()],
    });
  }

    today: Date = new Date();


  // ===== Ciclo de vida =====
  ngOnInit(): void {
    // idFicha desde input
    this.idFicha = this.datosFicha8?.idFicha ?? null;
    if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    // Cargar datos si existen
    if (this.datosFicha8) this.populateForm(this.datosFicha8);

    // 8.1 -> 8.2 (radio habilita radio)
    this.bindYesEnables('p81Requiere', 'p82Afirmativa', [Validators.required]);

      //  this.bindYesEnables('p86Funcionario', 'p87EspecifiqueDoc', [Validators.required]);


    // 8.3 (autorización) habilita conteos + asuntos
    this.bindYesTogglesKeys('p83Oficina',
      ['p83Procedimiento2023','p83Procedimiento2024','p83Procedimiento2025','p83Asuntos'],
      [] // no requeridos estrictamente
    );

    // 8.6 (firma/sello) -> habilita p87EspecifiqueDoc (radio) + p88Afirmatica (fecha requerida)
    this.bindYesTogglesKeys('p86Funcionario',
      ['p87EspecifiqueDoc','p88Afirmatica'],
      ['p88Afirmatica'] // fecha requerida si S
    );

      this.bindRequireOneGroup(['p87DocA','p87DocB','p87DocC'], 'p87Group');


    // 8.8 matriz
    this.setupMatrix(this.p89Rows, 'p89Ninguno');
    // gestiones -> suficiente (requerido si gestiones == 'S')
    this.bindYesEnables('p89AGestiones', 'p89ASuficiente', [Validators.required]);
    this.bindYesEnables('p89BGestiones', 'p89BSuficiente', [Validators.required]);
    this.bindYesEnables('p89CGestiones', 'p89CSuficiente', [Validators.required]);
    this.bindYesEnables('p89DGestiones', 'p89DSuficiente', [Validators.required]);
    this.bindYesEnables('p89EGestiones', 'p89ESuficiente', [Validators.required]);

    // 8.9 (radio) -> 8.10 (grupo checkboxes con "otro detalle")
    this.bindYesRequiresAnyCheckboxSimple(
      'p810Recibe',
      this.p811Instituciones,
      'p811Group',
      'p811Ninguna',
      'p811Otro',
      'p811OtroDetalle'
    );

    // Autosave
    if (this.activarAutosave && !this.autosaveLanzado) {
      this.autosaveSilencioso();
      this.autosaveLanzado = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== Helpers de acceso =====
  f(path: string) { return this.ficha8Form.get(path) as AbstractControl | null; }

    public showAllErrors = false; 

   public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }

  isChecked(name: string): boolean { return this.f(name)?.value === 'S'; }

  // onCheck(name: string, ev: any) {
  //   const c = this.f(name); if (!c) return;
  //   const checked = !!ev?.checked;
  //   c.setValue(checked ? 'S' : null);
  // }

onCheck(name: string, ev: any) {
  const c = this.f(name); 
  if (!c) return;
  
  const checked = !!ev?.checked;
  c.setValue(checked ? 'S' : null);
  c.markAsDirty();
  c.markAsTouched();
  
  // Revalidar grupo 8.9
  const p89Keys = ['p89ALogistica', 'p89BInfra', 'p89CPersonal', 'p89DPresupuesto', 'p89EOtro', 'p89Ninguno'];
  if (p89Keys.includes(name)) {
    this.f('p89Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

  isDisabled811(name: string): boolean {
    const c = this.f(name);
    return !c || c.disabled || this.f('p810Recibe')?.value !== 'S';
  }

   public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
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


  private bindRequireOneGroup(checkKeys: string[], groupKey: string): void {
  const anchor = this.f(groupKey);
  if (!anchor) return;

  const validate = () => {
    const any = checkKeys.some(k => this.f(k)?.value === 'S');
    const errs = anchor.errors || {};
    if (!any) {
      anchor.setErrors({ ...errs, requireOne: true }, { emitEvent: false });
    } else {
      const { requireOne, ...rest } = errs;
      anchor.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
    }
  };

  // estado inicial
  validate();
  // revalidar ante cambios
  checkKeys.forEach(k => this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(validate));
}

  private bindYesTogglesKeys(yesKey: string, keys: string[], requiredIfYes: string[] = []) {
    const yes = this.f(yesKey);
    if (!yes) return;
    const apply = (v: any) => {
      const on = v === 'S';
      keys.forEach(k => {
        const c = this.f(k); if (!c) return;
        if (on) {
          c.enable({ emitEvent: false });
          if (requiredIfYes.includes(k)) c.setValidators([Validators.required]);
        } else {
          this.disableSoft(c, true, true);
        }
        c.updateValueAndValidity({ emitEvent: false });
      });
    };
    apply(yes.value);
    yes.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
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


public hasError(controlName: string, errorType: string): boolean {
  const control = this.f(controlName);
  if (!control) return false;
  const shouldShow = this.showAllErrors || control.touched || control.dirty;
  return !!(control.hasError(errorType) && shouldShow);
}


  public isCheckboxChecked(controlName: string): boolean {
  return this.f(controlName)?.value === 'S';
}
public onCheckboxChange(controlName: string, ev: any) {
  const c = this.f(controlName); if (!c) return;
  c.setValue(ev?.checked ? 'S' : null);
  c.markAsDirty();
  c.markAsTouched();

    const p87Keys = ['p87DocA', 'p87DocB', 'p87DocC'];
  if (p87Keys.includes(controlName)) {
    this.f('p87Group')?.updateValueAndValidity({ emitEvent: false });
  }
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

  /** Requiere al menos un checkbox del grupo cuando yesKey === 'S'.
   * Si yesKey !== 'S' => limpia, deshabilita y quita required del grupo. */
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
        // NO: limpiar + deshabilitar todo
        checkKeys.forEach(k => this.disableSoft(this.f(k), true, true));
        if (noneKey)    this.disableSoft(this.f(noneKey), true, true);
        if (otroDetKey) this.disableSoft(this.f(otroDetKey), true, true);

        const errs = yesCtrl.errors || {};
        if (anchorErrorKey in errs) {
          const { [anchorErrorKey]: _, ...rest } = errs;
          yesCtrl.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
        }
        busy = false; return;
      }

      // SÍ: habilitar grupo y deshabilitar “ninguna”
      checkKeys.forEach(k => this.f(k)?.enable({ emitEvent: false }));
      if (noneKey) this.disableSoft(this.f(noneKey), true, true);

      // “Otro (detalle)” condicionado
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

      // Validación: al menos uno marcado
      const any = checkKeys.some(k => this.f(k)?.value === 'S');
      const curr = yesCtrl.errors || {};
      if (!any) {
        yesCtrl.setErrors({ ...curr, [anchorErrorKey]: true }, { emitEvent: false });
        yesCtrl.markAsTouched();
      } else {
        const { [anchorErrorKey]: _, ...rest } = curr;
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

  // ===== Guardar / Validar =====
  public guardarSeccion8(): void { this.guardarDatos('C'); }
  public guardarSeccion8Incompleta(): void { this.guardarDatos('I'); }


  private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  this.ficha8Form.updateValueAndValidity({ emitEvent: false });
  
  // ✅ VALIDACIÓN: SI ESTABA COMPLETA (C) PERO AHORA ES INVÁLIDA → CAMBIAR A INCOMPLETA (I)
  const estadoActual = this.f('estado_s8')?.value;
  
  if (estadoActual === 'C' && this.ficha8Form.invalid) {
    console.warn('⚠️ [S8] Cambio de estado: C → I (campos requeridos sin completar)');
    
    estado = 'I'; // Forzar a Incompleta
    
    await Swal.fire({
      icon: 'warning',
      title: 'Sección cambiada a Incompleta',
      html: 'La sección tenía estado <strong>"Completa"</strong> pero ahora tiene campos requeridos sin completar.<br><br>Se guardará como <strong>"Incompleta"</strong>.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f39c12'
    });
  }
  
  // VALIDACIÓN NORMAL: SI SE INTENTA GUARDAR COMO COMPLETA PERO ES INVÁLIDA
  if (estado === 'C' && this.ficha8Form.invalid) {
    this.ficha8Form.markAllAsTouched();
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
      this.fichaService.guardarFichaSeccion8(payload).pipe(takeUntil(this.destroy$))
    );
    
    Swal.close();
    
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: resp?.mensaje || 'Sección 8 guardada correctamente',
      timer: 2000,
      showConfirmButton: false
    });

    // ✅ Actualizar estado en el formulario
    this.ficha8Form.patchValue({ estado_s8: estado }, { emitEvent: false });
    this.ficha8Form.markAsPristine();
    
    // ✅ Solo limpiar flags si se guardó correctamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estado); // ✅ Emitir el estado correcto

    localStorage.setItem('pantbc_s8', JSON.stringify(payload));
    
  } catch (e: any) {
    Swal.close();
    console.error('[S8 guardar ERR]', e?.status, e?.message, e?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la sección 8.',
      confirmButtonColor: '#e74c3c'
    });
  }
}

//   private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
//   this.ficha8Form.updateValueAndValidity({ emitEvent: false });
  
//   if (estado === 'C' && this.ficha8Form.invalid) {
//     this.ficha8Form.markAllAsTouched();
    
//     //  Activa visualización de errores
//     this.showAllErrors = true;
//     this.showGroupErrors = true;
    
//     this.logInvalids();
//     Swal.fire('Formulario Incompleto', 'Completa los campos requeridos.', 'warning');
//     return;
//   }

//   const payload = this.prepareSaveData(estado);
//   Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//   try {
//     const resp = await lastValueFrom(
//       this.fichaService.guardarFichaSeccion8(payload).pipe(takeUntil(this.destroy$))
//     );
//     Swal.close();
//     Swal.fire('Listo', resp?.mensaje || 'Sección 8 guardada', 'success');

//     // Limpia errores después de guardar exitosamente
//     this.showAllErrors = false;
//     this.showGroupErrors = false;

//     this.ficha8Form.patchValue({ estado_s8: estado }, { emitEvent: false });
//     this.ficha8Form.markAsPristine();

//     this.onGuardar.emit();
//     this.onEstadoActualizado.emit(payload.estado_s8);

//     localStorage.setItem('pantbc_s8', JSON.stringify(payload));
//   } catch (e: any) {
//     Swal.close();
//     console.error('[S8 guardar ERR]', e?.status, e?.message, e?.error);
//     Swal.fire('Error', 'No se pudo guardar la sección 8.', 'error');
//   }
// }


  public validarSeccion(): void {
    const estado = this.f('estado_s8')?.value;
    const idFichas8 = this.f('idFichas8')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas8, valida_s8: '1' };
    this.fichaService.validarFichaSeccion8(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s8')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 8 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S8:', err);
        Swal.fire('Error', 'No se pudo validar la sección 8.', 'error');
      }
    });
  }

  // ===== Utilitarios =====
  private populateForm(d: any): void {
    // Sincroniza idFicha
    this.idFicha = d?.idFicha ?? this.idFicha;
    this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    this.ficha8Form.patchValue({
      // Meta
      idFichas8: d.idFichas8 ?? null,
      idFicha:   d.idFicha ?? this.idFicha,
      estado_s8: d.estado_s8 ?? '',
      valida_s8: d.valida_s8 ?? '',

      // 8.1 / 8.2
      p81Requiere:   d.p81Requiere ?? null,
      p82Afirmativa: d.p82Afirmativa ?? null,

      // 8.3 autorización + conteos + asuntos
      p83Oficina:            d.p83Oficina ?? null,
      p83Procedimiento2023:  d.p83Procedimiento2023 ?? null,
      p83Procedimiento2024:  d.p83Procedimiento2024 ?? null,
      p83Procedimiento2025:  d.p83Procedimiento2025 ?? null,
      p83Asuntos:            d.p83Asuntos ?? '',

      // 8.3 (tabla p84)
      p84Autorizacion2023: d.p84Autorizacion2023 ?? null,
      p84Autorizacion2024: d.p84Autorizacion2024 ?? null,
      p84Autorizacion2025: d.p84Autorizacion2025 ?? null,

      p84Certificados2023: d.p84Certificados2023 ?? null,
      p84Certificados2024: d.p84Certificados2024 ?? null,
      p84Certificados2025: d.p84Certificados2025 ?? null,

      p84Legalizacion2023: d.p84Legalizacion2023 ?? null,
      p84Legalizacion2024: d.p84Legalizacion2024 ?? null,
      p84Legalizacion2025: d.p84Legalizacion2025 ?? null,

      p84Copias2023: d.p84Copias2023 ?? null,
      p84Copias2024: d.p84Copias2024 ?? null,
      p84Copias2025: d.p84Copias2025 ?? null,

      p84Poderes2023: d.p84Poderes2023 ?? null,
      p84Poderes2024: d.p84Poderes2024 ?? null,
      p84Poderes2025: d.p84Poderes2025 ?? null,

      p84Escritura2023: d.p84Escritura2023 ?? null,
      p84Escritura2024: d.p84Escritura2024 ?? null,
      p84Escritura2025: d.p84Escritura2025 ?? null,

      p84Testamentos2023: d.p84Testamentos2023 ?? null,
      p84Testamentos2024: d.p84Testamentos2024 ?? null,
      p84Testamentos2025: d.p84Testamentos2025 ?? null,

      // 8.4 / 8.5 / 8.6 / 8.7
      p85Cuenta:         d.p85Cuenta ?? null,
      p86Funcionario:    d.p86Funcionario ?? null,
      p87EspecifiqueDoc: d.p87EspecifiqueDoc ?? null,
      p88Afirmatica:     d.p88Afirmatica ?? null,

      // 8.8 matriz
      p89ALogistica:   d.p89ALogistica ?? null,
      p89AGestiones:   d.p89AGestiones ?? null,
      p89ASuficiente:  d.p89ASuficiente ?? null,
      p89AEspecifique: d.p89AEspecifique ?? '',
      p89BInfra:       d.p89BInfra ?? null,
      p89BGestiones:   d.p89BGestiones ?? null,
      p89BSuficiente:  d.p89BSuficiente ?? null,
      p89BEspecifique: d.p89BEspecifique ?? '',
      p89CPersonal:    d.p89CPersonal ?? null,
      p89CGestiones:   d.p89CGestiones ?? null,
      p89CSuficiente:  d.p89CSuficiente ?? null,
      p89CEspecifique: d.p89CEspecifique ?? '',
      p89DPresupuesto: d.p89DPresupuesto ?? null,
      p89DGestiones:   d.p89DGestiones ?? null,
      p89DSuficiente:  d.p89DSuficiente ?? null,
      p89DEspecifique: d.p89DEspecifique ?? '',
      p89EOtro:        d.p89EOtro ?? null,
      p89EGestiones:   d.p89EGestiones ?? null,
      p89ESuficiente:  d.p89ESuficiente ?? null,
      p89EEspecifique: d.p89EEspecifique ?? '',
      p89EOtroDetale:  d.p89EOtroDetale ?? '',
      p89Ninguno:      d.p89Ninguno ?? null,

      // 8.9 / 8.10
      p810Recibe:         d.p810Recibe ?? null,
      p811Mre:            d.p811Mre ?? null,
      p811Reniec:         d.p811Reniec ?? null,
      p811Migraciones:    d.p811Migraciones ?? null,
      p811Interpol:       d.p811Interpol ?? null,
      p811Inei:           d.p811Inei ?? null,
      p811Jne:            d.p811Jne ?? null,
      p811Onpe:           d.p811Onpe ?? null,
      p811Sunarp:         d.p811Sunarp ?? null,
      p811PoderJudicial:  d.p811PoderJudicial ?? null,
      p811Otro:           d.p811Otro ?? null,
      p811OtroDetalle:    d.p811OtroDetalle ?? '',
      p811Ninguna:        d.p811Ninguna ?? null,

      p87DocA: d.p87DocA ?? null,
      p87DocB: d.p87DocB ?? null,
      p87DocC: d.p87DocC ?? null,
    }, { emitEvent: false });

    //Revalido control oculto después de hidratar
      this.f('p87Group')?.updateValueAndValidity({ emitEvent: false });
      this.f('p89Any')?.updateValueAndValidity({ emitEvent: false });


      if ((d?.estado_s8 ?? '') !== 'C') {
        this.showAllErrors = true;        // ⬅️ clave para persistir mensajes
        this.persistRequiredErrors();     // opcional pero recomendado
      }

    this.ficha8Form.markAsPristine();
    console.debug('[S8] form poblado:', this.ficha8Form.getRawValue());
  }

  public charLen(controlName: string): number {
          const v = this.f(controlName)?.value;
          return typeof v === 'string' ? v.length : 0;
        }
  

private persistRequiredErrors(): void {
  const keys = Object.keys(this.ficha8Form.controls);
  keys.forEach(k => {
    const c = this.ficha8Form.get(k);
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

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha8Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha8Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha8Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion8(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S8 autosave OK]', { estado }),
      error: (err) => console.error('[S8 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }

  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha8Form.getRawValue();
    //Elimina control oculto del payload
    delete raw.p89Any;
    delete raw.p87Group;
  
    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s8 = estado;
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

  private logInvalids(): void {
    console.warn('--- S8 INVÁLIDO ---');
    Object.keys(this.ficha8Form.controls).forEach(k => {
      const c = this.ficha8Form.get(k);
      if (c && c.invalid) {
        console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
    console.warn('Form errors (root):', this.ficha8Form.errors);
  }

 limitarDigitosTextarea(event: any, maxLength: number = 500): void {
    const input = event.target;
    const valor = input.value;
    if (valor.length > maxLength) {
      input.value = valor.slice(0, maxLength);
    }
  }

  public showGroupErrors = false; 


  get showP89GroupError(): boolean {
  const anyCtrl = this.f('p89Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

  get showP87GroupError(): boolean {
    const groupCtrl = this.f('p87Group');
    const shouldShow = this.showAllErrors || this.showGroupErrors || groupCtrl?.touched;
    return !!(shouldShow && groupCtrl?.invalid);
  }

}
