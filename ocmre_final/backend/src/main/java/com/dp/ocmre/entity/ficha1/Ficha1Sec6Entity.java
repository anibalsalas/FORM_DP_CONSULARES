
package com.dp.ocmre.entity.ficha1;


import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Getter
@Entity
@Table(name = "MRE_FICHA_S6", schema = ESQUEMA_BD)
public class Ficha1Sec6Entity {

    @Id
    @Column(name = "ID_FICHA_S6")
    private Long idFichas6;

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

    @Column(name = "ESTADO_S6")
    private String estado_s6;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S6", length = 1)
    private String valida_s6;


    @Column(name = "P61_REQUIERE", length = 1)
    private String p61Requiere;

    @Column(name = "P62_AFIRMATIVA", length = 1)
    private String p62Afirmativa;

    @Column(name = "P631_HOMBRE_2023")
    private Integer p631Hombre2023;

    @Column(name = "P631_HOMBRE_2024")
    private Integer p631Hombre2024;

    @Column(name = "P631_HOMBRE_2025")
    private Integer p631Hombre2025;

    @Column(name = "P631_MUJER_2023")
    private Integer p631Mujer2023;

    @Column(name = "P631_MUJER_2024")
    private Integer p631Mujer2024;

    @Column(name = "P631_MUJER_2025")
    private Integer p631Mujer2025;

    @Column(name = "P631_TOTAL_2023")
    private Integer p631Total2023;

    @Column(name = "P631_TOTAL_2024")
    private Integer p631Total2024;

    @Column(name = "P631_TOTAL_2025")
    private Integer p631Total2025;

    @Column(name = "P631_PERSONAS_2023")
    private Integer p631Personas2023;

    @Column(name = "P631_PERSONAS_2024")
    private Integer p631Personas2024;

    @Column(name = "P631_PERSONAS_2025")
    private Integer p631Personas2025;

    @Column(name = "P632_CUENTA", length = 1)
    private String p632Cuenta;

    @Column(name = "P633_A_LOGISTICA", length = 1)
    private String p633ALogistica;

    @Column(name = "P633_A_GESTIONES", length = 1)
    private String p633AGestiones;

    @Column(name = "P633_A_SUFICIENTE", length = 1)
    private String p633ASuficiente;

    @Column(name = "P633_A_ESPECIFIQUE", length = 500)
    private String p633AEspecifique;

    @Column(name = "P633_B_INFRA", length = 1)
    private String p633BInfra;

    @Column(name = "P633_B_GESTIONES", length = 1)
    private String p633BGestiones;

    @Column(name = "P633_B_SUFICIENTE", length = 1)
    private String p633BSuficiente;

    @Column(name = "P633_B_ESPECIFIQUE", length = 500)
    private String p633BEspecifique;

    @Column(name = "P633_C_PERSONAL", length = 1)
    private String p633CPersonal;

    @Column(name = "P633_C_GESTIONES", length = 1)
    private String p633CGestiones;

    @Column(name = "P633_C_SUFICIENTE", length = 1)
    private String p633CSuficiente;

    @Column(name = "P633_C_ESPECIFIQUE", length = 500)
    private String p633CEspecifique;

    @Column(name = "P633_D_PRESUPUESTO", length = 1)
    private String p633DPresupuesto;

    @Column(name = "P633_D_GESTIONES", length = 1)
    private String p633DGestiones;

    @Column(name = "P633_D_SUFICIENTE", length = 1)
    private String p633DSuficiente;

    @Column(name = "P633_D_ESPECIFIQUE", length = 500)
    private String p633DEspecifique;

    @Column(name = "P633_E_OTRO", length = 1)
    private String p633EOtro;

    @Column(name = "P633_E_OTRO_DETALLE", length = 300)
    private String p633EOtroDetalle;

    @Column(name = "P633_E_GESTIONES", length = 1)
    private String p633EGestiones;

    @Column(name = "P633_E_SUFICIENTE", length = 1)
    private String p633ESuficiente;

    @Column(name = "P633_E_ESPECIFIQUE", length = 500)
    private String p633EEspecifique;

    @Column(name = "P633_NINGUNO", length = 1)
    private String p633Ninguno;

    @Column(name = "P634_RECIBE", length = 1)
    private String p634Recibe;

    @Column(name = "P635_MRE", length = 1)
    private String p635Mre;

