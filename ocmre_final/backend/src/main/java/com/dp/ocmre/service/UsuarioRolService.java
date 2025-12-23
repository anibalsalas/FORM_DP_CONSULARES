package com.dp.ocmre.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.UsuarioRolEntity;
import com.dp.ocmre.entity.UsuarioRolId;
import com.dp.ocmre.repository.UsuarioRolRepository;

@Service
public class UsuarioRolService {

    @Autowired
    private UsuarioRolRepository usuarioRolRepository;


    public List<UsuarioRolEntity> listarAsignaciones() {
        return usuarioRolRepository.findAll();
    }

    public UsuarioRolEntity asignarRol(String usuarioUsu, Long idRol) {
        UsuarioRolEntity entity = new UsuarioRolEntity();
        entity.setUsuarioUsu(usuarioUsu);
        entity.setIdRol(idRol);
        return usuarioRolRepository.save(entity);
    }

    public void eliminarAsignacion(String usuarioUsu, Long idRol) {
        UsuarioRolId id = new UsuarioRolId(usuarioUsu, idRol);
        usuarioRolRepository.deleteById(id);
    }



    
}
