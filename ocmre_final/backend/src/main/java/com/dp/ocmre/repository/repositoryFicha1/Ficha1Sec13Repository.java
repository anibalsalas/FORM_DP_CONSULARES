package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec13Entity;

@Repository
public interface Ficha1Sec13Repository extends JpaRepository<Ficha1Sec13Entity, Long> {
        Ficha1Sec13Entity findByIdFicha(Long idFicha);  
}
