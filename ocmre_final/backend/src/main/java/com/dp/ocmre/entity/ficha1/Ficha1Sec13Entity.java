
package com.dp.ocmre.entity.ficha1;


import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Getter
@Entity
@Table(name = "MRE_FICHA_S13", schema = ESQUEMA_BD)
public class Ficha1Sec13Entity {

    @Id
    @Column(name = "ID_FICHA_S13")
    private Long idFichas13;

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

    @Column(name = "ESTADO_S13")
    private String estado_s13;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S13", length = 1)
    private String valida_s13;

    @Column(name = "P131_OFICINA", length = 1)
    private String p131Oficina;

    @Column(name = "P132_CONTRATACION", length = 1)
    private String p132Contratacion;

    @Column(name = "P132_PERSONAL", length = 1)
    private String p132Personal;

    @Column(name = "P132_PLANEAMIENTO", length = 1)
    private String p132Planeamiento;

    @Column(name = "P132_ACTIVIDADES", length = 1)
    private String p132Actividades;

    @Column(name = "P132_PRESUPUESTO", length = 1)
    private String p132Presupuesto;

    @Column(name = "P132_OTRO", length = 1)
    private String p132Otro;

    @Column(name = "P132_OTRO_DETALLE", length = 500)
    private String p132OtroDetalle;

    @Column(name = "P133_FORMULARIO", length = 1)
    private String p133Formulario;

    @Column(name = "P133_VIRTUAL", length = 1)
    private String p133Virtual;

    @Column(name = "P133_FISICA", length = 1)
    private String p133Fisica;

    @Column(name = "P134_2023_RECIBIDA")
    private Integer p1342023Recibida;

    @Column(name = "P134_2023_ATENDIDA")
    private Integer p1342023Atendida;

    @Column(name = "P134_2023_DENEGADA")
    private Integer p1342023Denegada;

    @Column(name = "P134_2024_RECIBIDA")
    private Integer p1342024Recibida;

    @Column(name = "P134_2024_ATENDIDA")
    private Integer p1342024Atendida;

    @Column(name = "P134_2024_DENEGADA")
    private Integer p1342024Denegada;

    @Column(name = "P134_2025_RECIBIDA")
    private Integer p1342025Recibida;

    @Column(name = "P134_2025_ATENDIDA")
    private Integer p1342025Atendida;

    @Column(name = "P134_2025_DENEGADA")
    private Integer p1342025Denegada;

    @Column(name = "P135_A_LOGISTICA", length = 1)
    private String p135ALogistica;

    @Column(name = "P135_A_GESTIONES", length = 1)
    private String p135AGestiones;

    @Column(name = "P135_A_SUFICIENTE", length = 1)
    private String p135ASuficiente;

    @Column(name = "P135_A_ESPECIFIQUE", length = 500)
    private String p135AEspecifique;

    @Column(name = "P135_B_INFRA", length = 1)
    private String p135BInfra;

    @Column(name = "P135_B_GESTIONES", length = 1)
    private String p135BGestiones;

    @Column(name = "P135_B_SUFICIENTE", length = 1)
    private String p135BSuficiente;

    @Column(name = "P135_B_ESPECIFIQUE", length = 500)
    private String p135BEspecifique;

    @Column(name = "P135_C_PERSONAL", length = 1)
    private String p135CPersonal;

    @Column(name = "P135_C_GESTIONES", length = 1)
    private String p135CGestiones;

    @Column(name = "P135_C_SUFICIENTE", length = 1)
    private String p135CSuficiente;

    @Column(name = "P135_C_ESPECIFIQUE", length = 500)
    private String p135CEspecifique;

    @Column(name = "P135_D_PRESUPUESTO", length = 1)
    private String p135DPresupuesto;

    @Column(name = "P135_D_GESTIONES", length = 1)
    private String p135DGestiones;

    @Column(name = "P135_D_SUFICIENTE", length = 1)
    private String p135DSuficiente;

    @Column(name = "P135_D_ESPECIFIQUE", length = 500)
    private String p135DEspecifique;

    @Column(name = "P135_E_OTRO", length = 1)
    private String p135EOtro;

    @Column(name = "P135_E_OTRO_DETALLE", length = 500)
    private String p135EOtroDetalle;

