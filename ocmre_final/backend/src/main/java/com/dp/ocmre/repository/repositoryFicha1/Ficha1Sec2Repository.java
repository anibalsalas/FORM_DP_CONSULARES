package com.dp.ocmre.repository.repositoryFicha1;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;




@Repository
public interface Ficha1Sec2Repository extends JpaRepository<Ficha1Sec2Entity, Long> {
    Ficha1Sec2Entity findByIdFicha(Long idFichaS2);  


         Optional<Ficha1Sec2Entity> findFirstByIdFicha(Long idFicha);

}



