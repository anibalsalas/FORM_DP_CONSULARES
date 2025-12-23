import {
  Component, EventEmitter, Output, OnInit, Input, OnChanges,
  SimpleChanges, OnDestroy, inject, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, lastValueFrom } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';

// Servicios
import { Ficha1Service } from '../ficha1.service';
import { AuthService } from '../../../auth/services/auth.service';

// Material Modules
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';

// Directivas
import { Max3DigitsDirective } from './max-3digits.directive';
import { Max4DigitsDirective } from './max-4digits.directive';
import { TextOnlyDirective } from './text-only.directive';

import { environment } from '../../../../environments/environment';

// ============================================
// CONSTANTES Y CONFIGURACIONES
// ============================================

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

const AUTOSAVE_DELAY_MS = 3000;
const MAX_PERCENTAGE = 100;
const MAX_INPUT_DIGITS = 5;

// ============================================
// TIPOS
// ============================================

type SN = 'S' | 'N' | null;
type EstadoSeccion = 'C' | 'I' | '';

interface MatrizFilaCfg {
  label: string;
  check: string;
  gestion: string;
  suficiente: string;
  observaciones: string;
  especifique?: string;
}

interface MatrizCfg {
  filas: MatrizFilaCfg[];
  ninguno: string;
}

type KnownErr = 'required' | 'requireOne' | 'min' | 'exceedsTotal' | 'positiveInt';

// ============================================
// COMPONENTE
// ============================================

@Component({
  selector: 'app-seccion-ficha2',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatRadioModule, MatCheckbox,
    MatSelectModule, Max3DigitsDirective, Max4DigitsDirective, TextOnlyDirective
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './seccion-ficha2.component.html',
  styleUrls: ['./seccion-ficha2.component.scss']
})
export class SeccionFicha2Component implements OnInit, OnChanges, OnDestroy {

  // ============================================
  // INPUTS / OUTPUTS
  // ============================================
  @Input() datosFicha2: any;
  @Input() activarAutosave!: boolean;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onEstadoActualizado = new EventEmitter<string>();
  @Output() seccionValidada = new EventEmitter<void>();

  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  ficha2Form!: FormGroup;
  showAllErrors = false;
  showGroupErrors = false;

  private destroy$ = new Subject<void>();
  private idFicha: number | null = null;
  private hydrating = false;
  private autosaveTimer: any = null;
  private numericKeys: string[] = [];
  private allCheckboxes: string[] = [];

  // ============================================
  // SERVICIOS INYECTADOS
  // ============================================
  private readonly fb = inject(FormBuilder);
  private readonly fichaService = inject(Ficha1Service);
  private readonly authService = inject(AuthService);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly cdr = inject(ChangeDetectorRef);

  // Roles
  readonly rolAdministrador = environment.rolAdministrador;
  readonly rolComisionado = environment.rolComisionado;
  readonly rolEspecialista = environment.rolEspecialista;

  // ============================================
  // CONFIGURACIONES DE FORMULARIO
  // ============================================

  /** Configuración de años para Trata de Personas */
  readonly tpHMByYear = [
    this.createYearConfig('2023'),
    this.createYearConfig('2024'),
    this.createYearConfig('2025')
  ];

  /** Configuración de trata de personas - Checkboxes */
  readonly tpAcceso = ['p2111Presencial', 'p2111Llamada', 'p2111Videolla'];
  readonly tpCanales = ['p2113Presencial', 'p2113Telefono', 'p2113Whatsapp', 'p2113Virtual', 'p2113Facebook', 'p2113CuentaX', 'p2113Correo'];
  readonly tpCoordina = ['p2114Policia', 'p2114MinPublico', 'p2114Interpol', 'p2114PoderJudicial', 'p2114Organismo', 'p2114Otros'];
  readonly tpInstituciones = ['p2117Mre', 'p2117Reniec', 'p2117Migraciones', 'p2117Interpol', 'p2117Inei', 'p2117Jne', 'p2117Onpe', 'p2117Sunarp', 'p2117PoderJudicial', 'p2117Otros'];

  /** Configuración orientado/asistido TP */
  readonly tpOrientado = [
    { label: '2023', orientado: 'p2162023Orientado', asistio: 'p2162023Asistio' },
    { label: '2024', orientado: 'p2162024Orientado', asistio: 'p2162024Asistio' },
    { label: '2025 (primer semestre)', orientado: 'p2162025Orientado', asistio: 'p2162025Asistio' }
  ];

  /** Configuración Violencia de Género */
  readonly vgOrientado = [
    { label: '2023', orienta: 'p21182023Orientado', asiste: 'p21182023Asistido', num: 'p21182023NumCasos' },
    { label: '2024', orienta: 'p21182024Orientado', asiste: 'p21182024Asistido', num: 'p21182024NumCasos' },
    { label: '2025', orienta: 'p21182025Orientado', asiste: 'p21182025Asistido', num: 'p21182025NumCasos' }
  ];

  readonly vgAcceso = ['p2123Presencial', 'p2123Telefono', 'p2123Videollama'];
  readonly vgCanales = ['p2126Presencial', 'p2126Telefonica', 'p2126Whatsapp', 'p2126Virtual', 'p2126Facebook', 'p2126CuentaX', 'p2126Correo'];
  readonly vgCoordina = ['p2127Policia', 'p2127MinPublico', 'p2127Interpol', 'p2127PoderJudicial', 'p2127Organizacion', 'p2127Otros'];
  readonly vgInstituciones = ['p2130Mre', 'p2130Reniec', 'p2130Migraciones', 'p2130Interpol', 'p2130Inei', 'p2130Jne', 'p2130Onpe', 'p2130Sunarp', 'p2130PoderJudicial', 'p2130Otros'];

  /** Configuración Deportación/Detención/Expulsión */
  readonly ddePorAnio = [
    { label: '2023', numAnio: 'p21312023NumAnio', detenciones: 'p21312023Detenciones', deportacion: 'p21312023Deportacion', expulsion: 'p21312023Expulsion' },
    { label: '2024', numAnio: 'p21312024NumAnio', detenciones: 'p21312024Detenciones', deportacion: 'p21312024Deportacion', expulsion: 'p21312024Expulsion' },
    { label: '2025', numAnio: 'p21312025NumAnio', detenciones: 'p21312025Detenciones', deportacion: 'p21312025Deportacion', expulsion: 'p21312025Expulsion' }
  ];

  readonly ddeCanales = ['p2135Presencial', 'p2135Llamada', 'p2135Videolla'];
  readonly ddeCanales2 = ['p2137Presecnial', 'p2137Telefono', 'p2137Whatsapp', 'p2137Virtual', 'p2137Facebook', 'p2137CuentaX', 'p2137Correo'];
  readonly ddeCoordina = ['p2138Policia', 'p2138MinPublico', 'p2138Interpol', 'p2138PoderJudicial', 'p2138Organismo', 'p2138Otros'];
  readonly ddeInstituciones = ['p2141Mre', 'p2141Reniec', 'p2141Migraciones', 'p2141Interpol', 'p2141Inei', 'p2141Jne', 'p2141Onpe', 'p2141Sunarp', 'p2141PoderJudicial', 'p2141Otro'];

  /** Configuración Asistencia Humanitaria */
  readonly ahInstituciones = ['p2212Mre', 'p2212Reniec', 'p2212Migraciones', 'p2212Interpol', 'p2212Inei', 'p2212Jne', 'p2212Onpe', 'p2212Sunarp', 'p2212PoderJudicial', 'p2212Otros'];

  readonly ahEventos = [
    { label: 'Desastres', y23: 'p223Desastres2023', y24: 'p223Desastres2024', y25: 'p223Desastres2025' },
    { label: 'Conflictos sociales', y23: 'p223Sociales2023', y24: 'p223Sociales2024', y25: 'p223Sociales2025' },
    { label: 'Accidentes', y23: 'p223Accidentes2023', y24: 'p223Accidentes2024', y25: 'p223Accidentes2025' },
    { label: 'Repatriaciones', y23: 'p223Repatriaciones2023', y24: 'p223Repatriaciones2024', y25: 'p223Repatriaciones2025' },
    { label: 'Fallecidos', y23: 'p223Fallecidos2023', y24: 'p223Fallecidos2024', y25: 'p223Fallecidos2025' }
  ];

  readonly ahBloques = [
    {
      title: 'Atenciones brindadas ante desastres naturales(P2.2.4.)',
      years: [
        { label: '2023', num: 'p2242023NumCasos', mat: 'p2242023Material', eco: 'p2242023Economica' },
        { label: '2024', num: 'p2242024NumCasos', mat: 'p2242024Material', eco: 'p2242024Economica' },
        { label: '2025', num: 'p2242025NumCasos', mat: 'p2242025Material', eco: 'p2242025Economica' }
      ]
    },
    {
      title: 'Atenciones brindadas ante convulsiones sociales  (P2.2.5.)',
      years: [
        { label: '2023', num: 'p2252023NumCasos', mat: 'p2252023Material', eco: 'p2252023Economica' },
        { label: '2024', num: 'p2252024NumCasos', mat: 'p2252024Material', eco: 'p2252024Economica' },
        { label: '2025', num: 'p2252025NumCasos', mat: 'p2252025Material', eco: 'p2252025Economica' }
      ]
    },
    {
      title: 'Atenciones brindadas ante robos, accidentes y similares (P2.2.6.)',
      years: [
        { label: '2023', num: 'p2262023NumCasos', mat: 'p2262023Material', eco: 'p2262023Economica' },
        { label: '2024', num: 'p2262024NumCasos', mat: 'p2262024Material', eco: 'p2262024Economica' },
        { label: '2025', num: 'p2262025NumCasos', mat: 'p2262025Material', eco: 'p2262025Economica' }
      ]
    }
  ];

  readonly ahIndicadores = [
    {
      title: 'Visitas realizadas a personas privadas de su libertad, hospitalizadas, o personas en estado de vulnerabilidad, a fin de brindar protección humanitaria (P2.2.7.)',
      row1: 'Indicador',
      rows: [
        { label: 'Personas privadas de libertad ', y23: 'p227Privadas2023', y24: 'p227Privadas2024', y25: 'p227Privadas2025' },
        { label: 'Personas hospitalizadas', y23: 'p227Hospitalizada2023', y24: 'p227Hospitalizada2024', y25: 'p227Hospitalizada2025' },
        { label: 'Personas en estado de vulnerabilidad ', y23: 'p227Estado2023', y24: 'p227Estado2024', y25: 'p227Estado2025' }
      ]
    },
    {
      title: 'Según el registro consular de personas necesitadas de ayuda humanitaria (P2.2.8.)',
      row1: 'Indicador',
      rows: [
        { label: 'Detenidos', y23: 'p2282023Detenidos', y24: 'p2282024Detenidos', y25: 'p2282025Detenidos' },
        { label: 'Hospitalizados', y23: 'p2282023Hospitali', y24: 'p2282024Hospitali', y25: 'p2282025Hospitali' },
        { label: 'Mujeres víctimas de violencia de género', y23: 'p2282023Mujeres', y24: 'p2282024Mujeres', y25: 'p2282025Mujeres' },
        { label: 'Personas en estado de vulnerabilidad ', y23: 'p2282023Estado', y24: 'p2282024Estado', y25: 'p2282025Estado' }
      ]
    },
    {
      title: 'Ubicaciones / Repatriaciones / Extradiciones / Restos (P2.2.9.)',
      row1: 'Indicador',
      rows: [
        { label: 'Ubicados', y23: 'p2292023Ubicados', y24: 'p2292024Ubicados', y25: 'p2292025Ubicados' },
        { label: 'Repatriados', y23: 'p2292023Repatriados', y24: 'p2292024Repatriados', y25: 'p2292025Repatriados' },
        { label: 'Extradiciones', y23: 'p2292023Extradiciones', y24: 'p2292024Extradiciones', y25: 'p2292025Extradiciones' },
        { label: 'Restos repatriados', y23: 'p2292023Restos', y24: 'p2292024Restos', y25: 'p2292025Restos' }
      ]
    }
  ];

