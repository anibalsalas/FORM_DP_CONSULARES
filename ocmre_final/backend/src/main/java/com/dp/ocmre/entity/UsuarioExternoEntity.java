package com.dp.ocmre.entity;

import jakarta.persistence.*;
import static com.dp.ocmre.util.contants.EntityConst.ESQUEMA_BD;
@Entity
@Table(name = "USUARIO_EXTERNO_MRE", schema = ESQUEMA_BD)
public class UsuarioExternoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "USUARIO_USU", nullable = false, unique = true)
  private String usuarioUsu;

  @Column(name = "PASSWORD_USU", nullable = false)
  private String passwordUsu;

  @Column(name = "NOMBRES")
  private String nombres;

  @Column(name = "ACTIVO")
  private String activo; // 'S' | 'N'

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsuarioUsu() {
    return usuarioUsu;
  }

  public void setUsuarioUsu(String usuarioUsu) {
    this.usuarioUsu = usuarioUsu;
  }

  public String getPasswordUsu() {
    return passwordUsu;
  }

  public void setPasswordUsu(String passwordUsu) {
    this.passwordUsu = passwordUsu;
  }

  public String getNombres() {
    return nombres;
  }

  public void setNombres(String nombres) {
    this.nombres = nombres;
  }

  public String getActivo() {
    return activo;
  }

  public void setActivo(String activo) {
    this.activo = activo;
  }

 
}
