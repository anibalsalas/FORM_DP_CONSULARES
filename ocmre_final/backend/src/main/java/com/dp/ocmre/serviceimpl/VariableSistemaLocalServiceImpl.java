package com.dp.ocmre.serviceimpl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dp.ocmre.entity.TdependenciasEntity;
import com.dp.ocmre.entity.UsuarioEntity;
import com.dp.ocmre.repository.TdependenciasRepository;
import com.dp.ocmre.repository.UsuarioRepository;
import com.dp.ocmre.service.VariableSistemaLocalService;

@Service
public class VariableSistemaLocalServiceImpl implements VariableSistemaLocalService {

    @Autowired
    private TdependenciasRepository tdependenciasRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Timestamp getFechaHoraSistema() {
        return new Timestamp(new Date().getTime());
    }

    @Override
    public UsuarioEntity getUsuario(String usuarioUsu) {
        return usuarioRepository.findById(usuarioUsu).orElse(null);
    }

    @Override
    public List<TdependenciasEntity> getDropdownDependenciasGeneral() {
        return tdependenciasRepository.findAll();
    }

    @Override
    public String dependenciaFisicaPersonal(String usuarioUsu) {
        UsuarioEntity usuario = usuarioRepository.findById(usuarioUsu).orElse(null);
        return usuario != null ? usuario.getCodiDepeTde() : null;
    }

    @Override
    public TdependenciasEntity getDependencia(String codiDepeTde) {
        return tdependenciasRepository.findById(codiDepeTde).orElse(null);
    }

    // @Override
    // public String esJefeOficina(String usuarioUsu) {
    //     return "N"; // Pendiente de tu lógica de negocio real
    // }

    @Override
    public List<TdependenciasEntity> listarODsMODs() {
        return tdependenciasRepository.findODsMODs();
    }

    @Override
    public boolean enviarCorreo(String[] addresses, String subject, String mensaje) {
        return true; 
    }
}
