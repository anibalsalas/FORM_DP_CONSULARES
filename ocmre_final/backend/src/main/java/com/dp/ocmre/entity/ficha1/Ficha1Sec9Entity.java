
package com.dp.ocmre.entity.ficha1;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter; // Manteniendo Lombok para @Getter, aunque los setters son manuales

import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Getter
@Entity
@Table(name = "MRE_FICHA_S9", schema = ESQUEMA_BD)
public class Ficha1Sec9Entity {

    @Id
    @Column(name = "ID_FICHA_S9")
    private Long idFichas9;

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

    @Column(name = "ESTADO_S9")
    private String estado_s9;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S9", length = 1)
    private String valida_s9;

    // =========================================================
    // Campos Específicos de la Sección 9
    // =========================================================

    @Column(name = "P91_REALIZAN", length = 1) // CHAR(1 BYTE)
    private String p91Realizan;

    @Column(name = "P91_NOTIFICA_2023") // NUMBER(4,0)
    private Integer p91Notifica2023;

    @Column(name = "P91_NOTIFICA_2024") // NUMBER(4,0)
    private Integer p91Notifica2024;

    @Column(name = "P91_NOTIFICA_2025") // NUMBER(4,0)
    private Integer p91Notifica2025;

    @Column(name = "P92_EXHORTO_2023") // NUMBER(4,0)
    private Integer p92Exhorto2023;

    @Column(name = "P92_EXHORTO_2024") // NUMBER(4,0)
    private Integer p92Exhorto2024;

    @Column(name = "P92_EXHORTO_2025") // NUMBER(4,0)
    private Integer p92Exhorto2025;
    
    // --- Campos P9.3 (Limitaciones/Dificultades) ---

    @Column(name = "P93_A_LOGISTICA", length = 1)
    private String p93ALogistica;

    @Column(name = "P93_A_GESTIONES", length = 1)
    private String p93AGestiones;

    @Column(name = "P93_A_SUFICIENTE", length = 1)
    private String p93ASuficiente;

    @Column(name = "P93_A_ESPECIFIQUE", length = 500)
    private String p93AEspecifique;

    @Column(name = "P93_B_INFRA", length = 1)
    private String p93BInfra;

    @Column(name = "P93_B_GESTIONES", length = 1)
    private String p93BGestiones;

    @Column(name = "P93_B_SUFICIENTE", length = 1)
    private String p93BSuficiente;

    @Column(name = "P93_B_ESPECIFIQUE", length = 500)
    private String p93BEspecifique;

    @Column(name = "P93_C_PERSONAL", length = 1)
    private String p93CPersonal;

    @Column(name = "P93_C_GESTIONES", length = 1)
    private String p93CGestiones;

    @Column(name = "P93_C_SUFICIENTE", length = 1)
    private String p93CSuficiente;

    @Column(name = "P93_C_ESPECIFIQUE", length = 500)
    private String p93CEspecifique;

    @Column(name = "P93_D_PRESUPUESTO", length = 1)
    private String p93DPresupuesto;

    @Column(name = "P93_D_GESTIONES", length = 1)
    private String p93DGestiones;

    @Column(name = "P93_D_SUFICIENTE", length = 1)
    private String p93DSuficiente;

    @Column(name = "P93_D_ESPECIFIQUE", length = 500)
    private String p93DEspecifique;

    @Column(name = "P93_E_OTRO", length = 1)
    private String p93EOtro;

    @Column(name = "P93_E_OTRO_DETALLE", length = 300)
    private String p93EOtroDetalle;

    @Column(name = "P93_E_GESTIONES", length = 1)
    private String p93EGestiones;

    @Column(name = "P93_E_SUFICIENTE", length = 1)
    private String p93ESuficiente;

    @Column(name = "P93_E_ESPECIFIQUE", length = 500)
    private String p93EEspecifique;

    @Column(name = "P93_NINGUNO", length = 1)
    private String p93Ninguno;

    // --- Campos P9.4 y P9.5 (Colaboración) ---
    
    @Column(name = "P94_RECIBE", length = 1)
    private String p94Recibe;

    @Column(name = "P95_MRE", length = 1)
    private String p95Mre;

    @Column(name = "P95_RENIEC", length = 1)
    private String p95Reniec;

    @Column(name = "P95_MIGRACIONES", length = 1)
    private String p95Migraciones;

    @Column(name = "P95_INTERPOL", length = 1)
    private String p95Interpol;

    @Column(name = "P95_INEI", length = 1)
    private String p95Inei;

    @Column(name = "P95_JNE", length = 1)
    private String p95Jne;

    @Column(name = "P95_ONPE", length = 1)
    private String p95Onpe;

