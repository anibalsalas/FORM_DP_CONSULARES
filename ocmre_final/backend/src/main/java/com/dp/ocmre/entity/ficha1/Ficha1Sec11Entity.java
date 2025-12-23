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
@Table(name = "MRE_FICHA_S11", schema = ESQUEMA_BD)
public class Ficha1Sec11Entity {

    @Id
    @Column(name = "ID_FICHA_S11")
    private Long idFichas11;

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

    @Column(name = "ESTADO_S11")
    private String estado_s11;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S11", length = 1)
    private String valida_s11;


     // --- SECCIÓN P11.1 (Cantidades Totales) ---
    
    @Column(name = "P111_CANTIDAD_2016", precision = 6, scale = 0)
    private Integer p111Cantidad2016;

    @Column(name = "P111_CANTIDAD_2021", precision = 6, scale = 0)
    private Integer p111Cantidad2021;

    // --- SECCIÓN P11.2 (Desglose por año y tipo de capacitación) ---

    // -- 2016 --
    @Column(name = "P112_2016_NUMERO", precision = 6, scale = 0)
    private Integer p1122016Numero;

    @Column(name = "P112_2016_PRIMERA", precision = 6, scale = 0)
    private Integer p1122016Primera;

    @Column(name = "P112_2016_SEGUNDA", precision = 6, scale = 0)
    private Integer p1122016Segunda;

    @Column(name = "P112_2016_PORCENTAJE", precision = 3, scale = 0)
    private Integer p1122016Porcentaje; // % de participantes capacitados

    @Column(name = "P112_2016_PRIMERA1", precision = 3, scale = 0)
    private Integer p1122016PrimeraPorc; // % de primera vez

    @Column(name = "P112_2016_SEGUNDA1", precision = 3, scale = 0)
    private Integer p1122016SegundaPorc; // % de segunda vez o más

    // -- 2021 --
    @Column(name = "P112_2021_NUMERO", precision = 6, scale = 0)
    private Integer p1122021Numero;

    @Column(name = "P112_2021_PRIMERA", precision = 6, scale = 0)
    private Integer p1122021Primera;

    @Column(name = "P112_2021_SEGUNDA", precision = 6, scale = 0)
    private Integer p1122021Segunda;

    @Column(name = "P112_2021_PORCENTAJE", precision = 3, scale = 0)
    private Integer p1122021Porcentaje;

    @Column(name = "P112_2021_PRIMERA1", precision = 3, scale = 0)
    private Integer p1122021PrimeraPorc;

    @Column(name = "P112_2021_SEGUNDA1", precision = 3, scale = 0)
    private Integer p1122021SegundaPorc;

    // --- SECCIÓN P11.3 (Tipos de Actividades) ---
    
    @Column(name = "P113_ACTIVIDADES", length = 1)
    private String p113Actividades;

    @Column(name = "P113_DIFUSION", length = 1)
    private String p113Difusion;

    @Column(name = "P113_NO", length = 1)
    private String p113No;

    @Column(name = "P113_OTRO", length = 1)
    private String p113Otro;

    @Column(name = "P113_OTRO_DETALLE", length = 500)
    private String p113OtroDetalle;

    // --- SECCIÓN P11.4 (Factores Limitantes) ---
    
    // -- Logística --
    @Column(name = "P114_A_LOGISTICA", length = 1)
    private String p114ALogistica;

    @Column(name = "P114_A_GESTIONES", length = 1)
    private String p114AGestiones;

    @Column(name = "P114_A_SUFICIENTE", length = 1)
    private String p114ASuficiente;

    @Column(name = "P114_A_ESPECIFIQUE", length = 500)
    private String p114AEspecifique;

    // -- Infraestructura --
    @Column(name = "P114_B_INFRA", length = 1)
    private String p114BInfra;

    @Column(name = "P114_B_GESTIONES", length = 1)
    private String p114BGestiones;

    @Column(name = "P114_B_SUFICIENTE", length = 1)
    private String p114BSuficiente;

    @Column(name = "P114_B_ESPECIFIQUE", length = 500)
    private String p114BEspecifique;

    // -- Personal --
    @Column(name = "P114_C_PERSONAL", length = 1)
    private String p114CPersonal;

    @Column(name = "P114_C_GESTIONES", length = 1)
    private String p114CGestiones;

    @Column(name = "P114_C_SUFICIENTE", length = 1)
    private String p114CSuficiente;

    @Column(name = "P114_C_ESPECIFIQUE", length = 500)
    private String p114CEspecifique;

