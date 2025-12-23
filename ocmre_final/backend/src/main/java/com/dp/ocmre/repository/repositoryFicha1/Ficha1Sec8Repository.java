package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec8Entity;

@Repository
public interface Ficha1Sec8Repository extends JpaRepository<Ficha1Sec8Entity, Long> {
    Ficha1Sec8Entity findByIdFicha(Long idFicha); 
}