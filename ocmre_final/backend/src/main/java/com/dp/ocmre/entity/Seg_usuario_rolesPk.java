package com.dp.ocmre.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
@Embeddable
public class Seg_usuario_rolesPk implements Serializable {

    private String usuario_usu;
    private Integer id_rol;

    // Constructor sin argumentos (requerido por JPA)
    public Seg_usuario_rolesPk() {
    }

    // Constructor con argumentos
    public Seg_usuario_rolesPk(String usuario_usu, Integer id_rol) {
        this.usuario_usu = usuario_usu;
        this.id_rol = id_rol;
    }

    // Getters y Setters
    public String getUsuario_usu() {
        return usuario_usu;
    }

    public void setUsuario_usu(String usuario_usu) {
        this.usuario_usu = usuario_usu;
    }

    public Integer getId_rol() {
        return id_rol;
    }

    public void setId_rol(Integer id_rol) {
        this.id_rol = id_rol;
    }

    // Método equals (para comparar objetos)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seg_usuario_rolesPk that = (Seg_usuario_rolesPk) o;
        return Objects.equals(usuario_usu, that.usuario_usu) &&
               Objects.equals(id_rol, that.id_rol);
    }

    // Método hashCode (para usar en colecciones como HashMap)
    @Override
    public int hashCode() {
        return Objects.hash(usuario_usu, id_rol);
    }

    // Método toString (opcional, para depuración)
    @Override
    public String toString() {
        return "Seg_usuario_rolesPk{" +
               "usuario_usu='" + usuario_usu + '\'' +
               ", id_rol=" + id_rol +
               '}';
    }
}