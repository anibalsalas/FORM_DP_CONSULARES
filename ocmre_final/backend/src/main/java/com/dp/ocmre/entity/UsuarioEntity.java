package com.dp.ocmre.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;
@Entity
@Table(name = "USUARIO", schema = ESQUEMA_BD)
public class UsuarioEntity {

    @Id
    @Column(name = "USUARIO_USU", length = 18)
    private String usuarioUsu;

    @Column(name = "NOMB_CORT_USU", length = 90)
    private String nombre;


    @Column(name = "TPIRCNE", length = 200)
    private String tpircne;

    @Column(name = "SGD_ROL_ESTADO", length = 50)
    private String sgdRolEstado;

    @Column(name = "SGD_ROL_USUARIO", length = 50)
    private String sgdRolUsuario;

    @Column(name = "ESTADO_USU", length = 1)
    private String estadoUsu;

    @Column(name = "CODI_EMPL_PER", length = 20)
    private String codiEmplPer;

    @Column(name = "NIVEL_SUBC_USU", length = 50)
    private String nivelSubcUsu;

    @Column(name = "CODI_DEPE_TDE", length = 20)
    private String codiDepeTde;

    @OneToMany(mappedBy = "usuarioentity",
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private List<Seg_usuario_rolesEntity> segUsuarioRolesEntity = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "CODI_DEPE_TDE", referencedColumnName = "CODI_DEPE_TDE", nullable = true, insertable = false, updatable = false)
    @NotFound(action = NotFoundAction.IGNORE)
    private TdependenciasEntity dependencia;

    // Getters y Setters
    public String getUsuarioUsu() {
        return usuarioUsu;
    }

    public void setUsuarioUsu(String usuarioUsu) {
        this.usuarioUsu = usuarioUsu;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

  

    public String getTpircne() {
        return tpircne;
    }

    public void setTpircne(String tpircne) {
        this.tpircne = tpircne;
    }

    public String getSgdRolEstado() {
        return sgdRolEstado;
    }

    public void setSgdRolEstado(String sgdRolEstado) {
        this.sgdRolEstado = sgdRolEstado;
    }

    public String getSgdRolUsuario() {
        return sgdRolUsuario;
    }

    public void setSgdRolUsuario(String sgdRolUsuario) {
        this.sgdRolUsuario = sgdRolUsuario;
    }

    public String getEstadoUsu() {
        return estadoUsu;
    }

    public void setEstadoUsu(String estadoUsu) {
        this.estadoUsu = estadoUsu;
    }

    public String getCodiEmplPer() {
        return codiEmplPer;
    }

    public void setCodiEmplPer(String codiEmplPer) {
        this.codiEmplPer = codiEmplPer;
    }

    public String getNivelSubcUsu() {
        return nivelSubcUsu;
    }

    public void setNivelSubcUsu(String nivelSubcUsu) {
        this.nivelSubcUsu = nivelSubcUsu;
    }

    public String getCodiDepeTde() {
        return codiDepeTde;
    }

    public void setCodiDepeTde(String codiDepeTde) {
        this.codiDepeTde = codiDepeTde;
    }

    public List<Seg_usuario_rolesEntity> getSegUsuarioRolesEntity() {
        return segUsuarioRolesEntity;
    }

    public void setSegUsuarioRolesEntity(List<Seg_usuario_rolesEntity> segUsuarioRolesEntity) {
        this.segUsuarioRolesEntity = segUsuarioRolesEntity;
    }

    public TdependenciasEntity getDependencia() {
        return dependencia;
    }

    public void setDependencia(TdependenciasEntity dependencia) {
        this.dependencia = dependencia;
    }
}




// package com.dp.ocmre.entity;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "USUARIO", schema = ESQUEMA_BD)
// public class UsuarioEntity {

//     @Id
//     @Column(name = "USUARIO_USU", length = 18)
//     private String usuarioUsu;
     
//     @Column(name = "PASSWORD_USU", length = 18)
//     private String passwordUsu;

//     @Column(name = "NOMB_CORT_USU", length = 90)
//     private String nombre;

//     @Column(name = "ESTADO_USU", length = 1)
//     private String estado;

//     public String getUsuarioUsu() {
//         return usuarioUsu;
//     }

//     public void setUsuarioUsu(String usuarioUsu) {
//         this.usuarioUsu = usuarioUsu;
//     }

//     public String getPasswordUsu() {
//         return passwordUsu;
//     }

//     public void setPasswordUsu(String passwordUsu) {
//         this.passwordUsu = passwordUsu;
//     }

//     public String getNombre() {
//         return nombre;
//     }

//     public void setNombre(String nombre) {
//         this.nombre = nombre;
//     }

//     public String getEstado() {
//         return estado;
//     }

//     public void setEstado(String estado) {
//         this.estado = estado;
//     }
// }
