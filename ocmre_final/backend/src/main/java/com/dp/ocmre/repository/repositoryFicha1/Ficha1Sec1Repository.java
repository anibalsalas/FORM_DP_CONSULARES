package com.dp.ocmre.repository.repositoryFicha1;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;


@Repository
public interface Ficha1Sec1Repository extends JpaRepository<Ficha1Sec1Entity, Long> {
       
       

    Ficha1Sec1Entity findByIdFicha(Long idFichas1);  


     Optional<Ficha1Sec1Entity> findFirstByIdFicha(Long idFicha);

  // Si no manejas “baja”, puedes usar: boolean existsByUsuRegistro(String usuRegistro);
}