    // -- Presupuesto --
    @Column(name = "P114_D_PRESUPUESTO", length = 1)
    private String p114DPresupuesto;

    @Column(name = "P114_D_GESTIONES", length = 1)
    private String p114DGestiones;

    @Column(name = "P114_D_SUFICIENTE", length = 1)
    private String p114DSuficiente;

    @Column(name = "P114_D_ESPECIFIQUE", length = 500)
    private String p114DEspecifique;

    // -- Otro Factor --
    @Column(name = "P114_E_OTRO", length = 1)
    private String p114EOtro;

    @Column(name = "P114_E_OTRO_DETALLE", length = 500)
    private String p114EOtroDetalle;

    @Column(name = "P114_E_GESTIONES", length = 1)
    private String p114EGestiones;

    @Column(name = "P114_E_SUFICIENTE", length = 1)
    private String p114ESuficiente;

    @Column(name = "P114_E_ESPECIFIQUE", length = 500)
    private String p114EEspecifique;

    @Column(name = "P114_NINGUNO", length = 1)
    private String p114Ninguno;

    // --- SECCIÓN P11.5 y P11.6 (Información y Entidades) ---
    
    @Column(name = "P115_RECIBE", length = 1)
    private String p115Recibe;

    // Entidades con las que coordina
    @Column(name = "P116_MRE", length = 1)
    private String p116MRE;

    @Column(name = "P116_RENIEC", length = 1)
    private String p116RENIEC;

    @Column(name = "P116_MIGRACIONES", length = 1)
    private String p116MIGRACIONES;

    @Column(name = "P116_INTERPOL", length = 1)
    private String p116INTERPOL;

    @Column(name = "P116_INEI", length = 1)
    private String p116INEI;

    @Column(name = "P116_JNE", length = 1)
    private String p116JNE;

    @Column(name = "P116_ONPE", length = 1)
    private String p116ONPE;

    @Column(name = "P116_SUNARP", length = 1)
    private String p116SUNARP;

    @Column(name = "P116_PODER_JUDICIAL", length = 1)
    private String p116PoderJudicial;

    @Column(name = "P116_OTRO", length = 1)
    private String p116Otro;

    @Column(name = "P116_OTRO_DETALLE", length = 500)
    private String p116OtroDetalle;

    @Column(name = "P116_NINGUNA", length = 1)
    private String p116Ninguna;
    
    // ========== GETTERS Y SETTERS ==========

    public Long getIdFichas11() {
        return idFichas11;
    }

