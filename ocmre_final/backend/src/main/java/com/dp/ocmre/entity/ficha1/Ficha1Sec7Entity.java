
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
@Table(name = "MRE_FICHA_S7", schema = ESQUEMA_BD)
public class Ficha1Sec7Entity {

    @Id
    @Column(name = "ID_FICHA_S7")
    private Long idFichas7;

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

    @Column(name = "ESTADO_S7")
    private String estado_s7;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S7", length = 1)
    private String valida_s7;


    @Column(name = "P71_REQUIERE", length = 1) // CHAR(1 BYTE)
    private String p71Requiere;

    @Column(name = "P72_AFIRMATIVA", length = 1) // CHAR(1 BYTE)
    private String p72Afirmativa;

    @Column(name = "P73_2023_SOLICI_HOMBRE")
    private Integer p732023SoliciHombre;

    @Column(name = "P73_2023_SOLICI_MUJER")
    private Integer p732023SoliciMujer;

    @Column(name = "P73_2023_SOLICI_MENORES")
    private Integer p732023SoliciMenores;

    @Column(name = "P73_2023_OTORGA_HOMBRE")
    private Integer p732023OtorgaHombre;

    @Column(name = "P73_2023_OTORGA_MUJER")
    private Integer p732023OtorgaMujer;

    @Column(name = "P73_2023_OTORGA_MENORES")
    private Integer p732023OtorgaMenores;

    @Column(name = "P73_2023_DENEGA_HOMBRE")
    private Integer p732023DenegaHombre;

    @Column(name = "P73_2023_DENEGA_MUJER")
    private Integer p732023DenegaMujer;

    @Column(name = "P73_2023_DENEGA_MENORES")
    private Integer p732023DenegaMenores;
    


    
 // =========================================================
// P7.3: Solicitudes, Otorgamientos y Denegaciones (2024)
// =========================================================
// ===== Año 2024 (por sexo) =====
@Column(name = "P73_2024_SOLICI_HOMBRE")
private Integer p732024SoliciHombre;

@Column(name = "P73_2024_SOLICI_MUJER")
private Integer p732024SoliciMujer;

@Column(name = "P73_2024_SOLICI_MENORES")
private Integer p732024SoliciMenores;

@Column(name = "P73_2024_OTORGA_HOMBRE")
private Integer p732024OtorgaHombre;

@Column(name = "P73_2024_OTORGA_MUJER")
private Integer p732024OtorgaMujer;

@Column(name = "P73_2024_OTORGA_MENORES")
private Integer p732024OtorgaMenores;

@Column(name = "P73_2024_DENEGA_HOMBRE")
private Integer p732024DenegaHombre;

@Column(name = "P73_2024_DENEGA_MUJER")
private Integer p732024DenegaMujer;

@Column(name = "P73_2024_DENEGA_MENORES")
private Integer p732024DenegaMenores;


// ===== Año 2025 (por sexo) =====
@Column(name = "P73_2025_SOLICI_HOMBRE")
private Integer p732025SoliciHombre;

@Column(name = "P73_2025_SOLICI_MUJER")
private Integer p732025SoliciMujer;

@Column(name = "P73_2025_SOLICI_MENORES")
private Integer p732025SoliciMenores;

@Column(name = "P73_2025_OTORGA_HOMBRE")
private Integer p732025OtorgaHombre;

@Column(name = "P73_2025_OTORGA_MUJER")
private Integer p732025OtorgaMujer;

@Column(name = "P73_2025_OTORGA_MENORES")
private Integer p732025OtorgaMenores;

@Column(name = "P73_2025_DENEGA_HOMBRE")
private Integer p732025DenegaHombre;

@Column(name = "P73_2025_DENEGA_MUJER")
private Integer p732025DenegaMujer;

@Column(name = "P73_2025_DENEGA_MENORES")
private Integer p732025DenegaMenores;

