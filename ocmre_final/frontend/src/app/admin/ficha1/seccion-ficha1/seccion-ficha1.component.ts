import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, AbstractControl, ValidatorFn, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';

import { Ficha1Service } from '../ficha1.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Max4DigitsDirective } from './max-4digits.directive';
import { environment } from '../../../../environments/environment';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY' }
};

@Component({
  selector: 'app-seccion-ficha1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTableModule, MatRadioModule, Max4DigitsDirective],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './seccion-ficha1.component.html',
  styleUrls: ['./seccion-ficha1.component.scss']
})
export class SeccionFicha1Component implements OnInit, OnChanges, OnDestroy {

  @Input() datosFicha1: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  roles: string[] = [];
  ficha1Form: FormGroup;
  private destroy$ = new Subject<void>();
  private idFicha: number | null = null;
  private autosaveLanzado = false;
  private hydrating = false;

  rolAdministrador: string = environment.rolAdministrador;
  rolComisionado: string = environment.rolComisionado;
  rolEspecialista: string = environment.rolEspecialista;

  displayedColumnsPoblacion: string[] = ['descripcion', 'col_0_12', 'col_13_17', 'col_18_64', 'col_65_mas', 'col_desconoce'];
  displayedColumnsCertificados: string[] = ['periodo', 'numero'];
  displayedColumnsNecesidades: string[] = ['tipo', 'checkbox', 'gestion', 'suficiente', 'observaciones'];

  periodosCertificados = [
    { periodo: '2022', control: 'p114Cert2022' },
    { periodo: '2023', control: 'p114Cert2023' },
    { periodo: '2024', control: 'p114Cert2024' },
    { periodo: '2025*', control: 'p114Cert2025' }
  ];

  necesidadesData = [
    { tipo: 'Logística', checkControl: 'p115NecLogistica', gestionControl: 'p115LogGestion', suficienteControl: 'p115LogSuficiente', observacionesControl: 'p115LogObservaciones' },
    { tipo: 'Infraestructura', checkControl: 'p115NecInfraestructura', gestionControl: 'p115InfGestion', suficienteControl: 'p115InfSuficiente', observacionesControl: 'p115InfObservaciones' },
    { tipo: 'Personal', checkControl: 'p115NecPersonal', gestionControl: 'p115PerGestion', suficienteControl: 'p115PerSuficiente', observacionesControl: 'p115PerObservaciones' },
    { tipo: 'Presupuesto', checkControl: 'p115NecPresupuesto', gestionControl: 'p115PreGestion', suficienteControl: 'p115PreSuficiente', observacionesControl: 'p115PreObservaciones' },
    { tipo: 'Otro, especifique:', checkControl: 'p115NecOtro', especifiqueControl: 'p115OtrEspecifique', gestionControl: 'p115OtrGestion', suficienteControl: 'p115OtrSuficiente', observacionesControl: 'p115OtrObservaciones' }
  ];

  private readonly P117_MAP: Record<string, string> = {
    p117A: 'p117a', p117B: 'p117b', p117C: 'p117c', p117D: 'p117d', p117E: 'p117e', p117F: 'p117f',
    p117G: 'p117g', p117H: 'p117h', p117I: 'p117i', p117J: 'p117j', p117K: 'p117k', p117Jotro: 'p117jotro',
  };

  private readonly P111_MAP: Record<string, string> = {
    p111HombresDesconoce: 'p111HombresDesconoce',
    p111HombDiscapDesconoce: 'p111HombDiscapDesconoce',
    p111MujeresDesconoce: 'p111MujeresDesconoce',
    p111MujDiscapDesconoce: 'p111MujDiscapDesconoce',
  };

  private readonly fb = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService = inject(AuthService);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly DISABILITY_PAIRS = [
    { total: 'p111Hombres012', discap: 'p111HombDiscap012' },
    { total: 'p111Hombres1317', discap: 'p111HombDiscap1317' },
    { total: 'p111Hombres1864', discap: 'p111HombDiscap1864' },
    { total: 'p111Hombres65Mas', discap: 'p111HombDiscap65Mas' },
    { total: 'p111Mujeres012', discap: 'p111MujDiscap012' },
    { total: 'p111Mujeres1317', discap: 'p111MujDiscap1317' },
    { total: 'p111Mujeres1864', discap: 'p111MujDiscap1864' },
    { total: 'p111Mujeres65Mas', discap: 'p111MujDiscap65Mas' }
  ];

  private readonly ROWS_DESCONOCE: Record<string, string[]> = {
    p111HombresDesconoce: ['p111Hombres012','p111Hombres1317','p111Hombres1864','p111Hombres65Mas'],
    p111HombDiscapDesconoce: ['p111HombDiscap012','p111HombDiscap1317','p111HombDiscap1864','p111HombDiscap65Mas'],
    p111MujeresDesconoce: ['p111Mujeres012','p111Mujeres1317','p111Mujeres1864','p111Mujeres65Mas'],
    p111MujDiscapDesconoce: ['p111MujDiscap012','p111MujDiscap1317','p111MujDiscap1864','p111MujDiscap65Mas'],
  };

  private readonly GROUP_CA116 = ['p117A','p117B','p117C','p117D','p117E','p117F','p117G','p117H','p117I','p117J'];
  today: Date = new Date();
  public showAllErrors = false;
  public showGroupErrors = false;

