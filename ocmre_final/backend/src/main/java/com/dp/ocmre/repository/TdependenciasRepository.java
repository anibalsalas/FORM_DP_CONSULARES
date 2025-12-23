package com.dp.ocmre.repository;

import com.dp.ocmre.entity.TdependenciasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TdependenciasRepository extends JpaRepository<TdependenciasEntity, String> {

    // Ejemplo de método para listar solo ODs y MODs si lo necesitas
    @Query("SELECT t FROM TdependenciasEntity t WHERE t.desc_depe_tde LIKE 'OD%' OR t.desc_depe_tde LIKE 'MOD%'")
    List<TdependenciasEntity> findODsMODs();
}
