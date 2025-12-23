package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec10Entity;

@Repository
public interface Ficha1Sec10Repository extends JpaRepository<Ficha1Sec10Entity, Long> {
    Ficha1Sec10Entity findByIdFicha(Long idFicha); 
}