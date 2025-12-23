package com.dp.ocmre.dto;


public class ReporteEstadisticoDTO {
    private String valueReporte;
    private String nombreReporte;
    private String tokenReporte;

    public ReporteEstadisticoDTO() {
    }

    public ReporteEstadisticoDTO(String valueReporte, String nombreReporte, String tokenReporte) {
        this.valueReporte = valueReporte;
        this.nombreReporte = nombreReporte;
        this.tokenReporte = tokenReporte;
    }

    public String getValueReporte() {
        return valueReporte;
    }

    public void setValueReporte(String valueReporte) {
        this.valueReporte = valueReporte;
    }

    public String getNombreReporte() {
        return nombreReporte;
    }

    public void setNombreReporte(String nombreReporte) {
        this.nombreReporte = nombreReporte;
    }

    public String getTokenReporte() {
        return tokenReporte;
    }

    public void setTokenReporte(String tokenReporte) {
        this.tokenReporte = tokenReporte;
    }
}
