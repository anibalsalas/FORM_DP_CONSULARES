package com.dp.ocmre.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;
@Entity
@Table(name = "SEG_ROLES", schema = ESQUEMA_BD)
public class RolEntity {

    @Id
    @Column(name = "ID_ROL")
    private Long idRol;

    @Column(name = "NAME_ROL", length = 30)
    private String nombre;

    @Column(name = "DESCRIPCION", length = 255)
    private String descripcion;

    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    // Getters y setters

    //No devuelve la llamada a seg_usuario_roles
    // @JsonIgnore
    // @OneToMany(mappedBy = "rolentity",
    //         cascade = CascadeType.PERSIST,
    //         orphanRemoval = true)
    // private List<Seg_usuario_rolesEntity> seg_usuario_rolesentity;

    //Llama a seg_roles_permisos
    // @OneToMany(mappedBy = "rolentity",
    //         cascade = CascadeType.PERSIST,
    //         orphanRemoval = true)
    // private List<Seg_roles_permisosEntity> seg_roles_permisosentity;

}
    




