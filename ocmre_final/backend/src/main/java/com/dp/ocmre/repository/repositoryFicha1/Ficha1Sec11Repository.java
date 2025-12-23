package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec11Entity;

@Repository
public interface Ficha1Sec11Repository extends JpaRepository<Ficha1Sec11Entity, Long> {
        Ficha1Sec11Entity findByIdFicha(Long idFicha);  
}
