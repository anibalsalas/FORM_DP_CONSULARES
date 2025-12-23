package com.dp.ocmre.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;
@Entity
@Table(name = "seg_usuario_roles", schema = ESQUEMA_BD)
public class Seg_usuario_rolesEntity implements Serializable {

    @EmbeddedId
    private Seg_usuario_rolesPk seg_usuario_rolespk;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "usuario_usu", insertable = false, updatable = false, nullable = false)
    private UsuarioEntity usuarioentity;

    @ManyToOne
    @JoinColumn(name = "id_rol", insertable = false, updatable = false, nullable = false)
    private RolEntity rolentity;

    // Constructor sin argumentos (requerido por JPA)
    public Seg_usuario_rolesEntity() {
    }

    // Getters y Setters
    public Seg_usuario_rolesPk getSeg_usuario_rolespk() {
        return seg_usuario_rolespk;
    }

    public void setSeg_usuario_rolespk(Seg_usuario_rolesPk seg_usuario_rolespk) {
        this.seg_usuario_rolespk = seg_usuario_rolespk;
    }

    public UsuarioEntity getUsuarioentity() {
        return usuarioentity;
    }

    public void setUsuarioentity(UsuarioEntity usuarioentity) {
        this.usuarioentity = usuarioentity;
    }

    public RolEntity getSeg_rolesentity() {
        return rolentity;
    }

    public void setSeg_rolesentity(RolEntity rolentity) {
        this.rolentity = rolentity;
    }

    // Método toString (opcional, para depuración)
    @Override
    public String toString() {
        return "Seg_usuario_rolesEntity{" +
               "seg_usuario_rolespk=" + seg_usuario_rolespk +
               ", usuarioentity=" + (usuarioentity != null ? usuarioentity.getUsuarioUsu() : "null") +
               ", rolentity=" + (rolentity != null ? rolentity.toString() : "null") +
               '}';
    }
}