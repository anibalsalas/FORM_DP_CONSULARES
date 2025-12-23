package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec9Entity;

@Repository
public interface Ficha1Sec9Repository extends JpaRepository<Ficha1Sec9Entity, Long> {
    Ficha1Sec9Entity findByIdFicha(Long idFicha); 
}