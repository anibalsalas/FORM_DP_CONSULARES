export interface CuentaBasico {
  foto: string
  foto_rec: string
  nombre_completo: string
  nombres: string
  papellido: string
  sapellido: string
  tipo_doc_nombre: string
  numero_doc: string
  rel_laboral_codigo: string
  rel_laboral_nombre: string
  email: string
  email_ins: string
  usuario: string
}

export interface UrlLogin {
    url: string;
}

export interface ObtenerTokenComand {
    sesion_estado: string
    codigo: string
    client: string
    con_datos?: string
    code_verifier?: string
}

export interface CredencialResul {
    access_token: string
    refresh_token: string
}

export interface RutasAcceso {
    ruta_apps: string;
    ruta_admin_cuenta: string;
}

export interface AppInfo {
    id:             number
    cuuid:          string
    logo:           string
    logo_sm:        string
    siglas:         string
    nombre:         string
    entidad_nombre: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}