    @Column(name = "P95_SUNARP", length = 1)
    private String p95Sunarp;

    @Column(name = "P95_PODER_JUDICIAL", length = 1)
    private String p95PoderJudicial;

    @Column(name = "P95_OTRO", length = 1)
    private String p95Otro;

    @Column(name = "P95_OTRO_DETALLE", length = 500)
    private String p95OtroDetalle;

    @Column(name = "P95_NINGUNO", length = 1) 
    private String p95Ninguno;


    // ========== GETTERS Y SETTERS (EXISTENTES) ==========

    public Long getIdFichas9() {
        return idFichas9;
    }

    public void setIdFichas9(Long idFichas9) {
        this.idFichas9 = idFichas9;
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

    public String getEstado_s9() {
        return estado_s9;
    }

    public void setEstado_s9(String estado_s9) {
        this.estado_s9 = estado_s9;
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

    public String getValida_s9() {
        return valida_s9;
    }

    public void setValida_s9(String valida_s9) {
        this.valida_s9 = valida_s9;
    }
    
    // =========================================================
    // GETTERS Y SETTERS PARA LOS NUEVOS CAMPOS
    // Si usas Lombok, puedes eliminarlos y confiar en @Setter
    // =========================================================

    public String getP91Realizan() {
        return p91Realizan;
    }

    public void setP91Realizan(String p91Realizan) {
        this.p91Realizan = p91Realizan;
    }

    public Integer getP91Notifica2023() {
        return p91Notifica2023;
    }

    public void setP91Notifica2023(Integer p91Notifica2023) {
        this.p91Notifica2023 = p91Notifica2023;
    }

    public Integer getP91Notifica2024() {
        return p91Notifica2024;
    }

    public void setP91Notifica2024(Integer p91Notifica2024) {
        this.p91Notifica2024 = p91Notifica2024;
    }

    public Integer getP91Notifica2025() {
        return p91Notifica2025;
    }

    public void setP91Notifica2025(Integer p91Notifica2025) {
        this.p91Notifica2025 = p91Notifica2025;
    }

    public Integer getP92Exhorto2023() {
        return p92Exhorto2023;
    }

    public void setP92Exhorto2023(Integer p92Exhorto2023) {
        this.p92Exhorto2023 = p92Exhorto2023;
    }

    public Integer getP92Exhorto2024() {
        return p92Exhorto2024;
    }

    public void setP92Exhorto2024(Integer p92Exhorto2024) {
        this.p92Exhorto2024 = p92Exhorto2024;
    }

    public Integer getP92Exhorto2025() {
        return p92Exhorto2025;
    }

    public void setP92Exhorto2025(Integer p92Exhorto2025) {
        this.p92Exhorto2025 = p92Exhorto2025;
    }

    public String getP93ALogistica() {
        return p93ALogistica;
    }

    public void setP93ALogistica(String p93ALogistica) {
        this.p93ALogistica = p93ALogistica;
    }

    public String getP93AGestiones() {
        return p93AGestiones;
    }

    public void setP93AGestiones(String p93AGestiones) {
        this.p93AGestiones = p93AGestiones;
    }

    public String getP93ASuficiente() {
        return p93ASuficiente;
    }

    public void setP93ASuficiente(String p93ASuficiente) {
        this.p93ASuficiente = p93ASuficiente;
    }

    public String getP93AEspecifique() {
        return p93AEspecifique;
    }

    public void setP93AEspecifique(String p93AEspecifique) {
        this.p93AEspecifique = p93AEspecifique;
    }

    public String getP93BInfra() {
        return p93BInfra;
    }

    public void setP93BInfra(String p93BInfra) {
        this.p93BInfra = p93BInfra;
    }

    public String getP93BGestiones() {
        return p93BGestiones;
    }

    public void setP93BGestiones(String p93BGestiones) {
        this.p93BGestiones = p93BGestiones;
    }

    public String getP93BSuficiente() {
        return p93BSuficiente;
    }

    public void setP93BSuficiente(String p93BSuficiente) {
        this.p93BSuficiente = p93BSuficiente;
    }

    public String getP93BEspecifique() {
        return p93BEspecifique;
    }

    public void setP93BEspecifique(String p93BEspecifique) {
        this.p93BEspecifique = p93BEspecifique;
    }

    public String getP93CPersonal() {
        return p93CPersonal;
    }

    public void setP93CPersonal(String p93CPersonal) {
        this.p93CPersonal = p93CPersonal;
    }

    public String getP93CGestiones() {
        return p93CGestiones;
    }

    public void setP93CGestiones(String p93CGestiones) {
        this.p93CGestiones = p93CGestiones;
    }

    public String getP93CSuficiente() {
        return p93CSuficiente;
    }

    public void setP93CSuficiente(String p93CSuficiente) {
        this.p93CSuficiente = p93CSuficiente;
    }

    public String getP93CEspecifique() {
        return p93CEspecifique;
    }

    public void setP93CEspecifique(String p93CEspecifique) {
        this.p93CEspecifique = p93CEspecifique;
    }

    public String getP93DPresupuesto() {
        return p93DPresupuesto;
    }

    public void setP93DPresupuesto(String p93DPresupuesto) {
        this.p93DPresupuesto = p93DPresupuesto;
    }

    public String getP93DGestiones() {
        return p93DGestiones;
    }

    public void setP93DGestiones(String p93DGestiones) {
        this.p93DGestiones = p93DGestiones;
    }

    public String getP93DSuficiente() {
        return p93DSuficiente;
    }

    public void setP93DSuficiente(String p93DSuficiente) {
        this.p93DSuficiente = p93DSuficiente;
    }

    public String getP93DEspecifique() {
        return p93DEspecifique;
    }

    public void setP93DEspecifique(String p93DEspecifique) {
        this.p93DEspecifique = p93DEspecifique;
    }

    public String getP93EOtro() {
        return p93EOtro;
    }

    public void setP93EOtro(String p93EOtro) {
        this.p93EOtro = p93EOtro;
    }

    public String getP93EOtroDetalle() {
        return p93EOtroDetalle;
    }

    public void setP93EOtroDetalle(String p93EOtroDetalle) {
        this.p93EOtroDetalle = p93EOtroDetalle;
    }

    public String getP93EGestiones() {
        return p93EGestiones;
    }

    public void setP93EGestiones(String p93EGestiones) {
        this.p93EGestiones = p93EGestiones;
    }

    public String getP93ESuficiente() {
        return p93ESuficiente;
    }

    public void setP93ESuficiente(String p93ESuficiente) {
        this.p93ESuficiente = p93ESuficiente;
    }

    public String getP93EEspecifique() {
        return p93EEspecifique;
    }

    public void setP93EEspecifique(String p93EEspecifique) {
        this.p93EEspecifique = p93EEspecifique;
    }

    public String getP93Ninguno() {
        return p93Ninguno;
    }

    public void setP93Ninguno(String p93Ninguno) {
        this.p93Ninguno = p93Ninguno;
    }

    public String getP94Recibe() {
        return p94Recibe;
    }

    public void setP94Recibe(String p94Recibe) {
        this.p94Recibe = p94Recibe;
    }

    public String getP95Mre() {
        return p95Mre;
    }

    public void setP95Mre(String p95Mre) {
        this.p95Mre = p95Mre;
    }

    public String getP95Reniec() {
        return p95Reniec;
    }

    public void setP95Reniec(String p95Reniec) {
        this.p95Reniec = p95Reniec;
    }

    public String getP95Migraciones() {
        return p95Migraciones;
    }

    public void setP95Migraciones(String p95Migraciones) {
        this.p95Migraciones = p95Migraciones;
    }

    public String getP95Interpol() {
        return p95Interpol;
    }

    public void setP95Interpol(String p95Interpol) {
        this.p95Interpol = p95Interpol;
    }

    public String getP95Inei() {
        return p95Inei;
    }

    public void setP95Inei(String p95Inei) {
        this.p95Inei = p95Inei;
    }

    public String getP95Jne() {
        return p95Jne;
    }

    public void setP95Jne(String p95Jne) {
        this.p95Jne = p95Jne;
    }

    public String getP95Onpe() {
        return p95Onpe;
    }

    public void setP95Onpe(String p95Onpe) {
        this.p95Onpe = p95Onpe;
    }

    public String getP95Sunarp() {
        return p95Sunarp;
    }

    public void setP95Sunarp(String p95Sunarp) {
        this.p95Sunarp = p95Sunarp;
    }

    public String getP95PoderJudicial() {
        return p95PoderJudicial;
    }

    public void setP95PoderJudicial(String p95PoderJudicial) {
        this.p95PoderJudicial = p95PoderJudicial;
    }

    public String getP95Otro() {
        return p95Otro;
    }

    public void setP95Otro(String p95Otro) {
        this.p95Otro = p95Otro;
    }

    public String getP95OtroDetalle() {
        return p95OtroDetalle;
    }

    public void setP95OtroDetalle(String p95OtroDetalle) {
        this.p95OtroDetalle = p95OtroDetalle;
    }

    public String getP95Ninguno() {
        return p95Ninguno;
    }

    public void setP95Ninguno(String p95Ninguno) {
        this.p95Ninguno = p95Ninguno;
    }
}