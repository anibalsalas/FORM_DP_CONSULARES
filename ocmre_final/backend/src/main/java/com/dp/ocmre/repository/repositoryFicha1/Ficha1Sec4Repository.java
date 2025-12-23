package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;

@Repository
public interface Ficha1Sec4Repository extends JpaRepository<Ficha1Sec4Entity, Long> {
        Ficha1Sec4Entity findByIdFicha(Long idFicha);  
}
