
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
@Table(name = "MRE_FICHA_S3", schema = ESQUEMA_BD)
public class Ficha1Sec3Entity {

    @Id
    @Column(name = "ID_FICHA_S3")
    private Long idFichas3;

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

    @Column(name = "ESTADO_S3")
    private String estado_s3;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S3", length = 1)
    private String valida_s3;


    @Column(name = "P31_NUM_ASOCION")
    private Integer p31NumAsocion;

    @Column(name = "P31_NO_CUENTA", length = 1)
    private String p31NoCuenta;

    @Column(name = "P32_NUM_ACTIVIDAD")
    private Integer p32NumActividad;

    @Column(name = "P33_NUM_PERSONAS")
    private Integer p33NumPersonas;

    @Column(name = "P34_CULTURAL", length = 1)
    private String p34Cultural;

    @Column(name = "P34_ARTISTICA", length = 1)
    private String p34Artistica;

    @Column(name = "P34_COMERCIALES", length = 1)
    private String p34Comerciales;

    @Column(name = "P34_RELIGIOSOS", length = 1)
    private String p34Religiosos;

    @Column(name = "P34_OTROS", length = 1)
    private String p34Otros;

    @Column(name = "P34_OTROS_DETALLES", length = 500)
    private String p34OtrosDetalles;

    @Column(name = "P35_CENTRO_CULTURAL", length = 1)
    private String p35CentroCultural;


    @Column(name = "P36_CALENDARIO", length = 1)
    private String p36Calendario;

    @Column(name = "P37_INICIATIVAS", length = 1)
    private String p37Iniciativas;

    @Column(name = "P37_MECANISMO", length = 1)
    private String p37Mecanismo;

    @Column(name = "P37_FESTIVIDADES", length = 1)
    private String p37Festividades;

    @Column(name = "P37_PROGRAMAS", length = 1)
    private String p37Programas;

    @Column(name = "P37_OTROS", length = 1)
    private String p37Otros;

    @Column(name = "P37_OTROS_DETALLE", length = 500)
    private String p37OtrosDetalle;

    @Column(name = "P38_HOMBRE_INDUSTRIAL")
    private Integer p38HombreIndustrial;

    @Column(name = "P38_HOMBRE_COMERCIANTE")
    private Integer p38HombreComerciante;

    @Column(name = "P38_HOMBRE_ESTUDIANTE")
    private Integer p38HombreEstudiante;

    @Column(name = "P38_HOMBRE_OTRO")
    private Integer p38HombreOtro;

    @Column(name = "P38_HOMBRE_OTRO_DETALLE", length = 300)
    private String p38HombreOtroDetalle;

    @Column(name = "P38_MUJER_INDUSTRIAL")
    private Integer p38MujerIndustrial;

    @Column(name = "P38_MUJER_COMERCIANTE")
    private Integer p38MujerComerciante;

    @Column(name = "P38_MUJER_ESTUDIANTE")
    private Integer p38MujerEstudiante;

    @Column(name = "P38_MUJER_OTRO")
    private Integer p38MujerOtro;

    @Column(name = "P39_A_LOGISTICA", length = 1)
    private String p39ALogistica;

    @Column(name = "P39_A_GESTIONES", length = 1)
    private String p39AGestiones;

    @Column(name = "P39_A_SUFICIENTE", length = 1)
    private String p39ASuficiente;

    @Column(name = "P39_A_ESPECIFIQUE", length = 500)
    private String p39AEspecifique;

    @Column(name = "P39_B_INFRA", length = 1)
    private String p39BInfra;

    @Column(name = "P39_B_GESTIONES", length = 1)
    private String p39BGestiones;

    @Column(name = "P39_B_SUFICIENTE", length = 1)
    private String p39BSuficiente;

    @Column(name = "P39_B_ESPECIFIQUE", length = 500)
    private String p39BEspecifique;

    @Column(name = "P39_C_PERSONAL", length = 1)
    private String p39CPersonal;

    @Column(name = "P39_C_GESTIONES", length = 1)
    private String p39CGestiones;

    @Column(name = "P39_C_SUFICIENTE", length = 1)
    private String p39CSuficiente;

    @Column(name = "P39_C_ESPECIFIQUE", length = 500)
    private String p39CEspecifique;

    @Column(name = "P39_D_PRESUPUESTO", length = 1)
    private String p39DPresupuesto;

    @Column(name = "P39_D_GESTIONES", length = 1)
    private String p39DGestiones;

