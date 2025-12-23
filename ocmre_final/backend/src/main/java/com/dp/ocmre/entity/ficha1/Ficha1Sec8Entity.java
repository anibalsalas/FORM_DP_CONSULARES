
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
@Table(name = "MRE_FICHA_S8", schema = ESQUEMA_BD)
public class Ficha1Sec8Entity {

    @Id
    @Column(name = "ID_FICHA_S8")
    private Long idFichas8;

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

    @Column(name = "ESTADO_S8")
    private String estado_s8;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S8", length = 1)
    private String valida_s8;

     // =========================================================
    // Campos Específicos de la Sección 8
    // =========================================================

    @Column(name = "P81_REQUIERE", length = 1) // CHAR(1 BYTE)
    private String p81Requiere;

    @Column(name = "P82_AFIRMATIVA", length = 1) // CHAR(1 BYTE)
    private String p82Afirmativa;

    @Column(name = "P83_OFICINA", length = 1) // CHAR(1 BYTE)
    private String p83Oficina;

    @Column(name = "P83_PROCEDIMIENTO_2023") // NUMBER(4,0)
    private Integer p83Procedimiento2023;

    @Column(name = "P83_PROCEDIMIENTO_2024") // NUMBER(4,0)
    private Integer p83Procedimiento2024;

    @Column(name = "P83_PROCEDIMIENTO_2025") // NUMBER(4,0)
    private Integer p83Procedimiento2025;

    @Column(name = "P83_ASUNTOS", length = 500) // VARCHAR2(500 BYTE)
    private String p83Asuntos;

    // --- Campos P8.4 (Conteo de Servicios - NUMBER(4,0)) ---

    @Column(name = "P84_AUTORIZACION_2023")
    private Integer p84Autorizacion2023;

    @Column(name = "P84_AUTORIZACION_2024")
    private Integer p84Autorizacion2024;

    @Column(name = "P84_AUTORIZACION_2025")
    private Integer p84Autorizacion2025;

    @Column(name = "P84_CERTIFICADOS_2023")
    private Integer p84Certificados2023;

    @Column(name = "P84_CERTIFICADOS_2024")
    private Integer p84Certificados2024;

    @Column(name = "P84_CERTIFICADOS_2025")
    private Integer p84Certificados2025;

    @Column(name = "P84_LEGALIZACION_2023")
    private Integer p84Legalizacion2023;

    @Column(name = "P84_LEGALIZACION_2024")
    private Integer p84Legalizacion2024;

    @Column(name = "P84_LEGALIZACION_2025")
    private Integer p84Legalizacion2025;

    @Column(name = "P84_COPIAS_2023")
    private Integer p84Copias2023;

    @Column(name = "P84_COPIAS_2024")
    private Integer p84Copias2024;

    @Column(name = "P84_COPIAS_2025")
    private Integer p84Copias2025;

    @Column(name = "P84_PODERES_2023")
    private Integer p84Poderes2023;

    @Column(name = "P84_PODERES_2024")
    private Integer p84Poderes2024;

    @Column(name = "P84_PODERES_2025")
    private Integer p84Poderes2025;

    @Column(name = "P84_ESCRITURA_2023")
    private Integer p84Escritura2023;

    @Column(name = "P84_ESCRITURA_2024")
    private Integer p84Escritura2024;

    @Column(name = "P84_ESCRITURA_2025")
    private Integer p84Escritura2025;

    @Column(name = "P84_TESTAMENTOS_2023")
    private Integer p84Testamentos2023;

    @Column(name = "P84_TESTAMENTOS_2024")
    private Integer p84Testamentos2024;

    @Column(name = "P84_TESTAMENTOS_2025")
    private Integer p84Testamentos2025;

    // --- Otros campos P8 ---

    @Column(name = "P85_CUENTA", length = 1) // CHAR(1 BYTE)
    private String p85Cuenta;

    @Column(name = "P86_FUNCIONARIO", length = 1) // CHAR(1 BYTE)
    private String p86Funcionario;

    @Column(name = "P87_ESPECIFIQUE_DOC", length = 1) // CHAR(1 BYTE)
    private String p87EspecifiqueDoc;


    @Column(name = "P88_AFIRMATICA")
    @Temporal(TemporalType.DATE)
    private Date p88Afirmatica;

    // --- Campos P8.9 (Limitaciones) ---

    @Column(name = "P89_A_LOGISTICA", length = 1)
    private String p89ALogistica;

    @Column(name = "P89_A_GESTIONES", length = 1)
    private String p89AGestiones;

