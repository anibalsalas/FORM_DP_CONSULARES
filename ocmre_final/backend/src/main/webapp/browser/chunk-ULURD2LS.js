import {
  AuthService
} from "./chunk-BJFTL6TQ.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatPaginator,
  MatPaginatorModule,
  MatRow,
  MatRowDef,
  MatSort,
  MatSortHeader,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-LPN7SQYB.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-5WS2ECDG.js";
import {
  FichaService,
  MatExpansionModule
} from "./chunk-NLOR5DDK.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-UYQOEGCM.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-J7YMRWMX.js";
import {
  FormBuilder,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatInput,
  MatInputModule,
  MatLabel,
  ReactiveFormsModule,
  Validators
} from "./chunk-DGL5R6XV.js";
import {
  CommonModule,
  Component,
  MatCard,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  NgClass,
  NgIf,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-JSH4HMVV.js";

// src/app/admin/ocmre/ocmre.component.ts
function FichaComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ficha_r1.idFicha);
  }
}
function FichaComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Codigo \xFAnico ");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ficha_r2.codUnico, " ");
  }
}
function FichaComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ficha_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r3.getEstadoFichaVisual(ficha_r3.estado).clase + " px-3 py-2 rounded-pill  d-inline-block w-100 text-center ");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getEstadoFichaVisual(ficha_r3.estado).texto, " ");
  }
}
function FichaComponent_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Regi\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ficha_r5.departamento, " ");
  }
}
function FichaComponent_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Provincia ");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ficha_r6.provincia, " ");
  }
}
function FichaComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Distrito ");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ficha_r7.distrito, " ");
  }
}
function FichaComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Entidad Supervisada ");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ficha_r8.nomEntidad, " ");
  }
}
function FichaComponent_th_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Nombre de la Unidad ");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ficha_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ficha_r9.nomUnidad, " ");
  }
}
function FichaComponent_th_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function FichaComponent_td_45_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function FichaComponent_td_45_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ficha_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.eliminarFicha(ficha_r11.idFicha));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function FichaComponent_td_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 24)(1, "button", 27);
    \u0275\u0275listener("click", function FichaComponent_td_45_Template_button_click_1_listener() {
      const ficha_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.editarFicha(ficha_r11));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, FichaComponent_td_45_button_4_Template, 3, 0, "button", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r3.tieneRolEspecialista());
  }
}
function FichaComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 30);
  }
}
function FichaComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
var FichaComponent = class _FichaComponent {
  fichaService;
  fb;
  snackBar;
  router;
  authService;
  displayedColumns = [
    "idFicha",
    "codUnico",
    "estado",
    "departamento",
    "provincia",
    "distrito",
    "nomEntidad",
    "nomUnidad",
    "acciones"
  ];
  dataSource = new MatTableDataSource();
  fichaForm;
  // Formulario reactivo para registrar/editar fichas
  ficha = [];
  // Lista de fichas asignadas
  isEditing = false;
  // Bandera para saber si estamos editando
  pageSizeOptions = [5, 10, 20, 50];
  defaultPageSize = 20;
  paginator;
  sort;
  constructor(fichaService, fb, snackBar, router, authService) {
    this.fichaService = fichaService;
    this.fb = fb;
    this.snackBar = snackBar;
    this.router = router;
    this.authService = authService;
    this.fichaForm = this.fb.group({
      // idFicha: [null], // Campo opcional para edición
      idFicha: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      codUnico: ["", [Validators.required, Validators.maxLength(20)]],
      nomEntidad: ["", [Validators.required, Validators.maxLength(500)]],
      nomUnidad: ["", [Validators.required, Validators.maxLength(500)]],
      estado: ["", [Validators.required, Validators.maxLength(1)]],
      departamento: ["", [Validators.required, Validators.maxLength(100)]],
      provincia: ["", [Validators.required, Validators.maxLength(100)]],
      distrito: ["", [Validators.required, Validators.maxLength(100)]]
    });
  }
  tieneRolEspecialista() {
    return this.authService.getRoles().includes("ESPECIALISTA");
  }
  ngOnInit() {
    this.cargarFichas();
  }
  cargarFichas() {
    this.fichaService.listarFichas().subscribe({
      next: (fichas) => {
        this.dataSource.data = fichas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.snackBar.open("Error al cargar las fichas", "Cerrar", {
          duration: 3e3,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  applyFilter(event) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  registrarFicha() {
    if (this.fichaForm.valid) {
      this.fichaService.registrarFicha(this.fichaForm.value).subscribe({
        next: () => {
          this.cargarFichas();
          this.fichaForm.reset();
          this.snackBar.open("Ficha registrada correctamente", "Cerrar", {
            duration: 3e3,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        },
        error: () => {
          this.snackBar.open("Error al registrar la ficha", "Cerrar", {
            duration: 3e3,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      });
    }
  }
  // editarFicha(ocmre: FichaEntity): void {
  //   // Carga los datos de la ocmre seleccionada en el formulario
  //   this.fichaForm.patchValue(ocmre);
  // }
  // editarFicha(ocmre: FichaEntity): void {
  //   localStorage.setItem('idFichaPantbc', ocmre.idFicha.toString());
  //   this.router.navigate(['/dashboard/registrar-ocmre']); // redirige al formulario y antes pasa al  (ngOnInit) del componente registrar-ocmre
  // }
  //   editarFicha(ocmre: FichaEntity): void {
  //   localStorage.setItem('idFichaPantbc', ocmre.idFicha.toString()); // ✅ Guarda el nuevo ID
  //   localStorage.setItem('fichaPantbc', JSON.stringify(ocmre));      // ✅ Guarda data general
  //   this.router.navigate(['/dashboard/registrar-ocmre']);            // ✅ Redirige al formulario
  // }
  editarFicha(ficha) {
    localStorage.removeItem("idFichaPantbc");
    localStorage.removeItem("fichaPantbc");
    localStorage.setItem("idFichaPantbc", ficha.idFicha.toString());
    localStorage.setItem("fichaPantbc", JSON.stringify(ficha));
    for (let i = 1; i <= 7; i++) {
      localStorage.removeItem(`pantbc_s${i}`);
    }
    localStorage.removeItem("pantbc_completadas");
    this.router.navigate(["/dashboard/registrar-ficha"]);
  }
  limpiarFichaPantbc() {
    localStorage.removeItem("fichaPantbc");
    localStorage.removeItem("idFichaPantbc");
    localStorage.removeItem("pantbc_secciones");
    localStorage.removeItem("pantbc_s1");
  }
  getEstadoFichaVisual(estado) {
    switch (estado) {
      case "C":
        return { texto: "Ficha completa", clase: "badge bg-success" };
      case "I":
        return { texto: "Ficha incompleta", clase: "badge bg-warning text-dark" };
      default:
        return { texto: "Sin estado", clase: "badge bg-secondary" };
    }
  }
  eliminarFicha(idFicha) {
    if (confirm("\xBFEst\xE1s seguro de que deseas eliminar esta ocmre?")) {
      this.fichaService.eliminarFicha(idFicha).subscribe({
        next: () => {
          this.cargarFichas();
          this.snackBar.open("Ficha eliminada correctamente", "Cerrar", {
            duration: 3e3,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        },
        error: () => {
          this.snackBar.open("Error al eliminar la ficha", "Cerrar", {
            duration: 3e3,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      });
    }
  }
  static \u0275fac = function FichaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FichaComponent)(\u0275\u0275directiveInject(FichaService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FichaComponent, selectors: [["app-fichas"]], viewQuery: function FichaComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 49, vars: 6, consts: [[1, "custom-card"], [1, "form-actions"], ["mat-flat-button", "", "color", "primary", 3, "click", "routerLink"], [1, "bi", "bi-card-list", "icon-margin"], [1, "table-container"], ["appearance", "outline", 2, "width", "100%"], ["matInput", "", "placeholder", "Ingrese t\xE9rmino de b\xFAsqueda", 3, "keyup"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "idFicha"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "codUnico"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["matColumnDef", "estado"], ["matColumnDef", "departamento"], ["matColumnDef", "provincia"], ["matColumnDef", "distrito"], ["matColumnDef", "nomEntidad"], ["matColumnDef", "nomUnidad"], ["matColumnDef", "acciones"], ["mat-header-row", "", "style", "background-color: gainsboro; font-weight: 500; font-size: 0.9rem;", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", "aria-label", "Seleccionar p\xE1gina de fichas", 3, "pageSizeOptions", "pageSize"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-cell", "", "mat-sort-header", ""], [2, "font-size", "0.8rem", "font-weight", "500", 3, "ngClass"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", "", 2, "background-color", "gainsboro", "font-weight", "500", "font-size", "0.9rem"], ["mat-row", ""]], template: function FichaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card")(1, "mat-card", 0)(2, "div", 1)(3, "button", 2);
      \u0275\u0275listener("click", function FichaComponent_Template_button_click_3_listener() {
        return ctx.limpiarFichaPantbc();
      });
      \u0275\u0275text(4, " Registrar Ficha ");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(5, "br");
      \u0275\u0275elementStart(6, "mat-card-header")(7, "mat-card-title")(8, "h4");
      \u0275\u0275element(9, "i", 3);
      \u0275\u0275text(10, "Fichas Registradas ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "br");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(12, "br");
      \u0275\u0275elementStart(13, "div", 4)(14, "mat-form-field", 5)(15, "mat-label");
      \u0275\u0275text(16, "Buscar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 6);
      \u0275\u0275listener("keyup", function FichaComponent_Template_input_keyup_17_listener($event) {
        return ctx.applyFilter($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "table", 7);
      \u0275\u0275elementContainerStart(19, 8);
      \u0275\u0275template(20, FichaComponent_th_20_Template, 2, 0, "th", 9)(21, FichaComponent_td_21_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(22, 11);
      \u0275\u0275template(23, FichaComponent_th_23_Template, 2, 0, "th", 12)(24, FichaComponent_td_24_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(25, 13);
      \u0275\u0275template(26, FichaComponent_th_26_Template, 2, 0, "th", 12)(27, FichaComponent_td_27_Template, 3, 2, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(28, 14);
      \u0275\u0275template(29, FichaComponent_th_29_Template, 2, 0, "th", 12)(30, FichaComponent_td_30_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(31, 15);
      \u0275\u0275template(32, FichaComponent_th_32_Template, 2, 0, "th", 12)(33, FichaComponent_td_33_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(34, 16);
      \u0275\u0275template(35, FichaComponent_th_35_Template, 2, 0, "th", 12)(36, FichaComponent_td_36_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(37, 17);
      \u0275\u0275template(38, FichaComponent_th_38_Template, 2, 0, "th", 12)(39, FichaComponent_td_39_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(40, 18);
      \u0275\u0275template(41, FichaComponent_th_41_Template, 2, 0, "th", 12)(42, FichaComponent_td_42_Template, 2, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(43, 19);
      \u0275\u0275template(44, FichaComponent_th_44_Template, 2, 0, "th", 9)(45, FichaComponent_td_45_Template, 5, 1, "td", 10);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(46, FichaComponent_tr_46_Template, 1, 0, "tr", 20)(47, FichaComponent_tr_47_Template, 1, 0, "tr", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "mat-paginator", 22);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("routerLink", "/dashboard/registrar-ocmre");
      \u0275\u0275advance(15);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(28);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("pageSizeOptions", ctx.pageSizeOptions)("pageSize", ctx.defaultPageSize);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    MatCardModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginatorModule,
    MatPaginator,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatSnackBarModule,
    RouterModule,
    RouterLink,
    MatExpansionModule
  ], styles: ["\n\n.custom-card[_ngcontent-%COMP%] {\n  margin: 5px auto;\n  padding: 20px;\n  width: 100%;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.assign-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.assign-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1 1 200px;\n}\n.section-title[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  font-weight: bold;\n}\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  font-style: italic;\n  color: gray;\n  margin-top: 10px;\n}\n.form-card[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 30px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.form-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.form-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.form-row[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: left;\n  margin-top: 0px;\n  text-align: right;\n}\nbutton[mat-flat-button][_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n@media (max-width: 600px) {\n  .form-card[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .form-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.icon-margin[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n  .snackbar-success {\n  background-color: #4caf50 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n  .snackbar-error {\n  background-color: #f44336 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n/*# sourceMappingURL=ocmre.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FichaComponent, [{
    type: Component,
    args: [{ selector: "app-fichas", standalone: true, imports: [
      CommonModule,
      MatCardModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSnackBarModule,
      RouterModule,
      MatExpansionModule
    ], template: `<mat-card>\r
 \r
\r
\r
\r
\r
\r
  <!-- Secci\xF3n de Roles -->\r
<mat-card class="custom-card">\r
  <div class="form-actions">\r
    <button mat-flat-button color="primary" [routerLink]="'/dashboard/registrar-ficha'" (click)="limpiarFichaPantbc()">\r
      Registrar Ficha\r
    </button>\r
  </div><br> \r
  <mat-card-header>\r
    <mat-card-title>\r
  <h4><i class="bi bi-card-list  icon-margin"></i>Fichas Registradas </h4><br>  \r
    </mat-card-title>\r
  </mat-card-header><br>  \r
\r
\r
  <div class="table-container">\r
\r
    <mat-form-field appearance="outline" style="width: 100%;">\r
      <mat-label>Buscar</mat-label>\r
      <input matInput (keyup)="applyFilter($event)" placeholder="Ingrese t\xE9rmino de b\xFAsqueda">\r
    </mat-form-field>\r
\r
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>\r
\r
      <!-- ID -->\r
      <ng-container matColumnDef="idFicha">\r
        <th mat-header-cell *matHeaderCellDef>ID</th>\r
        <td mat-cell *matCellDef="let ficha">{{ ficha.idFicha }}</td>\r
      </ng-container>\r
    \r
      <ng-container matColumnDef="codUnico">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Codigo \xFAnico </th>\r
        <td mat-cell *matCellDef="let ficha"> {{ ficha.codUnico }} </td>\r
      </ng-container>\r
      \r
      <!--ng-container matColumnDef="estado">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Estado </th>\r
        <td mat-cell *matCellDef="let ocmre"> {{ ocmre.estado }} </td>\r
      </ng-container-->\r
\r
<ng-container matColumnDef="estado">\r
  <th mat-header-cell *matHeaderCellDef mat-sort-header>Estado</th>\r
  <td mat-cell *matCellDef="let ficha">\r
    <span style="font-size: 0.8rem; font-weight: 500;"\r
      [ngClass]="getEstadoFichaVisual(ficha.estado).clase + ' px-3 py-2 rounded-pill  d-inline-block w-100 text-center '">\r
      {{ getEstadoFichaVisual(ficha.estado).texto }}\r
    </span>\r
  </td>\r
</ng-container>\r
\r
\r
      <ng-container matColumnDef="departamento">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Regi\xF3n </th>\r
        <td mat-cell *matCellDef="let ficha"> {{ ficha.departamento }} </td>\r
      </ng-container>\r
\r
      <ng-container matColumnDef="provincia">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Provincia </th>\r
        <td mat-cell *matCellDef="let ficha"> {{ ficha.provincia }} </td>\r
      </ng-container>\r
\r
      <ng-container matColumnDef="distrito">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Distrito </th>\r
        <td mat-cell *matCellDef="let ficha"> {{ ficha.distrito }} </td>\r
      </ng-container>\r
      \r
      <ng-container matColumnDef="nomEntidad">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Entidad Supervisada </th>\r
        <td mat-cell *matCellDef="let ficha"> {{ ficha.nomEntidad }} </td>\r
      </ng-container>\r
    \r
      <ng-container matColumnDef="nomUnidad">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre de la Unidad </th>\r
        <td mat-cell *matCellDef="let ficha"> {{ ficha.nomUnidad }} </td>\r
      </ng-container>\r
\r
      <!-- Acciones -->\r
      <ng-container matColumnDef="acciones">\r
        <th mat-header-cell *matHeaderCellDef>Acciones</th>\r
        <td mat-cell *matCellDef="let ficha">\r
          <button mat-icon-button color="primary" (click)="editarFicha(ficha)">\r
            <mat-icon>edit</mat-icon>\r
          </button>\r
          <button  *ngIf="tieneRolEspecialista()" mat-icon-button color="warn" (click)="eliminarFicha(ficha.idFicha)">\r
            <mat-icon>delete</mat-icon>\r
          </button>\r
        </td>\r
      </ng-container>\r
    \r
      <tr mat-header-row *matHeaderRowDef="displayedColumns"  style="background-color: gainsboro; font-weight: 500; font-size: 0.9rem;"></tr>\r
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
    </table>\r
\r
    <mat-paginator \r
          [pageSizeOptions]="pageSizeOptions"\r
          [pageSize]="defaultPageSize"\r
          showFirstLastButtons\r
          aria-label="Seleccionar p\xE1gina de fichas">\r
        </mat-paginator>\r
\r
  </div>\r
\r
</mat-card>\r
\r
`, styles: ["/* src/app/admin/ocmre/ocmre.component.scss */\n.custom-card {\n  margin: 5px auto;\n  padding: 20px;\n  width: 100%;\n}\n.table-container {\n  overflow-x: auto;\n}\n.assign-form {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.assign-form mat-form-field {\n  flex: 1 1 200px;\n}\n.section-title {\n  margin-top: 20px;\n  font-weight: bold;\n}\n.empty-message {\n  text-align: center;\n  font-style: italic;\n  color: gray;\n  margin-top: 10px;\n}\n.form-card {\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 30px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.form-title {\n  text-align: center;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.form-container {\n  display: flex;\n  flex-direction: column;\n}\n.form-row {\n  margin-bottom: 20px;\n}\n.full-width {\n  width: 100%;\n}\n.form-actions {\n  display: flex;\n  justify-content: left;\n  margin-top: 0px;\n  text-align: right;\n}\nbutton[mat-flat-button] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n@media (max-width: 600px) {\n  .form-card {\n    padding: 20px;\n  }\n  .form-title {\n    font-size: 1.5rem;\n  }\n}\n.icon-margin {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n::ng-deep .snackbar-success {\n  background-color: #4caf50 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n::ng-deep .snackbar-error {\n  background-color: #f44336 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n/*# sourceMappingURL=ocmre.component.css.map */\n"] }]
  }], () => [{ type: FichaService }, { type: FormBuilder }, { type: MatSnackBar }, { type: Router }, { type: AuthService }], { paginator: [{
    type: ViewChild,
    args: [MatPaginator]
  }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FichaComponent, { className: "FichaComponent", filePath: "src/app/admin/ocmre/ocmre.component.ts", lineNumber: 40 });
})();
export {
  FichaComponent
};
//# sourceMappingURL=chunk-ULURD2LS.js.map
