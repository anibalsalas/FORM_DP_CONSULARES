// dto/ResumenFichaPorRegionDTO.java
package com.dp.ocmre.dto;


public class ResumenFichaPorRegionDTO {
    private String region;
    private int completas;
    private int faltanRegistrar;
    private int total;
    private double porcentajeAvance;
    public String getRegion() {
        return region;
    }
    public void setRegion(String region) {
        this.region = region;
    }
    public int getCompletas() {
        return completas;
    }
    public void setCompletas(int completas) {
        this.completas = completas;
    }
  
    public int getFaltanRegistrar() {
        return faltanRegistrar;
    }
    public void setFaltanRegistrar(int faltanRegistrar) {
        this.faltanRegistrar = faltanRegistrar;
    }
    public int getTotal() {
        return total;
    }
    public void setTotal(int total) {
        this.total = total;
    }
    public double getPorcentajeAvance() {
        return porcentajeAvance;
    }
    public void setPorcentajeAvance(double porcentajeAvance) {
        this.porcentajeAvance = porcentajeAvance;
    }

    // Getters y setters

    
}
