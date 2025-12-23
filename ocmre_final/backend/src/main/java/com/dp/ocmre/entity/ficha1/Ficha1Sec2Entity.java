
package com.dp.ocmre.entity.ficha1;



import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Entity
@Table(name = "MRE_FICHA_S2", schema = ESQUEMA_BD)
public class Ficha1Sec2Entity {

    @Id
    @Column(name = "ID_FICHA_S2")
    private Long idFichaS2;

    @Column(name = "ID_FICHA")
    private Long idFicha;

    @Column(name = "USU_REGISTRO", length = 18)
    private String usuRegistro;

    @Column(name = "FCH_REGISTRO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fchRegistro;

    @Column(name = "USU_ACTUALIZA", length = 18)
    private String usuActualiza;

    @Column(name = "FCH_ACTUALIZA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fchActualiza;

    @Column(name = "ESTADO_S2", length = 1)
    private String estado_s2;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S2", length = 1)
    private String valida_s2;

    @Column(name = "P211_OFI_CONSULAR", length = 1)
    private String p211OfiConsular;

    @Column(name = "P212_NUM_ASESOR")
    private Integer p212NumAsesor;

    @Column(name = "P213_PERUANA", length = 1)
    private String p213Peruana;

    @Column(name = "P213_PERUANA_CANTIDAD")
    private Integer p213PeruanaCantidad;

    @Column(name = "P213_EXTRANJERA", length = 1)
    private String p213Extranjera;

    @Column(name = "P213_EXTRANJERA_CANTIDAD")
    private Integer p213ExtranjeraCantidad;

    @Column(name = "P213_EXTRANJERA_DETALLE", length = 50)
    private String p213ExtranjeraDetalle;

    @Column(name = "P214_LABOR", length = 1)
    private String p214Labor;

    @Column(name = "P215_ORGANO_LINEA", length = 1)
    private String p215OrganoLinea;

    @Column(name = "P215_ESPECIFIQUE", length = 1)
    private String p215Especifique;


    @Column(name = "P217PROTOCOLO", length = 1)
    private String p217Protocolo;

    @Column(name = "P217FLUJOGRAMA", length = 1)
    private String p217Flujograma;

       @Column(name = "P217_NINGUNA", length = 1)
    private String p217Ninguna;


    @Column(name = "P218PROTOCOLO", length = 1)
    private String p218Protocolo;

    @Column(name = "P219EMERGENCIA", length = 1)
    private String p219Emergencia;

    // Campos 2023
    @Column(name = "P2_2023_HOMBRE")
    private Integer p22023Hombre;

    @Column(name = "P2_2023_HOMBRE_DISCA")
    private Integer p22023HombreDisca;

    @Column(name = "P2_2023_MUJER")
    private Integer p22023Mujer;

    @Column(name = "P2_2023_MUJER_DISCA")
    private Integer p22023MujerDisca;

    @Column(name = "P2_2023_CIVIL", length = 1)
    private String p22023Civil;

    @Column(name = "P2_2023_CIVIL_NUM")
    private Integer p22023CivilNum;

    @Column(name = "P2_2023_PENAL", length = 1)
    private String p22023Penal;

    @Column(name = "P2_2023_PENAL_NUM")
    private Integer p22023PenalNum;

    @Column(name = "P2_2023_FAMILIA", length = 1)
    private String p22023Familia;

    @Column(name = "P2_2023_FAMILIA_NUM")
    private Integer p22023FamiliaNum;

    @Column(name = "P2_2023_LABORAL", length = 1)
    private String p22023Laboral;

    @Column(name = "P2_2023_LABORAL_NUM")
    private Integer p22023LaboralNum;

    @Column(name = "P2_2023_MIGRATORIA", length = 1)
    private String p22023Migratoria;

    @Column(name = "P2_2023_MIGRATORIA_NUM")
    private Integer p22023MigratoriaNum;

    @Column(name = "P2_2023_MAYOR_HOMBRE")
    private Integer p22023MayorHombre;

    @Column(name = "P2_2023_MAYOR_HOMBRE_DISCA")
    private Integer p22023MayorHombreDisca;

    @Column(name = "P2_2023_MAYOR_MUJER")
    private Integer p22023MayorMujer;

    @Column(name = "P2_2023_MAYOR_MUJER_DISCA")
    private Integer p22023MayorMujerDisca;

    @Column(name = "P2_2023_MENOR_HOMBRE")
    private Integer p22023MenorHombre;

    @Column(name = "P2_2023_MENOR_HOMBRE_DISCA")
    private Integer p22023MenorHombreDisca;

    @Column(name = "P2_2023_MENOR_MUJER")
    private Integer p22023MenorMujer;

    @Column(name = "P2_2023_MENOR_MUJER_DISCA")
    private Integer p22023MenorMujerDisca;

    @Column(name = "P2_2023_NOTIFICACION")
    private Integer p22023Notificacion;

    @Column(name = "P2_2023_DEFENSA_OFICIO")
    private Integer p22023DefensaOficio;

    @Column(name = "P2_2023_PATROCINIO")
    private Integer p22023Patrocinio;

    @Column(name = "P2_2023_GESTIONES")
    private Integer p22023Gestiones;

    @Column(name = "P2_2023_COORDINACION")
    private Integer p22023Coordinacion;

    @Column(name = "P2_2023_INTERPRETE")
    private Integer p22023Interprete;

    @Column(name = "P2_2023_SENIAS")
    private Integer p22023Senias;

    @Column(name = "P2_2023_OTROS")
    private Integer p22023Otros;

    // Campos 2024
    @Column(name = "P2_2024_HOMBRE")
    private Integer p22024Hombre;

    @Column(name = "P2_2024_HOMBRE_DISCA")
    private Integer p22024HombreDisca;

    @Column(name = "P2_2024_MUJER")
    private Integer p22024Mujer;

    @Column(name = "P2_2024_MUJER_DISCA")
    private Integer p22024MujerDisca;

    @Column(name = "P2_2024_CIVIL", length = 1)
    private String p22024Civil;

    @Column(name = "P2_2024_CIVIL_NUM")
    private Integer p22024CivilNum;

    @Column(name = "P2_2024_PENAL", length = 1)
    private String p22024Penal;

    @Column(name = "P2_2024_PENAL_NUM")
    private Integer p22024PenalNum;

    @Column(name = "P2_2024_FAMILIA", length = 1)
    private String p22024Familia;

    @Column(name = "P2_2024_FAMILIA_NUM")
    private Integer p22024FamiliaNum;

    @Column(name = "P2_2024_LABORAL", length = 1)
    private String p22024Laboral;

    @Column(name = "P2_2024_LABORAL_NUM")
    private Integer p22024LaboralNum;

    @Column(name = "P2_2024_MIGRATORIA", length = 1)
    private String p22024Migratoria;

    @Column(name = "P2_2024_MIGRATORIA_NUM")
    private Integer p22024MigratoriaNum;

    @Column(name = "P2_2024_MAYOR_HOMBRE")
    private Integer p22024MayorHombre;

    @Column(name = "P2_2024_MAYOR_HOMBRE_DISCA")
    private Integer p22024MayorHombreDisca;

    @Column(name = "P2_2024_MAYOR_MUJER")
    private Integer p22024MayorMujer;

    @Column(name = "P2_2024_MAYOR_MUJER_DISCA")
    private Integer p22024MayorMujerDisca;

    @Column(name = "P2_2024_MENOR_HOMBRE")
    private Integer p22024MenorHombre;

    @Column(name = "P2_2024_MENOR_HOMBRE_DISCA")
    private Integer p22024MenorHombreDisca;

    @Column(name = "P2_2024_MENOR_MUJER")
    private Integer p22024MenorMujer;

    @Column(name = "P2_2024_MENOR_MUJER_DISCA")
    private Integer p22024MenorMujerDisca;

    @Column(name = "P2_2024_NOTIFICACION")
    private Integer p22024Notificacion;

    @Column(name = "P2_2024_DEFENSA_OFICIO")
    private Integer p22024DefensaOficio;

    @Column(name = "P2_2024_PATROCINIO")
    private Integer p22024Patrocinio;

    @Column(name = "P2_2024_GESTIONES")
    private Integer p22024Gestiones;

    @Column(name = "P2_2024_COORDINACION")
    private Integer p22024Coordinacion;

    @Column(name = "P2_2024_INTERPRETE")
    private Integer p22024Interprete;

    @Column(name = "P2_2024_SENIAS")
    private Integer p22024Senias;

    @Column(name = "P2_2024_OTROS")
    private Integer p22024Otros;

    // Campos 2025
    @Column(name = "P2_2025_HOMBRE")
    private Integer p22025Hombre;

    @Column(name = "P2_2025_HOMBRE_DISCA")
    private Integer p22025HombreDisca;

    @Column(name = "P2_2025_MUJER")
    private Integer p22025Mujer;

    @Column(name = "P2_2025_MUJER_DISCA")
    private Integer p22025MujerDisca;

    @Column(name = "P2_2025_CIVIL", length = 1)
    private String p22025Civil;

    @Column(name = "P2_2025_CIVIL_NUM")
    private Integer p22025CivilNum;

    @Column(name = "P2_2025_PENAL", length = 1)
    private String p22025Penal;

    @Column(name = "P2_2025_PENAL_NUM")
    private Integer p22025PenalNum;

    @Column(name = "P2_2025_FAMILIA", length = 1)
    private String p22025Familia;

    @Column(name = "P2_2025_FAMILIA_NUM")
    private Integer p22025FamiliaNum;

    @Column(name = "P2_2025_LABORAL", length = 1)
    private String p22025Laboral;

    @Column(name = "P2_2025_LABORAL_NUM")
    private Integer p22025LaboralNum;

    @Column(name = "P2_2025_MIGRATORIA", length = 1)
    private String p22025Migratoria;

    @Column(name = "P2_2025_MIGRATORIA_NUM")
    private Integer p22025MigratoriaNum;

    @Column(name = "P2_2025_MAYOR_HOMBRE")
    private Integer p22025MayorHombre;

    @Column(name = "P2_2025_MAYOR_HOMBRE_DISCA")
    private Integer p22025MayorHombreDisca;

    @Column(name = "P2_2025_MAYOR_MUJER")
    private Integer p22025MayorMujer;

    @Column(name = "P2_2025_MAYOR_MUJER_DISCA")
    private Integer p22025MayorMujerDisca;

    @Column(name = "P2_2025_MENOR_HOMBRE")
    private Integer p22025MenorHombre;

    @Column(name = "P2_2025_MENOR_HOMBRE_DISCA")
    private Integer p22025MenorHombreDisca;

    @Column(name = "P2_2025_MENOR_MUJER")
    private Integer p22025MenorMujer;

    @Column(name = "P2_2025_MENOR_MUJER_DISCA")
    private Integer p22025MenorMujerDisca;

    @Column(name = "P2_2025_NOTIFICACION")
    private Integer p22025Notificacion;

    @Column(name = "P2_2025_DEFENSA_OFICIO")
    private Integer p22025DefensaOficio;

    @Column(name = "P2_2025_PATROCINIO")
    private Integer p22025Patrocinio;

    @Column(name = "P2_2025_GESTIONES")
    private Integer p22025Gestiones;

    @Column(name = "P2_2025_COORDINACION")
    private Integer p22025Coordinacion;

    @Column(name = "P2_2025_INTERPRETE")
    private Integer p22025Interprete;

    @Column(name = "P2_2025_SENIAS")
    private Integer p22025Senias;

    @Column(name = "P2_2025_OTROS")
    private Integer p22025Otros;

    // P216
    @Column(name = "P216_2023_ORIENTADO")
    private Integer p2162023Orientado;

    @Column(name = "P216_2023_ASISTIO")
    private Integer p2162023Asistio;

    @Column(name = "P216_2024_ORIENTADO")
    private Integer p2162024Orientado;

    @Column(name = "P216_2024_ASISTIO")
    private Integer p2162024Asistio;

    @Column(name = "P216_2025_ORIENTADO")
    private Integer p2162025Orientado;

    @Column(name = "P216_2025_ASISTIO")
    private Integer p2162025Asistio;

    // P217-P2111
    @Column(name = "P217_TRATA_PERSONA", length = 1)
    private String p217TrataPersona;

    @Column(name = "P2110_PSICOLOGICO", length = 1)
    private String p2110Psicologico;

    @Column(name = "P2111_PRESENCIAL", length = 1)
    private String p2111Presencial;

    @Column(name = "P2111_LLAMADA", length = 1)
    private String p2111Llamada;

    @Column(name = "P2111_VIDEOLLA", length = 1)
    private String p2111Videolla;

    // P2112
    @Column(name = "P2112_ONG", length = 1)
    private String p2112Ong;

    @Column(name = "P2112_1", length = 200)
    private String p21121;

    @Column(name = "P2112_2", length = 200)
    private String p21122;

    @Column(name = "P2112_3", length = 200)
    private String p21123;

    // P2113
    @Column(name = "P2113_PRESENCIAL", length = 1)
    private String p2113Presencial;

    @Column(name = "P2113_TELEFONO", length = 1)
    private String p2113Telefono;

    @Column(name = "P2113_WHATSAPP", length = 1)
    private String p2113Whatsapp;

    @Column(name = "P2113_VIRTUAL", length = 1)
    private String p2113Virtual;

    @Column(name = "P2113_FACEBOOK", length = 1)
    private String p2113Facebook;

    @Column(name = "P2113_CUENTA_X", length = 1)
    private String p2113CuentaX;

    @Column(name = "P2113_CORREO", length = 1)
    private String p2113Correo;

    // P2114
    @Column(name = "P2114_POLICIA", length = 1)
    private String p2114Policia;

    @Column(name = "P2114_MIN_PUBLICO", length = 1)
    private String p2114MinPublico;

    @Column(name = "P2114_INTERPOL", length = 1)
    private String p2114Interpol;

    @Column(name = "P2114_PODER_JUDICIAL", length = 1)
    private String p2114PoderJudicial;

    @Column(name = "P2114_ORGANISMO", length = 1)
    private String p2114Organismo;

    @Column(name = "P2114_NINGUNA", length = 1)
    private String p2114Ninguna;

    @Column(name = "P2114_OTROS", length = 1)
    private String p2114Otros;

    @Column(name = "P2114_OTROS_DETALLE", length = 500)
    private String p2114OtrosDetalle;

    // P2115
    @Column(name = "P2115_A_LOGISTICA", length = 1)
    private String p2115ALogistica;

    @Column(name = "P2115_A_GESTIONES", length = 1)
    private String p2115AGestiones;

    @Column(name = "P2115_A_SUFICIENTE", length = 1)
    private String p2115ASuficiente;

    @Column(name = "P2115_A_ESPECIFIQUE", length = 1)
    private String p2115AEspecifique;

    @Column(name = "P2115_B_INFRA", length = 1)
    private String p2115BInfra;

    @Column(name = "P2115_B_GESTIONES", length = 1)
    private String p2115BGestiones;

    @Column(name = "P2115_B_SUFICIENTE", length = 1)
    private String p2115BSuficiente;

    @Column(name = "P2115_B_ESPECIFIQUE", length = 1)
    private String p2115BEspecifique;

    @Column(name = "P2115_C_PERSONAL", length = 1)
    private String p2115CPersonal;

    @Column(name = "P2115_C_GESTIONES", length = 1)
    private String p2115CGestiones;

    @Column(name = "P2115_C_SUFICIENTE", length = 1)
    private String p2115CSuficiente;

    @Column(name = "P2115_C_ESPECIFIQUE", length = 1)
    private String p2115CEspecifique;

    @Column(name = "P2115_D_PRESUPUESTO", length = 1)
    private String p2115DPresupuesto;

    @Column(name = "P2115_D_GESTIONES", length = 1)
    private String p2115DGestiones;

    @Column(name = "P2115_D_SUFICIENTE", length = 1)
    private String p2115DSuficiente;

    @Column(name = "P2115_D_ESPECIFIQUE", length = 1)
    private String p2115DEspecifique;

    @Column(name = "P2115_E_OTRO", length = 1)
    private String p2115EOtro;

    @Column(name = "P2115_E_OTRO_DETALLE", length = 500)
    private String p2115EOtroDetalle;

    @Column(name = "P2115_E_GESTIONES", length = 1)
    private String p2115EGestiones;

    @Column(name = "P2115_E_SUFICIENTE", length = 1)
    private String p2115ESuficiente;

    @Column(name = "P2115_E_ESPECIFIQUE", length = 1)
    private String p2115EEspecifique;

    @Column(name = "P2115_NINGUNO", length = 1)
    private String p2115Ninguno;

    // P2116-P2117
    @Column(name = "P2116_PERSONAL_CONSUL", length = 1)
    private String p2116PersonalConsul;

    @Column(name = "P2117_MRE", length = 1)
    private String p2117Mre;

    @Column(name = "P2117_RENIEC", length = 1)
    private String p2117Reniec;

    @Column(name = "P2117_MIGRACIONES", length = 1)
    private String p2117Migraciones;

    @Column(name = "P2117_INTERPOL", length = 1)
    private String p2117Interpol;

    @Column(name = "P2117_INEI", length = 1)
    private String p2117Inei;

    @Column(name = "P2117_JNE", length = 1)
    private String p2117Jne;

    @Column(name = "P2117_ONPE", length = 1)
    private String p2117Onpe;

    @Column(name = "P2117_SUNARP", length = 1)
    private String p2117Sunarp;

    @Column(name = "P2117_PODER_JUDICIAL", length = 1)
    private String p2117PoderJudicial;

    @Column(name = "P2117_OTROS", length = 1)
    private String p2117Otros;

    @Column(name = "P2117_OTROS_DETALLE", length = 500)
    private String p2117OtrosDetalle;

    @Column(name = "P2117_NINGUNA", length = 1)
    private String p2117Ninguna;

    @Column(name = "P2117_NINGUNA_DETALLE", length = 500)
    private String p2117NingunaDetalle;

    // P2118
    @Column(name = "P2118_2023_ORIENTADO", length = 1)
    private String p21182023Orientado;

    @Column(name = "P2118_2023_ASISTIDO", length = 1)
    private String p21182023Asistido;

    @Column(name = "P2118_2023_NUM_CASOS")
    private Integer p21182023NumCasos;

    @Column(name = "P2118_2024_ORIENTADO", length = 1)
    private String p21182024Orientado;

    @Column(name = "P2118_2024_ASISTIDO", length = 1)
    private String p21182024Asistido;

    @Column(name = "P2118_2024_NUM_CASOS")
    private Integer p21182024NumCasos;

    @Column(name = "P2118_2025_ORIENTADO", length = 1)
    private String p21182025Orientado;

    @Column(name = "P2118_2025_ASISTIDO", length = 1)
    private String p21182025Asistido;

    @Column(name = "P2118_2025_NUM_CASOS")
    private Integer p21182025NumCasos;

    // P2119-P2123
    @Column(name = "P2119_OFICINA", length = 1)
    private String p2119Oficina;

    @Column(name = "P2119_FLOJOGRAMA", length = 1)
    private String p2119Flojograma;

    @Column(name = "P2119_NINGUNO", length = 1)
    private String p2119Ninguno;

    @Column(name = "P2120_PROTOCOLO", length = 1)
    private String p2120Protocolo;

    @Column(name = "P2121_VIOLENCIA", length = 1)
    private String p2121Violencia;

    @Column(name = "P2122_APOYO", length = 1)
    private String p2122Apoyo;

    @Column(name = "P2123_PRESENCIAL", length = 1)
    private String p2123Presencial;

    @Column(name = "P2123_TELEFONO", length = 1)
    private String p2123Telefono;

    @Column(name = "P2123_VIDEOLLAMA", length = 1)
    private String p2123Videollama;

    // P2124-P2125
    @Column(name = "P2124_ONG", length = 1)
    private String p2124Ong;

    @Column(name = "P2125_ENTIDAD_1", length = 200)
    private String p2125Entidad1;

    @Column(name = "P2125_ENTIDAD_2", length = 200)
    private String p2125Entidad2;

    @Column(name = "P2125_ENTIDAD_3", length = 200)
    private String p2125Entidad3;

    // P2126
    @Column(name = "P2126_PRESENCIAL", length = 1)
    private String p2126Presencial;

    @Column(name = "P2126_TELEFONICA", length = 1)
    private String p2126Telefonica;

    @Column(name = "P2126_WHATSAPP", length = 1)
    private String p2126Whatsapp;

    @Column(name = "P2126_VIRTUAL", length = 1)
    private String p2126Virtual;

    @Column(name = "P2126_FACEBOOK", length = 1)
    private String p2126Facebook;

    @Column(name = "P2126_CUENTA_X", length = 1)
    private String p2126CuentaX;

    @Column(name = "P2126_CORREO", length = 1)
    private String p2126Correo;

    // P2127
    @Column(name = "P2127_POLICIA", length = 1)
    private String p2127Policia;

    @Column(name = "P2127_MIN_PUBLICO", length = 1)
    private String p2127MinPublico;

    @Column(name = "P2127_INTERPOL", length = 1)
    private String p2127Interpol;

    @Column(name = "P2127_PODER_JUDICIAL", length = 1)
    private String p2127PoderJudicial;

    @Column(name = "P2127_ORGANIZACION", length = 1)
    private String p2127Organizacion;

    
    @Column(name = "P2127_NINGUNA", length = 1)
    private String p2127Ninguna;

    @Column(name = "P2127_OTROS", length = 1)
    private String p2127Otros;

    @Column(name = "P2127_OTROS_DETALLAR", length = 500)
    private String p2127OtrosDetallar;

    // P2128
    @Column(name = "P2128_A_LOGISTICA", length = 1)
    private String p2128ALogistica;

    @Column(name = "P2128_A_GESTIONES", length = 1)
    private String p2128AGestiones;

    @Column(name = "P2128_A_SUFICIENTE", length = 1)
    private String p2128ASuficiente;

    @Column(name = "P2128_A_ESPECIFIQUE", length = 500)
    private String p2128AEspecifique;

    @Column(name = "P2128_B_INFRA", length = 1)
    private String p2128BInfra;

    @Column(name = "P2128_B_GESTIONES", length = 1)
    private String p2128BGestiones;

    @Column(name = "P2128_B_SUFICIENTE", length = 1)
    private String p2128BSuficiente;

    @Column(name = "P2128_B_ESPECIFIQUE", length = 500)
    private String p2128BEspecifique;

    @Column(name = "P2128_C_PERSONAL", length = 1)
    private String p2128CPersonal;

    @Column(name = "P2128_C_GESTIONES", length = 1)
    private String p2128CGestiones;

    @Column(name = "P2128_C_SUFICIENTE", length = 1)
    private String p2128CSuficiente;

    @Column(name = "P2128_C_ESPECIFIQUE", length = 500)
    private String p2128CEspecifique;

    @Column(name = "P2128_D_PRESUPUESTO", length = 1)
    private String p2128DPresupuesto;

    @Column(name = "P2128_D_GESTIONES", length = 1)
    private String p2128DGestiones;

    @Column(name = "P2128_D_SUFICIENTE", length = 1)
    private String p2128DSuficiente;

    @Column(name = "P2128_D_ESPECIFIQUE", length = 500)
    private String p2128DEspecifique;

    @Column(name = "P2128_E_OTRO", length = 1)
    private String p2128EOtro;

    @Column(name = "P2128_E_OTRO_DETALLE", length = 300)
    private String p2128EOtroDetalle;

    @Column(name = "P2128_E_GESTIONES", length = 1)
    private String p2128EGestiones;

    @Column(name = "P2128_E_SUFICIENTE", length = 1)
    private String p2128ESuficiente;

    @Column(name = "P2128_E_ESPECIFIQUE", length = 500)
    private String p2128EEspecifique;

    @Column(name = "P2128_NINGUNO", length = 1)
    private String p2128Ninguno;

    // P2129-P2130
    @Column(name = "P2129_RECIBE_PERSONAL", length = 1)
    private String p2129RecibePersonal;

    @Column(name = "P2130_MRE", length = 1)
    private String p2130Mre;

    @Column(name = "P2130_RENIEC", length = 1)
    private String p2130Reniec;

    @Column(name = "P2130_MIGRACIONES", length = 1)
    private String p2130Migraciones;

    @Column(name = "P2130_INTERPOL", length = 1)
    private String p2130Interpol;

    @Column(name = "P2130_INEI", length = 1)
    private String p2130Inei;

    @Column(name = "P2130_JNE", length = 1)
    private String p2130Jne;

    @Column(name = "P2130_ONPE", length = 1)
    private String p2130Onpe;

    @Column(name = "P2130_SUNARP", length = 1)
    private String p2130Sunarp;

    @Column(name = "P2130_PODER_JUDICIAL", length = 1)
    private String p2130PoderJudicial;

    @Column(name = "P2130_OTROS", length = 1)
    private String p2130Otros;

    @Column(name = "P2130_OTROS_DETALLE", length = 1)
    private String p2130OtrosDetalle;

    @Column(name = "P2130_NINGUNA", length = 1)
    private String p2130Ninguna;

    @Column(name = "P2130_NINGUNA_DETALLE", length = 500)
    private String p2130NingunaDetalle;

    // P2131 - 2023
    @Column(name = "P2131_2023_NUM_ANIO")
    private Integer p21312023NumAnio;

    @Column(name = "P2131_2023_DETENCIONES")
    private Integer p21312023Detenciones;

    @Column(name = "P2131_2023_DEPORTACION")
    private Integer p21312023Deportacion;

    @Column(name = "P2131_2023_EXPULSION")
    private Integer p21312023Expulsion;

    // P2131 - 2024
    @Column(name = "P2131_2024_NUM_ANIO")
    private Integer p21312024NumAnio;

    @Column(name = "P2131_2024_DETENCIONES")
    private Integer p21312024Detenciones;

    @Column(name = "P2131_2024_DEPORTACION")
    private Integer p21312024Deportacion;

    @Column(name = "P2131_2024_EXPULSION")
    private Integer p21312024Expulsion;

    // P2131 - 2025
    @Column(name = "P2131_2025_NUM_ANIO")
    private Integer p21312025NumAnio;

    @Column(name = "P2131_2025_DETENCIONES")
    private Integer p21312025Detenciones;

    @Column(name = "P2131_2025_DEPORTACION")
    private Integer p21312025Deportacion;

    @Column(name = "P2131_2025_EXPULSION")
    private Integer p21312025Expulsion;

    // P2132-P2137
    @Column(name = "P2132_OFI_CONSULAR", length = 1)
    private String p2132OfiConsular;

    @Column(name = "P2132_FLUJOGRAMA", length = 1)
    private String p2132Flujograma;


      @Column(name = "P2132_NINGUNO", length = 1)
    private String p2132Ninguno;

    @Column(name = "P2133_PROTOCOLO", length = 1)
    private String p2133Protocolo;

    @Column(name = "P2134_EXISTEN", length = 1)
    private String p2134Existen;

    @Column(name = "P2135_OFRECEN", length = 1)
    private String p2135Ofrecen;

    @Column(name = "P2135_PRESENCIAL", length = 1)
    private String p2135Presencial;

    @Column(name = "P2135_LLAMADA", length = 1)
    private String p2135Llamada;

    @Column(name = "P2135_VIDEOLLA", length = 1)
    private String p2135Videolla;

    @Column(name = "P2136_COORDINA", length = 1)
    private String p2136Coordina;

    @Column(name = "P2137_PRESECNIAL", length = 1)
    private String p2137Presecnial;

    @Column(name = "P2137_TELEFONO", length = 1)
    private String p2137Telefono;

    @Column(name = "P2137_WHATSAPP", length = 1)
    private String p2137Whatsapp;

    @Column(name = "P2137_VIRTUAL", length = 1)
    private String p2137Virtual;

    @Column(name = "P2137_FACEBOOK", length = 1)
    private String p2137Facebook;

    @Column(name = "P2137_CUENTA_X", length = 1)
    private String p2137CuentaX;

    @Column(name = "P2137_CORREO", length = 1)
    private String p2137Correo;

    // P2138
    @Column(name = "P2138_POLICIA", length = 1)
    private String p2138Policia;

    @Column(name = "P2138_MIN_PUBLICO", length = 1)
    private String p2138MinPublico;

    @Column(name = "P2138_INTERPOL", length = 1)
    private String p2138Interpol;

    @Column(name = "P2138_PODER_JUDICIAL", length = 1)
    private String p2138PoderJudicial;

    @Column(name = "P2138_ORGANISMO", length = 1)
    private String p2138Organismo;

    @Column(name = "P2138_OTROS", length = 1)
    private String p2138Otros;

    @Column(name = "P2138_OTROS_DETALLE", length = 500)
    private String p2138OtrosDetalle;

    @Column(name = "P2138_NINGUNA", length = 1)
    private String p2138Ninguna;

    // P2139
    @Column(name = "P2139_A_LOGISTICA", length = 1)
    private String p2139ALogistica;

    @Column(name = "P2139_A_GESTIONES", length = 1)
    private String p2139AGestiones;

    @Column(name = "P2139_A_SUFICIENTE", length = 1)
    private String p2139ASuficiente;

    @Column(name = "P2139_A_ESPECIFIQUE", length = 500)
    private String p2139AEspecifique;

    @Column(name = "P2139_B_INFRA", length = 1)
    private String p2139BInfra;

    @Column(name = "P2139_B_GESTIONES", length = 1)
    private String p2139BGestiones;

    @Column(name = "P2139_B_SUFICIENTE", length = 1)
    private String p2139BSuficiente;

    @Column(name = "P2139_B_ESPECIFIQUE", length = 500)
    private String p2139BEspecifique;

    @Column(name = "P2139_C_PERSONAL", length = 1)
    private String p2139CPersonal;

    @Column(name = "P2139_C_GESTIONES", length = 1)
    private String p2139CGestiones;

    @Column(name = "P2139_C_SUFICIENTE", length = 1)
    private String p2139CSuficiente;

    @Column(name = "P2139_C_ESPECIFIQUE", length = 500)
    private String p2139CEspecifique;

    @Column(name = "P2139_D_PRESUPUESTO", length = 1)
    private String p2139DPresupuesto;

    @Column(name = "P2139_D_GESTIONES", length = 1)
    private String p2139DGestiones;

    @Column(name = "P2139_D_SUFICIENTE", length = 1)
    private String p2139DSuficiente;

    @Column(name = "P2139_D_ESPECIFIQUE", length = 500)
    private String p2139DEspecifique;

    @Column(name = "P2139_E_OTRO", length = 1)
    private String p2139EOtro;

    @Column(name = "P2139_E_OTRO_DETALLE", length = 500)
    private String p2139EOtroDetalle;

    @Column(name = "P2139_E_GESTIONES", length = 1)
    private String p2139EGestiones;

    @Column(name = "P2139_E_SUFICIENTE", length = 1)
    private String p2139ESuficiente;

    @Column(name = "P2139_E_ESPECIFIQUE", length = 500)
    private String p2139EEspecifique;

    @Column(name = "P2139_NINGUNO", length = 1)
    private String p2139Ninguno;

    // P2140-P2141
    @Column(name = "P2140_RECIBE", length = 1)
    private String p2140Recibe;

    @Column(name = "P2141_MRE", length = 1)
    private String p2141Mre;

    @Column(name = "P2141_RENIEC", length = 1)
    private String p2141Reniec;

    @Column(name = "P2141_MIGRACIONES", length = 1)
    private String p2141Migraciones;

    @Column(name = "P2141_INTERPOL", length = 1)
    private String p2141Interpol;

    @Column(name = "P2141_INEI", length = 1)
    private String p2141Inei;

    @Column(name = "P2141_JNE", length = 1)
    private String p2141Jne;

    @Column(name = "P2141_ONPE", length = 1)
    private String p2141Onpe;

    @Column(name = "P2141_SUNARP", length = 1)
    private String p2141Sunarp;

    @Column(name = "P2141_PODER_JUDICIAL", length = 1)
    private String p2141PoderJudicial;

    @Column(name = "P2141_OTRO", length = 1)
    private String p2141Otro;

    @Column(name = "P2141_OTRO_DETALLE", length = 500)
    private String p2141OtroDetalle;

    @Column(name = "P2141_NINGUNO", length = 1)
    private String p2141Ninguno;

    // P221-P223
    @Column(name = "P221_ORGANO", length = 1)
    private String p221Organo;

    @Column(name = "P221_ESPECIFIQUE", length = 1)
    private String p221Especifique;

    @Column(name = "P222_PORCENTAJE")
    private BigDecimal p222Porcentaje;

    @Column(name = "P223_DESASTRES_2023")
    private Integer p223Desastres2023;

    @Column(name = "P223_DESASTRES_2024")
    private Integer p223Desastres2024;

    @Column(name = "P223_DESASTRES_2025")
    private Integer p223Desastres2025;

    @Column(name = "P223_SOCIALES_2023")
    private Integer p223Sociales2023;

    @Column(name = "P223_SOCIALES_2024")
    private Integer p223Sociales2024;

    @Column(name = "P223_SOCIALES_2025")
    private Integer p223Sociales2025;

    @Column(name = "P223_ACCIDENTES_2023")
    private Integer p223Accidentes2023;

    @Column(name = "P223_ACCIDENTES_2024")
    private Integer p223Accidentes2024;

    @Column(name = "P223_ACCIDENTES_2025")
    private Integer p223Accidentes2025;

    @Column(name = "P223_REPATRIACIONES_2023")
    private Integer p223Repatriaciones2023;

    @Column(name = "P223_REPATRIACIONES_2024")
    private Integer p223Repatriaciones2024;

    @Column(name = "P223_REPATRIACIONES_2025")
    private Integer p223Repatriaciones2025;

    @Column(name = "P223_FALLECIDOS_2023")
    private Integer p223Fallecidos2023;

    @Column(name = "P223_FALLECIDOS_2024")
    private Integer p223Fallecidos2024;

    @Column(name = "P223_FALLECIDOS_2025")
    private Integer p223Fallecidos2025;

    // P224 - 2023
    @Column(name = "P224_2023_NUM_CASOS")
    private Integer p2242023NumCasos;

    @Column(name = "P224_2023_MATERIAL")
    private Integer p2242023Material;

    @Column(name = "P224_2023_ECONOMICA")
    private Integer p2242023Economica;

    // P224 - 2024
    @Column(name = "P224_2024_NUM_CASOS")
    private Integer p2242024NumCasos;

    @Column(name = "P224_2024_MATERIAL")
    private Integer p2242024Material;

    @Column(name = "P224_2024_ECONOMICA")
    private Integer p2242024Economica;

    // P224 - 2025
    @Column(name = "P224_2025_NUM_CASOS")
    private Integer p2242025NumCasos;

    @Column(name = "P224_2025_MATERIAL")
    private Integer p2242025Material;

    @Column(name = "P224_2025_ECONOMICA")
    private Integer p2242025Economica;

    // P225 - 2023
    @Column(name = "P225_2023_NUM_CASOS")
    private Integer p2252023NumCasos;

    @Column(name = "P225_2023_MATERIAL")
    private Integer p2252023Material;

    @Column(name = "P225_2023_ECONOMICA")
    private Integer p2252023Economica;

    // P225 - 2024
    @Column(name = "P225_2024_NUM_CASOS")
    private Integer p2252024NumCasos;

    @Column(name = "P225_2024_MATERIAL")
    private Integer p2252024Material;

    @Column(name = "P225_2024_ECONOMICA")
    private Integer p2252024Economica;

    // P225 - 2025
    @Column(name = "P225_2025_NUM_CASOS")
    private Integer p2252025NumCasos;

    @Column(name = "P225_2025_MATERIAL")
    private Integer p2252025Material;

    @Column(name = "P225_2025_ECONOMICA")
    private Integer p2252025Economica;

    // P226 - 2023
    @Column(name = "P226_2023_NUM_CASOS")
    private Integer p2262023NumCasos;

    @Column(name = "P226_2023_MATERIAL")
    private Integer p2262023Material;

    @Column(name = "P226_2023_ECONOMICA")
    private Integer p2262023Economica;

    // P226 - 2024
    @Column(name = "P226_2024_NUM_CASOS")
    private Integer p2262024NumCasos;

    @Column(name = "P226_2024_MATERIAL")
    private Integer p2262024Material;

    @Column(name = "P226_2024_ECONOMICA")
    private Integer p2262024Economica;

    // P226 - 2025
    @Column(name = "P226_2025_NUM_CASOS")
    private Integer p2262025NumCasos;

    @Column(name = "P226_2025_MATERIAL")
    private Integer p2262025Material;

    @Column(name = "P226_2025_ECONOMICA")
    private Integer p2262025Economica;

    // P227 - 2023
    @Column(name = "P227_PRIVADAS_2023")
    private Integer p227Privadas2023;

    @Column(name = "P227_HOSPITALIZADA_2023")
    private Integer p227Hospitalizada2023;

    @Column(name = "P227_ESTADO_2023")
    private Integer p227Estado2023;

    // P227 - 2024
    @Column(name = "P227_PRIVADAS_2024")
    private Integer p227Privadas2024;

    @Column(name = "P227_HOSPITALIZADA_2024")
    private Integer p227Hospitalizada2024;

    @Column(name = "P227_ESTADO_2024")
    private Integer p227Estado2024;

    // P227 - 2025
    @Column(name = "P227_PRIVADAS_2025")
    private Integer p227Privadas2025;

    @Column(name = "P227_HOSPITALIZADA_2025")
    private Integer p227Hospitalizada2025;

    @Column(name = "P227_ESTADO_2025")
    private Integer p227Estado2025;

    // P228 - 2023
    @Column(name = "P228_2023_DETENIDOS")
    private Integer p2282023Detenidos;

    @Column(name = "P228_2023_HOSPITALI")
    private Integer p2282023Hospitali;

    @Column(name = "P228_2023_MUJERES")
    private Integer p2282023Mujeres;

    @Column(name = "P228_2023_ESTADO")
    private Integer p2282023Estado;

    // P228 - 2024
    @Column(name = "P228_2024_DETENIDOS")
    private Integer p2282024Detenidos;

    @Column(name = "P228_2024_HOSPITALI")
    private Integer p2282024Hospitali;

    @Column(name = "P228_2024_MUJERES")
    private Integer p2282024Mujeres;

    @Column(name = "P228_2024_ESTADO")
    private Integer p2282024Estado;

    // P228 - 2025
    @Column(name = "P228_2025_DETENIDOS")
    private Integer p2282025Detenidos;

    @Column(name = "P228_2025_HOSPITALI")
    private Integer p2282025Hospitali;

    @Column(name = "P228_2025_MUJERES")
    private Integer p2282025Mujeres;

    @Column(name = "P228_2025_ESTADO")
    private Integer p2282025Estado;

    // P229 - 2023
    @Column(name = "P229_2023_UBICADOS")
    private Integer p2292023Ubicados;

    @Column(name = "P229_2023_REPATRIADOS")
    private Integer p2292023Repatriados;

    @Column(name = "P229_2023_EXTRADICIONES")
    private Integer p2292023Extradiciones;

    @Column(name = "P229_2023_RESTOS")
    private Integer p2292023Restos;

    // P229 - 2024
    @Column(name = "P229_2024_UBICADOS")
    private Integer p2292024Ubicados;

    @Column(name = "P229_2024_REPATRIADOS")
    private Integer p2292024Repatriados;

    @Column(name = "P229_2024_EXTRADICIONES")
    private Integer p2292024Extradiciones;

    @Column(name = "P229_2024_RESTOS")
    private Integer p2292024Restos;

    // P229 - 2025
    @Column(name = "P229_2025_UBICADOS")
    private Integer p2292025Ubicados;

    @Column(name = "P229_2025_REPATRIADOS")
    private Integer p2292025Repatriados;

    @Column(name = "P229_2025_EXTRADICIONES")
    private Integer p2292025Extradiciones;

    @Column(name = "P229_2025_RESTOS")
    private Integer p2292025Restos;

    // P2210
    @Column(name = "P2210_A_LOGISTICA", length = 1)
    private String p2210ALogistica;

    @Column(name = "P2210_A_GESTIONES", length = 1)
    private String p2210AGestiones;

    @Column(name = "P2210_A_SUFICIENTE", length = 1)
    private String p2210ASuficiente;

    @Column(name = "P2210_A_ESPECIFIQUE", length = 500)
    private String p2210AEspecifique;

    @Column(name = "P2210_B_INFRA", length = 1)
    private String p2210BInfra;

    @Column(name = "P2210_B_GESTIONES", length = 1)
    private String p2210BGestiones;

    @Column(name = "P2210_B_SUFICIENTE", length = 1)
    private String p2210BSuficiente;

    @Column(name = "P2210_B_ESPECIFIQUE", length = 500)
    private String p2210BEspecifique;

    @Column(name = "P2210_C_PERSONAL", length = 1)
    private String p2210CPersonal;

    @Column(name = "P2210_C_GESTIONES", length = 1)
    private String p2210CGestiones;

    @Column(name = "P2210_C_SUFICIENTE", length = 1)
    private String p2210CSuficiente;

    @Column(name = "P2210_C_ESPECIFIQUE", length = 500)
    private String p2210CEspecifique;

    @Column(name = "P2210_D_PRESUPUESTO", length = 1)
    private String p2210DPresupuesto;

    @Column(name = "P2210_D_GESTIONES", length = 1)
    private String p2210DGestiones;

    @Column(name = "P2210_D_SUFICIENTE", length = 1)
    private String p2210DSuficiente;

    @Column(name = "P2210_D_ESPECIFIQUE", length = 500)
    private String p2210DEspecifique;

    @Column(name = "P2210_E_OTRO", length = 1)
    private String p2210EOtro;

    @Column(name = "P2210_E_OTRO_DETALLE", length = 500)
    private String p2210EOtroDetalle;

    @Column(name = "P2210_E_GESTIONES", length = 1)
    private String p2210EGestiones;

    @Column(name = "P2210_E_SUFICIENTE", length = 1)
    private String p2210ESuficiente;

    @Column(name = "P2210_E_ESPECIFIQUE", length = 500)
    private String p2210EEspecifique;

    @Column(name = "P2210_NINGUNO", length = 1)
    private String p2210Ninguno;

    // P2211-P2212
    @Column(name = "P2211_RECIBE", length = 1)
    private String p2211Recibe;

    @Column(name = "P2212_MRE", length = 1)
    private String p2212Mre;

    @Column(name = "P2212_RENIEC", length = 1)
    private String p2212Reniec;

    @Column(name = "P2212_MIGRACIONES", length = 1)
    private String p2212Migraciones;

    @Column(name = "P2212_INTERPOL", length = 1)
    private String p2212Interpol;

    @Column(name = "P2212_INEI", length = 1)
    private String p2212Inei;

    @Column(name = "P2212_JNE", length = 1)
    private String p2212Jne;

    @Column(name = "P2212_ONPE", length = 1)
    private String p2212Onpe;

    @Column(name = "P2212_SUNARP", length = 1)
    private String p2212Sunarp;

    @Column(name = "P2212_PODER_JUDICIAL", length = 1)
    private String p2212PoderJudicial;

    @Column(name = "P2212_OTROS", length = 1)
    private String p2212Otros;

    @Column(name = "P2212_OTROS_DETALLE", length = 500)
    private String p2212OtrosDetalle;

    @Column(name = "P2212_NINGUNO", length = 1)
    private String p2212Ninguno;

    @Column(name = "P2212_NINGUNO_DETALLE", length = 1)
    private String p2212NingunoDetalle;

    public Long getIdFichaS2() {
        return idFichaS2;
    }

    public void setIdFichaS2(Long idFichaS2) {
        this.idFichaS2 = idFichaS2;
    }

    public Long getIdFicha() {
        return idFicha;
    }

    public void setIdFicha(Long idFicha) {
        this.idFicha = idFicha;
    }

    public String getUsuRegistro() {
        return usuRegistro;
    }

    public void setUsuRegistro(String usuRegistro) {
        this.usuRegistro = usuRegistro;
    }

    public Date getFchRegistro() {
        return fchRegistro;
    }

    public void setFchRegistro(Date fchRegistro) {
        this.fchRegistro = fchRegistro;
    }

    public String getUsuActualiza() {
        return usuActualiza;
    }

    public void setUsuActualiza(String usuActualiza) {
        this.usuActualiza = usuActualiza;
    }

    public Date getFchActualiza() {
        return fchActualiza;
    }

    public void setFchActualiza(Date fchActualiza) {
        this.fchActualiza = fchActualiza;
    }

    public String getEstado_s2() {
        return estado_s2;
    }

    public void setEstado_s2(String estado_s2) {
        this.estado_s2 = estado_s2;
    }

    public String getUsuValida() {
        return usuValida;
    }

    public void setUsuValida(String usuValida) {
        this.usuValida = usuValida;
    }

    public LocalDate getFchValida() {
        return fchValida;
    }

    public void setFchValida(LocalDate fchValida) {
        this.fchValida = fchValida;
    }

    public String getValida_s2() {
        return valida_s2;
    }

    public void setValida_s2(String valida_s2) {
        this.valida_s2 = valida_s2;
    }

    public String getP211OfiConsular() {
        return p211OfiConsular;
    }

    public void setP211OfiConsular(String p211OfiConsular) {
        this.p211OfiConsular = p211OfiConsular;
    }

    public Integer getP212NumAsesor() {
        return p212NumAsesor;
    }

    public void setP212NumAsesor(Integer p212NumAsesor) {
        this.p212NumAsesor = p212NumAsesor;
    }

    public String getP213Peruana() {
        return p213Peruana;
    }

    public void setP213Peruana(String p213Peruana) {
        this.p213Peruana = p213Peruana;
    }

    public Integer getP213PeruanaCantidad() {
        return p213PeruanaCantidad;
    }

    public void setP213PeruanaCantidad(Integer p213PeruanaCantidad) {
        this.p213PeruanaCantidad = p213PeruanaCantidad;
    }

    public String getP213Extranjera() {
        return p213Extranjera;
    }

    public void setP213Extranjera(String p213Extranjera) {
        this.p213Extranjera = p213Extranjera;
    }

    public Integer getP213ExtranjeraCantidad() {
        return p213ExtranjeraCantidad;
    }

    public void setP213ExtranjeraCantidad(Integer p213ExtranjeraCantidad) {
        this.p213ExtranjeraCantidad = p213ExtranjeraCantidad;
    }

    public String getP213ExtranjeraDetalle() {
        return p213ExtranjeraDetalle;
    }

    public void setP213ExtranjeraDetalle(String p213ExtranjeraDetalle) {
        this.p213ExtranjeraDetalle = p213ExtranjeraDetalle;
    }

    public String getP214Labor() {
        return p214Labor;
    }

    public void setP214Labor(String p214Labor) {
        this.p214Labor = p214Labor;
    }

    public String getP215OrganoLinea() {
        return p215OrganoLinea;
    }

    public void setP215OrganoLinea(String p215OrganoLinea) {
        this.p215OrganoLinea = p215OrganoLinea;
    }

    public String getP215Especifique() {
        return p215Especifique;
    }

    public void setP215Especifique(String p215Especifique) {
        this.p215Especifique = p215Especifique;
    }

    public String getP217Protocolo() {
        return p217Protocolo;
    }

    public void setP217Protocolo(String p217Protocolo) {
        this.p217Protocolo = p217Protocolo;
    }

    public String getP217Flujograma() {
        return p217Flujograma;
    }

    public void setP217Flujograma(String p217Flujograma) {
        this.p217Flujograma = p217Flujograma;
    }

    public String getP217Ninguna() {
        return p217Ninguna;
    }

    public void setP217Ninguna(String p217Ninguna) {
        this.p217Ninguna = p217Ninguna;
    }

    public String getP218Protocolo() {
        return p218Protocolo;
    }

    public void setP218Protocolo(String p218Protocolo) {
        this.p218Protocolo = p218Protocolo;
    }

    public String getP219Emergencia() {
        return p219Emergencia;
    }

    public void setP219Emergencia(String p219Emergencia) {
        this.p219Emergencia = p219Emergencia;
    }

    public Integer getP22023Hombre() {
        return p22023Hombre;
    }

    public void setP22023Hombre(Integer p22023Hombre) {
        this.p22023Hombre = p22023Hombre;
    }

    public Integer getP22023HombreDisca() {
        return p22023HombreDisca;
    }

    public void setP22023HombreDisca(Integer p22023HombreDisca) {
        this.p22023HombreDisca = p22023HombreDisca;
    }

    public Integer getP22023Mujer() {
        return p22023Mujer;
    }

    public void setP22023Mujer(Integer p22023Mujer) {
        this.p22023Mujer = p22023Mujer;
    }

    public Integer getP22023MujerDisca() {
        return p22023MujerDisca;
    }

    public void setP22023MujerDisca(Integer p22023MujerDisca) {
        this.p22023MujerDisca = p22023MujerDisca;
    }

    public String getP22023Civil() {
        return p22023Civil;
    }

    public void setP22023Civil(String p22023Civil) {
        this.p22023Civil = p22023Civil;
    }

    public Integer getP22023CivilNum() {
        return p22023CivilNum;
    }

    public void setP22023CivilNum(Integer p22023CivilNum) {
        this.p22023CivilNum = p22023CivilNum;
    }

    public String getP22023Penal() {
        return p22023Penal;
    }

    public void setP22023Penal(String p22023Penal) {
        this.p22023Penal = p22023Penal;
    }

    public Integer getP22023PenalNum() {
        return p22023PenalNum;
    }

    public void setP22023PenalNum(Integer p22023PenalNum) {
        this.p22023PenalNum = p22023PenalNum;
    }

    public String getP22023Familia() {
        return p22023Familia;
    }

    public void setP22023Familia(String p22023Familia) {
        this.p22023Familia = p22023Familia;
    }

    public Integer getP22023FamiliaNum() {
        return p22023FamiliaNum;
    }

    public void setP22023FamiliaNum(Integer p22023FamiliaNum) {
        this.p22023FamiliaNum = p22023FamiliaNum;
    }

    public String getP22023Laboral() {
        return p22023Laboral;
    }

    public void setP22023Laboral(String p22023Laboral) {
        this.p22023Laboral = p22023Laboral;
    }

    public Integer getP22023LaboralNum() {
        return p22023LaboralNum;
    }

    public void setP22023LaboralNum(Integer p22023LaboralNum) {
        this.p22023LaboralNum = p22023LaboralNum;
    }

    public String getP22023Migratoria() {
        return p22023Migratoria;
    }

    public void setP22023Migratoria(String p22023Migratoria) {
        this.p22023Migratoria = p22023Migratoria;
    }

    public Integer getP22023MigratoriaNum() {
        return p22023MigratoriaNum;
    }

    public void setP22023MigratoriaNum(Integer p22023MigratoriaNum) {
        this.p22023MigratoriaNum = p22023MigratoriaNum;
    }

    public Integer getP22023MayorHombre() {
        return p22023MayorHombre;
    }

    public void setP22023MayorHombre(Integer p22023MayorHombre) {
        this.p22023MayorHombre = p22023MayorHombre;
    }

    public Integer getP22023MayorHombreDisca() {
        return p22023MayorHombreDisca;
    }

    public void setP22023MayorHombreDisca(Integer p22023MayorHombreDisca) {
        this.p22023MayorHombreDisca = p22023MayorHombreDisca;
    }

    public Integer getP22023MayorMujer() {
        return p22023MayorMujer;
    }

    public void setP22023MayorMujer(Integer p22023MayorMujer) {
        this.p22023MayorMujer = p22023MayorMujer;
    }

    public Integer getP22023MayorMujerDisca() {
        return p22023MayorMujerDisca;
    }

    public void setP22023MayorMujerDisca(Integer p22023MayorMujerDisca) {
        this.p22023MayorMujerDisca = p22023MayorMujerDisca;
    }

    public Integer getP22023MenorHombre() {
        return p22023MenorHombre;
    }

    public void setP22023MenorHombre(Integer p22023MenorHombre) {
        this.p22023MenorHombre = p22023MenorHombre;
    }

    public Integer getP22023MenorHombreDisca() {
        return p22023MenorHombreDisca;
    }

    public void setP22023MenorHombreDisca(Integer p22023MenorHombreDisca) {
        this.p22023MenorHombreDisca = p22023MenorHombreDisca;
    }

    public Integer getP22023MenorMujer() {
        return p22023MenorMujer;
    }

    public void setP22023MenorMujer(Integer p22023MenorMujer) {
        this.p22023MenorMujer = p22023MenorMujer;
    }

    public Integer getP22023MenorMujerDisca() {
        return p22023MenorMujerDisca;
    }

    public void setP22023MenorMujerDisca(Integer p22023MenorMujerDisca) {
        this.p22023MenorMujerDisca = p22023MenorMujerDisca;
    }

    public Integer getP22023Notificacion() {
        return p22023Notificacion;
    }

    public void setP22023Notificacion(Integer p22023Notificacion) {
        this.p22023Notificacion = p22023Notificacion;
    }

    public Integer getP22023DefensaOficio() {
        return p22023DefensaOficio;
    }

    public void setP22023DefensaOficio(Integer p22023DefensaOficio) {
        this.p22023DefensaOficio = p22023DefensaOficio;
    }

    public Integer getP22023Patrocinio() {
        return p22023Patrocinio;
    }

    public void setP22023Patrocinio(Integer p22023Patrocinio) {
        this.p22023Patrocinio = p22023Patrocinio;
    }

    public Integer getP22023Gestiones() {
        return p22023Gestiones;
    }

    public void setP22023Gestiones(Integer p22023Gestiones) {
        this.p22023Gestiones = p22023Gestiones;
    }

    public Integer getP22023Coordinacion() {
        return p22023Coordinacion;
    }

    public void setP22023Coordinacion(Integer p22023Coordinacion) {
        this.p22023Coordinacion = p22023Coordinacion;
    }

    public Integer getP22023Interprete() {
        return p22023Interprete;
    }

    public void setP22023Interprete(Integer p22023Interprete) {
        this.p22023Interprete = p22023Interprete;
    }

    public Integer getP22023Senias() {
        return p22023Senias;
    }

    public void setP22023Senias(Integer p22023Senias) {
        this.p22023Senias = p22023Senias;
    }

    public Integer getP22023Otros() {
        return p22023Otros;
    }

    public void setP22023Otros(Integer p22023Otros) {
        this.p22023Otros = p22023Otros;
    }

    public Integer getP22024Hombre() {
        return p22024Hombre;
    }

    public void setP22024Hombre(Integer p22024Hombre) {
        this.p22024Hombre = p22024Hombre;
    }

    public Integer getP22024HombreDisca() {
        return p22024HombreDisca;
    }

    public void setP22024HombreDisca(Integer p22024HombreDisca) {
        this.p22024HombreDisca = p22024HombreDisca;
    }

    public Integer getP22024Mujer() {
        return p22024Mujer;
    }

    public void setP22024Mujer(Integer p22024Mujer) {
        this.p22024Mujer = p22024Mujer;
    }

    public Integer getP22024MujerDisca() {
        return p22024MujerDisca;
    }

    public void setP22024MujerDisca(Integer p22024MujerDisca) {
        this.p22024MujerDisca = p22024MujerDisca;
    }

    public String getP22024Civil() {
        return p22024Civil;
    }

    public void setP22024Civil(String p22024Civil) {
        this.p22024Civil = p22024Civil;
    }

    public Integer getP22024CivilNum() {
        return p22024CivilNum;
    }

    public void setP22024CivilNum(Integer p22024CivilNum) {
        this.p22024CivilNum = p22024CivilNum;
    }

    public String getP22024Penal() {
        return p22024Penal;
    }

    public void setP22024Penal(String p22024Penal) {
        this.p22024Penal = p22024Penal;
    }

    public Integer getP22024PenalNum() {
        return p22024PenalNum;
    }

    public void setP22024PenalNum(Integer p22024PenalNum) {
        this.p22024PenalNum = p22024PenalNum;
    }

    public String getP22024Familia() {
        return p22024Familia;
    }

    public void setP22024Familia(String p22024Familia) {
        this.p22024Familia = p22024Familia;
    }

    public Integer getP22024FamiliaNum() {
        return p22024FamiliaNum;
    }

    public void setP22024FamiliaNum(Integer p22024FamiliaNum) {
        this.p22024FamiliaNum = p22024FamiliaNum;
    }

    public String getP22024Laboral() {
        return p22024Laboral;
    }

    public void setP22024Laboral(String p22024Laboral) {
        this.p22024Laboral = p22024Laboral;
    }

    public Integer getP22024LaboralNum() {
        return p22024LaboralNum;
    }

    public void setP22024LaboralNum(Integer p22024LaboralNum) {
        this.p22024LaboralNum = p22024LaboralNum;
    }

    public String getP22024Migratoria() {
        return p22024Migratoria;
    }

    public void setP22024Migratoria(String p22024Migratoria) {
        this.p22024Migratoria = p22024Migratoria;
    }

    public Integer getP22024MigratoriaNum() {
        return p22024MigratoriaNum;
    }

    public void setP22024MigratoriaNum(Integer p22024MigratoriaNum) {
        this.p22024MigratoriaNum = p22024MigratoriaNum;
    }

    public Integer getP22024MayorHombre() {
        return p22024MayorHombre;
    }

    public void setP22024MayorHombre(Integer p22024MayorHombre) {
        this.p22024MayorHombre = p22024MayorHombre;
    }

    public Integer getP22024MayorHombreDisca() {
        return p22024MayorHombreDisca;
    }

    public void setP22024MayorHombreDisca(Integer p22024MayorHombreDisca) {
        this.p22024MayorHombreDisca = p22024MayorHombreDisca;
    }

    public Integer getP22024MayorMujer() {
        return p22024MayorMujer;
    }

    public void setP22024MayorMujer(Integer p22024MayorMujer) {
        this.p22024MayorMujer = p22024MayorMujer;
    }

    public Integer getP22024MayorMujerDisca() {
        return p22024MayorMujerDisca;
    }

    public void setP22024MayorMujerDisca(Integer p22024MayorMujerDisca) {
        this.p22024MayorMujerDisca = p22024MayorMujerDisca;
    }

    public Integer getP22024MenorHombre() {
        return p22024MenorHombre;
    }

    public void setP22024MenorHombre(Integer p22024MenorHombre) {
        this.p22024MenorHombre = p22024MenorHombre;
    }

    public Integer getP22024MenorHombreDisca() {
        return p22024MenorHombreDisca;
    }

    public void setP22024MenorHombreDisca(Integer p22024MenorHombreDisca) {
        this.p22024MenorHombreDisca = p22024MenorHombreDisca;
    }

    public Integer getP22024MenorMujer() {
        return p22024MenorMujer;
    }

    public void setP22024MenorMujer(Integer p22024MenorMujer) {
        this.p22024MenorMujer = p22024MenorMujer;
    }

    public Integer getP22024MenorMujerDisca() {
        return p22024MenorMujerDisca;
    }

    public void setP22024MenorMujerDisca(Integer p22024MenorMujerDisca) {
        this.p22024MenorMujerDisca = p22024MenorMujerDisca;
    }

    public Integer getP22024Notificacion() {
        return p22024Notificacion;
    }

    public void setP22024Notificacion(Integer p22024Notificacion) {
        this.p22024Notificacion = p22024Notificacion;
    }

    public Integer getP22024DefensaOficio() {
        return p22024DefensaOficio;
    }

    public void setP22024DefensaOficio(Integer p22024DefensaOficio) {
        this.p22024DefensaOficio = p22024DefensaOficio;
    }

    public Integer getP22024Patrocinio() {
        return p22024Patrocinio;
    }

    public void setP22024Patrocinio(Integer p22024Patrocinio) {
        this.p22024Patrocinio = p22024Patrocinio;
    }

    public Integer getP22024Gestiones() {
        return p22024Gestiones;
    }

    public void setP22024Gestiones(Integer p22024Gestiones) {
        this.p22024Gestiones = p22024Gestiones;
    }

    public Integer getP22024Coordinacion() {
        return p22024Coordinacion;
    }

    public void setP22024Coordinacion(Integer p22024Coordinacion) {
        this.p22024Coordinacion = p22024Coordinacion;
    }

    public Integer getP22024Interprete() {
        return p22024Interprete;
    }

    public void setP22024Interprete(Integer p22024Interprete) {
        this.p22024Interprete = p22024Interprete;
    }

    public Integer getP22024Senias() {
        return p22024Senias;
    }

    public void setP22024Senias(Integer p22024Senias) {
        this.p22024Senias = p22024Senias;
    }

    public Integer getP22024Otros() {
        return p22024Otros;
    }

    public void setP22024Otros(Integer p22024Otros) {
        this.p22024Otros = p22024Otros;
    }

    public Integer getP22025Hombre() {
        return p22025Hombre;
    }

    public void setP22025Hombre(Integer p22025Hombre) {
        this.p22025Hombre = p22025Hombre;
    }

    public Integer getP22025HombreDisca() {
        return p22025HombreDisca;
    }

    public void setP22025HombreDisca(Integer p22025HombreDisca) {
        this.p22025HombreDisca = p22025HombreDisca;
    }

    public Integer getP22025Mujer() {
        return p22025Mujer;
    }

    public void setP22025Mujer(Integer p22025Mujer) {
        this.p22025Mujer = p22025Mujer;
    }

    public Integer getP22025MujerDisca() {
        return p22025MujerDisca;
    }

    public void setP22025MujerDisca(Integer p22025MujerDisca) {
        this.p22025MujerDisca = p22025MujerDisca;
    }

    public String getP22025Civil() {
        return p22025Civil;
    }

    public void setP22025Civil(String p22025Civil) {
        this.p22025Civil = p22025Civil;
    }

    public Integer getP22025CivilNum() {
        return p22025CivilNum;
    }

    public void setP22025CivilNum(Integer p22025CivilNum) {
        this.p22025CivilNum = p22025CivilNum;
    }

    public String getP22025Penal() {
        return p22025Penal;
    }

    public void setP22025Penal(String p22025Penal) {
        this.p22025Penal = p22025Penal;
    }

    public Integer getP22025PenalNum() {
        return p22025PenalNum;
    }

    public void setP22025PenalNum(Integer p22025PenalNum) {
        this.p22025PenalNum = p22025PenalNum;
    }

    public String getP22025Familia() {
        return p22025Familia;
    }

    public void setP22025Familia(String p22025Familia) {
        this.p22025Familia = p22025Familia;
    }

    public Integer getP22025FamiliaNum() {
        return p22025FamiliaNum;
    }

    public void setP22025FamiliaNum(Integer p22025FamiliaNum) {
        this.p22025FamiliaNum = p22025FamiliaNum;
    }

    public String getP22025Laboral() {
        return p22025Laboral;
    }

    public void setP22025Laboral(String p22025Laboral) {
        this.p22025Laboral = p22025Laboral;
    }

    public Integer getP22025LaboralNum() {
        return p22025LaboralNum;
    }

    public void setP22025LaboralNum(Integer p22025LaboralNum) {
        this.p22025LaboralNum = p22025LaboralNum;
    }

    public String getP22025Migratoria() {
        return p22025Migratoria;
    }

    public void setP22025Migratoria(String p22025Migratoria) {
        this.p22025Migratoria = p22025Migratoria;
    }

    public Integer getP22025MigratoriaNum() {
        return p22025MigratoriaNum;
    }

    public void setP22025MigratoriaNum(Integer p22025MigratoriaNum) {
        this.p22025MigratoriaNum = p22025MigratoriaNum;
    }

    public Integer getP22025MayorHombre() {
        return p22025MayorHombre;
    }

    public void setP22025MayorHombre(Integer p22025MayorHombre) {
        this.p22025MayorHombre = p22025MayorHombre;
    }

    public Integer getP22025MayorHombreDisca() {
        return p22025MayorHombreDisca;
    }

    public void setP22025MayorHombreDisca(Integer p22025MayorHombreDisca) {
        this.p22025MayorHombreDisca = p22025MayorHombreDisca;
    }

    public Integer getP22025MayorMujer() {
        return p22025MayorMujer;
    }

    public void setP22025MayorMujer(Integer p22025MayorMujer) {
        this.p22025MayorMujer = p22025MayorMujer;
    }

    public Integer getP22025MayorMujerDisca() {
        return p22025MayorMujerDisca;
    }

    public void setP22025MayorMujerDisca(Integer p22025MayorMujerDisca) {
        this.p22025MayorMujerDisca = p22025MayorMujerDisca;
    }

    public Integer getP22025MenorHombre() {
        return p22025MenorHombre;
    }

    public void setP22025MenorHombre(Integer p22025MenorHombre) {
        this.p22025MenorHombre = p22025MenorHombre;
    }

    public Integer getP22025MenorHombreDisca() {
        return p22025MenorHombreDisca;
    }

    public void setP22025MenorHombreDisca(Integer p22025MenorHombreDisca) {
        this.p22025MenorHombreDisca = p22025MenorHombreDisca;
    }

    public Integer getP22025MenorMujer() {
        return p22025MenorMujer;
    }

    public void setP22025MenorMujer(Integer p22025MenorMujer) {
        this.p22025MenorMujer = p22025MenorMujer;
    }

    public Integer getP22025MenorMujerDisca() {
        return p22025MenorMujerDisca;
    }

    public void setP22025MenorMujerDisca(Integer p22025MenorMujerDisca) {
        this.p22025MenorMujerDisca = p22025MenorMujerDisca;
    }

    public Integer getP22025Notificacion() {
        return p22025Notificacion;
    }

    public void setP22025Notificacion(Integer p22025Notificacion) {
        this.p22025Notificacion = p22025Notificacion;
    }

    public Integer getP22025DefensaOficio() {
        return p22025DefensaOficio;
    }

    public void setP22025DefensaOficio(Integer p22025DefensaOficio) {
        this.p22025DefensaOficio = p22025DefensaOficio;
    }

    public Integer getP22025Patrocinio() {
        return p22025Patrocinio;
    }

    public void setP22025Patrocinio(Integer p22025Patrocinio) {
        this.p22025Patrocinio = p22025Patrocinio;
    }

    public Integer getP22025Gestiones() {
        return p22025Gestiones;
    }

    public void setP22025Gestiones(Integer p22025Gestiones) {
        this.p22025Gestiones = p22025Gestiones;
    }

    public Integer getP22025Coordinacion() {
        return p22025Coordinacion;
    }

    public void setP22025Coordinacion(Integer p22025Coordinacion) {
        this.p22025Coordinacion = p22025Coordinacion;
    }

    public Integer getP22025Interprete() {
        return p22025Interprete;
    }

    public void setP22025Interprete(Integer p22025Interprete) {
        this.p22025Interprete = p22025Interprete;
    }

    public Integer getP22025Senias() {
        return p22025Senias;
    }

    public void setP22025Senias(Integer p22025Senias) {
        this.p22025Senias = p22025Senias;
    }

    public Integer getP22025Otros() {
        return p22025Otros;
    }

    public void setP22025Otros(Integer p22025Otros) {
        this.p22025Otros = p22025Otros;
    }

    public Integer getP2162023Orientado() {
        return p2162023Orientado;
    }

    public void setP2162023Orientado(Integer p2162023Orientado) {
        this.p2162023Orientado = p2162023Orientado;
    }

    public Integer getP2162023Asistio() {
        return p2162023Asistio;
    }

    public void setP2162023Asistio(Integer p2162023Asistio) {
        this.p2162023Asistio = p2162023Asistio;
    }

    public Integer getP2162024Orientado() {
        return p2162024Orientado;
    }

    public void setP2162024Orientado(Integer p2162024Orientado) {
        this.p2162024Orientado = p2162024Orientado;
    }

    public Integer getP2162024Asistio() {
        return p2162024Asistio;
    }

    public void setP2162024Asistio(Integer p2162024Asistio) {
        this.p2162024Asistio = p2162024Asistio;
    }

    public Integer getP2162025Orientado() {
        return p2162025Orientado;
    }

    public void setP2162025Orientado(Integer p2162025Orientado) {
        this.p2162025Orientado = p2162025Orientado;
    }

    public Integer getP2162025Asistio() {
        return p2162025Asistio;
    }

    public void setP2162025Asistio(Integer p2162025Asistio) {
        this.p2162025Asistio = p2162025Asistio;
    }

    public String getP217TrataPersona() {
        return p217TrataPersona;
    }

    public void setP217TrataPersona(String p217TrataPersona) {
        this.p217TrataPersona = p217TrataPersona;
    }

    public String getP2110Psicologico() {
        return p2110Psicologico;
    }

    public void setP2110Psicologico(String p2110Psicologico) {
        this.p2110Psicologico = p2110Psicologico;
    }

    public String getP2111Presencial() {
        return p2111Presencial;
    }

    public void setP2111Presencial(String p2111Presencial) {
        this.p2111Presencial = p2111Presencial;
    }

    public String getP2111Llamada() {
        return p2111Llamada;
    }

    public void setP2111Llamada(String p2111Llamada) {
        this.p2111Llamada = p2111Llamada;
    }

    public String getP2111Videolla() {
        return p2111Videolla;
    }

    public void setP2111Videolla(String p2111Videolla) {
        this.p2111Videolla = p2111Videolla;
    }

    public String getP2112Ong() {
        return p2112Ong;
    }

    public void setP2112Ong(String p2112Ong) {
        this.p2112Ong = p2112Ong;
    }

    public String getP21121() {
        return p21121;
    }

    public void setP21121(String p21121) {
        this.p21121 = p21121;
    }

    public String getP21122() {
        return p21122;
    }

    public void setP21122(String p21122) {
        this.p21122 = p21122;
    }

    public String getP21123() {
        return p21123;
    }

    public void setP21123(String p21123) {
        this.p21123 = p21123;
    }

    public String getP2113Presencial() {
        return p2113Presencial;
    }

    public void setP2113Presencial(String p2113Presencial) {
        this.p2113Presencial = p2113Presencial;
    }

    public String getP2113Telefono() {
        return p2113Telefono;
    }

    public void setP2113Telefono(String p2113Telefono) {
        this.p2113Telefono = p2113Telefono;
    }

    public String getP2113Whatsapp() {
        return p2113Whatsapp;
    }

    public void setP2113Whatsapp(String p2113Whatsapp) {
        this.p2113Whatsapp = p2113Whatsapp;
    }

    public String getP2113Virtual() {
        return p2113Virtual;
    }

    public void setP2113Virtual(String p2113Virtual) {
        this.p2113Virtual = p2113Virtual;
    }

    public String getP2113Facebook() {
        return p2113Facebook;
    }

    public void setP2113Facebook(String p2113Facebook) {
        this.p2113Facebook = p2113Facebook;
    }

    public String getP2113CuentaX() {
        return p2113CuentaX;
    }

    public void setP2113CuentaX(String p2113CuentaX) {
        this.p2113CuentaX = p2113CuentaX;
    }

    public String getP2113Correo() {
        return p2113Correo;
    }

    public void setP2113Correo(String p2113Correo) {
        this.p2113Correo = p2113Correo;
    }

    public String getP2114Policia() {
        return p2114Policia;
    }

    public void setP2114Policia(String p2114Policia) {
        this.p2114Policia = p2114Policia;
    }

    public String getP2114MinPublico() {
        return p2114MinPublico;
    }

    public void setP2114MinPublico(String p2114MinPublico) {
        this.p2114MinPublico = p2114MinPublico;
    }

    public String getP2114Interpol() {
        return p2114Interpol;
    }

    public void setP2114Interpol(String p2114Interpol) {
        this.p2114Interpol = p2114Interpol;
    }

    public String getP2114PoderJudicial() {
        return p2114PoderJudicial;
    }

    public void setP2114PoderJudicial(String p2114PoderJudicial) {
        this.p2114PoderJudicial = p2114PoderJudicial;
    }

    public String getP2114Organismo() {
        return p2114Organismo;
    }

    public void setP2114Organismo(String p2114Organismo) {
        this.p2114Organismo = p2114Organismo;
    }

    public String getP2114Ninguna() {
        return p2114Ninguna;
    }

    public void setP2114Ninguna(String p2114Ninguna) {
        this.p2114Ninguna = p2114Ninguna;
    }

    public String getP2114Otros() {
        return p2114Otros;
    }

    public void setP2114Otros(String p2114Otros) {
        this.p2114Otros = p2114Otros;
    }

    public String getP2114OtrosDetalle() {
        return p2114OtrosDetalle;
    }

    public void setP2114OtrosDetalle(String p2114OtrosDetalle) {
        this.p2114OtrosDetalle = p2114OtrosDetalle;
    }

    public String getP2115ALogistica() {
        return p2115ALogistica;
    }

    public void setP2115ALogistica(String p2115aLogistica) {
        p2115ALogistica = p2115aLogistica;
    }

    public String getP2115AGestiones() {
        return p2115AGestiones;
    }

    public void setP2115AGestiones(String p2115aGestiones) {
        p2115AGestiones = p2115aGestiones;
    }

    public String getP2115ASuficiente() {
        return p2115ASuficiente;
    }

    public void setP2115ASuficiente(String p2115aSuficiente) {
        p2115ASuficiente = p2115aSuficiente;
    }

    public String getP2115AEspecifique() {
        return p2115AEspecifique;
    }

    public void setP2115AEspecifique(String p2115aEspecifique) {
        p2115AEspecifique = p2115aEspecifique;
    }

    public String getP2115BInfra() {
        return p2115BInfra;
    }

    public void setP2115BInfra(String p2115bInfra) {
        p2115BInfra = p2115bInfra;
    }

    public String getP2115BGestiones() {
        return p2115BGestiones;
    }

    public void setP2115BGestiones(String p2115bGestiones) {
        p2115BGestiones = p2115bGestiones;
    }

    public String getP2115BSuficiente() {
        return p2115BSuficiente;
    }

    public void setP2115BSuficiente(String p2115bSuficiente) {
        p2115BSuficiente = p2115bSuficiente;
    }

    public String getP2115BEspecifique() {
        return p2115BEspecifique;
    }

    public void setP2115BEspecifique(String p2115bEspecifique) {
        p2115BEspecifique = p2115bEspecifique;
    }

    public String getP2115CPersonal() {
        return p2115CPersonal;
    }

    public void setP2115CPersonal(String p2115cPersonal) {
        p2115CPersonal = p2115cPersonal;
    }

    public String getP2115CGestiones() {
        return p2115CGestiones;
    }

    public void setP2115CGestiones(String p2115cGestiones) {
        p2115CGestiones = p2115cGestiones;
    }

    public String getP2115CSuficiente() {
        return p2115CSuficiente;
    }

    public void setP2115CSuficiente(String p2115cSuficiente) {
        p2115CSuficiente = p2115cSuficiente;
    }

    public String getP2115CEspecifique() {
        return p2115CEspecifique;
    }

    public void setP2115CEspecifique(String p2115cEspecifique) {
        p2115CEspecifique = p2115cEspecifique;
    }

    public String getP2115DPresupuesto() {
        return p2115DPresupuesto;
    }

    public void setP2115DPresupuesto(String p2115dPresupuesto) {
        p2115DPresupuesto = p2115dPresupuesto;
    }

    public String getP2115DGestiones() {
        return p2115DGestiones;
    }

    public void setP2115DGestiones(String p2115dGestiones) {
        p2115DGestiones = p2115dGestiones;
    }

    public String getP2115DSuficiente() {
        return p2115DSuficiente;
    }

    public void setP2115DSuficiente(String p2115dSuficiente) {
        p2115DSuficiente = p2115dSuficiente;
    }

    public String getP2115DEspecifique() {
        return p2115DEspecifique;
    }

    public void setP2115DEspecifique(String p2115dEspecifique) {
        p2115DEspecifique = p2115dEspecifique;
    }

    public String getP2115EOtro() {
        return p2115EOtro;
    }

    public void setP2115EOtro(String p2115eOtro) {
        p2115EOtro = p2115eOtro;
    }

    public String getP2115EOtroDetalle() {
        return p2115EOtroDetalle;
    }

    public void setP2115EOtroDetalle(String p2115eOtroDetalle) {
        p2115EOtroDetalle = p2115eOtroDetalle;
    }

    public String getP2115EGestiones() {
        return p2115EGestiones;
    }

    public void setP2115EGestiones(String p2115eGestiones) {
        p2115EGestiones = p2115eGestiones;
    }

    public String getP2115ESuficiente() {
        return p2115ESuficiente;
    }

    public void setP2115ESuficiente(String p2115eSuficiente) {
        p2115ESuficiente = p2115eSuficiente;
    }

    public String getP2115EEspecifique() {
        return p2115EEspecifique;
    }

    public void setP2115EEspecifique(String p2115eEspecifique) {
        p2115EEspecifique = p2115eEspecifique;
    }

    public String getP2115Ninguno() {
        return p2115Ninguno;
    }

    public void setP2115Ninguno(String p2115Ninguno) {
        this.p2115Ninguno = p2115Ninguno;
    }

    public String getP2116PersonalConsul() {
        return p2116PersonalConsul;
    }

    public void setP2116PersonalConsul(String p2116PersonalConsul) {
        this.p2116PersonalConsul = p2116PersonalConsul;
    }

    public String getP2117Mre() {
        return p2117Mre;
    }

    public void setP2117Mre(String p2117Mre) {
        this.p2117Mre = p2117Mre;
    }

    public String getP2117Reniec() {
        return p2117Reniec;
    }

    public void setP2117Reniec(String p2117Reniec) {
        this.p2117Reniec = p2117Reniec;
    }

    public String getP2117Migraciones() {
        return p2117Migraciones;
    }

    public void setP2117Migraciones(String p2117Migraciones) {
        this.p2117Migraciones = p2117Migraciones;
    }

    public String getP2117Interpol() {
        return p2117Interpol;
    }

    public void setP2117Interpol(String p2117Interpol) {
        this.p2117Interpol = p2117Interpol;
    }

    public String getP2117Inei() {
        return p2117Inei;
    }

    public void setP2117Inei(String p2117Inei) {
        this.p2117Inei = p2117Inei;
    }

    public String getP2117Jne() {
        return p2117Jne;
    }

    public void setP2117Jne(String p2117Jne) {
        this.p2117Jne = p2117Jne;
    }

    public String getP2117Onpe() {
        return p2117Onpe;
    }

    public void setP2117Onpe(String p2117Onpe) {
        this.p2117Onpe = p2117Onpe;
    }

    public String getP2117Sunarp() {
        return p2117Sunarp;
    }

    public void setP2117Sunarp(String p2117Sunarp) {
        this.p2117Sunarp = p2117Sunarp;
    }

    public String getP2117PoderJudicial() {
        return p2117PoderJudicial;
    }

    public void setP2117PoderJudicial(String p2117PoderJudicial) {
        this.p2117PoderJudicial = p2117PoderJudicial;
    }

    public String getP2117Otros() {
        return p2117Otros;
    }

    public void setP2117Otros(String p2117Otros) {
        this.p2117Otros = p2117Otros;
    }

    public String getP2117OtrosDetalle() {
        return p2117OtrosDetalle;
    }

    public void setP2117OtrosDetalle(String p2117OtrosDetalle) {
        this.p2117OtrosDetalle = p2117OtrosDetalle;
    }

    public String getP2117Ninguna() {
        return p2117Ninguna;
    }

    public void setP2117Ninguna(String p2117Ninguna) {
        this.p2117Ninguna = p2117Ninguna;
    }

    public String getP2117NingunaDetalle() {
        return p2117NingunaDetalle;
    }

    public void setP2117NingunaDetalle(String p2117NingunaDetalle) {
        this.p2117NingunaDetalle = p2117NingunaDetalle;
    }

    public String getP21182023Orientado() {
        return p21182023Orientado;
    }

    public void setP21182023Orientado(String p21182023Orientado) {
        this.p21182023Orientado = p21182023Orientado;
    }

    public String getP21182023Asistido() {
        return p21182023Asistido;
    }

    public void setP21182023Asistido(String p21182023Asistido) {
        this.p21182023Asistido = p21182023Asistido;
    }

    public Integer getP21182023NumCasos() {
        return p21182023NumCasos;
    }

    public void setP21182023NumCasos(Integer p21182023NumCasos) {
        this.p21182023NumCasos = p21182023NumCasos;
    }

    public String getP21182024Orientado() {
        return p21182024Orientado;
    }

    public void setP21182024Orientado(String p21182024Orientado) {
        this.p21182024Orientado = p21182024Orientado;
    }

    public String getP21182024Asistido() {
        return p21182024Asistido;
    }

    public void setP21182024Asistido(String p21182024Asistido) {
        this.p21182024Asistido = p21182024Asistido;
    }

    public Integer getP21182024NumCasos() {
        return p21182024NumCasos;
    }

    public void setP21182024NumCasos(Integer p21182024NumCasos) {
        this.p21182024NumCasos = p21182024NumCasos;
    }

    public String getP21182025Orientado() {
        return p21182025Orientado;
    }

    public void setP21182025Orientado(String p21182025Orientado) {
        this.p21182025Orientado = p21182025Orientado;
    }

    public String getP21182025Asistido() {
        return p21182025Asistido;
    }

    public void setP21182025Asistido(String p21182025Asistido) {
        this.p21182025Asistido = p21182025Asistido;
    }

    public Integer getP21182025NumCasos() {
        return p21182025NumCasos;
    }

    public void setP21182025NumCasos(Integer p21182025NumCasos) {
        this.p21182025NumCasos = p21182025NumCasos;
    }

    public String getP2119Oficina() {
        return p2119Oficina;
    }

    public void setP2119Oficina(String p2119Oficina) {
        this.p2119Oficina = p2119Oficina;
    }

    public String getP2119Flojograma() {
        return p2119Flojograma;
    }

    public void setP2119Flojograma(String p2119Flojograma) {
        this.p2119Flojograma = p2119Flojograma;
    }

    public String getP2119Ninguno() {
        return p2119Ninguno;
    }

    public void setP2119Ninguno(String p2119Ninguno) {
        this.p2119Ninguno = p2119Ninguno;
    }

    public String getP2120Protocolo() {
        return p2120Protocolo;
    }

    public void setP2120Protocolo(String p2120Protocolo) {
        this.p2120Protocolo = p2120Protocolo;
    }

    public String getP2121Violencia() {
        return p2121Violencia;
    }

    public void setP2121Violencia(String p2121Violencia) {
        this.p2121Violencia = p2121Violencia;
    }

    public String getP2122Apoyo() {
        return p2122Apoyo;
    }

    public void setP2122Apoyo(String p2122Apoyo) {
        this.p2122Apoyo = p2122Apoyo;
    }

    public String getP2123Presencial() {
        return p2123Presencial;
    }

    public void setP2123Presencial(String p2123Presencial) {
        this.p2123Presencial = p2123Presencial;
    }

    public String getP2123Telefono() {
        return p2123Telefono;
    }

    public void setP2123Telefono(String p2123Telefono) {
        this.p2123Telefono = p2123Telefono;
    }

    public String getP2123Videollama() {
        return p2123Videollama;
    }

    public void setP2123Videollama(String p2123Videollama) {
        this.p2123Videollama = p2123Videollama;
    }

    public String getP2124Ong() {
        return p2124Ong;
    }

    public void setP2124Ong(String p2124Ong) {
        this.p2124Ong = p2124Ong;
    }

    public String getP2125Entidad1() {
        return p2125Entidad1;
    }

    public void setP2125Entidad1(String p2125Entidad1) {
        this.p2125Entidad1 = p2125Entidad1;
    }

    public String getP2125Entidad2() {
        return p2125Entidad2;
    }

    public void setP2125Entidad2(String p2125Entidad2) {
        this.p2125Entidad2 = p2125Entidad2;
    }

    public String getP2125Entidad3() {
        return p2125Entidad3;
    }

    public void setP2125Entidad3(String p2125Entidad3) {
        this.p2125Entidad3 = p2125Entidad3;
    }

    public String getP2126Presencial() {
        return p2126Presencial;
    }

    public void setP2126Presencial(String p2126Presencial) {
        this.p2126Presencial = p2126Presencial;
    }

    public String getP2126Telefonica() {
        return p2126Telefonica;
    }

    public void setP2126Telefonica(String p2126Telefonica) {
        this.p2126Telefonica = p2126Telefonica;
    }

    public String getP2126Whatsapp() {
        return p2126Whatsapp;
    }

    public void setP2126Whatsapp(String p2126Whatsapp) {
        this.p2126Whatsapp = p2126Whatsapp;
    }

    public String getP2126Virtual() {
        return p2126Virtual;
    }

    public void setP2126Virtual(String p2126Virtual) {
        this.p2126Virtual = p2126Virtual;
    }

    public String getP2126Facebook() {
        return p2126Facebook;
    }

    public void setP2126Facebook(String p2126Facebook) {
        this.p2126Facebook = p2126Facebook;
    }

    public String getP2126CuentaX() {
        return p2126CuentaX;
    }

    public void setP2126CuentaX(String p2126CuentaX) {
        this.p2126CuentaX = p2126CuentaX;
    }

    public String getP2126Correo() {
        return p2126Correo;
    }

    public void setP2126Correo(String p2126Correo) {
        this.p2126Correo = p2126Correo;
    }

    public String getP2127Policia() {
        return p2127Policia;
    }

    public void setP2127Policia(String p2127Policia) {
        this.p2127Policia = p2127Policia;
    }

    public String getP2127MinPublico() {
        return p2127MinPublico;
    }

    public void setP2127MinPublico(String p2127MinPublico) {
        this.p2127MinPublico = p2127MinPublico;
    }

    public String getP2127Interpol() {
        return p2127Interpol;
    }

    public void setP2127Interpol(String p2127Interpol) {
        this.p2127Interpol = p2127Interpol;
    }

    public String getP2127PoderJudicial() {
        return p2127PoderJudicial;
    }

    public void setP2127PoderJudicial(String p2127PoderJudicial) {
        this.p2127PoderJudicial = p2127PoderJudicial;
    }

    public String getP2127Organizacion() {
        return p2127Organizacion;
    }

    public void setP2127Organizacion(String p2127Organizacion) {
        this.p2127Organizacion = p2127Organizacion;
    }

    public String getP2127Ninguna() {
        return p2127Ninguna;
    }

    public void setP2127Ninguna(String p2127Ninguna) {
        this.p2127Ninguna = p2127Ninguna;
    }

    public String getP2127Otros() {
        return p2127Otros;
    }

    public void setP2127Otros(String p2127Otros) {
        this.p2127Otros = p2127Otros;
    }

    public String getP2127OtrosDetallar() {
        return p2127OtrosDetallar;
    }

    public void setP2127OtrosDetallar(String p2127OtrosDetallar) {
        this.p2127OtrosDetallar = p2127OtrosDetallar;
    }

    public String getP2128ALogistica() {
        return p2128ALogistica;
    }

    public void setP2128ALogistica(String p2128aLogistica) {
        p2128ALogistica = p2128aLogistica;
    }

    public String getP2128AGestiones() {
        return p2128AGestiones;
    }

    public void setP2128AGestiones(String p2128aGestiones) {
        p2128AGestiones = p2128aGestiones;
    }

    public String getP2128ASuficiente() {
        return p2128ASuficiente;
    }

    public void setP2128ASuficiente(String p2128aSuficiente) {
        p2128ASuficiente = p2128aSuficiente;
    }

    public String getP2128AEspecifique() {
        return p2128AEspecifique;
    }

    public void setP2128AEspecifique(String p2128aEspecifique) {
        p2128AEspecifique = p2128aEspecifique;
    }

    public String getP2128BInfra() {
        return p2128BInfra;
    }

    public void setP2128BInfra(String p2128bInfra) {
        p2128BInfra = p2128bInfra;
    }

    public String getP2128BGestiones() {
        return p2128BGestiones;
    }

    public void setP2128BGestiones(String p2128bGestiones) {
        p2128BGestiones = p2128bGestiones;
    }

    public String getP2128BSuficiente() {
        return p2128BSuficiente;
    }

    public void setP2128BSuficiente(String p2128bSuficiente) {
        p2128BSuficiente = p2128bSuficiente;
    }

    public String getP2128BEspecifique() {
        return p2128BEspecifique;
    }

    public void setP2128BEspecifique(String p2128bEspecifique) {
        p2128BEspecifique = p2128bEspecifique;
    }

    public String getP2128CPersonal() {
        return p2128CPersonal;
    }

    public void setP2128CPersonal(String p2128cPersonal) {
        p2128CPersonal = p2128cPersonal;
    }

    public String getP2128CGestiones() {
        return p2128CGestiones;
    }

    public void setP2128CGestiones(String p2128cGestiones) {
        p2128CGestiones = p2128cGestiones;
    }

    public String getP2128CSuficiente() {
        return p2128CSuficiente;
    }

    public void setP2128CSuficiente(String p2128cSuficiente) {
        p2128CSuficiente = p2128cSuficiente;
    }

    public String getP2128CEspecifique() {
        return p2128CEspecifique;
    }

    public void setP2128CEspecifique(String p2128cEspecifique) {
        p2128CEspecifique = p2128cEspecifique;
    }

    public String getP2128DPresupuesto() {
        return p2128DPresupuesto;
    }

    public void setP2128DPresupuesto(String p2128dPresupuesto) {
        p2128DPresupuesto = p2128dPresupuesto;
    }

    public String getP2128DGestiones() {
        return p2128DGestiones;
    }

    public void setP2128DGestiones(String p2128dGestiones) {
        p2128DGestiones = p2128dGestiones;
    }

    public String getP2128DSuficiente() {
        return p2128DSuficiente;
    }

    public void setP2128DSuficiente(String p2128dSuficiente) {
        p2128DSuficiente = p2128dSuficiente;
    }

    public String getP2128DEspecifique() {
        return p2128DEspecifique;
    }

    public void setP2128DEspecifique(String p2128dEspecifique) {
        p2128DEspecifique = p2128dEspecifique;
    }

    public String getP2128EOtro() {
        return p2128EOtro;
    }

    public void setP2128EOtro(String p2128eOtro) {
        p2128EOtro = p2128eOtro;
    }

    public String getP2128EOtroDetalle() {
        return p2128EOtroDetalle;
    }

    public void setP2128EOtroDetalle(String p2128eOtroDetalle) {
        p2128EOtroDetalle = p2128eOtroDetalle;
    }

    public String getP2128EGestiones() {
        return p2128EGestiones;
    }

    public void setP2128EGestiones(String p2128eGestiones) {
        p2128EGestiones = p2128eGestiones;
    }

    public String getP2128ESuficiente() {
        return p2128ESuficiente;
    }

    public void setP2128ESuficiente(String p2128eSuficiente) {
        p2128ESuficiente = p2128eSuficiente;
    }

    public String getP2128EEspecifique() {
        return p2128EEspecifique;
    }

    public void setP2128EEspecifique(String p2128eEspecifique) {
        p2128EEspecifique = p2128eEspecifique;
    }

    public String getP2128Ninguno() {
        return p2128Ninguno;
    }

    public void setP2128Ninguno(String p2128Ninguno) {
        this.p2128Ninguno = p2128Ninguno;
    }

    public String getP2129RecibePersonal() {
        return p2129RecibePersonal;
    }

    public void setP2129RecibePersonal(String p2129RecibePersonal) {
        this.p2129RecibePersonal = p2129RecibePersonal;
    }

    public String getP2130Mre() {
        return p2130Mre;
    }

    public void setP2130Mre(String p2130Mre) {
        this.p2130Mre = p2130Mre;
    }

    public String getP2130Reniec() {
        return p2130Reniec;
    }

    public void setP2130Reniec(String p2130Reniec) {
        this.p2130Reniec = p2130Reniec;
    }

    public String getP2130Migraciones() {
        return p2130Migraciones;
    }

    public void setP2130Migraciones(String p2130Migraciones) {
        this.p2130Migraciones = p2130Migraciones;
    }

    public String getP2130Interpol() {
        return p2130Interpol;
    }

    public void setP2130Interpol(String p2130Interpol) {
        this.p2130Interpol = p2130Interpol;
    }

    public String getP2130Inei() {
        return p2130Inei;
    }

    public void setP2130Inei(String p2130Inei) {
        this.p2130Inei = p2130Inei;
    }

    public String getP2130Jne() {
        return p2130Jne;
    }

    public void setP2130Jne(String p2130Jne) {
        this.p2130Jne = p2130Jne;
    }

    public String getP2130Onpe() {
        return p2130Onpe;
    }

    public void setP2130Onpe(String p2130Onpe) {
        this.p2130Onpe = p2130Onpe;
    }

    public String getP2130Sunarp() {
        return p2130Sunarp;
    }

    public void setP2130Sunarp(String p2130Sunarp) {
        this.p2130Sunarp = p2130Sunarp;
    }

    public String getP2130PoderJudicial() {
        return p2130PoderJudicial;
    }

    public void setP2130PoderJudicial(String p2130PoderJudicial) {
        this.p2130PoderJudicial = p2130PoderJudicial;
    }

    public String getP2130Otros() {
        return p2130Otros;
    }

    public void setP2130Otros(String p2130Otros) {
        this.p2130Otros = p2130Otros;
    }

    public String getP2130OtrosDetalle() {
        return p2130OtrosDetalle;
    }

    public void setP2130OtrosDetalle(String p2130OtrosDetalle) {
        this.p2130OtrosDetalle = p2130OtrosDetalle;
    }

    public String getP2130Ninguna() {
        return p2130Ninguna;
    }

    public void setP2130Ninguna(String p2130Ninguna) {
        this.p2130Ninguna = p2130Ninguna;
    }

    public String getP2130NingunaDetalle() {
        return p2130NingunaDetalle;
    }

    public void setP2130NingunaDetalle(String p2130NingunaDetalle) {
        this.p2130NingunaDetalle = p2130NingunaDetalle;
    }

    public Integer getP21312023NumAnio() {
        return p21312023NumAnio;
    }

    public void setP21312023NumAnio(Integer p21312023NumAnio) {
        this.p21312023NumAnio = p21312023NumAnio;
    }

    public Integer getP21312023Detenciones() {
        return p21312023Detenciones;
    }

    public void setP21312023Detenciones(Integer p21312023Detenciones) {
        this.p21312023Detenciones = p21312023Detenciones;
    }

    public Integer getP21312023Deportacion() {
        return p21312023Deportacion;
    }

    public void setP21312023Deportacion(Integer p21312023Deportacion) {
        this.p21312023Deportacion = p21312023Deportacion;
    }

    public Integer getP21312023Expulsion() {
        return p21312023Expulsion;
    }

    public void setP21312023Expulsion(Integer p21312023Expulsion) {
        this.p21312023Expulsion = p21312023Expulsion;
    }

    public Integer getP21312024NumAnio() {
        return p21312024NumAnio;
    }

    public void setP21312024NumAnio(Integer p21312024NumAnio) {
        this.p21312024NumAnio = p21312024NumAnio;
    }

    public Integer getP21312024Detenciones() {
        return p21312024Detenciones;
    }

    public void setP21312024Detenciones(Integer p21312024Detenciones) {
        this.p21312024Detenciones = p21312024Detenciones;
    }

    public Integer getP21312024Deportacion() {
        return p21312024Deportacion;
    }

    public void setP21312024Deportacion(Integer p21312024Deportacion) {
        this.p21312024Deportacion = p21312024Deportacion;
    }

    public Integer getP21312024Expulsion() {
        return p21312024Expulsion;
    }

    public void setP21312024Expulsion(Integer p21312024Expulsion) {
        this.p21312024Expulsion = p21312024Expulsion;
    }

    public Integer getP21312025NumAnio() {
        return p21312025NumAnio;
    }

    public void setP21312025NumAnio(Integer p21312025NumAnio) {
        this.p21312025NumAnio = p21312025NumAnio;
    }

    public Integer getP21312025Detenciones() {
        return p21312025Detenciones;
    }

    public void setP21312025Detenciones(Integer p21312025Detenciones) {
        this.p21312025Detenciones = p21312025Detenciones;
    }

    public Integer getP21312025Deportacion() {
        return p21312025Deportacion;
    }

    public void setP21312025Deportacion(Integer p21312025Deportacion) {
        this.p21312025Deportacion = p21312025Deportacion;
    }

    public Integer getP21312025Expulsion() {
        return p21312025Expulsion;
    }

    public void setP21312025Expulsion(Integer p21312025Expulsion) {
        this.p21312025Expulsion = p21312025Expulsion;
    }

    public String getP2132OfiConsular() {
        return p2132OfiConsular;
    }

    public void setP2132OfiConsular(String p2132OfiConsular) {
        this.p2132OfiConsular = p2132OfiConsular;
    }

    public String getP2132Flujograma() {
        return p2132Flujograma;
    }

    public void setP2132Flujograma(String p2132Flujograma) {
        this.p2132Flujograma = p2132Flujograma;
    }

    public String getP2132Ninguno() {
        return p2132Ninguno;
    }

    public void setP2132Ninguno(String p2132Ninguno) {
        this.p2132Ninguno = p2132Ninguno;
    }

    public String getP2133Protocolo() {
        return p2133Protocolo;
    }

    public void setP2133Protocolo(String p2133Protocolo) {
        this.p2133Protocolo = p2133Protocolo;
    }

    public String getP2134Existen() {
        return p2134Existen;
    }

    public void setP2134Existen(String p2134Existen) {
        this.p2134Existen = p2134Existen;
    }

    public String getP2135Ofrecen() {
        return p2135Ofrecen;
    }

    public void setP2135Ofrecen(String p2135Ofrecen) {
        this.p2135Ofrecen = p2135Ofrecen;
    }

    public String getP2135Presencial() {
        return p2135Presencial;
    }

    public void setP2135Presencial(String p2135Presencial) {
        this.p2135Presencial = p2135Presencial;
    }

    public String getP2135Llamada() {
        return p2135Llamada;
    }

    public void setP2135Llamada(String p2135Llamada) {
        this.p2135Llamada = p2135Llamada;
    }

    public String getP2135Videolla() {
        return p2135Videolla;
    }

    public void setP2135Videolla(String p2135Videolla) {
        this.p2135Videolla = p2135Videolla;
    }

    public String getP2136Coordina() {
        return p2136Coordina;
    }

    public void setP2136Coordina(String p2136Coordina) {
        this.p2136Coordina = p2136Coordina;
    }

    public String getP2137Presecnial() {
        return p2137Presecnial;
    }

    public void setP2137Presecnial(String p2137Presecnial) {
        this.p2137Presecnial = p2137Presecnial;
    }

    public String getP2137Telefono() {
        return p2137Telefono;
    }

    public void setP2137Telefono(String p2137Telefono) {
        this.p2137Telefono = p2137Telefono;
    }

    public String getP2137Whatsapp() {
        return p2137Whatsapp;
    }

    public void setP2137Whatsapp(String p2137Whatsapp) {
        this.p2137Whatsapp = p2137Whatsapp;
    }

    public String getP2137Virtual() {
        return p2137Virtual;
    }

    public void setP2137Virtual(String p2137Virtual) {
        this.p2137Virtual = p2137Virtual;
    }

    public String getP2137Facebook() {
        return p2137Facebook;
    }

    public void setP2137Facebook(String p2137Facebook) {
        this.p2137Facebook = p2137Facebook;
    }

    public String getP2137CuentaX() {
        return p2137CuentaX;
    }

    public void setP2137CuentaX(String p2137CuentaX) {
        this.p2137CuentaX = p2137CuentaX;
    }

    public String getP2137Correo() {
        return p2137Correo;
    }

    public void setP2137Correo(String p2137Correo) {
        this.p2137Correo = p2137Correo;
    }

    public String getP2138Policia() {
        return p2138Policia;
    }

    public void setP2138Policia(String p2138Policia) {
        this.p2138Policia = p2138Policia;
    }

    public String getP2138MinPublico() {
        return p2138MinPublico;
    }

    public void setP2138MinPublico(String p2138MinPublico) {
        this.p2138MinPublico = p2138MinPublico;
    }

    public String getP2138Interpol() {
        return p2138Interpol;
    }

    public void setP2138Interpol(String p2138Interpol) {
        this.p2138Interpol = p2138Interpol;
    }

    public String getP2138PoderJudicial() {
        return p2138PoderJudicial;
    }

    public void setP2138PoderJudicial(String p2138PoderJudicial) {
        this.p2138PoderJudicial = p2138PoderJudicial;
    }

    public String getP2138Organismo() {
        return p2138Organismo;
    }

    public void setP2138Organismo(String p2138Organismo) {
        this.p2138Organismo = p2138Organismo;
    }

    public String getP2138Otros() {
        return p2138Otros;
    }

    public void setP2138Otros(String p2138Otros) {
        this.p2138Otros = p2138Otros;
    }

    public String getP2138OtrosDetalle() {
        return p2138OtrosDetalle;
    }

    public void setP2138OtrosDetalle(String p2138OtrosDetalle) {
        this.p2138OtrosDetalle = p2138OtrosDetalle;
    }

    public String getP2138Ninguna() {
        return p2138Ninguna;
    }

    public void setP2138Ninguna(String p2138Ninguna) {
        this.p2138Ninguna = p2138Ninguna;
    }

    public String getP2139ALogistica() {
        return p2139ALogistica;
    }

    public void setP2139ALogistica(String p2139aLogistica) {
        p2139ALogistica = p2139aLogistica;
    }

    public String getP2139AGestiones() {
        return p2139AGestiones;
    }

    public void setP2139AGestiones(String p2139aGestiones) {
        p2139AGestiones = p2139aGestiones;
    }

    public String getP2139ASuficiente() {
        return p2139ASuficiente;
    }

    public void setP2139ASuficiente(String p2139aSuficiente) {
        p2139ASuficiente = p2139aSuficiente;
    }

    public String getP2139AEspecifique() {
        return p2139AEspecifique;
    }

    public void setP2139AEspecifique(String p2139aEspecifique) {
        p2139AEspecifique = p2139aEspecifique;
    }

    public String getP2139BInfra() {
        return p2139BInfra;
    }

    public void setP2139BInfra(String p2139bInfra) {
        p2139BInfra = p2139bInfra;
    }

    public String getP2139BGestiones() {
        return p2139BGestiones;
    }

    public void setP2139BGestiones(String p2139bGestiones) {
        p2139BGestiones = p2139bGestiones;
    }

    public String getP2139BSuficiente() {
        return p2139BSuficiente;
    }

    public void setP2139BSuficiente(String p2139bSuficiente) {
        p2139BSuficiente = p2139bSuficiente;
    }

    public String getP2139BEspecifique() {
        return p2139BEspecifique;
    }

    public void setP2139BEspecifique(String p2139bEspecifique) {
        p2139BEspecifique = p2139bEspecifique;
    }

    public String getP2139CPersonal() {
        return p2139CPersonal;
    }

    public void setP2139CPersonal(String p2139cPersonal) {
        p2139CPersonal = p2139cPersonal;
    }

    public String getP2139CGestiones() {
        return p2139CGestiones;
    }

    public void setP2139CGestiones(String p2139cGestiones) {
        p2139CGestiones = p2139cGestiones;
    }

    public String getP2139CSuficiente() {
        return p2139CSuficiente;
    }

    public void setP2139CSuficiente(String p2139cSuficiente) {
        p2139CSuficiente = p2139cSuficiente;
    }

    public String getP2139CEspecifique() {
        return p2139CEspecifique;
    }

    public void setP2139CEspecifique(String p2139cEspecifique) {
        p2139CEspecifique = p2139cEspecifique;
    }

    public String getP2139DPresupuesto() {
        return p2139DPresupuesto;
    }

    public void setP2139DPresupuesto(String p2139dPresupuesto) {
        p2139DPresupuesto = p2139dPresupuesto;
    }

    public String getP2139DGestiones() {
        return p2139DGestiones;
    }

    public void setP2139DGestiones(String p2139dGestiones) {
        p2139DGestiones = p2139dGestiones;
    }

    public String getP2139DSuficiente() {
        return p2139DSuficiente;
    }

    public void setP2139DSuficiente(String p2139dSuficiente) {
        p2139DSuficiente = p2139dSuficiente;
    }

    public String getP2139DEspecifique() {
        return p2139DEspecifique;
    }

    public void setP2139DEspecifique(String p2139dEspecifique) {
        p2139DEspecifique = p2139dEspecifique;
    }

    public String getP2139EOtro() {
        return p2139EOtro;
    }

    public void setP2139EOtro(String p2139eOtro) {
        p2139EOtro = p2139eOtro;
    }

    public String getP2139EOtroDetalle() {
        return p2139EOtroDetalle;
    }

    public void setP2139EOtroDetalle(String p2139eOtroDetalle) {
        p2139EOtroDetalle = p2139eOtroDetalle;
    }

    public String getP2139EGestiones() {
        return p2139EGestiones;
    }

    public void setP2139EGestiones(String p2139eGestiones) {
        p2139EGestiones = p2139eGestiones;
    }

    public String getP2139ESuficiente() {
        return p2139ESuficiente;
    }

    public void setP2139ESuficiente(String p2139eSuficiente) {
        p2139ESuficiente = p2139eSuficiente;
    }

    public String getP2139EEspecifique() {
        return p2139EEspecifique;
    }

    public void setP2139EEspecifique(String p2139eEspecifique) {
        p2139EEspecifique = p2139eEspecifique;
    }

    public String getP2139Ninguno() {
        return p2139Ninguno;
    }

    public void setP2139Ninguno(String p2139Ninguno) {
        this.p2139Ninguno = p2139Ninguno;
    }

    public String getP2140Recibe() {
        return p2140Recibe;
    }

    public void setP2140Recibe(String p2140Recibe) {
        this.p2140Recibe = p2140Recibe;
    }

    public String getP2141Mre() {
        return p2141Mre;
    }

    public void setP2141Mre(String p2141Mre) {
        this.p2141Mre = p2141Mre;
    }

    public String getP2141Reniec() {
        return p2141Reniec;
    }

    public void setP2141Reniec(String p2141Reniec) {
        this.p2141Reniec = p2141Reniec;
    }

    public String getP2141Migraciones() {
        return p2141Migraciones;
    }

    public void setP2141Migraciones(String p2141Migraciones) {
        this.p2141Migraciones = p2141Migraciones;
    }

    public String getP2141Interpol() {
        return p2141Interpol;
    }

    public void setP2141Interpol(String p2141Interpol) {
        this.p2141Interpol = p2141Interpol;
    }

    public String getP2141Inei() {
        return p2141Inei;
    }

    public void setP2141Inei(String p2141Inei) {
        this.p2141Inei = p2141Inei;
    }

    public String getP2141Jne() {
        return p2141Jne;
    }

    public void setP2141Jne(String p2141Jne) {
        this.p2141Jne = p2141Jne;
    }

    public String getP2141Onpe() {
        return p2141Onpe;
    }

    public void setP2141Onpe(String p2141Onpe) {
        this.p2141Onpe = p2141Onpe;
    }

    public String getP2141Sunarp() {
        return p2141Sunarp;
    }

    public void setP2141Sunarp(String p2141Sunarp) {
        this.p2141Sunarp = p2141Sunarp;
    }

    public String getP2141PoderJudicial() {
        return p2141PoderJudicial;
    }

    public void setP2141PoderJudicial(String p2141PoderJudicial) {
        this.p2141PoderJudicial = p2141PoderJudicial;
    }

    public String getP2141Otro() {
        return p2141Otro;
    }

    public void setP2141Otro(String p2141Otro) {
        this.p2141Otro = p2141Otro;
    }

    public String getP2141OtroDetalle() {
        return p2141OtroDetalle;
    }

    public void setP2141OtroDetalle(String p2141OtroDetalle) {
        this.p2141OtroDetalle = p2141OtroDetalle;
    }

    public String getP2141Ninguno() {
        return p2141Ninguno;
    }

    public void setP2141Ninguno(String p2141Ninguno) {
        this.p2141Ninguno = p2141Ninguno;
    }

    public String getP221Organo() {
        return p221Organo;
    }

    public void setP221Organo(String p221Organo) {
        this.p221Organo = p221Organo;
    }

    public String getP221Especifique() {
        return p221Especifique;
    }

    public void setP221Especifique(String p221Especifique) {
        this.p221Especifique = p221Especifique;
    }

    public BigDecimal getP222Porcentaje() {
        return p222Porcentaje;
    }

    public void setP222Porcentaje(BigDecimal p222Porcentaje) {
        this.p222Porcentaje = p222Porcentaje;
    }

    public Integer getP223Desastres2023() {
        return p223Desastres2023;
    }

    public void setP223Desastres2023(Integer p223Desastres2023) {
        this.p223Desastres2023 = p223Desastres2023;
    }

    public Integer getP223Desastres2024() {
        return p223Desastres2024;
    }

    public void setP223Desastres2024(Integer p223Desastres2024) {
        this.p223Desastres2024 = p223Desastres2024;
    }

    public Integer getP223Desastres2025() {
        return p223Desastres2025;
    }

    public void setP223Desastres2025(Integer p223Desastres2025) {
        this.p223Desastres2025 = p223Desastres2025;
    }

    public Integer getP223Sociales2023() {
        return p223Sociales2023;
    }

    public void setP223Sociales2023(Integer p223Sociales2023) {
        this.p223Sociales2023 = p223Sociales2023;
    }

    public Integer getP223Sociales2024() {
        return p223Sociales2024;
    }

    public void setP223Sociales2024(Integer p223Sociales2024) {
        this.p223Sociales2024 = p223Sociales2024;
    }

    public Integer getP223Sociales2025() {
        return p223Sociales2025;
    }

    public void setP223Sociales2025(Integer p223Sociales2025) {
        this.p223Sociales2025 = p223Sociales2025;
    }

    public Integer getP223Accidentes2023() {
        return p223Accidentes2023;
    }

    public void setP223Accidentes2023(Integer p223Accidentes2023) {
        this.p223Accidentes2023 = p223Accidentes2023;
    }

    public Integer getP223Accidentes2024() {
        return p223Accidentes2024;
    }

    public void setP223Accidentes2024(Integer p223Accidentes2024) {
        this.p223Accidentes2024 = p223Accidentes2024;
    }

    public Integer getP223Accidentes2025() {
        return p223Accidentes2025;
    }

    public void setP223Accidentes2025(Integer p223Accidentes2025) {
        this.p223Accidentes2025 = p223Accidentes2025;
    }

    public Integer getP223Repatriaciones2023() {
        return p223Repatriaciones2023;
    }

    public void setP223Repatriaciones2023(Integer p223Repatriaciones2023) {
        this.p223Repatriaciones2023 = p223Repatriaciones2023;
    }

    public Integer getP223Repatriaciones2024() {
        return p223Repatriaciones2024;
    }

    public void setP223Repatriaciones2024(Integer p223Repatriaciones2024) {
        this.p223Repatriaciones2024 = p223Repatriaciones2024;
    }

    public Integer getP223Repatriaciones2025() {
        return p223Repatriaciones2025;
    }

    public void setP223Repatriaciones2025(Integer p223Repatriaciones2025) {
        this.p223Repatriaciones2025 = p223Repatriaciones2025;
    }

    public Integer getP223Fallecidos2023() {
        return p223Fallecidos2023;
    }

    public void setP223Fallecidos2023(Integer p223Fallecidos2023) {
        this.p223Fallecidos2023 = p223Fallecidos2023;
    }

    public Integer getP223Fallecidos2024() {
        return p223Fallecidos2024;
    }

    public void setP223Fallecidos2024(Integer p223Fallecidos2024) {
        this.p223Fallecidos2024 = p223Fallecidos2024;
    }

    public Integer getP223Fallecidos2025() {
        return p223Fallecidos2025;
    }

    public void setP223Fallecidos2025(Integer p223Fallecidos2025) {
        this.p223Fallecidos2025 = p223Fallecidos2025;
    }

    public Integer getP2242023NumCasos() {
        return p2242023NumCasos;
    }

    public void setP2242023NumCasos(Integer p2242023NumCasos) {
        this.p2242023NumCasos = p2242023NumCasos;
    }

    public Integer getP2242023Material() {
        return p2242023Material;
    }

    public void setP2242023Material(Integer p2242023Material) {
        this.p2242023Material = p2242023Material;
    }

    public Integer getP2242023Economica() {
        return p2242023Economica;
    }

    public void setP2242023Economica(Integer p2242023Economica) {
        this.p2242023Economica = p2242023Economica;
    }

    public Integer getP2242024NumCasos() {
        return p2242024NumCasos;
    }

    public void setP2242024NumCasos(Integer p2242024NumCasos) {
        this.p2242024NumCasos = p2242024NumCasos;
    }

    public Integer getP2242024Material() {
        return p2242024Material;
    }

    public void setP2242024Material(Integer p2242024Material) {
        this.p2242024Material = p2242024Material;
    }

    public Integer getP2242024Economica() {
        return p2242024Economica;
    }

    public void setP2242024Economica(Integer p2242024Economica) {
        this.p2242024Economica = p2242024Economica;
    }

    public Integer getP2242025NumCasos() {
        return p2242025NumCasos;
    }

    public void setP2242025NumCasos(Integer p2242025NumCasos) {
        this.p2242025NumCasos = p2242025NumCasos;
    }

    public Integer getP2242025Material() {
        return p2242025Material;
    }

    public void setP2242025Material(Integer p2242025Material) {
        this.p2242025Material = p2242025Material;
    }

    public Integer getP2242025Economica() {
        return p2242025Economica;
    }

    public void setP2242025Economica(Integer p2242025Economica) {
        this.p2242025Economica = p2242025Economica;
    }

    public Integer getP2252023NumCasos() {
        return p2252023NumCasos;
    }

    public void setP2252023NumCasos(Integer p2252023NumCasos) {
        this.p2252023NumCasos = p2252023NumCasos;
    }

    public Integer getP2252023Material() {
        return p2252023Material;
    }

    public void setP2252023Material(Integer p2252023Material) {
        this.p2252023Material = p2252023Material;
    }

    public Integer getP2252023Economica() {
        return p2252023Economica;
    }

    public void setP2252023Economica(Integer p2252023Economica) {
        this.p2252023Economica = p2252023Economica;
    }

    public Integer getP2252024NumCasos() {
        return p2252024NumCasos;
    }

    public void setP2252024NumCasos(Integer p2252024NumCasos) {
        this.p2252024NumCasos = p2252024NumCasos;
    }

    public Integer getP2252024Material() {
        return p2252024Material;
    }

    public void setP2252024Material(Integer p2252024Material) {
        this.p2252024Material = p2252024Material;
    }

    public Integer getP2252024Economica() {
        return p2252024Economica;
    }

    public void setP2252024Economica(Integer p2252024Economica) {
        this.p2252024Economica = p2252024Economica;
    }

    public Integer getP2252025NumCasos() {
        return p2252025NumCasos;
    }

    public void setP2252025NumCasos(Integer p2252025NumCasos) {
        this.p2252025NumCasos = p2252025NumCasos;
    }

    public Integer getP2252025Material() {
        return p2252025Material;
    }

    public void setP2252025Material(Integer p2252025Material) {
        this.p2252025Material = p2252025Material;
    }

    public Integer getP2252025Economica() {
        return p2252025Economica;
    }

    public void setP2252025Economica(Integer p2252025Economica) {
        this.p2252025Economica = p2252025Economica;
    }

    public Integer getP2262023NumCasos() {
        return p2262023NumCasos;
    }

    public void setP2262023NumCasos(Integer p2262023NumCasos) {
        this.p2262023NumCasos = p2262023NumCasos;
    }

    public Integer getP2262023Material() {
        return p2262023Material;
    }

    public void setP2262023Material(Integer p2262023Material) {
        this.p2262023Material = p2262023Material;
    }

    public Integer getP2262023Economica() {
        return p2262023Economica;
    }

    public void setP2262023Economica(Integer p2262023Economica) {
        this.p2262023Economica = p2262023Economica;
    }

    public Integer getP2262024NumCasos() {
        return p2262024NumCasos;
    }

    public void setP2262024NumCasos(Integer p2262024NumCasos) {
        this.p2262024NumCasos = p2262024NumCasos;
    }

    public Integer getP2262024Material() {
        return p2262024Material;
    }

    public void setP2262024Material(Integer p2262024Material) {
        this.p2262024Material = p2262024Material;
    }

    public Integer getP2262024Economica() {
        return p2262024Economica;
    }

    public void setP2262024Economica(Integer p2262024Economica) {
        this.p2262024Economica = p2262024Economica;
    }

    public Integer getP2262025NumCasos() {
        return p2262025NumCasos;
    }

    public void setP2262025NumCasos(Integer p2262025NumCasos) {
        this.p2262025NumCasos = p2262025NumCasos;
    }

    public Integer getP2262025Material() {
        return p2262025Material;
    }

    public void setP2262025Material(Integer p2262025Material) {
        this.p2262025Material = p2262025Material;
    }

    public Integer getP2262025Economica() {
        return p2262025Economica;
    }

    public void setP2262025Economica(Integer p2262025Economica) {
        this.p2262025Economica = p2262025Economica;
    }

    public Integer getP227Privadas2023() {
        return p227Privadas2023;
    }

    public void setP227Privadas2023(Integer p227Privadas2023) {
        this.p227Privadas2023 = p227Privadas2023;
    }

    public Integer getP227Hospitalizada2023() {
        return p227Hospitalizada2023;
    }

    public void setP227Hospitalizada2023(Integer p227Hospitalizada2023) {
        this.p227Hospitalizada2023 = p227Hospitalizada2023;
    }

    public Integer getP227Estado2023() {
        return p227Estado2023;
    }

    public void setP227Estado2023(Integer p227Estado2023) {
        this.p227Estado2023 = p227Estado2023;
    }

    public Integer getP227Privadas2024() {
        return p227Privadas2024;
    }

    public void setP227Privadas2024(Integer p227Privadas2024) {
        this.p227Privadas2024 = p227Privadas2024;
    }

    public Integer getP227Hospitalizada2024() {
        return p227Hospitalizada2024;
    }

    public void setP227Hospitalizada2024(Integer p227Hospitalizada2024) {
        this.p227Hospitalizada2024 = p227Hospitalizada2024;
    }

    public Integer getP227Estado2024() {
        return p227Estado2024;
    }

    public void setP227Estado2024(Integer p227Estado2024) {
        this.p227Estado2024 = p227Estado2024;
    }

    public Integer getP227Privadas2025() {
        return p227Privadas2025;
    }

    public void setP227Privadas2025(Integer p227Privadas2025) {
        this.p227Privadas2025 = p227Privadas2025;
    }

    public Integer getP227Hospitalizada2025() {
        return p227Hospitalizada2025;
    }

    public void setP227Hospitalizada2025(Integer p227Hospitalizada2025) {
        this.p227Hospitalizada2025 = p227Hospitalizada2025;
    }

    public Integer getP227Estado2025() {
        return p227Estado2025;
    }

    public void setP227Estado2025(Integer p227Estado2025) {
        this.p227Estado2025 = p227Estado2025;
    }

    public Integer getP2282023Detenidos() {
        return p2282023Detenidos;
    }

    public void setP2282023Detenidos(Integer p2282023Detenidos) {
        this.p2282023Detenidos = p2282023Detenidos;
    }

    public Integer getP2282023Hospitali() {
        return p2282023Hospitali;
    }

    public void setP2282023Hospitali(Integer p2282023Hospitali) {
        this.p2282023Hospitali = p2282023Hospitali;
    }

    public Integer getP2282023Mujeres() {
        return p2282023Mujeres;
    }

    public void setP2282023Mujeres(Integer p2282023Mujeres) {
        this.p2282023Mujeres = p2282023Mujeres;
    }

    public Integer getP2282023Estado() {
        return p2282023Estado;
    }

    public void setP2282023Estado(Integer p2282023Estado) {
        this.p2282023Estado = p2282023Estado;
    }

    public Integer getP2282024Detenidos() {
        return p2282024Detenidos;
    }

    public void setP2282024Detenidos(Integer p2282024Detenidos) {
        this.p2282024Detenidos = p2282024Detenidos;
    }

    public Integer getP2282024Hospitali() {
        return p2282024Hospitali;
    }

    public void setP2282024Hospitali(Integer p2282024Hospitali) {
        this.p2282024Hospitali = p2282024Hospitali;
    }

    public Integer getP2282024Mujeres() {
        return p2282024Mujeres;
    }

    public void setP2282024Mujeres(Integer p2282024Mujeres) {
        this.p2282024Mujeres = p2282024Mujeres;
    }

    public Integer getP2282024Estado() {
        return p2282024Estado;
    }

    public void setP2282024Estado(Integer p2282024Estado) {
        this.p2282024Estado = p2282024Estado;
    }

    public Integer getP2282025Detenidos() {
        return p2282025Detenidos;
    }

    public void setP2282025Detenidos(Integer p2282025Detenidos) {
        this.p2282025Detenidos = p2282025Detenidos;
    }

    public Integer getP2282025Hospitali() {
        return p2282025Hospitali;
    }

    public void setP2282025Hospitali(Integer p2282025Hospitali) {
        this.p2282025Hospitali = p2282025Hospitali;
    }

    public Integer getP2282025Mujeres() {
        return p2282025Mujeres;
    }

    public void setP2282025Mujeres(Integer p2282025Mujeres) {
        this.p2282025Mujeres = p2282025Mujeres;
    }

    public Integer getP2282025Estado() {
        return p2282025Estado;
    }

    public void setP2282025Estado(Integer p2282025Estado) {
        this.p2282025Estado = p2282025Estado;
    }

    public Integer getP2292023Ubicados() {
        return p2292023Ubicados;
    }

    public void setP2292023Ubicados(Integer p2292023Ubicados) {
        this.p2292023Ubicados = p2292023Ubicados;
    }

    public Integer getP2292023Repatriados() {
        return p2292023Repatriados;
    }

    public void setP2292023Repatriados(Integer p2292023Repatriados) {
        this.p2292023Repatriados = p2292023Repatriados;
    }

    public Integer getP2292023Extradiciones() {
        return p2292023Extradiciones;
    }

    public void setP2292023Extradiciones(Integer p2292023Extradiciones) {
        this.p2292023Extradiciones = p2292023Extradiciones;
    }

    public Integer getP2292023Restos() {
        return p2292023Restos;
    }

    public void setP2292023Restos(Integer p2292023Restos) {
        this.p2292023Restos = p2292023Restos;
    }

    public Integer getP2292024Ubicados() {
        return p2292024Ubicados;
    }

    public void setP2292024Ubicados(Integer p2292024Ubicados) {
        this.p2292024Ubicados = p2292024Ubicados;
    }

    public Integer getP2292024Repatriados() {
        return p2292024Repatriados;
    }

    public void setP2292024Repatriados(Integer p2292024Repatriados) {
        this.p2292024Repatriados = p2292024Repatriados;
    }

    public Integer getP2292024Extradiciones() {
        return p2292024Extradiciones;
    }

    public void setP2292024Extradiciones(Integer p2292024Extradiciones) {
        this.p2292024Extradiciones = p2292024Extradiciones;
    }

    public Integer getP2292024Restos() {
        return p2292024Restos;
    }

    public void setP2292024Restos(Integer p2292024Restos) {
        this.p2292024Restos = p2292024Restos;
    }

    public Integer getP2292025Ubicados() {
        return p2292025Ubicados;
    }

    public void setP2292025Ubicados(Integer p2292025Ubicados) {
        this.p2292025Ubicados = p2292025Ubicados;
    }

    public Integer getP2292025Repatriados() {
        return p2292025Repatriados;
    }

    public void setP2292025Repatriados(Integer p2292025Repatriados) {
        this.p2292025Repatriados = p2292025Repatriados;
    }

    public Integer getP2292025Extradiciones() {
        return p2292025Extradiciones;
    }

    public void setP2292025Extradiciones(Integer p2292025Extradiciones) {
        this.p2292025Extradiciones = p2292025Extradiciones;
    }

    public Integer getP2292025Restos() {
        return p2292025Restos;
    }

    public void setP2292025Restos(Integer p2292025Restos) {
        this.p2292025Restos = p2292025Restos;
    }

    public String getP2210ALogistica() {
        return p2210ALogistica;
    }

    public void setP2210ALogistica(String p2210aLogistica) {
        p2210ALogistica = p2210aLogistica;
    }

    public String getP2210AGestiones() {
        return p2210AGestiones;
    }

    public void setP2210AGestiones(String p2210aGestiones) {
        p2210AGestiones = p2210aGestiones;
    }

    public String getP2210ASuficiente() {
        return p2210ASuficiente;
    }

    public void setP2210ASuficiente(String p2210aSuficiente) {
        p2210ASuficiente = p2210aSuficiente;
    }

    public String getP2210AEspecifique() {
        return p2210AEspecifique;
    }

    public void setP2210AEspecifique(String p2210aEspecifique) {
        p2210AEspecifique = p2210aEspecifique;
    }

    public String getP2210BInfra() {
        return p2210BInfra;
    }

    public void setP2210BInfra(String p2210bInfra) {
        p2210BInfra = p2210bInfra;
    }

    public String getP2210BGestiones() {
        return p2210BGestiones;
    }

    public void setP2210BGestiones(String p2210bGestiones) {
        p2210BGestiones = p2210bGestiones;
    }

    public String getP2210BSuficiente() {
        return p2210BSuficiente;
    }

    public void setP2210BSuficiente(String p2210bSuficiente) {
        p2210BSuficiente = p2210bSuficiente;
    }

    public String getP2210BEspecifique() {
        return p2210BEspecifique;
    }

    public void setP2210BEspecifique(String p2210bEspecifique) {
        p2210BEspecifique = p2210bEspecifique;
    }

    public String getP2210CPersonal() {
        return p2210CPersonal;
    }

    public void setP2210CPersonal(String p2210cPersonal) {
        p2210CPersonal = p2210cPersonal;
    }

    public String getP2210CGestiones() {
        return p2210CGestiones;
    }

    public void setP2210CGestiones(String p2210cGestiones) {
        p2210CGestiones = p2210cGestiones;
    }

    public String getP2210CSuficiente() {
        return p2210CSuficiente;
    }

    public void setP2210CSuficiente(String p2210cSuficiente) {
        p2210CSuficiente = p2210cSuficiente;
    }

    public String getP2210CEspecifique() {
        return p2210CEspecifique;
    }

    public void setP2210CEspecifique(String p2210cEspecifique) {
        p2210CEspecifique = p2210cEspecifique;
    }

    public String getP2210DPresupuesto() {
        return p2210DPresupuesto;
    }

    public void setP2210DPresupuesto(String p2210dPresupuesto) {
        p2210DPresupuesto = p2210dPresupuesto;
    }

    public String getP2210DGestiones() {
        return p2210DGestiones;
    }

    public void setP2210DGestiones(String p2210dGestiones) {
        p2210DGestiones = p2210dGestiones;
    }

    public String getP2210DSuficiente() {
        return p2210DSuficiente;
    }

    public void setP2210DSuficiente(String p2210dSuficiente) {
        p2210DSuficiente = p2210dSuficiente;
    }

    public String getP2210DEspecifique() {
        return p2210DEspecifique;
    }

    public void setP2210DEspecifique(String p2210dEspecifique) {
        p2210DEspecifique = p2210dEspecifique;
    }

    public String getP2210EOtro() {
        return p2210EOtro;
    }

    public void setP2210EOtro(String p2210eOtro) {
        p2210EOtro = p2210eOtro;
    }

    public String getP2210EOtroDetalle() {
        return p2210EOtroDetalle;
    }

    public void setP2210EOtroDetalle(String p2210eOtroDetalle) {
        p2210EOtroDetalle = p2210eOtroDetalle;
    }

    public String getP2210EGestiones() {
        return p2210EGestiones;
    }

    public void setP2210EGestiones(String p2210eGestiones) {
        p2210EGestiones = p2210eGestiones;
    }

    public String getP2210ESuficiente() {
        return p2210ESuficiente;
    }

    public void setP2210ESuficiente(String p2210eSuficiente) {
        p2210ESuficiente = p2210eSuficiente;
    }

    public String getP2210EEspecifique() {
        return p2210EEspecifique;
    }

    public void setP2210EEspecifique(String p2210eEspecifique) {
        p2210EEspecifique = p2210eEspecifique;
    }

    public String getP2210Ninguno() {
        return p2210Ninguno;
    }

    public void setP2210Ninguno(String p2210Ninguno) {
        this.p2210Ninguno = p2210Ninguno;
    }

    public String getP2211Recibe() {
        return p2211Recibe;
    }

    public void setP2211Recibe(String p2211Recibe) {
        this.p2211Recibe = p2211Recibe;
    }

    public String getP2212Mre() {
        return p2212Mre;
    }

    public void setP2212Mre(String p2212Mre) {
        this.p2212Mre = p2212Mre;
    }

    public String getP2212Reniec() {
        return p2212Reniec;
    }

    public void setP2212Reniec(String p2212Reniec) {
        this.p2212Reniec = p2212Reniec;
    }

    public String getP2212Migraciones() {
        return p2212Migraciones;
    }

    public void setP2212Migraciones(String p2212Migraciones) {
        this.p2212Migraciones = p2212Migraciones;
    }

    public String getP2212Interpol() {
        return p2212Interpol;
    }

    public void setP2212Interpol(String p2212Interpol) {
        this.p2212Interpol = p2212Interpol;
    }

    public String getP2212Inei() {
        return p2212Inei;
    }

    public void setP2212Inei(String p2212Inei) {
        this.p2212Inei = p2212Inei;
    }

    public String getP2212Jne() {
        return p2212Jne;
    }

    public void setP2212Jne(String p2212Jne) {
        this.p2212Jne = p2212Jne;
    }

    public String getP2212Onpe() {
        return p2212Onpe;
    }

    public void setP2212Onpe(String p2212Onpe) {
        this.p2212Onpe = p2212Onpe;
    }

    public String getP2212Sunarp() {
        return p2212Sunarp;
    }

    public void setP2212Sunarp(String p2212Sunarp) {
        this.p2212Sunarp = p2212Sunarp;
    }

    public String getP2212PoderJudicial() {
        return p2212PoderJudicial;
    }

    public void setP2212PoderJudicial(String p2212PoderJudicial) {
        this.p2212PoderJudicial = p2212PoderJudicial;
    }

    public String getP2212Otros() {
        return p2212Otros;
    }

    public void setP2212Otros(String p2212Otros) {
        this.p2212Otros = p2212Otros;
    }

    public String getP2212OtrosDetalle() {
        return p2212OtrosDetalle;
    }

    public void setP2212OtrosDetalle(String p2212OtrosDetalle) {
        this.p2212OtrosDetalle = p2212OtrosDetalle;
    }

    public String getP2212Ninguno() {
        return p2212Ninguno;
    }

    public void setP2212Ninguno(String p2212Ninguno) {
        this.p2212Ninguno = p2212Ninguno;
    }

    public String getP2212NingunoDetalle() {
        return p2212NingunoDetalle;
    }

    public void setP2212NingunoDetalle(String p2212NingunoDetalle) {
        this.p2212NingunoDetalle = p2212NingunoDetalle;
    }

   

    
}