  /** Configuración de matrices de necesidades */
  // readonly mxTP: MatrizCfg = this.createMatrizConfig('p2115');
  // readonly mxVG: MatrizCfg = this.createMatrizConfig('p2128');
  // readonly mxDDE: MatrizCfg = this.createMatrizConfig('p2139');
  // readonly mxAH: MatrizCfg = this.createMatrizConfig('p2210');

  //private readonly MATRICES: MatrizCfg[] = [this.mxTP, this.mxVG, this.mxDDE, this.mxAH];


  // En lugar de usar createMatrizConfig(), usa las definiciones explícitas:

/** Configuración de matrices de necesidades */
readonly mxTP: MatrizCfg = {
  ninguno: 'p2115Ninguno',
  filas: [
    { label: 'Logística', check: 'p2115ALogistica', gestion: 'p2115AGestiones', suficiente: 'p2115ASuficiente', observaciones: 'p2115AEspecifique' },
    { label: 'Infraestructura', check: 'p2115BInfra', gestion: 'p2115BGestiones', suficiente: 'p2115BSuficiente', observaciones: 'p2115BEspecifique' },
    { label: 'Personal', check: 'p2115CPersonal', gestion: 'p2115CGestiones', suficiente: 'p2115CSuficiente', observaciones: 'p2115CEspecifique' },
    { label: 'Presupuesto', check: 'p2115DPresupuesto', gestion: 'p2115DGestiones', suficiente: 'p2115DSuficiente', observaciones: 'p2115DEspecifique' },
    { label: 'Otro', check: 'p2115EOtro', gestion: 'p2115EGestiones', suficiente: 'p2115ESuficiente', observaciones: 'p2115EEspecifique', especifique: 'p2115EOtroDetalle' }
  ]
};

readonly mxVG: MatrizCfg = {
  ninguno: 'p2128Ninguno',
  filas: [
    { label: 'Logística', check: 'p2128ALogistica', gestion: 'p2128AGestiones', suficiente: 'p2128ASuficiente', observaciones: 'p2128AEspecifique' },
    { label: 'Infraestructura', check: 'p2128BInfra', gestion: 'p2128BGestiones', suficiente: 'p2128BSuficiente', observaciones: 'p2128BEspecifique' },
    { label: 'Personal', check: 'p2128CPersonal', gestion: 'p2128CGestiones', suficiente: 'p2128CSuficiente', observaciones: 'p2128CEspecifique' },
    { label: 'Presupuesto', check: 'p2128DPresupuesto', gestion: 'p2128DGestiones', suficiente: 'p2128DSuficiente', observaciones: 'p2128DEspecifique' },
    { label: 'Otro', check: 'p2128EOtro', gestion: 'p2128EGestiones', suficiente: 'p2128ESuficiente', observaciones: 'p2128EEspecifique', especifique: 'p2128EOtroDetalle' }
  ]
};

readonly mxDDE: MatrizCfg = {
  ninguno: 'p2139Ninguno',
  filas: [
    { label: 'Logística', check: 'p2139ALogistica', gestion: 'p2139AGestiones', suficiente: 'p2139ASuficiente', observaciones: 'p2139AEspecifique' },
    { label: 'Infraestructura', check: 'p2139BInfra', gestion: 'p2139BGestiones', suficiente: 'p2139BSuficiente', observaciones: 'p2139BEspecifique' },
    { label: 'Personal', check: 'p2139CPersonal', gestion: 'p2139CGestiones', suficiente: 'p2139CSuficiente', observaciones: 'p2139CEspecifique' },
    { label: 'Presupuesto', check: 'p2139DPresupuesto', gestion: 'p2139DGestiones', suficiente: 'p2139DSuficiente', observaciones: 'p2139DEspecifique' },
    { label: 'Otro', check: 'p2139EOtro', gestion: 'p2139EGestiones', suficiente: 'p2139ESuficiente', observaciones: 'p2139EEspecifique', especifique: 'p2139EOtroDetalle' }
  ]
};

readonly mxAH: MatrizCfg = {
  ninguno: 'p2210Ninguno',
  filas: [
    { label: 'Logística', check: 'p2210ALogistica', gestion: 'p2210AGestiones', suficiente: 'p2210ASuficiente', observaciones: 'p2210AEspecifique' },
    { label: 'Infraestructura', check: 'p2210BInfra', gestion: 'p2210BGestiones', suficiente: 'p2210BSuficiente', observaciones: 'p2210BEspecifique' },
    { label: 'Personal', check: 'p2210CPersonal', gestion: 'p2210CGestiones', suficiente: 'p2210CSuficiente', observaciones: 'p2210CEspecifique' },
    { label: 'Presupuesto', check: 'p2210DPresupuesto', gestion: 'p2210DGestiones', suficiente: 'p2210DSuficiente', observaciones: 'p2210DEspecifique' },
    { label: 'Otro', check: 'p2210EOtro', gestion: 'p2210EGestiones', suficiente: 'p2210ESuficiente', observaciones: 'p2210EEspecifique', especifique: 'p2210EOtroDetalle' }
  ]
};

private readonly MATRICES: MatrizCfg[] = [this.mxTP, this.mxVG, this.mxDDE, this.mxAH];

  // Funciones de revalidación
  private revalidateP2110?: () => void;
  private revalidateP2116?: () => void;
  private revalidateP2123?: () => void;
  private revalidateP2129?: () => void;
  private revalidateP2132?: () => void;
  private revalidateP2135?: () => void;
  private revalidateP2136?: () => void;
  private revalidateP2140?: () => void;
  private revalidateP2212?: () => void;

  // Grupos de validación
  private readonly GROUP_CA = ['p217Protocolo', 'p217Flujograma', 'p217Ninguna'];
  private readonly GROUP_P2119 = ['p2119Oficina', 'p2119Flojograma', 'p2119Ninguno'];
  private readonly GROUP_P2132 = ['p2132OfiConsular', 'p2132Flujograma', 'p2132Ninguno'];
  private readonly GROUP_CA2113 = ['p2113Presencial', 'p2113Telefono', 'p2113Whatsapp', 'p2113Virtual', 'p2113Facebook', 'p2113CuentaX', 'p2113Correo'];
  private readonly GROUP_CA2114 = ['p2114Policia', 'p2114MinPublico', 'p2114Interpol', 'p2114PoderJudicial', 'p2114Organismo', 'p2114Otros', 'p2114Ninguna'];
  private readonly GROUP_CA2126 = ['p2126Presencial', 'p2126Telefonica', 'p2126Whatsapp', 'p2126Virtual', 'p2126Facebook', 'p2126CuentaX', 'p2126Correo'];
  private readonly GROUP_CA2127 = ['p2127Policia', 'p2127MinPublico', 'p2127Interpol', 'p2127PoderJudicial', 'p2127Organizacion', 'p2127Otros', 'p2127Ninguna'];
  private readonly GROUP_CA2138 = ['p2138Policia', 'p2138MinPublico', 'p2138Interpol', 'p2138PoderJudicial', 'p2138Organismo', 'p2138Otros', 'p2138Ninguna'];

  // Mensajes personalizados de error
  private readonly CUSTOM_ERROR_MESSAGES: Record<string, Partial<Record<string, string>>> = {
    p214Labor: { required: 'Debe seleccionar una opción.' },
    p215Especifique: { required: 'Debe seleccionar una opción (a, b o c).' }
  };



  private requireAtLeastOneP2115(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha2Form) return null;
    
    const keys = ['p2115ALogistica', 'p2115BInfra', 'p2115CPersonal', 'p2115DPresupuesto', 'p2115EOtro', 'p2115Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha2Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

/**
 * Validador para P2.1.28 (Violencia de Género)
 *  AGREGAR ESTE MÉTODO
 */
private requireAtLeastOneP2128(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha2Form) return null;
    
    const keys = ['p2128ALogistica', 'p2128BInfra', 'p2128CPersonal', 'p2128DPresupuesto', 'p2128EOtro', 'p2128Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha2Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

/**
 * Validador para P2.1.39 (Deportación/Detención/Expulsión)
 *  AGREGAR ESTE MÉTODO
 */
private requireAtLeastOneP2139(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha2Form) return null;
    
    const keys = ['p2139ALogistica', 'p2139BInfra', 'p2139CPersonal', 'p2139DPresupuesto', 'p2139EOtro', 'p2139Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha2Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

/**
 * Validador para P2.2.10 (Asistencia Humanitaria)
 *  AGREGAR ESTE MÉTODO
 */
private requireAtLeastOneP2210(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!this.ficha2Form) return null;
    
    const keys = ['p2210ALogistica', 'p2210BInfra', 'p2210CPersonal', 'p2210DPresupuesto', 'p2210EOtro', 'p2210Ninguno'];
    const atLeastOne = keys.some(k => {
      const ctrl = this.ficha2Form.get(k);
      return ctrl?.value === 'S';
    });
    
    return atLeastOne ? null : { requireOne: true };
  };
}

  // ============================================
  // CONSTRUCTOR
  // ============================================
  constructor() {
    this.dateAdapter.setLocale('es-PE');
    this.initializeForm();
    this.setupFormControls();
    this.setupValidationRules();
  }

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFicha2']?.currentValue) {
      this.hydrateForm(changes['datosFicha2'].currentValue);
    }

