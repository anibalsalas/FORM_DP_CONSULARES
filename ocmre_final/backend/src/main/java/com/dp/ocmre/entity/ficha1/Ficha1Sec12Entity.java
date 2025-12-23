package com.dp.ocmre.entity.ficha1;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Entity
@Table(name = "MRE_FICHA_S12", schema = ESQUEMA_BD)
public class Ficha1Sec12Entity {

    @Id
    @Column(name = "ID_FICHA_S12")
    private Long idFichas12;

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

    @Column(name = "ESTADO_S12")
    private String estado_s12;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    private LocalDate fchValida;

    @Column(name = "VALIDA_S12", length = 1)
    private String valida_s12;

    // --- SECCIÓN P12.1 (Tipo de Plan) ---
    
    @Column(name = "P121_ADMINISTRATIVO", length = 1)
    private String p121Administrativo;

    @Column(name = "P121_ESTRUCTURA", length = 1)
    private String p121Estructura;

    @Column(name = "P121_PRESUPUESTO", length = 1)
    private String p121Presupuesto;

    // --- SECCIÓN P12.2 (Presupuesto) ---
    
    // Se usa BigDecimal para manejar precisiones monetarias (NUMBER(10,2))
    @Column(name = "P122_2023_SOL", precision = 10, scale = 2)
    private BigDecimal p1222023Sol;

    @Column(name = "P122_2023_DOLAR", precision = 10, scale = 2)
    private BigDecimal p1222023Dolar;

    @Column(name = "P122_2024_SOL", precision = 10, scale = 2)
    private BigDecimal p1222024Sol;

    @Column(name = "P122_2024_DOLAR", precision = 10, scale = 2)
    private BigDecimal p1222024Dolar;

    @Column(name = "P122_2025_SOL", precision = 10, scale = 2)
    private BigDecimal p1222025Sol;

    @Column(name = "P122_2025_DOLAR", precision = 10, scale = 2)
    private BigDecimal p1222025Dolar;

    @Column(name = "P122_TIPO_CAMBIO", precision = 4, scale = 2)
    private BigDecimal p122TipoCambio;

    // --- SECCIÓN P12.3 (Cantidad de consultas) ---
    
    @Column(name = "P123_CANTI_CONSULA", precision = 2, scale = 0)
    private Integer p123CantiConsula;

    // --- SECCIÓN P12.4 (Invitaciones/Eventos) ---
    
    // -- 2023 --
    @Column(name = "P124_2023_INVITACIOM", precision = 4, scale = 0)
    private Integer p1242023Invitaciom; // Nota: 'INVITACIOM' parece un error de tipeo en el campo original

    @Column(name = "P124_2023_EVENTOS", precision = 4, scale = 0)
    private Integer p1242023Eventos;

    // -- 2024 --
    @Column(name = "P124_2024_INVITACIOM", precision = 4, scale = 0)
    private Integer p1242024Invitaciom;

    @Column(name = "P124_2024_EVENTOS", precision = 4, scale = 0)
    private Integer p1242024Eventos;

    // -- 2025 --
    @Column(name = "P124_2025_INVITACIOM", precision = 4, scale = 0)
    private Integer p1242025Invitaciom;

    @Column(name = "P124_2025_EVENTOS", precision = 4, scale = 0)
    private Integer p1242025Eventos;

    // --- SECCIÓN P12.5 (Protocolo) ---
    
    @Column(name = "P125_PROTOCOLO", length = 1)
    private String p125Protocolo;

    // --- SECCIÓN P12.6 (Pedidos) ---
    
    @Column(name = "P126_PEDIDOS", precision = 4, scale = 0)
    private Integer p126Pedidos;

    // --- SECCIÓN P12.7 (Porcentaje de participación) ---
    
    @Column(name = "P127_PORCENTAJE_2023", precision = 3, scale = 0)
    private Integer p127Porcentaje2023;

    @Column(name = "P127_PORCENTAJE_2024", precision = 3, scale = 0)
    private Integer p127Porcentaje2024;

    @Column(name = "P127_PORCENTAJE_2025", precision = 3, scale = 0)
    private Integer p127Porcentaje2025;

    public Long getIdFichas12() {
        return idFichas12;
    }

