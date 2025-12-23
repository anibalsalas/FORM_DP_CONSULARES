import {
  CommonModule,
  Component,
  MatCard,
  MatCardModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-JSH4HMVV.js";

// src/app/admin/usuarios/usuarios.component.ts
var UsuariosComponent = class _UsuariosComponent {
  constructor() {
    console.log("\u2705 UsuariosComponent cargado correctamente");
  }
  static \u0275fac = function UsuariosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsuariosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsuariosComponent, selectors: [["app-usuarios"]], decls: 4, vars: 0, template: function UsuariosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card")(1, "h2");
      \u0275\u0275text(2, "Bienvenido");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "p");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [CommonModule, MatCardModule, MatCard], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuariosComponent, [{
    type: Component,
    args: [{ selector: "app-usuarios", standalone: true, imports: [CommonModule, MatCardModule], template: "<mat-card>\r\n    <h2>Bienvenido</h2>\r\n    <p></p>\r\n  </mat-card>\r\n  " }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsuariosComponent, { className: "UsuariosComponent", filePath: "src/app/admin/usuarios/usuarios.component.ts", lineNumber: 12 });
})();
export {
  UsuariosComponent
};
//# sourceMappingURL=chunk-ERCOUNJG.js.map