  constructor() {
    this.dateAdapter.setLocale('es-PE');
    this.ficha1Form = this.createForm();
    this.setupFormListeners();
    this.wireP111Totals();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      idFicha: [null],
      idFichas1: [null],
      estado_s1: [''],
      valida_s1: [''],

      // 👇 FIX: SIN Validators.required en discapacidad
      p111Hombres012: [null, [this.nonNegativeInt()]],
      p111Hombres1317: [null, [this.nonNegativeInt()]],
      p111Hombres1864: [null, [this.nonNegativeInt()]],
      p111Hombres65Mas: [null, [this.nonNegativeInt()]],

      p111HombDiscap012: [null, [this.nonNegativeInt()]],
      p111HombDiscap1317: [null, [this.nonNegativeInt()]],
      p111HombDiscap1864: [null, [this.nonNegativeInt()]],
      p111HombDiscap65Mas: [null, [this.nonNegativeInt()]],

      p111Mujeres012: [null, [this.nonNegativeInt()]],
      p111Mujeres1317: [null, [this.nonNegativeInt()]],
      p111Mujeres1864: [null, [this.nonNegativeInt()]],
      p111Mujeres65Mas: [null, [this.nonNegativeInt()]],

      p111MujDiscap012: [null, [this.nonNegativeInt()]],
      p111MujDiscap1317: [null, [this.nonNegativeInt()]],
      p111MujDiscap1864: [null, [this.nonNegativeInt()]],
      p111MujDiscap65Mas: [null, [this.nonNegativeInt()]],

      p111Total012: [{ value: 0, disabled: true }],
      p111Total1317: [{ value: 0, disabled: true }],
      p111Total1864: [{ value: 0, disabled: true }],
      p111Total65Mas: [{ value: 0, disabled: true }],
      p111TotalDesconoce: [{ value: 0, disabled: true }],

      p112FechaAct: [null, [Validators.required]],
      p113PorcNoInsc: [null, [Validators.required, Validators.min(0), Validators.max(100)]],

      p114Cert2022: [null, [Validators.required, this.nonNegativeInt()]],
      p114Cert2023: [null, [Validators.required, this.nonNegativeInt()]],
      p114Cert2024: [null, [Validators.required, this.nonNegativeInt()]],
      p114Cert2025: [null, [this.nonNegativeInt()]],

      p115NecLogistica: [null],
      p115LogGestion: [{ value: null, disabled: true }],
      p115LogSuficiente: [{ value: null, disabled: true }],
      p115LogObservaciones: [''],
      p115NecInfraestructura: [null],
      p115InfGestion: [{ value: null, disabled: true }],
      p115InfSuficiente: [{ value: null, disabled: true }],
      p115InfObservaciones: [''],
      p115NecPersonal: [null],
      p115PerGestion: [{ value: null, disabled: true }],
      p115PerSuficiente: [{ value: null, disabled: true }],
      p115PerObservaciones: [''],
      p115NecPresupuesto: [null],
      p115PreGestion: [{ value: null, disabled: true }],
      p115PreSuficiente: [{ value: null, disabled: true }],
      p115PreObservaciones: [''],
      p115NecOtro: [null],
      p115OtrEspecifique: [{ value: '', disabled: true }],
      p115OtrGestion: [{ value: null, disabled: true }],
      p115OtrSuficiente: [{ value: null, disabled: true }],
      p115OtrObservaciones: [''],
      p115NecNinguno: [null],

      p116RecibeCapac: [null, [Validators.required]],

      p117A: [{ value: false, disabled: true }],
      p117B: [{ value: false, disabled: true }],
      p117C: [{ value: false, disabled: true }],
      p117D: [{ value: false, disabled: true }],
      p117E: [{ value: false, disabled: true }],
      p117F: [{ value: false, disabled: true }],
      p117G: [{ value: false, disabled: true }],
      p117H: [{ value: false, disabled: true }],
      p117I: [{ value: false, disabled: true }],
      p117J: [{ value: false, disabled: true }],
      p117Jotro: [{ value: '', disabled: true }, [Validators.maxLength(200)]],
      p117K: [{ value: false, disabled: true }],

      p111HombresDesconoce: [false],
      p111HombDiscapDesconoce: [false],
      p111MujeresDesconoce: [false],
      p111MujDiscapDesconoce: [false],
    });
  }

  ngOnInit(): void {
    this.ficha1Form.updateValueAndValidity({ emitEvent: false });
    console.debug('[S1] Componente inicializado');
    this.setupP117Listeners();

    // 👇 Suscribirse a cambios en población
    this.DISABILITY_PAIRS.forEach(pair => {
      this.f(pair.total)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => 
        this.syncDisabilityValidation(pair.total, pair.discap)
      );
    });

    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFicha1']?.currentValue) {
      this.populateForm(changes['datosFicha1'].currentValue);
      
      // Deshabilitar todos primero
      this.DISABILITY_PAIRS.forEach(pair => {
        this.f(pair.discap)?.disable({ emitEvent: false });
        this.f(pair.discap)?.clearValidators();
        this.f(pair.discap)?.updateValueAndValidity({ emitEvent: false });
      });

      // Luego re-sincronizar
      this.DISABILITY_PAIRS.forEach(pair => {
        this.syncDisabilityValidation(pair.total, pair.discap);
      });

      this.refreshAllDisabilityStates();
      this.cdr.markForCheck();
    }

    if (changes['activarAutosave']?.currentValue === true && !this.autosaveLanzado) {
      if (this.shouldAutosave()) {
        this.autosaveSilencioso();
        this.autosaveLanzado = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 👇 FIX #2: Sincronizar validación de discapacidad
  private syncDisabilityValidation(totalKey: string, discapKey: string): void {
    const totalCtrl = this.f(totalKey);
    const discapCtrl = this.f(discapKey);

    if (!totalCtrl || !discapCtrl) return;

    const totalValue = totalCtrl.value;
    const isPopulated = totalValue !== null && totalValue !== undefined && totalValue !== '' && Number(totalValue) > 0;

    if (isPopulated) {
      discapCtrl.enable({ emitEvent: false });
      discapCtrl.clearValidators();
      discapCtrl.setValidators([
        this.nonNegativeInt(),
        this.maxDisabilityValidator(totalValue)
      ]);
    } else {
      discapCtrl.disable({ emitEvent: false });
      discapCtrl.setValue(null, { emitEvent: false });
      discapCtrl.clearValidators();
    }

    discapCtrl.updateValueAndValidity({ emitEvent: false });
    this.cdr.markForCheck();
  }

  // 👇 FIX #4: Validador personalizado
  private maxDisabilityValidator(maxValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') return null;

      const num = Number(value);
      if (!Number.isFinite(num) || !Number.isInteger(num)) return { invalidNumber: true };

      if (num > maxValue) {
        return { maxDisabilityExceeded: { actual: num, max: maxValue } };
      }
      return null;
    };
  }

  private refreshAllDisabilityStates(): void {
    this.DISABILITY_PAIRS.forEach(pair => {
      this.syncDisabilityValidation(pair.total, pair.discap);
    });
  }

  private applyRowDisableState(flagControlName: string): void {
    const flag = this.f(flagControlName)?.value === 'S';
    const fields = this.ROWS_DESCONOCE[flagControlName] || [];

    fields.forEach(name => {
      const ctrl = this.f(name);
      if (!ctrl) return;

      if (flag) {
        ctrl.disable({ emitEvent: false });
        ctrl.setValue(null, { emitEvent: false });
        ctrl.clearValidators();
      } else {
        ctrl.enable({ emitEvent: false });
        ctrl.setValidators([this.nonNegativeInt()]);
      }
      ctrl.updateValueAndValidity({ emitEvent: false });
    });

    if ((this as any).recomputePoblacion) {
      (this as any).recomputePoblacion();
    }
  }

  public onCheckboxChange11(flagControlName: string, event: any): void {
    const checked = !!event?.checked;
    this.f(flagControlName)?.setValue(checked ? 'S' : null, { emitEvent: false });
    this.applyRowDisableState(flagControlName);
    this.cdr.markForCheck();
  }

  private n(name: string): number {
    const v = this.f(name)?.value;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  private set(name: string, value: number): void {
    this.f(name)?.setValue(value, { emitEvent: false });
  }

  private recomputeP111Totals(): void {
    const t012 = this.n('p111Hombres012') + this.n('p111Mujeres012');
    const t1317 = this.n('p111Hombres1317') + this.n('p111Mujeres1317');
    const t1864 = this.n('p111Hombres1864') + this.n('p111Mujeres1864');
    const t65Mas = this.n('p111Hombres65Mas') + this.n('p111Mujeres65Mas');

    this.set('p111Total012', t012);
    this.set('p111Total1317', t1317);
    this.set('p111Total1864', t1864);
    this.set('p111Total65Mas', t65Mas);
    this.cdr.markForCheck();
  }

  private wireP111Totals(): void {
    const keys = [
      'p111Hombres012','p111Hombres1317','p111Hombres1864','p111Hombres65Mas',
      'p111Mujeres012','p111Mujeres1317','p111Mujeres1864','p111Mujeres65Mas',
    ];
    keys.forEach(k => {
      this.f(k)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.recomputeP111Totals());
    });
    this.recomputeP111Totals();
  }

  // ===== 1.1.5 Necesidades =====
  private setupFormListeners(): void {
    this.f('p115NecNinguno')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((valor: any) => {
      const marcado = valor === true || valor === 'S';
      if (marcado) {
        if (valor === true) this.f('p115NecNinguno')?.setValue('S', { emitEvent: false });
        this.f('p115NecLogistica')?.setValue(null, { emitEvent: false });
        this.f('p115NecInfraestructura')?.setValue(null, { emitEvent: false });
        this.f('p115NecPersonal')?.setValue(null, { emitEvent: false });
        this.f('p115NecPresupuesto')?.setValue(null, { emitEvent: false });
        this.f('p115NecOtro')?.setValue(null, { emitEvent: false });
        this.disableNecesidadesFields('logistica');
        this.disableNecesidadesFields('infraestructura');
        this.disableNecesidadesFields('personal');
        this.disableNecesidadesFields('presupuesto');
        this.disableNecesidadesFields('otro');
      } else if (valor === false) {
        this.f('p115NecNinguno')?.setValue(null, { emitEvent: false });
      }
      this.updateCheckboxValidators();
      this.cdr.markForCheck();
    });

    const filas: Array<{ctrl: string; tipo: 'logistica'|'infraestructura'|'personal'|'presupuesto'|'otro'}> = [
      { ctrl: 'p115NecLogistica', tipo: 'logistica' },
      { ctrl: 'p115NecInfraestructura', tipo: 'infraestructura' },
      { ctrl: 'p115NecPersonal', tipo: 'personal' },
      { ctrl: 'p115NecPresupuesto', tipo: 'presupuesto' },
      { ctrl: 'p115NecOtro', tipo: 'otro' },
    ];

    filas.forEach(({ctrl, tipo}) => {
      this.f(ctrl)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((valor: any) => {
        const marcado = valor === true || valor === 'S';
        if (marcado) {
          if (valor === true) this.f(ctrl)?.setValue('S', { emitEvent: false });
          this.f('p115NecNinguno')?.setValue(null, { emitEvent: false });
          this.enableNecesidadesFields(tipo);
        } else {
          if (valor === false) this.f(ctrl)?.setValue(null, { emitEvent: false });
          this.disableNecesidadesFields(tipo);
        }
        this.updateCheckboxValidators();
        this.cdr.markForCheck();
      });
    });

    this.f('p117K')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
      const marcado = (v === 'S' || v === true);
      if (marcado) {
        ['p117A','p117B','p117C','p117D','p117E','p117F','p117G','p117H','p117I','p117J']
          .forEach(n => this.f(n)?.setValue('', { emitEvent:false }));
        this.onOtroCheckboxChange('p117J','p117Jotro');
        this.cdr.markForCheck();
      }
    });

    this.updateCheckboxValidators();
    this.bindGestionSuficiente('p115LogGestion', 'p115LogSuficiente');
    this.bindGestionSuficiente('p115InfGestion', 'p115InfSuficiente');
    this.bindGestionSuficiente('p115PerGestion', 'p115PerSuficiente');
    this.bindGestionSuficiente('p115PreGestion', 'p115PreSuficiente');
    this.bindGestionSuficiente('p115OtrGestion', 'p115OtrSuficiente');

    const p116Ctrl = this.f('p116RecibeCapac');
    if (p116Ctrl) {
      this.applyCapacitacionesState(p116Ctrl.value);
      p116Ctrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
        this.applyCapacitacionesState(val);
      });
    }
  }

  private enableNecesidadesFields(tipo: string): void {
    const prefix = tipo === 'logistica' ? 'Log' : tipo === 'infraestructura' ? 'Inf' : tipo === 'personal' ? 'Per' : tipo === 'presupuesto' ? 'Pre' : 'Otr';
    const g = this.f(`p115${prefix}Gestion`);
    const s = this.f(`p115${prefix}Suficiente`);
    const o = this.f(`p115${prefix}Observaciones`);

    if (g) {
      g.enable({ emitEvent: false });
      g.setValidators([Validators.required]);
      g.updateValueAndValidity({ emitEvent: false });
    }
    if (s) {
      s.enable({ emitEvent: false });
      s.setValidators([Validators.required]);
      s.updateValueAndValidity({ emitEvent: false });
    }
     if (o) {
      o.enable({ emitEvent: false });
      o.updateValueAndValidity({ emitEvent: false });
    }
    if (tipo === 'otro') {
      this.f('p115OtrEspecifique')?.enable({ emitEvent: false });
    }
  }

  private disableNecesidadesFields(tipo: string): void {
    const prefix = tipo === 'logistica' ? 'Log' : tipo === 'infraestructura' ? 'Inf' : tipo === 'personal' ? 'Per' : tipo === 'presupuesto' ? 'Pre' : 'Otr';
    this.disableSoftWithNull(this.f(`p115${prefix}Gestion`)!);
    this.disableSoftWithNull(this.f(`p115${prefix}Suficiente`)!);
    this.disableSoft(this.f(`p115${prefix}Observaciones`)!);
    if (tipo === 'otro') {
      this.disableSoft(this.f('p115OtrEspecifique')!);
    }
  }

  private bindGestionSuficiente(gestionKey: string, suficienteKey: string): void {
    const g = this.f(gestionKey);
    const s = this.f(suficienteKey);
    if (!g || !s) return;

    const apply = (val: any) => {
      if (val === 'S') {
        s.enable({ emitEvent: false });
        s.setValidators([Validators.required]);
      } else {
        this.disableSoftWithNull(s);
      }
      s.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    };
    apply(g.value);
    g.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  private setupP117Listeners(): void {
    const group = ['p117A','p117B','p117C','p117D','p117E','p117F','p117G','p117H','p117I','p117J'];
    
    group.forEach(n => {
      this.f(n)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
        if (ch) this.f('p117K')?.setValue(false, { emitEvent: false });
      });
    });

    this.f('p117J')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      const det = this.f('p117Jotro')!;
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

    this.f('p117K')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((ch: boolean) => {
      if (ch) {
        group.forEach(n => this.f(n)?.setValue(false, { emitEvent: false }));
        const det = this.f('p117Jotro')!;
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
        det.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  public onOtroCheckboxChange(nombreCheckbox: string, nombreDetalle: string): void {
    const marcado = !!this.ficha1Form.get(nombreCheckbox)?.value;
    const detalle = this.ficha1Form.get(nombreDetalle);
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

  private applyCapacitacionesState(recibe: any): void {
    const activa = recibe === 'S';
    const group = [...this.GROUP_CA116, 'p117K'];

    group.forEach(name => {
      const ctrl = this.f(name);
      if (!ctrl) return;
      if (activa) {
        ctrl.enable({ emitEvent: false });
      } else {
        ctrl.reset(false, { emitEvent: false });
        ctrl.disable({ emitEvent: false });
      }
    });

    const det = this.f('p117Jotro');
    if (det) {
      if (activa && this.f('p117J')?.value) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.required, Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    }

    if (!activa) {
      this.showGroupErrors = false;
    }
    this.cdr.markForCheck();
  }

  private updateCheckboxValidators(): void {
    const ninguno = this.f('p115NecNinguno')?.value === 'S';
    const alMenosUnoMarcado = this.f('p115NecLogistica')?.value === 'S' ||
                               this.f('p115NecInfraestructura')?.value === 'S' ||
                               this.f('p115NecPersonal')?.value === 'S' ||
                               this.f('p115NecPresupuesto')?.value === 'S' ||
                               this.f('p115NecOtro')?.value === 'S';
    const isValid = ninguno || alMenosUnoMarcado;

    const checkboxControls = ['p115NecLogistica','p115NecInfraestructura','p115NecPersonal','p115NecPresupuesto','p115NecOtro','p115NecNinguno'];
    checkboxControls.forEach(controlName => {
      const ctrl = this.f(controlName);
      if (!isValid) {
        ctrl?.setErrors({ required: true });
      } else {
        if (ctrl?.hasError('required')) {
          ctrl?.setErrors(null);
        }
      }
      ctrl?.updateValueAndValidity({ emitEvent: false });
    });
  }

  // ===== Helpers =====
  f(path: string): AbstractControl | null {
    return this.ficha1Form.get(path);
  }

  public isInvalid(path: string): boolean {
    const c = this.f(path);
    return !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
  }

  get invalidCA116(): boolean {
    const recibeCapac = this.f('p116RecibeCapac')?.value;
    if (recibeCapac !== 'S') return false;

    const anyChecked = this.GROUP_CA116.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return ctrl?.value === true;
    });

    const groupTouched = this.GROUP_CA116.some(ctrlName => {
      const ctrl = this.f(ctrlName);
      return !!(ctrl && (ctrl.touched || ctrl.dirty));
    });

    const shouldShow = this.showAllErrors || groupTouched;
    return shouldShow && !anyChecked;
  }

  get invalidCA(): boolean {
    const active = this.f('p116RecibeCapac')?.value === 'S';
    const any = this.anyChecked(this.GROUP_CA116);
    const shouldShow = this.showAllErrors || this.showGroupErrors || this.isGroupTouched(this.GROUP_CA116);
    return active && shouldShow && !any;
  }

  private anyChecked(keys: string[]): boolean {
    return keys.some(k => !!this.f(k)?.value);
  }

  private isGroupTouched(keys: string[]): boolean {
    return keys.some(k => {
      const c = this.f(k);
      return !!c && (c.touched || c.dirty);
    });
  }

  public hasCheckboxError(): boolean {
    const nombres = ['p115NecLogistica','p115NecInfraestructura','p115NecPersonal','p115NecPresupuesto','p115NecOtro','p115NecNinguno'];
    return nombres.some(n => this.f(n)?.hasError('required'));
  }

  public isCheckboxChecked(controlName: string): boolean {
    return this.f(controlName)?.value === 'S';
  }

  public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }

  public hasRole(role: string): boolean {
    return this.authService.getScopes().includes(role);
  }

  public charLen(controlName: string): number {
    const v = this.f(controlName)?.value;
    return typeof v === 'string' ? v.length : 0;
  }

  permitirSoloNumeros(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const tecla = event.key;
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (teclasPermitidas.includes(tecla)) return;

    const textoSeleccionado = input.selectionStart !== input.selectionEnd;
    if (valorActual.length >= 5 && !textoSeleccionado) {
      event.preventDefault();
      return;
    }

    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
    }
  }

  permitirNumerosHasta100(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const tecla = event.key;
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (teclasPermitidas.includes(tecla)) return;

    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
      return;
    }

    const valorActual = input.value;
    if (valorActual === '0') {
      event.preventDefault();
      return;
    }

    const posInicio = input.selectionStart ?? 0;
    const posFin = input.selectionEnd ?? 0;
    const valorFuturoStr = valorActual.slice(0, posInicio) + tecla + valorActual.slice(posFin);
    const numeroFuturo = parseInt(valorFuturoStr, 10);

    if (numeroFuturo > 100) {
      event.preventDefault();
    }
  }

  private nonNegativeInt(): ValidatorFn {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 ? null : { nonNegativeInt: true };
    };
  }

  private disableSoft(ctrl: AbstractControl): void {
    ctrl.reset({ value: '', disabled: true });
    ctrl.clearValidators();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  private disableSoftWithNull(ctrl: AbstractControl): void {
    ctrl.reset({ value: null, disabled: true });
    ctrl.clearValidators();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  public onCheckboxChange(name: string, ev: any): void {
    const ctrl = this.f(name);
    if (!ctrl || ctrl.disabled) return;
    const checked = !!ev?.checked;
    ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
    ctrl.markAsDirty();
    ctrl.markAsTouched();
  }

  validarLongitudMaxima(controlName: string, maxLength: number): void {
    const control = this.ficha1Form.get(controlName);
    if (!control) return;
    const valor = control.value || '';
    if (valor.length > maxLength) {
      control.setValue(valor.substring(0, maxLength), { emitEvent: false });
    }
  }

  private mapCheckboxBooleansToApi(raw: any, map: Record<string, string>, payload: any, opts?: { detailKey?: string; detailDependsOn?: string }) {
    Object.keys(map).forEach(formKey => {
      const apiKey = map[formKey];
      if (opts?.detailKey === formKey) {
        const dep = opts.detailDependsOn!;
        const depMarcado = !!raw[dep];
        payload[apiKey] = depMarcado ? (raw[formKey] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });
  }

  private mapApiToCheckboxBooleans(data: any, map: Record<string, string>, setControl: (formKey: string, value: any) => void, opts?: { detailKey?: string; detailDependsOn?: string }) {
    Object.keys(map).forEach(formKey => {
      const apiKey = map[formKey];
      if (opts?.detailKey === formKey) {
        setControl(formKey, data?.[apiKey] ?? '');
      } else {
        setControl(formKey, data?.[apiKey] === 'S');
      }
    });

    if (opts?.detailKey && opts?.detailDependsOn) {
      const det = this.f(opts.detailKey)!;
      const depMarcado = !!this.f(opts.detailDependsOn)?.value;
      if (depMarcado) {
        det.enable({ emitEvent: false });
        det.setValidators([Validators.required, Validators.maxLength(200)]);
      } else {
        det.reset('', { emitEvent: false });
        det.clearValidators();
        det.disable({ emitEvent: false });
      }
      det.updateValueAndValidity({ emitEvent: false });
    }
  }

  // ===== GUARDAR =====
  public guardarSeccion1(): void { this.guardarDatos('C'); }
  public guardarSeccion1Incompleta(): void { this.guardarDatos('I'); }

  private async guardarDatos(estado: 'C' | 'I'): Promise<void> {
    const prevY = window.scrollY;
    this.showAllErrors = false;
    this.ficha1Form.updateValueAndValidity({ emitEvent: false });

    const hayErrores = this.ficha1Form.invalid;
    if (hayErrores) {
      this.showAllErrors = true;
      this.ficha1Form.markAllAsTouched();
      this.verificarCamposInvalidos();
      this.cdr?.markForCheck?.();

      if (estado === 'C') {
        this.scrollToFirstError?.();
        await Swal.fire('Formulario Incompleto', 'Por favor, complete todos los campos requeridos (en rojo).', 'warning');
        setTimeout(() => window.scrollTo({ top: prevY, left: 0, behavior: 'auto' }), 0);
        return;
      } else {
        setTimeout(() => window.scrollTo({ top: prevY, left: 0, behavior: 'auto' }), 0);
        await Swal.fire({
          icon: 'info',
          title: 'Guardado parcial con pendientes',
          text: 'Hay preguntas sin responder (marcadas en rojo). Puedes completarlas luego.',
          confirmButtonText: 'Continuar y guardar parcial'
        });
        this.showAllErrors = true;
        this.ficha1Form.markAllAsTouched();
        this.cdr?.markForCheck?.();
      }
    }

    Swal.fire({
      title: 'Guardando...',
      text: 'Por favor espere',
      backdrop: 'rgba(0, 0, 0, 0.69)',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => { Swal.showLoading(); }
    });

    const seccionData = this.prepareSaveData(estado);
    const hadErrorsAtSave = hayErrores;

    try {
      const respuesta = await lastValueFrom(
        this.fichaService.guardarFichaSeccion1(seccionData).pipe(takeUntil(this.destroy$))
      );

      await Swal.fire({
        icon: 'success',
        title: respuesta?.mensaje || (estado === 'C' ? 'Sección Guardada' : 'Guardado Parcialmente'),
        showConfirmButton: true,
      });

      this.onGuardar.emit();
      this.onEstadoActualizado.emit(seccionData.estado_s1);
      this.f('estado_s1')?.setValue(estado, { emitEvent: false });

      if ((respuesta as any)?.idFichas1 && !this.f('idFichas1')?.value) {
        this.f('idFichas1')?.setValue((respuesta as any).idFichas1, { emitEvent: false });
      }

      if (estado === 'C' || !hadErrorsAtSave) {
        this.ficha1Form.markAsPristine();
        this.showAllErrors = false;
      } else {
        this.showAllErrors = true;
        this.ficha1Form.markAllAsTouched();
        this.cdr?.markForCheck?.();
      }

      setTimeout(() => window.scrollTo({ top: prevY, left: 0, behavior: 'auto' }), 0);
    } catch (err) {
      console.error('Error al guardar sección 1:', err);
      Swal.fire('Error', 'No se pudo guardar la Sección 1.', 'error');
      setTimeout(() => window.scrollTo({ top: prevY, left: 0, behavior: 'auto' }), 0);
    }
  }

  private shouldAutosave(): boolean {
    if (this.hydrating) return false;
    if (!this.idFicha) return false;
    if (!this.ficha1Form.dirty) return false;
    return true;
  }

  private prepareSaveData(estado: 'C' | 'I'): any {
    const raw = this.ficha1Form.getRawValue();
    const payload: any = { ...raw };

    ['p111HombresDesconoce','p111HombDiscapDesconoce','p111MujeresDesconoce','p111MujDiscapDesconoce']
      .forEach(k => {
        payload[k] = (this.f(k)?.value === 'S') ? 'S' : null;
      });

    this.mapCheckboxBooleansToApi(raw, this.P111_MAP, payload);

    const p117Keys = Object.keys(this.P117_MAP);
    p117Keys.forEach(formKey => {
      const apiKey = this.P117_MAP[formKey];
      if (formKey === 'p117Jotro') {
        const jMarcado = !!raw['p117J'];
        payload[apiKey] = jMarcado ? (raw['p117Jotro'] || '') : '';
      } else {
        payload[apiKey] = raw[formKey] ? 'S' : '';
      }
    });

    const p115 = ['p115NecLogistica','p115NecInfraestructura','p115NecPersonal','p115NecPresupuesto','p115NecOtro','p115NecNinguno'];
    p115.forEach(k => {
      payload[k] = payload[k] ? 'S' : '';
    });

    const siNo = [
      'p115LogGestion','p115LogSuficiente',
      'p115InfGestion','p115InfSuficiente',
      'p115PerGestion','p115PerSuficiente',
      'p115PreGestion','p115PreSuficiente',
      'p115OtrGestion','p115OtrSuficiente',
      'p116RecibeCapac'
    ];
    siNo.forEach(k => {
      const v = payload[k];
      payload[k] = (v === 'S' || v === 'N') ? v : (v === true || v === 'true') ? 'S' : (v === false || v === 'false') ? 'N' : null;
    });

    payload.idFicha = this.idFicha ?? payload.idFicha;
    payload.estado_s1 = estado;
    return payload;
  }

  private autosaveSilencioso(): void {
    if (!this.shouldAutosave()) return;

    const estadoActual = this.f('estado_s1')?.value as 'C' | 'I' | '' | null;
    const estadoDestino: 'C' | 'I' = (estadoActual === 'C' && this.ficha1Form.valid) ? 'C' : 'I';
    const payload = this.prepareSaveData(estadoDestino);

    this.fichaService.guardarFichaSeccion1(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => console.debug('[S1 autosave OK]', { estadoDestino, res }),
        error: (err) => console.error('[S1 autosave ERR]', err?.status, err?.message, err?.error)
      });
  }

  public validarSeccion(): void {
    const estado = this.ficha1Form.get('estado_s1')?.value;
    const idFicha = this.idFicha;

    if (!idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }

    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'La sección 1 debe estar guardada como "Completa" para validarla.', 'warning');
      return;
    }

    const payload = { idFichas1: idFicha, valida_s1: '1' };
    this.fichaService.validarFichaSeccion1(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.ficha1Form.get('valida_s1')?.setValue('1');
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 1 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar la sección 1:', err);
        Swal.fire('Error', 'No se pudo validar la sección 1.', 'error');
      }
    });
  }

  private populateForm(data: any): void {
    this.hydrating = true;
    this.idFicha = data?.idFicha ?? this.idFicha;

    const toInt = (v: any) => (v === null || v === undefined || v === '') ? null : Number(v);
    const toDate = (v: any) => {
      if (!v) return null;
      if (v instanceof Date) return v;
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d;
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v));
      return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
    };
    const sn = (v: any) => (v === 'S' || v === 'N') ? v : null;

    this.ficha1Form.patchValue({
      idFicha: data?.idFicha ?? this.idFicha ?? null,
      idFichas1: data?.idFichas1 ?? null,
      estado_s1: (data?.estado_s1 ?? '').toString().trim().toUpperCase(),
      valida_s1: (data?.valida_s1 ?? '').toString().trim(),

      p111Hombres012: toInt(data.p111Hombres012),
      p111Hombres1317: toInt(data.p111Hombres1317),
      p111Hombres1864: toInt(data.p111Hombres1864),
      p111Hombres65Mas: toInt(data.p111Hombres65Mas),

      p111HombDiscap012: toInt(data.p111HombDiscap012),
      p111HombDiscap1317: toInt(data.p111HombDiscap1317),
      p111HombDiscap1864: toInt(data.p111HombDiscap1864),
      p111HombDiscap65Mas: toInt(data.p111HombDiscap65Mas),

      p111Mujeres012: toInt(data.p111Mujeres012),
      p111Mujeres1317: toInt(data.p111Mujeres1317),
      p111Mujeres1864: toInt(data.p111Mujeres1864),
      p111Mujeres65Mas: toInt(data.p111Mujeres65Mas),

      p111MujDiscap012: toInt(data.p111MujDiscap012),
      p111MujDiscap1317: toInt(data.p111MujDiscap1317),
      p111MujDiscap1864: toInt(data.p111MujDiscap1864),
      p111MujDiscap65Mas: toInt(data.p111MujDiscap65Mas),

      p112FechaAct: toDate(data.p112FechaAct),
      p113PorcNoInsc: toInt(data.p113PorcNoInsc),

      p114Cert2022: toInt(data.p114Cert2022),
      p114Cert2023: toInt(data.p114Cert2023),
      p114Cert2024: toInt(data.p114Cert2024),
      p114Cert2025: toInt(data.p114Cert2025),

      p115NecLogistica: data.p115NecLogistica === 'S' ? 'S' : null,
      p115LogGestion: sn(data.p115LogGestion),
      p115LogSuficiente: sn(data.p115LogSuficiente),
      p115LogObservaciones: data.p115LogObservaciones ?? '' ,

      p115NecInfraestructura: data.p115NecInfraestructura === 'S' ? 'S' : null,
      p115InfGestion: sn(data.p115InfGestion),
      p115InfSuficiente: sn(data.p115InfSuficiente),
      p115InfObservaciones: data.p115InfObservaciones ?? '',

      p115NecPersonal: data.p115NecPersonal === 'S' ? 'S' : null,
      p115PerGestion: sn(data.p115PerGestion),
      p115PerSuficiente: sn(data.p115PerSuficiente),
      p115PerObservaciones: data.p115PerObservaciones ?? '',

      p115NecPresupuesto: data.p115NecPresupuesto === 'S' ? 'S' : null,
      p115PreGestion: sn(data.p115PreGestion),
      p115PreSuficiente: sn(data.p115PreSuficiente),
      p115PreObservaciones: data.p115PreObservaciones ?? '',

      p115NecOtro: data.p115NecOtro === 'S' ? 'S' : null,
      p115OtrEspecifique: data.p115OtrEspecifique ?? '',
      p115OtrGestion: sn(data.p115OtrGestion),
      p115OtrSuficiente: sn(data.p115OtrSuficiente),
      p115OtrObservaciones: data.p115OtrObservaciones ?? '',
      p115NecNinguno: data.p115NecNinguno === 'S' ? 'S' : null,

      p116RecibeCapac: sn(data.p116RecibeCapac),

      p117A: data.p117a === 'S',
      p117B: data.p117b === 'S',
      p117C: data.p117c === 'S',
      p117D: data.p117d === 'S',
      p117E: data.p117e === 'S',
      p117F: data.p117f === 'S',
      p117G: data.p117g === 'S',
      p117H: data.p117h === 'S',
      p117I: data.p117i === 'S',
      p117J: data.p117j === 'S',
      p117Jotro: data.p117jotro ?? '',
      p117K: data.p117k === 'S',

      p111HombresDesconoce: data.p111HombresDesconoce === 'S' ? 'S' : null,
      p111HombDiscapDesconoce: data.p111HombDiscapDesconoce === 'S' ? 'S' : null,
      p111MujeresDesconoce: data.p111MujeresDesconoce === 'S' ? 'S' : null,
      p111MujDiscapDesconoce: data.p111MujDiscapDesconoce === 'S' ? 'S' : null,
    }, { emitEvent: false });

    ['p111HombresDesconoce','p111HombDiscapDesconoce','p111MujeresDesconoce','p111MujDiscapDesconoce']
      .forEach(flag => this.applyRowDisableState(flag));

    ([
      { ctrl: 'p115NecLogistica', tipo: 'logistica',  },
      { ctrl: 'p115NecInfraestructura', tipo: 'infraestructura' },
      { ctrl: 'p115NecPersonal', tipo: 'personal' },
      { ctrl: 'p115NecPresupuesto', tipo: 'presupuesto' },
      { ctrl: 'p115NecOtro', tipo: 'otro' },
    ] as const).forEach(({ctrl, tipo}) => {
      const marcado = this.f(ctrl)?.value === 'S';
      if (marcado) this.enableNecesidadesFields(tipo);
      else this.disableNecesidadesFields(tipo);
    });

    this.refreshAllDisabilityStates();
    this.recomputeP111Totals();
    this.applyCapacitacionesState(this.f('p116RecibeCapac')?.value);

    this.ficha1Form.markAsPristine();
    this.ficha1Form.updateValueAndValidity({ emitEvent: false });

    if (this.ficha1Form.invalid) {
      this.showAllErrors = true;
      this.persistRequiredErrors();
      this.cdr.markForCheck();
    }

    this.hydrating = false;
    this.cdr.markForCheck();
  }

  private persistRequiredErrors(): void {
    const keys = this.getRequiredControlNames();
    keys.forEach(k => {
      const c = this.ficha1Form.get(k);
      if (c && c.hasError('required')) {
        c.markAsTouched({ onlySelf: true });
        c.markAsDirty({ onlySelf: true });
      }
    });
  }

  private getRequiredControlNames(): string[] {
    return Object.keys(this.ficha1Form.controls).filter(k => {
      const c = this.ficha1Form.get(k);
      const hasReq = c && typeof (c as any).hasValidator === 'function'
        ? (c as any).hasValidator(Validators.required)
        : false;
      return !!c && !c.disabled && hasReq;
    });
  }

  private verificarCamposInvalidos(): void {
    console.warn('--- VERIFICACIÓN DE CAMPOS INVÁLIDOS ---');
    Object.keys(this.ficha1Form.controls).forEach(k => {
      const c = this.ficha1Form.get(k);
      if (c && c.invalid) {
        console.log(`❌ ${k}:`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
  }

  private scrollToFirstError(): void {
    setTimeout(() => {
      const el = document.querySelector('.ng-invalid[formcontrolname]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}