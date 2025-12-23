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
// Directivas que ya usabas en S5/S7
import { Max4DigitsDirective } from './max-4digits.directive';
import { NumericInputDirective } from './appNumericInput.directive';
import { group } from 'console';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;

@Component({
  selector: 'app-seccion-ficha9',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatDividerModule,
    Max4DigitsDirective, NumericInputDirective
  ],
  templateUrl: './seccion-ficha9.component.html',
  styleUrls: ['./seccion-ficha9.component.scss']
})
export class SeccionFicha9Component implements OnInit, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha9: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar           = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada     = new EventEmitter<void>();

  // ===== Estado local =====
  ficha9Form: FormGroup;
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
  // ===== Catálogos =====
  p93Rows = [
    { check: 'p93ALogistica',   gest: 'p93AGestiones',   suf: 'p93ASuficiente',   esp: 'p93AEspecifique' },
    { check: 'p93BInfra',       gest: 'p93BGestiones',   suf: 'p93BSuficiente',   esp: 'p93BEspecifique' },
    { check: 'p93CPersonal',    gest: 'p93CGestiones',   suf: 'p93CSuficiente',   esp: 'p93CEspecifique' },
    { check: 'p93DPresupuesto', gest: 'p93DGestiones',   suf: 'p93DSuficiente',   esp: 'p93DEspecifique' },
    { check: 'p93EOtro',        gest: 'p93EGestiones',   suf: 'p93ESuficiente',   esp: 'p93EEspecifique', otroDet: 'p93EOtroDetalle' },
  ];

  p95Instituciones = [
    'p95Mre','p95Reniec','p95Migraciones','p95Interpol','p95Inei',
    'p95Jne','p95Onpe','p95Sunarp','p95PoderJudicial','p95Otro'
  ];

  // Etiquetas limpias
  private readonly LABELS: Record<string,string> = {
    // 9.3 necesidades
    p93ALogistica: 'Logística',
    p93BInfra: 'Infraestructura',
    p93CPersonal: 'Personal',
    p93DPresupuesto: 'Presupuesto',
    p93EOtro: 'Otro',
    p93Ninguno: 'Ninguno',
    // 9.6 instituciones
    p95Mre: 'MRE',
    p95Reniec: 'RENIEC',
    p95Migraciones: 'Migraciones',
    p95Interpol: 'INTERPOL',
    p95Inei: 'INEI',
    p95Jne: 'JNE',
    p95Onpe: 'ONPE',
    p95Sunarp: 'SUNARP',
    p95PoderJudicial: 'Poder Judicial',
    p95Otro: 'Otro(s)',
    //p95Ninguno: 'No ha recibido ninguna'
  };
  public pretty(key: string): string { return this.LABELS[key] ?? key; }


  private requireAtLeastOneP93(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha9Form) return null;
    
    const keys = ['p93ALogistica', 'p93BInfra', 'p93CPersonal', 'p93DPresupuesto', 'p93EOtro', 'p93Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha9Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

  constructor() {
    this.ficha9Form = this.fb.group({
      // Meta
      idFichas9: [null],
      idFicha:   [null],
      estado_s9: [''],
      valida_s9: [''],

      // ===== 9.1 Notificaciones administrativas =====
      p91Realizan:   [null as SN, Validators.required],
      p91Notifica2023: [{ value: null, disabled: true }, this.nonNegativeInt()],
      p91Notifica2024: [{ value: null, disabled: true }, this.nonNegativeInt()],
      p91Notifica2025: [{ value: null, disabled: true }, this.nonNegativeInt()],

      // ===== 9.3 Exhortos emitidos =====
      p92Exhorto2023: [null, this.nonNegativeInt()],
      p92Exhorto2024: [null, this.nonNegativeInt()],
      p92Exhorto2025: [null, this.nonNegativeInt()],

      // ===== 9.4 Matriz necesidades + Ninguno =====
      p93ALogistica:   [null as 'S' | null],
      p93AGestiones:   [{ value: null as SN, disabled: true }],
      p93ASuficiente:  [{ value: null as SN, disabled: true }],
      p93AEspecifique: [{ value: '', disabled: true }],

      p93BInfra:       [null as 'S' | null],
      p93BGestiones:   [{ value: null as SN, disabled: true }],
      p93BSuficiente:  [{ value: null as SN, disabled: true }],
      p93BEspecifique: [{ value: '', disabled: true }],

      p93CPersonal:    [null as 'S' | null],
      p93CGestiones:   [{ value: null as SN, disabled: true }],
      p93CSuficiente:  [{ value: null as SN, disabled: true }],
      p93CEspecifique: [{ value: '', disabled: true }],

      p93DPresupuesto: [null as 'S' | null],
      p93DGestiones:   [{ value: null as SN, disabled: true }],
      p93DSuficiente:  [{ value: null as SN, disabled: true }],
      p93DEspecifique: [{ value: '', disabled: true }],

      p93EOtro:        [null as 'S' | null],
      p93EGestiones:   [{ value: null as SN, disabled: true }],
      p93ESuficiente:  [{ value: null as SN, disabled: true }],
      p93EEspecifique: [{ value: '', disabled: true }],
      p93EOtroDetalle: [{ value: '', disabled: true }],

      p93Ninguno: [null as 'S' | null],

      // ===== 9.5 / 9.6 Capacitaciones e instituciones =====
      p94Recibe: [null as SN, Validators.required],
      p95Mre:              [null as 'S' | null],
      p95Reniec:           [null as 'S' | null],
      p95Migraciones:      [null as 'S' | null],
      p95Interpol:         [null as 'S' | null],
      p95Inei:             [null as 'S' | null],
      p95Jne:              [null as 'S' | null],
      p95Onpe:             [null as 'S' | null],
      p95Sunarp:           [null as 'S' | null],
      p95PoderJudicial:    [null as 'S' | null],
      p95Otro:             [null as 'S' | null],
      p95OtroDetalle:      [{ value: '', disabled: true }],
      p95Ninguno:          [null as 'S' | null],
      p93Any: [null, this.requireAtLeastOneP93()],

    });
  }


 

  // ===== Ciclo de vida =====
  ngOnInit(): void {
    // idFicha desde input
    this.idFicha = this.datosFicha9?.idFicha ?? null;
    if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    // Cargar datos si existen
    if (this.datosFicha9) this.populateForm(this.datosFicha9);

    // 9.1: SI habilita conteos
    this.bindYesEnables('p91Realizan', 'p91Notifica2023');
    this.bindYesEnables('p91Realizan', 'p91Notifica2024');
    this.bindYesEnables('p91Realizan', 'p91Notifica2025');

    // 9.4 Matriz necesidades
    this.setupMatrix(this.p93Rows, 'p93Ninguno');

    // 9.4: Gestiones -> Suficiencia (radio dependiente)
    this.bindYesEnables('p93AGestiones', 'p93ASuficiente', [Validators.required]);
    this.bindYesEnables('p93BGestiones', 'p93BSuficiente', [Validators.required]);
    this.bindYesEnables('p93CGestiones', 'p93CSuficiente', [Validators.required]);
    this.bindYesEnables('p93DGestiones', 'p93DSuficiente', [Validators.required]);
    this.bindYesEnables('p93EGestiones', 'p93ESuficiente', [Validators.required]);

    // 9.5 (radio) -> 9.6 (grupo de checkboxes, requiere al menos 1 si p94Recibe='S')
    this.bindYesRequiresAnyCheckboxSimple(
      'p94Recibe',
      this.p95Instituciones,
      'p95Group',
      'p95Ninguno',
      'p95Otro',
      'p95OtroDetalle'
    );


 
    
    // Autosave opcional
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
  f(path: string) { return this.ficha9Form.get(path) as AbstractControl | null; }
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
  //Revalida el control oculto de P9.4
  const p93Keys = ['p93ALogistica', 'p93BInfra', 'p93CPersonal', 'p93DPresupuesto', 'p93EOtro', 'p93Ninguno'];
  if (p93Keys.includes(name)) {
    this.f('p93Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

  isDisabled95(name: string): boolean {
    const c = this.f(name);
    return !c || c.disabled || this.f('p94Recibe')?.value !== 'S';
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
        if (validators?.length) trg.setValidators(validators);
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





  

  onNinguna96Change(ev: MatCheckboxChange) {
  this.onCheck('p95Ninguno', ev); // conserva tu forma de setear 'S'|null

   const checked = !!ev?.checked;
    const noneCtrl = this.f('p95Ninguno');
    if (!noneCtrl) return;
    noneCtrl.setValue(checked ? 'S' : null, { emitEvent: true });


  const others = [
  'p95Mre','p95Reniec','p95Migraciones','p95Interpol','p95Inei',
    'p95Jne','p95Onpe','p95Sunarp','p95PoderJudicial','p95Otro'
  ];

  if (checked) {
    // Marcar "Ninguna" => limpiar y bloquear todo lo demás
    others.forEach(k => this.disableSoft(this.f(k), true, true));
    this.disableSoft(this.f('p95OtroDetalle'), true, true);
  } else {
    // Quitar "Ninguna" => re-habilitar el grupo (reglas finas las gestiona apply116Rules)
    others.forEach(k => this.f(k)?.enable({ emitEvent: false }));
    if (this.f('p95Otro')?.value === 'S') {
      const det = this.f('p95OtroDetalle');
      det?.enable({ emitEvent: false });
      det?.setValidators([Validators.required]);
      det?.updateValueAndValidity({ emitEvent: false });
    }
  }

  // Validación ancla: si "Ninguna" está activa, no exigir selección de instituciones
  const yesCtrl = this.f('p94Recibe');
  if (yesCtrl) {
    const curr = yesCtrl.errors || {};
    const { p108Group, ...rest } = curr as any;
    yesCtrl.setErrors(checked ? null : (Object.keys(rest).length ? rest : null), { emitEvent: false });
  }
}

  // pretty96(key: string): string {
  //   return this.label96[key] ?? key.replace('p96', '');
  // }

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
  public guardarSeccion9(): void { this.guardarDatos('C'); }
  public guardarSeccion9Incompleta(): void { this.guardarDatos('I'); }

  private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  this.ficha9Form.updateValueAndValidity({ emitEvent: false });
  
  if (estado === 'C' && this.ficha9Form.invalid) {
    this.ficha9Form.markAllAsTouched();
    
    // Activa visualización de errores
    this.showAllErrors = true;
    this.showGroupErrors = true;
    
    this.logInvalids();
    Swal.fire('Formulario Incompleto', 'Completa los campos requeridos.', 'warning');
    return;
  }

  const payload = this.prepareSaveData(estado);
  Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

  try {
    const resp = await lastValueFrom(
      this.fichaService.guardarFichaSeccion9(payload).pipe(takeUntil(this.destroy$))
    );
    Swal.close();
    Swal.fire('Listo', resp?.mensaje || 'Sección 9 guardada', 'success');

    // Limpia errores después de guardar exitosamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    this.ficha9Form.patchValue({ estado_s9: estado }, { emitEvent: false });
    this.ficha9Form.markAsPristine();

    this.onGuardar.emit();
    this.onEstadoActualizado.emit(payload.estado_s9);

    localStorage.setItem('pantbc_s9', JSON.stringify(payload));
  } catch (e: any) {
    Swal.close();
    console.error('[S9 guardar ERR]', e?.status, e?.message, e?.error);
    Swal.fire('Error', 'No se pudo guardar la sección 9.', 'error');
  }
}

  // private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  //   this.ficha9Form.updateValueAndValidity({ emitEvent: false });
  //   if (estado === 'C' && this.ficha9Form.invalid) {
  //     this.ficha9Form.markAllAsTouched();
  //     this.logInvalids();
  //     Swal.fire('Formulario Incompleto', 'Completa los campos requeridos.', 'warning');
  //     return;
  //   }

  //   const payload = this.prepareSaveData(estado);
  //   Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //   try {
  //     const resp = await lastValueFrom(
  //       this.fichaService.guardarFichaSeccion9(payload).pipe(takeUntil(this.destroy$))
  //     );
  //     Swal.close();
  //     Swal.fire('Listo', resp?.mensaje || 'Sección 9 guardada', 'success');

  //     this.ficha9Form.patchValue({ estado_s9: estado }, { emitEvent: false });
  //     this.ficha9Form.markAsPristine();

  //     this.onGuardar.emit();
  //     this.onEstadoActualizado.emit(payload.estado_s9);

  //     localStorage.setItem('pantbc_s9', JSON.stringify(payload));
  //   } catch (e: any) {
  //     Swal.close();
  //     console.error('[S9 guardar ERR]', e?.status, e?.message, e?.error);
  //     Swal.fire('Error', 'No se pudo guardar la sección 9.', 'error');
  //   }
  // }

  public validarSeccion(): void {
    const estado = this.f('estado_s9')?.value;
    const idFichas9 = this.f('idFichas9')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas9, valida_s9: '1' };
    this.fichaService.validarFichaSeccion9(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s9')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 9 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S9:', err);
        Swal.fire('Error', 'No se pudo validar la sección 9.', 'error');
      }
    });
  }

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha9Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha9Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha9Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion9(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S9 autosave OK]', { estado }),
      error: (err) => console.error('[S9 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }

  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha9Form.getRawValue();
    
    delete raw.p93Any;

    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s9 = estado;
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

  private populateForm(d: any): void {
    // Sincroniza idFicha
    this.idFicha = d?.idFicha ?? this.idFicha;
    this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    this.ficha9Form.patchValue({
      // Meta
      idFichas9: d.idFichas9 ?? null,
      idFicha:   d.idFicha ?? this.idFicha,
      estado_s9: d.estado_s9 ?? '',
      valida_s9: d.valida_s9 ?? '',

      // 9.1
      p91Realizan:     d.p91Realizan ?? null,
      p91Notifica2023: d.p91Notifica2023 ?? null,
      p91Notifica2024: d.p91Notifica2024 ?? null,
      p91Notifica2025: d.p91Notifica2025 ?? null,

      // 9.3 (Exhortos)
      p92Exhorto2023: d.p92Exhorto2023 ?? null,
      p92Exhorto2024: d.p92Exhorto2024 ?? null,
      p92Exhorto2025: d.p92Exhorto2025 ?? null,

      // 9.4 Matriz necesidades
      p93ALogistica:   d.p93ALogistica ?? null,
      p93AGestiones:   d.p93AGestiones ?? null,
      p93ASuficiente:  d.p93ASuficiente ?? null,
      p93AEspecifique: d.p93AEspecifique ?? '',
      p93BInfra:       d.p93BInfra ?? null,
      p93BGestiones:   d.p93BGestiones ?? null,
      p93BSuficiente:  d.p93BSuficiente ?? null,
      p93BEspecifique: d.p93BEspecifique ?? '',
      p93CPersonal:    d.p93CPersonal ?? null,
      p93CGestiones:   d.p93CGestiones ?? null,
      p93CSuficiente:  d.p93CSuficiente ?? null,
      p93CEspecifique: d.p93CEspecifique ?? '',
      p93DPresupuesto: d.p93DPresupuesto ?? null,
      p93DGestiones:   d.p93DGestiones ?? null,
      p93DSuficiente:  d.p93DSuficiente ?? null,
      p93DEspecifique: d.p93DEspecifique ?? '',
      p93EOtro:        d.p93EOtro ?? null,
      p93EGestiones:   d.p93EGestiones ?? null,
      p93ESuficiente:  d.p93ESuficiente ?? null,
      p93EEspecifique: d.p93EEspecifique ?? '',
      p93EOtroDetalle: d.p93EOtroDetalle ?? '',
      p93Ninguno:      d.p93Ninguno ?? null,

      // 9.5 / 9.6
      p94Recibe:        d.p94Recibe ?? null,
      p95Mre:           d.p95Mre ?? null,
      p95Reniec:        d.p95Reniec ?? null,
      p95Migraciones:   d.p95Migraciones ?? null,
      p95Interpol:      d.p95Interpol ?? null,
      p95Inei:          d.p95Inei ?? null,
      p95Jne:           d.p95Jne ?? null,
      p95Onpe:          d.p95Onpe ?? null,
      p95Sunarp:        d.p95Sunarp ?? null,
      p95PoderJudicial: d.p95PoderJudicial ?? null,
      p95Otro:          d.p95Otro ?? null,
      p95OtroDetalle:   d.p95OtroDetalle ?? '',
      p95Ninguno:       d.p95Ninguno ?? null,
    }, { emitEvent: false });

      this.f('p93Any')?.updateValueAndValidity({ emitEvent: false });

    if ((d?.estado_s9 ?? '') !== 'C') {
      this.showAllErrors = true;        // ⬅️ clave para persistir mensajes
      this.persistRequiredErrors();     // opcional pero recomendado
    }

    this.ficha9Form.markAsPristine();
    console.debug('[S9] form poblado:', this.ficha9Form.getRawValue());
  }


        public charLen(controlName: string): number {
          const v = this.f(controlName)?.value;
          return typeof v === 'string' ? v.length : 0;
        }

      private persistRequiredErrors(): void {
        const keys = Object.keys(this.ficha9Form.controls);
        keys.forEach(k => {
          const c = this.ficha9Form.get(k);
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

  private logInvalids(): void {
    console.warn('--- S9 INVÁLIDO ---');
    Object.keys(this.ficha9Form.controls).forEach(k => {
      const c = this.ficha9Form.get(k);
      if (c && c.invalid) {
        console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
    console.warn('Form errors (root):', this.ficha9Form.errors);
  }



public showGroupErrors = false; // ✅ Agregar si no existe


get showP93GroupError(): boolean {
  const anyCtrl = this.f('p93Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

}