    @Column(name = "P635_RENIEC", length = 1)
    private String p635Reniec;

    @Column(name = "P635_MIGRACIONES", length = 1)
    private String p635Migraciones;

    @Column(name = "P635_INTERPOL", length = 1)
    private String p635Interpol;

    @Column(name = "P635_INEI", length = 1)
    private String p635Inei;

    @Column(name = "P635_JNE", length = 1)
    private String p635Jne;

    @Column(name = "P635_ONPE", length = 1)
    private String p635Onpe;

    @Column(name = "P635_SUNARP", length = 1)
    private String p635Sunarp;

    @Column(name = "P635_PODER_JUDICIAL", length = 1)
    private String p635PoderJudicial;

    @Column(name = "P635_OTRO", length = 1)
    private String p635Otro;

    @Column(name = "P635_OTRO_DETALLE", length = 500)
    private String p635OtroDetalle;

    @Column(name = "P635_NINGUNA", length = 1)
    private String p635Ninguna;

    @Column(name = "P641_MAYOR_2023")
    private Integer p641Mayor2023;

    @Column(name = "P641_MAYOR_2024")
    private Integer p641Mayor2024;

    @Column(name = "P641_MAYOR_2025")
    private Integer p641Mayor2025;

    @Column(name = "P641_MENOR_2023")
    private Integer p641Menor2023;

    @Column(name = "P641_MENOR_2024")
    private Integer p641Menor2024;

    @Column(name = "P641_MENOR_2025")
    private Integer p641Menor2025;

    @Column(name = "P641_TOTAL_2023")
    private Integer p641Total2023;

    @Column(name = "P641_TOTAL_2024")
    private Integer p641Total2024;

    @Column(name = "P641_TOTAL_2025")
    private Integer p641Total2025;

    @Column(name = "P642_A_LOGISTICA", length = 1)
    private String p642ALogistica;

    @Column(name = "P642_A_GESTIONES", length = 1)
    private String p642AGestiones;

    @Column(name = "P642_A_SUFICIENTE", length = 1)
    private String p642ASuficiente;

    @Column(name = "P642_A_ESPECIFIQUE", length = 500)
    private String p642AEspecifique;

    @Column(name = "P642_B_INFRA", length = 1)
    private String p642BInfra;

    @Column(name = "P642_B_GESTIONES", length = 1)
    private String p642BGestiones;

    @Column(name = "P642_B_SUFICIENTE", length = 1)
    private String p642BSuficiente;

    @Column(name = "P642_B_ESPECIFIQUE", length = 500)
    private String p642BEspecifique;

    @Column(name = "P642_C_PERSONAL", length = 1)
    private String p642CPersonal;

    @Column(name = "P642_C_GESTIONES", length = 1)
    private String p642CGestiones;

    @Column(name = "P642_C_SUFICIENTE", length = 1)
    private String p642CSuficiente;

    @Column(name = "P642_C_ESPECIFIQUE", length = 500)
    private String p642CEspecifique;

    @Column(name = "P642_D_PRESUPUESTO", length = 1)
    private String p642DPresupuesto;

    @Column(name = "P642_D_GESTIONES", length = 1)
    private String p642DGestiones;

    @Column(name = "P642_D_SUFICIENTE", length = 1)
    private String p642DSuficiente;

    @Column(name = "P642_D_ESPECIFIQUE", length = 500)
    private String p642DEspecifique;

    @Column(name = "P642_E_OTRO", length = 1)
    private String p642EOtro;

    @Column(name = "P642_E_OTRO_DETALLE", length = 300)
    private String p642EOtroDetalle;

    @Column(name = "P642_E_GESTIONES", length = 1)
    private String p642EGestiones;

    @Column(name = "P642_E_SUFICIENTE", length = 1)
    private String p642ESuficiente;

    @Column(name = "P642_E_ESPECIFIQUE", length = 500)
    private String p642EEspecifique;

    @Column(name = "P642_NINGUNO", length = 1)
    private String p642Ninguno;

    @Column(name = "P643_RECIBE", length = 1)
    private String p643Recibe;

    @Column(name = "P644_MRE", length = 1)
    private String p644Mre;

    @Column(name = "P644_RENIEC", length = 1)
    private String p644Reniec;

    @Column(name = "P644_MIGRACIONES", length = 1)
    private String p644Migraciones;

