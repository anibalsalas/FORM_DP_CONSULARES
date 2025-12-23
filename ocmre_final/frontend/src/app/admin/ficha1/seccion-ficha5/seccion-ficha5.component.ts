import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, inject,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil, debounceTime  } from 'rxjs/operators';

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
//import { AuthService } from '../../../services/auth.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Max3DigitsDirective } from './max-3digits.directive';
import {  NumericInputDirective } from './appNumericInput.directive';
import { environment } from '../../../../environments/environment';

type SN = 'S' | 'N' | null;

@Component({
  selector: 'app-seccion-ficha5',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatRadioModule, MatButtonModule, MatInputModule, MatCheckboxModule,
    MatIconModule, MatDividerModule, Max3DigitsDirective, NumericInputDirective
  ],
  templateUrl: './seccion-ficha5.component.html',
  styleUrls: ['./seccion-ficha5.component.scss']
})
export class SeccionFicha5Component implements OnInit, OnDestroy {

  // ===== Inputs/Outputs =====
  @Input() datosFicha5: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  // ===== Estado local =====
  ficha5Form: FormGroup;
  idFicha: number | null = null;

  private destroy$ = new Subject<void>();
  private autosaveLanzado = false;


  private hydrating = false;

  public showGroupErrors = false;


  // ===== Inyección =====
  private readonly fb           = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService  = inject(AuthService);
  private readonly cdr          = inject(ChangeDetectorRef);


    roles: string[] = [];
    rolAdministrador: string = environment.rolAdministrador;
    rolComisionado: string = environment.rolComisionado;
    rolEspecialista: string = environment.rolEspecialista;

  // ===== Catálogos de matrices / instituciones =====
  p514Rows = [
    { check: 'p514aLogistica',   gest: 'p514aGestiones',   suf: 'p514aSuficiente',   esp: 'p514aEspecifique' },
    { check: 'p514bInfra',       gest: 'p514bGestiones',   suf: 'p514bSuficiente',   esp: 'p514bEspecifique' },
    { check: 'p514cPersonal',    gest: 'p514cGestiones',   suf: 'p514cSuficiente',   esp: 'p514cEspecifique' },
    { check: 'p514dPresupuesto', gest: 'p514dGestiones',   suf: 'p514dSuficiente',   esp: 'p514dEspecifique' },
    // “Otro”
    { check: 'p514eOtro',        gest: 'p514eGestiones',   suf: 'p514eSuficiente',   esp: 'p514eEspecifique', otroDet: 'p514eOtroDetalle' },
  ];
  p516Instituciones = [
    'p516Mre','p516Reniec','p516Migraciones','p516Interpol','p516Inei',
    'p516Jne','p516Onpe','p516Sunarp','p516PoderJudicial','p516Otro'
  ];

  p526Rows = [
    { check: 'p526aLogistica',   gest: 'p526aGestiones',   suf: 'p526aSuficiente',   esp: 'p526aEspecifique' },
    { check: 'p526bInfra',       gest: 'p526bGestiones',   suf: 'p526bSuficiente',   esp: 'p526bEspecifique' },
    { check: 'p526cPersonal',    gest: 'p526cGestiones',   suf: 'p526cSuficiente',   esp: 'p526cEspecifique' },
    { check: 'p526dPresupuesto', gest: 'p526dGestiones',   suf: 'p526dSuficiente',   esp: 'p526dEspecifique' },
    // “Otro”
    { check: 'p526eOtro',        gest: 'p526eGestiones',   suf: 'p526eSuficiente',   esp: 'p526eEspecifique', otroDet: 'p526eOtroDetalle' },
  ];
  p528Instituciones = [
    'p528Mre','p528Reniec','p528Migraciones','p528Interpol','p528Inei',
    'p528Jne','p528Onpe','p528Sunarp','p528PoderJudicial','p528Otro'
  ];


  // Mapeo cada key del formulario a la etiqueta real 
private readonly LABELS: Record<string, string> = {
  // 5.1.4 Necesidades
  p514aLogistica: 'Logística',
  p514bInfra: 'Infraestructura',
  p514cPersonal: 'Personal',
  p514dPresupuesto: 'Presupuesto',
  p514eOtro: 'Otro',
  p514Ninguna: 'Ninguno',

  // 5.1.6 Instituciones
  p516Mre: 'MRE',
  p516Reniec: 'RENIEC',
  p516Migraciones: 'Migraciones',
  p516Interpol: 'INTERPOL',
  p516Inei: 'INEI',
  p516Jne: 'JNE',
  p516Onpe: 'ONPE',
  p516Sunarp: 'SUNARP',
  p516PoderJudicial: 'Poder Judicial',
  p516Otro: 'Otro(s)',
  //p516Ninguna: 'No ha recibido ninguna',

  // 5.2.6 Necesidades
  p526aLogistica: 'Logística',
  p526bInfra: 'Infraestructura',
  p526cPersonal: 'Personal',
  p526dPresupuesto: 'Presupuesto',
  p526eOtro: 'Otro',
  p526Ninguno: 'Ninguno',




  // 5.2.8 Instituciones
  p528Mre: 'MRE',
  p528Reniec: 'RENIEC',
  p528Migraciones: 'Migraciones',
  p528Interpol: 'INTERPOL',
  p528Inei: 'INEI',
  p528Jne: 'JNE',
  p528Onpe: 'ONPE',
  p528Sunarp: 'SUNARP',
  p528PoderJudicial: 'Poder Judicial',
  p528Otro: 'Otro(s)',
  //p528Ninguna: 'No ha recibido ninguna'
};

// Helper mínimo para usar en el template
private revalidateP528?: () => void;
private revalidateP516?: () => void;

public pretty(key: string): string {
  return this.LABELS[key] ?? key;
}


private requireAtLeastOneP514(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha5Form) return null;
    
