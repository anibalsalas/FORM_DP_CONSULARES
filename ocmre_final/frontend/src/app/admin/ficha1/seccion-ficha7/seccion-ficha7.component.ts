import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, inject,
  SimpleChanges
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
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatIconModule }       from '@angular/material/icon';
import { MatDividerModule }    from '@angular/material/divider';

import Swal from 'sweetalert2';

import { Ficha1Service } from '../ficha1.service';
//import { AuthService }   from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';

import { Max3DigitsDirective } from './max-3digits.directive';
import { NumericInputDirective } from './appNumericInput.directive';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;

@Component({
  selector: 'app-seccion-ficha7',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatDividerModule,
    Max3DigitsDirective, NumericInputDirective
  ],
  templateUrl: './seccion-ficha7.component.html',
  styleUrls: ['./seccion-ficha7.component.scss']
})
export class SeccionFicha7Component implements OnInit, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha7: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar             = new EventEmitter<void>();
  @Output() onEstadoActualizado   = new EventEmitter<string>();
  @Output() seccionValidada       = new EventEmitter<void>();

  // ===== Estado local =====
  ficha7Form: FormGroup;
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
  p74Rows = [
    { check: 'p74ALogistica',   gest: 'p74AGestiones',   suf: 'p74ASuficiente',   esp: 'p74AEspecifique' },
    { check: 'p74BInfra',       gest: 'p74BGestiones',   suf: 'p74BSuficiente',   esp: 'p74BEspecifique' },
    { check: 'p74CPersonal',    gest: 'p74CGestiones',   suf: 'p74CSuficiente',   esp: 'p74CEspecifique' },
    { check: 'p74DPresupuesto', gest: 'p74DGestiones',   suf: 'p74DSuficiente',   esp: 'p74DEspecifique' },
    { check: 'p74EOtro',        gest: 'p74EGestiones',   suf: 'p74ESuficiente',   esp: 'p74EEspecifique', otroDet: 'p74EOtroDetalle' },
  ];

  p76Instituciones = [
    'p76Mre','p76Reniec','p76Migraciones','p76Interpol','p76Inei',
    'p76Jne','p76Onpe','p76Sunarp','p76PoderJudicial','p76Otro'
  ];

  // Etiquetas reales (para que no salgan los nombres técnicos)
  private readonly LABELS: Record<string,string> = {
    // 7.4
    p74ALogistica: 'Logística',
    p74BInfra: 'Infraestructura',
    p74CPersonal: 'Personal',
    p74DPresupuesto: 'Presupuesto',
    p74EOtro: 'Otro',
    p74Ninguno: 'Ninguno',
    // 7.6
    p76Mre: 'MRE',
    p76Reniec: 'RENIEC',
    p76Migraciones: 'Migraciones',
    p76Interpol: 'INTERPOL',
    p76Inei: 'INEI',
    p76Jne: 'JNE',
    p76Onpe: 'ONPE',
    p76Sunarp: 'SUNARP',
    p76PoderJudicial: 'Poder Judicial',
    p76Otro: 'Otro(s)',
    //p76Ninguna: 'No ha recibido ninguna'
  };
  public pretty(key: string): string { return this.LABELS[key] ?? key; }


  private requireAtLeastOneP74(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha7Form) return null;
    
    const keys = ['p74ALogistica', 'p74BInfra', 'p74CPersonal', 'p74DPresupuesto', 'p74EOtro', 'p74Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha7Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

  constructor() {
    this.ficha7Form = this.fb.group({
      // Meta
      idFichas7: [null],
      idFicha:   [null],
      estado_s7: [''],
      valida_s7: [''],

      // ===== 7.1 / 7.2 =====
      p71Requiere:    [null as SN, Validators.required],
      p72Afirmativa:  [{ value: null as string | null, disabled: true }], // A..E

      // ===== 7.3 Conteos por año =====
      // 2023
      p732023SoliciHombre:  [null, this.nonNegativeInt()],
      p732023SoliciMujer:   [null, this.nonNegativeInt()],
      p732023SoliciMenores: [null, this.nonNegativeInt()],
      p732023OtorgaHombre:  [null, this.nonNegativeInt()],
      p732023OtorgaMujer:   [null, this.nonNegativeInt()],
      p732023OtorgaMenores: [null, this.nonNegativeInt()],
      p732023DenegaHombre:  [null, this.nonNegativeInt()],
      p732023DenegaMujer:   [null, this.nonNegativeInt()],
      p732023DenegaMenores: [null, this.nonNegativeInt()],
      p732023NumOficial:     [null, this.nonNegativeInt()],
      p732023NumDiplomatica: [null, this.nonNegativeInt()],
      p732023NumConsular:    [null, this.nonNegativeInt()],
      p732023NumNegocios:    [null, this.nonNegativeInt()],
      p732023NumTurista:     [null, this.nonNegativeInt()],
      p732023NumCooperante:  [null, this.nonNegativeInt()],
      p732023NumIntercambio: [null, this.nonNegativeInt()],
      p732023NumOtros:       [null, this.nonNegativeInt()],
      p732023NumOtrosDetalle: [''],

      // 2024
      p732024SoliciHombre:  [null, this.nonNegativeInt()],
      p732024SoliciMujer:   [null, this.nonNegativeInt()],
      p732024SoliciMenores: [null, this.nonNegativeInt()],
      p732024OtorgaHombre:  [null, this.nonNegativeInt()],
      p732024OtorgaMujer:   [null, this.nonNegativeInt()],
      p732024OtorgaMenores: [null, this.nonNegativeInt()],
      p732024DenegaHombre:  [null, this.nonNegativeInt()],
      p732024DenegaMujer:   [null, this.nonNegativeInt()],
      p732024DenegaMenores: [null, this.nonNegativeInt()],
      p732024NumOficial:     [null, this.nonNegativeInt()],
      p732024NumDiplomatica: [null, this.nonNegativeInt()],
      p732024NumConsular:    [null, this.nonNegativeInt()],
      p732024NumNegocios:    [null, this.nonNegativeInt()],
      p732024NumTurista:     [null, this.nonNegativeInt()],
      p732024NumCooperante:  [null, this.nonNegativeInt()],
      p732024NumIntercambio: [null, this.nonNegativeInt()],
      p732024NumOtros:       [null, this.nonNegativeInt()],
      p732024NumOtrosDetalle: [''],

      // 2025
      p732025SoliciHombre:  [null, this.nonNegativeInt()],
      p732025SoliciMujer:   [null, this.nonNegativeInt()],
      p732025SoliciMenores: [null, this.nonNegativeInt()],
      p732025OtorgaHombre:  [null, this.nonNegativeInt()],
      p732025OtorgaMujer:   [null, this.nonNegativeInt()],
      p732025OtorgaMenores: [null, this.nonNegativeInt()],
      p732025DenegaHombre:  [null, this.nonNegativeInt()],
      p732025DenegaMujer:   [null, this.nonNegativeInt()],
      p732025DenegaMenores: [null, this.nonNegativeInt()],
      p732025NumOficial:     [null, this.nonNegativeInt()],
      p732025NumDiplomatica: [null, this.nonNegativeInt()],
      p732025NumConsular:    [null, this.nonNegativeInt()],
      p732025NumNegocios:    [null, this.nonNegativeInt()],
      p732025NumTurista:     [null, this.nonNegativeInt()],
      p732025NumCooperante:  [null, this.nonNegativeInt()],
      p732025NumIntercambio: [null, this.nonNegativeInt()],
      p732025NumOtros:       [null, this.nonNegativeInt()],
      p732025NumOtrosDetalle: [''],

      // ===== 7.4 Matriz necesidades + Ninguno =====
      p74ALogistica:  [null as 'S' | null],
      p74AGestiones:  [{ value: null as SN, disabled: true }],
      p74ASuficiente: [{ value: null as SN, disabled: true }],
      p74AEspecifique:[{ value: '', disabled: true }],

      p74BInfra:      [null as 'S' | null],
      p74BGestiones:  [{ value: null as SN, disabled: true }],
      p74BSuficiente: [{ value: null as SN, disabled: true }],
      p74BEspecifique:[{ value: '', disabled: true }],

      p74CPersonal:   [null as 'S' | null],
      p74CGestiones:  [{ value: null as SN, disabled: true }],
      p74CSuficiente: [{ value: null as SN, disabled: true }],
      p74CEspecifique:[{ value: '', disabled: true }],

      p74DPresupuesto:[null as 'S' | null],
      p74DGestiones:  [{ value: null as SN, disabled: true }],
      p74DSuficiente: [{ value: null as SN, disabled: true }],
      p74DEspecifique:[{ value: '', disabled: true }],

      p74EOtro:       [null as 'S' | null],
      p74EGestiones:  [{ value: null as SN, disabled: true }],
      p74ESuficiente: [{ value: null as SN, disabled: true }],
      p74EEspecifique:[{ value: '', disabled: true }],
      p74EOtroDetalle:[{ value: '', disabled: true }],

      p74Ninguno: [null as 'S' | null],

      // ===== 7.5 / 7.6 =====
      p75Recibe: [null as SN, Validators.required],
      p76Mre:              [null as 'S' | null],
      p76Reniec:           [null as 'S' | null],
      p76Migraciones:      [null as 'S' | null],
      p76Interpol:         [null as 'S' | null],
      p76Inei:             [null as 'S' | null],
      p76Jne:              [null as 'S' | null],
      p76Onpe:             [null as 'S' | null],
      p76Sunarp:           [null as 'S' | null],
      p76PoderJudicial:    [null as 'S' | null],
      p76Otro:             [null as 'S' | null],
      p76OtroDetalle:      [{ value: '', disabled: true }],
      p76Ninguna:          [null as 'S' | null],

      p74Any: [null, this.requireAtLeastOneP74()],

    });
  }






  private populateForm(d: any): void {
  // Sincroniza idFicha
  this.idFicha = d?.idFicha ?? this.idFicha;
  this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

  this.ficha7Form.patchValue({
    // Meta
    idFichas7: d.idFichas7 ?? null,
    idFicha:   d.idFicha ?? this.idFicha,
    estado_s7: d.estado_s7 ?? '',
    valida_s7: d.valida_s7 ?? '',

    // 7.1 / 7.2
    p71Requiere:   d.p71Requiere ?? null,
    p72Afirmativa: d.p72Afirmativa ?? null,

    // 7.3 A) Solicitadas / Otorgadas / Denegadas (2023)
    p732023SoliciHombre:  d.p732023SoliciHombre  ?? null,
    p732023SoliciMujer:   d.p732023SoliciMujer   ?? null,
    p732023SoliciMenores: d.p732023SoliciMenores ?? null,
    p732023OtorgaHombre:  d.p732023OtorgaHombre  ?? null,
    p732023OtorgaMujer:   d.p732023OtorgaMujer   ?? null,
    p732023OtorgaMenores: d.p732023OtorgaMenores ?? null,
    p732023DenegaHombre:  d.p732023DenegaHombre  ?? null,
    p732023DenegaMujer:   d.p732023DenegaMujer   ?? null,
    p732023DenegaMenores: d.p732023DenegaMenores ?? null,

    // (Si tu backend también trae 2024/2025 por sexo, se mapean; si no, quedan null sin problema)
    p732024SoliciHombre:  d.p732024SoliciHombre  ?? null,
    p732024SoliciMujer:   d.p732024SoliciMujer   ?? null,
    p732024SoliciMenores: d.p732024SoliciMenores ?? null,
    p732024OtorgaHombre:  d.p732024OtorgaHombre  ?? null,
    p732024OtorgaMujer:   d.p732024OtorgaMujer   ?? null,
    p732024OtorgaMenores: d.p732024OtorgaMenores ?? null,
    p732024DenegaHombre:  d.p732024DenegaHombre  ?? null,
    p732024DenegaMujer:   d.p732024DenegaMujer   ?? null,
    p732024DenegaMenores: d.p732024DenegaMenores ?? null,

    p732025SoliciHombre:  d.p732025SoliciHombre  ?? null,
    p732025SoliciMujer:   d.p732025SoliciMujer   ?? null,
    p732025SoliciMenores: d.p732025SoliciMenores ?? null,
    p732025OtorgaHombre:  d.p732025OtorgaHombre  ?? null,
    p732025OtorgaMujer:   d.p732025OtorgaMujer   ?? null,
    p732025OtorgaMenores: d.p732025OtorgaMenores ?? null,
    p732025DenegaHombre:  d.p732025DenegaHombre  ?? null,
    p732025DenegaMujer:   d.p732025DenegaMujer   ?? null,
    p732025DenegaMenores: d.p732025DenegaMenores ?? null,

    // 7.3 B) N° otorgadas por calidad migratoria
    // 2023
    p732023NumOficial:     d.p732023NumOficial     ?? null,
    p732023NumDiplomatica: d.p732023NumDiplomatica ?? null,
    p732023NumConsular:    d.p732023NumConsular    ?? null,
    p732023NumNegocios:    d.p732023NumNegocios    ?? null,
    p732023NumTurista:     d.p732023NumTurista     ?? null,
    p732023NumCooperante:  d.p732023NumCooperante  ?? null,
    p732023NumIntercambio: d.p732023NumIntercambio ?? null,
    p732023NumOtros:       d.p732023NumOtros       ?? null,
    p732023NumOtrosDetalle: d.p732023NumOtrosDetalle ?? '',

    // 2024
    p732024NumOficial:     d.p732024NumOficial     ?? null,
    p732024NumDiplomatica: d.p732024NumDiplomatica ?? null,
    p732024NumConsular:    d.p732024NumConsular    ?? null,
    p732024NumNegocios:    d.p732024NumNegocios    ?? null,
    p732024NumTurista:     d.p732024NumTurista     ?? null,
    p732024NumCooperante:  d.p732024NumCooperante  ?? null,
    p732024NumIntercambio: d.p732024NumIntercambio ?? null,
    p732024NumOtros:       d.p732024NumOtros       ?? null,
    p732024NumOtrosDetalle: d.p732024NumOtrosDetalle ?? '',

    // 2025
    p732025NumOficial:     d.p732025NumOficial     ?? null,
    p732025NumDiplomatica: d.p732025NumDiplomatica ?? null,
    p732025NumConsular:    d.p732025NumConsular    ?? null,
    p732025NumNegocios:    d.p732025NumNegocios    ?? null,
    p732025NumTurista:     d.p732025NumTurista     ?? null,
    p732025NumCooperante:  d.p732025NumCooperante  ?? null,
    p732025NumIntercambio: d.p732025NumIntercambio ?? null,
    p732025NumOtros:       d.p732025NumOtros       ?? null,
    p732025NumOtrosDetalle: d.p732025NumOtrosDetalle ?? '',

    // 7.4 Matriz necesidades
    p74ALogistica:  d.p74ALogistica  ?? null,
    p74AGestiones:  d.p74AGestiones  ?? null,
    p74ASuficiente: d.p74ASuficiente ?? null,
    p74AEspecifique:d.p74AEspecifique ?? '',
    p74BInfra:      d.p74BInfra      ?? null,
    p74BGestiones:  d.p74BGestiones  ?? null,
    p74BSuficiente: d.p74BSuficiente ?? null,
    p74BEspecifique:d.p74BEspecifique ?? '',
    p74CPersonal:   d.p74CPersonal   ?? null,
    p74CGestiones:  d.p74CGestiones  ?? null,
    p74CSuficiente: d.p74CSuficiente ?? null,
    p74CEspecifique:d.p74CEspecifique ?? '',
    p74DPresupuesto:d.p74DPresupuesto ?? null,
    p74DGestiones:  d.p74DGestiones  ?? null,
    p74DSuficiente: d.p74DSuficiente ?? null,
    p74DEspecifique:d.p74DEspecifique ?? '',
    p74EOtro:       d.p74EOtro       ?? null,
    p74EGestiones:  d.p74EGestiones  ?? null,
    p74ESuficiente: d.p74ESuficiente ?? null,
    p74EEspecifique:d.p74EEspecifique ?? '',
    p74EOtroDetalle:d.p74EOtroDetalle ?? '',
    p74Ninguno:     d.p74Ninguno     ?? null,

    // 7.5 / 7.6
    p75Recibe:         d.p75Recibe ?? null,
    p76Mre:            d.p76Mre ?? null,
    p76Reniec:         d.p76Reniec ?? null,
    p76Migraciones:    d.p76Migraciones ?? null,
    p76Interpol:       d.p76Interpol ?? null,
    p76Inei:           d.p76Inei ?? null,
    p76Jne:            d.p76Jne ?? null,
    p76Onpe:           d.p76Onpe ?? null,
    p76Sunarp:         d.p76Sunarp ?? null,
    p76PoderJudicial:  d.p76PoderJudicial ?? null,
    p76Otro:           d.p76Otro ?? null,
    p76OtroDetalle:    d.p76OtroDetalle ?? '',
    p76Ninguna:        d.p76Ninguna ?? null,
  }, { emitEvent: false });

  this.f('p74Any')?.updateValueAndValidity({ emitEvent: false });

  if ((d?.estado_s7 ?? '') !== 'C') {
  this.showAllErrors = true;        // ⬅️ clave para persistir mensajes
  this.persistRequiredErrors();     // opcional pero recomendado
}

  this.ficha7Form.markAsPristine();
  console.debug('[S7] form poblado:', this.ficha7Form.getRawValue());
}


private persistRequiredErrors(): void {
  const keys = Object.keys(this.ficha7Form.controls);
  keys.forEach(k => {
    const c = this.ficha7Form.get(k);
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

  public showGroupErrors = false;


  get showP74GroupError(): boolean {
    const anyCtrl = this.f('p74Any');
    const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
    return !!(shouldShow && anyCtrl?.invalid);
  }

  // ===== Ciclo de vida =====
  ngOnInit(): void {
    // idFicha desde input
    this.idFicha = this.datosFicha7?.idFicha ?? null;
    if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    // Cargar datos si existen
    if (this.datosFicha7) this.populateForm(this.datosFicha7);

    // 7.1 -> 7.2 (radio habilita radio)
    this.bindYesEnables('p71Requiere', 'p72Afirmativa', [Validators.required]);

    // Matriz 7.4
    this.setupMatrix(this.p74Rows, 'p74Ninguno');

    // Gestiones -> Suficiencia (grupo radio dependiente) en 7.4
    this.bindYesEnables('p74AGestiones', 'p74ASuficiente', [Validators.required]);
    this.bindYesEnables('p74BGestiones', 'p74BSuficiente', [Validators.required]);
    this.bindYesEnables('p74CGestiones', 'p74CSuficiente', [Validators.required]);
    this.bindYesEnables('p74DGestiones', 'p74DSuficiente', [Validators.required]);
    this.bindYesEnables('p74EGestiones', 'p74ESuficiente', [Validators.required]);

    // 7.5 (radio) -> 7.6 (grupo de checkboxes, requiere al menos 1 si p75Recibe='S')
    this.bindYesRequiresAnyCheckboxSimple(
      'p75Recibe',
      this.p76Instituciones,
      'p76Group',
      'p76Ninguna',
      'p76Otro',
      'p76OtroDetalle'
    );

    // Autosave si te interesa
    if (this.activarAutosave && !this.autosaveLanzado) {
      this.autosaveSilencioso();
      this.autosaveLanzado = true;
    }
  }


  private shouldAutosave(initial = false): boolean {
    if (!this.idFicha && !this.f('idFicha')?.value) return false;
    if (initial) return true;             // fuerza en apertura
    return this.ficha7Form.dirty;         // después, solo si hay cambios
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFicha7']?.currentValue) {
      this.populateForm(changes['datosFicha7'].currentValue);
    }

    // Y en ngOnChanges:
    if (changes['activarAutosave']?.currentValue === true && !this.autosaveLanzado) {
      if (this.shouldAutosave(true)) {      // <— fuerza primera vez
        this.autosaveSilencioso();
        this.autosaveLanzado = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== Helpers de acceso =====
  f(path: string) { return this.ficha7Form.get(path) as AbstractControl | null; }
  
  public showAllErrors = false; // Mantiene visibles los errores

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
  
  // ✅ AGREGAR: Revalidar el control oculto de P7.4
  const p74Keys = ['p74ALogistica', 'p74BInfra', 'p74CPersonal', 'p74DPresupuesto', 'p74EOtro', 'p74Ninguno'];
  if (p74Keys.includes(name)) {
    this.f('p74Any')?.updateValueAndValidity({ emitEvent: false });
  }
}

  isDisabled76(name: string): boolean {
    const c = this.f(name);
    return !c || c.disabled || this.f('p75Recibe')?.value !== 'S';
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


    public charLen(controlName: string): number {
          const v = this.f(controlName)?.value;
          return typeof v === 'string' ? v.length : 0;
        }
        

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


  // ===== Guardar / Validar =====
  public guardarSeccion7(): void { this.guardarDatos('C'); }
  public guardarSeccion7Incompleta(): void { this.guardarDatos('I'); }


  private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
  // Sincronizo validadores condicionales antes de decidir
  this.p74Rows?.forEach((r: any) => this.refreshRowValidators(r));
  
  this.ficha7Form.updateValueAndValidity({ emitEvent: false });
  
  if (estado === 'C' && this.ficha7Form.invalid) {
    this.ficha7Form.markAllAsTouched();
    
    //  Activo visualización de errores
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
      this.fichaService.guardarFichaSeccion7(payload).pipe(takeUntil(this.destroy$))
    );
    Swal.close();
    Swal.fire('Listo', resp?.mensaje || 'Sección 7 guardada', 'success');

    //  Limpia errores después de guardar exitosamente
    this.showAllErrors = false;
    this.showGroupErrors = false;

    this.ficha7Form.patchValue({ estado_s7: estado }, { emitEvent: false });
    this.ficha7Form.markAsPristine();

    this.onGuardar.emit();
    this.onEstadoActualizado.emit(payload.estado_s7);

    localStorage.setItem('pantbc_s7', JSON.stringify(payload));
  } catch (e: any) {
    Swal.close();
    console.error('[S7 guardar ERR]', e?.status, e?.message, e?.error);
    Swal.fire('Error', 'No se pudo guardar la sección 7.', 'error');
  }
}

  // private async guardarDatos(estado: 'C' | 'I'): Promise<void> {


  //   // Sincroniza validadores condicionales antes de decidir
  //     this.p74Rows?.forEach((r: any) => this.refreshRowValidators(r));
    
  //   this.ficha7Form.updateValueAndValidity({ emitEvent: false });
  //   if (estado === 'C' && this.ficha7Form.invalid) {
  //     this.ficha7Form.markAllAsTouched();
  //     this.logInvalids();
  //     Swal.fire('Formulario Incompleto', 'Completa los campos requeridos.', 'warning');
  //     return;
  //   }

  //   const payload = this.prepareSaveData(estado);
  //   Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //   try {
  //     const resp = await lastValueFrom(
  //       this.fichaService.guardarFichaSeccion7(payload).pipe(takeUntil(this.destroy$))
  //     );
  //     Swal.close();
  //     Swal.fire('Listo', resp?.mensaje || 'Sección 7 guardada', 'success');

  //     this.ficha7Form.patchValue({ estado_s7: estado }, { emitEvent: false });
  //     this.ficha7Form.markAsPristine();

  //     this.onGuardar.emit();
  //     this.onEstadoActualizado.emit(payload.estado_s7);

  //     localStorage.setItem('pantbc_s7', JSON.stringify(payload));
  //   } catch (e: any) {
  //     Swal.close();
  //     console.error('[S7 guardar ERR]', e?.status, e?.message, e?.error);
  //     Swal.fire('Error', 'No se pudo guardar la sección 7.', 'error');
  //   }
  // }

  public validarSeccion(): void {
    const estado = this.f('estado_s7')?.value;
    const idFichas7 = this.f('idFichas7')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas7, valida_s7: '1' };
    this.fichaService.validarFichaSeccion7(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s7')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 7 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S7:', err);
        Swal.fire('Error', 'No se pudo validar la sección 7.', 'error');
      }
    });
  }

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha7Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha7Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha7Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion7(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S7 autosave OK]', { estado }),
      error: (err) => console.error('[S7 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }

  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha7Form.getRawValue();
    delete raw.p74Any;

    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s7 = estado;
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
    console.warn('--- S7 INVÁLIDO ---');
    Object.keys(this.ficha7Form.controls).forEach(k => {
      const c = this.ficha7Form.get(k);
      if (c && c.invalid) {
        console.warn(`❌ ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
    console.warn('Form errors (root):', this.ficha7Form.errors);
  }
}
