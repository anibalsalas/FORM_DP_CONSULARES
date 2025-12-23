package com.dp.ocmre.service;

import java.sql.Timestamp;
import java.util.List;
import com.dp.ocmre.entity.TdependenciasEntity;
import com.dp.ocmre.entity.UsuarioEntity;

public interface VariableSistemaLocalService {

    Timestamp getFechaHoraSistema();

    UsuarioEntity getUsuario(String usuarioUsu);

    List<TdependenciasEntity> getDropdownDependenciasGeneral();

    String dependenciaFisicaPersonal(String usuarioUsu);

    TdependenciasEntity getDependencia(String codiDepeTde);

    //String esJefeOficina(String usuarioUsu);

    List<TdependenciasEntity> listarODsMODs();

    boolean enviarCorreo(String[] addresses, String subject, String mensaje);
}
