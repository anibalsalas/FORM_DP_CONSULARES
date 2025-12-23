
package com.dp.ocmre.repository.repositoryFicha1;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.FichaArchivo3Entity;



@Repository
public interface Ficha1Archivo3Repository extends JpaRepository<FichaArchivo3Entity, Long> {

    List<FichaArchivo3Entity> findByIdFichaAndIdInputFileAndCodUnico(Long idFicha, String idInputFile, String codUnico);

}