    public void setIdFichas12(Long idFichas12) {
        this.idFichas12 = idFichas12;
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

    public String getEstado_s12() {
        return estado_s12;
    }

    public void setEstado_s12(String estado_s12) {
        this.estado_s12 = estado_s12;
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

    public String getValida_s12() {
        return valida_s12;
    }

    public void setValida_s12(String valida_s12) {
        this.valida_s12 = valida_s12;
    }

    public String getP121Administrativo() {
        return p121Administrativo;
    }

    public void setP121Administrativo(String p121Administrativo) {
        this.p121Administrativo = p121Administrativo;
    }

    public String getP121Estructura() {
        return p121Estructura;
    }

    public void setP121Estructura(String p121Estructura) {
        this.p121Estructura = p121Estructura;
    }

    public String getP121Presupuesto() {
        return p121Presupuesto;
    }

    public void setP121Presupuesto(String p121Presupuesto) {
        this.p121Presupuesto = p121Presupuesto;
    }

    public BigDecimal getP1222023Sol() {
        return p1222023Sol;
    }

    public void setP1222023Sol(BigDecimal p1222023Sol) {
        this.p1222023Sol = p1222023Sol;
    }

    public BigDecimal getP1222023Dolar() {
        return p1222023Dolar;
    }

    public void setP1222023Dolar(BigDecimal p1222023Dolar) {
        this.p1222023Dolar = p1222023Dolar;
    }

    public BigDecimal getP1222024Sol() {
        return p1222024Sol;
    }

    public void setP1222024Sol(BigDecimal p1222024Sol) {
        this.p1222024Sol = p1222024Sol;
    }

    public BigDecimal getP1222024Dolar() {
        return p1222024Dolar;
    }

    public void setP1222024Dolar(BigDecimal p1222024Dolar) {
        this.p1222024Dolar = p1222024Dolar;
    }

    public BigDecimal getP1222025Sol() {
        return p1222025Sol;
    }

    public void setP1222025Sol(BigDecimal p1222025Sol) {
        this.p1222025Sol = p1222025Sol;
    }

    public BigDecimal getP1222025Dolar() {
        return p1222025Dolar;
    }

    public void setP1222025Dolar(BigDecimal p1222025Dolar) {
        this.p1222025Dolar = p1222025Dolar;
    }

    public BigDecimal getP122TipoCambio() {
        return p122TipoCambio;
    }

    public void setP122TipoCambio(BigDecimal p122TipoCambio) {
        this.p122TipoCambio = p122TipoCambio;
    }

    public Integer getP123CantiConsula() {
        return p123CantiConsula;
    }

    public void setP123CantiConsula(Integer p123CantiConsula) {
        this.p123CantiConsula = p123CantiConsula;
    }

    public Integer getP1242023Invitaciom() {
        return p1242023Invitaciom;
    }

    public void setP1242023Invitaciom(Integer p1242023Invitaciom) {
        this.p1242023Invitaciom = p1242023Invitaciom;
    }

    public Integer getP1242023Eventos() {
        return p1242023Eventos;
    }

    public void setP1242023Eventos(Integer p1242023Eventos) {
        this.p1242023Eventos = p1242023Eventos;
    }

    public Integer getP1242024Invitaciom() {
        return p1242024Invitaciom;
    }

    public void setP1242024Invitaciom(Integer p1242024Invitaciom) {
        this.p1242024Invitaciom = p1242024Invitaciom;
    }

    public Integer getP1242024Eventos() {
        return p1242024Eventos;
    }

    public void setP1242024Eventos(Integer p1242024Eventos) {
        this.p1242024Eventos = p1242024Eventos;
    }

    public Integer getP1242025Invitaciom() {
        return p1242025Invitaciom;
    }

    public void setP1242025Invitaciom(Integer p1242025Invitaciom) {
        this.p1242025Invitaciom = p1242025Invitaciom;
    }

    public Integer getP1242025Eventos() {
        return p1242025Eventos;
    }

    public void setP1242025Eventos(Integer p1242025Eventos) {
        this.p1242025Eventos = p1242025Eventos;
    }

    public String getP125Protocolo() {
        return p125Protocolo;
    }

    public void setP125Protocolo(String p125Protocolo) {
        this.p125Protocolo = p125Protocolo;
    }

    public Integer getP126Pedidos() {
        return p126Pedidos;
    }

    public void setP126Pedidos(Integer p126Pedidos) {
        this.p126Pedidos = p126Pedidos;
    }

    public Integer getP127Porcentaje2023() {
        return p127Porcentaje2023;
    }

    public void setP127Porcentaje2023(Integer p127Porcentaje2023) {
        this.p127Porcentaje2023 = p127Porcentaje2023;
    }

    public Integer getP127Porcentaje2024() {
        return p127Porcentaje2024;
    }

    public void setP127Porcentaje2024(Integer p127Porcentaje2024) {
        this.p127Porcentaje2024 = p127Porcentaje2024;
    }

    public Integer getP127Porcentaje2025() {
        return p127Porcentaje2025;
    }

    public void setP127Porcentaje2025(Integer p127Porcentaje2025) {
        this.p127Porcentaje2025 = p127Porcentaje2025;
    }

   

    
}