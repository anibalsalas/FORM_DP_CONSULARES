
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
import lombok.Getter;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Getter
@Entity
@Table(name = "MRE_FICHA_S5", schema = ESQUEMA_BD)
public class Ficha1Sec5Entity {

    @Id
    @Column(name = "ID_FICHA_S5")
    private Long idFichas5;

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

    @Column(name = "ESTADO_S5")
    private String estado_s5;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S5", length = 1)
    private String valida_s5;

    
    // --- Campos Agregados ---
 
    @Column(name = "P511_REQUIERE", length = 1)
    private String p511Requiere;

    @Column(name = "P512_AFIRMATIVA", length = 1)
    private String p512Afirmativa;

    @Column(name = "P513_2023_NACIMIENTO")
    private Integer p513Nac2023;

    @Column(name = "P513_2023_MATRIMONIO")
    private Integer p513Mat2023;

    @Column(name = "P513_2023_DEFUNCIONES")
    private Integer p513Def2023;

    @Column(name = "P513_2024_NACIMIENTO")
    private Integer p513Nac2024;

    @Column(name = "P513_2024_MATRIMONIO")
    private Integer p513Mat2024;

    @Column(name = "P513_2024_DEFUNCIONES")
    private Integer p513Def2024;

    @Column(name = "P513_2025_NACIMIENTO")
    private Integer p513Nac2025;

    @Column(name = "P513_2025_MATRIMONIO")
    private Integer p513Mat2025;

    @Column(name = "P513_2025_DEFUNCIONES")
    private Integer p513Def2025;

    @Column(name = "P514_A_LOGISTICA", length = 1)
    private String p514aLogistica;

    @Column(name = "P514_A_GESTIONES", length = 1)
    private String p514aGestiones;

    @Column(name = "P514_A_SUFICIENTE", length = 1)
    private String p514aSuficiente;

    @Column(name = "P514_A_ESPECIFIQUE", length = 500)
    private String p514aEspecifique;

    @Column(name = "P514_B_INFRA", length = 1)
    private String p514bInfra;

    @Column(name = "P514_B_GESTIONES", length = 1)
    private String p514bGestiones;

    @Column(name = "P514_B_SUFICIENTE", length = 1)
    private String p514bSuficiente;

    @Column(name = "P514_B_ESPECIFIQUE", length = 500)
    private String p514bEspecifique;

    @Column(name = "P514_C_PERSONAL", length = 1)
    private String p514cPersonal;

    @Column(name = "P514_C_GESTIONES", length = 1)
    private String p514cGestiones;

    @Column(name = "P514_C_SUFICIENTE", length = 1)
    private String p514cSuficiente;

    @Column(name = "P514_C_ESPECIFIQUE", length = 500)
    private String p514cEspecifique;

    @Column(name = "P514_D_PRESUPUESTO", length = 1)
    private String p514dPresupuesto;

    @Column(name = "P514_D_GESTIONES", length = 1)
    private String p514dGestiones;

    @Column(name = "P514_D_SUFICIENTE", length = 1)
    private String p514dSuficiente;

    @Column(name = "P514_D_ESPECIFIQUE", length = 500)
    private String p514dEspecifique;

    @Column(name = "P514_E_OTRO", length = 1)
    private String p514eOtro;

    @Column(name = "P514_E_OTRO_DETALLE", length = 300)
    private String p514eOtroDetalle;

    @Column(name = "P514_E_GESTIONES", length = 1)
    private String p514eGestiones;

    @Column(name = "P514_E_SUFICIENTE", length = 1)
    private String p514eSuficiente;

    @Column(name = "P514_E_ESPECIFIQUE", length = 500)
    private String p514eEspecifique;

    @Column(name = "P514_NINGUNA", length = 1)
    private String p514Ninguna;

    @Column(name = "P515_RECIBE", length = 1)
    private String p515Recibe;

    @Column(name = "P516_MRE", length = 1)
    private String p516Mre;

