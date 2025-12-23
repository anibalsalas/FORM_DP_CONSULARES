package com.dp.ocmre.entity.ficha1;


import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;
    
@Entity
@Table(name = "MRE_FICHA", schema = ESQUEMA_BD)
public class Ficha1SecEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ficha_seq")
    @SequenceGenerator(
        name = "ficha_seq",
        sequenceName = ESQUEMA_BD+".SEQ_MRE_FICHA",
        allocationSize = 1
    )
    @Column(name = "ID_FICHA")
    private Long idFicha;

    @Column(name = "ID_SESTABLECMNT")
    private Long idSestablecmnt;

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

    @Column(name = "ESTADO", length = 1)
    private String estado;

    @Column(name = "ODMOD_OFICINA", length = 200)
    private String odmodOficina;

    @Column(name = "ENTREV_NOMBRE", length = 200)
    private String entrevNombre;

    @Column(name = "ENTREV_TIPO_DOC", length = 10)
    private String entrevTipoDoc;

    @Column(name = "ENTREV_NUM_DOC", length = 12)
    private String entrevNumDoc;

    @Column(name = "ENTREV_TELEFONO", length = 15)
    private String entrevTelefono;

    @Column(name = "ENTREV_CORREO", length = 200)
    private String entrevCorreo;

    @Column(name = "SUP_FECHA_INICIO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date supFechaInicio;

    @Column(name = "SUP_FECHA_FIN")
    @Temporal(TemporalType.TIMESTAMP)
    private Date supFechaFin;

    @Column(name = "ENTIDAD_NOMBRE", length = 200)
    private String entidadNombre;

    @Column(name = "ENTIDAD_PAIS", length = 100)
    private String entidadPais;

    @Column(name = "ENTIDAD_CONTINENTE", length = 100)
    private String entidadContinente;

    @Column(name = "ENTIDAD_CATEGORIA", length = 1)
    private String entidadCategoria;

    @Column(name = "ENTIDAD_LUGARES", length = 500)
    private String entidadLugares;

    @Column(name = "ENTIDAD_CANTIDAD")
    private Integer entidadCantidad;

    @Column(name = "COD_UNICO", length = 20)
    private String codUnico;

    @Column(name = "FUNC_TEL", length = 15)
    private String funcTel;

    @Column(name = "FUNC_TEL_EMERGENCIA", length = 15)
    private String funcTelEmergencia;

    @Column(name = "FUNC_CELULAR", length = 15)
    private String funcCelular;

    @Column(name = "FUNC_CORREO", length = 200)
    private String funcCorreo;

    @Column(name = "FUNC_CANAL_ATENCION_A", length = 1)
    private String funcCanalAtencionA;

    @Column(name = "FUNC_CANAL_ATENCION_B", length = 1)
    private String funcCanalAtencionB;

    @Column(name = "FUNC_CANAL_ATENCION_C", length = 1)
    private String funcCanalAtencionC;

    @Column(name = "FUNC_CANAL_ATENCION_D", length = 1)
    private String funcCanalAtencionD;

    @Column(name = "FUNC_ATENCION_OTRO", length = 200)
    private String funcAtencionOtro;

    @Column(name = "HORA_ATENCION_INICIO", length = 5)
    private String horaAtencionInicio;

    @Column(name = "HORA_ATENCION_FIN", length = 5)
    private String horaAtencionFin;

    @Column(name = "HORA_REFRIGERIO_INICIO", length = 5)
    private String horaRefrigerioInicio;

    @Column(name = "HORA_REFRIGERIO_FIN", length = 5)
    private String horaRefrigerioFin;

    @Column(name = "ATENCION_EMERGENCIA", length = 1)
    private String atencionEmergencia;

    @Column(name = "HORA_EMERGENCIA_INICIO", length = 5)
    private String horaEmergenciaInicio;

    @Column(name = "HORA_EMERGENCIA_FIN", length = 5)
    private String horaEmergenciaFin;

    @Column(name = "BRINDA_ATENCION_EXTRA", length = 1)
    private String brindaAtencionExtra;

    @Column(name = "ATENCION_EXTRA_DIA", length = 1)
    private String atencionExtraDia;

    @Column(name = "MOTIVO_NO_EXTRA_A", length = 1)
    private String motivoNoExtraA;

    @Column(name = "MOTIVO_NO_EXTRA_B", length = 1)
    private String motivoNoExtraB;

    @Column(name = "MOTIVO_NO_EXTRA_C", length = 1)
    private String motivoNoExtraC;

    @Column(name = "LOCALCONSU_TIPO", length = 1)
    private String localconsuTipo;

    @Column(name = "LOCALCONSU_TIPO_OTRO", length = 200)
    private String localconsuTipoOtro;

    @Column(name = "LOCAL_CONSU_RAMPA", length = 1)
    private String localConsuRampa;

    @Column(name = "LOCAL_CONSU_HIGIENICO", length = 1)
    private String localConsuHigienico;

    @Column(name = "NOMBRE_JEFE_CONSULAR", length = 100)
    private String nombreJefeConsular;

    @Column(name = "CORREO_JEFE_CONSULAR", length = 100)
    private String correoJefeConsular;

    @Column(name = "CEL_JEFE_CONSULAR", length = 100)
    private String celJefeConsular;

    @Column(name = "CARGO_JEFE_CONSULAR", length = 1)
    private String cargoJefeConsular;

    @Column(name = "RESOLU_JEFE_CONSULAR", length = 100)
    private String resoluJefeConsular;

    @Column(name = "FECHA_JEFE_CONSULAR")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaJefeConsular;

    @Column(name = "NRO_A_HOMBRES")
    private Integer nroAHombres;

    @Column(name = "NRO_B_HOMBRES")
    private Integer nroBHombres;

    @Column(name = "NRO_C_HOMBRES")
    private Integer nroCHombres;

    @Column(name = "NRO_D_HOMBRES")
    private Integer nroDHombres;

    @Column(name = "NRO_E_HOMBRES")
    private Integer nroEHombres;

    @Column(name = "NRO_F_HOMBRES")
    private Integer nroFHombres;

    @Column(name = "NRO_TOTAL_HOMBRES")
    private Integer nroTotalHombres;

    @Column(name = "NRO_A_MUJERES")
    private Integer nroAMujeres;

    @Column(name = "NRO_B_MUJERES")
    private Integer nroBMujeres;

    @Column(name = "NRO_C_MUJERES")
    private Integer nroCMujeres;

    @Column(name = "NRO_D_MUJERES")
    private Integer nroDMujeres;

    @Column(name = "NRO_E_MUJERES")
    private Integer nroEMujeres;

    @Column(name = "NRO_F_MUJERES")
    private Integer nroFMujeres;

    @Column(name = "NRO_TOTAL_MUJERES")
    private Integer nroTotalMujeres;

    @Column(name = "NRO_A_TOTAL_HOMBRES")
    private Integer nroATotalHombres;

    @Column(name = "NRO_B_TOTAL_HOMBRES")
    private Integer nroBTotalHombres;

    @Column(name = "NRO_C_TOTAL_HOMBRES")
    private Integer nroCTotalHombres;

    @Column(name = "NRO_D_TOTAL_HOMBRES")
    private Integer nroDTotalHombres;

    @Column(name = "NRO_E_TOTAL_HOMBRES")
    private Integer nroETotalHombres;

    @Column(name = "NRO_F_TOTAL_HOMBRES")
    private Integer nroFTotalHombres;

    @Column(name = "NRO_G_TOTAL_HOMBRES")
    private Integer nroGTotalHombres;

    @Column(name = "H_PERUANOS_PA")
    private Integer hPeruanosPa;

    @Column(name = "H_EXTRANJEROS_PA")
    private Integer hExtranjerosPa;

    @Column(name = "H_NACIONALIDAD_PA")
    private String hNacionalidadPa;

    @Column(name = "H_TOTAL_PA")
    private Integer hTotalPa;

    @Column(name = "M_PERUANAS_PA")
    private Integer mPeruanasPa;

    @Column(name = "M_EXTRANJERAS_PA")
    private Integer mExtranjerasPa;

    @Column(name = "M_NACIONALIDAD_PA")
    private String mNacionalidadPa;

    @Column(name = "M_TOTAL_PA")
    private Integer mTotalPa;

    @Column(name = "T_PERUANAS_PA")
    private Integer tPeruanasPa;

    @Column(name = "T_EXTRANJERAS_PA")
    private Integer tExtranjerasPa;

    @Column(name = "T_NACIONALIDAD_PA")
    private String tNacionalidadPa;

    @Column(name = "T_TOTAL_PA")
    private Integer tTotalPa;

    @Column(name = "H_PERUANOS_PS")
    private Integer hPeruanosPs;

    @Column(name = "H_EXTRANJEROS_PS")
    private Integer hExtranjerosPs;

    @Column(name = "H_NACIONALIDAD_PS")
    private String hNacionalidadPs;

    @Column(name = "H_TOTAL_PS")
    private Integer hTotalPs;

    @Column(name = "M_PERUANAS_PS")
    private Integer mPeruanasPs;

    @Column(name = "M_EXTRANJERAS_PS")
    private Integer mExtranjerasPs;

    @Column(name = "M_NACIONALIDAD_PS")
    private String mNacionalidadPs;

    @Column(name = "M_TOTAL_PS")
    private Integer mTotalPs;

    @Column(name = "T_PERUANAS_PS")
    private Integer tPeruanasPs;

    @Column(name = "T_EXTRANJERAS_PS")
    private Integer tExtranjerasPs;

    @Column(name = "T_NACIONALIDAD_PS")
    private String tNacionalidadPs;

    @Column(name = "T_TOTAL_PS")
    private Integer tTotalPs;

    @Column(name = "H_PERUANOS_V")
    private Integer hPeruanosV;

    @Column(name = "H_EXTRANJEROS_V")
    private Integer hExtranjerosV;

    @Column(name = "H_NACIONALIDAD_V")
    private String hNacionalidadV;

    @Column(name = "H_TOTAL_V")
    private Integer hTotalV;

    @Column(name = "M_PERUANAS_V")
    private Integer mPeruanasV;

    @Column(name = "M_EXTRANJERAS_V")
    private Integer mExtranjerasV;

    @Column(name = "M_NACIONALIDAD_V")
    private String mNacionalidadV;

    @Column(name = "M_TOTAL_V")
    private Integer mTotalV;

    @Column(name = "T_PERUANAS_V")
    private Integer tPeruanasV;

    @Column(name = "T_EXTRANJERAS_V")
    private Integer tExtranjerasV;

    @Column(name = "T_NACIONALIDAD_V")
    private String tNacionalidadV;

    @Column(name = "T_TOTAL_V")
    private Integer tTotalV;

    @Column(name = "P2_2_23A", length = 1)
    private String p2223a;

    @Column(name = "P2_2_24A", length = 1)
    private String p2224a;

    @Column(name = "P2_2_25A", length = 1)
    private String p2225a;

    @Column(name = "P2_2_23B")
    private String p2223b;

    @Column(name = "P2_2_23C")
    private Integer p2223c;

    @Column(name = "P2_2_23D")
    private String p2223d;

    @Column(name = "P2_2_23E")
    private Integer p2223e;

    @Column(name = "P2_2_23F")
    private Integer p2223f;

    @Column(name = "P2_2_24B")
    private String p2224b;

    @Column(name = "P2_2_24C")
    private Integer p2224c;

    @Column(name = "P2_2_24D")
    private String p2224d;

    @Column(name = "P2_2_24E")
    private Integer p2224e;

    @Column(name = "P2_2_24F")
    private Integer p2224f;

    @Column(name = "P2_2_25B")
    private String p2225b;

    @Column(name = "P2_2_25C")
    private Integer p2225c;

    @Column(name = "P2_2_25D")
    private String p2225d;

    @Column(name = "P2_2_25E")
    private Integer p2225e;

    @Column(name = "P2_2_25F")
    private Integer p2225f;

    @Column(name = "PORCEN_PERSO_A")
    private Integer porcenPersoA;

    @Column(name = "PORCEN_PERSO_B")
    private Integer porcenPersoB;

    @Column(name = "PORCEN_PERSO_C")
    private Integer porcenPersoC;

    @Column(name = "ACEPTAR", length = 1)
    private String aceptar;

    @Column(name = "FLAG_VALIDAR", length = 1)
    private String flagValidar;

    @Column(name = "USU_VALIDA", length = 30)
    private String usuValida;

    @Column(name = "FCH_VALIDA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fchValida;

    @Column(name = "CODI_DEPE_TDE", length = 4)
    private String codiDepeTde;

    @Column(name = "TXT_DESC_DEPE_TDE", length = 500)
    private String txtDescDepeTde;

    @Column(name = "ESTADO_REGISTRO", length = 1)
    private String estadoRegistro;

    @Column(name = "OBSERVACION_BAJA", length = 500)
    private String observacionBaja;

    @Column(name = "FCH_BAJA")
     private LocalDateTime fchBaja;

    @Column(name = "USU_BAJA", length = 50)
    private String usuBaja;

	public Long getIdFicha() {
		return idFicha;
	}

	public void setIdFicha(Long idFicha) {
		this.idFicha = idFicha;
	}

	public Long getIdSestablecmnt() {
		return idSestablecmnt;
	}

	public void setIdSestablecmnt(Long idSestablecmnt) {
		this.idSestablecmnt = idSestablecmnt;
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getOdmodOficina() {
		return odmodOficina;
	}

	public void setOdmodOficina(String odmodOficina) {
		this.odmodOficina = odmodOficina;
	}

	public String getEntrevNombre() {
		return entrevNombre;
	}

	public void setEntrevNombre(String entrevNombre) {
		this.entrevNombre = entrevNombre;
	}

	public String getEntrevTipoDoc() {
		return entrevTipoDoc;
	}

	public void setEntrevTipoDoc(String entrevTipoDoc) {
		this.entrevTipoDoc = entrevTipoDoc;
	}

	public String getEntrevNumDoc() {
		return entrevNumDoc;
	}

	public void setEntrevNumDoc(String entrevNumDoc) {
		this.entrevNumDoc = entrevNumDoc;
	}

	public String getEntrevTelefono() {
		return entrevTelefono;
	}

	public void setEntrevTelefono(String entrevTelefono) {
		this.entrevTelefono = entrevTelefono;
	}

	public String getEntrevCorreo() {
		return entrevCorreo;
	}

	public void setEntrevCorreo(String entrevCorreo) {
		this.entrevCorreo = entrevCorreo;
	}

	public Date getSupFechaInicio() {
		return supFechaInicio;
	}

	public void setSupFechaInicio(Date supFechaInicio) {
		this.supFechaInicio = supFechaInicio;
	}

	public Date getSupFechaFin() {
		return supFechaFin;
	}

	public void setSupFechaFin(Date supFechaFin) {
		this.supFechaFin = supFechaFin;
	}

	public String getEntidadNombre() {
		return entidadNombre;
	}

	public void setEntidadNombre(String entidadNombre) {
		this.entidadNombre = entidadNombre;
	}

	public String getEntidadPais() {
		return entidadPais;
	}

	public void setEntidadPais(String entidadPais) {
		this.entidadPais = entidadPais;
	}

	public String getEntidadContinente() {
		return entidadContinente;
	}

	public void setEntidadContinente(String entidadContinente) {
		this.entidadContinente = entidadContinente;
	}

	public String getEntidadCategoria() {
		return entidadCategoria;
	}

	public void setEntidadCategoria(String entidadCategoria) {
		this.entidadCategoria = entidadCategoria;
	}

	public String getEntidadLugares() {
		return entidadLugares;
	}

	public void setEntidadLugares(String entidadLugares) {
		this.entidadLugares = entidadLugares;
	}

	public Integer getEntidadCantidad() {
		return entidadCantidad;
	}

	public void setEntidadCantidad(Integer entidadCantidad) {
		this.entidadCantidad = entidadCantidad;
	}

	public String getCodUnico() {
		return codUnico;
	}

	public void setCodUnico(String codUnico) {
		this.codUnico = codUnico;
	}

	public String getFuncTel() {
		return funcTel;
	}

	public void setFuncTel(String funcTel) {
		this.funcTel = funcTel;
	}

	public String getFuncTelEmergencia() {
		return funcTelEmergencia;
	}

	public void setFuncTelEmergencia(String funcTelEmergencia) {
		this.funcTelEmergencia = funcTelEmergencia;
	}

	public String getFuncCelular() {
		return funcCelular;
	}

	public void setFuncCelular(String funcCelular) {
		this.funcCelular = funcCelular;
	}

	public String getFuncCorreo() {
		return funcCorreo;
	}

	public void setFuncCorreo(String funcCorreo) {
		this.funcCorreo = funcCorreo;
	}

	public String getFuncCanalAtencionA() {
		return funcCanalAtencionA;
	}

	public void setFuncCanalAtencionA(String funcCanalAtencionA) {
		this.funcCanalAtencionA = funcCanalAtencionA;
	}

	public String getFuncCanalAtencionB() {
		return funcCanalAtencionB;
	}

	public void setFuncCanalAtencionB(String funcCanalAtencionB) {
		this.funcCanalAtencionB = funcCanalAtencionB;
	}

	public String getFuncCanalAtencionC() {
		return funcCanalAtencionC;
	}

	public void setFuncCanalAtencionC(String funcCanalAtencionC) {
		this.funcCanalAtencionC = funcCanalAtencionC;
	}

	public String getFuncCanalAtencionD() {
		return funcCanalAtencionD;
	}

	public void setFuncCanalAtencionD(String funcCanalAtencionD) {
		this.funcCanalAtencionD = funcCanalAtencionD;
	}

	public String getFuncAtencionOtro() {
		return funcAtencionOtro;
	}

	public void setFuncAtencionOtro(String funcAtencionOtro) {
		this.funcAtencionOtro = funcAtencionOtro;
	}

	public String getHoraAtencionInicio() {
		return horaAtencionInicio;
	}

	public void setHoraAtencionInicio(String horaAtencionInicio) {
		this.horaAtencionInicio = horaAtencionInicio;
	}

	public String getHoraAtencionFin() {
		return horaAtencionFin;
	}

	public void setHoraAtencionFin(String horaAtencionFin) {
		this.horaAtencionFin = horaAtencionFin;
	}

	public String getHoraRefrigerioInicio() {
		return horaRefrigerioInicio;
	}

	public void setHoraRefrigerioInicio(String horaRefrigerioInicio) {
		this.horaRefrigerioInicio = horaRefrigerioInicio;
	}

	public String getHoraRefrigerioFin() {
		return horaRefrigerioFin;
	}

	public void setHoraRefrigerioFin(String horaRefrigerioFin) {
		this.horaRefrigerioFin = horaRefrigerioFin;
	}

	public String getAtencionEmergencia() {
		return atencionEmergencia;
	}

	public void setAtencionEmergencia(String atencionEmergencia) {
		this.atencionEmergencia = atencionEmergencia;
	}

	public String getHoraEmergenciaInicio() {
		return horaEmergenciaInicio;
	}

	public void setHoraEmergenciaInicio(String horaEmergenciaInicio) {
		this.horaEmergenciaInicio = horaEmergenciaInicio;
	}

	public String getHoraEmergenciaFin() {
		return horaEmergenciaFin;
	}

	public void setHoraEmergenciaFin(String horaEmergenciaFin) {
		this.horaEmergenciaFin = horaEmergenciaFin;
	}

	public String getBrindaAtencionExtra() {
		return brindaAtencionExtra;
	}

	public void setBrindaAtencionExtra(String brindaAtencionExtra) {
		this.brindaAtencionExtra = brindaAtencionExtra;
	}

	public String getAtencionExtraDia() {
		return atencionExtraDia;
	}

	public void setAtencionExtraDia(String atencionExtraDia) {
		this.atencionExtraDia = atencionExtraDia;
	}

	public String getMotivoNoExtraA() {
		return motivoNoExtraA;
	}

	public void setMotivoNoExtraA(String motivoNoExtraA) {
		this.motivoNoExtraA = motivoNoExtraA;
	}

	public String getMotivoNoExtraB() {
		return motivoNoExtraB;
	}

	public void setMotivoNoExtraB(String motivoNoExtraB) {
		this.motivoNoExtraB = motivoNoExtraB;
	}

	public String getMotivoNoExtraC() {
		return motivoNoExtraC;
	}

	public void setMotivoNoExtraC(String motivoNoExtraC) {
		this.motivoNoExtraC = motivoNoExtraC;
	}

	public String getLocalconsuTipo() {
		return localconsuTipo;
	}

	public void setLocalconsuTipo(String localconsuTipo) {
		this.localconsuTipo = localconsuTipo;
	}

	public String getLocalconsuTipoOtro() {
		return localconsuTipoOtro;
	}

	public void setLocalconsuTipoOtro(String localconsuTipoOtro) {
		this.localconsuTipoOtro = localconsuTipoOtro;
	}

	public String getLocalConsuRampa() {
		return localConsuRampa;
	}

	public void setLocalConsuRampa(String localConsuRampa) {
		this.localConsuRampa = localConsuRampa;
	}

	public String getLocalConsuHigienico() {
		return localConsuHigienico;
	}

	public void setLocalConsuHigienico(String localConsuHigienico) {
		this.localConsuHigienico = localConsuHigienico;
	}

	public String getNombreJefeConsular() {
		return nombreJefeConsular;
	}

	public void setNombreJefeConsular(String nombreJefeConsular) {
		this.nombreJefeConsular = nombreJefeConsular;
	}

	public String getCorreoJefeConsular() {
		return correoJefeConsular;
	}

	public void setCorreoJefeConsular(String correoJefeConsular) {
		this.correoJefeConsular = correoJefeConsular;
	}

	public String getCelJefeConsular() {
		return celJefeConsular;
	}

	public void setCelJefeConsular(String celJefeConsular) {
		this.celJefeConsular = celJefeConsular;
	}

	public String getCargoJefeConsular() {
		return cargoJefeConsular;
	}

	public void setCargoJefeConsular(String cargoJefeConsular) {
		this.cargoJefeConsular = cargoJefeConsular;
	}

	public String getResoluJefeConsular() {
		return resoluJefeConsular;
	}

	public void setResoluJefeConsular(String resoluJefeConsular) {
		this.resoluJefeConsular = resoluJefeConsular;
	}

	public Date getFechaJefeConsular() {
		return fechaJefeConsular;
	}

	public void setFechaJefeConsular(Date fechaJefeConsular) {
		this.fechaJefeConsular = fechaJefeConsular;
	}

	public Integer getNroAHombres() {
		return nroAHombres;
	}

	public void setNroAHombres(Integer nroAHombres) {
		this.nroAHombres = nroAHombres;
	}

	public Integer getNroBHombres() {
		return nroBHombres;
	}

	public void setNroBHombres(Integer nroBHombres) {
		this.nroBHombres = nroBHombres;
	}

	public Integer getNroCHombres() {
		return nroCHombres;
	}

	public void setNroCHombres(Integer nroCHombres) {
		this.nroCHombres = nroCHombres;
	}

	public Integer getNroDHombres() {
		return nroDHombres;
	}

	public void setNroDHombres(Integer nroDHombres) {
		this.nroDHombres = nroDHombres;
	}

	public Integer getNroEHombres() {
		return nroEHombres;
	}

	public void setNroEHombres(Integer nroEHombres) {
		this.nroEHombres = nroEHombres;
	}

	public Integer getNroFHombres() {
		return nroFHombres;
	}

	public void setNroFHombres(Integer nroFHombres) {
		this.nroFHombres = nroFHombres;
	}

	public Integer getNroTotalHombres() {
		return nroTotalHombres;
	}

	public void setNroTotalHombres(Integer nroTotalHombres) {
		this.nroTotalHombres = nroTotalHombres;
	}

	public Integer getNroAMujeres() {
		return nroAMujeres;
	}

	public void setNroAMujeres(Integer nroAMujeres) {
		this.nroAMujeres = nroAMujeres;
	}

	public Integer getNroBMujeres() {
		return nroBMujeres;
	}

	public void setNroBMujeres(Integer nroBMujeres) {
		this.nroBMujeres = nroBMujeres;
	}

	public Integer getNroCMujeres() {
		return nroCMujeres;
	}

	public void setNroCMujeres(Integer nroCMujeres) {
		this.nroCMujeres = nroCMujeres;
	}

	public Integer getNroDMujeres() {
		return nroDMujeres;
	}

	public void setNroDMujeres(Integer nroDMujeres) {
		this.nroDMujeres = nroDMujeres;
	}

	public Integer getNroEMujeres() {
		return nroEMujeres;
	}

	public void setNroEMujeres(Integer nroEMujeres) {
		this.nroEMujeres = nroEMujeres;
	}

	public Integer getNroFMujeres() {
		return nroFMujeres;
	}

	public void setNroFMujeres(Integer nroFMujeres) {
		this.nroFMujeres = nroFMujeres;
	}

	public Integer getNroTotalMujeres() {
		return nroTotalMujeres;
	}

	public void setNroTotalMujeres(Integer nroTotalMujeres) {
		this.nroTotalMujeres = nroTotalMujeres;
	}

	public Integer getNroATotalHombres() {
		return nroATotalHombres;
	}

	public void setNroATotalHombres(Integer nroATotalHombres) {
		this.nroATotalHombres = nroATotalHombres;
	}

	public Integer getNroBTotalHombres() {
		return nroBTotalHombres;
	}

	public void setNroBTotalHombres(Integer nroBTotalHombres) {
		this.nroBTotalHombres = nroBTotalHombres;
	}

	public Integer getNroCTotalHombres() {
		return nroCTotalHombres;
	}

	public void setNroCTotalHombres(Integer nroCTotalHombres) {
		this.nroCTotalHombres = nroCTotalHombres;
	}

	public Integer getNroDTotalHombres() {
		return nroDTotalHombres;
	}

	public void setNroDTotalHombres(Integer nroDTotalHombres) {
		this.nroDTotalHombres = nroDTotalHombres;
	}

	public Integer getNroETotalHombres() {
		return nroETotalHombres;
	}

	public void setNroETotalHombres(Integer nroETotalHombres) {
		this.nroETotalHombres = nroETotalHombres;
	}

	public Integer getNroFTotalHombres() {
		return nroFTotalHombres;
	}

	public void setNroFTotalHombres(Integer nroFTotalHombres) {
		this.nroFTotalHombres = nroFTotalHombres;
	}

	public Integer getNroGTotalHombres() {
		return nroGTotalHombres;
	}

	public void setNroGTotalHombres(Integer nroGTotalHombres) {
		this.nroGTotalHombres = nroGTotalHombres;
	}

	public Integer gethPeruanosPa() {
		return hPeruanosPa;
	}

	public void sethPeruanosPa(Integer hPeruanosPa) {
		this.hPeruanosPa = hPeruanosPa;
	}

	public Integer gethExtranjerosPa() {
		return hExtranjerosPa;
	}

	public void sethExtranjerosPa(Integer hExtranjerosPa) {
		this.hExtranjerosPa = hExtranjerosPa;
	}

	public String gethNacionalidadPa() {
		return hNacionalidadPa;
	}

	public void sethNacionalidadPa(String hNacionalidadPa) {
		this.hNacionalidadPa = hNacionalidadPa;
	}

	public Integer gethTotalPa() {
		return hTotalPa;
	}

	public void sethTotalPa(Integer hTotalPa) {
		this.hTotalPa = hTotalPa;
	}

	public Integer getmPeruanasPa() {
		return mPeruanasPa;
	}

	public void setmPeruanasPa(Integer mPeruanasPa) {
		this.mPeruanasPa = mPeruanasPa;
	}

	public Integer getmExtranjerasPa() {
		return mExtranjerasPa;
	}

	public void setmExtranjerasPa(Integer mExtranjerasPa) {
		this.mExtranjerasPa = mExtranjerasPa;
	}

	public String getmNacionalidadPa() {
		return mNacionalidadPa;
	}

	public void setmNacionalidadPa(String mNacionalidadPa) {
		this.mNacionalidadPa = mNacionalidadPa;
	}

	public Integer getmTotalPa() {
		return mTotalPa;
	}

	public void setmTotalPa(Integer mTotalPa) {
		this.mTotalPa = mTotalPa;
	}

	public Integer gettPeruanasPa() {
		return tPeruanasPa;
	}

	public void settPeruanasPa(Integer tPeruanasPa) {
		this.tPeruanasPa = tPeruanasPa;
	}

	public Integer gettExtranjerasPa() {
		return tExtranjerasPa;
	}

	public void settExtranjerasPa(Integer tExtranjerasPa) {
		this.tExtranjerasPa = tExtranjerasPa;
	}

	public String gettNacionalidadPa() {
		return tNacionalidadPa;
	}

	public void settNacionalidadPa(String tNacionalidadPa) {
		this.tNacionalidadPa = tNacionalidadPa;
	}

	public Integer gettTotalPa() {
		return tTotalPa;
	}

	public void settTotalPa(Integer tTotalPa) {
		this.tTotalPa = tTotalPa;
	}

	public Integer gethPeruanosPs() {
		return hPeruanosPs;
	}

	public void sethPeruanosPs(Integer hPeruanosPs) {
		this.hPeruanosPs = hPeruanosPs;
	}

	public Integer gethExtranjerosPs() {
		return hExtranjerosPs;
	}

	public void sethExtranjerosPs(Integer hExtranjerosPs) {
		this.hExtranjerosPs = hExtranjerosPs;
	}

	public String gethNacionalidadPs() {
		return hNacionalidadPs;
	}

	public void sethNacionalidadPs(String hNacionalidadPs) {
		this.hNacionalidadPs = hNacionalidadPs;
	}

	public Integer gethTotalPs() {
		return hTotalPs;
	}

	public void sethTotalPs(Integer hTotalPs) {
		this.hTotalPs = hTotalPs;
	}

	public Integer getmPeruanasPs() {
		return mPeruanasPs;
	}

	public void setmPeruanasPs(Integer mPeruanasPs) {
		this.mPeruanasPs = mPeruanasPs;
	}

	public Integer getmExtranjerasPs() {
		return mExtranjerasPs;
	}

	public void setmExtranjerasPs(Integer mExtranjerasPs) {
		this.mExtranjerasPs = mExtranjerasPs;
	}

	public String getmNacionalidadPs() {
		return mNacionalidadPs;
	}

	public void setmNacionalidadPs(String mNacionalidadPs) {
		this.mNacionalidadPs = mNacionalidadPs;
	}

	public Integer getmTotalPs() {
		return mTotalPs;
	}

	public void setmTotalPs(Integer mTotalPs) {
		this.mTotalPs = mTotalPs;
	}

	public Integer gettPeruanasPs() {
		return tPeruanasPs;
	}

	public void settPeruanasPs(Integer tPeruanasPs) {
		this.tPeruanasPs = tPeruanasPs;
	}

	public Integer gettExtranjerasPs() {
		return tExtranjerasPs;
	}

	public void settExtranjerasPs(Integer tExtranjerasPs) {
		this.tExtranjerasPs = tExtranjerasPs;
	}

	public String gettNacionalidadPs() {
		return tNacionalidadPs;
	}

	public void settNacionalidadPs(String tNacionalidadPs) {
		this.tNacionalidadPs = tNacionalidadPs;
	}

	public Integer gettTotalPs() {
		return tTotalPs;
	}

	public void settTotalPs(Integer tTotalPs) {
		this.tTotalPs = tTotalPs;
	}

	public Integer gethPeruanosV() {
		return hPeruanosV;
	}

	public void sethPeruanosV(Integer hPeruanosV) {
		this.hPeruanosV = hPeruanosV;
	}

	public Integer gethExtranjerosV() {
		return hExtranjerosV;
	}

	public void sethExtranjerosV(Integer hExtranjerosV) {
		this.hExtranjerosV = hExtranjerosV;
	}

	public String gethNacionalidadV() {
		return hNacionalidadV;
	}

	public void sethNacionalidadV(String hNacionalidadV) {
		this.hNacionalidadV = hNacionalidadV;
	}

	public Integer gethTotalV() {
		return hTotalV;
	}

	public void sethTotalV(Integer hTotalV) {
		this.hTotalV = hTotalV;
	}

	public Integer getmPeruanasV() {
		return mPeruanasV;
	}

	public void setmPeruanasV(Integer mPeruanasV) {
		this.mPeruanasV = mPeruanasV;
	}

	public Integer getmExtranjerasV() {
		return mExtranjerasV;
	}

	public void setmExtranjerasV(Integer mExtranjerasV) {
		this.mExtranjerasV = mExtranjerasV;
	}

	public String getmNacionalidadV() {
		return mNacionalidadV;
	}

	public void setmNacionalidadV(String mNacionalidadV) {
		this.mNacionalidadV = mNacionalidadV;
	}

	public Integer getmTotalV() {
		return mTotalV;
	}

	public void setmTotalV(Integer mTotalV) {
		this.mTotalV = mTotalV;
	}

	public Integer gettPeruanasV() {
		return tPeruanasV;
	}

	public void settPeruanasV(Integer tPeruanasV) {
		this.tPeruanasV = tPeruanasV;
	}

	public Integer gettExtranjerasV() {
		return tExtranjerasV;
	}

	public void settExtranjerasV(Integer tExtranjerasV) {
		this.tExtranjerasV = tExtranjerasV;
	}

	public String gettNacionalidadV() {
		return tNacionalidadV;
	}

	public void settNacionalidadV(String tNacionalidadV) {
		this.tNacionalidadV = tNacionalidadV;
	}

	public Integer gettTotalV() {
		return tTotalV;
	}

	public void settTotalV(Integer tTotalV) {
		this.tTotalV = tTotalV;
	}

	public String getP2223a() {
		return p2223a;
	}

	public void setP2223a(String p2223a) {
		this.p2223a = p2223a;
	}

	public String getP2224a() {
		return p2224a;
	}

	public void setP2224a(String p2224a) {
		this.p2224a = p2224a;
	}

	public String getP2225a() {
		return p2225a;
	}

	public void setP2225a(String p2225a) {
		this.p2225a = p2225a;
	}

	public String getP2223b() {
		return p2223b;
	}

	public void setP2223b(String p2223b) {
		this.p2223b = p2223b;
	}

	public Integer getP2223c() {
		return p2223c;
	}

	public void setP2223c(Integer p2223c) {
		this.p2223c = p2223c;
	}

	public String getP2223d() {
		return p2223d;
	}

	public void setP2223d(String p2223d) {
		this.p2223d = p2223d;
	}

	public Integer getP2223e() {
		return p2223e;
	}

	public void setP2223e(Integer p2223e) {
		this.p2223e = p2223e;
	}

	public Integer getP2223f() {
		return p2223f;
	}

	public void setP2223f(Integer p2223f) {
		this.p2223f = p2223f;
	}

	public String getP2224b() {
		return p2224b;
	}

	public void setP2224b(String p2224b) {
		this.p2224b = p2224b;
	}

	public Integer getP2224c() {
		return p2224c;
	}

	public void setP2224c(Integer p2224c) {
		this.p2224c = p2224c;
	}

	public String getP2224d() {
		return p2224d;
	}

	public void setP2224d(String p2224d) {
		this.p2224d = p2224d;
	}

	public Integer getP2224e() {
		return p2224e;
	}

	public void setP2224e(Integer p2224e) {
		this.p2224e = p2224e;
	}

	public Integer getP2224f() {
		return p2224f;
	}

	public void setP2224f(Integer p2224f) {
		this.p2224f = p2224f;
	}

	public String getP2225b() {
		return p2225b;
	}

	public void setP2225b(String p2225b) {
		this.p2225b = p2225b;
	}

	public Integer getP2225c() {
		return p2225c;
	}

	public void setP2225c(Integer p2225c) {
		this.p2225c = p2225c;
	}

	public String getP2225d() {
		return p2225d;
	}

	public void setP2225d(String p2225d) {
		this.p2225d = p2225d;
	}

	public Integer getP2225e() {
		return p2225e;
	}

	public void setP2225e(Integer p2225e) {
		this.p2225e = p2225e;
	}

	public Integer getP2225f() {
		return p2225f;
	}

	public void setP2225f(Integer p2225f) {
		this.p2225f = p2225f;
	}

	public Integer getPorcenPersoA() {
		return porcenPersoA;
	}

	public void setPorcenPersoA(Integer porcenPersoA) {
		this.porcenPersoA = porcenPersoA;
	}

	public Integer getPorcenPersoB() {
		return porcenPersoB;
	}

	public void setPorcenPersoB(Integer porcenPersoB) {
		this.porcenPersoB = porcenPersoB;
	}

	public Integer getPorcenPersoC() {
		return porcenPersoC;
	}

	public void setPorcenPersoC(Integer porcenPersoC) {
		this.porcenPersoC = porcenPersoC;
	}

	public String getAceptar() {
		return aceptar;
	}

	public void setAceptar(String aceptar) {
		this.aceptar = aceptar;
	}

	public String getFlagValidar() {
		return flagValidar;
	}

	public void setFlagValidar(String flagValidar) {
		this.flagValidar = flagValidar;
	}

	public String getUsuValida() {
		return usuValida;
	}

	public void setUsuValida(String usuValida) {
		this.usuValida = usuValida;
	}

	public Date getFchValida() {
		return fchValida;
	}

	public void setFchValida(Date fchValida) {
		this.fchValida = fchValida;
	}

	public String getCodiDepeTde() {
		return codiDepeTde;
	}

	public void setCodiDepeTde(String codiDepeTde) {
		this.codiDepeTde = codiDepeTde;
	}

	public String getTxtDescDepeTde() {
		return txtDescDepeTde;
	}

	public void setTxtDescDepeTde(String txtDescDepeTde) {
		this.txtDescDepeTde = txtDescDepeTde;
	}

	public String getEstadoRegistro() {
		return estadoRegistro;
	}

	public void setEstadoRegistro(String estadoRegistro) {
		this.estadoRegistro = estadoRegistro;
	}

	public String getObservacionBaja() {
		return observacionBaja;
	}

	public void setObservacionBaja(String observacionBaja) {
		this.observacionBaja = observacionBaja;
	}

	public LocalDateTime getFchBaja() {
		return fchBaja;
	}

	public void setFchBaja(LocalDateTime fchBaja) {
		this.fchBaja = fchBaja;
	}

	public String getUsuBaja() {
		return usuBaja;
	}

	public void setUsuBaja(String usuBaja) {
		this.usuBaja = usuBaja;
	}

    

    
  
}