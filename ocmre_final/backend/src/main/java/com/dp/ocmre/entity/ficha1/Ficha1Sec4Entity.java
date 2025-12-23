
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
@Table(name = "MRE_FICHA_S4", schema = ESQUEMA_BD)
public class Ficha1Sec4Entity {

    @Id
    @Column(name = "ID_FICHA_S4")
    private Long idFichas4;

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

    @Column(name = "ESTADO_S4")
    private String estado_s4;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S4", length = 1)
    private String valida_s4;


        // ----- P4.1 -----
    @Column(name = "P41_CONVOCADO", length = 1)
    private String p41Convocado;


      @Column(name = "P41_FECHA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date p41Fecha;

    // ----- P4.2 -----
    @Column(name = "P42_NUM_HOMBRE", precision = 4, scale = 0)
    private Integer p42NumHombre;

    @Column(name = "P42_NUM_MUJER", precision = 4, scale = 0)
    private Integer p42NumMujer;

    // ----- P4.3 -----
    @Column(name = "P43_CIUDADANOS", precision = 3, scale = 0)
    private Integer p43Ciudadanos;

    // ----- P4.4 -----
    @Column(name = "P44_ULTIMO_ANIO", length = 1)
    private String p44UltimoAnio;

    // ----- P4.5 -----
    @Column(name = "P45_VOTANTES", length = 1)
    private String p45Votantes;

    @Column(name = "P45_CANDIDATOS", length = 1)
    private String p45Candidatos;

    @Column(name = "P45_APOYO", length = 1)
    private String p45Apoyo;

    @Column(name = "P45_ACTUALIZAR", length = 1)
    private String p45Actualizar;

    @Column(name = "P45_OTROS", length = 1)
    private String p45Otros;

    @Column(name = "P45_OTROS_DETALLE", length = 1100)
    private String p45OtrosDetalle;

    // ----- P4.6 -----
    @Column(name = "P46_CONSULADO", length = 1)
    private String p46Consulado;

    @Column(name = "P46_DETALLE", length = 500)
    private String p46Detalle;

    // ----- P4.7 -----
    @Column(name = "P47_INDICAR_CONSEJO", length = 1)
    private String p47IndicarConsejo;

    // ----- P4.8 (Matriz) -----
    @Column(name = "P48_A_LOGISTICA", length = 1)
    private String p48ALogistica;

    @Column(name = "P48_A_GESTIONES", length = 1)
    private String p48AGestiones;

    @Column(name = "P48_A_SUFICIENTE", length = 1)
    private String p48ASuficiente;

    @Column(name = "P48_A_ESPECIFIQUE", length = 500)
    private String p48AEspecifique;

    @Column(name = "P48_B_INFRA", length = 1)
    private String p48BInfra;

    @Column(name = "P48_B_GESTIONES", length = 1)
    private String p48BGestiones;

    @Column(name = "P48_B_SUFICIENTE", length = 1)
    private String p48BSuficiente;

    @Column(name = "P48_B_ESPECIFIQUE", length = 500)
    private String p48BEspecifique;

    @Column(name = "P48_C_PERSONAL", length = 1)
    private String p48CPersonal;

    @Column(name = "P48_C_GESTIONES", length = 1)
    private String p48CGestiones;

    @Column(name = "P48_C_SUFICIENTE", length = 1)
    private String p48CSuficiente;

    @Column(name = "P48_C_ESPECIFIQUE", length = 500)
    private String p48CEspecifique;

    @Column(name = "P48_D_PRESUPUESTO", length = 1)
    private String p48DPresupuesto;

    @Column(name = "P48_D_GESTIONES", length = 1)
    private String p48DGestiones;

    @Column(name = "P48_D_SUFICIENTE", length = 1)
    private String p48DSuficiente;

    @Column(name = "P48_D_ESPECIFIQUE", length = 500)
    private String p48DEspecifique;

    @Column(name = "P48_E_OTRO", length = 1)
    private String p48EOtro;

    @Column(name = "P48_E_OTRO_DETALLE", length = 300)
    private String p48EOtroDetalle;

    @Column(name = "P48_E_GESTIONES", length = 1)
    private String p48EGestiones;

    @Column(name = "P48_E_SUFICIENTE", length = 1)
    private String p48ESuficiente;

    @Column(name = "P48_E_ESPECIFIQUE", length = 500)
    private String p48EEspecifique;

    @Column(name = "P48_NINGUNO", length = 1)
    private String p48Ninguno;

    // ----- P4.9 -----
    @Column(name = "P49_RECIBE", length = 1)
    private String p49Recibe;

    // ----- P4.10 (Instituciones) -----
    @Column(name = "P410_MRE", length = 1)
    private String p410Mre;

    @Column(name = "P410_RENIEC", length = 1)
    private String p410Reniec;

    @Column(name = "P410_MIGRACIONES", length = 1)
    private String p410Migraciones;

    @Column(name = "P410_INTERPOL", length = 1)
    private String p410Interpol;

    @Column(name = "P410_INEI", length = 1)
    private String p410Inei;

    @Column(name = "P410_JNE", length = 1)
    private String p410Jne;

    @Column(name = "P410_ONPE", length = 1)
    private String p410Onpe;

    @Column(name = "P410_SUNARP", length = 1)
    private String p410Sunarp;

    @Column(name = "P410_PODER_JUDICIAL", length = 1)
    private String p410PoderJudicial;

    @Column(name = "P410_OTRO", length = 1)
    private String p410Otro;

    @Column(name = "P410_OTRO_DETALLE", length = 500)
    private String p410OtroDetalle;

    @Column(name = "P410_NINGUNA", length = 1)
    private String p410Ninguna;

    public Long getIdFichas4() {
        return idFichas4;
    }

    public void setIdFichas4(Long idFichas4) {
        this.idFichas4 = idFichas4;
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

    public String getEstado_s4() {
        return estado_s4;
    }

    public void setEstado_s4(String estado_s4) {
        this.estado_s4 = estado_s4;
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

    public String getValida_s4() {
        return valida_s4;
    }

    public void setValida_s4(String valida_s4) {
        this.valida_s4 = valida_s4;
    }

    public String getP41Convocado() {
        return p41Convocado;
    }

    public void setP41Convocado(String p41Convocado) {
        this.p41Convocado = p41Convocado;
    }

    public Date getP41Fecha() {
        return p41Fecha;
    }

    public void setP41Fecha(Date p41Fecha) {
        this.p41Fecha = p41Fecha;
    }

    public Integer getP42NumHombre() {
        return p42NumHombre;
    }

    public void setP42NumHombre(Integer p42NumHombre) {
        this.p42NumHombre = p42NumHombre;
    }

    public Integer getP42NumMujer() {
        return p42NumMujer;
    }

    public void setP42NumMujer(Integer p42NumMujer) {
        this.p42NumMujer = p42NumMujer;
    }

    public Integer getP43Ciudadanos() {
        return p43Ciudadanos;
    }

    public void setP43Ciudadanos(Integer p43Ciudadanos) {
        this.p43Ciudadanos = p43Ciudadanos;
    }

    public String getP44UltimoAnio() {
        return p44UltimoAnio;
    }

    public void setP44UltimoAnio(String p44UltimoAnio) {
        this.p44UltimoAnio = p44UltimoAnio;
    }

    public String getP45Votantes() {
        return p45Votantes;
    }

    public void setP45Votantes(String p45Votantes) {
        this.p45Votantes = p45Votantes;
    }

    public String getP45Candidatos() {
        return p45Candidatos;
    }

    public void setP45Candidatos(String p45Candidatos) {
        this.p45Candidatos = p45Candidatos;
    }

    public String getP45Apoyo() {
        return p45Apoyo;
    }

    public void setP45Apoyo(String p45Apoyo) {
        this.p45Apoyo = p45Apoyo;
    }

    public String getP45Actualizar() {
        return p45Actualizar;
    }

    public void setP45Actualizar(String p45Actualizar) {
        this.p45Actualizar = p45Actualizar;
    }

    public String getP45Otros() {
        return p45Otros;
    }

    public void setP45Otros(String p45Otros) {
        this.p45Otros = p45Otros;
    }

    public String getP45OtrosDetalle() {
        return p45OtrosDetalle;
    }

    public void setP45OtrosDetalle(String p45OtrosDetalle) {
        this.p45OtrosDetalle = p45OtrosDetalle;
    }

    public String getP46Consulado() {
        return p46Consulado;
    }

    public void setP46Consulado(String p46Consulado) {
        this.p46Consulado = p46Consulado;
    }

    public String getP46Detalle() {
        return p46Detalle;
    }

    public void setP46Detalle(String p46Detalle) {
        this.p46Detalle = p46Detalle;
    }

    public String getP47IndicarConsejo() {
        return p47IndicarConsejo;
    }

    public void setP47IndicarConsejo(String p47IndicarConsejo) {
        this.p47IndicarConsejo = p47IndicarConsejo;
    }

    public String getP48ALogistica() {
        return p48ALogistica;
    }

    public void setP48ALogistica(String p48ALogistica) {
        this.p48ALogistica = p48ALogistica;
    }

    public String getP48AGestiones() {
        return p48AGestiones;
    }

    public void setP48AGestiones(String p48AGestiones) {
        this.p48AGestiones = p48AGestiones;
    }

    public String getP48ASuficiente() {
        return p48ASuficiente;
    }

    public void setP48ASuficiente(String p48ASuficiente) {
        this.p48ASuficiente = p48ASuficiente;
    }

    public String getP48AEspecifique() {
        return p48AEspecifique;
    }

    public void setP48AEspecifique(String p48AEspecifique) {
        this.p48AEspecifique = p48AEspecifique;
    }

    public String getP48BInfra() {
        return p48BInfra;
    }

    public void setP48BInfra(String p48BInfra) {
        this.p48BInfra = p48BInfra;
    }

    public String getP48BGestiones() {
        return p48BGestiones;
    }

    public void setP48BGestiones(String p48BGestiones) {
        this.p48BGestiones = p48BGestiones;
    }

    public String getP48BSuficiente() {
        return p48BSuficiente;
    }

    public void setP48BSuficiente(String p48BSuficiente) {
        this.p48BSuficiente = p48BSuficiente;
    }

    public String getP48BEspecifique() {
        return p48BEspecifique;
    }

    public void setP48BEspecifique(String p48BEspecifique) {
        this.p48BEspecifique = p48BEspecifique;
    }

    public String getP48CPersonal() {
        return p48CPersonal;
    }

    public void setP48CPersonal(String p48CPersonal) {
        this.p48CPersonal = p48CPersonal;
    }

    public String getP48CGestiones() {
        return p48CGestiones;
    }

    public void setP48CGestiones(String p48CGestiones) {
        this.p48CGestiones = p48CGestiones;
    }

    public String getP48CSuficiente() {
        return p48CSuficiente;
    }

    public void setP48CSuficiente(String p48CSuficiente) {
        this.p48CSuficiente = p48CSuficiente;
    }

    public String getP48CEspecifique() {
        return p48CEspecifique;
    }

    public void setP48CEspecifique(String p48CEspecifique) {
        this.p48CEspecifique = p48CEspecifique;
    }

    public String getP48DPresupuesto() {
        return p48DPresupuesto;
    }

    public void setP48DPresupuesto(String p48DPresupuesto) {
        this.p48DPresupuesto = p48DPresupuesto;
    }

    public String getP48DGestiones() {
        return p48DGestiones;
    }

    public void setP48DGestiones(String p48DGestiones) {
        this.p48DGestiones = p48DGestiones;
    }

    public String getP48DSuficiente() {
        return p48DSuficiente;
    }

    public void setP48DSuficiente(String p48DSuficiente) {
        this.p48DSuficiente = p48DSuficiente;
    }

    public String getP48DEspecifique() {
        return p48DEspecifique;
    }

    public void setP48DEspecifique(String p48DEspecifique) {
        this.p48DEspecifique = p48DEspecifique;
    }

    public String getP48EOtro() {
        return p48EOtro;
    }

    public void setP48EOtro(String p48EOtro) {
        this.p48EOtro = p48EOtro;
    }

    public String getP48EOtroDetalle() {
        return p48EOtroDetalle;
    }

    public void setP48EOtroDetalle(String p48EOtroDetalle) {
        this.p48EOtroDetalle = p48EOtroDetalle;
    }

    public String getP48EGestiones() {
        return p48EGestiones;
    }

    public void setP48EGestiones(String p48EGestiones) {
        this.p48EGestiones = p48EGestiones;
    }

    public String getP48ESuficiente() {
        return p48ESuficiente;
    }

    public void setP48ESuficiente(String p48ESuficiente) {
        this.p48ESuficiente = p48ESuficiente;
    }

    public String getP48EEspecifique() {
        return p48EEspecifique;
    }

    public void setP48EEspecifique(String p48EEspecifique) {
        this.p48EEspecifique = p48EEspecifique;
    }

    public String getP48Ninguno() {
        return p48Ninguno;
    }

    public void setP48Ninguno(String p48Ninguno) {
        this.p48Ninguno = p48Ninguno;
    }

    public String getP49Recibe() {
        return p49Recibe;
    }

    public void setP49Recibe(String p49Recibe) {
        this.p49Recibe = p49Recibe;
    }

    public String getP410Mre() {
        return p410Mre;
    }

    public void setP410Mre(String p410Mre) {
        this.p410Mre = p410Mre;
    }

    public String getP410Reniec() {
        return p410Reniec;
    }

    public void setP410Reniec(String p410Reniec) {
        this.p410Reniec = p410Reniec;
    }

    public String getP410Migraciones() {
        return p410Migraciones;
    }

    public void setP410Migraciones(String p410Migraciones) {
        this.p410Migraciones = p410Migraciones;
    }

    public String getP410Interpol() {
        return p410Interpol;
    }

    public void setP410Interpol(String p410Interpol) {
        this.p410Interpol = p410Interpol;
    }

    public String getP410Inei() {
        return p410Inei;
    }

    public void setP410Inei(String p410Inei) {
        this.p410Inei = p410Inei;
    }

    public String getP410Jne() {
        return p410Jne;
    }

    public void setP410Jne(String p410Jne) {
        this.p410Jne = p410Jne;
    }

    public String getP410Onpe() {
        return p410Onpe;
    }

    public void setP410Onpe(String p410Onpe) {
        this.p410Onpe = p410Onpe;
    }

    public String getP410Sunarp() {
        return p410Sunarp;
    }

    public void setP410Sunarp(String p410Sunarp) {
        this.p410Sunarp = p410Sunarp;
    }

    public String getP410PoderJudicial() {
        return p410PoderJudicial;
    }

    public void setP410PoderJudicial(String p410PoderJudicial) {
        this.p410PoderJudicial = p410PoderJudicial;
    }

    public String getP410Otro() {
        return p410Otro;
    }

    public void setP410Otro(String p410Otro) {
        this.p410Otro = p410Otro;
    }

    public String getP410OtroDetalle() {
        return p410OtroDetalle;
    }

    public void setP410OtroDetalle(String p410OtroDetalle) {
        this.p410OtroDetalle = p410OtroDetalle;
    }

    public String getP410Ninguna() {
        return p410Ninguna;
    }

    public void setP410Ninguna(String p410Ninguna) {
        this.p410Ninguna = p410Ninguna;
    }


    
    

}