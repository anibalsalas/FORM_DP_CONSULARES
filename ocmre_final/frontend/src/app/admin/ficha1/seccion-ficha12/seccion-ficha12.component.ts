import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, inject
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators
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
// (Opcionales si ya los usas)
import { Max3DigitsDirective } from '../seccion-ficha7/max-3digits.directive';
import { NumericInputDirective } from '../seccion-ficha7/appNumericInput.directive';
import { Max4DigitsDirective } from './max-4digits.directive';
import { SubirArchivoComponent2 } from '../subir-archivo2/subir-archivo2.component';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;

@Component({
  selector: 'app-seccion-ficha12',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatDividerModule,
    Max3DigitsDirective, NumericInputDirective, Max4DigitsDirective, SubirArchivoComponent2
  ],
  templateUrl: './seccion-ficha12.component.html',
  styleUrls: ['./seccion-ficha12.component.scss']
})
export class SeccionFicha12Component implements OnInit, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha12: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar           = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada     = new EventEmitter<void>();

  // ===== Estado =====
  ficha12Form: FormGroup;
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
    
  constructor() {
    this.ficha12Form = this.fb.group({
      // Meta
      idFichas12: [null],
      idFicha:     [null],
      estado_s12:  [''],
      valida_s12:  [''],

      // 12.1 Tipo de plan (checkboxes independientes)
      p121Administrativo: [null as 'S' | null],
      p121Estructura:     [null as 'S' | null],
      p121Presupuesto:    [null as 'S' | null],

      p121Group:          [null as SN, Validators.required],

      // 12.2 Remesa consular (moneda) + tipo de cambio
      p1222023Sol:   [null, this.nonNegativeMoney2()],
      p1222023Dolar: [null, this.nonNegativeMoney2()],
      p1222024Sol:   [null, this.nonNegativeMoney2()],
      p1222024Dolar: [null, this.nonNegativeMoney2()],
      p1222025Sol:   [null, this.nonNegativeMoney2()],
      p1222025Dolar: [null, this.nonNegativeMoney2()],
      p122TipoCambio:[null, this.nonNegativeMoney2()], // NUMBER(4,2)

      // 12.3 Consulados Honorarios
      p123CantiConsula: [null, [Validators.required, this.nonNegativeInt()]],

      // 12.4 Invitaciones y eventos por año
      p1242023Invitaciom: [null, this.nonNegativeInt()],
      p1242023Eventos:    [null, this.nonNegativeInt()],
      p1242024Invitaciom: [null, this.nonNegativeInt()],
      p1242024Eventos:    [null, this.nonNegativeInt()],
      p1242025Invitaciom: [null, this.nonNegativeInt()],
      p1242025Eventos:    [null, this.nonNegativeInt()],

      // 12.5 Protocolo (Sí/No)
      p125Protocolo: [null as SN, Validators.required],

      // 12.6 Pedidos promedio al mes
      p126Pedidos: [null, [Validators.required, this.nonNegativeInt()]],

      // 12.7 Porcentaje por año (0–100)
      p127Porcentaje2023: [null, [this.nonNegativeInt(), Validators.max(100)]],
      p127Porcentaje2024: [null, [this.nonNegativeInt(), Validators.max(100)]],
      p127Porcentaje2025: [null, [this.nonNegativeInt(), Validators.max(100)]],

      p127Archivo: [null, Validators.required]

    });
  }

  

  ngOnInit(): void {
  this.idFicha = this.datosFicha12?.idFicha ?? null;
  if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

  if (this.datosFicha12) {
    this.populateForm(this.datosFicha12);
  } else {
    console.log(' [S12] Sección nueva detectada - activando validación de campos requeridos');
    this.showAllErrors = true;
    this.marcarCamposRequeridosComoTouched();
  }

  this.setupFxAutoCalc();
  this.requireAnyCheckbox(['p121Administrativo','p121Estructura','p121Presupuesto'], 'p121Group');

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

  private marcarCamposRequeridosComoTouched(): void {
  console.log('[S12] Marcando campos requeridos como touched...');
  
  const camposRequeridos = [
    'p121Group',        // 12.1 (checkboxes)
    'p123CantiConsula', // 12.3 (consulados)
    'p125Protocolo',    // 12.5 (protocolo)
    'p126Pedidos',      // 12.6 (pedidos)
    'p127Archivo'       // 12.7 (archivo)
  ];
  
  camposRequeridos.forEach(campo => {
    const control = this.f(campo);
    if (control) {
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
      control.updateValueAndValidity({ emitEvent: false });
      
      console.log(`   - ${campo}: touched=${control.touched}, valid=${control.valid}, errors=`, control.errors);
    }
  });
  
  console.log('✅ [S12] Campos requeridos marcados');
}


  /**
 * MÉTODO PARA MANEJAR ARCHIVO SUBIDO
 * Este método es llamado cuando el componente hijo emite el evento (archivoSubido)
 */
public onArchivoSubido(archivo: any): void {
  console.log('📎 [S12] Archivo subido:', archivo);
  
  if (archivo && archivo.nombre) {
    // Marcar como que sí hay archivo
    this.f('p127Archivo')?.setValue(archivo.nombre);
    this.f('p127Archivo')?.markAsTouched();
    this.f('p127Archivo')?.markAsDirty();
    
    console.log('✅ [S12] Control p127Archivo actualizado:', {
      value: this.f('p127Archivo')?.value,
      valid: this.f('p127Archivo')?.valid,
      touched: this.f('p127Archivo')?.touched
    });
  } else {
    // No hay archivo válido
    this.f('p127Archivo')?.setValue(null);
  }
}

/**
 * MÉTODO PARA MANEJAR ARCHIVO ELIMINADO
 * Este método es llamado cuando el componente hijo emite el evento (archivoEliminado)
 */
public onArchivoEliminado(): void {
  console.log('[S12] Archivo eliminado');
  
  this.f('p127Archivo')?.setValue(null);
  this.f('p127Archivo')?.markAsTouched();
  this.f('p127Archivo')?.markAsDirty();
  
  console.log('[S12] Control p127Archivo limpiado:', {
    value: this.f('p127Archivo')?.value,
    valid: this.f('p127Archivo')?.valid,
    touched: this.f('p127Archivo')?.touched
  });
}



private populateForm(d: any): void {
    this.idFicha = d?.idFicha ?? this.idFicha;
    this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    this.ficha12Form.patchValue({
      idFichas12: d.idFichas12 ?? null,
      idFicha:     d.idFicha ?? this.idFicha,
      estado_s12:  d.estado_s12 ?? '',
      valida_s12:  d.valida_s12 ?? '',
      p121Administrativo: d.p121Administrativo ?? null,
      p121Estructura:     d.p121Estructura ?? null,
      p121Presupuesto:    d.p121Presupuesto ?? null,
      p1222023Sol:    d.p1222023Sol ?? null,
      p1222023Dolar:  d.p1222023Dolar ?? null,
      p1222024Sol:    d.p1222024Sol ?? null,
      p1222024Dolar:  d.p1222024Dolar ?? null,
      p1222025Sol:    d.p1222025Sol ?? null,
      p1222025Dolar:  d.p1222025Dolar ?? null,
      p122TipoCambio: d.p122TipoCambio ?? null,
      p123CantiConsula: d.p123CantiConsula ?? null,
      p1242023Invitaciom: d.p1242023Invitaciom ?? null,
      p1242023Eventos:    d.p1242023Eventos ?? null,
      p1242024Invitaciom: d.p1242024Invitaciom ?? null,
      p1242024Eventos:    d.p1242024Eventos ?? null,
      p1242025Invitaciom: d.p1242025Invitaciom ?? null,
      p1242025Eventos:    d.p1242025Eventos ?? null,
      p125Protocolo: d.p125Protocolo ?? null,
      p126Pedidos: d.p126Pedidos ?? null,
      p127Porcentaje2023: d.p127Porcentaje2023 ?? null,
      p127Porcentaje2024: d.p127Porcentaje2024 ?? null,
      p127Porcentaje2025: d.p127Porcentaje2025 ?? null,
      p127Archivo: d.p127Archivo ?? null,

    }, { emitEvent: false });
    
      this.validarCheckboxGroup();

      const estado = d?.estado_s12 ?? '';


    if (estado !== 'C') {
    console.log('[S12] Sección NO completa (estado: ' + estado + ') - activando validación');
    this.showAllErrors = true;
    this.marcarCamposRequeridosComoTouched(); 
  } else {
    console.log('[S12] Sección completa (estado: C) - sin validación automática');
    this.showAllErrors = false;
  }


    this.ficha12Form.markAsPristine();
    console.debug('[S12] form poblado:', this.ficha12Form.getRawValue());
  }




  // ===== Helpers =====
  f(path: string) { return this.ficha12Form.get(path) as AbstractControl | null; }
   public showAllErrors = false; 

   public isInvalid(path: string): boolean {
      const c = this.f(path);
      const invalid = !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
      
      return invalid;
    }
    
  isChecked(name: string): boolean { return this.f(name)?.value === 'S'; }
  onCheck(name: string, ev: any) {
    const c = this.f(name); if (!c) return;
    const checked = !!ev?.checked;
    c.setValue(checked ? 'S' : null);
  }

  public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
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

  /** Acepta números >= 0 con hasta 2 decimales (para montos y tipo de cambio). */
  private nonNegativeMoney2() {
    const re = /^(?:\d+)(?:\.\d{1,2})?$/; // 0, 0.1, 10.25, etc.
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      return re.test(String(v)) ? null : { money2: true };
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
    console.warn('--- S12 INVÁLIDO ---');
    Object.keys(this.ficha12Form.controls).forEach(k => {
      const c = this.ficha12Form.get(k);
      if (c && c.invalid) {
        console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
    console.warn('Form errors (root):', this.ficha12Form.errors);
  }

  // ===== Guardar / Validar =====
  public guardarSeccion12(): void { this.guardarDatos('C'); }
  public guardarSeccion12Incompleta(): void { this.guardarDatos('I'); }




private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  this.ficha12Form.updateValueAndValidity({ emitEvent: false });
  
  // ✅ VALIDACIÓN: SI ESTABA COMPLETA (C) PERO AHORA ES INVÁLIDA → CAMBIAR A INCOMPLETA (I)
  const estadoActual = this.f('estado_s12')?.value;
  
  if (estadoActual === 'C' && this.ficha12Form.invalid) {
    console.warn('⚠️ [S12] Cambio de estado: C → I (campos requeridos sin completar)');
    
    estado = 'I'; // Forzar a Incompleta
    
    await Swal.fire({
      icon: 'warning',
      title: 'Sección cambiada a Incompleta',
      html: 'La sección tenía estado <strong>"Completa"</strong> pero ahora tiene campos requeridos sin completar.<br><br>Se guardará como <strong>"Incompleta"</strong>.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f39c12'
    });
  }
  
  // ✅ VALIDACIÓN NORMAL: SI SE INTENTA GUARDAR COMO COMPLETA PERO ES INVÁLIDA
  if (estado === 'C' && this.ficha12Form.invalid) {
    this.ficha12Form.markAllAsTouched();
    this.showAllErrors = true; 
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
      this.fichaService.guardarFichaSeccion12(payload).pipe(takeUntil(this.destroy$))
    );
    
    Swal.close();
    
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: resp?.mensaje || 'Sección 12 guardada correctamente',
      timer: 2000,
      showConfirmButton: false
    });

    // ✅ Actualizar estado en el formulario
    this.ficha12Form.patchValue({ estado_s12: estado }, { emitEvent: false });
    this.ficha12Form.markAsPristine();

    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estado); 

    localStorage.setItem('pantbc_s12', JSON.stringify(payload));
    
  } catch (e: any) {
    Swal.close();
    console.error('[S12 guardar ERR]', e?.status, e?.message, e?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la sección 12.',
      confirmButtonColor: '#e74c3c'
    });
  }
}

