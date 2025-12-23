package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec6Entity;

@Repository
public interface Ficha1Sec6Repository extends JpaRepository<Ficha1Sec6Entity, Long> {
        Ficha1Sec6Entity findByIdFicha(Long idFicha);  
}