    @Column(name = "P89_A_SUFICIENTE", length = 1)
    private String p89ASuficiente;

    @Column(name = "P89_A_ESPECIFIQUE", length = 500)
    private String p89AEspecifique;

    @Column(name = "P89_B_INFRA", length = 1)
    private String p89BInfra;

    @Column(name = "P89_B_GESTIONES", length = 1)
    private String p89BGestiones;

    @Column(name = "P89_B_SUFICIENTE", length = 1)
    private String p89BSuficiente;

    @Column(name = "P89_B_ESPECIFIQUE", length = 500)
    private String p89BEspecifique;

    @Column(name = "P89_C_PERSONAL", length = 1)
    private String p89CPersonal;

    @Column(name = "P89_C_GESTIONES", length = 1)
    private String p89CGestiones;

    @Column(name = "P89_C_SUFICIENTE", length = 1)
    private String p89CSuficiente;

    @Column(name = "P89_C_ESPECIFIQUE", length = 500)
    private String p89CEspecifique;

    @Column(name = "P89_D_PRESUPUESTO", length = 1)
    private String p89DPresupuesto;

    @Column(name = "P89_D_GESTIONES", length = 1)
    private String p89DGestiones;

    @Column(name = "P89_D_SUFICIENTE", length = 1)
    private String p89DSuficiente;

    @Column(name = "P89_D_ESPECIFIQUE", length = 500)
    private String p89DEspecifique;

    @Column(name = "P89_E_OTRO", length = 1)
    private String p89EOtro;

    @Column(name = "P89_E_OTRO_DETALE", length = 300) // Cuidado: el nombre de la DB es 'DETALE' (sin L final)
    private String p89EOtroDetale;

    @Column(name = "P89_E_GESTIONES", length = 1)
    private String p89EGestiones;

    @Column(name = "P89_E_SUFICIENTE", length = 1)
    private String p89ESuficiente;

    @Column(name = "P89_E_ESPECIFIQUE", length = 500)
    private String p89EEspecifique;

    @Column(name = "P89_NINGUNO", length = 1) // Cuidado: el nombre de la DB es 'NIGUNO' (sin N)
    private String p89Ninguno; // Se mapea el nombre de la columna tal cual viene

    // --- Campos P8.10 y P8.11 (Colaboración) ---

    @Column(name = "P810_RECIBE", length = 1)
    private String p810Recibe;

    @Column(name = "P811_MRE", length = 1)
    private String p811Mre;

    @Column(name = "P811_RENIEC", length = 1)
    private String p811Reniec;

    @Column(name = "P811_MIGRACIONES", length = 1)
    private String p811Migraciones;

    @Column(name = "P811_INTERPOL", length = 1)
    private String p811Interpol;

    @Column(name = "P811_INEI", length = 1)
    private String p811Inei;

    @Column(name = "P811_JNE", length = 1)
    private String p811Jne;

    @Column(name = "P811_ONPE", length = 1)
    private String p811Onpe;

    @Column(name = "P811_SUNARP", length = 1)
    private String p811Sunarp;

    @Column(name = "P811_PODER_JUDICIAL", length = 1)
    private String p811PoderJudicial;

    @Column(name = "P811_OTRO", length = 1)
    private String p811Otro;

    @Column(name = "P811_OTRO_DETALLE", length = 500)
    private String p811OtroDetalle;

    @Column(name = "P811_NINGUNA", length = 1)
    private String p811Ninguna;


     @Column(name = "P8DOC_A", length = 1)
    private String p87DocA;

     @Column(name = "P8DOC_B", length = 1)
    private String p87DocB;

     @Column(name = "P8DOC_C", length = 1)
    private String p87DocC;

    public Long getIdFichas8() {
        return idFichas8;
    }

