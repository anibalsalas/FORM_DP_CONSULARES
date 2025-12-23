import {
  Router
} from "./chunk-UYQOEGCM.js";
import {
  HttpClient
} from "./chunk-DGL5R6XV.js";
import {
  Injectable,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-JSH4HMVV.js";

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  router;
  apiUrl = "/api/auth";
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  // ✅ Login con almacenamiento de token y redirección por rol
  login(credentials) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(tap((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        this.router.navigate(["/dashboard/ficha"]);
      }
    }));
  }
  // ✅ Obtiene el token almacenado
  getToken() {
    return localStorage.getItem("token");
  }
  // ✅ Verifica si el usuario está logueado
  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
  isLoggedIn() {
    const token = this.getToken();
    if (!token)
      return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isTokenExpired = payload.exp * 1e3 < Date.now();
      return !isTokenExpired;
    } catch (e) {
      console.error("Error parsing token payload:", e);
      return false;
    }
  }
  // ✅ Extrae los roles desde el payload del JWT
  getRoles() {
    const token = this.getToken();
    if (!token)
      return [];
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rawRoles = payload.roles || [];
      if (rawRoles.length === 0) {
        return ["COMISIONADO"];
      }
      const cleanedRoles = rawRoles.map((role) => role.startsWith("ROLE_") ? role.substring(5) : role);
      return cleanedRoles;
    } catch (e) {
      console.error("Error parsing token payload:", e);
      return [];
    }
  }
  // ✅ Función para redireccionar según los roles
  redirectByRole(roles) {
    if (roles.some((role) => role.includes("COMISIONADO"))) {
      this.router.navigate(["/admin"]);
    } else if (roles.some((role) => role.includes("ESPECIALISTA"))) {
      this.router.navigate(["/especialista"]);
    } else if (roles.some((role) => role.includes("EXTERNO"))) {
      this.router.navigate(["/externo"]);
    } else {
      this.logout();
    }
  }
  // ✅ Logout con limpieza del token y redirección al login
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-BJFTL6TQ.js.map
