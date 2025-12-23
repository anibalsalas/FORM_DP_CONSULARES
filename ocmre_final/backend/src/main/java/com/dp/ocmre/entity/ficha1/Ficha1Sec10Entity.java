package com.dp.ocmre.entity.ficha1;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;

import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Getter
@Entity
@Table(name = "MRE_FICHA_S10", schema = ESQUEMA_BD)
public class Ficha1Sec10Entity {

    @Id
    @Column(name = "ID_FICHA_S10")
    private Long idFichas10;

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

    @Column(name = "ESTADO_S10")
    private String estado_s10;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S10", length = 1)
    private String valida_s10;

    // =========================================================
    // Campos Específicos de la Sección 10
    // =========================================================

    @Column(name = "P101_REALIZO", length = 1) // CHAR(1 BYTE)
    private String p101Realizo;

    @Column(name = "P101_AFIRMATIVA") // NUMBER(3,0)
    private Integer p101Afirmativa;

    @Column(name = "P102_REALIZO", length = 1) // CHAR(1 BYTE)
    private String p102Realizo;

    @Column(name = "P102_AFIRMATIVA") // NUMBER(3,0)
    private Integer p102Afirmativa;

    @Column(name = "P103_REALIZO", length = 1) // CHAR(1 BYTE)
    private String p103Realizo;

    @Column(name = "P103_AFIRMATIVA") // NUMBER(3,0)
    private Integer p103Afirmativa;

    // --- Campos P10.4 (Documentos Recibidos) ---

    @Column(name = "P104_REGISTRO", length = 1)
    private String p104Registro;

    @Column(name = "P104_CIVIL", length = 1)
    private String p104Civil;

    @Column(name = "P104_DNI", length = 1)
    private String p104Dni;

    @Column(name = "P104_PASAPORTE", length = 1)
    private String p104Pasaporte;

    @Column(name = "P104_LEGAL", length = 1)
    private String p104Legal;

    @Column(name = "P104_AUTORIZACION", length = 1)
    private String p104Autorizacion;

    @Column(name = "P104_CERTIFICADO", length = 1)
    private String p104Certificado;

    @Column(name = "P104_PENALES", length = 1)
    private String p104Penales;

    @Column(name = "P104_POLICIAL", length = 1)
    private String p104Policial;

    @Column(name = "P104_OTRO", length = 1)
    private String p104Otro;

    @Column(name = "P104_OTRO_DETALLE", length = 1000)
    private String p104OtroDetalle;

    // --- Campos P10.5 (Conteo de Personas) ---

    @Column(name = "P105_PERSONAS_2023") // NUMBER(4,0)
    private Integer p105Personas2023;

    @Column(name = "P105_PERSONAS_2024") // NUMBER(4,0)
    private Integer p105Personas2024;

    @Column(name = "P105_PERSONAS_2025") // NUMBER(4,0)
    private Integer p105Personas2025;

    // --- Campos P10.6 (Limitaciones/Dificultades) ---

    @Column(name = "P106_A_LOGISTICA", length = 1)
    private String p106ALogistica;

    @Column(name = "P106_A_GESTIONES", length = 1)
    private String p106AGestiones;

    @Column(name = "P106_A_SUFICIENTE", length = 1)
    private String p106ASuficiente;

    @Column(name = "P106_A_ESPECIFIQUE", length = 1000)
    private String p106AEspecifique;

    @Column(name = "P106_B_INFRA", length = 1)
    private String p106BInfra;

    @Column(name = "P106_B_GESTIONES", length = 1)
    private String p106BGestiones;

    @Column(name = "P106_B_SUFICIENTE", length = 1)
    private String p106BSuficiente;

    @Column(name = "P106_B_ESPECIFIQUE", length = 1000)
    private String p106BEspecifique;

    @Column(name = "P106_C_PERSONAL", length = 1)
    private String p106CPersonal;

    @Column(name = "P106_C_GESTIONES", length = 1)
    private String p106CGestiones;

    @Column(name = "P106_C_SUFICIENTE", length = 1)
    private String p106CSuficiente;

    @Column(name = "P106_C_ESPECIFIQUE", length = 1000)
    private String p106CEspecifique;

    @Column(name = "P106_D_PRESUPUESTO", length = 1)
    private String p106DPresupuesto;

    @Column(name = "P106_D_GESTIONES", length = 1)
    private String p106DGestiones;

