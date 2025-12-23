package com.dp.ocmre.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;
@Entity
@Table(name = "SEG_USUARIO_ROLES", schema = ESQUEMA_BD)
@IdClass(UsuarioRolId.class)
public class UsuarioRolEntity {

    @Id
    @Column(name = "USUARIO_USU", length = 18)
    private String usuarioUsu;

    @Id
    @Column(name = "ID_ROL")
    private Long idRol;

    public String getUsuarioUsu() {
        return usuarioUsu;
    }

    public void setUsuarioUsu(String usuarioUsu) {
        this.usuarioUsu = usuarioUsu;
    }

    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

 


    
}
