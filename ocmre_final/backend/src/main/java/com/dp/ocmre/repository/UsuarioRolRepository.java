package com.dp.ocmre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dp.ocmre.entity.UsuarioRolEntity;
import com.dp.ocmre.entity.UsuarioRolId;

public interface UsuarioRolRepository extends JpaRepository<UsuarioRolEntity, UsuarioRolId> {

    // @Query("SELECT ur.idRol FROM UsuarioRolEntity ur WHERE ur.usuarioUsu = :usuarioUsu")
    // List<String> findRolesByUsuario(@Param("usuarioUsu") String usuarioUsu);

    @Query(value = """
        SELECT r.NAME_ROL
        FROM SIGA.SEG_USUARIO_ROLES ur
        JOIN SIGA.SEG_ROLES r ON ur.ID_ROL = r.ID_ROL
        WHERE ur.USUARIO_USU = :usuarioUsu
        """, nativeQuery = true)
    List<String> findRolesByUsuario(@Param("usuarioUsu") String usuarioUsu);
}