    public void setIdFichas11(Long idFichas11) {
        this.idFichas11 = idFichas11;
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

    public String getEstado_s11() {
        return estado_s11;
    }

    public void setEstado_s11(String estado_s11) {
        this.estado_s11 = estado_s11;
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

    public String getValida_s11() {
        return valida_s11;
    }

    public void setValida_s11(String valida_s11) {
        this.valida_s11 = valida_s11;
    }

    public Integer getP111Cantidad2016() {
        return p111Cantidad2016;
    }

    public void setP111Cantidad2016(Integer p111Cantidad2016) {
        this.p111Cantidad2016 = p111Cantidad2016;
    }

    public Integer getP111Cantidad2021() {
        return p111Cantidad2021;
    }

    public void setP111Cantidad2021(Integer p111Cantidad2021) {
        this.p111Cantidad2021 = p111Cantidad2021;
    }

    public Integer getP1122016Numero() {
        return p1122016Numero;
    }

    public void setP1122016Numero(Integer p1122016Numero) {
        this.p1122016Numero = p1122016Numero;
    }

    public Integer getP1122016Primera() {
        return p1122016Primera;
    }

    public void setP1122016Primera(Integer p1122016Primera) {
        this.p1122016Primera = p1122016Primera;
    }

    public Integer getP1122016Segunda() {
        return p1122016Segunda;
    }

    public void setP1122016Segunda(Integer p1122016Segunda) {
        this.p1122016Segunda = p1122016Segunda;
    }

    public Integer getP1122016Porcentaje() {
        return p1122016Porcentaje;
    }

    public void setP1122016Porcentaje(Integer p1122016Porcentaje) {
        this.p1122016Porcentaje = p1122016Porcentaje;
    }

    public Integer getP1122016PrimeraPorc() {
        return p1122016PrimeraPorc;
    }

    public void setP1122016PrimeraPorc(Integer p1122016PrimeraPorc) {
        this.p1122016PrimeraPorc = p1122016PrimeraPorc;
    }

    public Integer getP1122016SegundaPorc() {
        return p1122016SegundaPorc;
    }

    public void setP1122016SegundaPorc(Integer p1122016SegundaPorc) {
        this.p1122016SegundaPorc = p1122016SegundaPorc;
    }

    public Integer getP1122021Numero() {
        return p1122021Numero;
    }

    public void setP1122021Numero(Integer p1122021Numero) {
        this.p1122021Numero = p1122021Numero;
    }

    public Integer getP1122021Primera() {
        return p1122021Primera;
    }

    public void setP1122021Primera(Integer p1122021Primera) {
        this.p1122021Primera = p1122021Primera;
    }

    public Integer getP1122021Segunda() {
        return p1122021Segunda;
    }

    public void setP1122021Segunda(Integer p1122021Segunda) {
        this.p1122021Segunda = p1122021Segunda;
    }

    public Integer getP1122021Porcentaje() {
        return p1122021Porcentaje;
    }

    public void setP1122021Porcentaje(Integer p1122021Porcentaje) {
        this.p1122021Porcentaje = p1122021Porcentaje;
    }

    public Integer getP1122021PrimeraPorc() {
        return p1122021PrimeraPorc;
    }

    public void setP1122021PrimeraPorc(Integer p1122021PrimeraPorc) {
        this.p1122021PrimeraPorc = p1122021PrimeraPorc;
    }

    public Integer getP1122021SegundaPorc() {
        return p1122021SegundaPorc;
    }

    public void setP1122021SegundaPorc(Integer p1122021SegundaPorc) {
        this.p1122021SegundaPorc = p1122021SegundaPorc;
    }

    public String getP113Actividades() {
        return p113Actividades;
    }

    public void setP113Actividades(String p113Actividades) {
        this.p113Actividades = p113Actividades;
    }

    public String getP113Difusion() {
        return p113Difusion;
    }

    public void setP113Difusion(String p113Difusion) {
        this.p113Difusion = p113Difusion;
    }

    public String getP113No() {
        return p113No;
    }

    public void setP113No(String p113No) {
        this.p113No = p113No;
    }

    public String getP113Otro() {
        return p113Otro;
    }

    public void setP113Otro(String p113Otro) {
        this.p113Otro = p113Otro;
    }

    public String getP113OtroDetalle() {
        return p113OtroDetalle;
    }

    public void setP113OtroDetalle(String p113OtroDetalle) {
        this.p113OtroDetalle = p113OtroDetalle;
    }

    public String getP114ALogistica() {
        return p114ALogistica;
    }

    public void setP114ALogistica(String p114ALogistica) {
        this.p114ALogistica = p114ALogistica;
    }

    public String getP114AGestiones() {
        return p114AGestiones;
    }

    public void setP114AGestiones(String p114AGestiones) {
        this.p114AGestiones = p114AGestiones;
    }

    public String getP114ASuficiente() {
        return p114ASuficiente;
    }

    public void setP114ASuficiente(String p114ASuficiente) {
        this.p114ASuficiente = p114ASuficiente;
    }

    public String getP114AEspecifique() {
        return p114AEspecifique;
    }

    public void setP114AEspecifique(String p114AEspecifique) {
        this.p114AEspecifique = p114AEspecifique;
    }

    public String getP114BInfra() {
        return p114BInfra;
    }

    public void setP114BInfra(String p114BInfra) {
        this.p114BInfra = p114BInfra;
    }

    public String getP114BGestiones() {
        return p114BGestiones;
    }

    public void setP114BGestiones(String p114BGestiones) {
        this.p114BGestiones = p114BGestiones;
    }

    public String getP114BSuficiente() {
        return p114BSuficiente;
    }

    public void setP114BSuficiente(String p114BSuficiente) {
        this.p114BSuficiente = p114BSuficiente;
    }

    public String getP114BEspecifique() {
        return p114BEspecifique;
    }

    public void setP114BEspecifique(String p114BEspecifique) {
        this.p114BEspecifique = p114BEspecifique;
    }

    public String getP114CPersonal() {
        return p114CPersonal;
    }

    public void setP114CPersonal(String p114CPersonal) {
        this.p114CPersonal = p114CPersonal;
    }

    public String getP114CGestiones() {
        return p114CGestiones;
    }

    public void setP114CGestiones(String p114CGestiones) {
        this.p114CGestiones = p114CGestiones;
    }

    public String getP114CSuficiente() {
        return p114CSuficiente;
    }

    public void setP114CSuficiente(String p114CSuficiente) {
        this.p114CSuficiente = p114CSuficiente;
    }

    public String getP114CEspecifique() {
        return p114CEspecifique;
    }

    public void setP114CEspecifique(String p114CEspecifique) {
        this.p114CEspecifique = p114CEspecifique;
    }

    public String getP114DPresupuesto() {
        return p114DPresupuesto;
    }

    public void setP114DPresupuesto(String p114DPresupuesto) {
        this.p114DPresupuesto = p114DPresupuesto;
    }

    public String getP114DGestiones() {
        return p114DGestiones;
    }

    public void setP114DGestiones(String p114DGestiones) {
        this.p114DGestiones = p114DGestiones;
    }

    public String getP114DSuficiente() {
        return p114DSuficiente;
    }

    public void setP114DSuficiente(String p114DSuficiente) {
        this.p114DSuficiente = p114DSuficiente;
    }

    public String getP114DEspecifique() {
        return p114DEspecifique;
    }

    public void setP114DEspecifique(String p114DEspecifique) {
        this.p114DEspecifique = p114DEspecifique;
    }

    public String getP114EOtro() {
        return p114EOtro;
    }

    public void setP114EOtro(String p114EOtro) {
        this.p114EOtro = p114EOtro;
    }

    public String getP114EOtroDetalle() {
        return p114EOtroDetalle;
    }

    public void setP114EOtroDetalle(String p114EOtroDetalle) {
        this.p114EOtroDetalle = p114EOtroDetalle;
    }

    public String getP114EGestiones() {
        return p114EGestiones;
    }

    public void setP114EGestiones(String p114EGestiones) {
        this.p114EGestiones = p114EGestiones;
    }

    public String getP114ESuficiente() {
        return p114ESuficiente;
    }

    public void setP114ESuficiente(String p114ESuficiente) {
        this.p114ESuficiente = p114ESuficiente;
    }

    public String getP114EEspecifique() {
        return p114EEspecifique;
    }

    public void setP114EEspecifique(String p114EEspecifique) {
        this.p114EEspecifique = p114EEspecifique;
    }

    public String getP114Ninguno() {
        return p114Ninguno;
    }

    public void setP114Ninguno(String p114Ninguno) {
        this.p114Ninguno = p114Ninguno;
    }

    public String getP115Recibe() {
        return p115Recibe;
    }

    public void setP115Recibe(String p115Recibe) {
        this.p115Recibe = p115Recibe;
    }

    public String getP116MRE() {
        return p116MRE;
    }

    public void setP116MRE(String p116MRE) {
        this.p116MRE = p116MRE;
    }

    public String getP116RENIEC() {
        return p116RENIEC;
    }

    public void setP116RENIEC(String p116RENIEC) {
        this.p116RENIEC = p116RENIEC;
    }

    public String getP116MIGRACIONES() {
        return p116MIGRACIONES;
    }

    public void setP116MIGRACIONES(String p116MIGRACIONES) {
        this.p116MIGRACIONES = p116MIGRACIONES;
    }

    public String getP116INTERPOL() {
        return p116INTERPOL;
    }

    public void setP116INTERPOL(String p116INTERPOL) {
        this.p116INTERPOL = p116INTERPOL;
    }

    public String getP116INEI() {
        return p116INEI;
    }

    public void setP116INEI(String p116INEI) {
        this.p116INEI = p116INEI;
    }

    public String getP116JNE() {
        return p116JNE;
    }

    public void setP116JNE(String p116JNE) {
        this.p116JNE = p116JNE;
    }

    public String getP116ONPE() {
        return p116ONPE;
    }

    public void setP116ONPE(String p116ONPE) {
        this.p116ONPE = p116ONPE;
    }

    public String getP116SUNARP() {
        return p116SUNARP;
    }

    public void setP116SUNARP(String p116SUNARP) {
        this.p116SUNARP = p116SUNARP;
    }

    public String getP116PoderJudicial() {
        return p116PoderJudicial;
    }

    public void setP116PoderJudicial(String p116PoderJudicial) {
        this.p116PoderJudicial = p116PoderJudicial;
    }

    public String getP116Otro() {
        return p116Otro;
    }

    public void setP116Otro(String p116Otro) {
        this.p116Otro = p116Otro;
    }

    public String getP116OtroDetalle() {
        return p116OtroDetalle;
    }

    public void setP116OtroDetalle(String p116OtroDetalle) {
        this.p116OtroDetalle = p116OtroDetalle;
    }

    public String getP116Ninguna() {
        return p116Ninguna;
    }

    public void setP116Ninguna(String p116Ninguna) {
        this.p116Ninguna = p116Ninguna;
    }

    
}