    const keys = ['p514aLogistica', 'p514bInfra', 'p514cPersonal', 'p514dPresupuesto', 'p514eOtro', 'p514Ninguna'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha5Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}


private requireAtLeastOneP526(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha5Form) return null;
    
    const keys = ['p526aLogistica', 'p526bInfra', 'p526cPersonal', 'p526dPresupuesto', 'p526eOtro', 'p526Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha5Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}


  constructor() {
    // ===== Form =====
    this.ficha5Form = this.fb.group({
      idFichas5: [null],
      idFicha: [null],
      estado_s5: [''],
      valida_s5: [''],

      p511Requiere: [null as SN, Validators.required],
      p512Afirmativa: [{ value: null as string | null, disabled: true }],

      p513Nac2023: [null, this.nonNegativeInt()],
      p513Mat2023: [null, this.nonNegativeInt()],
      p513Def2023: [null, this.nonNegativeInt()],
      p513Nac2024: [null, this.nonNegativeInt()],
      p513Mat2024: [null, this.nonNegativeInt()],
      p513Def2024: [null, this.nonNegativeInt()],
      p513Nac2025: [null, this.nonNegativeInt()],
      p513Mat2025: [null, this.nonNegativeInt()],
      p513Def2025: [null, this.nonNegativeInt()],

      p514aLogistica: [null as 'S' | null],
      p514aGestiones: [{ value: null as SN, disabled: true }],
      p514aSuficiente: [{ value: null as SN, disabled: true }],
      p514aEspecifique: [{ value: '', disabled: true }],

      p514bInfra: [null as 'S' | null],
      p514bGestiones: [{ value: null as SN, disabled: true }],
      p514bSuficiente: [{ value: null as SN, disabled: true }],
      p514bEspecifique: [{ value: '', disabled: true }],

      p514cPersonal: [null as 'S' | null],
      p514cGestiones: [{ value: null as SN, disabled: true }],
      p514cSuficiente: [{ value: null as SN, disabled: true }],
      p514cEspecifique: [{ value: '', disabled: true }],

      p514dPresupuesto: [null as 'S' | null],
      p514dGestiones: [{ value: null as SN, disabled: true }],
      p514dSuficiente: [{ value: null as SN, disabled: true }],
      p514dEspecifique: [{ value: '', disabled: true }],

      p514eOtro: [null as 'S' | null],
      p514eGestiones: [{ value: null as SN, disabled: true }],
      p514eSuficiente: [{ value: null as SN, disabled: true }],
      p514eEspecifique: [{ value: '', disabled: true }],
      p514eOtroDetalle: [{ value: '', disabled: true }],

      p514Ninguna: [null as 'S' | null],

      p515Recibe: [null as SN, Validators.required],
      p516Mre: [null as 'S' | null],
      p516Reniec: [null as 'S' | null],
      p516Migraciones: [null as 'S' | null],
      p516Interpol: [null as 'S' | null],
      p516Inei: [null as 'S' | null],
      p516Jne: [null as 'S' | null],
      p516Onpe: [null as 'S' | null],
      p516Sunarp: [null as 'S' | null],
      p516PoderJudicial: [null as 'S' | null],
      p516Otro: [null as 'S' | null],
      p516OtroDetalle: [{ value: '', disabled: true }],
      p516Ninguna: [null as 'S' | null],

      p521Requiere: [null as SN, Validators.required],
      p522Afirmativa: [{ value: null as string | null, disabled: true }],

      p523Reniec: [null as SN, Validators.required],

      p524Mayores2023: [null, this.nonNegativeInt()],
      p524Mayores2024: [null, this.nonNegativeInt()],
      p524Mayores2025: [null, this.nonNegativeInt()],
      p524Menores2023: [null, this.nonNegativeInt()],
      p524Menores2024: [null, this.nonNegativeInt()],
      p524Menores2025: [null, this.nonNegativeInt()],
      p524Datos2023: [null, this.nonNegativeInt()],
      p524Datos2024: [null, this.nonNegativeInt()],
      p524Datos2025: [null, this.nonNegativeInt()],
      p524Renovacion2023: [null, this.nonNegativeInt()],
      p524Renovacion2024: [null, this.nonNegativeInt()],
      p524Renovacion2025: [null, this.nonNegativeInt()],
      p524Duplicado2023: [null, this.nonNegativeInt()],
      p524Duplicado2024: [null, this.nonNegativeInt()],
      p524Duplicado2025: [null, this.nonNegativeInt()],
      p524Canje2023: [null, this.nonNegativeInt()],
      p524Canje2024: [null, this.nonNegativeInt()],
      p524Canje2025: [null, this.nonNegativeInt()],

      p525Emite: [null as SN, Validators.required],
      p525CostoSol: [{ value: null, disabled: true }, this.money()],
      p525CostoUsd: [{ value: null, disabled: true }, this.money()],


      
      p526aLogistica: [null as 'S' | null],
      p526aGestiones: [{ value: null as SN, disabled: true }],
      p526aSuficiente: [{ value: null as SN, disabled: true }],
      p526aEspecifique: [{ value: '', disabled: true }],

      p526bInfra: [null as 'S' | null],
      p526bGestiones: [{ value: null as SN, disabled: true }],
      p526bSuficiente: [{ value: null as SN, disabled: true }],
      p526bEspecifique: [{ value: '', disabled: true }],

      p526cPersonal: [null as 'S' | null],
      p526cGestiones: [{ value: null as SN, disabled: true }],
      p526cSuficiente: [{ value: null as SN, disabled: true }],
      p526cEspecifique: [{ value: '', disabled: true }],

      p526dPresupuesto: [null as 'S' | null],
      p526dGestiones: [{ value: null as SN, disabled: true }],
      p526dSuficiente: [{ value: null as SN, disabled: true }],
      p526dEspecifique: [{ value: '', disabled: true }],

      p526eOtro: [null as 'S' | null],
      p526eGestiones: [{ value: null as SN, disabled: true }],
      p526eSuficiente: [{ value: null as SN, disabled: true }],
      p526eEspecifique: [{ value: '', disabled: true }],
      p526eOtroDetalle: [{ value: '', disabled: true }],

      p526Ninguno: [null as 'S' | null],

      // 5.2.7 / 5.2.8
      p527Recibe: [null as SN, Validators.required],
      p528Mre: [null as 'S' | null],
      p528Reniec: [null as 'S' | null],
      p528Migraciones: [null as 'S' | null],
      p528Interpol: [null as 'S' | null],
      p528Inei: [null as 'S' | null],
      p528Jne: [null as 'S' | null],
      p528Onpe: [null as 'S' | null],
      p528Sunarp: [null as 'S' | null],
      p528PoderJudicial: [null as 'S' | null],
      p528Otro: [null as 'S' | null],
      p528OtroDetalle: [{ value: '', disabled: true }],
      p528Ninguna: [null as 'S' | null],

      p514Any: [null, this.requireAtLeastOneP514()],
      p526Any: [null, this.requireAtLeastOneP526()],

    });
  }

  // ===== Ciclo de vida =====
  ngOnInit(): void {
    console.debug('[S5] ngOnInit datosFicha5:', this.datosFicha5);

    // idFicha desde input
    this.idFicha = this.datosFicha5?.idFicha ?? null;
    if (this.idFicha) this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    // Cargar datos si existen
    if (this.datosFicha5) this.populateForm(this.datosFicha5);

    // Skip-logic 5.1.1 / 5.1.2 y 5.2.1 / 5.2.2
    this.bindYesEnables('p511Requiere', 'p512Afirmativa', [Validators.required]);
    this.bindYesEnables('p521Requiere', 'p522Afirmativa', [Validators.required]);

    // Matrices 5.1.4 / 5.2.6
    this.setupMatrix(this.p514Rows, 'p514Ninguna');
    this.setupMatrix(this.p526Rows, 'p526Ninguno');


        this.bindYesEnables('p514aGestiones', 'p514aSuficiente', [Validators.required]);
        this.bindYesEnables('p514bGestiones', 'p514bSuficiente', [Validators.required]);
        this.bindYesEnables('p514cGestiones', 'p514cSuficiente', [Validators.required]);
        this.bindYesEnables('p514dGestiones', 'p514dSuficiente', [Validators.required]);
        this.bindYesEnables('p514eGestiones', 'p514eSuficiente', [Validators.required]);


        this.bindYesEnables('p526aGestiones', 'p526aSuficiente', [Validators.required]);
        this.bindYesEnables('p526bGestiones', 'p526bSuficiente', [Validators.required]);
        this.bindYesEnables('p526cGestiones', 'p526cSuficiente', [Validators.required]);
        this.bindYesEnables('p526dGestiones', 'p526dSuficiente', [Validators.required]);
        this.bindYesEnables('p526eGestiones', 'p526eSuficiente', [Validators.required]);


    // Capacitaciones 5.1.5/5.1.6 y 5.2.7/5.2.8
    //this.setupTraining('p515Recibe', this.p516Instituciones, 'p516Ninguna', 'p516Otro', 'p516OtroDetalle');
   // this.setupTraining('p527Recibe', this.p528Instituciones, 'p528Ninguna', 'p528Otro', 'p528OtroDetalle');

    // Certificado concordancia y costos (5.2.5)
    this.f('p525Emite')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      const need = v === 'S';
      this.toggleMoney('p525CostoSol', need);
      this.toggleMoney('p525CostoUsd', need);
    });
    // Estado inicial
    this.toggleMoney('p525CostoSol', this.f('p525Emite')?.value === 'S');
    this.toggleMoney('p525CostoUsd', this.f('p525Emite')?.value === 'S');