    if (changes['activarAutosave']) {
      const { currentValue: ahora, previousValue: antes } = changes['activarAutosave'];
      if (ahora === true && antes === false) {
        this.startAutosave();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutosave();
  }

  // ============================================
  // INICIALIZACIÓN DEL FORMULARIO
  // ============================================

  /**
   * Inicializa el FormGroup base
   */
  private initializeForm(): void {
    this.ficha2Form = this.fb.group({
      // Metadata
      idFicha: [null],
      idFichaS2: [null],
      estado_s2: [''],
      valida_s2: [''],
      p2132Any: [null],

      // Protección Legal (2.1)
      ...this.createProteccionLegalControls(),

      // Violencia de Género (2.1.18-2.1.30)
      ...this.createViolenciaGeneroControls(),

      // Deportación/Detención/Expulsión (2.1.31-2.1.41)
      ...this.createDeportacionControls(),

      // Asistencia Humanitaria (2.2)
      ...this.createAsistenciaHumanitariaControls()
    });
  }

  /**
   * Crea controles para Protección Legal
   */
  private createProteccionLegalControls(): Record<string, any> {
    return {
      p211OfiConsular: [null, Validators.required],
      p212NumAsesor: [null],
      p213PeruanaCantidad: [null],
      p213ExtranjeraCantidad: [null],
      p213ExtranjeraDetalle: [{ value: null, disabled: true }],
      p214Labor: [null, Validators.required],
      p215OrganoLinea: [null, Validators.required],
      p215Especifique: [null],
      p217Protocolo: [null],
      p217Flujograma: [null],
      p217Ninguna: [null],
      //p218Protocolo: [{ value: null, disabled: true }],
      p219Emergencia: [{ value: null }],
      p2110Psicologico: [null, Validators.required],
      p2111Presencial: [null],
      p2111Llamada: [null],
      p2111Videolla: [null],
      p2112Ong: [null, Validators.required],
      p21121: [''],
      p21122: [''],
      p21123: [''],
      p2113Presencial: [null],
      p2113Telefono: [null],
      p2113Whatsapp: [null],
      p2113Virtual: [null],
      p2113Facebook: [null],
      p2113CuentaX: [null],
      p2113Correo: [null],
      p2114Policia: [null],
      p2114MinPublico: [null],
      p2114Interpol: [null],
      p2114PoderJudicial: [null],
      p2114Ninguna: [null],
      p2114Organismo: [null],
      p2114Otros: [null],
      p2114OtrosDetalle: [''],
      p2116PersonalConsul: [null, Validators.required],
      p2117Mre: [null],
      p2117Reniec: [null],
      p2117Migraciones: [null],
      p2117Interpol: [null],
      p2117Inei: [null],
      p2117Jne: [null],
      p2117Onpe: [null],
      p2117Sunarp: [null],
      p2117PoderJudicial: [null],
      p2117Otros: [null],
      p2117Ninguna: [null],
      p2117NingunaDetalle: [''],
      p2117OtrosDetalle: [null],

      p218Protocolo: [null, Validators.required], 
      

      p217Any: [null, this.requireAtLeastOneFromGroup(['p217Protocolo', 'p217Flujograma', 'p217Ninguna'])],
      p2113Any: [null, this.requireAtLeastOneFromGroup(this.tpCanales)],
      p2114Any: [null, this.requireAtLeastOneFromGroup([...this.tpCoordina, 'p2114Ninguna'])],

      p2115Any: [null, this.requireAtLeastOneP2115()], 
    };

    
  }

  /**
   * Crea controles para Violencia de Género
   */
  private createViolenciaGeneroControls(): Record<string, any> {
    return {
      p2119Oficina: [null],
      p2119Flojograma: [null],
      p2119Ninguno: [null],
      p2120Protocolo: [{ value: null, disabled: true }],
    //  p2121Violencia: [{ value: null }],
      p2121Violencia: [null, Validators.required],
      p2122Apoyo: [null, Validators.required],
      p2123Presencial: [null],
      p2123Telefono: [null],
      p2123Videollama: [null],
      p2124Ong: [null, Validators.required],
      p2125Entidad1: [''],
      p2125Entidad2: [''],
      p2125Entidad3: [''],
      p2126Presencial: [null],
      p2126Telefonica: [null],
      p2126Whatsapp: [null],
      p2126Virtual: [null],
      p2126Facebook: [null],
      p2126CuentaX: [null],
      p2126Correo: [null],
      p2127Policia: [null],
      p2127MinPublico: [null],
      p2127Interpol: [null],
      p2127PoderJudicial: [null],
      p2127Organizacion: [null],
      p2127Otros: [null],
      p2127OtrosDetallar: [''],
      p2127Ninguna: [null],
      p2129RecibePersonal: [null, Validators.required],
      p2130Mre: [null],
      p2130Reniec: [null],
      p2130Migraciones: [null],
      p2130Interpol: [null],
      p2130Inei: [null],
      p2130Jne: [null],
      p2130Onpe: [null],
      p2130Sunarp: [null],
      p2130PoderJudicial: [null],
      p2130Otros: [null],
      p2130OtrosDetalle: [''],
      p2130Ninguna: [null],
      p2130NingunaDetalle: [''],

       p2119Any: [null, this.requireAtLeastOneFromGroup(['p2119Oficina', 'p2119Flojograma', 'p2119Ninguno'])],
       p2126Any: [null, this.requireAtLeastOneFromGroup(this.vgCanales)],
       p2127Any: [null, this.requireAtLeastOneFromGroup([...this.vgCoordina, 'p2127Ninguna'])],
       p2128Any: [null, this.requireAtLeastOneP2128()], 

    };
  }

  /**
   * Crea controles para Deportación/Detención/Expulsión
   */
  private createDeportacionControls(): Record<string, any> {
    return {
      p2132OfiConsular: [null],
      p2132Flujograma: [null],
      p2132Ninguno: [null],
      p2133Protocolo: [{ value: null, disabled: true }],
      p2134Existen: [null, Validators.required],
      p2135Presencial: [null],
      p2135Llamada: [null],
      p2135Videolla: [null],
      p2136Coordina: [null, Validators.required],
      p2137Presecnial: [null],
      p2137Telefono: [null],
      p2137Whatsapp: [null],
      p2137Virtual: [null],
      p2137Facebook: [null],
      p2137CuentaX: [null],
      p2137Correo: [null],
      p2138Policia: [null],
      p2138MinPublico: [null],
      p2138Interpol: [null],
      p2138PoderJudicial: [null],
      p2138Organismo: [null],
      p2138Otros: [null],
      p2138OtrosDetalle: [''],
      p2138Ninguna: [null],
      p2140Recibe: [null, Validators.required],
      p2141Mre: [null],
      p2141Reniec: [null],
      p2141Migraciones: [null],
      p2141Interpol: [null],
      p2141Inei: [null],
      p2141Jne: [null],
      p2141Onpe: [null],
      p2141Sunarp: [null],
      p2141PoderJudicial: [null],
      p2141Otro: [null],
      p2141OtroDetalle: [''],
      p2141Ninguno: [null],

      p2132Any: [null, this.requireAtLeastOneFromGroup(['p2132OfiConsular', 'p2132Flujograma', 'p2132Ninguno'])],
      p2138Any: [null, this.requireAtLeastOneFromGroup([...this.ddeCoordina, 'p2138Ninguna'])],
      p2139Any: [null, this.requireAtLeastOneP2139()], 

    };
  }

  /**
   * Crea controles para Asistencia Humanitaria
   */
  private createAsistenciaHumanitariaControls(): Record<string, any> {
    return {
      p221Organo: [null, Validators.required],
      p221Especifique: [{ value: '', disabled: true }],
      p222Porcentaje: [null],
      p2211Recibe: [null, Validators.required],
      p2212Mre: [null],
      p2212Reniec: [null],
      p2212Migraciones: [null],
      p2212Interpol: [null],
      p2212Inei: [null],
      p2212Jne: [null],
      p2212Onpe: [null],
      p2212Sunarp: [null],
      p2212PoderJudicial: [null],
      p2212Otros: [null],
      p2212OtrosDetalle: [''],
      p2212Ninguno: [null],
      p2212NingunoDetalle: [''],
      p2210Any: [null, this.requireAtLeastOneP2210()],

    };
  }

  /**
   * Configura controles dinámicos (años, matrices, etc)
   */
  private setupFormControls(): void {
    // Agregar controles por año
    this.tpHMByYear.forEach(yearCfg => {
      this.addYearControls(yearCfg);
    });

    // Agregar controles de orientado/asistido
    this.tpOrientado.forEach(y => {
      this.addNumericControl(y.orientado);
      this.addNumericControl(y.asistio);
    });

    this.vgOrientado.forEach(y => {
      this.addRadioControl(y.orienta);
      this.addRadioControl(y.asiste);
      this.addNumericControl(y.num);
    });

    this.ddePorAnio.forEach(r => {
      [r.numAnio, r.detenciones, r.deportacion, r.expulsion].forEach(n => this.addNumericControl(n));
    });

    this.ahEventos.forEach(e => {
      [e.y23, e.y24, e.y25].forEach(n => this.addNumericControl(n));
    });

    this.ahBloques.forEach(b => {
      b.years.forEach(y => {
        [y.num, y.mat, y.eco].forEach(n => this.addNumericControl(n));
      });
    });

    this.ahIndicadores.forEach(b => {
      b.rows.forEach(r => {
        [r.y23, r.y24, r.y25].forEach(n => this.addNumericControl(n));
      });
    });

    // Agregar controles de matrices
    this.MATRICES.forEach(mx => {
      this.addCheckboxControl(mx.ninguno);
      mx.filas.forEach(f => {
        this.addCheckboxControl(f.check);
        this.addRadioControl(f.gestion, true);
        this.addRadioControl(f.suficiente, true);
        if (f.especifique) this.addTextControl(f.especifique, true);
        this.addTextControl(f.observaciones, true);
      });
    });

    // Configurar lista de checkboxes
    this.allCheckboxes = [
      ...this.tpAcceso, ...this.tpCanales, ...this.tpCoordina, ...this.tpInstituciones,
      'p213Peruana', 'p213Extranjera',
      ...this.vgAcceso, ...this.vgCanales, ...this.vgCoordina, ...this.vgInstituciones,
      ...this.ddeCanales, ...this.ddeCanales2, ...this.ddeCoordina, ...this.ddeInstituciones,
      ...this.ahInstituciones,
      'p2117Ninguna', 'p2130Ninguna', 'p2141Ninguno', 'p2212Ninguno',
      'p217Protocolo', 'p217Flujograma', 'p217Ninguna',
      'p2119Oficina', 'p2119Flojograma', 'p2119Ninguno'
    ];
  }

  /**
   * Configura todas las reglas de validación
   */
  private setupValidationRules(): void {
    // 2.1.1 → 2.1.2
    this.disableControlInitially('p212NumAsesor');
    this.bindConditionalRequired('p211OfiConsular', 'p212NumAsesor', v => v === 'S', [Validators.required, this.positiveIntValidator()]);

    // 2.1.3
    this.disableControlInitially('p213PeruanaCantidad');
    this.bindConditionalRequired('p211OfiConsular', 'p213PeruanaCantidad', v => v === 'S', [Validators.required, this.positiveIntValidator()]);

    this.disableControlInitially('p213ExtranjeraCantidad');
    this.bindConditionalRequired('p211OfiConsular', 'p213ExtranjeraCantidad', v => v === 'S', [Validators.required, this.positiveIntValidator()]);

    this.bindGreaterThanZeroRequired('p213ExtranjeraCantidad', 'p213ExtranjeraDetalle');

    // 2.1.4
    this.disableControlInitially('p214Labor');
    this.bindConditionalRequired('p211OfiConsular', 'p214Labor', v => v === 'S');

    // 2.1.5
    this.disableControlInitially('p215Especifique');
    this.bindConditionalRequired('p215OrganoLinea', 'p215Especifique', v => v === 'N', [Validators.required]);

    // Lógica "Ninguna"
    this.bindNingunaLogic('p2114Ninguna', this.tpCoordina);
    this.clearNoneWhenAnyChecked('p2114Ninguna', this.tpCoordina);

    this.bindNingunaLogic('p2127Ninguna', this.vgCoordina);
    this.clearNoneWhenAnyChecked('p2127Ninguna', this.vgCoordina);

    this.bindNingunaLogic('p2138Ninguna', this.ddeCoordina);
    this.clearNoneWhenAnyChecked('p2138Ninguna', this.ddeCoordina);

    // Protocolo/Flujograma
    //this.bindProtocoloFlujoGroup(['p217Protocolo', 'p217Flujograma'], 'p218Protocolo');

      this.bindProtocoloFlujoGroup(
    ['p217Protocolo', 'p217Flujograma'], 
    'p218Protocolo',
    'p217Ninguna' 
  );
    this.bindNingunaLogic('p217Ninguna', ['p217Protocolo', 'p217Flujograma']);

      this.bindProtocoloFlujoGroup(
        ['p2119Oficina', 'p2119Flojograma'], 
        'p2120Protocolo',
        'p2119Ninguno'  
      );
    this.bindNingunaLogic('p2119Ninguno', ['p2119Oficina', 'p2119Flojograma']);
    this.clearNoneWhenAnyChecked('p2119Ninguno', ['p2119Oficina', 'p2119Flojograma']);
    this.watchForNingunaToDisableTarget('p2119Ninguno', 'p2120Protocolo');

   // this.bindProtocoloFlujoGroup(['p2132OfiConsular', 'p2132Flujograma'], 'p2133Protocolo');
    this.bindProtocoloFlujo('p2132Ninguno', 'p2134Existen');

      this.bindProtocoloFlujoGroup(
    ['p2132OfiConsular', 'p2132Flujograma'], 
    'p2133Protocolo',
    'p2132Ninguno'  
  );

    this.bindNingunaLogic('p2132Ninguno', ['p2132OfiConsular', 'p2132Flujograma']);
    this.clearNoneWhenAnyChecked('p2132Ninguno', ['p2132OfiConsular', 'p2132Flujograma']);
    this.watchForNingunaToDisableTarget('p2132Ninguno', 'p2133Protocolo');

    // Validaciones "al menos uno"
    this.revalidateP2132 = this.bindRequireAtLeastOneChecked(this.GROUP_P2132, 'p2132Any');
    this.revalidateP2110 = this.bindRequireAtLeastOneWhenYes('p2110Psicologico', this.tpAcceso, 'p2111Any');
    this.revalidateP2136 = this.bindRequireAtLeastOneWhenYes('p2136Coordina', this.ddeCanales2, 'p2137Any');
    this.revalidateP2212 = this.bindRequireAtLeastOneWhenYes('p2211Recibe', this.ahInstituciones, 'p2212Any');
    this.revalidateP2123 = this.bindRequireAtLeastOneWhenYes('p2122Apoyo', this.vgAcceso, 'p2123Any');
    this.revalidateP2116 = this.bindRequireAtLeastOneWhenYes('p2116PersonalConsul', this.tpInstituciones, 'p2116Any');
    this.revalidateP2129 = this.bindRequireAtLeastOneWhenYes('p2129RecibePersonal', this.vgInstituciones, 'p2130Any');
    this.revalidateP2135 = this.bindRequireAtLeastOneWhenYes('p2134Existen', this.ddeCanales, 'p2135Any');
    this.revalidateP2140 = this.bindRequireAtLeastOneWhenYes('p2140Recibe', this.ddeInstituciones, 'p2140Any');

    // Al menos un texto requerido
    this.bindRequireAtLeastOneText('p2112Ong', ['p21121', 'p21122', 'p21123']);
    this.bindRequireAtLeastOneText('p2124Ong', ['p2125Entidad1', 'p2125Entidad2', 'p2125Entidad3']);

    // Otros → Detalle
    [
      ['p2114Otros', 'p2114OtrosDetalle'],
      ['p2117Otros', 'p2117OtrosDetalle'],
      ['p2130Otros', 'p2130OtrosDetalle'],
      ['p2127Otros', 'p2127OtrosDetallar'],
      ['p2138Otros', 'p2138OtrosDetalle'],
      ['p2141Otro', 'p2141OtroDetalle'],
      ['p2212Otros', 'p2212OtrosDetalle']
    ].forEach(([chk, txt]) => this.bindCheckboxEnablesText(chk, txt));

    // 2.2.1
    this.bindConditionalRequired('p221Organo', 'p221Especifique', v => v === 'N', [Validators.required]);

    // Listeners de matrices
    this.setupMatrixListeners();
    this.setupMatrixGestionSuficiente();

    // Listeners de tabla orientaciones (discapacidad)
    this.tpHMByYear.forEach(y => {
      this.bindDiscapacidadField(y.h, y.hd);
      this.bindDiscapacidadField(y.m, y.md);
      this.bindDiscapacidadField(y.mayH, y.mayHd);
      this.bindDiscapacidadField(y.mayM, y.mayMd);
      this.bindDiscapacidadField(y.menH, y.menHd);
      this.bindDiscapacidadField(y.menM, y.menMd);
    });

    // Status changes
    this.ficha2Form.statusChanges.pipe(takeUntil(this.destroy$)).subscribe();
  }

  // ============================================
  // HELPERS DE CONFIGURACIÓN
  // ============================================

  /**
   * Crea configuración de año para trata de personas
   */
  private createYearConfig(year: string) {
    const prefix = `p2${year}`;
    return {
      year,
      h: `${prefix}Hombre`,
      hd: `${prefix}HombreDisca`,
      m: `${prefix}Mujer`,
      md: `${prefix}MujerDisca`,
      temas: [
        { label: 'Civil', check: `${prefix}Civil`, num: `${prefix}CivilNum` },
        { label: 'Penal', check: `${prefix}Penal`, num: `${prefix}PenalNum` },
        { label: 'Familia', check: `${prefix}Familia`, num: `${prefix}FamiliaNum` },
        { label: 'Laboral', check: `${prefix}Laboral`, num: `${prefix}LaboralNum` },
        { label: 'Migratoria', check: `${prefix}Migratoria`, num: `${prefix}MigratoriaNum` }
      ],
      mayH: `${prefix}MayorHombre`,
      mayHd: `${prefix}MayorHombreDisca`,
      mayM: `${prefix}MayorMujer`,
      mayMd: `${prefix}MayorMujerDisca`,
      menH: `${prefix}MenorHombre`,
      menHd: `${prefix}MenorHombreDisca`,
      menM: `${prefix}MenorMujer`,
      menMd: `${prefix}MenorMujerDisca`,
      intervenciones: [
        { label: 'Falta de notificación a la oficina consular', ctrl: `${prefix}Notificacion` },
        { label: 'Coordinación para defensa de oficio', ctrl: `${prefix}DefensaOficio` },
        { label: 'Patrocinio directo', ctrl: `${prefix}Patrocinio` },
        { label: 'Gestiones diplomáticas', ctrl: `${prefix}Gestiones` },
        { label: 'Coordinación para intérprete (idioma)', ctrl: `${prefix}Coordinacion` },
        { label: 'Intérprete de idioma proporcionado', ctrl: `${prefix}Interprete` },
        { label: 'Coordinación para intérprete de señas', ctrl: `${prefix}Senias` },
        { label: 'Otros', ctrl: `${prefix}Otros` }
      ]
    };
  }

  /**
   * Crea configuración de matriz de necesidades
   */
  // private createMatrizConfig(prefix: string): MatrizCfg {
  //   const tipos = ['Logística', 'Infraestructura', 'Personal', 'Presupuesto', 'Otro'];
  //   const letras = ['A', 'B', 'C', 'D', 'E'];

  //   return {
  //     ninguno: `${prefix}Ninguno`,
  //     filas: tipos.map((label, idx) => ({
  //       label,
  //       check: `${prefix}${letras[idx]}${label.replace('í', 'i').replace('á', 'a')}`,
  //       gestion: `${prefix}${letras[idx]}Gestiones`,
  //       suficiente: `${prefix}${letras[idx]}Suficiente`,
  //       observaciones: `${prefix}${letras[idx]}Especifique`,
  //       ...(idx === 4 && { especifique: `${prefix}${letras[idx]}OtroDetalle` })
  //     }))
  //   };
  // }



  
  /**
   * Agrega controles de año
   */
  private addYearControls(yearCfg: any): void {
    [yearCfg.h, yearCfg.hd, yearCfg.m, yearCfg.md, yearCfg.mayH, yearCfg.mayHd, yearCfg.mayM, yearCfg.mayMd, yearCfg.menH, yearCfg.menHd, yearCfg.menM, yearCfg.menMd].forEach(n => this.addNumericControl(n));
    yearCfg.temas.forEach((t: any) => {
      this.addCheckboxControl(t.check);
      this.addNumericControl(t.num);
    });
    yearCfg.intervenciones.forEach((iv: any) => this.addNumericControl(iv.ctrl));
  }

  /**
   * Agrega control numérico
   */
  private addNumericControl(name: string): void {
    this.ficha2Form.addControl(name, new FormControl<number | null>(null, [Validators.min(0)]));
    this.numericKeys.push(name);
  }

  /**
   * Agrega control de texto
   */
  private addTextControl(name: string, disabled = false): void {
    this.ficha2Form.addControl(name, new FormControl<string>({ value: '', disabled }));
  }

  /**
   * Agrega control radio
   */
  private addRadioControl(name: string, disabled = false): void {
    this.ficha2Form.addControl(name, new FormControl<SN>({ value: null, disabled }));
  }

  /**
   * Agrega control checkbox
   */
  private addCheckboxControl(name: string, disabled = false): void {
    this.ficha2Form.addControl(name, new FormControl<string | null>({ value: null, disabled }));
  }

  // ============================================
  // CONFIGURACIÓN DE LISTENERS Y VALIDACIONES
  // ============================================

  /**
   * Deshabilita control inicialmente
   */
  private disableControlInitially(controlName: string): void {
    this.disableAndClearControl(this.getControl(controlName));
  }

  /**
   * Vincula validación condicional
   */
  private bindConditionalRequired(
    sourceKey: string,
    targetKey: string,
    condition: (val: any) => boolean,
    validators: ValidatorFn[] = [Validators.required]
  ): void {
    const source = this.getControl(sourceKey);
    const target = this.getControl(targetKey);
    if (!source || !target) return;

    const apply = (val: any) => {
      if (condition(val)) {
        this.enableControlWithValidators(target, validators);
      } else {
        this.disableAndClearControl(target);
      }
      this.cdr.markForCheck();
    };

    apply(source.value);
    source.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  /**
   * Vincula lógica mayor que cero
   */
  private bindGreaterThanZeroRequired(
    sourceKey: string,
    targetKey: string,
    validators: ValidatorFn[] = [Validators.required]
  ): void {
    const source = this.getControl(sourceKey);
    const target = this.getControl(targetKey);
    if (!source || !target) return;

    const apply = (rawVal: any) => {
      const value = rawVal === null || rawVal === undefined || rawVal === '' ? 0 : Number(rawVal);

      if (!isNaN(value) && value > 0) {
        this.enableControlWithValidators(target, validators);
      } else {
        this.disableAndClearControl(target);
      }
      this.cdr.markForCheck();
    };

    apply(source.value);
    source.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  /**
   * Vincula lógica "Ninguna"
   */
  private bindNingunaLogic(noneKey: string, checkKeys: string[]): void {
    const none = this.getControl(noneKey);
    if (!none) return;

    const apply = (val: any) => {
      const isNone = val === 'S';
      checkKeys.forEach(k => {
        const c = this.getControl(k);
        if (!c) return;
        if (isNone) {
          this.disableAndClearCheckbox(c);
        } else {
          c.enable({ emitEvent: false });
          c.updateValueAndValidity({ emitEvent: false });
        }
      });
      this.cdr.markForCheck();
    };

    apply(none.value);
    none.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  /**
   * Limpia "Ninguna" cuando se marca cualquier checkbox del grupo
   */
  private clearNoneWhenAnyChecked(noneKey: string, checkKeys: string[]): void {
    checkKeys.forEach(k => {
      this.getControl(k)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(v => {
          if (v === 'S') {
            const none = this.getControl(noneKey);
            if (none?.value === 'S') {
              none.setValue(null, { emitEvent: false });
            }
          }
        });
    });
  }

  /**
   * Observa cambio de "Ninguna" para deshabilitar target
   */
  private watchForNingunaToDisableTarget(ningunaKey: string, targetKey: string): void {
    this.getControl(ningunaKey)?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => {
        if (v === 'S') {
          this.disableAndClearControl(this.getControl(targetKey));
        }
        this.cdr.markForCheck();
      });
  }

  /**
   * Vincula protocolo/flujograma individual
   */
  private bindProtocoloFlujo(protocoloKey: string, flujoKey: string): void {
    const protocolo = this.getControl(protocoloKey);
    const flujo = this.getControl(flujoKey);
    if (!protocolo || !flujo) return;

    const apply = (val: any) => {
      if (val === 'S') {
        this.enableControlWithValidators(flujo, [Validators.required]);
      } else {
        this.disableAndClearControl(flujo);
      }
      this.cdr.markForCheck();
    };

    apply(protocolo.value);
    protocolo.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  /**
   * Vincula grupo protocolo/flujograma
   */
  private bindProtocoloFlujoGroup(
  sourceKeys: string[],
  targetKey: string,
  ningunaKey?: string,  //  Parámetro opcional para el checkbox "Ninguno"
  validators: ValidatorFn[] = [Validators.required]
): void {
  const target = this.getControl(targetKey);
  if (!target) return;

  const isActive = (): boolean => {
    return sourceKeys.some(key => {
      const ctrl = this.getControl(key);
      const v = ctrl?.value;
      return v === 'S' || v === true;
    });
  };

  const apply = () => {
    //  CAMBIO CRÍTICO: Usar el ningunaKey pasado por parámetro
    const ninguna = ningunaKey ? this.getControl(ningunaKey)?.value === 'S' : false;
    
    if (!ninguna && isActive()) {
      this.enableControlWithValidators(target, validators);
    } else {
      this.disableAndClearControl(target);
    }
    this.cdr.markForCheck();
  };

  apply();
  
  //  Escuchar cambios en los checkboxes source
  sourceKeys.forEach(key => {
    this.getControl(key)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  });
  
  //  NUEVO: Escuchar cambios en el checkbox "Ninguno" si existe
  if (ningunaKey) {
    this.getControl(ningunaKey)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }
}

  /**
   * Requiere al menos un checkbox marcado
   */
  private bindRequireAtLeastOneChecked(checkKeys: string[], sentinelKey: string): () => void {
    if (!this.ficha2Form.contains(sentinelKey)) {
      this.ficha2Form.addControl(sentinelKey, new FormControl(null));
    }

    const sentinel = this.getControl(sentinelKey)!;

    const validate = () => {
      const anyChecked = checkKeys.some(k => this.getControl(k)?.value === 'S');
      const prev = { ...(sentinel.errors || {}) };

      if (!anyChecked) {
        prev['requireOne'] = true;
        sentinel.setErrors(prev, { emitEvent: false });
        if (this.showAllErrors) {
          sentinel.markAsTouched({ onlySelf: true });
          sentinel.markAsDirty({ onlySelf: true });
        }
      } else {
        if ('requireOne' in prev) delete prev['requireOne'];
        sentinel.setErrors(Object.keys(prev).length ? prev : null, { emitEvent: false });
      }

      sentinel.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    };

    validate();
    checkKeys.forEach(k => {
      this.getControl(k)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
    });

    return validate;
  }

  /**
   * Requiere al menos uno cuando es "Sí"
   */
  private bindRequireAtLeastOneWhenYes(yesKey: string, checkKeys: string[], anchorErrorKey = 'group'): () => void {
    const yes = this.getControl(yesKey);
    if (!yes) return () => { };

    let isValidating = false;

    const validate = () => {
      if (isValidating) return;
      isValidating = true;

      const isYes = yes.value === 'S';

      checkKeys.forEach(k => {
        const c = this.getControl(k);
        if (!c) return;
        if (isYes) {
          if (c.disabled) c.enable({ emitEvent: false });
        } else {
          if (!c.disabled) this.disableAndClearString(c);
        }
      });

      const currentErrors = yes.errors || {};
      if (isYes) {
        const anyChecked = checkKeys.some(k => this.getControl(k)?.value === 'S');
        if (!anyChecked) {
          yes.setErrors({ ...currentErrors, [anchorErrorKey]: true }, { emitEvent: false });
          yes.markAsTouched();
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

    validate();
    yes.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
    checkKeys.forEach(k => this.getControl(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(validate));

    return validate;
  }

  /**
   * Requiere al menos un texto cuando es "Sí"
   */
  private bindRequireAtLeastOneText(yesKey: string, textKeys: string[]): void {
    const yes = this.getControl(yesKey);
    if (!yes) return;

    const validate = () => {
      const isYes = yes.value === 'S';
      let filled = 0;

      textKeys.forEach(k => {
        const c = this.getControl(k);
        if (!c) return;

        if (isYes) {
          c.enable({ emitEvent: false });
        } else {
          this.disableAndClearString(c, true);
        }

        const v = (c?.value ?? '').toString().trim();
        if (v.length > 0) filled++;
      });

      const prevErrors = yes.errors || {};
      if (isYes && filled < 1) {
        yes.setErrors({ ...prevErrors, requireOne: true });
        yes.markAsTouched();
        yes.markAsDirty();
      } else if ('requireOne' in prevErrors) {
        delete prevErrors['requireOne'];
        yes.setErrors(Object.keys(prevErrors).length ? prevErrors : null);
      }

      yes.updateValueAndValidity({ emitEvent: false });
      this.ficha2Form.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    };

    validate();
    yes.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(validate);
    textKeys.forEach(k => this.getControl(k)?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(validate));
  }

  /**
   * Checkbox habilita texto requerido
   */
  private bindCheckboxEnablesText(checkKey: string, textKey: string): void {
    const chk = this.getControl(checkKey);
    const text = this.getControl(textKey);
    if (!chk || !text) return;

    const apply = (val: any) => {
      const isOn = (val === 'S' || val === true);
      if (isOn) {
        this.enableControlWithValidators(text, [Validators.required]);
      } else {
        this.disableAndClearString(text);
      }
      this.cdr.markForCheck();
    };

    apply(chk.value);
    chk.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  /**
   * Vincula campo discapacidad con total
   */
  private bindDiscapacidadField(totalKey: string, discapacidadKey: string): void {
    const total = this.getControl(totalKey);
    const discapacidad = this.getControl(discapacidadKey);
    if (!total || !discapacidad) return;

    const apply = (raw: any) => {
      const n = this.toIntOrNull(raw) ?? 0;

      if (n > 0) {
        this.enableControlWithValidators(discapacidad, [
          Validators.required,
          Validators.min(0),
          this.maxValueValidator(totalKey)
        ]);
      } else {
        this.disableAndClearControl(discapacidad);
      }

      discapacidad.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    };

    apply(total.value);

    total.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newValue) => {
      apply(newValue);
      const currentDetail = this.toIntOrNull(discapacidad.value) ?? 0;
      const newTotal = this.toIntOrNull(newValue) ?? 0;

      if (currentDetail > newTotal) {
        console.warn(`⚠️ ${discapacidadKey} (${currentDetail}) excede a ${totalKey} (${newTotal})`);
      }

      discapacidad.updateValueAndValidity({ emitEvent: true });
    });

    discapacidad.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      discapacidad.updateValueAndValidity({ emitEvent: false });
      this.cdr.markForCheck();
    });
  }

  /**
   * Configura listeners de matrices
   */
  private setupMatrixListeners(): void {
    this.MATRICES.forEach(mx => {
      const ningunoKey = mx.ninguno;
      this.getControl(ningunoKey)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
        const marcado = v === 'S' || v === true;
        if (marcado) {
          if (v === true) this.getControl(ningunoKey)?.setValue('S', { emitEvent: false });
          mx.filas.forEach(f => {
            this.getControl(f.check)?.setValue(null, { emitEvent: false });
            this.disableMatrixRow(f);
          });
        } else if (v === false) {
          this.getControl(ningunoKey)?.setValue(null, { emitEvent: false });
        }
        this.cdr.markForCheck();
      });

      mx.filas.forEach(f => {
        this.getControl(f.check)?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((valor: any) => {
          const marcado = valor === 'S' || valor === true;
          if (marcado) {
            if (valor === true) this.getControl(f.check)?.setValue('S', { emitEvent: false });
            this.getControl(ningunoKey)?.setValue(null, { emitEvent: false });
            this.enableMatrixRow(f);
          } else {
            if (valor === false) this.getControl(f.check)?.setValue(null, { emitEvent: false });
            this.disableMatrixRow(f);
          }
          this.cdr.markForCheck();
        });
      });
    });
  }

  /**
   * Configura wiring gestión → suficiente
   */
  private setupMatrixGestionSuficiente(): void {
    this.MATRICES.forEach(mx => {
      mx.filas.forEach(f => this.bindGestionToSuficiente(f.gestion, f.suficiente));
    });
  }

  /**
   * Vincula gestión con suficiente
   */
  private bindGestionToSuficiente(gestionKey: string, suficienteKey: string): void {
    const gestion = this.getControl(gestionKey);
    const sufic = this.getControl(suficienteKey);
    if (!gestion || !sufic) return;

    const apply = (val: any) => {
      if (val === 'S') {
        this.enableControlWithValidators(sufic, [Validators.required]);
      } else {
        this.disableAndClearControl(sufic);
      }
      this.cdr.markForCheck();
    };
    apply(gestion.value);
    gestion.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(apply);
  }

  /**
   * Habilita fila de matriz
   */
  private enableMatrixRow(f: MatrizFilaCfg): void {
    this.enableControlWithValidators(this.getControl(f.gestion)!);
    this.enableControlWithValidators(this.getControl(f.suficiente)!);
    if (f.especifique) this.enableControlWithValidators(this.getControl(f.especifique)!, []);
    this.enableControlWithValidators(this.getControl(f.observaciones)!, []);
  }

  /**
   * Deshabilita fila de matriz
   */
  private disableMatrixRow(f: MatrizFilaCfg): void {
    this.disableAndClearControl(this.getControl(f.gestion)!);
    this.disableAndClearControl(this.getControl(f.suficiente)!);
    if (f.especifique) this.disableAndClearString(this.getControl(f.especifique)!);
    this.disableAndClearString(this.getControl(f.observaciones)!);
  }

  /**
   * Refresca validadores de fila
   */
  private refreshMatrixRowValidators(r: { check: string; gestion: string; suficiente: string }): void {
    const checked = this.getControl(r.check)?.value === 'S';
    const g = this.getControl(r.gestion);
    const s = this.getControl(r.suficiente);

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

  // ============================================
  // VALIDADORES PERSONALIZADOS
  // ============================================

  private requireAtLeastOneFromGroup(checkboxKeys: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!this.ficha2Form) return null;
    
    const atLeastOneChecked = checkboxKeys.some(key => {
      const ctrl = this.getControl(key);
      return ctrl?.value === 'S';
    });
    
    return atLeastOneChecked ? null : { requireOne: true };
  };
}

  /**
   * Validador: entero positivo (>=1)
   */
  private positiveIntValidator(): ValidatorFn {
    return (c: AbstractControl) => {
      const v = c.value;
      if (v === null || v === '' || v === undefined) return null;
      const n = Number(v);
      return Number.isInteger(n) && n >= 1 ? null : { positiveInt: true };
    };
  }

  /**
   * Validador: valor máximo basado en otro control
   */
  private maxValueValidator(totalControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.parent) return null;

      const totalControl = control.parent.get(totalControlName);
      if (!totalControl) return null;

      const detailValue = this.toIntOrNull(control.value) ?? 0;
      const totalValue = this.toIntOrNull(totalControl.value) ?? 0;

      if (detailValue > totalValue) {
        return {
          exceedsTotal: {
            max: totalValue,
            actual: detailValue
          }
        };
      }

      return null;
    };
  }

