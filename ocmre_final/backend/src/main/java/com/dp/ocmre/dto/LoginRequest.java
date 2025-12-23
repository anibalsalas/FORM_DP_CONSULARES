package com.dp.ocmre.dto;

// dto/LoginRequest.java
public class LoginRequest {
    private String usuarioUsu; // antes era 'username'
    private String passwordUsu; // antes era 'password'

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
}
