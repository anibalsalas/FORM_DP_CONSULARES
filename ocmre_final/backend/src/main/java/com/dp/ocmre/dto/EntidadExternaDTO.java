// package com.dp.ocmre.dto;

// /**
//  * DTO (Data Transfer Object) para transferir los datos de la Entidad 
//  * (Padron) que Angular necesita para llenar el formulario del usuario externo.
//  * Los nombres de los atributos deben coincidir con los que espera Angular.
//  */
// public class EntidadExternaDTO {
    
//     // Campos necesarios para el patchValue en Angular
//     private String nom_entidad;
//     private String ruc;
//     private String cod_unico;
//     private String des_departament; // Corresponde a entidadPais
//     private String des_provincia;   // Corresponde a entidadLugares
//     private String nom_autoridad;   // Corresponde a nombreJefeConsular
//     private String telefono;        // Corresponde a funcTel
//     private String telef_emer;      // Corresponde a funcTelEmergencia

//     // Constructor vacío
//     public EntidadExternaDTO() {
//     }

//     // Constructor con todos los campos (Opcional, pero útil)
//     public EntidadExternaDTO(String nom_entidad, String ruc, String cod_unico, String des_departament, String des_provincia, String nom_autoridad, String telefono, String telef_emer) {
//         this.nom_entidad = nom_entidad;
//         this.ruc = ruc;
//         this.cod_unico = cod_unico;
//         this.des_departament = des_departament;
//         this.des_provincia = des_provincia;
//         this.nom_autoridad = nom_autoridad;
//         this.telefono = telefono;
//         this.telef_emer = telef_emer;
//     }

//     // --- Getters y Setters ---

//     public String getNom_entidad() {
//         return nom_entidad;
//     }

//     public void setNom_entidad(String nom_entidad) {
//         this.nom_entidad = nom_entidad;
//     }

//     public String getRuc() {
//         return ruc;
//     }

//     public void setRuc(String ruc) {
//         this.ruc = ruc;
//     }

//     public String getCod_unico() {
//         return cod_unico;
//     }

//     public void setCod_unico(String cod_unico) {
//         this.cod_unico = cod_unico;
//     }

//     public String getDes_departament() {
//         return des_departament;
//     }

//     public void setDes_departament(String des_departament) {
//         this.des_departament = des_departament;
//     }

//     public String getDes_provincia() {
//         return des_provincia;
//     }

//     public void setDes_provincia(String des_provincia) {
//         this.des_provincia = des_provincia;
//     }

//     public String getNom_autoridad() {
//         return nom_autoridad;
//     }

//     public void setNom_autoridad(String nom_autoridad) {
//         this.nom_autoridad = nom_autoridad;
//     }

//     public String getTelefono() {
//         return telefono;
//     }

//     public void setTelefono(String telefono) {
//         this.telefono = telefono;
//     }

//     public String getTelef_emer() {
//         return telef_emer;
//     }

//     public void setTelef_emer(String telef_emer) {
//         this.telef_emer = telef_emer;
//     }
// }


package com.dp.ocmre.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DTO para transferir datos de la Entidad (Padron) hacia Angular.
 * Los nombres en snake_case coinciden con los de Ficha1PadronEntity.
 */
public class EntidadExternaDTO {
    
    @JsonProperty("nom_entidad")
    private String nom_entidad;
    
    @JsonProperty("ruc")
    private String ruc;
    
    @JsonProperty("cod_unico")
    private String cod_unico;
    
    @JsonProperty("des_departament")
    private String des_departament;
    
    @JsonProperty("des_provincia")
    private String des_provincia;
    
    @JsonProperty("nom_autoridad")
    private String nom_autoridad;
    
    @JsonProperty("telefono")
    private String telefono;
    
    @JsonProperty("telef_emer")
    private String telef_emer;

    // Constructor vacío (REQUERIDO)
    public EntidadExternaDTO() {
    }

    // Constructor completo (orden DEBE coincidir con el SELECT del @Query)
    public EntidadExternaDTO(String nom_entidad, String ruc, String cod_unico, 
                             String des_departament, String des_provincia, 
                             String nom_autoridad, String telefono, String telef_emer) {
        this.nom_entidad = nom_entidad;
        this.ruc = ruc;
        this.cod_unico = cod_unico;
        this.des_departament = des_departament;
        this.des_provincia = des_provincia;
        this.nom_autoridad = nom_autoridad;
        this.telefono = telefono;
        this.telef_emer = telef_emer;
    }

    // Getters y Setters
    public String getNom_entidad() {
        return nom_entidad;
    }

    public void setNom_entidad(String nom_entidad) {
        this.nom_entidad = nom_entidad;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getCod_unico() {
        return cod_unico;
    }

    public void setCod_unico(String cod_unico) {
        this.cod_unico = cod_unico;
    }

    public String getDes_departament() {
        return des_departament;
    }

    public void setDes_departament(String des_departament) {
        this.des_departament = des_departament;
    }

    public String getDes_provincia() {
        return des_provincia;
    }

    public void setDes_provincia(String des_provincia) {
        this.des_provincia = des_provincia;
    }

    public String getNom_autoridad() {
        return nom_autoridad;
    }

    public void setNom_autoridad(String nom_autoridad) {
        this.nom_autoridad = nom_autoridad;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTelef_emer() {
        return telef_emer;
    }

    public void setTelef_emer(String telef_emer) {
        this.telef_emer = telef_emer;
    }

    @Override
    public String toString() {
        return "EntidadExternaDTO{" +
                "nom_entidad='" + nom_entidad + '\'' +
                ", ruc='" + ruc + '\'' +
                ", cod_unico='" + cod_unico + '\'' +
                ", des_departament='" + des_departament + '\'' +
                ", des_provincia='" + des_provincia + '\'' +
                ", nom_autoridad='" + nom_autoridad + '\'' +
                ", telefono='" + telefono + '\'' +
                ", telef_emer='" + telef_emer + '\'' +
                '}';
    }
}