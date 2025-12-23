package com.dp.ocmre.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;

@Entity
@Table(name = "tdependencias", schema = ESQUEMA_BD)

public class TdependenciasEntity implements Serializable {

    @Id
    private String codi_depe_tde;
    private String flag_orga_tde;
    private String codi_sede_sed;
    private String desc_depe_tde;
    private String ip_public_tde;
    private String ip_privad_tde;
    private String desc_cort_tde;
    private String des_sigla;
    private String sgd_flag_depe;
    private String codi_sede_sgd;
    private String num_sede;
    public String getCodi_depe_tde() {
        return codi_depe_tde;
    }
    public void setCodi_depe_tde(String codi_depe_tde) {
        this.codi_depe_tde = codi_depe_tde;
    }
    public String getFlag_orga_tde() {
        return flag_orga_tde;
    }
    public void setFlag_orga_tde(String flag_orga_tde) {
        this.flag_orga_tde = flag_orga_tde;
    }
    public String getCodi_sede_sed() {
        return codi_sede_sed;
    }
    public void setCodi_sede_sed(String codi_sede_sed) {
        this.codi_sede_sed = codi_sede_sed;
    }
    public String getDesc_depe_tde() {
        return desc_depe_tde;
    }
    public void setDesc_depe_tde(String desc_depe_tde) {
        this.desc_depe_tde = desc_depe_tde;
    }
    public String getIp_public_tde() {
        return ip_public_tde;
    }
    public void setIp_public_tde(String ip_public_tde) {
        this.ip_public_tde = ip_public_tde;
    }
    public String getIp_privad_tde() {
        return ip_privad_tde;
    }
    public void setIp_privad_tde(String ip_privad_tde) {
        this.ip_privad_tde = ip_privad_tde;
    }
    public String getDesc_cort_tde() {
        return desc_cort_tde;
    }
    public void setDesc_cort_tde(String desc_cort_tde) {
        this.desc_cort_tde = desc_cort_tde;
    }
    public String getDes_sigla() {
        return des_sigla;
    }
    public void setDes_sigla(String des_sigla) {
        this.des_sigla = des_sigla;
    }
    public String getSgd_flag_depe() {
        return sgd_flag_depe;
    }
    public void setSgd_flag_depe(String sgd_flag_depe) {
        this.sgd_flag_depe = sgd_flag_depe;
    }
    public String getCodi_sede_sgd() {
        return codi_sede_sgd;
    }
    public void setCodi_sede_sgd(String codi_sede_sgd) {
        this.codi_sede_sgd = codi_sede_sgd;
    }
    public String getNum_sede() {
        return num_sede;
    }
    public void setNum_sede(String num_sede) {
        this.num_sede = num_sede;
    }

//    @OneToMany(mappedBy="tdependencia")
//    private List<Salud_FichaEntity> saludFichas = new ArrayList<>(0);

}