// private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
//   this.ficha12Form.updateValueAndValidity({ emitEvent: false });
  
//   // ✅ VALIDACIÓN: SI ESTABA COMPLETA (C) PERO AHORA ES INVÁLIDA → CAMBIAR A INCOMPLETA (I)
//   const estadoActual = this.f('estado_s12')?.value;
  
//   if (estadoActual === 'C' && this.ficha12Form.invalid) {
//     console.warn('⚠️ [S12] Cambio de estado: C → I (campos requeridos sin completar)');
    
//     estado = 'I'; // Forzar a Incompleta
    
//     await Swal.fire({
//       icon: 'warning',
//       title: 'Sección cambiada a Incompleta',
//       html: 'La sección tenía estado <strong>"Completa"</strong> pero ahora tiene campos requeridos sin completar.<br><br>Se guardará como <strong>"Incompleta"</strong>.',
//       confirmButtonText: 'Entendido',
//       confirmButtonColor: '#f39c12'
//     });
//   }
  
//   // ✅ VALIDACIÓN NORMAL: SI SE INTENTA GUARDAR COMO COMPLETA PERO ES INVÁLIDA
//   if (estado === 'C' && this.ficha12Form.invalid) {
//     this.ficha12Form.markAllAsTouched();
//     this.showAllErrors = true; // ✅ Mostrar todos los errores
//     this.logInvalids();
    
