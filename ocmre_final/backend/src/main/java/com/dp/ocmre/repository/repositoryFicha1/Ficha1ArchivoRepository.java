
package com.dp.ocmre.repository.repositoryFicha1;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1ArchivoEntity;



@Repository
public interface Ficha1ArchivoRepository extends JpaRepository<Ficha1ArchivoEntity, Long> {

    List<Ficha1ArchivoEntity> findByIdFichaAndIdInputFileAndCodUnico(Long idFicha, String idInputFile, String codUnico);

    List<Ficha1ArchivoEntity> findByIdFichaOrderByIdDesc(Long idFicha);

}