  // ============================================
  // UTILIDADES DE CONTROL
  // ============================================

  /**
   * Obtiene control del formulario
   */
  private getControl(path: string): AbstractControl | null {
    return this.ficha2Form.get(path);
  }

  /**
   * Habilita control con validadores
   */
  private enableControlWithValidators(ctrl: AbstractControl, validators: ValidatorFn[] = [Validators.required]): void {
    ctrl.enable({ emitEvent: false });
    ctrl.setValidators(validators);
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Deshabilita y limpia control (null)
   */
  private disableAndClearControl(ctrl: AbstractControl | null): void {
    if (!ctrl) return;
    ctrl.reset({ value: null, disabled: true });
    ctrl.clearValidators();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Deshabilita y limpia control (string)
   */
  private disableAndClearString(ctrl: AbstractControl | null, silent = false): void {
    if (!ctrl) return;
    ctrl.reset({ value: '', disabled: true }, { emitEvent: !silent });
    ctrl.clearValidators();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Deshabilita y limpia checkbox
   */
  private disableAndClearCheckbox(ctrl: AbstractControl, clearValidators = true, clearValue = true): void {
    if (!ctrl) return;
    if (clearValidators) ctrl.clearValidators();
    if (clearValue) ctrl.setValue(null, { emitEvent: false });
    ctrl.disable({ emitEvent: false });
    ctrl.markAsPristine();
    ctrl.markAsUntouched();
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  // ============================================
  // GUARDAR Y VALIDAR
  // ============================================

  /**
   * Guarda sección como completa
   */
  public guardarSeccion2(): void {
    this.saveData('C');
  }

  /**
   * Guarda sección como incompleta
   */
  public guardarSeccion2Incompleta(): void {
    this.saveData('I');
  }

  /**
   * Guarda datos de la sección
   */

  private async saveData(estadoSolicitado: EstadoSeccion): Promise<void> {
  //  1. Activar visualización de errores
  this.showAllErrors = true;
  this.showGroupErrors = true;

  //  2. Sincronizar validadores de matrices antes de validar
  this.revalidateP2132?.();
  this.MATRICES.forEach(mx => {
    mx.filas.forEach((r: any) => this.refreshMatrixRowValidators(r));
  });
  this.ficha2Form.updateValueAndValidity({ emitEvent: false });

  //  3. Determinar estado destino basado en validez del formulario
  const isFormValid = this.ficha2Form.valid;
  const estadoDestino: EstadoSeccion = (estadoSolicitado === 'C' && isFormValid) ? 'C' : 'I';

  //  4. Si pidió Completo pero está incompleto, avisar y esperar confirmación
  if (estadoSolicitado === 'C' && estadoDestino === 'I') {
    this.ficha2Form.markAllAsTouched();
    this.logInvalidFields();
    // ❌ REMOVIDO: this.scrollToFirstError();

    await Swal.fire({
      icon: 'warning',
      title: 'Faltan respuestas',
      text: 'Completa los campos obligatorios antes de guardar como COMPLETA. Se guardará como INCOMPLETA.',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false
    });
    // ⚠️ NO hacer return - continuar guardando
  }

  //  5. Mostrar spinner de carga
  this.showLoadingDialog();

  //  6. Preparar payload con el estado determinado
  const payload = this.preparePayload(estadoDestino);
  console.debug('[S2] Guardando con estado:', estadoDestino, 'payload:', payload);

  try {
    //  7. Enviar al backend
    const response = await lastValueFrom(
      this.fichaService.guardarFichaSeccion2(payload).pipe(takeUntil(this.destroy$))
    );

    Swal.close();

    //  8. Mensaje de éxito diferenciado
    const mensaje = estadoDestino === 'C'
      ? (response?.mensaje || 'Sección 2 guardada como COMPLETA.')
      : (response?.mensaje || 'Sección 2 guardada como INCOMPLETA.');

    await Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });

    //  9. Actualizar estado del formulario
    this.getControl('estado_s2')?.setValue(estadoDestino, { emitEvent: false });
    
    if ((response as any)?.idFichaS2 && !this.getControl('idFichaS2')?.value) {
      this.getControl('idFichaS2')?.setValue((response as any).idFichaS2, { emitEvent: false });
    }

    //  10. Limpiar errores solo si guardó exitosamente
    if (estadoDestino === 'C') {
      this.ficha2Form.markAsPristine();
      this.showAllErrors = false;
      this.showGroupErrors = false;
    }

    //  11. Emitir eventos al componente padre
    this.onGuardar.emit();
    this.onEstadoActualizado.emit(estadoDestino);

  } catch (err) {
    Swal.close();
    console.error('[S2 guardar ERR]', err);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la Sección 2.',
      confirmButtonText: 'Entendido'
    });
  }
}

//   private async saveData(estadoSolicitado: EstadoSeccion): Promise<void> {
//   //  1. Activar visualización de errores
//   this.showAllErrors = true;
//   this.showGroupErrors = true;

//   //  2. Sincronizar validadores de matrices antes de validar
//   this.revalidateP2132?.();
//   this.MATRICES.forEach(mx => {
//     mx.filas.forEach((r: any) => this.refreshMatrixRowValidators(r));
//   });
//   this.ficha2Form.updateValueAndValidity({ emitEvent: false });

//   //  3. Determinar estado destino basado en validez del formulario
//   const isFormValid = this.ficha2Form.valid;
//   const estadoDestino: EstadoSeccion = (estadoSolicitado === 'C' && isFormValid) ? 'C' : 'I';

//   //  4. Si pidió Completo pero está incompleto, avisar y esperar confirmación
//   if (estadoSolicitado === 'C' && estadoDestino === 'I') {
//     this.ficha2Form.markAllAsTouched();
//     this.logInvalidFields();
//     this.scrollToFirstError();

//     await Swal.fire({
//       icon: 'warning',
//       title: 'Faltan respuestas',
//       text: 'Completa los campos obligatorios antes de guardar como COMPLETA. Se guardará como INCOMPLETA.',
//       confirmButtonText: 'Entendido',
//       allowOutsideClick: false
//     });
//   }

//   //  5. Mostrar spinner de carga
//   this.showLoadingDialog();

//   //  6. Preparar payload con el estado determinado
//   const payload = this.preparePayload(estadoDestino);
//   console.debug('[S2] Guardando con estado:', estadoDestino, 'payload:', payload);

//   try {
//     //  7. Enviar al backend
//     const response = await lastValueFrom(
//       this.fichaService.guardarFichaSeccion2(payload).pipe(takeUntil(this.destroy$))
//     );

//     Swal.close();

//     //  8. Mensaje de éxito diferenciado
//     const mensaje = estadoDestino === 'C'
//       ? (response?.mensaje || 'Sección 2 guardada como COMPLETA.')
//       : (response?.mensaje || 'Sección 2 guardada como INCOMPLETA.');

//     await Swal.fire({
//       icon: 'success',
//       title: 'Listo',
//       text: mensaje,
//       timer: 2000,
//       showConfirmButton: false
//     });

//     //  9. Actualizar estado del formulario
//     this.getControl('estado_s2')?.setValue(estadoDestino, { emitEvent: false });
    
//     if ((response as any)?.idFichaS2 && !this.getControl('idFichaS2')?.value) {
//       this.getControl('idFichaS2')?.setValue((response as any).idFichaS2, { emitEvent: false });
//     }

//     //  10. Limpiar errores solo si guardó exitosamente
//     if (estadoDestino === 'C') {
//       this.ficha2Form.markAsPristine();
//       this.showAllErrors = false;
//       this.showGroupErrors = false;
//     }

//     //  11. Emitir eventos al componente padre
//     this.onGuardar.emit();
//     this.onEstadoActualizado.emit(estadoDestino);

//   } catch (err) {
//     Swal.close();
//     console.error('[S2 guardar ERR]', err);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'No se pudo guardar la Sección 2.',
//       confirmButtonText: 'Entendido'
//     });
//   }
// }

