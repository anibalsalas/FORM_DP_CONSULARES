package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec7Entity;

@Repository
public interface Ficha1Sec7Repository extends JpaRepository<Ficha1Sec7Entity, Long> {
        Ficha1Sec7Entity findByIdFicha(Long idFicha);  
}