    @Column(name = "P39_D_SUFICIENTE", length = 1)
    private String p39DSuficiente;

    @Column(name = "P39_D_ESPECIFIQUE", length = 500)
    private String p39DEspecifique;

    @Column(name = "P39_E_OTRO", length = 1)
    private String p39EOtro;

    @Column(name = "P39_E_OTRO_DETALLE", length = 300)
    private String p39EOtroDetalle;

    @Column(name = "P39_E_GESTIONES", length = 1)
    private String p39EGestiones;

    @Column(name = "P39_E_SUFICIENTE", length = 1)
    private String p39ESuficiente;

    @Column(name = "P39_E_ESPECIFIQUE", length = 500)
    private String p39EEspecifique;

    @Column(name = "P39_NINGUNO", length = 1)
    private String p39Ninguno;

    @Column(name = "P310_RECIBE", length = 1)
    private String p310Recibe;


    @Column(name = "P311_MRE", length = 1)
    private String p311Mre;

    @Column(name = "P311_RENIEC", length = 1)
    private String p311Reniec;

    @Column(name = "P311_MIGRACIONES", length = 1)
    private String p311Migraciones;

    @Column(name = "P311_INTERPOL", length = 1)
    private String p311Interpol;

    @Column(name = "P311_INEI", length = 1)
    private String p311Inei;

    @Column(name = "P311_JNE", length = 1)
    private String p311Jne;

    @Column(name = "P311_ONPE", length = 1)
    private String p311Onpe;

    @Column(name = "P311_SUNARP", length = 1)
    private String p311Sunarp;

    @Column(name = "P311_PODER_JUDICIAL", length = 1)
    private String p311PoderJudicial;

    @Column(name = "P311_OTROS", length = 1)
    private String p311Otros;

    @Column(name = "P311_OTROS_DETALLE", length = 500)
    private String p311OtrosDetalle;

    @Column(name = "P311_NINGUNA", length = 1)
    private String p311Ninguna;




    public Long getIdFichas3() {
        return idFichas3;
    }

