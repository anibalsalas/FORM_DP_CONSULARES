package com.dp.ocmre.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Entity
@Table(name = "JUVENILES_P2_9", schema = ESQUEMA_BD)
public class ServiciosEntity1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_2_9")
    private Long id29;

    @Column(name = "ID_FICHA", nullable = false)
    private Long idFicha;

    @Column(name = "TERRENOCODIGO", length = 100, nullable = false)
    private String terrenoCodigo;

    @Column(name = "EDIFICA", length = 100)
    private String edifica;

    @Column(name = "P1", length = 1)
    private String p1;

    @Column(name = "P2", length = 1)
    private String p2;

    @Column(name = "P3", length = 1010)
    private String p3;

    @Column(name = "P4")
    private Long p4;

    @Column(name = "P5", length = 1)
    private String p5;

    @Column(name = "P6", length = 1)
    private String p6;

    @Column(name = "P7", length = 1)
    private String p7;

    @Column(name = "P8")
    private Long p8;

    @Column(name = "P9", length = 1)
    private String p9;

     @Column(name = "ID_TERRENO")
    private Long idTerreno;

    @Column(name = "USU_REGISTRO", length = 50)
    private String usuRegistro;

    @Column(name = "FCH_REGISTRO")
    private LocalDate fchRegistro;

    @Column(name = "USU_ACTUALIZA", length = 50)
    private String usuActualiza;

    @Column(name = "FCH_ACTUALIZA")
    private LocalDate fchActualiza;

    public Long getId29() {
        return id29;
    }

    public void setId29(Long id29) {
        this.id29 = id29;
    }

    public Long getIdFicha() {
        return idFicha;
    }

    public void setIdFicha(Long idFicha) {
        this.idFicha = idFicha;
    }

    public String getTerrenoCodigo() {
        return terrenoCodigo;
    }

    public void setTerrenoCodigo(String terrenoCodigo) {
        this.terrenoCodigo = terrenoCodigo;
    }

    public String getEdifica() {
        return edifica;
    }

    public void setEdifica(String edifica) {
        this.edifica = edifica;
    }

    public String getP1() {
        return p1;
    }

    public void setP1(String p1) {
        this.p1 = p1;
    }

    public String getP2() {
        return p2;
    }

    public void setP2(String p2) {
        this.p2 = p2;
    }

    public String getP3() {
        return p3;
    }

    public void setP3(String p3) {
        this.p3 = p3;
    }

    public Long getP4() {
        return p4;
    }

    public void setP4(Long p4) {
        this.p4 = p4;
    }

    public String getP5() {
        return p5;
    }

    public void setP5(String p5) {
        this.p5 = p5;
    }

    public String getP6() {
        return p6;
    }

    public void setP6(String p6) {
        this.p6 = p6;
    }

    public String getP7() {
        return p7;
    }

    public void setP7(String p7) {
        this.p7 = p7;
    }

    public Long getP8() {
        return p8;
    }

    public void setP8(Long p8) {
        this.p8 = p8;
    }

    public String getP9() {
        return p9;
    }

    public void setP9(String p9) {
        this.p9 = p9;
    }

    public Long getIdTerreno() {
        return idTerreno;
    }

    public void setIdTerreno(Long idTerreno) {
        this.idTerreno = idTerreno;
    }

    public String getUsuRegistro() {
        return usuRegistro;
    }

    public void setUsuRegistro(String usuRegistro) {
        this.usuRegistro = usuRegistro;
    }

    public LocalDate getFchRegistro() {
        return fchRegistro;
    }

    public void setFchRegistro(LocalDate fchRegistro) {
        this.fchRegistro = fchRegistro;
    }

    public String getUsuActualiza() {
        return usuActualiza;
    }

    public void setUsuActualiza(String usuActualiza) {
        this.usuActualiza = usuActualiza;
    }

    public LocalDate getFchActualiza() {
        return fchActualiza;
    }

    public void setFchActualiza(LocalDate fchActualiza) {
        this.fchActualiza = fchActualiza;
    }

    

    
}
