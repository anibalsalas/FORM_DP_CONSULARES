package com.dp.ocmre.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.UsuarioEntity;
import com.dp.ocmre.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<UsuarioEntity> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public UsuarioEntity guardarUsuario(UsuarioEntity usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<UsuarioEntity> obtenerPorId(String id) {
        return usuarioRepository.findById(id);
    }

    public void eliminarUsuario(String id) {
        usuarioRepository.deleteById(id);
    }
}