//     Swal.fire({
//       icon: 'warning',
//       title: 'Formulario Incompleto',
//       text: 'Completa los campos requeridos antes de guardar como "Completa".',
//       confirmButtonText: 'Revisar',
//       confirmButtonColor: '#e74c3c'
//     });
//     return;
//   }

//   const payload = this.prepareSaveData(estado);
  
//   Swal.fire({ 
//     title: 'Guardando...', 
//     allowOutsideClick: false, 
//     didOpen: () => Swal.showLoading() 
//   });
  
//   try {
//     const resp = await lastValueFrom(
//       this.fichaService.guardarFichaSeccion12(payload).pipe(takeUntil(this.destroy$))
//     );
    
//     Swal.close();
    
//     Swal.fire({
//       icon: 'success',
//       title: 'Listo',
//       text: resp?.mensaje || 'Sección 12 guardada correctamente',
//       timer: 2000,
//       showConfirmButton: false
//     });

//     // ✅ Actualizar estado en el formulario
//     this.ficha12Form.patchValue({ estado_s12: estado }, { emitEvent: false });
//     this.ficha12Form.markAsPristine();

//     this.onGuardar.emit();
//     this.onEstadoActualizado.emit(estado); // ✅ Emitir el estado correcto

//     localStorage.setItem('pantbc_s12', JSON.stringify(payload));
    