    @Column(name = "P106_D_SUFICIENTE", length = 1)
    private String p106DSuficiente;

    @Column(name = "P106_D_ESPECIFIQUE", length = 1000)
    private String p106DEspecifique;

    @Column(name = "P106_E_OTRO", length = 1)
    private String p106EOtro;

    @Column(name = "P106_E_OTRO_DETALLE", length = 300)
    private String p106EOtroDetalle;

    @Column(name = "P106_E_GESTIONES", length = 1)
    private String p106EGestiones;

    @Column(name = "P106_E_SUFICIENTE", length = 1)
    private String p106ESuficiente;

    @Column(name = "P106_E_ESPECIFIQUE", length = 1000)
    private String p106EEspecifique;

    @Column(name = "P106_NINGUNO", length = 1)
    private String p106Ninguno;

    // --- Campos P10.7 y P10.8 (Colaboración) ---
    
    @Column(name = "P107_RECIBE", length = 1)
    private String p107Recibe;

    @Column(name = "P108_MRE", length = 1)
    private String p108Mre;

    @Column(name = "P108_RENIEC", length = 1)
    private String p108Reniec;

    @Column(name = "P108_MIGRACIONES", length = 1)
    private String p108Migraciones;

    @Column(name = "P108_INTERPOL", length = 1)
    private String p108Interpol;

    @Column(name = "P108_INEI", length = 1)
    private String p108Inei;

    @Column(name = "P108_JNE", length = 1)
    private String p108Jne;

    @Column(name = "P108_ONPE", length = 1)
    private String p108Onpe;

    @Column(name = "P108_SUNARP", length = 1)
    private String p108Sunarp;

    @Column(name = "P108_PODER_JUDICIAL", length = 1)
    private String p108PoderJudicial;

    @Column(name = "P108_OTRO", length = 1)
    private String p108Otro;

    @Column(name = "P108_OTRO_DETALLE", length = 1000)
    private String p108OtroDetalle;

    @Column(name = "P108_NINGUNO", length = 1) 
    private String p108Ninguno;

   @Column(name = "P104_NINGUNO", length = 1) 
    private String p104Ninguno;

    // =========================================================

    public Long getIdFichas10() {
        return idFichas10;
    }

