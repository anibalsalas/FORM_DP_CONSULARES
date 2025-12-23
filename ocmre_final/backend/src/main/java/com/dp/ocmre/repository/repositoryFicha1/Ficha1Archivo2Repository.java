
package com.dp.ocmre.repository.repositoryFicha1;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.FichaArchivo2Entity;


@Repository
public interface Ficha1Archivo2Repository extends JpaRepository<FichaArchivo2Entity, Long> {

    List<FichaArchivo2Entity> findByIdFichaAndIdInputFileAndCodUnico(Long idFicha, String idInputFile, String codUnico);

        List<FichaArchivo2Entity> findByIdFichaOrderByIdDesc(Long idFicha);


}



