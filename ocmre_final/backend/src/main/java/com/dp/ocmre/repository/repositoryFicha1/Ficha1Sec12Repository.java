package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec12Entity;

@Repository
public interface Ficha1Sec12Repository extends JpaRepository<Ficha1Sec12Entity, Long> {
        Ficha1Sec12Entity findByIdFicha(Long idFicha);  
}