    public void setIdFichas8(Long idFichas8) {
        this.idFichas8 = idFichas8;
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

    public String getEstado_s8() {
        return estado_s8;
    }

    public void setEstado_s8(String estado_s8) {
        this.estado_s8 = estado_s8;
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

    public String getValida_s8() {
        return valida_s8;
    }

    public void setValida_s8(String valida_s8) {
        this.valida_s8 = valida_s8;
    }

    public String getP81Requiere() {
        return p81Requiere;
    }

    public void setP81Requiere(String p81Requiere) {
        this.p81Requiere = p81Requiere;
    }

    public String getP82Afirmativa() {
        return p82Afirmativa;
    }

    public void setP82Afirmativa(String p82Afirmativa) {
        this.p82Afirmativa = p82Afirmativa;
    }

    public String getP83Oficina() {
        return p83Oficina;
    }

    public void setP83Oficina(String p83Oficina) {
        this.p83Oficina = p83Oficina;
    }

    public Integer getP83Procedimiento2023() {
        return p83Procedimiento2023;
    }

    public void setP83Procedimiento2023(Integer p83Procedimiento2023) {
        this.p83Procedimiento2023 = p83Procedimiento2023;
    }

    public Integer getP83Procedimiento2024() {
        return p83Procedimiento2024;
    }

    public void setP83Procedimiento2024(Integer p83Procedimiento2024) {
        this.p83Procedimiento2024 = p83Procedimiento2024;
    }

    public Integer getP83Procedimiento2025() {
        return p83Procedimiento2025;
    }

    public void setP83Procedimiento2025(Integer p83Procedimiento2025) {
        this.p83Procedimiento2025 = p83Procedimiento2025;
    }

    public String getP83Asuntos() {
        return p83Asuntos;
    }

    public void setP83Asuntos(String p83Asuntos) {
        this.p83Asuntos = p83Asuntos;
    }

    public Integer getP84Autorizacion2023() {
        return p84Autorizacion2023;
    }

    public void setP84Autorizacion2023(Integer p84Autorizacion2023) {
        this.p84Autorizacion2023 = p84Autorizacion2023;
    }

    public Integer getP84Autorizacion2024() {
        return p84Autorizacion2024;
    }

    public void setP84Autorizacion2024(Integer p84Autorizacion2024) {
        this.p84Autorizacion2024 = p84Autorizacion2024;
    }

    public Integer getP84Autorizacion2025() {
        return p84Autorizacion2025;
    }

    public void setP84Autorizacion2025(Integer p84Autorizacion2025) {
        this.p84Autorizacion2025 = p84Autorizacion2025;
    }

    public Integer getP84Certificados2023() {
        return p84Certificados2023;
    }

    public void setP84Certificados2023(Integer p84Certificados2023) {
        this.p84Certificados2023 = p84Certificados2023;
    }

    public Integer getP84Certificados2024() {
        return p84Certificados2024;
    }

    public void setP84Certificados2024(Integer p84Certificados2024) {
        this.p84Certificados2024 = p84Certificados2024;
    }

    public Integer getP84Certificados2025() {
        return p84Certificados2025;
    }

    public void setP84Certificados2025(Integer p84Certificados2025) {
        this.p84Certificados2025 = p84Certificados2025;
    }

    public Integer getP84Legalizacion2023() {
        return p84Legalizacion2023;
    }

    public void setP84Legalizacion2023(Integer p84Legalizacion2023) {
        this.p84Legalizacion2023 = p84Legalizacion2023;
    }

    public Integer getP84Legalizacion2024() {
        return p84Legalizacion2024;
    }

    public void setP84Legalizacion2024(Integer p84Legalizacion2024) {
        this.p84Legalizacion2024 = p84Legalizacion2024;
    }

    public Integer getP84Legalizacion2025() {
        return p84Legalizacion2025;
    }

    public void setP84Legalizacion2025(Integer p84Legalizacion2025) {
        this.p84Legalizacion2025 = p84Legalizacion2025;
    }

    public Integer getP84Copias2023() {
        return p84Copias2023;
    }

    public void setP84Copias2023(Integer p84Copias2023) {
        this.p84Copias2023 = p84Copias2023;
    }

    public Integer getP84Copias2024() {
        return p84Copias2024;
    }

    public void setP84Copias2024(Integer p84Copias2024) {
        this.p84Copias2024 = p84Copias2024;
    }

    public Integer getP84Copias2025() {
        return p84Copias2025;
    }

    public void setP84Copias2025(Integer p84Copias2025) {
        this.p84Copias2025 = p84Copias2025;
    }

    public Integer getP84Poderes2023() {
        return p84Poderes2023;
    }

    public void setP84Poderes2023(Integer p84Poderes2023) {
        this.p84Poderes2023 = p84Poderes2023;
    }

    public Integer getP84Poderes2024() {
        return p84Poderes2024;
    }

    public void setP84Poderes2024(Integer p84Poderes2024) {
        this.p84Poderes2024 = p84Poderes2024;
    }

    public Integer getP84Poderes2025() {
        return p84Poderes2025;
    }

    public void setP84Poderes2025(Integer p84Poderes2025) {
        this.p84Poderes2025 = p84Poderes2025;
    }

    public Integer getP84Escritura2023() {
        return p84Escritura2023;
    }

    public void setP84Escritura2023(Integer p84Escritura2023) {
        this.p84Escritura2023 = p84Escritura2023;
    }

    public Integer getP84Escritura2024() {
        return p84Escritura2024;
    }

    public void setP84Escritura2024(Integer p84Escritura2024) {
        this.p84Escritura2024 = p84Escritura2024;
    }

    public Integer getP84Escritura2025() {
        return p84Escritura2025;
    }

    public void setP84Escritura2025(Integer p84Escritura2025) {
        this.p84Escritura2025 = p84Escritura2025;
    }

    public Integer getP84Testamentos2023() {
        return p84Testamentos2023;
    }

    public void setP84Testamentos2023(Integer p84Testamentos2023) {
        this.p84Testamentos2023 = p84Testamentos2023;
    }

    public Integer getP84Testamentos2024() {
        return p84Testamentos2024;
    }

    public void setP84Testamentos2024(Integer p84Testamentos2024) {
        this.p84Testamentos2024 = p84Testamentos2024;
    }

    public Integer getP84Testamentos2025() {
        return p84Testamentos2025;
    }

    public void setP84Testamentos2025(Integer p84Testamentos2025) {
        this.p84Testamentos2025 = p84Testamentos2025;
    }

    public String getP85Cuenta() {
        return p85Cuenta;
    }

    public void setP85Cuenta(String p85Cuenta) {
        this.p85Cuenta = p85Cuenta;
    }

    public String getP86Funcionario() {
        return p86Funcionario;
    }

    public void setP86Funcionario(String p86Funcionario) {
        this.p86Funcionario = p86Funcionario;
    }

    public String getP87EspecifiqueDoc() {
        return p87EspecifiqueDoc;
    }

    public void setP87EspecifiqueDoc(String p87EspecifiqueDoc) {
        this.p87EspecifiqueDoc = p87EspecifiqueDoc;
    }

    public Date getP88Afirmatica() {
        return p88Afirmatica;
    }

    public void setP88Afirmatica(Date p88Afirmatica) {
        this.p88Afirmatica = p88Afirmatica;
    }

    public String getP89ALogistica() {
        return p89ALogistica;
    }

    public void setP89ALogistica(String p89ALogistica) {
        this.p89ALogistica = p89ALogistica;
    }

    public String getP89AGestiones() {
        return p89AGestiones;
    }

    public void setP89AGestiones(String p89AGestiones) {
        this.p89AGestiones = p89AGestiones;
    }

    public String getP89ASuficiente() {
        return p89ASuficiente;
    }

    public void setP89ASuficiente(String p89ASuficiente) {
        this.p89ASuficiente = p89ASuficiente;
    }

    public String getP89AEspecifique() {
        return p89AEspecifique;
    }

    public void setP89AEspecifique(String p89AEspecifique) {
        this.p89AEspecifique = p89AEspecifique;
    }

    public String getP89BInfra() {
        return p89BInfra;
    }

    public void setP89BInfra(String p89BInfra) {
        this.p89BInfra = p89BInfra;
    }

    public String getP89BGestiones() {
        return p89BGestiones;
    }

    public void setP89BGestiones(String p89BGestiones) {
        this.p89BGestiones = p89BGestiones;
    }

    public String getP89BSuficiente() {
        return p89BSuficiente;
    }

    public void setP89BSuficiente(String p89BSuficiente) {
        this.p89BSuficiente = p89BSuficiente;
    }

    public String getP89BEspecifique() {
        return p89BEspecifique;
    }

    public void setP89BEspecifique(String p89BEspecifique) {
        this.p89BEspecifique = p89BEspecifique;
    }

    public String getP89CPersonal() {
        return p89CPersonal;
    }

    public void setP89CPersonal(String p89CPersonal) {
        this.p89CPersonal = p89CPersonal;
    }

    public String getP89CGestiones() {
        return p89CGestiones;
    }

    public void setP89CGestiones(String p89CGestiones) {
        this.p89CGestiones = p89CGestiones;
    }

    public String getP89CSuficiente() {
        return p89CSuficiente;
    }

    public void setP89CSuficiente(String p89CSuficiente) {
        this.p89CSuficiente = p89CSuficiente;
    }

    public String getP89CEspecifique() {
        return p89CEspecifique;
    }

    public void setP89CEspecifique(String p89CEspecifique) {
        this.p89CEspecifique = p89CEspecifique;
    }

    public String getP89DPresupuesto() {
        return p89DPresupuesto;
    }

    public void setP89DPresupuesto(String p89DPresupuesto) {
        this.p89DPresupuesto = p89DPresupuesto;
    }

    public String getP89DGestiones() {
        return p89DGestiones;
    }

    public void setP89DGestiones(String p89DGestiones) {
        this.p89DGestiones = p89DGestiones;
    }

    public String getP89DSuficiente() {
        return p89DSuficiente;
    }

    public void setP89DSuficiente(String p89DSuficiente) {
        this.p89DSuficiente = p89DSuficiente;
    }

    public String getP89DEspecifique() {
        return p89DEspecifique;
    }

    public void setP89DEspecifique(String p89DEspecifique) {
        this.p89DEspecifique = p89DEspecifique;
    }

    public String getP89EOtro() {
        return p89EOtro;
    }

    public void setP89EOtro(String p89EOtro) {
        this.p89EOtro = p89EOtro;
    }

    public String getP89EOtroDetale() {
        return p89EOtroDetale;
    }

    public void setP89EOtroDetale(String p89EOtroDetale) {
        this.p89EOtroDetale = p89EOtroDetale;
    }

    public String getP89EGestiones() {
        return p89EGestiones;
    }

    public void setP89EGestiones(String p89EGestiones) {
        this.p89EGestiones = p89EGestiones;
    }

    public String getP89ESuficiente() {
        return p89ESuficiente;
    }

    public void setP89ESuficiente(String p89ESuficiente) {
        this.p89ESuficiente = p89ESuficiente;
    }

    public String getP89EEspecifique() {
        return p89EEspecifique;
    }

    public void setP89EEspecifique(String p89EEspecifique) {
        this.p89EEspecifique = p89EEspecifique;
    }

    public String getP89Ninguno() {
        return p89Ninguno;
    }

    public void setP89Ninguno(String p89Ninguno) {
        this.p89Ninguno = p89Ninguno;
    }

    public String getP810Recibe() {
        return p810Recibe;
    }

    public void setP810Recibe(String p810Recibe) {
        this.p810Recibe = p810Recibe;
    }

    public String getP811Mre() {
        return p811Mre;
    }

    public void setP811Mre(String p811Mre) {
        this.p811Mre = p811Mre;
    }

    public String getP811Reniec() {
        return p811Reniec;
    }

    public void setP811Reniec(String p811Reniec) {
        this.p811Reniec = p811Reniec;
    }

    public String getP811Migraciones() {
        return p811Migraciones;
    }

    public void setP811Migraciones(String p811Migraciones) {
        this.p811Migraciones = p811Migraciones;
    }

    public String getP811Interpol() {
        return p811Interpol;
    }

    public void setP811Interpol(String p811Interpol) {
        this.p811Interpol = p811Interpol;
    }

    public String getP811Inei() {
        return p811Inei;
    }

    public void setP811Inei(String p811Inei) {
        this.p811Inei = p811Inei;
    }

    public String getP811Jne() {
        return p811Jne;
    }

    public void setP811Jne(String p811Jne) {
        this.p811Jne = p811Jne;
    }

    public String getP811Onpe() {
        return p811Onpe;
    }

    public void setP811Onpe(String p811Onpe) {
        this.p811Onpe = p811Onpe;
    }

    public String getP811Sunarp() {
        return p811Sunarp;
    }

    public void setP811Sunarp(String p811Sunarp) {
        this.p811Sunarp = p811Sunarp;
    }

    public String getP811PoderJudicial() {
        return p811PoderJudicial;
    }

    public void setP811PoderJudicial(String p811PoderJudicial) {
        this.p811PoderJudicial = p811PoderJudicial;
    }

    public String getP811Otro() {
        return p811Otro;
    }

    public void setP811Otro(String p811Otro) {
        this.p811Otro = p811Otro;
    }

    public String getP811OtroDetalle() {
        return p811OtroDetalle;
    }

    public void setP811OtroDetalle(String p811OtroDetalle) {
        this.p811OtroDetalle = p811OtroDetalle;
    }

    public String getP811Ninguna() {
        return p811Ninguna;
    }

    public void setP811Ninguna(String p811Ninguna) {
        this.p811Ninguna = p811Ninguna;
    }

    public String getP87DocA() {
        return p87DocA;
    }

    public void setP87DocA(String p87DocA) {
        this.p87DocA = p87DocA;
    }

    public String getP87DocB() {
        return p87DocB;
    }

    public void setP87DocB(String p87DocB) {
        this.p87DocB = p87DocB;
    }

    public String getP87DocC() {
        return p87DocC;
    }

    public void setP87DocC(String p87DocC) {
        this.p87DocC = p87DocC;
    }


    

}