    // --- Campos de Conteo por Tipo de Visa - Año 2023 (NUMBER(4,0) -> Integer) ---

    @Column(name = "P73_2023_NUM_OFICIAL")
    private Integer p732023NumOficial;

    @Column(name = "P73_2023_NUM_DIPLOMATICA")
    private Integer p732023NumDiplomatica;

    @Column(name = "P73_2023_NUM_CONSULAR")
    private Integer p732023NumConsular;

    @Column(name = "P73_2023_NUM_NEGOCIOS")
    private Integer p732023NumNegocios;

    @Column(name = "P73_2023_NUM_TURISTA")
    private Integer p732023NumTurista;

    @Column(name = "P73_2023_NUM_COOPERANTE")
    private Integer p732023NumCooperante;

    @Column(name = "P73_2023_NUM_INTERCAMBIO")
    private Integer p732023NumIntercambio;

    @Column(name = "P73_2023_NUM_OTROS")
    private Integer p732023NumOtros;
    
    @Column(name = "P73_2023_NUM_OTROS_DETALLE", length = 300)
    private String p732023NumOtrosDetalle;
    
    // --- Campos de Conteo por Tipo de Visa - Año 2024 (NUMBER(4,0) -> Integer) ---

    @Column(name = "P73_2024_NUM_OFICIAL")
    private Integer p732024NumOficial;

    @Column(name = "P73_2024_NUM_DIPLOMATICA")
    private Integer p732024NumDiplomatica;

    @Column(name = "P73_2024_NUM_CONSULAR")
    private Integer p732024NumConsular;

    @Column(name = "P73_2024_NUM_NEGOCIOS")
    private Integer p732024NumNegocios;

    @Column(name = "P73_2024_NUM_TURISTA")
    private Integer p732024NumTurista;

    @Column(name = "P73_2024_NUM_COOPERANTE")
    private Integer p732024NumCooperante;

    @Column(name = "P73_2024_NUM_INTERCAMBIO")
    private Integer p732024NumIntercambio;

    @Column(name = "P73_2024_NUM_OTROS")
    private Integer p732024NumOtros;
    
    @Column(name = "P73_2024_NUM_OTROS_DETALLE", length = 300)
    private String p732024NumOtrosDetalle;

    // --- Campos de Conteo por Tipo de Visa - Año 2025 (NUMBER(4,0) -> Integer) ---

    @Column(name = "P73_2025_NUM_OFICIAL")
    private Integer p732025NumOficial;

    @Column(name = "P73_2025_NUM_DIPLOMATICA")
    private Integer p732025NumDiplomatica;

    @Column(name = "P73_2025_NUM_CONSULAR")
    private Integer p732025NumConsular;

    @Column(name = "P73_2025_NUM_NEGOCIOS")
    private Integer p732025NumNegocios;

    @Column(name = "P73_2025_NUM_TURISTA")
    private Integer p732025NumTurista;

    @Column(name = "P73_2025_NUM_COOPERANTE")
    private Integer p732025NumCooperante;

    @Column(name = "P73_2025_NUM_INTERCAMBIO")
    private Integer p732025NumIntercambio;

    @Column(name = "P73_2025_NUM_OTROS")
    private Integer p732025NumOtros;

    @Column(name = "P73_2025_NUM_OTROS_DETALLE", length = 300)
    private String p732025NumOtrosDetalle;
    
    // --- Campos de caracteres (CHAR(1 BYTE) y VARCHAR2) ---

    @Column(name = "P74_A_LOGISTICA", length = 1)
    private String p74ALogistica;

    @Column(name = "P74_A_GESTIONES", length = 1)
    private String p74AGestiones;

    @Column(name = "P74_A_SUFICIENTE", length = 1)
    private String p74ASuficiente;

    @Column(name = "P74_A_ESPECIFIQUE", length = 500)
    private String p74AEspecifique;

    @Column(name = "P74_B_INFRA", length = 1)
    private String p74BInfra;