  /**
   * Valida sección (solo especialista)
   */
  public validarSeccion(): void {
    const estado = this.getControl('estado_s2')?.value as EstadoSeccion;
    const idFichaS2 = this.getControl('idFichaS2')?.value as number | null;

    if (!idFichaS2) {
      Swal.fire('Error', 'No se encontró el identificador de la Sección 2. Guarda primero la sección.', 'error');
      return;
    }
    if (estado !== 'C') {
      Swal.fire('Validación no permitida', 'La sección 2 debe estar guardada como "Completa" para validarla.', 'warning');
      return;
    }

    const payload = { idFichaS2, valida_s2: '2' };
    this.fichaService.validarFichaSeccion2(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getControl('valida_s2')?.setValue('1');
        this.seccionValidada.emit();
        Swal.fire({ icon: 'success', title: 'Sección 2 Validada', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => {
        console.error('Error al validar la sección 2:', err);
        Swal.fire('Error', 'No se pudo validar la sección 2.', 'error');
      }
    });
  }

  /**
   * Prepara payload para guardar
   */
  private preparePayload(estado: EstadoSeccion): any {
    const raw = this.ficha2Form.getRawValue();
    const payload: any = { ...raw };

    // Matrices
    this.MATRICES.forEach(mx => {
      payload[mx.ninguno] = raw[mx.ninguno] ? 'S' : '';
      mx.filas.forEach(f => {
        payload[f.check] = raw[f.check] ? 'S' : '';
        payload[f.gestion] = this.convertToSN(raw[f.gestion]);
        payload[f.suficiente] = this.convertToSN(raw[f.suficiente]);
      });
    });

    // Checkboxes
    this.allCheckboxes.forEach(k => {
      payload[k] = raw[k] ? 'S' : '';
    });

    // Radios
    const RADIOS = [
      'p211OfiConsular', 'p214Labor', 'p215OrganoLinea',
      'p218Protocolo', 'p219Emergencia', 'p2110Psicologico',
      'p2112Ong', 'p2116PersonalConsul',
      'p2120Protocolo', 'p2121Violencia', 'p2122Apoyo', 'p2124Ong', 'p2129RecibePersonal',
      'p2132OfiConsular', 'p2132Flujograma', 'p2133Protocolo', 'p2134Existen', 'p2136Coordina',
      'p2140Recibe',
      'p221Organo', 'p2211Recibe'
    ];
    RADIOS.forEach(k => payload[k] = this.convertToSN(raw[k]));

    // Radios personalizados
    ['p214Labor', 'p215Especifique', 'p221Especifique'].forEach(k => {
      payload[k] = raw[k] ?? null;
    });

    // Numéricos
    this.numericKeys.forEach(k => {
      payload[k] = this.toNumberOrNull(raw[k]);
    });

    payload.idFicha = this.idFicha ?? payload.idFicha;
    payload.estado_s2 = estado;


  // ACTUALIZA: Eliminar sentinelas (controles ocultos)
  const sentinelKeys = [
    'p217Any', 'p2113Any', 'p2114Any', 'p2115Any', // Trata
    'p2119Any', 'p2126Any', 'p2127Any', 'p2128Any', // VG
    'p2132Any', 'p2138Any', 'p2139Any',             // DDE
    'p2210Any',                                      // AH
    'p2111Any', 'p2116Any', 'p2123Any', 'p2130Any', // Otros
    'p2135Any', 'p2137Any', 'p2140Any', 'p2212Any'
  ];
  
  sentinelKeys.forEach(k => delete payload[k]);

    return payload;
  }

  // ============================================
  // HIDRATACIÓN
  // ============================================

  /**
   * Hidrata formulario con datos de API
   */
  private hydrateForm(data: any): void {
    this.ficha2Form.patchValue({
      idFicha: data?.idFicha ?? this.idFicha ?? null,
      idFichaS2: data?.idFichaS2 ?? data?.ficha2?.idFichaS2 ?? null,
      estado_s2: (data?.estado_s2 ?? '').toString().trim().toUpperCase(),
      valida_s2: (data?.valida_s2 ?? '').toString().trim()
    }, { emitEvent: false });

    this.idFicha = this.getControl('idFicha')?.value ?? this.idFicha;
    this.hydrating = true;

    const patch: any = {};

    // Radios sueltos
    [
      'p211OfiConsular', 'p214Labor', 'p215OrganoLinea', 'p215Especifique',
      'p218Protocolo', 'p219Emergencia', 'p2110Psicologico',
      'p2112Ong', 'p2116PersonalConsul',
      'p2120Protocolo', 'p2121Violencia', 'p2122Apoyo', 'p2124Ong', 'p2129RecibePersonal',
      'p2132OfiConsular', 'p2132Flujograma', 'p2133Protocolo', 'p2134Existen', 'p2136Coordina',
      'p2140Recibe',
      'p221Organo', 'p221Especifique', 'p2211Recibe'
    ].forEach(k => patch[k] = this.normalizeSN(data?.[k]));

    // Radios personalizados
    ['p214Labor', 'p215Especifique', 'p221Especifique'].forEach(k => {
      patch[k] = data?.[k] ?? null;
    });

    // Checkboxes
    this.allCheckboxes.forEach(k => patch[k] = data?.[k] === 'S' ? 'S' : null);

    // Numéricos
    ['p212NumAsesor', 'p213PeruanaCantidad', 'p213ExtranjeraCantidad', 'p222Porcentaje'].forEach(k => {
      patch[k] = this.toNumberOrNull(data?.[k]);
    });

    // Textos
    [
      'p213ExtranjeraDetalle',
      'p21121', 'p21122', 'p21123', 'p2114OtrosDetalle',
      'p2117NingunaDetalle',
      'p2125Entidad1', 'p2125Entidad2', 'p2125Entidad3', 'p2127OtrosDetallar',
      'p2130OtrosDetalle', 'p2130NingunaDetalle',
      'p2138OtrosDetalle', 'p2141OtroDetalle',
      'p2212OtrosDetalle', 'p2212NingunoDetalle'
    ].forEach(k => patch[k] = data?.[k] ?? '');

    // Configuraciones por año
    this.tpHMByYear.forEach(y => {
      [y.h, y.hd, y.m, y.md, y.mayH, y.mayHd, y.mayM, y.mayMd, y.menH, y.menHd, y.menM, y.menMd].forEach(n => {
        patch[n] = this.toNumberOrNull(data?.[n]);
      });
      y.temas.forEach((t: any) => {
        patch[t.check] = data?.[t.check] === 'S' ? 'S' : null;
        patch[t.num] = this.toNumberOrNull(data?.[t.num]);
      });
      y.intervenciones.forEach((iv: any) => {
        patch[iv.ctrl] = this.toNumberOrNull(data?.[iv.ctrl]);
      });
    });

    this.vgOrientado.forEach(y => {
      patch[y.orienta] = this.normalizeSN(data?.[y.orienta]);
      patch[y.asiste] = this.normalizeSN(data?.[y.asiste]);
      patch[y.num] = this.toNumberOrNull(data?.[y.num]);
    });

    this.ddePorAnio.forEach(r => {
      [r.numAnio, r.detenciones, r.deportacion, r.expulsion].forEach(n => {
        patch[n] = this.toNumberOrNull(data?.[n]);
      });
    });

    this.ahEventos.forEach(e => {
      [e.y23, e.y24, e.y25].forEach(n => patch[n] = this.toNumberOrNull(data?.[n]));
    });

    this.ahBloques.forEach(b => {
      b.years.forEach(y => {
        [y.num, y.mat, y.eco].forEach(n => patch[n] = this.toNumberOrNull(data?.[n]));
      });
    });

    this.ahIndicadores.forEach(b => {
      b.rows.forEach(r => {
        [r.y23, r.y24, r.y25].forEach(n => patch[n] = this.toNumberOrNull(data?.[n]));
      });
    });

    // Matrices
    this.MATRICES.forEach(mx => {
      patch[mx.ninguno] = data?.[mx.ninguno] === 'S' ? 'S' : null;
      mx.filas.forEach(f => {
        patch[f.check] = data?.[f.check] === 'S' ? 'S' : null;
        patch[f.gestion] = this.normalizeSN(data?.[f.gestion]);
        patch[f.suficiente] = this.normalizeSN(data?.[f.suficiente]);
        if (f.especifique) patch[f.especifique] = data?.[f.especifique] ?? '';
        patch[f.observaciones] = data?.[f.observaciones] ?? '';
      });
    });

    // Orientado/Asistido TP
    this.tpOrientado.forEach(y => {
      patch[y.orientado] = this.toNumberOrNull(data?.[y.orientado]);
      patch[y.asistio] = this.toNumberOrNull(data?.[y.asistio]);
    });

    this.ficha2Form.patchValue(patch, { emitEvent: false });

    // Re-disparar lógica
    ['p217Protocolo', 'p217Flujograma', 'p217Ninguna'].forEach(key => {
      const val = this.getControl(key)?.value ?? null;
      this.getControl(key)?.setValue(val, { emitEvent: true, onlySelf: true });
    });

    if ((data?.estado_s2 ?? '') !== 'C') {
      this.showAllErrors = true;
      this.cdr.markForCheck();
    }

    // Reaplicar enable/disable por matrices
    this.MATRICES.forEach(mx => {
      mx.filas.forEach(f => {
        const marcado = this.getControl(f.check)?.value === 'S';
        if (marcado) this.enableMatrixRow(f);
        else this.disableMatrixRow(f);
      });
      const nk = mx.ninguno;
      if (this.getControl(nk)?.value === 'S') {
        mx.filas.forEach(f => {
          this.getControl(f.check)?.setValue(null, { emitEvent: false });
          this.disableMatrixRow(f);
        });
      }
    });

    // Forzar wiring gestión ⇒ suficiente
    this.MATRICES.forEach(mx => {
      mx.filas.forEach(f => {
        const g = this.getControl(f.gestion);
        g?.setValue(g.value ?? null, { emitEvent: true, onlySelf: true });
        g?.markAsPristine();
        g?.markAsUntouched();
      });
    });

    // Re-disparar controles específicos
    ['p211OfiConsular', 'p214Labor', 'p215OrganoLinea'].forEach(key => {
      const val = this.getControl(key)?.value ?? null;
      this.getControl(key)?.setValue(val, { emitEvent: true, onlySelf: true });
    });

    // Tabla orientaciones
    this.tpHMByYear.forEach(y => {
      const keys = [y.h, y.m, y.mayH, y.mayM, y.menH, y.menM];
      keys.forEach(k => {
        const cur = this.getControl(k)?.value ?? null;
        this.getControl(k)?.setValue(cur, { emitEvent: true, onlySelf: true });
      });
    });

    this.ficha2Form.updateValueAndValidity({ emitEvent: true });

    queueMicrotask(() => {
      this.revalidateP2129?.();
      this.revalidateP2110?.();
      this.revalidateP2116?.();
      this.revalidateP2123?.();
      this.revalidateP2135?.();
      this.revalidateP2140?.();
      this.revalidateP2212?.();
      this.revalidateP2136?.();
      this.revalidateP2132?.();

      this.getControl('p2115Any')?.updateValueAndValidity({ emitEvent: false });
      this.getControl('p2128Any')?.updateValueAndValidity({ emitEvent: false });
      this.getControl('p2139Any')?.updateValueAndValidity({ emitEvent: false });
      this.getControl('p2210Any')?.updateValueAndValidity({ emitEvent: false });
    });

    this.cdr.markForCheck();
    this.hydrating = false;
  }

  // ============================================
  // AUTOSAVE
  // ============================================

  /**
   * Inicia autosave
   */
  private startAutosave(): void {
    console.log('🚀 Autosave activado para Sección 2');

    if (this.canAutosave()) {
      console.log('💾 Ejecutando autosave inicial...');
      this.executeAutosave();
    }

    this.ficha2Form.valueChanges
      .pipe(
        debounceTime(AUTOSAVE_DELAY_MS),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.canAutosave()) {
          console.log('💾 Ejecutando autosave por cambio...');
          this.executeAutosave();
        }
      });
  }

  /**
   * Verifica si puede hacer autosave
   */
  private canAutosave(): boolean {
    if (this.hydrating) {
      console.log('⏳ Esperando... formulario hidratándose');
      return false;
    }

    if (!this.idFicha) {
      console.warn('❌ No hay idFicha disponible');
      return false;
    }

    return true;
  }

  /**
   * Ejecuta autosave
   */
  private executeAutosave(): void {
    const estadoActual = this.getControl('estado_s2')?.value as EstadoSeccion;
    const estadoDestino: EstadoSeccion = (estadoActual === 'C' && this.ficha2Form.valid) ? 'C' : 'I';
    const payload = this.preparePayload(estadoDestino);

    console.log('📤 Enviando autosave:', {
      estadoActual,
      estadoDestino,
      formValid: this.ficha2Form.valid,
      formDirty: this.ficha2Form.dirty
    });

    this.fichaService.guardarFichaSeccion2(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(' Autosave exitoso:', res);
          this.ficha2Form.markAsPristine();
        },
        error: (err) => {
          console.error('❌ Error en autosave:', err?.status, err?.message, err?.error);
        }
      });
  }

  /**
   * Detiene autosave
   */
  private stopAutosave(): void {
    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
      this.autosaveTimer = null;
    }
  }

  // ============================================
  // HELPERS PARA TEMPLATE
  // ============================================

  /**
   * Obtiene control (versión pública)
   */
  public f(path: string): AbstractControl | null {
    return this.getControl(path);
  }

  /**
   * Verifica si control es inválido
   */
  public isInvalid(path: string): boolean {
    const c = this.getControl(path);
    return !!(c && c.invalid && (this.showAllErrors || c.touched || c.dirty));
  }

  /**
   * Verifica si checkbox está marcado
   */
  public isCheckboxChecked(controlName: string): boolean {
    return this.getControl(controlName)?.value === 'S';
  }

  /**
   * Verifica si control está deshabilitado
   */
  public isDisabled(name: string): boolean {
    return !!this.getControl(name)?.disabled;
  }

  /**
   * Obtiene longitud de caracteres del control
   */
  public charLen(controlName: string): number {
    const v = this.getControl(controlName)?.value;
    return typeof v === 'string' ? v.length : 0;
  }

  /**
   * Verifica si tiene error específico
   */
  public hasError(controlName: string, errorType: string): boolean {
    const control = this.getControl(controlName);
    if (!control) return false;
    const shouldShow = this.showAllErrors || control.touched || control.dirty;
    return !!(control.hasError(errorType) && shouldShow);
  }

  /**
   * Obtiene mensaje de error
   */
  public getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    if (!control) return '';

    if (!(this.showAllErrors || control.touched || control.dirty)) return '';

    if (control.hasError('required')) {
      const custom = this.CUSTOM_ERROR_MESSAGES?.[controlName]?.['required'];
      return custom ?? 'Requerido';
    }

    if (control.hasError('requireOne')) {
      const custom = this.CUSTOM_ERROR_MESSAGES?.[controlName]?.['requireOne'];
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

  /**
   * Obtiene etiqueta de checkbox
   */
  public label(ctrl: string): string {
    const LABELS: Record<string, string> = {
      p2111Presencial: 'Presencial', p2111Llamada: 'Llamada', p2111Videolla: 'Videollamada',
      p2113Presencial: 'Presencial', p2113Telefono: 'Telefónica', p2113Whatsapp: 'WhatsApp',
      p2113Virtual: 'Formulario virtual', p2113Facebook: 'Facebook', p2113CuentaX: 'Cuenta X', p2113Correo: 'Correo',
      p2114Policia: 'Policía', p2114MinPublico: 'Ministerio Público', p2114Interpol: 'INTERPOL',
      p2114PoderJudicial: 'Poder Judicial', p2114Organismo: 'ONG/Organismo', p2114Otros: 'Otros',
      p2117Mre: 'MRE', p2117Reniec: 'RENIEC', p2117Migraciones: 'Migraciones', p2117Interpol: 'INTERPOL',
      p2117Inei: 'INEI', p2117Jne: 'JNE', p2117Onpe: 'ONPE', p2117Sunarp: 'SUNARP',
      p2117PoderJudicial: 'Poder Judicial', p2117Otros: 'Otros',
      p2123Presencial: 'Presencial', p2123Telefono: 'Teléfono', p2123Videollama: 'Videollamada',
      p2126Presencial: 'Presencial', p2126Telefonica: 'Telefónica', p2126Whatsapp: 'WhatsApp',
      p2126Virtual: 'Formulario virtual', p2126Facebook: 'Facebook', p2126CuentaX: 'Cuenta X', p2126Correo: 'Correo',
      p2127Policia: 'Policía', p2127MinPublico: 'Ministerio Público', p2127Interpol: 'INTERPOL',
      p2127PoderJudicial: 'Poder Judicial', p2127Organizacion: 'Organización', p2127Otros: 'Otros',
      p2135Presencial: 'Presencial', p2135Llamada: 'Llamada', p2135Videolla: 'Videollamada',
      p2137Presecnial: 'Presencial', p2137Telefono: 'Teléfono', p2137Whatsapp: 'WhatsApp',
      p2137Virtual: 'Formulario virtual', p2137Facebook: 'Facebook', p2137CuentaX: 'Cuenta X', p2137Correo: 'Correo',
      p2138Policia: 'Policía', p2138MinPublico: 'Ministerio Público', p2138Interpol: 'INTERPOL',
      p2138PoderJudicial: 'Poder Judicial', p2138Organismo: 'Organismo', p2138Otros: 'Otros',
      p2141Mre: 'MRE', p2141Reniec: 'RENIEC', p2141Migraciones: 'Migraciones', p2141Interpol: 'INTERPOL',
      p2141Inei: 'INEI', p2141Jne: 'JNE', p2141Onpe: 'ONPE', p2141Sunarp: 'SUNARP',
      p2141PoderJudicial: 'Poder Judicial', p2141Otro: 'Otros',
      p2212Mre: 'MRE', p2212Reniec: 'RENIEC', p2212Migraciones: 'Migraciones', p2212Interpol: 'INTERPOL',
      p2212Inei: 'INEI', p2212Jne: 'JNE', p2212Onpe: 'ONPE', p2212Sunarp: 'SUNARP',
      p2212PoderJudicial: 'Poder Judicial', p2212Otros: 'Otros',
      p2130Mre: 'MRE', p2130Reniec: 'RENIEC', p2130Migraciones: 'Migraciones', p2130Interpol: 'INTERPOL',
      p2130Inei: 'INEI', p2130Jne: 'JNE', p2130Onpe: 'ONPE', p2130Sunarp: 'SUNARP',
      p2130PoderJudicial: 'Poder Judicial', p2130Otros: 'Otros'
    };
    return LABELS[ctrl] ?? ctrl;
  }

  /**
   * Verifica si tiene rol de especialista
   */
  public tieneRolEspecialista(): boolean {
    return this.authService.getScopes().includes(this.rolEspecialista);
  }

  /**
   * Maneja cambio de checkbox
   */
  // public onCheckboxChange(name: string, ev: any): void {
  //   const ctrl = this.getControl(name);
  //   if (!ctrl || ctrl.disabled) return;
  //   const checked = !!ev?.checked;
  //   ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
  //   ctrl.markAsDirty();
  //   ctrl.markAsTouched();
  // }

  public onCheckboxChange(name: string, ev: any): void {
  const val = ev.checked ? 'S' : null;
  const ctrl = this.getControl(name);
  if (!ctrl) return;
  
  ctrl.setValue(val, { emitEvent: true });
  ctrl.markAsTouched();
  
  //  REVALIDAR GRUPOS DE CHECKBOXES REQUERIDOS
  this.revalidateCheckboxGroups(name);
}

private revalidateCheckboxGroups(changedCheckbox: string): void {
  // 2.1.7 - Protocolo/Flujograma Trata
  if (['p217Protocolo', 'p217Flujograma', 'p217Ninguna'].includes(changedCheckbox)) {
    this.getControl('p217Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // 2.1.13 - Canales Trata
  if (this.tpCanales.includes(changedCheckbox)) {
    this.getControl('p2113Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // 2.1.14 - Coordinación Trata
  if ([...this.tpCoordina, 'p2114Ninguna'].includes(changedCheckbox)) {
    this.getControl('p2114Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  //  2.1.15 - Matriz Trata de Personas
  const p2115Keys = ['p2115ALogistica', 'p2115BInfra', 'p2115CPersonal', 'p2115DPresupuesto', 'p2115EOtro', 'p2115Ninguno'];
  if (p2115Keys.includes(changedCheckbox)) {
    this.getControl('p2115Any')?.updateValueAndValidity({ emitEvent: false });
  }

  // 2.1.19 - Protocolo/Flujograma VG
  if (['p2119Oficina', 'p2119Flojograma', 'p2119Ninguno'].includes(changedCheckbox)) {
    this.getControl('p2119Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // 2.1.26 - Canales VG
  if (this.vgCanales.includes(changedCheckbox)) {
    this.getControl('p2126Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // 2.1.27 - Coordinación VG
  if ([...this.vgCoordina, 'p2127Ninguna'].includes(changedCheckbox)) {
    this.getControl('p2127Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
    const p2128Keys = ['p2128ALogistica', 'p2128BInfra', 'p2128CPersonal', 'p2128DPresupuesto', 'p2128EOtro', 'p2128Ninguno'];
  if (p2128Keys.includes(changedCheckbox)) {
    this.getControl('p2128Any')?.updateValueAndValidity({ emitEvent: false });
  }

  // 2.1.32 - Protocolo/Flujograma DDE
  if (['p2132OfiConsular', 'p2132Flujograma', 'p2132Ninguno'].includes(changedCheckbox)) {
    this.getControl('p2132Any')?.updateValueAndValidity({ emitEvent: false });
  }
  
  // 2.1.38 - Coordinación DDE
  if ([...this.ddeCoordina, 'p2138Ninguna'].includes(changedCheckbox)) {
    this.getControl('p2138Any')?.updateValueAndValidity({ emitEvent: false });
  }

   const p2139Keys = ['p2139ALogistica', 'p2139BInfra', 'p2139CPersonal', 'p2139DPresupuesto', 'p2139EOtro', 'p2139Ninguno'];
  if (p2139Keys.includes(changedCheckbox)) {
    this.getControl('p2139Any')?.updateValueAndValidity({ emitEvent: false });
  }

    const p2210Keys = ['p2210ALogistica', 'p2210BInfra', 'p2210CPersonal', 'p2210DPresupuesto', 'p2210EOtro', 'p2210Ninguno'];
  if (p2210Keys.includes(changedCheckbox)) {
    this.getControl('p2210Any')?.updateValueAndValidity({ emitEvent: false });
  }

}

  /**
   * Maneja cambio de checkbox con lógica "Ninguna" (2.1.14)
   */
  public onCheckboxChangeNinguna14(name: string, ev: any): void {
    const ctrl = this.getControl(name);
    if (!ctrl || ctrl.disabled) return;

    const checked = !!ev?.checked;
    ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
    ctrl.markAsDirty();
    ctrl.markAsTouched();

    if (name !== 'p2114Ninguna' && checked) {
      this.getControl('p2114Ninguna')?.setValue(null, { emitEvent: false });
    }
  }

  /**
   * Maneja cambio de checkbox con lógica "Ninguna" (2.1.27)
   */
  public onCheckboxChangeNinguna27(name: string, ev: any): void {
    const ctrl = this.getControl(name);
    if (!ctrl || ctrl.disabled) return;

    const checked = !!ev?.checked;
    ctrl.setValue(checked ? 'S' : null, { emitEvent: true });
    ctrl.markAsDirty();
    ctrl.markAsTouched();

    if (name !== 'p2127Ninguna' && checked) {
      this.getControl('p2127Ninguna')?.setValue(null, { emitEvent: false });
    }
  }

  /**
   * Permite solo números hasta 100 (para porcentajes)
   */
  public permitirNumerosHasta100(evt: KeyboardEvent): void {
    const input = evt.target as HTMLInputElement;
    const key = evt.key;

    if (evt.ctrlKey || evt.metaKey) return;
    const ctrlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (ctrlKeys.includes(key)) return;

    if (!/^\d$/.test(key)) {
      evt.preventDefault();
      return;
    }

    const value = input.value;
    const s = input.selectionStart ?? value.length;
    const e = input.selectionEnd ?? value.length;

    if (value === '0' && s === e && s === value.length) {
      input.value = key;
      evt.preventDefault();
      return;
    }

    const future = value.slice(0, s) + key + value.slice(e);

    if (future.length > 1 && future.startsWith('0')) {
      evt.preventDefault();
      return;
    }

    const num = Number(future);

    if (!Number.isInteger(num) || num > MAX_PERCENTAGE) {
      evt.preventDefault();
    }
  }

  /**
   * Permite solo números (máximo 5 dígitos)
   */
  public permitirSoloNumeros(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const tecla = event.key;
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (teclasPermitidas.includes(tecla)) return;

    const textoSeleccionado = input.selectionStart !== input.selectionEnd;
    if (valorActual.length >= MAX_INPUT_DIGITS && !textoSeleccionado) {
      event.preventDefault();
      return;
    }

    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
    }
  }

  // ============================================
  // GETTERS PARA VALIDACIONES DE GRUPO
  // ============================================
// ============================================
// GETTERS PARA VALIDACIONES DE GRUPO
// ============================================
 get invalidCA(): boolean {
  const anyCtrl = this.getControl('p217Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}


get invalidCA2113(): boolean {
  const anyCtrl = this.getControl('p2113Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA2114(): boolean {
  const anyCtrl = this.getControl('p2114Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get showP2115GroupError(): boolean {
  const anyCtrl = this.getControl('p2115Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA2119(): boolean {
  const anyCtrl = this.getControl('p2119Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA2126(): boolean {
  const anyCtrl = this.getControl('p2126Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA2127(): boolean {
  const anyCtrl = this.getControl('p2127Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get showP2128GroupError(): boolean {
  const anyCtrl = this.getControl('p2128Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA2132(): boolean {
  const anyCtrl = this.getControl('p2132Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get invalidCA2138(): boolean {
  const anyCtrl = this.getControl('p2138Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get showP2139GroupError(): boolean {
  const anyCtrl = this.getControl('p2139Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}

get showP2210GroupError(): boolean {
  const anyCtrl = this.getControl('p2210Any');
  const shouldShow = this.showAllErrors || this.showGroupErrors || anyCtrl?.touched;
  return !!(shouldShow && anyCtrl?.invalid);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private anyChecked(keys: string[]): boolean {
    return keys.some(k => this.getControl(k)?.value === 'S');
  }

  private isGroupTouched(keys: string[]): boolean {
    return keys.some(k => {
      const c = this.getControl(k);
      return !!c && (c.touched || c.dirty);
    });
  }

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Convierte a SN
   */
  private convertToSN(v: any): SN {
    return (v === 'S' || v === true) ? 'S'
      : (v === 'N' || v === false) ? 'N'
        : null;
  }

  /**
   * Normaliza SN
   */
  private normalizeSN(v: any): SN {
    return (v === 'S' || v === 'N') ? v : null;
  }

  /**
   * Convierte a número o null
   */
  private toNumberOrNull(v: any): number | null {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  /**
   * Convierte a entero o null
   */
  private toIntOrNull(v: any): number | null {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    return Math.trunc(n);
  }

  /**
   * Muestra diálogo de carga
   */
  private showLoadingDialog(): void {
    Swal.fire({
      title: 'Guardando...',
      text: 'Por favor espere',
      backdrop: 'rgba(0, 0, 0, 0.69)',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading()
    });
  }

  /**
   * Scroll al primer error
   */
  private scrollToFirstError(): void {
    setTimeout(() => {
      const el = document.querySelector('.ng-invalid[formcontrolname], .error-text');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /**
   * Registra campos inválidos en consola
   */
  private logInvalidFields(): void {
    console.warn('--- CAMPOS INVÁLIDOS ---');
    Object.keys(this.ficha2Form.controls).forEach(nombreControl => {
      const control = this.ficha2Form.get(nombreControl);
      if (control && control.invalid) {
        console.log(
          `❌ ${nombreControl}`,
          {
            valor: control.value,
            estado: control.status,
            errores: control.errors
          }
        );
      }
    });
    console.warn('--- FIN VERIFICACIÓN ---');
  }

  /**
   * Debug (desarrollo)
   */
  public debugMaxDigits(max = 3): string[] {
    const raw = this.ficha2Form.getRawValue();
    const malos = this.numericKeys
      .map(k => [k, Number(raw[k] ?? null)] as [string, number])
      .filter(([_, v]) => Number.isFinite(v) && Math.trunc(Math.abs(v)).toString().length > max)
      .map(([k]) => k);

    if (malos.length) {
      console.warn(`🚫 Campos con > ${max} dígitos:`, malos);
    } else {
      console.info(` No hay números con más de ${max} dígitos`);
    }
    return malos;
  }
}