    @Column(name = "P135_E_GESTIONES", length = 1)
    private String p135EGestiones;

    @Column(name = "P135_E_SUFICIENTE", length = 1)
    private String p135ESuficiente;

    @Column(name = "P135_E_ESPECIFIQUE", length = 500)
    private String p135EEspecifique;

    @Column(name = "P135_NINGUNO", length = 1)
    private String p135Ninguno;

    @Column(name = "P136_RECIBE", length = 1)
    private String p136Recibe;

    @Column(name = "P137_MRE", length = 1)
    private String p137Mre;

    @Column(name = "P137_RENIEC", length = 1)
    private String p137Reniec;

    @Column(name = "P137_MIGRACIONES", length = 1)
    private String p137Migraciones;

    @Column(name = "P137_INTERPOL", length = 1)
    private String p137Interpol;

    @Column(name = "P137_INEI", length = 1)
    private String p137Inei;

    @Column(name = "P137_JNE", length = 1)
    private String p137Jne;

    @Column(name = "P137_ONPE", length = 1)
    private String p137Onpe;

    @Column(name = "P137_SUNARP", length = 1)
    private String p137Sunarp;

    @Column(name = "P137_PODER_JUDICIAL", length = 1)
    private String p137PoderJudicial;

    @Column(name = "P137_OTRO", length = 1)
    private String p137Otro;

    @Column(name = "P137_OTRO_DETALLE", length = 50)
    private String p137OtroDetalle;

    @Column(name = "P137_NINGUNA", length = 1)
    private String p137Ninguna;

    @Column(name = "P138_CUENTA", length = 1)
    private String p138Cuenta;

    @Column(name = "P139_2023_RECLAMO")
    private Integer p1392023Reclamo;

    @Column(name = "P139_2023_QUEJA")
    private Integer p1392023Queja;

    @Column(name = "P139_2023_SUGERENCIA")
    private Integer p1392023Sugerencia;

    @Column(name = "P139_2024_RECLAMO")
    private Integer p1392024Reclamo;

    @Column(name = "P139_2024_QUEJA")
    private Integer p1392024Queja;

    @Column(name = "P139_2024_SUGERENCIA")
    private Integer p1392024Sugerencia;

    @Column(name = "P139_2025_RECLAMO")
    private Integer p1392025Reclamo;

    @Column(name = "P139_2025_QUEJA")
    private Integer p1392025Queja;

    @Column(name = "P139_2025_SUGERENCIA")
    private Integer p1392025Sugerencia;

    @Column(name = "P1310_OFICINA", length = 1)
    private String p1310Oficina;

    @Column(name = "P1311_AFIRMATIVA", length = 50)
    private String p1311Afirmativa;

    @Column(name = "P1312_A_LOGISTICA", length = 1)
    private String p1312ALogistica;

    @Column(name = "P1312_A_GESTIONES", length = 1)
    private String p1312AGestiones;

    @Column(name = "P1312_A_SUFICIENTE", length = 1)
    private String p1312ASuficiente;

    @Column(name = "P1312_A_ESPECIFIQUE", length = 50)
    private String p1312AEspecifique;

    @Column(name = "P1312_B_INFRA", length = 1)
    private String p1312BInfra;

    @Column(name = "P1312_B_GESTIONES", length = 1)
    private String p1312BGestiones;

    @Column(name = "P1312_B_SUFICIENTE", length = 1)
    private String p1312BSuficiente;

    @Column(name = "P1312_B_ESPECIFIQUE", length = 50)
    private String p1312BEspecifique;

    @Column(name = "P1312_C_PERSONAL", length = 1)
    private String p1312CPersonal;

    @Column(name = "P1312_C_GESTIONES", length = 1)
    private String p1312CGestiones;

    @Column(name = "P1312_C_SUFICIENTE", length = 1)
    private String p1312CSuficiente;

    @Column(name = "P1312_C_ESPECIFIQUE", length = 50)
    private String p1312CEspecifique;

    @Column(name = "P1312_D_PRESUPUESTO", length = 1)
    private String p1312DPresupuesto;

    @Column(name = "P1312_D_GESTIONES", length = 1)
    private String p1312DGestiones;

