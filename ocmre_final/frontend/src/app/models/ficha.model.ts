export interface FichaEntity {
// --- CAMPOS CLAVE Y METADATOS ---

  // Identificador de la Ficha (ID_FICHA)
  idFicha: number; 
  // ID del Establecimiento (ID_SESTABLECMNT)
  idSestablecmnt: number; 

  // Usuarios y Fechas de Mantenimiento
  usuRegistro: string;
  // Usamos string para las fechas y dejamos que el backend las maneje o las parseamos en el servicio si vienen como ISO 8601 string.
  fchRegistro: string; 
  usuActualiza: string;
  fchActualiza: string;
  estado: string; // CHAR(1)
  
  // Metadatos de Validación
  flagValidar: string; // FLAG_VALIDAR
  usuValida: string;
  fchValida: string;
  
  // Metadatos de Baja
  estadoRegistro: string; // ESTADO_REGISTRO
  observacionBaja: string;
  fchBaja: string;
  usuBaja: string;
  
  // --- DATOS GENERALES ---
  
  // Datos de la Oficina/ODMOD
  codUnico: string; // COD_UNICO
  odmodOficina: string; // ODMOD_OFICINA
  
  // Datos del Entrevistado
  entrevNombre: string;
  entrevTipoDoc: string;
  entrevNumDoc: string;
  entrevTelefono: string;
  entrevCorreo: string;
  
  // Datos de la Supervisión
  supFechaInicio: string; 
  supFechaFin: string;
  
  // Datos de la Entidad
  entidadNombre: string;
  entidadPais: string;
  entidadContinente: string;
  entidadCategoria: string; // CHAR(1)
  entidadLugares: string;
  entidadCantidad: number; // Integer

  // --- DATOS FUNCIONALES (Contacto y Horarios) ---
  
  funcTel: string;
  funcTelEmergencia: string;
  funcCelular: string;
  funcCorreo: string;
  
  // Canales de Atención (A, B, C, D son CHAR(1))
  funcCanalAtencionA: string; 
  funcCanalAtencionB: string;
  funcCanalAtencionC: string;
  funcCanalAtencionD: string;
  funcAtencionOtro: string;
  
  // Horarios (formatos HH:MM)
  horaAtencionInicio: string;
  horaAtencionFin: string;
  horaRefrigerioInicio: string;
  horaRefrigerioFin: string;
  
  // Emergencia
  atencionEmergencia: string;
  horaEmergenciaInicio: string;
  horaEmergenciaFin: string;
  
  // Atención Extra
  brindaAtencionExtra: string;
  atencionExtraDia: string;
  motivoNoExtraA: string;
  motivoNoExtraB: string;
  motivoNoExtraC: string;
  
  // Locales Consulares
  localconsuTipo: string;
  localconsuTipoOtro: string;
  localConsuRampa: string;
  localConsuHigienico: string;

  // --- DATOS DEL JEFE CONSULAR ---
  
  nombreJefeConsular: string;
  correoJefeConsular: string;
  celJefeConsular: string;
  cargoJefeConsular: string; // CHAR(1)
  resoluJefeConsular: string;
  fechaJefeConsular: string;

  // --- DOTACIÓN DE PERSONAL (TABLA DE NRO_A a NRO_F) ---
  
  // Hombres
  nroAHombres: number;
  nroBHombres: number;
  nroCHombres: number;
  nroDHombres: number;
  nroEHombres: number;
  nroFHombres: number;
  nroTotalHombres: number;

  // Mujeres
  nroAMujeres: number;
  nroBMujeres: number;
  nroCMujeres: number;
  nroDMujeres: number;
  nroEMujeres: number;
  nroFMujeres: number;
  nroTotalMujeres: number;

  // Totales (NRO_A_TOTAL_HOMBRES hasta NRO_G_TOTAL_HOMBRES)
  // Nota: Los nombres de los campos sugieren que suman hombres y mujeres por categoría.
  nroATotalHombres: number; // Total A
  nroBTotalHombres: number; // Total B
  nroCTotalHombres: number; // Total C
  nroDTotalHombres: number; // Total D
  nroETotalHombres: number; // Total E
  nroFTotalHombres: number; // Total F
  nroGTotalHombres: number; // Total G (Total general o sub-total)
  
  // Porcentaje de personal
  porcenPersoA: number; // PORCEN_PERSO_A
  porcenPersoB: number; // PORCEN_PERSO_B
  porcenPersoC: number; // PORCEN_PERSO_C
  
  // --- PERSONAL ADICIONAL (PA: Personal Adicional) ---
  
  hPeruanosPa: number;
  hExtranjerosPa: number;
  hNacionalidadPa: number; // Asumo 'Otras Nacionalidades'
  hTotalPa: number;
  
  mPeruanasPa: number;
  mExtranjerasPa: number;
  mNacionalidadPa: number;
  mTotalPa: number;
  
  tPeruanasPa: number;
  tExtranjerasPa: number;
  tNacionalidadPa: number;
  tTotalPa: number;
  
  // --- PERSONAL EN SERVICIO (PS: Personal en Servicio) ---
  
  hPeruanosPs: number;
  hExtranjerosPs: number;
  hNacionalidadPs: number;
  hTotalPs: number;
  
  mPeruanasPs: number;
  mExtranjerasPs: number;
  mNacionalidadPs: number;
  mTotalPs: number;
  
  tPeruanasPs: number;
  tExtranjerasPs: number;
  tNacionalidadPs: number;
  tTotalPs: number;
  
  // --- PERSONAL EN VACACIONES/AUSENTE (V: Vacaciones) ---
  
  hPeruanosV: number;
  hExtranjerosV: number;
  hNacionalidadV: number;
  hTotalV: number;
  
  mPeruanasV: number;
  mExtranjerasV: number;
  mNacionalidadV: number;
  mTotalV: number;
  
  tPeruanasV: number;
  tExtranjerasV: number;
  tNacionalidadV: number;
  tTotalV: number;

  // --- SECCIÓN P2.2 (PRESUPUESTO/PROYECCIÓN) ---
  
  // P2_2_23A a P2_2_25A son CHAR(1)
  p2223a: string;
  p2224a: string;
  p2225a: string;
  
  // P2_2_23B a P2_2_25F
  p2223b: string;
  p2223c: number;
  p2223d: string;
  p2223e: number;
  p2223f: number;
  
  p2224b: string;
  p2224c: number;
  p2224d: string;
  p2224e: number;
  p2224f: number;
  
  p2225b: string;
  p2225c: number;
  p2225d: string;
  p2225e: number;
  p2225f: number;

  // --- OTROS CAMPOS DE ESTADO ---
  
  aceptar: string; // ACEPTAR
  
  // Campos de Dependencia TDE
  codiDepeTde: string;
  txtDescDepeTde: string;
  }