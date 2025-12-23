package com.dp.ocmre.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dp.ocmre.entity.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, String> {

	@Query(value = "SELECT * FROM SIGA.USUARIO " + "WHERE TRIM(UPPER(USUARIO_USU)) = TRIM(UPPER(:usuarioUsu))"
			+ "AND TRIM(TPIRCNE) = TRIM(:passwordUsu)", nativeQuery = true)
	UsuarioEntity loginNativo(@Param("usuarioUsu") String usuarioUsu, @Param("passwordUsu") String passwordUsu);

	@Query(value = "SELECT * FROM SIGA.USUARIO u WHERE LTRIM(u.USUARIO_USU) = :usuario", nativeQuery = true)
	UsuarioEntity findByUsuarioUsu(@Param("usuario") String usuario);
	
	@Query(value = "SELECT * FROM USUARIO WHERE TRIM(USUARIO_USU) = :username", nativeQuery = true)
    Optional<UsuarioEntity> findByUsuarioTrim(@Param("username") String username);

}
