package com.dp.ocmre.entity;

import java.io.Serializable;

public class UsuarioRolId implements Serializable {

    private String usuarioUsu;
    private Long idRol;

    public UsuarioRolId() {}

    public UsuarioRolId(String usuarioUsu, Long idRol) {
        this.usuarioUsu = usuarioUsu;
        this.idRol = idRol;
    }

      // equals() y hashCode() necesarios
      
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((usuarioUsu == null) ? 0 : usuarioUsu.hashCode());
        result = prime * result + ((idRol == null) ? 0 : idRol.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UsuarioRolId other = (UsuarioRolId) obj;
        if (usuarioUsu == null) {
            if (other.usuarioUsu != null)
                return false;
        } else if (!usuarioUsu.equals(other.usuarioUsu))
            return false;
        if (idRol == null) {
            if (other.idRol != null)
                return false;
        } else if (!idRol.equals(other.idRol))
            return false;
        return true;
    }

  

    
}

