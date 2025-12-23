// src/main/java/com/dp/ocmre/repository/UsuarioExternoRepository.java
package com.dp.ocmre.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dp.ocmre.entity.UsuarioExternoEntity;

public interface UsuarioExternoRepository extends JpaRepository<UsuarioExternoEntity, Long> {

  @Query(value = """
  SELECT * FROM SIGA.USUARIO_EXTERNO_MRE
   WHERE TRIM(USUARIO_USU) = TRIM(:usuario)
     AND PASSWORD_USU = :password
     AND NVL(ACTIVO,'S') = 'S'
""", nativeQuery = true)
UsuarioExternoEntity loginNativo(@Param("usuario") String usuario,
                                 @Param("password") String password);

  boolean existsByUsuarioUsu(String usuarioUsu);
}