    @Column(name = "P74_B_GESTIONES", length = 1)
    private String p74BGestiones;

    @Column(name = "P74_B_SUFICIENTE", length = 1)
    private String p74BSuficiente;

    @Column(name = "P74_B_ESPECIFIQUE", length = 500)
    private String p74BEspecifique;

    @Column(name = "P74_C_PERSONAL", length = 1)
    private String p74CPersonal;

    @Column(name = "P74_C_GESTIONES", length = 1)
    private String p74CGestiones;

    @Column(name = "P74_C_SUFICIENTE", length = 1)
    private String p74CSuficiente;

    @Column(name = "P74_C_ESPECIFIQUE", length = 500)
    private String p74CEspecifique;

    @Column(name = "P74_D_PRESUPUESTO", length = 1)
    private String p74DPresupuesto;

    @Column(name = "P74_D_GESTIONES", length = 1)
    private String p74DGestiones;

    @Column(name = "P74_D_SUFICIENTE", length = 1)
    private String p74DSuficiente;

    @Column(name = "P74_D_ESPECIFIQUE", length = 500)
    private String p74DEspecifique;

    @Column(name = "P74_E_OTRO", length = 1)
    private String p74EOtro;

    @Column(name = "P74_E_OTRO_DETALLE", length = 300)
    private String p74EOtroDetalle;

    @Column(name = "P74_E_GESTIONES", length = 1)
    private String p74EGestiones;

    @Column(name = "P74_E_SUFICIENTE", length = 1)
    private String p74ESuficiente;

    @Column(name = "P74_E_ESPECIFIQUE", length = 500)
    private String p74EEspecifique;

    @Column(name = "P74_NINGUNO", length = 1)
    private String p74Ninguno;
    
    // --- Campos de Colaboración (CHAR(1 BYTE) y VARCHAR2) ---

    @Column(name = "P75_RECIBE", length = 1)
    private String p75Recibe;

    @Column(name = "P76_MRE", length = 1)
    private String p76Mre;

    @Column(name = "P76_RENIEC", length = 1)
    private String p76Reniec;

    @Column(name = "P76_MIGRACIONES", length = 1)
    private String p76Migraciones;

    @Column(name = "P76_INTERPOL", length = 1)
    private String p76Interpol;

    @Column(name = "P76_INEI", length = 1)
    private String p76Inei;

    @Column(name = "P76_JNE", length = 1)
    private String p76Jne;

    @Column(name = "P76_ONPE", length = 1)
    private String p76Onpe;

    @Column(name = "P76_SUNARP", length = 1)
    private String p76Sunarp;

    @Column(name = "P76_PODER_JUDICIAL", length = 1)
    private String p76PoderJudicial;

    @Column(name = "P76_OTRO", length = 1)
    private String p76Otro;

    @Column(name = "P76_OTRO_DETALLE", length = 500)
    private String p76OtroDetalle;

    @Column(name = "P76_NINGUNA", length = 1)
    private String p76Ninguna;

    public Long getIdFichas7() {
        return idFichas7;
    }