//   } catch (e: any) {
//     Swal.close();
//     console.error('[S12 guardar ERR]', e?.status, e?.message, e?.error);
    
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'No se pudo guardar la sección 12.',
//       confirmButtonColor: '#e74c3c'
//     });
//   }
// }

 public validarSeccion(): void {
    const estado = this.f('estado_s12')?.value;
    const idFichas12 = this.f('idFichas12')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas12, valida_s12: '1' };
    this.fichaService.validarFichaSeccion12(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s12')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 12 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S12:', err);
        Swal.fire('Error', 'No se pudo validar la sección 12.', 'error');
      }
    });
  }

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha12Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha12Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha12Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion12(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S12 autosave OK]', { estado }),
      error: (err) => console.error('[S12 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }

  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha12Form.getRawValue();
    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s12 = estado;
    return raw;
  }




  // 2) Utilidades PARA CALCULAR DOLARES EN 12.2
private round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

private toNum(v: any): number | null {
  if (v === null || v === '' || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// 3) Recalcula US$ para un año concreto
private recalcUsdFor(year: '2023'|'2024'|'2025'): void {
  const solCtrl = this.f(`p122${year}Sol`);
  const usdCtrl = this.f(`p122${year}Dolar`);
  const tcCtrl  = this.f('p122TipoCambio');
  if (!solCtrl || !usdCtrl || !tcCtrl) return;

  const vSol = this.toNum(solCtrl.value);
  const vTc  = this.toNum(tcCtrl.value);

  // Reglas: ambos deben ser válidos y tc > 0
  if (vSol !== null && vSol >= 0 && vTc !== null && vTc > 0) {
    const usd = this.round2(vSol / vTc); // TC en S/ por 1 USD
    if (usdCtrl.value !== usd) usdCtrl.setValue(usd, { emitEvent: false });
  } else {
    if (usdCtrl.value !== null) usdCtrl.setValue(null, { emitEvent: false });
  }
}

// 4) Suscripciones para soles y tipo de cambio
private setupFxAutoCalc(): void {
  const tcCtrl = this.f('p122TipoCambio');
  if (!tcCtrl) return;

  const years: Array<'2023'|'2024'|'2025'> = ['2023', '2024', '2025'];

  // Inicial: calcula con los valores actuales
  years.forEach(y => this.recalcUsdFor(y));

  // Si cambia el TC, recalcula todos los años
  tcCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
    years.forEach(y => this.recalcUsdFor(y));
  });

  // Si cambia el monto en soles de un año, recalcula solo ese año
  years.forEach(y => {
    const solCtrl = this.f(`p122${y}Sol`);
    solCtrl?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => this.recalcUsdFor(y));
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////

private requireAnyCheckbox(checkKeys: string[], anchorKey: string) {
  const anchor = this.f(anchorKey);
  if (!anchor) return;

  const apply = () => {
    const any = checkKeys.some(k => this.f(k)?.value === 'S');
    if (!any) {
      anchor.setErrors({ requireOne: true }, { emitEvent: false });
    } else {
      anchor.setErrors(null, { emitEvent: false });
    }
  };

  // Estado inicial
  apply();

  // Recalcular al cambiar cualquiera
  checkKeys.forEach(k => {
    this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      anchor.markAsTouched();  // para que muestre el error tras la primera interacción
      apply();
    });
  });
}

