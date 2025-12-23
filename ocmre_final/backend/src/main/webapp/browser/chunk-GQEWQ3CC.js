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
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-J7YMRWMX.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  HttpClient,
  MatButton,
  MatButtonModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatInput,
  MatInputModule,
  MatLabel,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-DGL5R6XV.js";
import {
  CommonModule,
  Component,
  Injectable,
  MatCard,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  NgIf,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-JSH4HMVV.js";

// src/app/services/rol.service.ts
var RolService = class _RolService {
  http;
  apiUrl = "/api/roles";
  constructor(http) {
    this.http = http;
  }
  listarRoles() {
    return this.http.get(this.apiUrl);
  }
  crearRol(rol) {
    return this.http.post(this.apiUrl, rol);
  }
  eliminarRol(idRol) {
    return this.http.delete(`${this.apiUrl}/${idRol}`);
  }
  static \u0275fac = function RolService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RolService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RolService, factory: _RolService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/services/usuario-rol.service.ts
var UsuarioRolService = class _UsuarioRolService {
  http;
  apiUrl = "/api/usuario-roles";
  constructor(http) {
    this.http = http;
  }
  listarAsignaciones() {
    return this.http.get(this.apiUrl);
  }
  asignarRol(asignacion) {
    return this.http.post(this.apiUrl, asignacion);
  }
  eliminarAsignacion(usuarioUsu, idRol) {
    return this.http.delete(`${this.apiUrl}?usuarioUsu=${usuarioUsu}&idRol=${idRol}`);
  }
  static \u0275fac = function UsuarioRolService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsuarioRolService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsuarioRolService, factory: _UsuarioRolService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuarioRolService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/admin/roles/roles.component.ts
var _c0 = ["paginatorRoles"];
var _c1 = ["paginatorAsignaciones"];
var _c2 = ["sortRoles"];
var _c3 = ["sortAsignaciones"];
var _c4 = () => [5, 10, 20];
function RolesComponent_mat_error_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " El ID Rol es obligatorio. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Solo se permiten n\xFAmeros. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " M\xE1ximo 5 d\xEDgitos. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_mat_error_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " El nombre del rol es obligatorio. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Solo se permiten letras, espacios y guiones bajos. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_mat_error_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La descripci\xF3n es obligatoria. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_mat_error_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Solo se permiten letras y espacios. ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_th_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, " ID ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_td_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rol_r2.idRol, " ");
  }
}
function RolesComponent_th_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, " Nombre ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_td_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rol_r3.nombre, " ");
  }
}
function RolesComponent_th_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, " Descripci\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_td_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rol_r4.descripcion, " ");
  }
}
function RolesComponent_th_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, " Acciones ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_td_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 38)(1, "button", 40);
    \u0275\u0275listener("click", function RolesComponent_td_62_Template_button_click_1_listener() {
      const rol_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.editarRol(rol_r6));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 41);
    \u0275\u0275listener("click", function RolesComponent_td_62_Template_button_click_4_listener() {
      const rol_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.eliminarRol(rol_r6));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function RolesComponent_tr_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 42);
  }
}
function RolesComponent_tr_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 43);
  }
}
function RolesComponent_table_91_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, " Usuario ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_table_91_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asignacion_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asignacion_r8.usuarioUsu, " ");
  }
}
function RolesComponent_table_91_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, " ID Rol ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_table_91_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asignacion_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asignacion_r9.idRol, " ");
  }
}
function RolesComponent_table_91_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, " Acciones ");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_table_91_td_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 38)(1, "button", 41);
    \u0275\u0275listener("click", function RolesComponent_table_91_td_9_Template_button_click_1_listener() {
      const asignacion_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.eliminarAsignacion(asignacion_r11.usuarioUsu, asignacion_r11.idRol));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function RolesComponent_table_91_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 42);
  }
}
function RolesComponent_table_91_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 43);
  }
}
function RolesComponent_table_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 17);
    \u0275\u0275elementContainerStart(1, 44);
    \u0275\u0275template(2, RolesComponent_table_91_th_2_Template, 2, 0, "th", 19)(3, RolesComponent_table_91_td_3_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 18);
    \u0275\u0275template(5, RolesComponent_table_91_th_5_Template, 2, 0, "th", 19)(6, RolesComponent_table_91_td_6_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 23);
    \u0275\u0275template(8, RolesComponent_table_91_th_8_Template, 2, 0, "th", 24)(9, RolesComponent_table_91_td_9_Template, 4, 0, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(10, RolesComponent_table_91_tr_10_Template, 1, 0, "tr", 25)(11, RolesComponent_table_91_tr_11_Template, 1, 0, "tr", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r6.dataSourceAsignaciones);
    \u0275\u0275advance(10);
    \u0275\u0275property("matHeaderRowDef", ctx_r6.displayedColumnsAsignaciones);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r6.displayedColumnsAsignaciones);
  }
}
function RolesComponent_p_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "No hay asignaciones registradas.");
    \u0275\u0275elementEnd();
  }
}
var RolesComponent = class _RolesComponent {
  rolService;
  usuarioRolService;
  fb;
  snackBar;
  roles = [];
  dataSource;
  displayedColumns = ["idRol", "nombre", "descripcion", "acciones"];
  asignaciones = [];
  rolForm;
  asignacionForm;
  paginator;
  paginatorAsignaciones;
  sort;
  sortAsignaciones;
  constructor(rolService, usuarioRolService, fb, snackBar) {
    this.rolService = rolService;
    this.usuarioRolService = usuarioRolService;
    this.fb = fb;
    this.snackBar = snackBar;
    this.rolForm = this.fb.group({
      idRol: ["", [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.maxLength(5)
      ]],
      nombre: ["", [
        Validators.required,
        Validators.pattern("^[A-Z\xD1\xC1\xC9\xCD\xD3\xDA ]+$"),
        Validators.maxLength(200)
      ]],
      descripcion: ["", [
        Validators.required,
        Validators.pattern("^[A-Z\xD1\xC1\xC9\xCD\xD3\xDA ]+$"),
        Validators.maxLength(500)
      ]]
    });
    this.asignacionForm = this.fb.group({
      usuarioUsu: ["", Validators.required],
      idRol: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.cargarRoles();
    this.cargarAsignaciones();
  }
  applyFilter(event) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarRoles() {
    this.rolService.listarRoles().subscribe((data) => {
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  crearRol() {
    if (this.rolForm.valid) {
      this.rolService.crearRol(this.rolForm.value).subscribe(() => {
        this.cargarRoles();
        this.rolForm.reset();
        this.snackBar.open("\u2705 Registro guardado exitosamente", "Cerrar", {
          duration: 3e3,
          // 3 segundos
          horizontalPosition: "right",
          // A la derecha
          verticalPosition: "top",
          // Arriba
          panelClass: ["snackbar-success"]
          // Clase CSS personalizada opcional
        });
      }, (error) => {
        this.snackBar.open("\u274C Error al guardar el registro", "Cerrar", {
          duration: 3e3,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
          // Clase CSS para error
        });
      });
    }
  }
  dataSourceAsignaciones;
  displayedColumnsAsignaciones = ["usuarioUsu", "idRol", "acciones"];
  cargarAsignaciones() {
    this.usuarioRolService.listarAsignaciones().subscribe((data) => {
      this.asignaciones = data;
      this.dataSourceAsignaciones = new MatTableDataSource(this.asignaciones);
      this.dataSourceAsignaciones.paginator = this.paginatorAsignaciones;
      this.dataSourceAsignaciones.sort = this.sortAsignaciones;
    });
  }
  applyFilterAsignaciones(event) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSourceAsignaciones.filter = filterValue;
  }
  toUpperCase(controlName) {
    const control = this.rolForm.get(controlName);
    if (control) {
      const value = control.value?.toUpperCase() || "";
      control.setValue(value, { emitEvent: false });
    }
  }
  onNumberInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
    this.rolForm.get("idRol")?.setValue(input.value);
  }
  asignarRol() {
    if (this.asignacionForm.valid) {
      this.usuarioRolService.asignarRol(this.asignacionForm.value).subscribe(() => {
        this.cargarAsignaciones();
        this.asignacionForm.reset();
      });
    }
  }
  eliminarAsignacion(usuarioUsu, idRol) {
    this.usuarioRolService.eliminarAsignacion(usuarioUsu, idRol).subscribe(() => {
      this.cargarAsignaciones();
    });
  }
  // 🚀 👇 Aquí es donde debes agregar los métodos de editar y eliminar rol:
  editarRol(rol) {
    console.log("Editar rol:", rol);
  }
  eliminarRol(rol) {
    if (confirm(`\xBFSeguro que deseas eliminar el rol ${rol.nombre}?`)) {
      this.rolService.eliminarRol(rol.idRol).subscribe(() => {
        this.cargarRoles();
      });
    }
  }
  // Método para permitir solo letras y espacios (con mayúsculas)
  onNombreInput() {
    const control = this.rolForm.get("nombre");
    if (control) {
      const value = control.value || "";
      const filteredValue = value.toUpperCase().replace(/[^A-ZÑÁÉÍÓÚ _]/g, "");
      control.setValue(filteredValue, { emitEvent: false });
    }
  }
  onDescripcionInput() {
    const control = this.rolForm.get("descripcion");
    if (control) {
      const value = control.value || "";
      const filteredValue = value.toUpperCase().replace(/[^A-ZÑÁÉÍÓÚ ]/g, "");
      control.setValue(filteredValue, { emitEvent: false });
    }
  }
  static \u0275fac = function RolesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RolesComponent)(\u0275\u0275directiveInject(RolService), \u0275\u0275directiveInject(UsuarioRolService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolesComponent, selectors: [["app-roles"]], viewQuery: function RolesComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(_c1, 5);
      \u0275\u0275viewQuery(_c2, 5);
      \u0275\u0275viewQuery(_c3, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginatorAsignaciones = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sortAsignaciones = _t.first);
    }
  }, decls: 95, vars: 20, consts: [["paginatorRoles", ""], ["paginatorAsignaciones", ""], [1, "bi", "bi-plus-circle-fill", "icon-margin"], [1, "form-container", 3, "ngSubmit", "formGroup"], [1, "form-row"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "idRol", "placeholder", "Ingrese el ID del rol", "maxlength", "5", 3, "input"], [4, "ngIf"], ["matInput", "", "formControlName", "nombre", "placeholder", "Ingrese el nombre del rol", "maxlength", "200", 3, "keyup", "input"], ["matInput", "", "formControlName", "descripcion", "placeholder", "Breve descripci\xF3n del rol", "maxlength", "500", 3, "keyup", "input"], [1, "form-actions"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "custom-card"], [1, "bi", "bi-card-list", "icon-margin"], [1, "table-container"], ["appearance", "outline", 2, "width", "100%"], ["matInput", "", "placeholder", "Buscar rol...", 3, "keyup"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "idRol"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "nombre"], ["matColumnDef", "descripcion"], ["matColumnDef", "acciones"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 3, "pageSizeOptions"], [1, "bi", "bi-person-rolodex", "icon-margin"], [1, "assign-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "usuarioUsu", "placeholder", "Ingrese el usuario"], ["matInput", "", "formControlName", "idRol", "placeholder", "Ingrese el ID del rol"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["matInput", "", "placeholder", "Buscar...", 3, "keyup"], ["mat-table", "", "matSort", "", "class", "mat-elevation-z8", 3, "dataSource", 4, "ngIf"], ["class", "empty-message", 4, "ngIf"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["matColumnDef", "usuarioUsu"], [1, "empty-message"]], template: function RolesComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title")(3, "h4");
      \u0275\u0275element(4, "i", 2);
      \u0275\u0275text(5, " Creaci\xF3n de Roles ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "br");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(7, "br");
      \u0275\u0275elementStart(8, "form", 3);
      \u0275\u0275listener("ngSubmit", function RolesComponent_Template_form_ngSubmit_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.crearRol());
      });
      \u0275\u0275elementStart(9, "div", 4)(10, "mat-form-field", 5)(11, "mat-label");
      \u0275\u0275text(12, "ID Rol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 6);
      \u0275\u0275listener("input", function RolesComponent_Template_input_input_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNumberInput($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, RolesComponent_mat_error_14_Template, 2, 0, "mat-error", 7)(15, RolesComponent_mat_error_15_Template, 2, 0, "mat-error", 7)(16, RolesComponent_mat_error_16_Template, 2, 0, "mat-error", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 4)(18, "mat-form-field", 5)(19, "mat-label");
      \u0275\u0275text(20, "Nombre del Rol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 8);
      \u0275\u0275listener("keyup", function RolesComponent_Template_input_keyup_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toUpperCase("nombre"));
      })("input", function RolesComponent_Template_input_input_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNombreInput());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, RolesComponent_mat_error_22_Template, 2, 0, "mat-error", 7)(23, RolesComponent_mat_error_23_Template, 2, 0, "mat-error", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 4)(25, "mat-form-field", 5)(26, "mat-label");
      \u0275\u0275text(27, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "textarea", 9);
      \u0275\u0275listener("keyup", function RolesComponent_Template_textarea_keyup_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toUpperCase("descripcion"));
      })("input", function RolesComponent_Template_textarea_input_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDescripcionInput());
      });
      \u0275\u0275text(29, "        ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(30, RolesComponent_mat_error_30_Template, 2, 0, "mat-error", 7)(31, RolesComponent_mat_error_31_Template, 2, 0, "mat-error", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 10)(33, "button", 11)(34, "mat-icon");
      \u0275\u0275text(35, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(36, " Crear Rol ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "mat-card", 12)(38, "mat-card-header")(39, "mat-card-title")(40, "h4");
      \u0275\u0275element(41, "i", 13);
      \u0275\u0275text(42, "Lista de Roles");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "br");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(44, "br");
      \u0275\u0275elementStart(45, "div", 14)(46, "mat-form-field", 15)(47, "mat-label");
      \u0275\u0275text(48, "Buscar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "input", 16);
      \u0275\u0275listener("keyup", function RolesComponent_Template_input_keyup_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "table", 17);
      \u0275\u0275elementContainerStart(51, 18);
      \u0275\u0275template(52, RolesComponent_th_52_Template, 2, 0, "th", 19)(53, RolesComponent_td_53_Template, 2, 1, "td", 20);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(54, 21);
      \u0275\u0275template(55, RolesComponent_th_55_Template, 2, 0, "th", 19)(56, RolesComponent_td_56_Template, 2, 1, "td", 20);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(57, 22);
      \u0275\u0275template(58, RolesComponent_th_58_Template, 2, 0, "th", 19)(59, RolesComponent_td_59_Template, 2, 1, "td", 20);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(60, 23);
      \u0275\u0275template(61, RolesComponent_th_61_Template, 2, 0, "th", 24)(62, RolesComponent_td_62_Template, 7, 0, "td", 20);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(63, RolesComponent_tr_63_Template, 1, 0, "tr", 25)(64, RolesComponent_tr_64_Template, 1, 0, "tr", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275element(65, "mat-paginator", 27, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "mat-card", 12)(68, "mat-card-header")(69, "mat-card-title")(70, "h4");
      \u0275\u0275element(71, "i", 28);
      \u0275\u0275text(72, " Asignar Roles a Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275element(73, "br");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(74, "br");
      \u0275\u0275elementStart(75, "form", 29);
      \u0275\u0275listener("ngSubmit", function RolesComponent_Template_form_ngSubmit_75_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.asignarRol());
      });
      \u0275\u0275elementStart(76, "mat-form-field", 30)(77, "mat-label");
      \u0275\u0275text(78, "Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275element(79, "input", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "mat-form-field", 30)(81, "mat-label");
      \u0275\u0275text(82, "ID Rol");
      \u0275\u0275elementEnd();
      \u0275\u0275element(83, "input", 32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "button", 33);
      \u0275\u0275text(85, " Asignar Rol ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(86, "div", 14)(87, "mat-form-field", 15)(88, "mat-label");
      \u0275\u0275text(89, "Buscar usuario o rol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "input", 34);
      \u0275\u0275listener("keyup", function RolesComponent_Template_input_keyup_90_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilterAsignaciones($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(91, RolesComponent_table_91_Template, 12, 3, "table", 35);
      \u0275\u0275element(92, "mat-paginator", 27, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275template(94, RolesComponent_p_94_Template, 2, 0, "p", 36);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.rolForm);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.rolForm.get("idRol")) == null ? null : tmp_3_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_4_0 = ctx.rolForm.get("idRol")) == null ? null : tmp_4_0.hasError("pattern"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_5_0 = ctx.rolForm.get("idRol")) == null ? null : tmp_5_0.hasError("maxLength"));
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.rolForm.get("nombre")) == null ? null : tmp_6_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_7_0 = ctx.rolForm.get("nombre")) == null ? null : tmp_7_0.hasError("pattern"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", (tmp_8_0 = ctx.rolForm.get("descripcion")) == null ? null : tmp_8_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_9_0 = ctx.rolForm.get("descripcion")) == null ? null : tmp_9_0.hasError("pattern"));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.rolForm.invalid);
      \u0275\u0275advance(17);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(13);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(18, _c4));
      \u0275\u0275advance(10);
      \u0275\u0275property("formGroup", ctx.asignacionForm);
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.asignacionForm.invalid);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.asignaciones.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(19, _c4));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.asignaciones.length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    MaxLengthValidator,
    FormGroupDirective,
    FormControlName,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    // Para <mat-form-field> y <mat-label>
    MatInputModule,
    MatInput,
    // Para <input matInput>
    MatIconModule,
    MatIcon,
    // Para <mat-icon>
    MatButtonModule,
    MatButton,
    MatIconButton,
    // Para botones con Angular Material
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
    MatSnackBarModule
    // Si usas tablas en la plantilla
  ], styles: ["\n\n.custom-card[_ngcontent-%COMP%] {\n  margin: 5px auto;\n  padding: 20px;\n  width: 100%;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.assign-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.assign-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1 1 200px;\n}\n.section-title[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  font-weight: bold;\n}\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  font-style: italic;\n  color: gray;\n  margin-top: 10px;\n}\n.form-card[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 30px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.form-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.form-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.form-row[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: left;\n  margin-top: 0px;\n  text-align: right;\n}\nbutton[mat-flat-button][_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n@media (max-width: 600px) {\n  .form-card[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .form-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.icon-margin[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n  .snackbar-success {\n  background-color: #4caf50 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n  .snackbar-error {\n  background-color: #f44336 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n/*# sourceMappingURL=roles.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesComponent, [{
    type: Component,
    args: [{ selector: "app-roles", standalone: true, imports: [
      CommonModule,
      MatCardModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      // Para <mat-form-field> y <mat-label>
      MatInputModule,
      // Para <input matInput>
      MatIconModule,
      // Para <mat-icon>
      MatButtonModule,
      // Para botones con Angular Material
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSnackBarModule
      // Si usas tablas en la plantilla
    ], template: `<mat-card>\r
  <mat-card-header>\r
    <mat-card-title>\r
      <h4>\r
        <i class="bi bi-plus-circle-fill icon-margin"></i> Creaci\xF3n de Roles\r
      </h4><br>  \r
    </mat-card-title>\r
  </mat-card-header><br>  \r
\r
  <form [formGroup]="rolForm" (ngSubmit)="crearRol()" class="form-container">\r
    <div class="form-row">\r
      <mat-form-field appearance="outline" class="full-width">\r
        <mat-label>ID Rol</mat-label>\r
        <input matInput formControlName="idRol" placeholder="Ingrese el ID del rol"\r
               maxlength="5"\r
               (input)="onNumberInput($event)" >\r
        <mat-error *ngIf="rolForm.get('idRol')?.hasError('required')">\r
          El ID Rol es obligatorio.\r
        </mat-error>\r
        <mat-error *ngIf="rolForm.get('idRol')?.hasError('pattern')">\r
          Solo se permiten n\xFAmeros.\r
        </mat-error>\r
        <mat-error *ngIf="rolForm.get('idRol')?.hasError('maxLength')">\r
          M\xE1ximo 5 d\xEDgitos.\r
        </mat-error>\r
      </mat-form-field>\r
    </div>\r
\r
    <div class="form-row">\r
      <mat-form-field appearance="outline" class="full-width">\r
        <mat-label>Nombre del Rol</mat-label>\r
        <input matInput formControlName="nombre" placeholder="Ingrese el nombre del rol"\r
               maxlength="200"\r
               (keyup)="toUpperCase('nombre')" (input)="onNombreInput()">\r
        <mat-error *ngIf="rolForm.get('nombre')?.hasError('required')">\r
          El nombre del rol es obligatorio.\r
        </mat-error>\r
        <mat-error *ngIf="rolForm.get('nombre')?.hasError('pattern')">\r
          Solo se permiten letras, espacios y guiones bajos.\r
        </mat-error>\r
      </mat-form-field>\r
    </div>\r
\r
    <div class="form-row">\r
      <mat-form-field appearance="outline" class="full-width">\r
        <mat-label>Descripci\xF3n</mat-label>\r
        <textarea matInput formControlName="descripcion"\r
                  placeholder="Breve descripci\xF3n del rol"\r
                  maxlength="500"\r
                  (keyup)="toUpperCase('descripcion')" (input)="onDescripcionInput()">\r
        </textarea>\r
        <mat-error *ngIf="rolForm.get('descripcion')?.hasError('required')">\r
          La descripci\xF3n es obligatoria.\r
        </mat-error>\r
        <mat-error *ngIf="rolForm.get('descripcion')?.hasError('pattern')">\r
          Solo se permiten letras y espacios.\r
        </mat-error>\r
      </mat-form-field>\r
    </div>\r
\r
    <div class="form-actions">\r
      <button mat-flat-button color="primary" type="submit" [disabled]="rolForm.invalid">\r
        <mat-icon>add</mat-icon> Crear Rol\r
      </button>\r
    </div>\r
  </form>\r
\r
\r
  <!-- Secci\xF3n de Roles -->\r
<mat-card class="custom-card">\r
  \r
  <mat-card-header>\r
    <mat-card-title>\r
  <h4><i class="bi bi-card-list  icon-margin"></i>Lista de Roles</h4><br>  \r
    </mat-card-title>\r
  </mat-card-header><br>  \r
\r
\r
  <div class="table-container">\r
\r
    <mat-form-field appearance="outline" style="width: 100%;">\r
      <mat-label>Buscar</mat-label>\r
      <input matInput (keyup)="applyFilter($event)" placeholder="Buscar rol...">\r
    </mat-form-field>\r
\r
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>\r
\r
      <!-- ID -->\r
      <ng-container matColumnDef="idRol">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>\r
        <td mat-cell *matCellDef="let rol"> {{ rol.idRol }} </td>\r
      </ng-container>\r
    \r
      <!-- Nombre -->\r
      <ng-container matColumnDef="nombre">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>\r
        <td mat-cell *matCellDef="let rol"> {{ rol.nombre }} </td>\r
      </ng-container>\r
    \r
      <!-- Descripci\xF3n -->\r
      <ng-container matColumnDef="descripcion">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Descripci\xF3n </th>\r
        <td mat-cell *matCellDef="let rol"> {{ rol.descripcion }} </td>\r
      </ng-container>\r
    \r
      <!-- Acciones -->\r
      <ng-container matColumnDef="acciones">\r
        <th mat-header-cell *matHeaderCellDef> Acciones </th>\r
        <td mat-cell *matCellDef="let rol">\r
          <button mat-icon-button color="primary" (click)="editarRol(rol)">\r
            <mat-icon>edit</mat-icon>\r
          </button>\r
          <button mat-icon-button color="warn" (click)="eliminarRol(rol)">\r
            <mat-icon>delete</mat-icon>\r
          </button>\r
        </td>\r
      </ng-container>\r
    \r
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
    </table>\r
    <mat-paginator #paginatorRoles\r
               [pageSizeOptions]="[5, 10, 20]"\r
               showFirstLastButtons>\r
    </mat-paginator>\r
\r
  </div>\r
</mat-card>\r
\r
<!-- Secci\xF3n de Asignar Roles -->\r
<mat-card class="custom-card">\r
  \r
  <mat-card-header>\r
    <mat-card-title>\r
  <h4><i class="bi bi-person-rolodex  icon-margin"></i> Asignar Roles a Usuarios</h4><br>  \r
    </mat-card-title>\r
  </mat-card-header><br>  \r
\r
  <form [formGroup]="asignacionForm" (ngSubmit)="asignarRol()" class="assign-form">\r
    <mat-form-field appearance="outline">\r
      <mat-label>Usuario</mat-label>\r
      <input matInput formControlName="usuarioUsu" placeholder="Ingrese el usuario">\r
    </mat-form-field>\r
\r
    <mat-form-field appearance="outline">\r
      <mat-label>ID Rol</mat-label>\r
      <input matInput formControlName="idRol" placeholder="Ingrese el ID del rol">\r
    </mat-form-field>\r
\r
    <button mat-raised-button color="primary" type="submit" [disabled]="asignacionForm.invalid">\r
      Asignar Rol\r
    </button>\r
  </form>\r
\r
  <!-- Tabla de Asignaciones -->\r
 \r
  <div class="table-container">\r
\r
    <mat-form-field appearance="outline" style="width: 100%;">\r
      <mat-label>Buscar usuario o rol</mat-label>\r
      <input matInput (keyup)="applyFilterAsignaciones($event)" placeholder="Buscar...">\r
    </mat-form-field>\r
  \r
      <table mat-table [dataSource]="dataSourceAsignaciones" matSort class="mat-elevation-z8" *ngIf="asignaciones.length > 0">\r
\r
      <!-- Usuario -->\r
      <ng-container matColumnDef="usuarioUsu">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Usuario </th>\r
        <td mat-cell *matCellDef="let asignacion"> {{ asignacion.usuarioUsu }} </td>\r
      </ng-container>\r
  \r
      <!-- ID Rol -->\r
      <ng-container matColumnDef="idRol">\r
        <th mat-header-cell *matHeaderCellDef mat-sort-header> ID Rol </th>\r
        <td mat-cell *matCellDef="let asignacion"> {{ asignacion.idRol }} </td>\r
      </ng-container>\r
  \r
      <!-- Acciones -->\r
      <ng-container matColumnDef="acciones">\r
        <th mat-header-cell *matHeaderCellDef> Acciones </th>\r
        <td mat-cell *matCellDef="let asignacion">\r
          <button mat-icon-button color="warn" (click)="eliminarAsignacion(asignacion.usuarioUsu, asignacion.idRol)">\r
            <mat-icon>delete</mat-icon>\r
          </button>\r
        </td>\r
      </ng-container>\r
  \r
      <tr mat-header-row *matHeaderRowDef="displayedColumnsAsignaciones"></tr>\r
      <tr mat-row *matRowDef="let row; columns: displayedColumnsAsignaciones;"></tr>\r
    </table>\r
  \r
    <mat-paginator #paginatorAsignaciones\r
               [pageSizeOptions]="[5, 10, 20]"\r
               showFirstLastButtons>\r
    </mat-paginator>\r
\r
  \r
  </div>\r
\r
  <p *ngIf="asignaciones.length === 0" class="empty-message">No hay asignaciones registradas.</p>\r
</mat-card>\r
`, styles: ["/* src/app/admin/roles/roles.component.scss */\n.custom-card {\n  margin: 5px auto;\n  padding: 20px;\n  width: 100%;\n}\n.table-container {\n  overflow-x: auto;\n}\n.assign-form {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.assign-form mat-form-field {\n  flex: 1 1 200px;\n}\n.section-title {\n  margin-top: 20px;\n  font-weight: bold;\n}\n.empty-message {\n  text-align: center;\n  font-style: italic;\n  color: gray;\n  margin-top: 10px;\n}\n.form-card {\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 30px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.form-title {\n  text-align: center;\n  margin-bottom: 20px;\n  font-weight: 600;\n}\n.form-container {\n  display: flex;\n  flex-direction: column;\n}\n.form-row {\n  margin-bottom: 20px;\n}\n.full-width {\n  width: 100%;\n}\n.form-actions {\n  display: flex;\n  justify-content: left;\n  margin-top: 0px;\n  text-align: right;\n}\nbutton[mat-flat-button] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n@media (max-width: 600px) {\n  .form-card {\n    padding: 20px;\n  }\n  .form-title {\n    font-size: 1.5rem;\n  }\n}\n.icon-margin {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n::ng-deep .snackbar-success {\n  background-color: #4caf50 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n::ng-deep .snackbar-error {\n  background-color: #f44336 !important;\n  color: #fff !important;\n  font-weight: bold;\n}\n/*# sourceMappingURL=roles.component.css.map */\n"] }]
  }], () => [{ type: RolService }, { type: UsuarioRolService }, { type: FormBuilder }, { type: MatSnackBar }], { paginator: [{
    type: ViewChild,
    args: ["paginatorRoles"]
  }], paginatorAsignaciones: [{
    type: ViewChild,
    args: ["paginatorAsignaciones"]
  }], sort: [{
    type: ViewChild,
    args: ["sortRoles"]
  }], sortAsignaciones: [{
    type: ViewChild,
    args: ["sortAsignaciones"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolesComponent, { className: "RolesComponent", filePath: "src/app/admin/roles/roles.component.ts", lineNumber: 35 });
})();
export {
  RolesComponent
};
//# sourceMappingURL=chunk-GQEWQ3CC.js.map