    public void setIdFichas7(Long idFichas7) {
        this.idFichas7 = idFichas7;
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

    public String getEstado_s7() {
        return estado_s7;
    }

    public void setEstado_s7(String estado_s7) {
        this.estado_s7 = estado_s7;
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

    public String getValida_s7() {
        return valida_s7;
    }

    public void setValida_s7(String valida_s7) {
        this.valida_s7 = valida_s7;
    }

    public String getP71Requiere() {
        return p71Requiere;
    }

    public void setP71Requiere(String p71Requiere) {
        this.p71Requiere = p71Requiere;
    }

    public String getP72Afirmativa() {
        return p72Afirmativa;
    }

    public void setP72Afirmativa(String p72Afirmativa) {
        this.p72Afirmativa = p72Afirmativa;
    }

    public Integer getP732023SoliciHombre() {
        return p732023SoliciHombre;
    }

    public void setP732023SoliciHombre(Integer p732023SoliciHombre) {
        this.p732023SoliciHombre = p732023SoliciHombre;
    }

    public Integer getP732023SoliciMujer() {
        return p732023SoliciMujer;
    }

    public void setP732023SoliciMujer(Integer p732023SoliciMujer) {
        this.p732023SoliciMujer = p732023SoliciMujer;
    }

    public Integer getP732023SoliciMenores() {
        return p732023SoliciMenores;
    }

    public void setP732023SoliciMenores(Integer p732023SoliciMenores) {
        this.p732023SoliciMenores = p732023SoliciMenores;
    }

    public Integer getP732023OtorgaHombre() {
        return p732023OtorgaHombre;
    }

    public void setP732023OtorgaHombre(Integer p732023OtorgaHombre) {
        this.p732023OtorgaHombre = p732023OtorgaHombre;
    }

    public Integer getP732023OtorgaMujer() {
        return p732023OtorgaMujer;
    }

    public void setP732023OtorgaMujer(Integer p732023OtorgaMujer) {
        this.p732023OtorgaMujer = p732023OtorgaMujer;
    }

    public Integer getP732023OtorgaMenores() {
        return p732023OtorgaMenores;
    }

    public void setP732023OtorgaMenores(Integer p732023OtorgaMenores) {
        this.p732023OtorgaMenores = p732023OtorgaMenores;
    }

    public Integer getP732023DenegaHombre() {
        return p732023DenegaHombre;
    }

    public void setP732023DenegaHombre(Integer p732023DenegaHombre) {
        this.p732023DenegaHombre = p732023DenegaHombre;
    }

    public Integer getP732023DenegaMujer() {
        return p732023DenegaMujer;
    }

    public void setP732023DenegaMujer(Integer p732023DenegaMujer) {
        this.p732023DenegaMujer = p732023DenegaMujer;
    }

    public Integer getP732023DenegaMenores() {
        return p732023DenegaMenores;
    }

    public void setP732023DenegaMenores(Integer p732023DenegaMenores) {
        this.p732023DenegaMenores = p732023DenegaMenores;
    }

    public Integer getP732024SoliciHombre() {
        return p732024SoliciHombre;
    }

    public void setP732024SoliciHombre(Integer p732024SoliciHombre) {
        this.p732024SoliciHombre = p732024SoliciHombre;
    }

    public Integer getP732024SoliciMujer() {
        return p732024SoliciMujer;
    }

    public void setP732024SoliciMujer(Integer p732024SoliciMujer) {
        this.p732024SoliciMujer = p732024SoliciMujer;
    }

    public Integer getP732024SoliciMenores() {
        return p732024SoliciMenores;
    }

    public void setP732024SoliciMenores(Integer p732024SoliciMenores) {
        this.p732024SoliciMenores = p732024SoliciMenores;
    }

    public Integer getP732024OtorgaHombre() {
        return p732024OtorgaHombre;
    }

    public void setP732024OtorgaHombre(Integer p732024OtorgaHombre) {
        this.p732024OtorgaHombre = p732024OtorgaHombre;
    }

    public Integer getP732024OtorgaMujer() {
        return p732024OtorgaMujer;
    }

    public void setP732024OtorgaMujer(Integer p732024OtorgaMujer) {
        this.p732024OtorgaMujer = p732024OtorgaMujer;
    }

    public Integer getP732024OtorgaMenores() {
        return p732024OtorgaMenores;
    }

    public void setP732024OtorgaMenores(Integer p732024OtorgaMenores) {
        this.p732024OtorgaMenores = p732024OtorgaMenores;
    }

    public Integer getP732024DenegaHombre() {
        return p732024DenegaHombre;
    }

    public void setP732024DenegaHombre(Integer p732024DenegaHombre) {
        this.p732024DenegaHombre = p732024DenegaHombre;
    }

    public Integer getP732024DenegaMujer() {
        return p732024DenegaMujer;
    }

    public void setP732024DenegaMujer(Integer p732024DenegaMujer) {
        this.p732024DenegaMujer = p732024DenegaMujer;
    }

    public Integer getP732024DenegaMenores() {
        return p732024DenegaMenores;
    }

    public void setP732024DenegaMenores(Integer p732024DenegaMenores) {
        this.p732024DenegaMenores = p732024DenegaMenores;
    }

    public Integer getP732025SoliciHombre() {
        return p732025SoliciHombre;
    }

    public void setP732025SoliciHombre(Integer p732025SoliciHombre) {
        this.p732025SoliciHombre = p732025SoliciHombre;
    }

    public Integer getP732025SoliciMujer() {
        return p732025SoliciMujer;
    }

    public void setP732025SoliciMujer(Integer p732025SoliciMujer) {
        this.p732025SoliciMujer = p732025SoliciMujer;
    }

    public Integer getP732025SoliciMenores() {
        return p732025SoliciMenores;
    }

    public void setP732025SoliciMenores(Integer p732025SoliciMenores) {
        this.p732025SoliciMenores = p732025SoliciMenores;
    }

    public Integer getP732025OtorgaHombre() {
        return p732025OtorgaHombre;
    }

    public void setP732025OtorgaHombre(Integer p732025OtorgaHombre) {
        this.p732025OtorgaHombre = p732025OtorgaHombre;
    }

    public Integer getP732025OtorgaMujer() {
        return p732025OtorgaMujer;
    }

    public void setP732025OtorgaMujer(Integer p732025OtorgaMujer) {
        this.p732025OtorgaMujer = p732025OtorgaMujer;
    }

    public Integer getP732025OtorgaMenores() {
        return p732025OtorgaMenores;
    }

    public void setP732025OtorgaMenores(Integer p732025OtorgaMenores) {
        this.p732025OtorgaMenores = p732025OtorgaMenores;
    }

    public Integer getP732025DenegaHombre() {
        return p732025DenegaHombre;
    }

    public void setP732025DenegaHombre(Integer p732025DenegaHombre) {
        this.p732025DenegaHombre = p732025DenegaHombre;
    }

    public Integer getP732025DenegaMujer() {
        return p732025DenegaMujer;
    }

    public void setP732025DenegaMujer(Integer p732025DenegaMujer) {
        this.p732025DenegaMujer = p732025DenegaMujer;
    }

    public Integer getP732025DenegaMenores() {
        return p732025DenegaMenores;
    }

    public void setP732025DenegaMenores(Integer p732025DenegaMenores) {
        this.p732025DenegaMenores = p732025DenegaMenores;
    }

    public Integer getP732023NumOficial() {
        return p732023NumOficial;
    }

    public void setP732023NumOficial(Integer p732023NumOficial) {
        this.p732023NumOficial = p732023NumOficial;
    }

    public Integer getP732023NumDiplomatica() {
        return p732023NumDiplomatica;
    }

    public void setP732023NumDiplomatica(Integer p732023NumDiplomatica) {
        this.p732023NumDiplomatica = p732023NumDiplomatica;
    }

    public Integer getP732023NumConsular() {
        return p732023NumConsular;
    }

    public void setP732023NumConsular(Integer p732023NumConsular) {
        this.p732023NumConsular = p732023NumConsular;
    }

    public Integer getP732023NumNegocios() {
        return p732023NumNegocios;
    }

    public void setP732023NumNegocios(Integer p732023NumNegocios) {
        this.p732023NumNegocios = p732023NumNegocios;
    }

    public Integer getP732023NumTurista() {
        return p732023NumTurista;
    }

    public void setP732023NumTurista(Integer p732023NumTurista) {
        this.p732023NumTurista = p732023NumTurista;
    }

    public Integer getP732023NumCooperante() {
        return p732023NumCooperante;
    }

    public void setP732023NumCooperante(Integer p732023NumCooperante) {
        this.p732023NumCooperante = p732023NumCooperante;
    }

    public Integer getP732023NumIntercambio() {
        return p732023NumIntercambio;
    }

    public void setP732023NumIntercambio(Integer p732023NumIntercambio) {
        this.p732023NumIntercambio = p732023NumIntercambio;
    }

    public Integer getP732023NumOtros() {
        return p732023NumOtros;
    }

    public void setP732023NumOtros(Integer p732023NumOtros) {
        this.p732023NumOtros = p732023NumOtros;
    }

    public String getP732023NumOtrosDetalle() {
        return p732023NumOtrosDetalle;
    }

    public void setP732023NumOtrosDetalle(String p732023NumOtrosDetalle) {
        this.p732023NumOtrosDetalle = p732023NumOtrosDetalle;
    }

    public Integer getP732024NumOficial() {
        return p732024NumOficial;
    }

    public void setP732024NumOficial(Integer p732024NumOficial) {
        this.p732024NumOficial = p732024NumOficial;
    }

    public Integer getP732024NumDiplomatica() {
        return p732024NumDiplomatica;
    }

    public void setP732024NumDiplomatica(Integer p732024NumDiplomatica) {
        this.p732024NumDiplomatica = p732024NumDiplomatica;
    }

    public Integer getP732024NumConsular() {
        return p732024NumConsular;
    }

    public void setP732024NumConsular(Integer p732024NumConsular) {
        this.p732024NumConsular = p732024NumConsular;
    }

    public Integer getP732024NumNegocios() {
        return p732024NumNegocios;
    }

    public void setP732024NumNegocios(Integer p732024NumNegocios) {
        this.p732024NumNegocios = p732024NumNegocios;
    }

    public Integer getP732024NumTurista() {
        return p732024NumTurista;
    }

    public void setP732024NumTurista(Integer p732024NumTurista) {
        this.p732024NumTurista = p732024NumTurista;
    }

    public Integer getP732024NumCooperante() {
        return p732024NumCooperante;
    }

    public void setP732024NumCooperante(Integer p732024NumCooperante) {
        this.p732024NumCooperante = p732024NumCooperante;
    }

    public Integer getP732024NumIntercambio() {
        return p732024NumIntercambio;
    }

    public void setP732024NumIntercambio(Integer p732024NumIntercambio) {
        this.p732024NumIntercambio = p732024NumIntercambio;
    }

    public Integer getP732024NumOtros() {
        return p732024NumOtros;
    }

    public void setP732024NumOtros(Integer p732024NumOtros) {
        this.p732024NumOtros = p732024NumOtros;
    }

    public String getP732024NumOtrosDetalle() {
        return p732024NumOtrosDetalle;
    }

    public void setP732024NumOtrosDetalle(String p732024NumOtrosDetalle) {
        this.p732024NumOtrosDetalle = p732024NumOtrosDetalle;
    }

    public Integer getP732025NumOficial() {
        return p732025NumOficial;
    }

    public void setP732025NumOficial(Integer p732025NumOficial) {
        this.p732025NumOficial = p732025NumOficial;
    }

    public Integer getP732025NumDiplomatica() {
        return p732025NumDiplomatica;
    }

    public void setP732025NumDiplomatica(Integer p732025NumDiplomatica) {
        this.p732025NumDiplomatica = p732025NumDiplomatica;
    }

    public Integer getP732025NumConsular() {
        return p732025NumConsular;
    }

    public void setP732025NumConsular(Integer p732025NumConsular) {
        this.p732025NumConsular = p732025NumConsular;
    }

    public Integer getP732025NumNegocios() {
        return p732025NumNegocios;
    }

    public void setP732025NumNegocios(Integer p732025NumNegocios) {
        this.p732025NumNegocios = p732025NumNegocios;
    }

    public Integer getP732025NumTurista() {
        return p732025NumTurista;
    }

    public void setP732025NumTurista(Integer p732025NumTurista) {
        this.p732025NumTurista = p732025NumTurista;
    }

    public Integer getP732025NumCooperante() {
        return p732025NumCooperante;
    }

    public void setP732025NumCooperante(Integer p732025NumCooperante) {
        this.p732025NumCooperante = p732025NumCooperante;
    }

    public Integer getP732025NumIntercambio() {
        return p732025NumIntercambio;
    }

    public void setP732025NumIntercambio(Integer p732025NumIntercambio) {
        this.p732025NumIntercambio = p732025NumIntercambio;
    }

    public Integer getP732025NumOtros() {
        return p732025NumOtros;
    }

    public void setP732025NumOtros(Integer p732025NumOtros) {
        this.p732025NumOtros = p732025NumOtros;
    }

    public String getP732025NumOtrosDetalle() {
        return p732025NumOtrosDetalle;
    }

    public void setP732025NumOtrosDetalle(String p732025NumOtrosDetalle) {
        this.p732025NumOtrosDetalle = p732025NumOtrosDetalle;
    }

    public String getP74ALogistica() {
        return p74ALogistica;
    }

    public void setP74ALogistica(String p74ALogistica) {
        this.p74ALogistica = p74ALogistica;
    }

    public String getP74AGestiones() {
        return p74AGestiones;
    }

    public void setP74AGestiones(String p74AGestiones) {
        this.p74AGestiones = p74AGestiones;
    }

    public String getP74ASuficiente() {
        return p74ASuficiente;
    }

    public void setP74ASuficiente(String p74ASuficiente) {
        this.p74ASuficiente = p74ASuficiente;
    }

    public String getP74AEspecifique() {
        return p74AEspecifique;
    }

    public void setP74AEspecifique(String p74AEspecifique) {
        this.p74AEspecifique = p74AEspecifique;
    }

    public String getP74BInfra() {
        return p74BInfra;
    }

    public void setP74BInfra(String p74BInfra) {
        this.p74BInfra = p74BInfra;
    }

    public String getP74BGestiones() {
        return p74BGestiones;
    }

    public void setP74BGestiones(String p74BGestiones) {
        this.p74BGestiones = p74BGestiones;
    }

    public String getP74BSuficiente() {
        return p74BSuficiente;
    }

    public void setP74BSuficiente(String p74BSuficiente) {
        this.p74BSuficiente = p74BSuficiente;
    }

    public String getP74BEspecifique() {
        return p74BEspecifique;
    }

    public void setP74BEspecifique(String p74BEspecifique) {
        this.p74BEspecifique = p74BEspecifique;
    }

    public String getP74CPersonal() {
        return p74CPersonal;
    }

    public void setP74CPersonal(String p74CPersonal) {
        this.p74CPersonal = p74CPersonal;
    }

    public String getP74CGestiones() {
        return p74CGestiones;
    }

    public void setP74CGestiones(String p74CGestiones) {
        this.p74CGestiones = p74CGestiones;
    }

    public String getP74CSuficiente() {
        return p74CSuficiente;
    }

    public void setP74CSuficiente(String p74CSuficiente) {
        this.p74CSuficiente = p74CSuficiente;
    }

    public String getP74CEspecifique() {
        return p74CEspecifique;
    }

    public void setP74CEspecifique(String p74CEspecifique) {
        this.p74CEspecifique = p74CEspecifique;
    }

    public String getP74DPresupuesto() {
        return p74DPresupuesto;
    }

    public void setP74DPresupuesto(String p74DPresupuesto) {
        this.p74DPresupuesto = p74DPresupuesto;
    }

    public String getP74DGestiones() {
        return p74DGestiones;
    }

    public void setP74DGestiones(String p74DGestiones) {
        this.p74DGestiones = p74DGestiones;
    }

    public String getP74DSuficiente() {
        return p74DSuficiente;
    }

    public void setP74DSuficiente(String p74DSuficiente) {
        this.p74DSuficiente = p74DSuficiente;
    }

    public String getP74DEspecifique() {
        return p74DEspecifique;
    }

    public void setP74DEspecifique(String p74DEspecifique) {
        this.p74DEspecifique = p74DEspecifique;
    }

    public String getP74EOtro() {
        return p74EOtro;
    }

    public void setP74EOtro(String p74EOtro) {
        this.p74EOtro = p74EOtro;
    }

    public String getP74EOtroDetalle() {
        return p74EOtroDetalle;
    }

    public void setP74EOtroDetalle(String p74EOtroDetalle) {
        this.p74EOtroDetalle = p74EOtroDetalle;
    }

    public String getP74EGestiones() {
        return p74EGestiones;
    }

    public void setP74EGestiones(String p74EGestiones) {
        this.p74EGestiones = p74EGestiones;
    }

    public String getP74ESuficiente() {
        return p74ESuficiente;
    }

    public void setP74ESuficiente(String p74ESuficiente) {
        this.p74ESuficiente = p74ESuficiente;
    }

    public String getP74EEspecifique() {
        return p74EEspecifique;
    }

    public void setP74EEspecifique(String p74EEspecifique) {
        this.p74EEspecifique = p74EEspecifique;
    }

    public String getP74Ninguno() {
        return p74Ninguno;
    }

    public void setP74Ninguno(String p74Ninguno) {
        this.p74Ninguno = p74Ninguno;
    }

    public String getP75Recibe() {
        return p75Recibe;
    }

    public void setP75Recibe(String p75Recibe) {
        this.p75Recibe = p75Recibe;
    }

    public String getP76Mre() {
        return p76Mre;
    }

    public void setP76Mre(String p76Mre) {
        this.p76Mre = p76Mre;
    }

    public String getP76Reniec() {
        return p76Reniec;
    }

    public void setP76Reniec(String p76Reniec) {
        this.p76Reniec = p76Reniec;
    }

    public String getP76Migraciones() {
        return p76Migraciones;
    }

    public void setP76Migraciones(String p76Migraciones) {
        this.p76Migraciones = p76Migraciones;
    }

    public String getP76Interpol() {
        return p76Interpol;
    }

    public void setP76Interpol(String p76Interpol) {
        this.p76Interpol = p76Interpol;
    }

    public String getP76Inei() {
        return p76Inei;
    }

    public void setP76Inei(String p76Inei) {
        this.p76Inei = p76Inei;
    }

    public String getP76Jne() {
        return p76Jne;
    }

    public void setP76Jne(String p76Jne) {
        this.p76Jne = p76Jne;
    }

    public String getP76Onpe() {
        return p76Onpe;
    }

    public void setP76Onpe(String p76Onpe) {
        this.p76Onpe = p76Onpe;
    }

    public String getP76Sunarp() {
        return p76Sunarp;
    }

    public void setP76Sunarp(String p76Sunarp) {
        this.p76Sunarp = p76Sunarp;
    }

    public String getP76PoderJudicial() {
        return p76PoderJudicial;
    }

    public void setP76PoderJudicial(String p76PoderJudicial) {
        this.p76PoderJudicial = p76PoderJudicial;
    }

    public String getP76Otro() {
        return p76Otro;
    }

    public void setP76Otro(String p76Otro) {
        this.p76Otro = p76Otro;
    }

    public String getP76OtroDetalle() {
        return p76OtroDetalle;
    }

    public void setP76OtroDetalle(String p76OtroDetalle) {
        this.p76OtroDetalle = p76OtroDetalle;
    }

    public String getP76Ninguna() {
        return p76Ninguna;
    }

    public void setP76Ninguna(String p76Ninguna) {
        this.p76Ninguna = p76Ninguna;
    }

   

}