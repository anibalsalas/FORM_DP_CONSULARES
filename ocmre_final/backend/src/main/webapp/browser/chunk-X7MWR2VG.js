import {
  CommonModule,
  Component,
  MatCard,
  MatCardModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-JSH4HMVV.js";

// src/app/unauthorized/unauthorized.component.ts
var UnauthorizedComponent = class _UnauthorizedComponent {
  static \u0275fac = function UnauthorizedComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnauthorizedComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["app-unauthorized"]], decls: 5, vars: 0, consts: [["color", "warn"]], template: function UnauthorizedComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "h2");
      \u0275\u0275text(2, "\u{1F6AB} Acceso no autorizado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p");
      \u0275\u0275text(4, "No tienes permisos para acceder a esta secci\xF3n.");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [CommonModule, MatCardModule, MatCard], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnauthorizedComponent, [{
    type: Component,
    args: [{
      standalone: true,
      selector: "app-unauthorized",
      imports: [CommonModule, MatCardModule],
      template: `
    <mat-card color="warn">
      <h2>\u{1F6AB} Acceso no autorizado</h2>
      <p>No tienes permisos para acceder a esta secci\xF3n.</p>
    </mat-card>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "src/app/unauthorized/unauthorized.component.ts", lineNumber: 16 });
})();
export {
  UnauthorizedComponent
};
//# sourceMappingURL=chunk-X7MWR2VG.js.map