    public void setIdFichas10(Long idFichas10) {
        this.idFichas10 = idFichas10;
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

    public String getEstado_s10() {
        return estado_s10;
    }

    public void setEstado_s10(String estado_s10) {
        this.estado_s10 = estado_s10;
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

    public String getValida_s10() {
        return valida_s10;
    }

    public void setValida_s10(String valida_s10) {
        this.valida_s10 = valida_s10;
    }

    public String getP101Realizo() {
        return p101Realizo;
    }

    public void setP101Realizo(String p101Realizo) {
        this.p101Realizo = p101Realizo;
    }

    public Integer getP101Afirmativa() {
        return p101Afirmativa;
    }

    public void setP101Afirmativa(Integer p101Afirmativa) {
        this.p101Afirmativa = p101Afirmativa;
    }

    public String getP102Realizo() {
        return p102Realizo;
    }

    public void setP102Realizo(String p102Realizo) {
        this.p102Realizo = p102Realizo;
    }

    public Integer getP102Afirmativa() {
        return p102Afirmativa;
    }

    public void setP102Afirmativa(Integer p102Afirmativa) {
        this.p102Afirmativa = p102Afirmativa;
    }

    public String getP103Realizo() {
        return p103Realizo;
    }

    public void setP103Realizo(String p103Realizo) {
        this.p103Realizo = p103Realizo;
    }

    public Integer getP103Afirmativa() {
        return p103Afirmativa;
    }

    public void setP103Afirmativa(Integer p103Afirmativa) {
        this.p103Afirmativa = p103Afirmativa;
    }

    public String getP104Registro() {
        return p104Registro;
    }

    public void setP104Registro(String p104Registro) {
        this.p104Registro = p104Registro;
    }

    public String getP104Civil() {
        return p104Civil;
    }

    public void setP104Civil(String p104Civil) {
        this.p104Civil = p104Civil;
    }

    public String getP104Dni() {
        return p104Dni;
    }

    public void setP104Dni(String p104Dni) {
        this.p104Dni = p104Dni;
    }

    public String getP104Pasaporte() {
        return p104Pasaporte;
    }

    public void setP104Pasaporte(String p104Pasaporte) {
        this.p104Pasaporte = p104Pasaporte;
    }

    public String getP104Legal() {
        return p104Legal;
    }

    public void setP104Legal(String p104Legal) {
        this.p104Legal = p104Legal;
    }

    public String getP104Autorizacion() {
        return p104Autorizacion;
    }

    public void setP104Autorizacion(String p104Autorizacion) {
        this.p104Autorizacion = p104Autorizacion;
    }

    public String getP104Certificado() {
        return p104Certificado;
    }

    public void setP104Certificado(String p104Certificado) {
        this.p104Certificado = p104Certificado;
    }

    public String getP104Penales() {
        return p104Penales;
    }

    public void setP104Penales(String p104Penales) {
        this.p104Penales = p104Penales;
    }

    public String getP104Policial() {
        return p104Policial;
    }

    public void setP104Policial(String p104Policial) {
        this.p104Policial = p104Policial;
    }

    public String getP104Otro() {
        return p104Otro;
    }

    public void setP104Otro(String p104Otro) {
        this.p104Otro = p104Otro;
    }

    public String getP104OtroDetalle() {
        return p104OtroDetalle;
    }

    public void setP104OtroDetalle(String p104OtroDetalle) {
        this.p104OtroDetalle = p104OtroDetalle;
    }

    public Integer getP105Personas2023() {
        return p105Personas2023;
    }

    public void setP105Personas2023(Integer p105Personas2023) {
        this.p105Personas2023 = p105Personas2023;
    }

    public Integer getP105Personas2024() {
        return p105Personas2024;
    }

    public void setP105Personas2024(Integer p105Personas2024) {
        this.p105Personas2024 = p105Personas2024;
    }

    public Integer getP105Personas2025() {
        return p105Personas2025;
    }

    public void setP105Personas2025(Integer p105Personas2025) {
        this.p105Personas2025 = p105Personas2025;
    }

    public String getP106ALogistica() {
        return p106ALogistica;
    }

    public void setP106ALogistica(String p106ALogistica) {
        this.p106ALogistica = p106ALogistica;
    }

    public String getP106AGestiones() {
        return p106AGestiones;
    }

    public void setP106AGestiones(String p106AGestiones) {
        this.p106AGestiones = p106AGestiones;
    }

    public String getP106ASuficiente() {
        return p106ASuficiente;
    }

    public void setP106ASuficiente(String p106ASuficiente) {
        this.p106ASuficiente = p106ASuficiente;
    }

    public String getP106AEspecifique() {
        return p106AEspecifique;
    }

    public void setP106AEspecifique(String p106AEspecifique) {
        this.p106AEspecifique = p106AEspecifique;
    }

    public String getP106BInfra() {
        return p106BInfra;
    }

    public void setP106BInfra(String p106BInfra) {
        this.p106BInfra = p106BInfra;
    }

    public String getP106BGestiones() {
        return p106BGestiones;
    }

    public void setP106BGestiones(String p106BGestiones) {
        this.p106BGestiones = p106BGestiones;
    }

    public String getP106BSuficiente() {
        return p106BSuficiente;
    }

    public void setP106BSuficiente(String p106BSuficiente) {
        this.p106BSuficiente = p106BSuficiente;
    }

    public String getP106BEspecifique() {
        return p106BEspecifique;
    }

    public void setP106BEspecifique(String p106BEspecifique) {
        this.p106BEspecifique = p106BEspecifique;
    }

    public String getP106CPersonal() {
        return p106CPersonal;
    }

    public void setP106CPersonal(String p106CPersonal) {
        this.p106CPersonal = p106CPersonal;
    }

    public String getP106CGestiones() {
        return p106CGestiones;
    }

    public void setP106CGestiones(String p106CGestiones) {
        this.p106CGestiones = p106CGestiones;
    }

    public String getP106CSuficiente() {
        return p106CSuficiente;
    }

    public void setP106CSuficiente(String p106CSuficiente) {
        this.p106CSuficiente = p106CSuficiente;
    }

    public String getP106CEspecifique() {
        return p106CEspecifique;
    }

    public void setP106CEspecifique(String p106CEspecifique) {
        this.p106CEspecifique = p106CEspecifique;
    }

    public String getP106DPresupuesto() {
        return p106DPresupuesto;
    }

    public void setP106DPresupuesto(String p106DPresupuesto) {
        this.p106DPresupuesto = p106DPresupuesto;
    }

    public String getP106DGestiones() {
        return p106DGestiones;
    }

    public void setP106DGestiones(String p106DGestiones) {
        this.p106DGestiones = p106DGestiones;
    }

    public String getP106DSuficiente() {
        return p106DSuficiente;
    }

    public void setP106DSuficiente(String p106DSuficiente) {
        this.p106DSuficiente = p106DSuficiente;
    }

    public String getP106DEspecifique() {
        return p106DEspecifique;
    }

    public void setP106DEspecifique(String p106DEspecifique) {
        this.p106DEspecifique = p106DEspecifique;
    }

    public String getP106EOtro() {
        return p106EOtro;
    }

    public void setP106EOtro(String p106EOtro) {
        this.p106EOtro = p106EOtro;
    }

    public String getP106EOtroDetalle() {
        return p106EOtroDetalle;
    }

    public void setP106EOtroDetalle(String p106EOtroDetalle) {
        this.p106EOtroDetalle = p106EOtroDetalle;
    }

    public String getP106EGestiones() {
        return p106EGestiones;
    }

    public void setP106EGestiones(String p106EGestiones) {
        this.p106EGestiones = p106EGestiones;
    }

    public String getP106ESuficiente() {
        return p106ESuficiente;
    }

    public void setP106ESuficiente(String p106ESuficiente) {
        this.p106ESuficiente = p106ESuficiente;
    }

    public String getP106EEspecifique() {
        return p106EEspecifique;
    }

    public void setP106EEspecifique(String p106EEspecifique) {
        this.p106EEspecifique = p106EEspecifique;
    }

    public String getP106Ninguno() {
        return p106Ninguno;
    }

    public void setP106Ninguno(String p106Ninguno) {
        this.p106Ninguno = p106Ninguno;
    }

    public String getP107Recibe() {
        return p107Recibe;
    }

    public void setP107Recibe(String p107Recibe) {
        this.p107Recibe = p107Recibe;
    }

    public String getP108Mre() {
        return p108Mre;
    }

    public void setP108Mre(String p108Mre) {
        this.p108Mre = p108Mre;
    }

    public String getP108Reniec() {
        return p108Reniec;
    }

    public void setP108Reniec(String p108Reniec) {
        this.p108Reniec = p108Reniec;
    }

    public String getP108Migraciones() {
        return p108Migraciones;
    }

    public void setP108Migraciones(String p108Migraciones) {
        this.p108Migraciones = p108Migraciones;
    }

    public String getP108Interpol() {
        return p108Interpol;
    }

    public void setP108Interpol(String p108Interpol) {
        this.p108Interpol = p108Interpol;
    }

    public String getP108Inei() {
        return p108Inei;
    }

    public void setP108Inei(String p108Inei) {
        this.p108Inei = p108Inei;
    }

    public String getP108Jne() {
        return p108Jne;
    }

    public void setP108Jne(String p108Jne) {
        this.p108Jne = p108Jne;
    }

    public String getP108Onpe() {
        return p108Onpe;
    }

    public void setP108Onpe(String p108Onpe) {
        this.p108Onpe = p108Onpe;
    }

    public String getP108Sunarp() {
        return p108Sunarp;
    }

    public void setP108Sunarp(String p108Sunarp) {
        this.p108Sunarp = p108Sunarp;
    }

    public String getP108PoderJudicial() {
        return p108PoderJudicial;
    }

    public void setP108PoderJudicial(String p108PoderJudicial) {
        this.p108PoderJudicial = p108PoderJudicial;
    }

    public String getP108Otro() {
        return p108Otro;
    }

    public void setP108Otro(String p108Otro) {
        this.p108Otro = p108Otro;
    }

    public String getP108OtroDetalle() {
        return p108OtroDetalle;
    }

    public void setP108OtroDetalle(String p108OtroDetalle) {
        this.p108OtroDetalle = p108OtroDetalle;
    }

    public String getP108Ninguno() {
        return p108Ninguno;
    }

    public void setP108Ninguno(String p108Ninguno) {
        this.p108Ninguno = p108Ninguno;
    }

    public String getP104Ninguno() {
        return p104Ninguno;
    }

    public void setP104Ninguno(String p104Ninguno) {
        this.p104Ninguno = p104Ninguno;
    }
 
   

}