    @Column(name = "P516_RENIEC", length = 1)
    private String p516Reniec;

    @Column(name = "P516_MIGRACIONES", length = 1)
    private String p516Migraciones;

    @Column(name = "P516_INTERPOL", length = 1)
    private String p516Interpol;

    @Column(name = "P516_INEI", length = 1)
    private String p516Inei;

    @Column(name = "P516_JNE", length = 1)
    private String p516Jne;

    @Column(name = "P516_ONPE", length = 1)
    private String p516Onpe;

    @Column(name = "P516_SUNARP", length = 1)
    private String p516Sunarp;

    @Column(name = "P516_PODER_JUDICIAL", length = 1)
    private String p516PoderJudicial;

    @Column(name = "P516_OTRO", length = 1)
    private String p516Otro;

    @Column(name = "P516_OTRO_DETALLE", length = 500)
    private String p516OtroDetalle;

    @Column(name = "P516_NINGUNA", length = 1)
    private String p516Ninguna;

    @Column(name = "P521_REQUIERE", length = 1)
    private String p521Requiere;

    @Column(name = "P522_AFIRMATIVA", length = 1)
    private String p522Afirmativa;

    @Column(name = "P523_RENIEC", length = 1)
    private String p523Reniec;

    @Column(name = "P524_MAYORES_2023")
    private Integer p524Mayores2023;

    @Column(name = "P524_MAYORES_2024")
    private Integer p524Mayores2024;

    @Column(name = "P524_MAYORES_2025")
    private Integer p524Mayores2025;

    @Column(name = "P524_MENORES_2023")
    private Integer p524Menores2023;

    @Column(name = "P524_MENORES_2024")
    private Integer p524Menores2024;

    @Column(name = "P524_MENORES_2025")
    private Integer p524Menores2025;

    @Column(name = "P524_DATOS_2023")
    private Integer p524Datos2023;

    @Column(name = "P524_DATOS_2024")
    private Integer p524Datos2024;

    @Column(name = "P524_DATOS_2025")
    private Integer p524Datos2025;

    @Column(name = "P524_RENOVACION_2023")
    private Integer p524Renovacion2023;

    @Column(name = "P524_RENOVACION_2024")
    private Integer p524Renovacion2024;

    @Column(name = "P524_RENOVACION_2025")
    private Integer p524Renovacion2025;

    @Column(name = "P524_DUPLICADO_2023")
    private Integer p524Duplicado2023;

    @Column(name = "P524_DUPLICADO_2024")
    private Integer p524Duplicado2024;

    @Column(name = "P524_DUPLICADO_2025")
    private Integer p524Duplicado2025;

    @Column(name = "P524_CANJE_2023")
    private Integer p524Canje2023;

    @Column(name = "P524_CANJE_2024")
    private Integer p524Canje2024;

    @Column(name = "P524_CANJE_2025")
    private Integer p524Canje2025;

    @Column(name = "P525_EMITE", length = 1)
    private String p525Emite;

    @Column(name = "P525_COSTO_SOL", precision = 6, scale = 2)
    private BigDecimal p525CostoSol;

    @Column(name = "P525_COSTO_USD", precision = 6, scale = 2)
    private BigDecimal p525CostoUsd;

    @Column(name = "P526_A_LOGISTICA", length = 1)
    private String p526aLogistica;

    @Column(name = "P526_A_GESTIONES", length = 1)
    private String p526aGestiones;

    @Column(name = "P526_A_SUFICIENTE", length = 1)
    private String p526aSuficiente;

    @Column(name = "P526_A_ESPECIFIQUE", length = 500)
    private String p526aEspecifique;

    @Column(name = "P526_B_INFRA", length = 1)
    private String p526bInfra;

    @Column(name = "P526_B_GESTIONES", length = 1)
    private String p526bGestiones;

    @Column(name = "P526_B_SUFICIENTE", length = 1)
    private String p526bSuficiente;

