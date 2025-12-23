package com.dp.ocmre.entity.ficha1;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Entity
@Table(name = "FPEMA_ARCHIVO3" , schema = ESQUEMA_BD)
public class FichaArchivo3Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ARCHIVO")
    private Long id;

    @Column(name = "ID_FICHA")
    private Long idFicha;

    @Column(name = "COD_UNICO")
    private String codUnico;

    @Column(name = "ID_INPUT_FILE")
    private String idInputFile;

    @Column(name = "NOMBRE_ORIGINAL")
    private String nombreOriginal;

    @Column(name = "NOMBRE_GUARDADO")
    private String nombreGuardado;

    @Column(name = "TIPO_MIME")
    private String tipoMime;

    @Column(name = "RUTA_ARCHIVO")
    private String rutaArchivo;

    @Column(name = "TAMANIO")
    private Long tamanio;

    @Column(name = "USU_REGISTRO")
    private String usuRegistro;

    @Column(name = "FCH_REGISTRO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fchRegistro;

    @Column(name = "SECCION")
    private String seccion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdFicha() {
        return idFicha;
    }

    public void setIdFicha(Long idFicha) {
        this.idFicha = idFicha;
    }

    public String getCodUnico() {
        return codUnico;
    }

    public void setCodUnico(String codUnico) {
        this.codUnico = codUnico;
    }

    public String getIdInputFile() {
        return idInputFile;
    }

    public void setIdInputFile(String idInputFile) {
        this.idInputFile = idInputFile;
    }

    public String getNombreOriginal() {
        return nombreOriginal;
    }

    public void setNombreOriginal(String nombreOriginal) {
        this.nombreOriginal = nombreOriginal;
    }

    public String getNombreGuardado() {
        return nombreGuardado;
    }

    public void setNombreGuardado(String nombreGuardado) {
        this.nombreGuardado = nombreGuardado;
    }

    public String getTipoMime() {
        return tipoMime;
    }

    public void setTipoMime(String tipoMime) {
        this.tipoMime = tipoMime;
    }

    public String getRutaArchivo() {
        return rutaArchivo;
    }

    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    public Long getTamanio() {
        return tamanio;
    }

    public void setTamanio(Long tamanio) {
        this.tamanio = tamanio;
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

    public String getSeccion() {
        return seccion;
    }

    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }


}
