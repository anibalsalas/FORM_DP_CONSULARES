package com.dp.ocmre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dp.ocmre.entity.RolEntity;

public interface RolRepository extends JpaRepository<RolEntity, Long> {

    List<RolEntity> findAllByOrderByIdRolDesc(); // Orden descendente por ID


    @Query("SELECT COALESCE(MAX(r.idRol), 0) + 1 FROM RolEntity r")
Long obtenerSiguienteId();
    
}