    @Column(name = "P526_B_ESPECIFIQUE", length = 500)
    private String p526bEspecifique;

    @Column(name = "P526_C_PERSONAL", length = 1)
    private String p526cPersonal;

    @Column(name = "P526_C_GESTIONES", length = 1)
    private String p526cGestiones;

    @Column(name = "P526_C_SUFICIENTE", length = 1)
    private String p526cSuficiente;

    @Column(name = "P526_C_ESPECIFIQUE", length = 500)
    private String p526cEspecifique;

    @Column(name = "P526_D_PRESUPUESTO", length = 1)
    private String p526dPresupuesto;

    @Column(name = "P526_D_GESTIONES", length = 1)
    private String p526dGestiones;

    @Column(name = "P526_D_SUFICIENTE", length = 1)
    private String p526dSuficiente;

    @Column(name = "P526_D_ESPECIFIQUE", length = 500)
    private String p526dEspecifique;

    @Column(name = "P526_E_OTRO", length = 1)
    private String p526eOtro;

    @Column(name = "P526_E_OTRO_DETALLE", length = 500)
    private String p526eOtroDetalle;

    @Column(name = "P526_E_GESTIONES", length = 1)
    private String p526eGestiones;

    @Column(name = "P526_E_SUFICIENTE", length = 1)
    private String p526eSuficiente;

    @Column(name = "P526_E_ESPECIFIQUE", length = 500)
    private String p526eEspecifique;

    @Column(name = "P526_NINGUNO", length = 1)
    private String p526Ninguno;

    @Column(name = "P527_RECIBE", length = 1)
    private String p527Recibe;
    
    @Column(name = "P528_MRE", length = 1)
    private String p528Mre;

    @Column(name = "P528_RENIEC", length = 1)
    private String p528Reniec;

    @Column(name = "P528_MIGRACIONES", length = 1)
    private String p528Migraciones;

    @Column(name = "P528_INTERPOL", length = 1)
    private String p528Interpol;

    @Column(name = "P528_INEI", length = 1)
    private String p528Inei;

    @Column(name = "P528_JNE", length = 1)
    private String p528Jne;

    @Column(name = "P528_ONPE", length = 1)
    private String p528Onpe;

    @Column(name = "P528_SUNARP", length = 1)
    private String p528Sunarp;

    @Column(name = "P528_PODER_JUDICIAL", length = 1)
    private String p528PoderJudicial;

    @Column(name = "P528_OTRO", length = 1)
    private String p528Otro;

    @Column(name = "P528_OTRO_DETALLE", length = 500)
    private String p528OtroDetalle;

    @Column(name = "P528_NINGUNA", length = 1)
    private String p528Ninguna;

    public Long getIdFichas5() {
        return idFichas5;
    }