private validarCheckboxGroup(): void {
  console.log(' [S12] Validando grupo de checkboxes 12.1...');
  
  const checkKeys = ['p121Administrativo', 'p121Estructura', 'p121Presupuesto'];
  const anchor = this.f('p121Group');
  
  if (!anchor) {
    console.warn(' [S12] No se encontró el control p121Group');
    return;
  }
  
  // Verificar si al menos uno está marcado
  const any = checkKeys.some(k => {
    const value = this.f(k)?.value;
    console.log(`   - ${k}: ${value}`);
    return value === 'S';
  });
  
  // Actualizar estado de validación
  if (!any) {
    anchor.setErrors({ requireOne: true });
    console.log('Ningún checkbox marcado - estableciendo error');
  } else {
    anchor.setErrors(null);
    console.log('Al menos un checkbox marcado - sin error');
  }
  
  anchor.updateValueAndValidity({ emitEvent: false });
  
  console.log('[S12] Estado final p121Group:', {
    value: anchor.value,
    valid: anchor.valid,
    errors: anchor.errors
  });
}

//   private ctrl(path: string): AbstractControl | null { return this.ficha12Form.get(path); }

//   private anyChecked(keys: string[]): boolean {
//     return keys.some(k => !!this.ctrl(k)?.value);
//   }

//   public showGroupErrors = false;


//  private isGroupTouched(keys: string[]): boolean {
//   return keys.some(k => {
//     const c = this.f(k);
//     return !!c && (c.touched || c.dirty);
//   });
// }

// private readonly GROUP_CA121   = ['p121Administrativo', 'p121Estructura', 'p121Presupuesto'];

// get invalidCA121() {
//   const any = this.anyChecked(this.GROUP_CA121);
//   const shouldShow =
//     this.showAllErrors ||
//     this.showGroupErrors ||
//     this.isGroupTouched(this.GROUP_CA121);

//  return shouldShow && !any;
// }

}