      this.bindYesRequiresAnyCheckboxSimple(
        'p515Recibe',
        this.p516Instituciones,       
        'p516Group',               
        'p516Ninguna',                
        'p516Otro',                   
        'p516OtroDetalle'             
      );


        this.bindYesRequiresAnyCheckboxSimple(
        'p527Recibe',
        this.p528Instituciones,
        'p528Group',
        'p528Ninguna',
        'p528Otro',
        'p528OtroDetalle'
      );

    // Autosave cuando abran el panel del padre
    if (this.activarAutosave && !this.autosaveLanzado) {
      this.autosaveSilencioso();
      this.autosaveLanzado = true;
    }
  }




  isDisabled(name: string): boolean {
  const c = this.f(name);
  // si no existe el control, lo tratamos como deshabilitado
  // además, si p515Recibe !== 'S', deshabilitamos todo el grupo
  return !c || c.disabled || this.f('p515Recibe')?.value !== 'S';
}

  isDisabled527(name: string): boolean {
  const c = this.f(name);
  // si no existe el control, lo tratamos como deshabilitado
  return !c || c.disabled || this.f('p527Recibe')?.value !== 'S';
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
    public charLen(controlName: string): number {
          const v = this.f(controlName)?.value;
          return typeof v === 'string' ? v.length : 0;
        }
        
  private autosaveTimer: any = null; 
  private readonly AUTOSAVE_DELAY = 3000; // 3 segundos

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFicha5']?.currentValue) {
      this.populateForm(changes['datosFicha5'].currentValue);
    }

    // 2️⃣ Activar autosave cuando el padre lo indique
    if (changes['activarAutosave']) {
      const ahora = changes['activarAutosave'].currentValue;
      const antes = changes['activarAutosave'].previousValue;
      
      console.log('🔄 Cambio en activarAutosave:', { antes, ahora });

      // ✅ Solo ejecutar autosave si cambió de false --> true
      if (ahora === true && antes === false) {
        console.log('🚀 Iniciando sistema de autosave...');
        this.iniciarAutosave();
      }
    }
  }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); this.detenerAutosave();
    }
    

  // ====== Helpers acceso ======
    public showAllErrors = false;

  f(path: string) { return this.ficha5Form.get(path) as AbstractControl | null; }
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
  c.setValue(checked ? 'S' : null, { emitEvent: true });
  c.markAsDirty();
  c.markAsTouched();
  
  const p514Keys = ['p514aLogistica', 'p514bInfra', 'p514cPersonal', 'p514dPresupuesto', 'p514eOtro', 'p514Ninguna'];
  if (p514Keys.includes(name)) {
    this.f('p514Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  const p526Keys = ['p526aLogistica', 'p526bInfra', 'p526cPersonal', 'p526dPresupuesto', 'p526eOtro', 'p526Ninguno'];
  if (p526Keys.includes(name)) {
    this.f('p526Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  if (this.p528Instituciones.includes(name)) {
    this.f('p527Recibe')?.updateValueAndValidity({ emitEvent: false });
  }
  
  if (this.p516Instituciones.includes(name)) {
    this.f('p515Recibe')?.updateValueAndValidity({ emitEvent: false });
  }
}

  public isCheckboxChecked(controlName: string): boolean { return this.f(controlName)?.value === 'S'; }


  private refreshRowValidators(r: { check: string; gest: string; suf: string }): void {
  const checked = this.f(r.check)?.value === 'S';

  const g = this.f(r.gest);
  const s = this.f(r.suf);

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


  public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }


  
  // ====== Skip-logic ======
  private bindYesEnables(sourceKey: string, targetKey: string, validators: any[] = []) {
    const src = this.f(sourceKey), trg = this.f(targetKey);
    if (!src || !trg) return;
    const apply = (v: any) => {
      if (v === 'S') {
        trg.enable({ emitEvent: false });
        trg.setValidators(validators);
      } else {
        this.disableSoft(trg, true, true); // deshabilita y limpia
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

    // Cada fila: check ⇒ habilita gest/suf/esp
    rows.forEach(r => {
      this.f(r.check)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
        const on = v === 'S';
        if (on) this.f(noneKey)?.setValue(null, { emitEvent: false });
        on ? this.enableRow(r) : this.disableRow(r);

        // “Otro” detalle
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

  private setupTraining(yesKey: string, instKeys: string[], noneKey: string, otroKey: string, otroDetKey: string) {
    const yes = this.f(yesKey);
    const none = this.f(noneKey);

    const validate = () => {
      const isYes = yes?.value === 'S';
      const isNone = none?.value === 'S';
      // habilita / deshabilita checks
      instKeys.forEach(k => {
        if (isYes && !isNone) {
          this.f(k)?.enable({ emitEvent: false });
        } else {
          this.disableSoft(this.f(k), true, true);
        }
      });
      // “otro detalle”
      const needOtroDet = isYes && !isNone && this.f(otroKey)?.value === 'S';
      this.toggleCtrl(otroDetKey, needOtroDet, false, needOtroDet ? [Validators.required] : []);

      // Al menos una institución si esYes y no isNone
      const any = instKeys.some(k => this.f(k)?.value === 'S');
      const prev = yes?.errors || {};
      if (isYes && !isNone && !any) {
        yes?.setErrors({ ...prev, instGroup: true });
      } else {
        if ('instGroup' in prev) delete prev['instGroup'];
        yes?.setErrors(Object.keys(prev).length ? prev : null);
      }
    };

    yes?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
    none?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
    instKeys.forEach(k => this.f(k)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate));
    this.f(otroKey)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);

    // Estado inicial
    validate();
  }


  private verificarCamposInvalidos(): void {
  console.warn('=== CAMPOS INVÁLIDOS ===');
  Object.keys(this.ficha5Form.controls).forEach(key => {
    const control = this.f(key);
    if (control && control.invalid) {
      console.warn(` ${key}:`, {
        value: control.value,
        errors: control.errors,
        disabled: control.disabled
      });
    }
  });
  
  // Errores a nivel de formulario (como p45Group, p410Group)
  if (this.ficha5Form.errors) {
    console.warn(' Errores del formulario (root):', this.ficha5Form.errors);
  }
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
    if (busy) return;
    busy = true;

    const isYes = yesCtrl.value === 'S';

    if (!isYes) {
      // 1) NO: limpiar + deshabilitar grupo y “ninguna”
      checkKeys.forEach(k => this.disableSoft(this.f(k), true, true));
      if (noneKey)     this.disableSoft(this.f(noneKey), true, true);
      if (otroDetKey)  this.disableSoft(this.f(otroDetKey), true, true);

      // quitar error de grupo
      const errs = yesCtrl.errors || {};
      if (anchorErrorKey in errs) {
        const { [anchorErrorKey]: _, ...rest } = errs;
        yesCtrl.setErrors(Object.keys(rest).length ? rest : null, { emitEvent: false });
      }
      busy = false;
      return;
    }

    // 2) SÍ: habilitar grupo y deshabilitar “ninguna”
    checkKeys.forEach(k => this.f(k)?.enable({ emitEvent: false }));
    if (noneKey) {
      this.disableSoft(this.f(noneKey), true, true); // no aplica si recibe capacitaciones
    }

    // 3) “Otro (detalle)” condicionado
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

    // 4) Validación: al menos uno marcado en el grupo
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

  // Estado inicial
  apply();

  // Suscripciones mínimas
  yesCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  checkKeys.forEach(k => this.f(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(apply));
  if (noneKey)    this.f(noneKey)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(apply);
  if (otroKey)    this.f(otroKey)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(apply);
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

  private toggleCtrl(name: string, enabled: boolean, isNumber = false, validators: any[] = []) {
    const c = this.f(name); if (!c) return;
    if (enabled) {
      c.enable({ emitEvent: false });
      c.setValidators(validators);
    } else {
      this.disableSoft(c, true, true);
    }
    c.updateValueAndValidity({ emitEvent: false });
  }

  private toggleMoney(name: string, enabled: boolean) {
    const c = this.f(name);
    if (!c) return;
    if (enabled) {
      c.enable({ emitEvent: false });
      c.setValidators([this.money()]);
    } else {
      this.disableSoft(c, true, true);
    }
    c.updateValueAndValidity({ emitEvent: false });
  }

  // ====== Guardar / Validar ======
  public guardarSeccion5(): void { this.guardarDatos('C'); }
  public guardarSeccion5Incompleta(): void { this.guardarDatos('I'); }

 /**
 * Guarda la sección 5 como Completa (C) o Incompleta (I)
 * Si se solicita Completa pero el formulario es inválido, guarda como Incompleta
 */
private async guardarDatos(estadoSolicitado: 'C' | 'I'): Promise<void> {
  // ✅ 1. Activar visualización de errores
  this.showAllErrors = true;
  this.showGroupErrors = true;

  // ✅ 2. Sincronizar validadores de matrices antes de validar
  this.p514Rows?.forEach((r: any) => this.refreshRowValidators(r));
  this.p526Rows?.forEach((r: any) => this.refreshRowValidators(r));
  this.ficha5Form.updateValueAndValidity({ emitEvent: false });

  // ✅ 3. Determinar estado destino basado en validez del formulario
  const formOk = this.ficha5Form.valid;
  const estadoDestino: 'C' | 'I' = (estadoSolicitado === 'C' && formOk) ? 'C' : 'I';

  // ✅ 4. Si pidió Completo pero está incompleto, avisar y esperar confirmación
  if (estadoSolicitado === 'C' && estadoDestino === 'I') {
    this.ficha5Form.markAllAsTouched();
    this.verificarCamposInvalidos();
    this.persistRequiredErrors();
    this.scrollToFirstError();
    
    // 🔔 ESPERAR a que el usuario presione OK antes de continuar
    await Swal.fire({
      icon: 'warning',
      title: 'Faltan respuestas',
      text: 'Completa los campos obligatorios antes de guardar como COMPLETA. Se guardará como INCOMPLETA.',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false
    });
    // ⚠️ NO hacer return - continuar después de que presione OK
  }

  // ✅ 5. Mostrar spinner de carga
  Swal.fire({ 
    title: 'Guardando...', 
    allowOutsideClick: false, 
    didOpen: () => Swal.showLoading() 
  });

  // ✅ 6. Preparar payload con el estado determinado
  const payload = this.prepareSaveData(estadoDestino);
  console.debug('[S5] Guardando con estado:', estadoDestino, 'payload:', payload);

  try {
    // ✅ 7. Enviar al backend
    const resp = await lastValueFrom(
      this.fichaService.guardarFichaSeccion5(payload).pipe(takeUntil(this.destroy$))
    );
    
    Swal.close();
    
    // ✅ 8. Mensaje de éxito diferenciado
    const mensaje = estadoDestino === 'C' 
      ? (resp?.mensaje || 'Sección 5 guardada como COMPLETA.')
      : (resp?.mensaje || 'Sección 5 guardada como INCOMPLETA.');
    
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });

    // ✅ 9. Actualizar estado del formulario
    this.ficha5Form.patchValue({ estado_s5: estadoDestino }, { emitEvent: false });
    this.ficha5Form.markAsPristine();
    
    // ✅ 10. Limpiar errores solo si guardó exitosamente
    this.showAllErrors = false;
    this.showGroupErrors = false;
    
    // ✅ 11. Emitir eventos al componente padre
    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estadoDestino);

    // ✅ 12. Persistir en localStorage (opcional)
    const raw = { ...payload };
    localStorage.setItem('pantbc_s5', JSON.stringify(raw));
    
  } catch (e: any) {
    Swal.close();
    console.error('[S5 guardar ERR]', e?.status, e?.message, e?.error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la sección 5.',
      confirmButtonText: 'Entendido'
    });
  }
}

  public validarSeccion(): void {
    const estado = this.f('estado_s5')?.value;
    const idFichas5 = this.f('idFichas5')?.value ?? this.idFicha;
    if (!this.idFicha) {
      Swal.fire('Error', 'No se ha podido identificar la ficha actual.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'Guarda la sección como "Completa" antes de validar.', 'warning');
      return;
    }

    const payload = { idFichas5, valida_s5: '1' };
    this.fichaService.validarFichaSeccion5(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.f('valida_s5')?.setValue('1', { emitEvent: false });
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 5 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar S5:', err);
        Swal.fire('Error', 'No se pudo validar la sección 5.', 'error');
      }
    });
  }

  private autosaveSilencioso(): void {
    if (!this.idFicha) return;
    this.ficha5Form.updateValueAndValidity({ emitEvent: false });
    if (!this.ficha5Form.dirty) return;
    const estado: 'C' | 'I' = this.ficha5Form.valid ? 'C' : 'I';
    const payload = this.prepareSaveData(estado);
    this.fichaService.guardarFichaSeccion5(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.debug('[S5 autosave OK]', { estado }),
      error: (err) => console.error('[S5 autosave ERR]', err?.status, err?.message, err?.error)
    });
  }


  
  /** Fuerza (re)validar las reglas de grupo inmediatamente antes de guardar */
// private enforceGroupRules(): void {
 
//   // P4.16: si p15Recibe = 'S' (y no “Ninguna”), al menos una institución
//   const rec = this.f('p515Recibe')?.value === 'S';
//   const ning = this.f('p516Ninguna')?.value === 'S';
//   const keys410 = ['p516Mre','p516Reniec','p516Migraciones','p516Interpol','p516Inei',
//     'p516Jne','p516Onpe','p516Sunarp','p516PoderJudicial','p516Otro'];
//   const any410 = keys410.some(k => this.f(k)?.value === 'S');
//   const prev49 = this.f('p515Recibe')?.errors || {};
//   if (rec && !ning && !any410) {
//     this.f('p515Recibe')?.setErrors({ ...prev49, p416Group: true });
//   } else {
//     if ('p416Group' in prev49) delete prev49['p416Group'];
//     this.f('p515Recibe')?.setErrors(Object.keys(prev49).length ? prev49 : null);
//   }
//   this.f('p515Recibe')?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
// }


  private prepareSaveData(estado: 'C' | 'I') {
    const raw = this.ficha5Form.getRawValue();

      delete raw.p514Any;
      delete raw.p526Any;
    // id + estado
    raw.idFicha   = this.idFicha ?? raw.idFicha ?? null;
    raw.estado_s5 = estado;

    // No convertimos S/N ni checks: ya guardamos 'S'|null y radios 'S'|'N'
    return raw;
  }

  // ===== Carga de datos =====
  private populateForm(d: any): void {
    // id ficha
    this.idFicha = d?.idFicha ?? this.idFicha;
    this.f('idFicha')?.setValue(this.idFicha, { emitEvent: false });

    // Parcheo directo (mantengo 'S'|null y 'S'/'N')
    this.ficha5Form.patchValue({
      idFichas5: d.idFichas5 ?? null,
      idFicha: d.idFicha ?? this.idFicha,
      estado_s5: d.estado_s5 ?? '',
      valida_s5: d.valida_s5 ?? '',

      p511Requiere: d.p511Requiere ?? null,
      p512Afirmativa: d.p512Afirmativa ?? null,

      p513Nac2023: d.p513Nac2023 ?? null,
      p513Mat2023: d.p513Mat2023 ?? null,
      p513Def2023: d.p513Def2023 ?? null,
      p513Nac2024: d.p513Nac2024 ?? null,
      p513Mat2024: d.p513Mat2024 ?? null,
      p513Def2024: d.p513Def2024 ?? null,
      p513Nac2025: d.p513Nac2025 ?? null,
      p513Mat2025: d.p513Mat2025 ?? null,
      p513Def2025: d.p513Def2025 ?? null,

      p514aLogistica: d.p514aLogistica ?? null,
      p514aGestiones: d.p514aGestiones ?? null,
      p514aSuficiente: d.p514aSuficiente ?? null,
      p514aEspecifique: d.p514aEspecifique ?? '',
      p514bInfra: d.p514bInfra ?? null,
      p514bGestiones: d.p514bGestiones ?? null,
      p514bSuficiente: d.p514bSuficiente ?? null,
      p514bEspecifique: d.p514bEspecifique ?? '',
      p514cPersonal: d.p514cPersonal ?? null,
      p514cGestiones: d.p514cGestiones ?? null,
      p514cSuficiente: d.p514cSuficiente ?? null,
      p514cEspecifique: d.p514cEspecifique ?? '',
      p514dPresupuesto: d.p514dPresupuesto ?? null,
      p514dGestiones: d.p514dGestiones ?? null,
      p514dSuficiente: d.p514dSuficiente ?? null,
      p514dEspecifique: d.p514dEspecifique ?? '',
      p514eOtro: d.p514eOtro ?? null,
      p514eGestiones: d.p514eGestiones ?? null,
      p514eSuficiente: d.p514eSuficiente ?? null,
      p514eEspecifique: d.p514eEspecifique ?? '',
      p514eOtroDetalle: d.p514eOtroDetalle ?? '',
      p514Ninguna: d.p514Ninguna ?? null,

      p515Recibe: d.p515Recibe ?? null,
      p516Mre: d.p516Mre ?? null,
      p516Reniec: d.p516Reniec ?? null,
      p516Migraciones: d.p516Migraciones ?? null,
      p516Interpol: d.p516Interpol ?? null,
      p516Inei: d.p516Inei ?? null,
      p516Jne: d.p516Jne ?? null,
      p516Onpe: d.p516Onpe ?? null,
      p516Sunarp: d.p516Sunarp ?? null,
      p516PoderJudicial: d.p516PoderJudicial ?? null,
      p516Otro: d.p516Otro ?? null,
      p516OtroDetalle: d.p516OtroDetalle ?? '',
      p516Ninguna: d.p516Ninguna ?? null,

      p521Requiere: d.p521Requiere ?? null,
      p522Afirmativa: d.p522Afirmativa ?? null,

      p523Reniec: d.p523Reniec ?? null,

      p524Mayores2023: d.p524Mayores2023 ?? null,
      p524Mayores2024: d.p524Mayores2024 ?? null,
      p524Mayores2025: d.p524Mayores2025 ?? null,
      p524Menores2023: d.p524Menores2023 ?? null,
      p524Menores2024: d.p524Menores2024 ?? null,
      p524Menores2025: d.p524Menores2025 ?? null,
      p524Datos2023: d.p524Datos2023 ?? null,
      p524Datos2024: d.p524Datos2024 ?? null,
      p524Datos2025: d.p524Datos2025 ?? null,
      p524Renovacion2023: d.p524Renovacion2023 ?? null,
      p524Renovacion2024: d.p524Renovacion2024 ?? null,
      p524Renovacion2025: d.p524Renovacion2025 ?? null,
      p524Duplicado2023: d.p524Duplicado2023 ?? null,
      p524Duplicado2024: d.p524Duplicado2024 ?? null,
      p524Duplicado2025: d.p524Duplicado2025 ?? null,
      p524Canje2023: d.p524Canje2023 ?? null,
      p524Canje2024: d.p524Canje2024 ?? null,
      p524Canje2025: d.p524Canje2025 ?? null,

      p525Emite: d.p525Emite ?? null,
      p525CostoSol: d.p525CostoSol ?? null,
      p525CostoUsd: d.p525CostoUsd ?? null,

      p526aLogistica: d.p526aLogistica ?? null,
      p526aGestiones: d.p526aGestiones ?? null,
      p526aSuficiente: d.p526aSuficiente ?? null,
      p526aEspecifique: d.p526aEspecifique ?? '',
      p526bInfra: d.p526bInfra ?? null,
      p526bGestiones: d.p526bGestiones ?? null,
      p526bSuficiente: d.p526bSuficiente ?? null,
      p526bEspecifique: d.p526bEspecifique ?? '',
      p526cPersonal: d.p526cPersonal ?? null,
      p526cGestiones: d.p526cGestiones ?? null,
      p526cSuficiente: d.p526cSuficiente ?? null,
      p526cEspecifique: d.p526cEspecifique ?? '',
      p526dPresupuesto: d.p526dPresupuesto ?? null,
      p526dGestiones: d.p526dGestiones ?? null,
      p526dSuficiente: d.p526dSuficiente ?? null,
      p526dEspecifique: d.p526dEspecifique ?? '',
      p526eOtro: d.p526eOtro ?? null,
      p526eGestiones: d.p526eGestiones ?? null,
      p526eSuficiente: d.p526eSuficiente ?? null,
      p526eEspecifique: d.p526eEspecifique ?? '',
      p526eOtroDetalle: d.p526eOtroDetalle ?? '',
      p526Ninguno: d.p526Ninguno ?? null,

      p527Recibe: d.p527Recibe ?? null,
      p528Mre: d.p528Mre ?? null,
      p528Reniec: d.p528Reniec ?? null,
      p528Migraciones: d.p528Migraciones ?? null,
      p528Interpol: d.p528Interpol ?? null,
      p528Inei: d.p528Inei ?? null,
      p528Jne: d.p528Jne ?? null,
      p528Onpe: d.p528Onpe ?? null,
      p528Sunarp: d.p528Sunarp ?? null,
      p528PoderJudicial: d.p528PoderJudicial ?? null,
      p528Otro: d.p528Otro ?? null,
      p528OtroDetalle: d.p528OtroDetalle ?? '',
      p528Ninguna: d.p528Ninguna ?? null,
    }, { emitEvent: false });

 this.f('p514Any')?.updateValueAndValidity({ emitEvent: false });
  this.f('p526Any')?.updateValueAndValidity({ emitEvent: false });

       this.ficha5Form.updateValueAndValidity({ emitEvent: false });

          queueMicrotask(() => this.revalidateP528?.());
          queueMicrotask(() => this.revalidateP516?.());

    if (this.ficha5Form.invalid) {
      this.showAllErrors = true;
      this.persistRequiredErrors();
      this.cdr.markForCheck();
    }

    this.ficha5Form.markAsPristine();
    console.debug('[S5] form poblado:', this.ficha5Form.getRawValue());

        this.hydrating = false;

  }

  // ===== Validadores / utils =====
  private nonNegativeInt() {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 ? null : { nonNegativeInt: true };
    };
  }

  private money() {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) && n >= 0 ? null : { money: true };
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
    console.warn('--- S5 INVÁLIDO ---');
    Object.keys(this.ficha5Form.controls).forEach(k => {
      const c = this.ficha5Form.get(k);
      if (c && c.invalid) {
        console.warn(` ${k}`, { value: c.value, errors: c.errors, disabled: c.disabled });
      }
    });
    console.warn('Form errors (root):', this.ficha5Form.errors);
  }





  onCheckboxChange(name: string, ev: any) {
  const ctrl = this.f(name);
  if (!ctrl || ctrl.disabled) return;

  const checked = !!ev?.checked;
  
  // Usar setValue con emitEvent controlado
  ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
  ctrl.markAsDirty();
  ctrl.markAsTouched();
  
}

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