    @Column(name = "P1312_D_SUFICIENTE", length = 1)
    private String p1312DSuficiente;

    @Column(name = "P1312_D_ESPECIFIQUE", length = 50)
    private String p1312DEspecifique;

    @Column(name = "P1312_E_OTRO", length = 1)
    private String p1312EOtro;

    @Column(name = "P1312_E_OTRO_DETALLE", length = 50)
    private String p1312EOtroDetalle;

    @Column(name = "P1312_E_GESTIONES", length = 1)
    private String p1312EGestiones;

    @Column(name = "P1312_E_SUFICIENTE", length = 1)
    private String p1312ESuficiente;

    @Column(name = "P1312_E_ESPECIFIQUE", length = 50)
    private String p1312EEspecifique;

    @Column(name = "P1312_NINGUNA", length = 1)
    private String p1312Ninguna;

    @Column(name = "P1313_RECIBE", length = 1)
    private String p1313Recibe;

    @Column(name = "P1314_MRE", length = 1)
    private String p1314Mre;

    @Column(name = "P1314_RENIEC", length = 1)
    private String p1314Reniec;

    @Column(name = "P1314_MIGRACION", length = 1)
    private String p1314Migracion;

    @Column(name = "P1314_INTERPOL", length = 1)
    private String p1314Interpol;

    @Column(name = "P1314_INEI", length = 1)
    private String p1314Inei;

    @Column(name = "P1314_JNE", length = 1)
    private String p1314Jne;

    @Column(name = "P1314_ONPE", length = 1)
    private String p1314Onpe;

    @Column(name = "P1314_SUNARP", length = 1)
    private String p1314Sunarp;

    @Column(name = "P1314_PODER_JUDICIAL", length = 1)
    private String p1314PoderJudicial;

    @Column(name = "P1314_OTRO", length = 1)
    private String p1314Otro;

    @Column(name = "P1314_OTRO_DETALLE", length = 50)
    private String p1314OtroDetalle;

    @Column(name = "P1314_NINGUNA", length = 1)
    private String p1314Ninguna;

    @Column(name = "COMENTARIO", length = 50)
    private String comentario;

    @Column(name = "DECLARACION", length = 1)
    private String declaracion;

    public Long getIdFichas13() {
        return idFichas13;
    }