    public void setIdFichas5(Long idFichas5) {
        this.idFichas5 = idFichas5;
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

    public String getEstado_s5() {
        return estado_s5;
    }

    public void setEstado_s5(String estado_s5) {
        this.estado_s5 = estado_s5;
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

    public String getValida_s5() {
        return valida_s5;
    }

    public void setValida_s5(String valida_s5) {
        this.valida_s5 = valida_s5;
    }

    public String getP511Requiere() {
        return p511Requiere;
    }

    public void setP511Requiere(String p511Requiere) {
        this.p511Requiere = p511Requiere;
    }

    public String getP512Afirmativa() {
        return p512Afirmativa;
    }

    public void setP512Afirmativa(String p512Afirmativa) {
        this.p512Afirmativa = p512Afirmativa;
    }

    public Integer getP513Nac2023() {
        return p513Nac2023;
    }

    public void setP513Nac2023(Integer p513Nac2023) {
        this.p513Nac2023 = p513Nac2023;
    }

    public Integer getP513Mat2023() {
        return p513Mat2023;
    }

    public void setP513Mat2023(Integer p513Mat2023) {
        this.p513Mat2023 = p513Mat2023;
    }

    public Integer getP513Def2023() {
        return p513Def2023;
    }

    public void setP513Def2023(Integer p513Def2023) {
        this.p513Def2023 = p513Def2023;
    }

    public Integer getP513Nac2024() {
        return p513Nac2024;
    }

    public void setP513Nac2024(Integer p513Nac2024) {
        this.p513Nac2024 = p513Nac2024;
    }

    public Integer getP513Mat2024() {
        return p513Mat2024;
    }

    public void setP513Mat2024(Integer p513Mat2024) {
        this.p513Mat2024 = p513Mat2024;
    }

    public Integer getP513Def2024() {
        return p513Def2024;
    }

    public void setP513Def2024(Integer p513Def2024) {
        this.p513Def2024 = p513Def2024;
    }

    public Integer getP513Nac2025() {
        return p513Nac2025;
    }

    public void setP513Nac2025(Integer p513Nac2025) {
        this.p513Nac2025 = p513Nac2025;
    }

    public Integer getP513Mat2025() {
        return p513Mat2025;
    }

    public void setP513Mat2025(Integer p513Mat2025) {
        this.p513Mat2025 = p513Mat2025;
    }

    public Integer getP513Def2025() {
        return p513Def2025;
    }

    public void setP513Def2025(Integer p513Def2025) {
        this.p513Def2025 = p513Def2025;
    }

    public String getP514aLogistica() {
        return p514aLogistica;
    }

    public void setP514aLogistica(String p514aLogistica) {
        this.p514aLogistica = p514aLogistica;
    }

    public String getP514aGestiones() {
        return p514aGestiones;
    }

    public void setP514aGestiones(String p514aGestiones) {
        this.p514aGestiones = p514aGestiones;
    }

    public String getP514aSuficiente() {
        return p514aSuficiente;
    }

    public void setP514aSuficiente(String p514aSuficiente) {
        this.p514aSuficiente = p514aSuficiente;
    }

    public String getP514aEspecifique() {
        return p514aEspecifique;
    }

    public void setP514aEspecifique(String p514aEspecifique) {
        this.p514aEspecifique = p514aEspecifique;
    }

    public String getP514bInfra() {
        return p514bInfra;
    }

    public void setP514bInfra(String p514bInfra) {
        this.p514bInfra = p514bInfra;
    }

    public String getP514bGestiones() {
        return p514bGestiones;
    }

    public void setP514bGestiones(String p514bGestiones) {
        this.p514bGestiones = p514bGestiones;
    }

    public String getP514bSuficiente() {
        return p514bSuficiente;
    }

    public void setP514bSuficiente(String p514bSuficiente) {
        this.p514bSuficiente = p514bSuficiente;
    }

    public String getP514bEspecifique() {
        return p514bEspecifique;
    }

    public void setP514bEspecifique(String p514bEspecifique) {
        this.p514bEspecifique = p514bEspecifique;
    }

    public String getP514cPersonal() {
        return p514cPersonal;
    }

    public void setP514cPersonal(String p514cPersonal) {
        this.p514cPersonal = p514cPersonal;
    }

    public String getP514cGestiones() {
        return p514cGestiones;
    }

    public void setP514cGestiones(String p514cGestiones) {
        this.p514cGestiones = p514cGestiones;
    }

    public String getP514cSuficiente() {
        return p514cSuficiente;
    }

    public void setP514cSuficiente(String p514cSuficiente) {
        this.p514cSuficiente = p514cSuficiente;
    }

    public String getP514cEspecifique() {
        return p514cEspecifique;
    }

    public void setP514cEspecifique(String p514cEspecifique) {
        this.p514cEspecifique = p514cEspecifique;
    }

    public String getP514dPresupuesto() {
        return p514dPresupuesto;
    }

    public void setP514dPresupuesto(String p514dPresupuesto) {
        this.p514dPresupuesto = p514dPresupuesto;
    }

    public String getP514dGestiones() {
        return p514dGestiones;
    }

    public void setP514dGestiones(String p514dGestiones) {
        this.p514dGestiones = p514dGestiones;
    }

    public String getP514dSuficiente() {
        return p514dSuficiente;
    }

    public void setP514dSuficiente(String p514dSuficiente) {
        this.p514dSuficiente = p514dSuficiente;
    }

    public String getP514dEspecifique() {
        return p514dEspecifique;
    }

    public void setP514dEspecifique(String p514dEspecifique) {
        this.p514dEspecifique = p514dEspecifique;
    }

    public String getP514eOtro() {
        return p514eOtro;
    }

    public void setP514eOtro(String p514eOtro) {
        this.p514eOtro = p514eOtro;
    }

    public String getP514eOtroDetalle() {
        return p514eOtroDetalle;
    }

    public void setP514eOtroDetalle(String p514eOtroDetalle) {
        this.p514eOtroDetalle = p514eOtroDetalle;
    }

    public String getP514eGestiones() {
        return p514eGestiones;
    }

    public void setP514eGestiones(String p514eGestiones) {
        this.p514eGestiones = p514eGestiones;
    }

    public String getP514eSuficiente() {
        return p514eSuficiente;
    }

    public void setP514eSuficiente(String p514eSuficiente) {
        this.p514eSuficiente = p514eSuficiente;
    }

    public String getP514eEspecifique() {
        return p514eEspecifique;
    }

    public void setP514eEspecifique(String p514eEspecifique) {
        this.p514eEspecifique = p514eEspecifique;
    }

    public String getP514Ninguna() {
        return p514Ninguna;
    }

    public void setP514Ninguna(String p514Ninguna) {
        this.p514Ninguna = p514Ninguna;
    }

    public String getP515Recibe() {
        return p515Recibe;
    }

    public void setP515Recibe(String p515Recibe) {
        this.p515Recibe = p515Recibe;
    }

    public String getP516Mre() {
        return p516Mre;
    }

    public void setP516Mre(String p516Mre) {
        this.p516Mre = p516Mre;
    }

    public String getP516Reniec() {
        return p516Reniec;
    }

    public void setP516Reniec(String p516Reniec) {
        this.p516Reniec = p516Reniec;
    }

    public String getP516Migraciones() {
        return p516Migraciones;
    }

    public void setP516Migraciones(String p516Migraciones) {
        this.p516Migraciones = p516Migraciones;
    }

    public String getP516Interpol() {
        return p516Interpol;
    }

    public void setP516Interpol(String p516Interpol) {
        this.p516Interpol = p516Interpol;
    }

    public String getP516Inei() {
        return p516Inei;
    }

    public void setP516Inei(String p516Inei) {
        this.p516Inei = p516Inei;
    }

    public String getP516Jne() {
        return p516Jne;
    }

    public void setP516Jne(String p516Jne) {
        this.p516Jne = p516Jne;
    }

    public String getP516Onpe() {
        return p516Onpe;
    }

    public void setP516Onpe(String p516Onpe) {
        this.p516Onpe = p516Onpe;
    }

    public String getP516Sunarp() {
        return p516Sunarp;
    }

    public void setP516Sunarp(String p516Sunarp) {
        this.p516Sunarp = p516Sunarp;
    }

    public String getP516PoderJudicial() {
        return p516PoderJudicial;
    }

    public void setP516PoderJudicial(String p516PoderJudicial) {
        this.p516PoderJudicial = p516PoderJudicial;
    }

    public String getP516Otro() {
        return p516Otro;
    }

    public void setP516Otro(String p516Otro) {
        this.p516Otro = p516Otro;
    }

    public String getP516OtroDetalle() {
        return p516OtroDetalle;
    }

    public void setP516OtroDetalle(String p516OtroDetalle) {
        this.p516OtroDetalle = p516OtroDetalle;
    }

    public String getP516Ninguna() {
        return p516Ninguna;
    }

    public void setP516Ninguna(String p516Ninguna) {
        this.p516Ninguna = p516Ninguna;
    }

    public String getP521Requiere() {
        return p521Requiere;
    }

    public void setP521Requiere(String p521Requiere) {
        this.p521Requiere = p521Requiere;
    }

    public String getP522Afirmativa() {
        return p522Afirmativa;
    }

    public void setP522Afirmativa(String p522Afirmativa) {
        this.p522Afirmativa = p522Afirmativa;
    }

    public String getP523Reniec() {
        return p523Reniec;
    }

    public void setP523Reniec(String p523Reniec) {
        this.p523Reniec = p523Reniec;
    }

    public Integer getP524Mayores2023() {
        return p524Mayores2023;
    }

    public void setP524Mayores2023(Integer p524Mayores2023) {
        this.p524Mayores2023 = p524Mayores2023;
    }

    public Integer getP524Mayores2024() {
        return p524Mayores2024;
    }

    public void setP524Mayores2024(Integer p524Mayores2024) {
        this.p524Mayores2024 = p524Mayores2024;
    }

    public Integer getP524Mayores2025() {
        return p524Mayores2025;
    }

    public void setP524Mayores2025(Integer p524Mayores2025) {
        this.p524Mayores2025 = p524Mayores2025;
    }

    public Integer getP524Menores2023() {
        return p524Menores2023;
    }

    public void setP524Menores2023(Integer p524Menores2023) {
        this.p524Menores2023 = p524Menores2023;
    }

    public Integer getP524Menores2024() {
        return p524Menores2024;
    }

    public void setP524Menores2024(Integer p524Menores2024) {
        this.p524Menores2024 = p524Menores2024;
    }

    public Integer getP524Menores2025() {
        return p524Menores2025;
    }

    public void setP524Menores2025(Integer p524Menores2025) {
        this.p524Menores2025 = p524Menores2025;
    }

    public Integer getP524Datos2023() {
        return p524Datos2023;
    }

    public void setP524Datos2023(Integer p524Datos2023) {
        this.p524Datos2023 = p524Datos2023;
    }

    public Integer getP524Datos2024() {
        return p524Datos2024;
    }

    public void setP524Datos2024(Integer p524Datos2024) {
        this.p524Datos2024 = p524Datos2024;
    }

    public Integer getP524Datos2025() {
        return p524Datos2025;
    }

    public void setP524Datos2025(Integer p524Datos2025) {
        this.p524Datos2025 = p524Datos2025;
    }

    public Integer getP524Renovacion2023() {
        return p524Renovacion2023;
    }

    public void setP524Renovacion2023(Integer p524Renovacion2023) {
        this.p524Renovacion2023 = p524Renovacion2023;
    }

    public Integer getP524Renovacion2024() {
        return p524Renovacion2024;
    }

    public void setP524Renovacion2024(Integer p524Renovacion2024) {
        this.p524Renovacion2024 = p524Renovacion2024;
    }

    public Integer getP524Renovacion2025() {
        return p524Renovacion2025;
    }

    public void setP524Renovacion2025(Integer p524Renovacion2025) {
        this.p524Renovacion2025 = p524Renovacion2025;
    }

    public Integer getP524Duplicado2023() {
        return p524Duplicado2023;
    }

    public void setP524Duplicado2023(Integer p524Duplicado2023) {
        this.p524Duplicado2023 = p524Duplicado2023;
    }

    public Integer getP524Duplicado2024() {
        return p524Duplicado2024;
    }

    public void setP524Duplicado2024(Integer p524Duplicado2024) {
        this.p524Duplicado2024 = p524Duplicado2024;
    }

    public Integer getP524Duplicado2025() {
        return p524Duplicado2025;
    }

    public void setP524Duplicado2025(Integer p524Duplicado2025) {
        this.p524Duplicado2025 = p524Duplicado2025;
    }

    public Integer getP524Canje2023() {
        return p524Canje2023;
    }

    public void setP524Canje2023(Integer p524Canje2023) {
        this.p524Canje2023 = p524Canje2023;
    }

    public Integer getP524Canje2024() {
        return p524Canje2024;
    }

    public void setP524Canje2024(Integer p524Canje2024) {
        this.p524Canje2024 = p524Canje2024;
    }

    public Integer getP524Canje2025() {
        return p524Canje2025;
    }

    public void setP524Canje2025(Integer p524Canje2025) {
        this.p524Canje2025 = p524Canje2025;
    }

    public String getP525Emite() {
        return p525Emite;
    }

    public void setP525Emite(String p525Emite) {
        this.p525Emite = p525Emite;
    }

    public BigDecimal getP525CostoSol() {
        return p525CostoSol;
    }

    public void setP525CostoSol(BigDecimal p525CostoSol) {
        this.p525CostoSol = p525CostoSol;
    }

    public BigDecimal getP525CostoUsd() {
        return p525CostoUsd;
    }

    public void setP525CostoUsd(BigDecimal p525CostoUsd) {
        this.p525CostoUsd = p525CostoUsd;
    }

    public String getP526aLogistica() {
        return p526aLogistica;
    }

    public void setP526aLogistica(String p526aLogistica) {
        this.p526aLogistica = p526aLogistica;
    }

    public String getP526aGestiones() {
        return p526aGestiones;
    }

    public void setP526aGestiones(String p526aGestiones) {
        this.p526aGestiones = p526aGestiones;
    }

    public String getP526aSuficiente() {
        return p526aSuficiente;
    }

    public void setP526aSuficiente(String p526aSuficiente) {
        this.p526aSuficiente = p526aSuficiente;
    }

    public String getP526aEspecifique() {
        return p526aEspecifique;
    }

    public void setP526aEspecifique(String p526aEspecifique) {
        this.p526aEspecifique = p526aEspecifique;
    }

    public String getP526bInfra() {
        return p526bInfra;
    }

    public void setP526bInfra(String p526bInfra) {
        this.p526bInfra = p526bInfra;
    }

    public String getP526bGestiones() {
        return p526bGestiones;
    }

    public void setP526bGestiones(String p526bGestiones) {
        this.p526bGestiones = p526bGestiones;
    }

    public String getP526bSuficiente() {
        return p526bSuficiente;
    }

    public void setP526bSuficiente(String p526bSuficiente) {
        this.p526bSuficiente = p526bSuficiente;
    }

    public String getP526bEspecifique() {
        return p526bEspecifique;
    }

    public void setP526bEspecifique(String p526bEspecifique) {
        this.p526bEspecifique = p526bEspecifique;
    }

    public String getP526cPersonal() {
        return p526cPersonal;
    }

    public void setP526cPersonal(String p526cPersonal) {
        this.p526cPersonal = p526cPersonal;
    }

    public String getP526cGestiones() {
        return p526cGestiones;
    }

    public void setP526cGestiones(String p526cGestiones) {
        this.p526cGestiones = p526cGestiones;
    }

    public String getP526cSuficiente() {
        return p526cSuficiente;
    }

    public void setP526cSuficiente(String p526cSuficiente) {
        this.p526cSuficiente = p526cSuficiente;
    }

    public String getP526cEspecifique() {
        return p526cEspecifique;
    }

    public void setP526cEspecifique(String p526cEspecifique) {
        this.p526cEspecifique = p526cEspecifique;
    }

    public String getP526dPresupuesto() {
        return p526dPresupuesto;
    }

    public void setP526dPresupuesto(String p526dPresupuesto) {
        this.p526dPresupuesto = p526dPresupuesto;
    }

    public String getP526dGestiones() {
        return p526dGestiones;
    }

    public void setP526dGestiones(String p526dGestiones) {
        this.p526dGestiones = p526dGestiones;
    }

    public String getP526dSuficiente() {
        return p526dSuficiente;
    }

    public void setP526dSuficiente(String p526dSuficiente) {
        this.p526dSuficiente = p526dSuficiente;
    }

    public String getP526dEspecifique() {
        return p526dEspecifique;
    }

    public void setP526dEspecifique(String p526dEspecifique) {
        this.p526dEspecifique = p526dEspecifique;
    }

    public String getP526eOtro() {
        return p526eOtro;
    }

    public void setP526eOtro(String p526eOtro) {
        this.p526eOtro = p526eOtro;
    }

    public String getP526eOtroDetalle() {
        return p526eOtroDetalle;
    }

    public void setP526eOtroDetalle(String p526eOtroDetalle) {
        this.p526eOtroDetalle = p526eOtroDetalle;
    }

    public String getP526eGestiones() {
        return p526eGestiones;
    }

    public void setP526eGestiones(String p526eGestiones) {
        this.p526eGestiones = p526eGestiones;
    }

    public String getP526eSuficiente() {
        return p526eSuficiente;
    }

    public void setP526eSuficiente(String p526eSuficiente) {
        this.p526eSuficiente = p526eSuficiente;
    }

    public String getP526eEspecifique() {
        return p526eEspecifique;
    }

    public void setP526eEspecifique(String p526eEspecifique) {
        this.p526eEspecifique = p526eEspecifique;
    }

    public String getP526Ninguno() {
        return p526Ninguno;
    }

    public void setP526Ninguno(String p526Ninguno) {
        this.p526Ninguno = p526Ninguno;
    }

    public String getP527Recibe() {
        return p527Recibe;
    }

    public void setP527Recibe(String p527Recibe) {
        this.p527Recibe = p527Recibe;
    }

    public String getP528Mre() {
        return p528Mre;
    }

    public void setP528Mre(String p528Mre) {
        this.p528Mre = p528Mre;
    }

    public String getP528Reniec() {
        return p528Reniec;
    }

    public void setP528Reniec(String p528Reniec) {
        this.p528Reniec = p528Reniec;
    }

    public String getP528Migraciones() {
        return p528Migraciones;
    }

    public void setP528Migraciones(String p528Migraciones) {
        this.p528Migraciones = p528Migraciones;
    }

    public String getP528Interpol() {
        return p528Interpol;
    }

    public void setP528Interpol(String p528Interpol) {
        this.p528Interpol = p528Interpol;
    }

    public String getP528Inei() {
        return p528Inei;
    }

    public void setP528Inei(String p528Inei) {
        this.p528Inei = p528Inei;
    }

    public String getP528Jne() {
        return p528Jne;
    }

    public void setP528Jne(String p528Jne) {
        this.p528Jne = p528Jne;
    }

    public String getP528Onpe() {
        return p528Onpe;
    }

    public void setP528Onpe(String p528Onpe) {
        this.p528Onpe = p528Onpe;
    }

    public String getP528Sunarp() {
        return p528Sunarp;
    }

    public void setP528Sunarp(String p528Sunarp) {
        this.p528Sunarp = p528Sunarp;
    }

    public String getP528PoderJudicial() {
        return p528PoderJudicial;
    }

    public void setP528PoderJudicial(String p528PoderJudicial) {
        this.p528PoderJudicial = p528PoderJudicial;
    }

    public String getP528Otro() {
        return p528Otro;
    }

    public void setP528Otro(String p528Otro) {
        this.p528Otro = p528Otro;
    }

    public String getP528OtroDetalle() {
        return p528OtroDetalle;
    }

    public void setP528OtroDetalle(String p528OtroDetalle) {
        this.p528OtroDetalle = p528OtroDetalle;
    }

    public String getP528Ninguna() {
        return p528Ninguna;
    }

    public void setP528Ninguna(String p528Ninguna) {
        this.p528Ninguna = p528Ninguna;
    }

    


}