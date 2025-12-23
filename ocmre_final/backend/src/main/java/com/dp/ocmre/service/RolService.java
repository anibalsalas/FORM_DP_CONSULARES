package com.dp.ocmre.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.RolEntity;
import com.dp.ocmre.repository.RolRepository;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public List<RolEntity> listarRoles() {
    //    return rolRepository.findAll();
            return rolRepository.findAllByOrderByIdRolDesc();

     //           return rolRepository.findAll(Sort.by(Sort.Direction.DESC, "idRol"));

    }

        public RolEntity guardarRol(RolEntity rol) {
            return rolRepository.save(rol);
        }

        public void eliminarRol(Long id) {
            rolRepository.deleteById(id);
        }

  public RolEntity crearRol(RolEntity nuevoRol) {
        Long nuevoId = rolRepository.obtenerSiguienteId();
        nuevoRol.setIdRol(nuevoId);
        return rolRepository.save(nuevoRol);
    }

}