/** Devuelve las keys de controles con Validators.required actualmente activo y habilitado */
private getRequiredControlNames(): string[] {
  const keys = Object.keys(this.ficha5Form.controls);
  return keys.filter(k => {
    const c = this.ficha5Form.get(k);
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
    const c = this.ficha5Form.get(k)!;
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
 *  Respeta showAllErrors para mostrar errores en validación completa
 */
public hasError(controlName: string, errorType: string): boolean {
  const control = this.f(controlName);
  if (!control) return false;


  const shouldShow = this.showAllErrors || control.touched || control.dirty;
  
  return !!(control.hasError(errorType) && shouldShow);
}

//  public showGroupErrors = false;

private showErrorsAndPersist(): void {
  this.showAllErrors = true;
  this.showGroupErrors = true; // ← agrega esto
  this.ficha5Form.markAllAsTouched();
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

/**
 * 🧪 Método de testing para verificar estado de checkboxes
 * Uso en consola: component.debugCheckboxGroup('p2110Psicologico', ['p2111Presencial', 'p2111Llamada', 'p2111Videolla'])
 */
  private disableSoftWithString(ctrl: AbstractControl | null) {
    if (!ctrl) return;
    ctrl.reset({ value: '', disabled: true });
    ctrl.clearValidators();
  }


get showP514GroupError(): boolean {
  const anyCtrl = this.f('p514Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}


get showP526GroupError(): boolean {
  const anyCtrl = this.f('p526Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}
  
get showP528GroupError(): boolean {
  const p527 = this.f('p527Recibe');
  
  // Solo mostrar si el control está tocado O si estamos mostrando todos los errores
  const shouldShow = this.showAllErrors || this.showGroupErrors || p527?.touched;
  
  return !!(
    shouldShow && 
    p527?.value === 'S' && 
    p527?.errors?.['p528Group']
  );
}


get showP516GroupError(): boolean {
  const p515 = this.f('p515Recibe');
  
  const shouldShow = this.showAllErrors || this.showGroupErrors || p515?.touched;
  
  return !!(
    shouldShow && 
    p515?.value === 'S' && 
    p515?.errors?.['p516Group']
  );
}




    limitarDigitosTextarea(event: any, maxLength: number = 500): void {
    const input = event.target;
    const valor = input.value; 
    if (valor.length > maxLength) {
      input.value = valor.slice(0, maxLength); 
    }
  }




  
    // ========================================
    //  NUEVO SISTEMA DE AUTOSAVE
    // ========================================
  
 
    private iniciarAutosave(): void {
      console.log('📝 Autosave activado para Sección 5');
  
      // 🔹 Paso 1: Guardar estado actual inmediatamente
      if (this.puedeHacerAutosave()) {
        console.log('💾 Ejecutando autosave inicial...');
        this.ejecutarAutosave();
      } else {
        console.warn('⚠️ No se puede hacer autosave inicial:', {
          hydrating: this.hydrating,
          idFicha: this.idFicha,
          formValid: this.ficha5Form.valid,
          formDirty: this.ficha5Form.dirty
        });
      }
  
      //  Escucha cambios en el formulario
      this.ficha5Form.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(this.AUTOSAVE_DELAY) // Esperar 3s después del último cambio
        )
        .subscribe(() => {
          if (this.puedeHacerAutosave()) {
            console.log('💾 Ejecutando autosave por cambio en formulario...');
            this.ejecutarAutosave();
          }
        });
    }
  
    /**
     * Verifica si se puede hacer autosave
     * Condiciones más flexibles que shouldAutosave()
     */
    private puedeHacerAutosave(): boolean {
      //  No guardar mientras se está hidratando
      if (this.hydrating) {
        console.log('⏳ Esperando... formulario hidratándose');
        return false;
      }
  
      //  No guardar si no hay ID de ficha
      if (!this.idFicha) {
        console.warn(' No hay idFicha disponible');
        return false;
      }
  
      // CAMBIO IMPORTANTE: Permitir autosave incluso si form está pristine
      // Esto permite guardar el estado inicial cuando se abre la sección
      return true;
    }
  
    /**
     * Ejecuta el autosave silencioso , reemplaza a autosaveSilencioso()  // 
     */
    private ejecutarAutosave(): void {
      const estadoActual = this.f('estado_s5')?.value as 'C' | 'I' | '' | null;
      
      // - Si ya está completo (C) y sigue válido --> mantener C
      // - Sino --> marcar como Incompleto (I)
      const estadoDestino: 'C' | 'I' = 
        (estadoActual === 'C' && this.ficha5Form.valid) ? 'C' : 'I';
  
      const payload = this.prepareSaveData(estadoDestino);
  
      console.log('📤 Enviando autosave:', {
        estadoActual,
        estadoDestino,
        formValid: this.ficha5Form.valid,
        formDirty: this.ficha5Form.dirty
      });
  
      this.fichaService.guardarFichaSeccion5(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log('✅ Autosave exitoso:', res);
            this.ficha5Form.markAsPristine();
          },
          error: (err) => {
            console.error(' Error en autosave:', err?.status, err?.message, err?.error);
          }
        });
    }
  
    /**
     * Detiene el autosave (limpia timers)
     */
    private detenerAutosave(): void {
      if (this.autosaveTimer) {
        clearTimeout(this.autosaveTimer);
        this.autosaveTimer = null;
      }
    }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////

  




}
