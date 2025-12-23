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
@Table(name = "MRE_FICHA_S1", schema = ESQUEMA_BD)
public class Ficha1Sec1Entity {

    @Id
    @Column(name = "ID_FICHA_S1")
    private Long idFichas1;

    @Column(name = "ID_FICHA")
    private Long idFicha;

    @Column(name = "USU_REGISTRO", length = 18)
    private String usuRegistro;

    @Column(name = "FCH_REGISTRO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fchRegistro;

    @Column(name = "FCH_ACTUALIZA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fchActualiza;

    @Column(name = "USU_ACTUALIZA", length = 18)
    private String usuActualiza;

    @Column(name = "ESTADO_S1", length = 1)
    private String estado_s1;

    @Column(name = "VALIDA_S1", length = 1)
    private String valida_s1;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;




     // =========================================================================
    // 1.1.1 Población peruana registrada (NUEVA ESTRUCTURA DE CUADRÍCULA)
    // =========================================================================

    // Fila: Hombres
    @Column(name = "P111_HOMBRES_0_12")
    private Integer p111Hombres012;
    @Column(name = "P111_HOMBRES_13_17")
    private Integer p111Hombres1317;
    @Column(name = "P111_HOMBRES_18_64")
    private Integer p111Hombres1864;
    @Column(name = "P111_HOMBRES_65_MAS")
    private Integer p111Hombres65Mas;
    @Column(name = "P111_HOMBRES_DESCONOCE")
    private String p111HombresDesconoce;

    // Fila: Hombres con discapacidad
    @Column(name = "P111_HOMB_DISCAP_0_12")
    private Integer p111HombDiscap012;
    @Column(name = "P111_HOMB_DISCAP_13_17")
    private Integer p111HombDiscap1317;
    @Column(name = "P111_HOMB_DISCAP_18_64")
    private Integer p111HombDiscap1864;
    @Column(name = "P111_HOMB_DISCAP_65_MAS")
    private Integer p111HombDiscap65Mas;
    @Column(name = "P111_HOMB_DISCAP_DESCONOCE")
    private String p111HombDiscapDesconoce;

    // Fila: Mujeres
    @Column(name = "P111_MUJERES_0_12")
    private Integer p111Mujeres012;
    @Column(name = "P111_MUJERES_13_17")
    private Integer p111Mujeres1317;
    @Column(name = "P111_MUJERES_18_64")
    private Integer p111Mujeres1864;
    @Column(name = "P111_MUJERES_65_MAS")
    private Integer p111Mujeres65Mas;
    @Column(name = "P111_MUJERES_DESCONOCE")
    private String p111MujeresDesconoce;

    // Fila: Mujeres con discapacidad
    @Column(name = "P111_MUJ_DISCAP_0_12")
    private Integer p111MujDiscap012;
    @Column(name = "P111_MUJ_DISCAP_13_17")
    private Integer p111MujDiscap1317;
    @Column(name = "P111_MUJ_DISCAP_18_64")
    private Integer p111MujDiscap1864;
    @Column(name = "P111_MUJ_DISCAP_65_MAS")
    private Integer p111MujDiscap65Mas;
    @Column(name = "P111_MUJ_DISCAP_DESCONOCE")
    private String p111MujDiscapDesconoce;
    
    // Fila: Total
    @Column(name = "P111_TOTAL_0_12")
    private Integer p111Total012;
    @Column(name = "P111_TOTAL_13_17")
    private Integer p111Total1317;
    @Column(name = "P111_TOTAL_18_64")
    private Integer p111Total1864;
    @Column(name = "P111_TOTAL_65_MAS")
    private Integer p111Total65Mas;
    @Column(name = "P111_TOTAL_DESCONOCE")
    private Integer p111TotalDesconoce;
    
    // =========================================================================
    // RESTO DE LOS CAMPOS (SIN CAMBIOS)
    // =========================================================================
  
    @Column(name = "P112_FECHA_ACT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date p112FechaAct;

    // 1.1.3 Porcentaje estimado no inscrito
    @Column(name = "P113_PORC_NO_INSC", precision = 5, scale = 2)
    private BigDecimal p113PorcNoInsc;

    // 1.1.4 Certificados de Matrícula Consular
    @Column(name = "P114_CERT_2022")
    private Integer p114Cert2022;
    @Column(name = "P114_CERT_2023")
    private Integer p114Cert2023;
    @Column(name = "P114_CERT_2024")
    private Integer p114Cert2024;
    @Column(name = "P114_CERT_2025")
    private Integer p114Cert2025;

    // 1.1.5 Necesidades de la Oficina Consular
    @Column(name = "P115_NEC_LOGISTICA", length = 1)
    private String p115NecLogistica;
    @Column(name = "P115_LOG_GESTION", length = 1)
    private String p115LogGestion;
    @Column(name = "P115_LOG_SUFICIENTE", length = 1)
    private String p115LogSuficiente;
    @Column(name = "P115_LOG_OBSERVACIONES", length = 500)
    private String p115LogObservaciones;

    @Column(name = "P115_NEC_INFRAESTRUCTURA", length = 1)
    private String p115NecInfraestructura;
    @Column(name = "P115_INF_GESTION", length = 1)
    private String p115InfGestion;
    @Column(name = "P115_INF_SUFICIENTE", length = 1)
    private String p115InfSuficiente;
    @Column(name = "P115_INF_OBSERVACIONES", length = 500)
    private String p115InfObservaciones;

    @Column(name = "P115_NEC_PERSONAL", length = 1)
    private String p115NecPersonal;
    @Column(name = "P115_PER_GESTION", length = 1)
    private String p115PerGestion;
    @Column(name = "P115_PER_SUFICIENTE", length = 1)
    private String p115PerSuficiente;
    @Column(name = "P115_PER_OBSERVACIONES", length = 500)
    private String p115PerObservaciones;

    @Column(name = "P115_NEC_PRESUPUESTO", length = 1)
    private String p115NecPresupuesto;
    @Column(name = "P115_PRE_GESTION", length = 1)
    private String p115PreGestion;
    @Column(name = "P115_PRE_SUFICIENTE", length = 1)
    private String p115PreSuficiente;
    @Column(name = "P115_PRE_OBSERVACIONES", length = 500)
    private String p115PreObservaciones;

    @Column(name = "P115_NEC_OTRO", length = 1)
    private String p115NecOtro;
    @Column(name = "P115_OTR_ESPECIFIQUE", length = 200)
    private String p115OtrEspecifique;
    @Column(name = "P115_OTR_GESTION", length = 1)
    private String p115OtrGestion;
    @Column(name = "P115_OTR_SUFICIENTE", length = 1)
    private String p115OtrSuficiente;
    @Column(name = "P115_OTR_OBSERVACIONES", length = 500)
    private String p115OtrObservaciones;

    @Column(name = "P115_NEC_NINGUNO", length = 1)
    private String p115NecNinguno;

    // 1.1.6 Capacitaciones
    @Column(name = "P116_RECIBE_CAPAC", length = 1)
    private String p116RecibeCapac;



 @Column(name = "P117A", length = 1)
    private String p117a;

    @Column(name = "P117B", length = 1)
    private String p117b;

    @Column(name = "P117C", length = 1)
    private String p117c;

    @Column(name = "P117D", length = 1)
    private String p117d;

    @Column(name = "P117E", length = 1)
    private String p117e;

    @Column(name = "P117F", length = 1)
    private String p117f;

    @Column(name = "P117G", length = 1)
    private String p117g;

    @Column(name = "P117H", length = 1)
    private String p117h;

    @Column(name = "P117I", length = 1)
    private String p117i;

    @Column(name = "P117J", length = 1)
    private String p117j;

    @Column(name = "P117JOTRO", length = 200)
    private String p117jotro;

    @Column(name = "P117K", length = 1)
    private String p117k;

    public Long getIdFichas1() {
        return idFichas1;
    }

    public void setIdFichas1(Long idFichas1) {
        this.idFichas1 = idFichas1;
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

    public Date getFchActualiza() {
        return fchActualiza;
    }

    public void setFchActualiza(Date fchActualiza) {
        this.fchActualiza = fchActualiza;
    }

    public String getUsuActualiza() {
        return usuActualiza;
    }

    public void setUsuActualiza(String usuActualiza) {
        this.usuActualiza = usuActualiza;
    }

    public String getEstado_s1() {
        return estado_s1;
    }

    public void setEstado_s1(String estado_s1) {
        this.estado_s1 = estado_s1;
    }

    public String getValida_s1() {
        return valida_s1;
    }

    public void setValida_s1(String valida_s1) {
        this.valida_s1 = valida_s1;
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

    public Integer getP111Hombres012() {
        return p111Hombres012;
    }

    public void setP111Hombres012(Integer p111Hombres012) {
        this.p111Hombres012 = p111Hombres012;
    }

    public Integer getP111Hombres1317() {
        return p111Hombres1317;
    }

    public void setP111Hombres1317(Integer p111Hombres1317) {
        this.p111Hombres1317 = p111Hombres1317;
    }

    public Integer getP111Hombres1864() {
        return p111Hombres1864;
    }

    public void setP111Hombres1864(Integer p111Hombres1864) {
        this.p111Hombres1864 = p111Hombres1864;
    }

    public Integer getP111Hombres65Mas() {
        return p111Hombres65Mas;
    }

    public void setP111Hombres65Mas(Integer p111Hombres65Mas) {
        this.p111Hombres65Mas = p111Hombres65Mas;
    }

    public String getP111HombresDesconoce() {
        return p111HombresDesconoce;
    }

    public void setP111HombresDesconoce(String p111HombresDesconoce) {
        this.p111HombresDesconoce = p111HombresDesconoce;
    }

    public Integer getP111HombDiscap012() {
        return p111HombDiscap012;
    }

    public void setP111HombDiscap012(Integer p111HombDiscap012) {
        this.p111HombDiscap012 = p111HombDiscap012;
    }

    public Integer getP111HombDiscap1317() {
        return p111HombDiscap1317;
    }

    public void setP111HombDiscap1317(Integer p111HombDiscap1317) {
        this.p111HombDiscap1317 = p111HombDiscap1317;
    }

    public Integer getP111HombDiscap1864() {
        return p111HombDiscap1864;
    }

    public void setP111HombDiscap1864(Integer p111HombDiscap1864) {
        this.p111HombDiscap1864 = p111HombDiscap1864;
    }

    public Integer getP111HombDiscap65Mas() {
        return p111HombDiscap65Mas;
    }

    public void setP111HombDiscap65Mas(Integer p111HombDiscap65Mas) {
        this.p111HombDiscap65Mas = p111HombDiscap65Mas;
    }

    public String getP111HombDiscapDesconoce() {
        return p111HombDiscapDesconoce;
    }

    public void setP111HombDiscapDesconoce(String p111HombDiscapDesconoce) {
        this.p111HombDiscapDesconoce = p111HombDiscapDesconoce;
    }

    public Integer getP111Mujeres012() {
        return p111Mujeres012;
    }

    public void setP111Mujeres012(Integer p111Mujeres012) {
        this.p111Mujeres012 = p111Mujeres012;
    }

    public Integer getP111Mujeres1317() {
        return p111Mujeres1317;
    }

    public void setP111Mujeres1317(Integer p111Mujeres1317) {
        this.p111Mujeres1317 = p111Mujeres1317;
    }

    public Integer getP111Mujeres1864() {
        return p111Mujeres1864;
    }

    public void setP111Mujeres1864(Integer p111Mujeres1864) {
        this.p111Mujeres1864 = p111Mujeres1864;
    }

    public Integer getP111Mujeres65Mas() {
        return p111Mujeres65Mas;
    }

    public void setP111Mujeres65Mas(Integer p111Mujeres65Mas) {
        this.p111Mujeres65Mas = p111Mujeres65Mas;
    }

    public String getP111MujeresDesconoce() {
        return p111MujeresDesconoce;
    }

    public void setP111MujeresDesconoce(String p111MujeresDesconoce) {
        this.p111MujeresDesconoce = p111MujeresDesconoce;
    }

    public Integer getP111MujDiscap012() {
        return p111MujDiscap012;
    }

    public void setP111MujDiscap012(Integer p111MujDiscap012) {
        this.p111MujDiscap012 = p111MujDiscap012;
    }

    public Integer getP111MujDiscap1317() {
        return p111MujDiscap1317;
    }

    public void setP111MujDiscap1317(Integer p111MujDiscap1317) {
        this.p111MujDiscap1317 = p111MujDiscap1317;
    }

    public Integer getP111MujDiscap1864() {
        return p111MujDiscap1864;
    }

    public void setP111MujDiscap1864(Integer p111MujDiscap1864) {
        this.p111MujDiscap1864 = p111MujDiscap1864;
    }

    public Integer getP111MujDiscap65Mas() {
        return p111MujDiscap65Mas;
    }

    public void setP111MujDiscap65Mas(Integer p111MujDiscap65Mas) {
        this.p111MujDiscap65Mas = p111MujDiscap65Mas;
    }

    public String getP111MujDiscapDesconoce() {
        return p111MujDiscapDesconoce;
    }

    public void setP111MujDiscapDesconoce(String p111MujDiscapDesconoce) {
        this.p111MujDiscapDesconoce = p111MujDiscapDesconoce;
    }

    public Integer getP111Total012() {
        return p111Total012;
    }

    public void setP111Total012(Integer p111Total012) {
        this.p111Total012 = p111Total012;
    }

    public Integer getP111Total1317() {
        return p111Total1317;
    }

    public void setP111Total1317(Integer p111Total1317) {
        this.p111Total1317 = p111Total1317;
    }

    public Integer getP111Total1864() {
        return p111Total1864;
    }

    public void setP111Total1864(Integer p111Total1864) {
        this.p111Total1864 = p111Total1864;
    }

    public Integer getP111Total65Mas() {
        return p111Total65Mas;
    }

    public void setP111Total65Mas(Integer p111Total65Mas) {
        this.p111Total65Mas = p111Total65Mas;
    }

    public Integer getP111TotalDesconoce() {
        return p111TotalDesconoce;
    }

    public void setP111TotalDesconoce(Integer p111TotalDesconoce) {
        this.p111TotalDesconoce = p111TotalDesconoce;
    }

    public Date getP112FechaAct() {
        return p112FechaAct;
    }

    public void setP112FechaAct(Date p112FechaAct) {
        this.p112FechaAct = p112FechaAct;
    }

    public BigDecimal getP113PorcNoInsc() {
        return p113PorcNoInsc;
    }

    public void setP113PorcNoInsc(BigDecimal p113PorcNoInsc) {
        this.p113PorcNoInsc = p113PorcNoInsc;
    }

    public Integer getP114Cert2022() {
        return p114Cert2022;
    }

    public void setP114Cert2022(Integer p114Cert2022) {
        this.p114Cert2022 = p114Cert2022;
    }

    public Integer getP114Cert2023() {
        return p114Cert2023;
    }

    public void setP114Cert2023(Integer p114Cert2023) {
        this.p114Cert2023 = p114Cert2023;
    }

    public Integer getP114Cert2024() {
        return p114Cert2024;
    }

    public void setP114Cert2024(Integer p114Cert2024) {
        this.p114Cert2024 = p114Cert2024;
    }

    public Integer getP114Cert2025() {
        return p114Cert2025;
    }

    public void setP114Cert2025(Integer p114Cert2025) {
        this.p114Cert2025 = p114Cert2025;
    }

    public String getP115NecLogistica() {
        return p115NecLogistica;
    }

    public void setP115NecLogistica(String p115NecLogistica) {
        this.p115NecLogistica = p115NecLogistica;
    }

    public String getP115LogGestion() {
        return p115LogGestion;
    }

    public void setP115LogGestion(String p115LogGestion) {
        this.p115LogGestion = p115LogGestion;
    }

    public String getP115LogSuficiente() {
        return p115LogSuficiente;
    }

    public void setP115LogSuficiente(String p115LogSuficiente) {
        this.p115LogSuficiente = p115LogSuficiente;
    }

    public String getP115LogObservaciones() {
        return p115LogObservaciones;
    }

    public void setP115LogObservaciones(String p115LogObservaciones) {
        this.p115LogObservaciones = p115LogObservaciones;
    }

    public String getP115NecInfraestructura() {
        return p115NecInfraestructura;
    }

    public void setP115NecInfraestructura(String p115NecInfraestructura) {
        this.p115NecInfraestructura = p115NecInfraestructura;
    }

    public String getP115InfGestion() {
        return p115InfGestion;
    }

    public void setP115InfGestion(String p115InfGestion) {
        this.p115InfGestion = p115InfGestion;
    }

    public String getP115InfSuficiente() {
        return p115InfSuficiente;
    }

    public void setP115InfSuficiente(String p115InfSuficiente) {
        this.p115InfSuficiente = p115InfSuficiente;
    }

    public String getP115InfObservaciones() {
        return p115InfObservaciones;
    }

    public void setP115InfObservaciones(String p115InfObservaciones) {
        this.p115InfObservaciones = p115InfObservaciones;
    }

    public String getP115NecPersonal() {
        return p115NecPersonal;
    }

    public void setP115NecPersonal(String p115NecPersonal) {
        this.p115NecPersonal = p115NecPersonal;
    }

    public String getP115PerGestion() {
        return p115PerGestion;
    }

    public void setP115PerGestion(String p115PerGestion) {
        this.p115PerGestion = p115PerGestion;
    }

    public String getP115PerSuficiente() {
        return p115PerSuficiente;
    }

    public void setP115PerSuficiente(String p115PerSuficiente) {
        this.p115PerSuficiente = p115PerSuficiente;
    }

    public String getP115PerObservaciones() {
        return p115PerObservaciones;
    }

    public void setP115PerObservaciones(String p115PerObservaciones) {
        this.p115PerObservaciones = p115PerObservaciones;
    }

    public String getP115NecPresupuesto() {
        return p115NecPresupuesto;
    }

    public void setP115NecPresupuesto(String p115NecPresupuesto) {
        this.p115NecPresupuesto = p115NecPresupuesto;
    }

    public String getP115PreGestion() {
        return p115PreGestion;
    }

    public void setP115PreGestion(String p115PreGestion) {
        this.p115PreGestion = p115PreGestion;
    }

    public String getP115PreSuficiente() {
        return p115PreSuficiente;
    }

    public void setP115PreSuficiente(String p115PreSuficiente) {
        this.p115PreSuficiente = p115PreSuficiente;
    }

    public String getP115PreObservaciones() {
        return p115PreObservaciones;
    }

    public void setP115PreObservaciones(String p115PreObservaciones) {
        this.p115PreObservaciones = p115PreObservaciones;
    }

    public String getP115NecOtro() {
        return p115NecOtro;
    }

    public void setP115NecOtro(String p115NecOtro) {
        this.p115NecOtro = p115NecOtro;
    }

    public String getP115OtrEspecifique() {
        return p115OtrEspecifique;
    }

    public void setP115OtrEspecifique(String p115OtrEspecifique) {
        this.p115OtrEspecifique = p115OtrEspecifique;
    }

    public String getP115OtrGestion() {
        return p115OtrGestion;
    }

    public void setP115OtrGestion(String p115OtrGestion) {
        this.p115OtrGestion = p115OtrGestion;
    }

    public String getP115OtrSuficiente() {
        return p115OtrSuficiente;
    }

    public void setP115OtrSuficiente(String p115OtrSuficiente) {
        this.p115OtrSuficiente = p115OtrSuficiente;
    }

    public String getP115OtrObservaciones() {
        return p115OtrObservaciones;
    }

    public void setP115OtrObservaciones(String p115OtrObservaciones) {
        this.p115OtrObservaciones = p115OtrObservaciones;
    }

    public String getP115NecNinguno() {
        return p115NecNinguno;
    }

    public void setP115NecNinguno(String p115NecNinguno) {
        this.p115NecNinguno = p115NecNinguno;
    }

    public String getP116RecibeCapac() {
        return p116RecibeCapac;
    }

    public void setP116RecibeCapac(String p116RecibeCapac) {
        this.p116RecibeCapac = p116RecibeCapac;
    }

    public String getP117a() {
        return p117a;
    }

    public void setP117a(String p117a) {
        this.p117a = p117a;
    }

    public String getP117b() {
        return p117b;
    }

    public void setP117b(String p117b) {
        this.p117b = p117b;
    }

    public String getP117c() {
        return p117c;
    }

    public void setP117c(String p117c) {
        this.p117c = p117c;
    }

    public String getP117d() {
        return p117d;
    }

    public void setP117d(String p117d) {
        this.p117d = p117d;
    }

    public String getP117e() {
        return p117e;
    }

    public void setP117e(String p117e) {
        this.p117e = p117e;
    }

    public String getP117f() {
        return p117f;
    }

    public void setP117f(String p117f) {
        this.p117f = p117f;
    }

    public String getP117g() {
        return p117g;
    }

    public void setP117g(String p117g) {
        this.p117g = p117g;
    }

    public String getP117h() {
        return p117h;
    }

    public void setP117h(String p117h) {
        this.p117h = p117h;
    }

    public String getP117i() {
        return p117i;
    }

    public void setP117i(String p117i) {
        this.p117i = p117i;
    }

    public String getP117j() {
        return p117j;
    }

    public void setP117j(String p117j) {
        this.p117j = p117j;
    }

    public String getP117jotro() {
        return p117jotro;
    }

    public void setP117jotro(String p117jotro) {
        this.p117jotro = p117jotro;
    }

    public String getP117k() {
        return p117k;
    }

    public void setP117k(String p117k) {
        this.p117k = p117k;
    }


    
    
}