    public void setIdFichas3(Long idFichas3) {
        this.idFichas3 = idFichas3;
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

    public String getEstado_s3() {
        return estado_s3;
    }

    public void setEstado_s3(String estado_s3) {
        this.estado_s3 = estado_s3;
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

    public String getValida_s3() {
        return valida_s3;
    }

    public void setValida_s3(String valida_s3) {
        this.valida_s3 = valida_s3;
    }


    public Integer getP31NumAsocion() {return p31NumAsocion;}
    public void setP31NumAsocion(Integer p31NumAsocion) {this.p31NumAsocion = p31NumAsocion;}

    public String getP31NoCuenta() {return p31NoCuenta;}
    public void setP31NoCuenta(String p31NoCuenta) {this.p31NoCuenta = p31NoCuenta;}

    public Integer getP32NumActividad() {return p32NumActividad;}
    public void setP32NumActividad(Integer p32NumActividad) {this.p32NumActividad = p32NumActividad;}

    public Integer getP33NumPersonas() {return p33NumPersonas;}
    public void setP33NumPersonas(Integer p33NumPersonas) {this.p33NumPersonas = p33NumPersonas;}

    public String getP34Cultural() {return p34Cultural;}
    public void setP34Cultural(String p34Cultural) {this.p34Cultural = p34Cultural;}

    public String getP34Artistica() {return p34Artistica;}
    public void setP34Artistica(String p34Artistica) {this.p34Artistica = p34Artistica;}

    public String getP34Comerciales() {return p34Comerciales;}
    public void setP34Comerciales(String p34Comerciales) {this.p34Comerciales = p34Comerciales;}

    public String getP34Religiosos() {return p34Religiosos;}
    public void setP34Religiosos(String p34Religiosos) {this.p34Religiosos = p34Religiosos;}

    public String getP34Otros() {return p34Otros;}
    public void setP34Otros(String p34Otros) {this.p34Otros = p34Otros;}

    public String getP34OtrosDetalles() {return p34OtrosDetalles;}
    public void setP34OtrosDetalles(String p34OtrosDetalles) {this.p34OtrosDetalles = p34OtrosDetalles;}

    public String getP35CentroCultural() {return p35CentroCultural;}
    public void setP35CentroCultural(String p35CentroCultural) {this.p35CentroCultural = p35CentroCultural;}

    public String getP36Calendario() {return p36Calendario;}
    public void setP36Calendario(String p36Calendario) {this.p36Calendario = p36Calendario;}

    public String getP37Iniciativas() {return p37Iniciativas;}
    public void setP37Iniciativas(String p37Iniciativas) {this.p37Iniciativas = p37Iniciativas;}

    public String getP37Mecanismo() {return p37Mecanismo;}
    public void setP37Mecanismo(String p37Mecanismo) {this.p37Mecanismo = p37Mecanismo;}

    public String getP37Festividades() {return p37Festividades;}
    public void setP37Festividades(String p37Festividades) {this.p37Festividades = p37Festividades;}

    public String getP37Programas() {return p37Programas;}
    public void setP37Programas(String p37Programas) {this.p37Programas = p37Programas;}

    public String getP37Otros() {return p37Otros;}
    public void setP37Otros(String p37Otros) {this.p37Otros = p37Otros;}

    public String getP37OtrosDetalle() {return p37OtrosDetalle;}
    public void setP37OtrosDetalle(String p37OtrosDetalle) {this.p37OtrosDetalle = p37OtrosDetalle;}

    public Integer getP38HombreIndustrial() {return p38HombreIndustrial;}
    public void setP38HombreIndustrial(Integer p38HombreIndustrial) {this.p38HombreIndustrial = p38HombreIndustrial;}

    public Integer getP38HombreComerciante() {return p38HombreComerciante;}
    public void setP38HombreComerciante(Integer p38HombreComerciante) {this.p38HombreComerciante = p38HombreComerciante;}

    public Integer getP38HombreEstudiante() {return p38HombreEstudiante;}
    public void setP38HombreEstudiante(Integer p38HombreEstudiante) {this.p38HombreEstudiante = p38HombreEstudiante;}

    public Integer getP38HombreOtro() {return p38HombreOtro;}
    public void setP38HombreOtro(Integer p38HombreOtro) {this.p38HombreOtro = p38HombreOtro;}

    public String getP38HombreOtroDetalle() {return p38HombreOtroDetalle;}
    public void setP38HombreOtroDetalle(String p38HombreOtroDetalle) {this.p38HombreOtroDetalle = p38HombreOtroDetalle;}

    public Integer getP38MujerIndustrial() {return p38MujerIndustrial;}
    public void setP38MujerIndustrial(Integer p38MujerIndustrial) {this.p38MujerIndustrial = p38MujerIndustrial;}

    public Integer getP38MujerComerciante() {return p38MujerComerciante;}
    public void setP38MujerComerciante(Integer p38MujerComerciante) {this.p38MujerComerciante = p38MujerComerciante;}

    public Integer getP38MujerEstudiante() {return p38MujerEstudiante;}
    public void setP38MujerEstudiante(Integer p38MujerEstudiante) {this.p38MujerEstudiante = p38MujerEstudiante;}

    public Integer getP38MujerOtro() {return p38MujerOtro;}
    public void setP38MujerOtro(Integer p38MujerOtro) {this.p38MujerOtro = p38MujerOtro;}

    public String getP39ALogistica() {return p39ALogistica;}
    public void setP39ALogistica(String p39ALogistica) {this.p39ALogistica = p39ALogistica;}

    public String getP39AGestiones() {return p39AGestiones;}
    public void setP39AGestiones(String p39AGestiones) {this.p39AGestiones = p39AGestiones;}

    public String getP39ASuficiente() {return p39ASuficiente;}
    public void setP39ASuficiente(String p39ASuficiente) {this.p39ASuficiente = p39ASuficiente;}

    public String getP39AEspecifique() {return p39AEspecifique;}
    public void setP39AEspecifique(String p39AEspecifique) {this.p39AEspecifique = p39AEspecifique;}

    public String getP39BInfra() {return p39BInfra;}
    public void setP39BInfra(String p39BInfra) {this.p39BInfra = p39BInfra;}

    public String getP39BGestiones() {return p39BGestiones;}
    public void setP39BGestiones(String p39BGestiones) {this.p39BGestiones = p39BGestiones;}

    public String getP39BSuficiente() {return p39BSuficiente;}
    public void setP39BSuficiente(String p39BSuficiente) {this.p39BSuficiente = p39BSuficiente;}

    public String getP39BEspecifique() {return p39BEspecifique;}
    public void setP39BEspecifique(String p39BEspecifique) {this.p39BEspecifique = p39BEspecifique;}

    public String getP39CPersonal() {return p39CPersonal;}
    public void setP39CPersonal(String p39CPersonal) {this.p39CPersonal = p39CPersonal;}

    public String getP39CGestiones() {return p39CGestiones;}
    public void setP39CGestiones(String p39CGestiones) {this.p39CGestiones = p39CGestiones;}

    public String getP39CSuficiente() {return p39CSuficiente;}
    public void setP39CSuficiente(String p39CSuficiente) {this.p39CSuficiente = p39CSuficiente;}

    public String getP39CEspecifique() {return p39CEspecifique;}
    public void setP39CEspecifique(String p39CEspecifique) {this.p39CEspecifique = p39CEspecifique;}

    public String getP39DPresupuesto() {return p39DPresupuesto;}
    public void setP39DPresupuesto(String p39DPresupuesto) {this.p39DPresupuesto = p39DPresupuesto;}

    public String getP39DGestiones() {return p39DGestiones;}
    public void setP39DGestiones(String p39DGestiones) {this.p39DGestiones = p39DGestiones;}

    public String getP39DSuficiente() {return p39DSuficiente;}
    public void setP39DSuficiente(String p39DSuficiente) {this.p39DSuficiente = p39DSuficiente;}

    public String getP39DEspecifique() {return p39DEspecifique;}
    public void setP39DEspecifique(String p39DEspecifique) {this.p39DEspecifique = p39DEspecifique;}

    public String getP39EOtro() {return p39EOtro;}
    public void setP39EOtro(String p39EOtro) {this.p39EOtro = p39EOtro;}

    public String getP39EOtroDetalle() {return p39EOtroDetalle;}
    public void setP39EOtroDetalle(String p39EOtroDetalle) {this.p39EOtroDetalle = p39EOtroDetalle;}

    public String getP39EGestiones() {return p39EGestiones;}
    public void setP39EGestiones(String p39EGestiones) {this.p39EGestiones = p39EGestiones;}

    public String getP39ESuficiente() {return p39ESuficiente;}
    public void setP39ESuficiente(String p39ESuficiente) {this.p39ESuficiente = p39ESuficiente;}

    public String getP39EEspecifique() {return p39EEspecifique;}
    public void setP39EEspecifique(String p39EEspecifique) {this.p39EEspecifique = p39EEspecifique;}

    public String getP39Ninguno() {return p39Ninguno;}
    public void setP39Ninguno(String p39Ninguno) {this.p39Ninguno = p39Ninguno;}

    public String getP310Recibe() {return p310Recibe;}
    public void setP310Recibe(String p310Recibe) {this.p310Recibe = p310Recibe;}

    public String getP311Mre() {return p311Mre;}
    public void setP311Mre(String p311Mre) {this.p311Mre = p311Mre;}

    public String getP311Reniec() {return p311Reniec;}
    public void setP311Reniec(String p311Reniec) {this.p311Reniec = p311Reniec;}

    public String getP311Migraciones() {return p311Migraciones;}
    public void setP311Migraciones(String p311Migraciones) {this.p311Migraciones = p311Migraciones;}

    public String getP311Interpol() {return p311Interpol;}
    public void setP311Interpol(String p311Interpol) {this.p311Interpol = p311Interpol;}

    public String getP311Inei() {return p311Inei;}
    public void setP311Inei(String p311Inei) {this.p311Inei = p311Inei;}

    public String getP311Jne() {return p311Jne;}
    public void setP311Jne(String p311Jne) {this.p311Jne = p311Jne;}

    public String getP311Onpe() {return p311Onpe;}
    public void setP311Onpe(String p311Onpe) {this.p311Onpe = p311Onpe;}

    public String getP311Sunarp() {return p311Sunarp;}
    public void setP311Sunarp(String p311Sunarp) {this.p311Sunarp = p311Sunarp;}

    public String getP311PoderJudicial() {return p311PoderJudicial;}
    public void setP311PoderJudicial(String p311PoderJudicial) {this.p311PoderJudicial = p311PoderJudicial;}

    public String getP311Otros() {return p311Otros;}
    public void setP311Otros(String p311Otros) {this.p311Otros = p311Otros;}

    public String getP311OtrosDetalle() {return p311OtrosDetalle;}
    public void setP311OtrosDetalle(String p311OtrosDetalle) {this.p311OtrosDetalle = p311OtrosDetalle;}

    public String getP311Ninguna() {return p311Ninguna;}
    public void setP311Ninguna(String p311Ninguna) {this.p311Ninguna = p311Ninguna;}


}