    @Column(name = "P644_INTERPOL", length = 1)
    private String p644Interpol;

    @Column(name = "P644_INEI", length = 1)
    private String p644Inei;

    @Column(name = "P644_JNE", length = 1)
    private String p644Jne;

    @Column(name = "P644_ONPE", length = 1)
    private String p644Onpe;

    @Column(name = "P644_SUNARP", length = 1)
    private String p644Sunarp;

    @Column(name = "P644_PODER_JUDICIAL", length = 1)
    private String p644PoderJudicial;

    @Column(name = "P644_OTRO", length = 1)
    private String p644Otro;

    @Column(name = "P644_OTRO_DETALLE", length = 500)
    private String p644OtroDetalle;

    @Column(name = "P644_NINGUNA", length = 1)
    private String p644Ninguna;


    public Long getIdFichas6() {
        return idFichas6;
    }

    public void setIdFichas6(Long idFichas6) {
        this.idFichas6 = idFichas6;
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

    public String getEstado_s6() {
        return estado_s6;
    }

    public void setEstado_s6(String estado_s6) {
        this.estado_s6 = estado_s6;
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

    public String getValida_s6() {
        return valida_s6;
    }

    public void setValida_s6(String valida_s6) {this.valida_s6 = valida_s6;}

    public String getP61Requiere() {return p61Requiere;}
    public void setP61Requiere(String p61Requiere) {this.p61Requiere = p61Requiere;}

    public String getP62Afirmativa() {return p62Afirmativa;}
    public void setP62Afirmativa(String p62Afirmativa) {this.p62Afirmativa = p62Afirmativa;}

    public Integer getP631Hombre2023() {return p631Hombre2023;}
    public void setP631Hombre2023(Integer p631Hombre2023) {this.p631Hombre2023 = p631Hombre2023;}

    public Integer getP631Hombre2024() {return p631Hombre2024;}
    public void setP631Hombre2024(Integer p631Hombre2024) {this.p631Hombre2024 = p631Hombre2024;}

    public Integer getP631Hombre2025() {return p631Hombre2025;}
    public void setP631Hombre2025(Integer p631Hombre2025) {this.p631Hombre2025 = p631Hombre2025;}

    public Integer getP631Mujer2023() {return p631Mujer2023;}
    public void setP631Mujer2023(Integer p631Mujer2023) {this.p631Mujer2023 = p631Mujer2023;}

    public Integer getP631Mujer2024() {return p631Mujer2024;}
    public void setP631Mujer2024(Integer p631Mujer2024) {this.p631Mujer2024 = p631Mujer2024;}

    public Integer getP631Mujer2025() {return p631Mujer2025;}
    public void setP631Mujer2025(Integer p631Mujer2025) {this.p631Mujer2025 = p631Mujer2025;}

    public Integer getP631Total2023() {return p631Total2023;}
    public void setP631Total2023(Integer p631Total2023) {this.p631Total2023 = p631Total2023;}

    public Integer getP631Total2024() {return p631Total2024;}
    public void setP631Total2024(Integer p631Total2024) {this.p631Total2024 = p631Total2024;}

    public Integer getP631Total2025() {return p631Total2025;}
    public void setP631Total2025(Integer p631Total2025) {this.p631Total2025 = p631Total2025;}

    public Integer getP631Personas2023() {return p631Personas2023;}
    public void setP631Personas2023(Integer p631Personas2023) {this.p631Personas2023 = p631Personas2023;}

    public Integer getP631Personas2024() {return p631Personas2024;}
    public void setP631Personas2024(Integer p631Personas2024) {this.p631Personas2024 = p631Personas2024;}

    public Integer getP631Personas2025() {return p631Personas2025;}
    public void setP631Personas2025(Integer p631Personas2025) {this.p631Personas2025 = p631Personas2025;}

    public String getP632Cuenta() {return p632Cuenta;}
    public void setP632Cuenta(String p632Cuenta) {this.p632Cuenta = p632Cuenta;}

    public String getP633ALogistica() {return p633ALogistica;}
    public void setP633ALogistica(String p633ALogistica) {this.p633ALogistica = p633ALogistica;}

    public String getP633AGestiones() {return p633AGestiones;}
    public void setP633AGestiones(String p633AGestiones) {this.p633AGestiones = p633AGestiones;}

    public String getP633ASuficiente() {return p633ASuficiente;}
    public void setP633ASuficiente(String p633ASuficiente) {this.p633ASuficiente = p633ASuficiente;}

    public String getP633AEspecifique() {return p633AEspecifique;}
    public void setP633AEspecifique(String p633AEspecifique) {this.p633AEspecifique = p633AEspecifique;}

    public String getP633BInfra() {return p633BInfra;}
    public void setP633BInfra(String p633BInfra) {this.p633BInfra = p633BInfra;}

    public String getP633BGestiones() {return p633BGestiones;}
    public void setP633BGestiones(String p633BGestiones) {this.p633BGestiones = p633BGestiones;}

    public String getP633BSuficiente() {return p633BSuficiente;}
    public void setP633BSuficiente(String p633BSuficiente) {this.p633BSuficiente = p633BSuficiente;}

    public String getP633BEspecifique() {return p633BEspecifique;}
    public void setP633BEspecifique(String p633BEspecifique) {this.p633BEspecifique = p633BEspecifique;}

    public String getP633CPersonal() {return p633CPersonal;}
    public void setP633CPersonal(String p633CPersonal) {this.p633CPersonal = p633CPersonal;}

    public String getP633CGestiones() {return p633CGestiones;}
    public void setP633CGestiones(String p633CGestiones) {this.p633CGestiones = p633CGestiones;}

    public String getP633CSuficiente() {return p633CSuficiente;}
    public void setP633CSuficiente(String p633CSuficiente) {this.p633CSuficiente = p633CSuficiente;}

    public String getP633CEspecifique() {return p633CEspecifique;}
    public void setP633CEspecifique(String p633CEspecifique) {this.p633CEspecifique = p633CEspecifique;}

    public String getP633DPresupuesto() {return p633DPresupuesto;}
    public void setP633DPresupuesto(String p633DPresupuesto) {this.p633DPresupuesto = p633DPresupuesto;}

    public String getP633DGestiones() {return p633DGestiones;}
    public void setP633DGestiones(String p633DGestiones) {this.p633DGestiones = p633DGestiones;}

    public String getP633DSuficiente() {return p633DSuficiente;}
    public void setP633DSuficiente(String p633DSuficiente) {this.p633DSuficiente = p633DSuficiente;}

    public String getP633DEspecifique() {return p633DEspecifique;}
    public void setP633DEspecifique(String p633DEspecifique) {this.p633DEspecifique = p633DEspecifique;}

    public String getP633EOtro() {return p633EOtro;}
    public void setP633EOtro(String p633EOtro) {this.p633EOtro = p633EOtro;}

    public String getP633EOtroDetalle() {return p633EOtroDetalle;}
    public void setP633EOtroDetalle(String p633EOtroDetalle) {this.p633EOtroDetalle = p633EOtroDetalle;}

    public String getP633EGestiones() {return p633EGestiones;}
    public void setP633EGestiones(String p633EGestiones) {this.p633EGestiones = p633EGestiones;}

    public String getP633ESuficiente() {return p633ESuficiente;}
    public void setP633ESuficiente(String p633ESuficiente) {this.p633ESuficiente = p633ESuficiente;}

    public String getP633EEspecifique() {return p633EEspecifique;}
    public void setP633EEspecifique(String p633EEspecifique) {this.p633EEspecifique = p633EEspecifique;}

    public String getP633Ninguno() {return p633Ninguno;}
    public void setP633Ninguno(String p633Ninguno) {this.p633Ninguno = p633Ninguno;}

    public String getP634Recibe() {return p634Recibe;}
    public void setP634Recibe(String p634Recibe) {this.p634Recibe = p634Recibe;}

    public String getP635Mre() {return p635Mre;}
    public void setP635Mre(String p635Mre) {this.p635Mre = p635Mre;}

    public String getP635Reniec() {return p635Reniec;}
    public void setP635Reniec(String p635Reniec) {this.p635Reniec = p635Reniec;}

    public String getP635Migraciones() {return p635Migraciones;}
    public void setP635Migraciones(String p635Migraciones) {this.p635Migraciones = p635Migraciones;}

    public String getP635Interpol() {return p635Interpol;}
    public void setP635Interpol(String p635Interpol) {this.p635Interpol = p635Interpol;}

    public String getP635Inei() {return p635Inei;}
    public void setP635Inei(String p635Inei) {this.p635Inei = p635Inei;}

    public String getP635Jne() {return p635Jne;}
    public void setP635Jne(String p635Jne) {this.p635Jne = p635Jne;}

    public String getP635Onpe() {return p635Onpe;}
    public void setP635Onpe(String p635Onpe) {this.p635Onpe = p635Onpe;}

    public String getP635Sunarp() {return p635Sunarp;}
    public void setP635Sunarp(String p635Sunarp) {this.p635Sunarp = p635Sunarp;}

    public String getP635PoderJudicial() {return p635PoderJudicial;}
    public void setP635PoderJudicial(String p635PoderJudicial) {this.p635PoderJudicial = p635PoderJudicial;}

    public String getP635Otro() {return p635Otro;}
    public void setP635Otro(String p635Otro) {this.p635Otro = p635Otro;}

    public String getP635OtroDetalle() {return p635OtroDetalle;}
    public void setP635OtroDetalle(String p635OtroDetalle) {this.p635OtroDetalle = p635OtroDetalle;}

    public String getP635Ninguna() {return p635Ninguna;}
    public void setP635Ninguna(String p635Ninguna) {this.p635Ninguna = p635Ninguna;}

    public Integer getP641Mayor2023() {return p641Mayor2023;}
    public void setP641Mayor2023(Integer p641Mayor2023) {this.p641Mayor2023 = p641Mayor2023;}

    public Integer getP641Mayor2024() {return p641Mayor2024;}
    public void setP641Mayor2024(Integer p641Mayor2024) {this.p641Mayor2024 = p641Mayor2024;}

    public Integer getP641Mayor2025() {return p641Mayor2025;}
    public void setP641Mayor2025(Integer p641Mayor2025) {this.p641Mayor2025 = p641Mayor2025;}

    public Integer getP641Menor2023() {return p641Menor2023;}
    public void setP641Menor2023(Integer p641Menor2023) {this.p641Menor2023 = p641Menor2023;}

    public Integer getP641Menor2024() {return p641Menor2024;}
    public void setP641Menor2024(Integer p641Menor2024) {this.p641Menor2024 = p641Menor2024;}

    public Integer getP641Menor2025() {return p641Menor2025;}
    public void setP641Menor2025(Integer p641Menor2025) {this.p641Menor2025 = p641Menor2025;}

    public Integer getP641Total2023() {return p641Total2023;}
    public void setP641Total2023(Integer p641Total2023) {this.p641Total2023 = p641Total2023;}

    public Integer getP641Total2024() {return p641Total2024;}
    public void setP641Total2024(Integer p641Total2024) {this.p641Total2024 = p641Total2024;}

    public Integer getP641Total2025() {return p641Total2025;}
    public void setP641Total2025(Integer p641Total2025) {this.p641Total2025 = p641Total2025;}

    public String getP642ALogistica() {return p642ALogistica;}
    public void setP642ALogistica(String p642ALogistica) {this.p642ALogistica = p642ALogistica;}

    public String getP642AGestiones() {return p642AGestiones;}
    public void setP642AGestiones(String p642AGestiones) {this.p642AGestiones = p642AGestiones;}

    public String getP642ASuficiente() {return p642ASuficiente;}
    public void setP642ASuficiente(String p642ASuficiente) {this.p642ASuficiente = p642ASuficiente;}

    public String getP642AEspecifique() {return p642AEspecifique;}
    public void setP642AEspecifique(String p642AEspecifique) {this.p642AEspecifique = p642AEspecifique;}

    public String getP642BInfra() {return p642BInfra;}
    public void setP642BInfra(String p642BInfra) {this.p642BInfra = p642BInfra;}

    public String getP642BGestiones() {return p642BGestiones;}
    public void setP642BGestiones(String p642BGestiones) {this.p642BGestiones = p642BGestiones;}

    public String getP642BSuficiente() {return p642BSuficiente;}
    public void setP642BSuficiente(String p642BSuficiente) {this.p642BSuficiente = p642BSuficiente;}

    public String getP642BEspecifique() {return p642BEspecifique;}
    public void setP642BEspecifique(String p642BEspecifique) {this.p642BEspecifique = p642BEspecifique;}

    public String getP642CPersonal() {return p642CPersonal;}
    public void setP642CPersonal(String p642CPersonal) {this.p642CPersonal = p642CPersonal;}

    public String getP642CGestiones() {return p642CGestiones;}
    public void setP642CGestiones(String p642CGestiones) {this.p642CGestiones = p642CGestiones;}

    public String getP642CSuficiente() {return p642CSuficiente;}
    public void setP642CSuficiente(String p642CSuficiente) {this.p642CSuficiente = p642CSuficiente;}

    public String getP642CEspecifique() {return p642CEspecifique;}
    public void setP642CEspecifique(String p642CEspecifique) {this.p642CEspecifique = p642CEspecifique;}

    public String getP642DPresupuesto() {return p642DPresupuesto;}
    public void setP642DPresupuesto(String p642DPresupuesto) {this.p642DPresupuesto = p642DPresupuesto;}

    public String getP642DGestiones() {return p642DGestiones;}
    public void setP642DGestiones(String p642DGestiones) {this.p642DGestiones = p642DGestiones;}

    public String getP642DSuficiente() {return p642DSuficiente;}
    public void setP642DSuficiente(String p642DSuficiente) {this.p642DSuficiente = p642DSuficiente;}

    public String getP642DEspecifique() {return p642DEspecifique;}
    public void setP642DEspecifique(String p642DEspecifique) {this.p642DEspecifique = p642DEspecifique;}

    public String getP642EOtro() {return p642EOtro;}
    public void setP642EOtro(String p642EOtro) {this.p642EOtro = p642EOtro;}

    public String getP642EOtroDetalle() {return p642EOtroDetalle;}
    public void setP642EOtroDetalle(String p642EOtroDetalle) {this.p642EOtroDetalle = p642EOtroDetalle;}

    public String getP642EGestiones() {return p642EGestiones;}
    public void setP642EGestiones(String p642EGestiones) {this.p642EGestiones = p642EGestiones;}

    public String getP642ESuficiente() {return p642ESuficiente;}
    public void setP642ESuficiente(String p642ESuficiente) {this.p642ESuficiente = p642ESuficiente;}

    public String getP642EEspecifique() {return p642EEspecifique;}
    public void setP642EEspecifique(String p642EEspecifique) {this.p642EEspecifique = p642EEspecifique;}

    public String getP642Ninguno() {return p642Ninguno;}
    public void setP642Ninguno(String p642Ninguno) {this.p642Ninguno = p642Ninguno;}

    public String getP643Recibe() {return p643Recibe;}
    public void setP643Recibe(String p643Recibe) {this.p643Recibe = p643Recibe;}

    public String getP644Mre() {return p644Mre;}
    public void setP644Mre(String p644Mre) {this.p644Mre = p644Mre;}

    public String getP644Reniec() {return p644Reniec;}
    public void setP644Reniec(String p644Reniec) {this.p644Reniec = p644Reniec;}

    public String getP644Migraciones() {return p644Migraciones;}
    public void setP644Migraciones(String p644Migraciones) {this.p644Migraciones = p644Migraciones;}

    public String getP644Interpol() {return p644Interpol;}
    public void setP644Interpol(String p644Interpol) {this.p644Interpol = p644Interpol;}

    public String getP644Inei() {return p644Inei;}
    public void setP644Inei(String p644Inei) {this.p644Inei = p644Inei;}

    public String getP644Jne() {return p644Jne;}
    public void setP644Jne(String p644Jne) {this.p644Jne = p644Jne;}

    public String getP644Onpe() {return p644Onpe;}
    public void setP644Onpe(String p644Onpe) {this.p644Onpe = p644Onpe;}

    public String getP644Sunarp() {return p644Sunarp;}
    public void setP644Sunarp(String p644Sunarp) {this.p644Sunarp = p644Sunarp;}

    public String getP644PoderJudicial() {return p644PoderJudicial;}
    public void setP644PoderJudicial(String p644PoderJudicial) {this.p644PoderJudicial = p644PoderJudicial;}

    public String getP644Otro() {return p644Otro;}
    public void setP644Otro(String p644Otro) {this.p644Otro = p644Otro;}

    public String getP644OtroDetalle() {return p644OtroDetalle;}
    public void setP644OtroDetalle(String p644OtroDetalle) {this.p644OtroDetalle = p644OtroDetalle;}

    public String getP644Ninguna() {return p644Ninguna;}
    public void setP644Ninguna(String p644Ninguna) {this.p644Ninguna = p644Ninguna;}

}