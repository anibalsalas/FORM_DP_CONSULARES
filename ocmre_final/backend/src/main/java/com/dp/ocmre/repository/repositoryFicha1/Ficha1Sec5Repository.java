package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec5Entity;

@Repository
public interface Ficha1Sec5Repository extends JpaRepository<Ficha1Sec5Entity, Long> {
        Ficha1Sec5Entity findByIdFicha(Long idFicha);  
}
