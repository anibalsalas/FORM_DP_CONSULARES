package com.dp.ocmre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dp.ocmre.entity.UsuarioEntity;
import com.dp.ocmre.entity.UsuarioRolEntity;
import com.dp.ocmre.repository.UsuarioRepository;
import com.dp.ocmre.security.service.AuthService;
import com.dp.ocmre.service.UsuarioRolService; // ✅ CORRECTO

@RestController
@RequestMapping("/api/usuario-roles")
//@CrossOrigin(origins = "*")
public class UsuarioRolController {

    @Autowired
    private UsuarioRolService usuarioRolService;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private AuthService authService;

    @GetMapping
    public List<UsuarioRolEntity> listarAsignaciones() {
        return usuarioRolService.listarAsignaciones();
    }


    // 🟢 CREAR ASIGNACIÓN (ASIGNAR ROL A USUARIO)
    @PostMapping
    public ResponseEntity<UsuarioRolEntity> asignarRol(@RequestBody UsuarioRolEntity dto) {
        return ResponseEntity.ok(usuarioRolService.asignarRol(dto.getUsuarioUsu(), dto.getIdRol()));
    }

    // 🔴 ELIMINAR ASIGNACIÓN (USUARIO + ROL)
    @DeleteMapping
    public ResponseEntity<Void> eliminarAsignacion(@RequestParam String usuarioUsu, @RequestParam Long idRol) {
        usuarioRolService.eliminarAsignacion(usuarioUsu, idRol);
        return ResponseEntity.noContent().build();
    }


	@GetMapping("/datos")
        public ResponseEntity<UsuarioEntity> obtenerDatosUsuario() {
        String usuarioLogueado = authService.getAuth().getUsername();
        UsuarioEntity usuario = usuarioRepository.findByUsuarioTrim(usuarioLogueado).orElse(null);
        return ResponseEntity.ok(usuario);
    }
}
