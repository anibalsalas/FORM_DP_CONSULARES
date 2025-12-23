package com.dp.ocmre.repository.repositoryFicha1;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.dto.EntidadExternaDTO;
import com.dp.ocmre.entity.ficha1.Ficha1SecEntity;

@Repository
public interface Ficha1SecRepository extends JpaRepository<Ficha1SecEntity, Long> {



    List<Ficha1SecEntity> findByUsuRegistro(String usuRegistro);
    List<Ficha1SecEntity> findByUsuRegistroOrderByIdFichaDesc(String usuRegistro);
    List<Ficha1SecEntity> findAllByOrderByIdFichaDesc();
    Optional<Ficha1SecEntity> findByIdFicha(Long idFicha);

    List<Ficha1SecEntity> findByEstadoRegistroIsNullOrEstadoRegistroNot(String estado);

    boolean existsByEntidadNombreIgnoreCase(String entidadNombre);




        @Query("""
            select (count(f) > 0)
            from Ficha1SecEntity f
            where upper(f.usuRegistro) = upper(:usu)
            and (f.estadoRegistro is null or f.estadoRegistro <> :X)
        """)
        boolean existeActivaIncluyeNull(@Param("usu") String usu, @Param("X") String baja);


    
    @Query("""
      select case when count(f) > 0 then true else false end
      from Ficha1SecEntity f
      where lower(f.entidadNombre) = lower(:nombre)
        and (f.estadoRegistro is null or f.estadoRegistro <> 'X')
        and (:excluirId is null or f.idFicha <> :excluirId)
    """)
    boolean existsEntidadActivaByNombre(@Param("nombre") String nombre,
                                        @Param("excluirId") Long excluirId);


                                        
    List<Ficha1SecEntity> findByEntidadNombreContainingIgnoreCase(String fragmento);



   
      @Query("""
          SELECT new com.dp.ocmre.dto.EntidadExternaDTO(
              p.nom_entidad,
              p.ruc,
              p.cod_unico,
              p.des_departament,
              p.des_provincia,
              p.nom_autoridad,
              p.telefono,
              p.telef_emer
          )
          FROM Ficha1PadronEntity p
          WHERE p.cod_unico = :codUnicoEntidad
          """)
      Optional<EntidadExternaDTO> findEntidadByCodUnicoForDTO(@Param("codUnicoEntidad") String codUnicoEntidad);

}