    public void setIdFichas13(Long idFichas13) {
        this.idFichas13 = idFichas13;
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

    public String getEstado_s13() {
        return estado_s13;
    }

    public void setEstado_s13(String estado_s13) {this.estado_s13 = estado_s13;}

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

    public String getValida_s13() {
        return valida_s13;
    }

    public void setValida_s13(String valida_s13) {this.valida_s13 = valida_s13;}

    public String getP131Oficina() {return p131Oficina;}
    public void setP131Oficina(String p131Oficina) {this.p131Oficina = p131Oficina;}

    public String getP132Contratacion() {return p132Contratacion;}
    public void setP132Contratacion(String p132Contratacion) {this.p132Contratacion = p132Contratacion;}

    public String getP132Personal() {return p132Personal;}
    public void setP132Personal(String p132Personal) {this.p132Personal = p132Personal;}

    public String getP132Planeamiento() {return p132Planeamiento;}
    public void setP132Planeamiento(String p132Planeamiento) {this.p132Planeamiento = p132Planeamiento;}

    public String getP132Actividades() {return p132Actividades;}
    public void setP132Actividades(String p132Actividades) {this.p132Actividades = p132Actividades;}

    public String getP132Presupuesto() {return p132Presupuesto;}
    public void setP132Presupuesto(String p132Presupuesto) {this.p132Presupuesto = p132Presupuesto;}

    public String getP132Otro() {return p132Otro;}
    public void setP132Otro(String p132Otro) {this.p132Otro = p132Otro;}

    public String getP132OtroDetalle() {return p132OtroDetalle;}
    public void setP132OtroDetalle(String p132OtroDetalle) {this.p132OtroDetalle = p132OtroDetalle;}

    public String getP133Formulario() {return p133Formulario;}
    public void setP133Formulario(String p133Formulario) {this.p133Formulario = p133Formulario;}

    public String getP133Virtual() {return p133Virtual;}
    public void setP133Virtual(String p133Virtual) {this.p133Virtual = p133Virtual;}

    public String getP133Fisica() {return p133Fisica;}
    public void setP133Fisica(String p133Fisica) {this.p133Fisica = p133Fisica;}

    public Integer getP1342023Recibida() {return p1342023Recibida;}
    public void setP1342023Recibida(Integer p1342023Recibida) {this.p1342023Recibida = p1342023Recibida;}

    public Integer getP1342023Atendida() {return p1342023Atendida;}
    public void setP1342023Atendida(Integer p1342023Atendida) {this.p1342023Atendida = p1342023Atendida;}

    public Integer getP1342023Denegada() {return p1342023Denegada;}
    public void setP1342023Denegada(Integer p1342023Denegada) {this.p1342023Denegada = p1342023Denegada;}

    public Integer getP1342024Recibida() {return p1342024Recibida;}
    public void setP1342024Recibida(Integer p1342024Recibida) {this.p1342024Recibida = p1342024Recibida;}

    public Integer getP1342024Atendida() {return p1342024Atendida;}
    public void setP1342024Atendida(Integer p1342024Atendida) {this.p1342024Atendida = p1342024Atendida;}

    public Integer getP1342024Denegada() {return p1342024Denegada;}
    public void setP1342024Denegada(Integer p1342024Denegada) {this.p1342024Denegada = p1342024Denegada;}

    public Integer getP1342025Recibida() {return p1342025Recibida;}
    public void setP1342025Recibida(Integer p1342025Recibida) {this.p1342025Recibida = p1342025Recibida;}

    public Integer getP1342025Atendida() {return p1342025Atendida;}
    public void setP1342025Atendida(Integer p1342025Atendida) {this.p1342025Atendida = p1342025Atendida;}

    public Integer getP1342025Denegada() {return p1342025Denegada;}
    public void setP1342025Denegada(Integer p1342025Denegada) {this.p1342025Denegada = p1342025Denegada;}

    public String getP135ALogistica() {return p135ALogistica;}
    public void setP135ALogistica(String p135ALogistica) {this.p135ALogistica = p135ALogistica;}

    public String getP135AGestiones() {return p135AGestiones;}
    public void setP135AGestiones(String p135AGestiones) {this.p135AGestiones = p135AGestiones;}

    public String getP135ASuficiente() {return p135ASuficiente;}
    public void setP135ASuficiente(String p135ASuficiente) {this.p135ASuficiente = p135ASuficiente;}

    public String getP135AEspecifique() {return p135AEspecifique;}
    public void setP135AEspecifique(String p135AEspecifique) {this.p135AEspecifique = p135AEspecifique;}

    public String getP135BInfra() {return p135BInfra;}
    public void setP135BInfra(String p135BInfra) {this.p135BInfra = p135BInfra;}

    public String getP135BGestiones() {return p135BGestiones;}
    public void setP135BGestiones(String p135BGestiones) {this.p135BGestiones = p135BGestiones;}

    public String getP135BSuficiente() {return p135BSuficiente;}
    public void setP135BSuficiente(String p135BSuficiente) {this.p135BSuficiente = p135BSuficiente;}

    public String getP135BEspecifique() {return p135BEspecifique;}
    public void setP135BEspecifique(String p135BEspecifique) {this.p135BEspecifique = p135BEspecifique;}

    public String getP135CPersonal() {return p135CPersonal;}
    public void setP135CPersonal(String p135CPersonal) {this.p135CPersonal = p135CPersonal;}

    public String getP135CGestiones() {return p135CGestiones;}
    public void setP135CGestiones(String p135CGestiones) {this.p135CGestiones = p135CGestiones;}

    public String getP135CSuficiente() {return p135CSuficiente;}
    public void setP135CSuficiente(String p135CSuficiente) {this.p135CSuficiente = p135CSuficiente;}

    public String getP135CEspecifique() {return p135CEspecifique;}
    public void setP135CEspecifique(String p135CEspecifique) {this.p135CEspecifique = p135CEspecifique;}

    public String getP135DPresupuesto() {return p135DPresupuesto;}
    public void setP135DPresupuesto(String p135DPresupuesto) {this.p135DPresupuesto = p135DPresupuesto;}

    public String getP135DGestiones() {return p135DGestiones;}
    public void setP135DGestiones(String p135DGestiones) {this.p135DGestiones = p135DGestiones;}

    public String getP135DSuficiente() {return p135DSuficiente;}
    public void setP135DSuficiente(String p135DSuficiente) {this.p135DSuficiente = p135DSuficiente;}

    public String getP135DEspecifique() {return p135DEspecifique;}
    public void setP135DEspecifique(String p135DEspecifique) {this.p135DEspecifique = p135DEspecifique;}

    public String getP135EOtro() {return p135EOtro;}
    public void setP135EOtro(String p135EOtro) {this.p135EOtro = p135EOtro;}

    public String getP135EOtroDetalle() {return p135EOtroDetalle;}
    public void setP135EOtroDetalle(String p135EOtroDetalle) {this.p135EOtroDetalle = p135EOtroDetalle;}

    public String getP135EGestiones() {return p135EGestiones;}
    public void setP135EGestiones(String p135EGestiones) {this.p135EGestiones = p135EGestiones;}

    public String getP135ESuficiente() {return p135ESuficiente;}
    public void setP135ESuficiente(String p135ESuficiente) {this.p135ESuficiente = p135ESuficiente;}

    public String getP135EEspecifique() {return p135EEspecifique;}
    public void setP135EEspecifique(String p135EEspecifique) {this.p135EEspecifique = p135EEspecifique;}

    public String getP135Ninguno() {return p135Ninguno;}
    public void setP135Ninguno(String p135Ninguno) {this.p135Ninguno = p135Ninguno;}

    public String getP136Recibe() {return p136Recibe;}
    public void setP136Recibe(String p136Recibe) {this.p136Recibe = p136Recibe;}

    public String getP137Mre() {return p137Mre;}
    public void setP137Mre(String p137Mre) {this.p137Mre = p137Mre;}

    public String getP137Reniec() {return p137Reniec;}
    public void setP137Reniec(String p137Reniec) {this.p137Reniec = p137Reniec;}

    public String getP137Migraciones() {return p137Migraciones;}
    public void setP137Migraciones(String p137Migraciones) {this.p137Migraciones = p137Migraciones;}

    public String getP137Interpol() {return p137Interpol;}
    public void setP137Interpol(String p137Interpol) {this.p137Interpol = p137Interpol;}

    public String getP137Inei() {return p137Inei;}
    public void setP137Inei(String p137Inei) {this.p137Inei = p137Inei;}

    public String getP137Jne() {return p137Jne;}
    public void setP137Jne(String p137Jne) {this.p137Jne = p137Jne;}

    public String getP137Onpe() {return p137Onpe;}
    public void setP137Onpe(String p137Onpe) {this.p137Onpe = p137Onpe;}

    public String getP137Sunarp() {return p137Sunarp;}
    public void setP137Sunarp(String p137Sunarp) {this.p137Sunarp = p137Sunarp;}

    public String getP137PoderJudicial() {return p137PoderJudicial;}
    public void setP137PoderJudicial(String p137PoderJudicial) {this.p137PoderJudicial = p137PoderJudicial;}

    public String getP137Otro() {return p137Otro;}
    public void setP137Otro(String p137Otro) {this.p137Otro = p137Otro;}

    public String getP137OtroDetalle() {return p137OtroDetalle;}
    public void setP137OtroDetalle(String p137OtroDetalle) {this.p137OtroDetalle = p137OtroDetalle;}

    public String getP137Ninguna() {return p137Ninguna;}
    public void setP137Ninguna(String p137Ninguna) {this.p137Ninguna = p137Ninguna;}

    public String getP138Cuenta() {return p138Cuenta;}
    public void setP138Cuenta(String p138Cuenta) {this.p138Cuenta = p138Cuenta;}

    public Integer getP1392023Reclamo() {return p1392023Reclamo;}
    public void setP1392023Reclamo(Integer p1392023Reclamo) {this.p1392023Reclamo = p1392023Reclamo;}

    public Integer getP1392023Queja() {return p1392023Queja;}
    public void setP1392023Queja(Integer p1392023Queja) {this.p1392023Queja = p1392023Queja;}

    public Integer getP1392023Sugerencia() {return p1392023Sugerencia;}
    public void setP1392023Sugerencia(Integer p1392023Sugerencia) {this.p1392023Sugerencia = p1392023Sugerencia;}

    public Integer getP1392024Reclamo() {return p1392024Reclamo;}
    public void setP1392024Reclamo(Integer p1392024Reclamo) {this.p1392024Reclamo = p1392024Reclamo;}

    public Integer getP1392024Queja() {return p1392024Queja;}
    public void setP1392024Queja(Integer p1392024Queja) {this.p1392024Queja = p1392024Queja;}

    public Integer getP1392024Sugerencia() {return p1392024Sugerencia;}
    public void setP1392024Sugerencia(Integer p1392024Sugerencia) {this.p1392024Sugerencia = p1392024Sugerencia;}

    public Integer getP1392025Reclamo() {return p1392025Reclamo;}
    public void setP1392025Reclamo(Integer p1392025Reclamo) {this.p1392025Reclamo = p1392025Reclamo;}

    public Integer getP1392025Queja() {return p1392025Queja;}
    public void setP1392025Queja(Integer p1392025Queja) {this.p1392025Queja = p1392025Queja;}

    public Integer getP1392025Sugerencia() {return p1392025Sugerencia;}
    public void setP1392025Sugerencia(Integer p1392025Sugerencia) {this.p1392025Sugerencia = p1392025Sugerencia;}

    public String getP1310Oficina() {return p1310Oficina;}
    public void setP1310Oficina(String p1310Oficina) {this.p1310Oficina = p1310Oficina;}

    public String getP1311Afirmativa() {return p1311Afirmativa;}
    public void setP1311Afirmativa(String p1311Afirmativa) {this.p1311Afirmativa = p1311Afirmativa;}

    public String getP1312ALogistica() {return p1312ALogistica;}
    public void setP1312ALogistica(String p1312ALogistica) {this.p1312ALogistica = p1312ALogistica;}

    public String getP1312AGestiones() {return p1312AGestiones;}
    public void setP1312AGestiones(String p1312AGestiones) {this.p1312AGestiones = p1312AGestiones;}

    public String getP1312ASuficiente() {return p1312ASuficiente;}
    public void setP1312ASuficiente(String p1312ASuficiente) {this.p1312ASuficiente = p1312ASuficiente;}

    public String getP1312AEspecifique() {return p1312AEspecifique;}
    public void setP1312AEspecifique(String p1312AEspecifique) {this.p1312AEspecifique = p1312AEspecifique;}

    public String getP1312BInfra() {return p1312BInfra;}
    public void setP1312BInfra(String p1312BInfra) {this.p1312BInfra = p1312BInfra;}

    public String getP1312BGestiones() {return p1312BGestiones;}
    public void setP1312BGestiones(String p1312BGestiones) {this.p1312BGestiones = p1312BGestiones;}

    public String getP1312BSuficiente() {return p1312BSuficiente;}
    public void setP1312BSuficiente(String p1312BSuficiente) {this.p1312BSuficiente = p1312BSuficiente;}

    public String getP1312BEspecifique() {return p1312BEspecifique;}
    public void setP1312BEspecifique(String p1312BEspecifique) {this.p1312BEspecifique = p1312BEspecifique;}

    public String getP1312CPersonal() {return p1312CPersonal;}
    public void setP1312CPersonal(String p1312CPersonal) {this.p1312CPersonal = p1312CPersonal;}

    public String getP1312CGestiones() {return p1312CGestiones;}
    public void setP1312CGestiones(String p1312CGestiones) {this.p1312CGestiones = p1312CGestiones;}

    public String getP1312CSuficiente() {return p1312CSuficiente;}
    public void setP1312CSuficiente(String p1312CSuficiente) {this.p1312CSuficiente = p1312CSuficiente;}

    public String getP1312CEspecifique() {return p1312CEspecifique;}
    public void setP1312CEspecifique(String p1312CEspecifique) {this.p1312CEspecifique = p1312CEspecifique;}

    public String getP1312DPresupuesto() {return p1312DPresupuesto;}
    public void setP1312DPresupuesto(String p1312DPresupuesto) {this.p1312DPresupuesto = p1312DPresupuesto;}

    public String getP1312DGestiones() {return p1312DGestiones;}
    public void setP1312DGestiones(String p1312DGestiones) {this.p1312DGestiones = p1312DGestiones;}

    public String getP1312DSuficiente() {return p1312DSuficiente;}
    public void setP1312DSuficiente(String p1312DSuficiente) {this.p1312DSuficiente = p1312DSuficiente;}

    public String getP1312DEspecifique() {return p1312DEspecifique;}
    public void setP1312DEspecifique(String p1312DEspecifique) {this.p1312DEspecifique = p1312DEspecifique;}

    public String getP1312EOtro() {return p1312EOtro;}
    public void setP1312EOtro(String p1312EOtro) {this.p1312EOtro = p1312EOtro;}

    public String getP1312EOtroDetalle() {return p1312EOtroDetalle;}
    public void setP1312EOtroDetalle(String p1312EOtroDetalle) {this.p1312EOtroDetalle = p1312EOtroDetalle;}

    public String getP1312EGestiones() {return p1312EGestiones;}
    public void setP1312EGestiones(String p1312EGestiones) {this.p1312EGestiones = p1312EGestiones;}

    public String getP1312ESuficiente() {return p1312ESuficiente;}
    public void setP1312ESuficiente(String p1312ESuficiente) {this.p1312ESuficiente = p1312ESuficiente;}

    public String getP1312EEspecifique() {return p1312EEspecifique;}
    public void setP1312EEspecifique(String p1312EEspecifique) {this.p1312EEspecifique = p1312EEspecifique;}

    public String getP1312Ninguna() {return p1312Ninguna;}
    public void setP1312Ninguna(String p1312Ninguna) {this.p1312Ninguna = p1312Ninguna;}

    public String getP1313Recibe() {return p1313Recibe;}
    public void setP1313Recibe(String p1313Recibe) {this.p1313Recibe = p1313Recibe;}

    public String getP1314Mre() {return p1314Mre;}
    public void setP1314Mre(String p1314Mre) {this.p1314Mre = p1314Mre;}

    public String getP1314Reniec() {return p1314Reniec;}
    public void setP1314Reniec(String p1314Reniec) {this.p1314Reniec = p1314Reniec;}

    public String getP1314Migracion() {return p1314Migracion;}
    public void setP1314Migracion(String p1314Migracion) {this.p1314Migracion = p1314Migracion;}

    public String getP1314Interpol() {return p1314Interpol;}
    public void setP1314Interpol(String p1314Interpol) {this.p1314Interpol = p1314Interpol;}

    public String getP1314Inei() {return p1314Inei;}
    public void setP1314Inei(String p1314Inei) {this.p1314Inei = p1314Inei;}

    public String getP1314Jne() {return p1314Jne;}
    public void setP1314Jne(String p1314Jne) {this.p1314Jne = p1314Jne;}

    public String getP1314Onpe() {return p1314Onpe;}
    public void setP1314Onpe(String p1314Onpe) {this.p1314Onpe = p1314Onpe;}

    public String getP1314Sunarp() {return p1314Sunarp;}
    public void setP1314Sunarp(String p1314Sunarp) {this.p1314Sunarp = p1314Sunarp;}

    public String getP1314PoderJudicial() {return p1314PoderJudicial;}
    public void setP1314PoderJudicial(String p1314PoderJudicial) {this.p1314PoderJudicial = p1314PoderJudicial;}

    public String getP1314Otro() {return p1314Otro;}
    public void setP1314Otro(String p1314Otro) {this.p1314Otro = p1314Otro;}

    public String getP1314OtroDetalle() {return p1314OtroDetalle;}
    public void setP1314OtroDetalle(String p1314OtroDetalle) {this.p1314OtroDetalle = p1314OtroDetalle;}

    public String getP1314Ninguna() {return p1314Ninguna;}
    public void setP1314Ninguna(String p1314Ninguna) {this.p1314Ninguna = p1314Ninguna;}

    public String getComentario() {return comentario;}
    public void setComentario(String comentario) {this.comentario = comentario;}

    public String getDeclaracion() {return declaracion;}
    public void setDeclaracion(String declaracion) {this.declaracion = declaracion;}


}