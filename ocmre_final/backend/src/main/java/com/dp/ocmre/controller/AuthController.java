package com.dp.ocmre.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dp.ocmre.dto.LoginRequest;
import com.dp.ocmre.entity.UsuarioEntity;
import com.dp.ocmre.entity.UsuarioExternoEntity;
import com.dp.ocmre.repository.UsuarioExternoRepository;
import com.dp.ocmre.repository.UsuarioRepository;
import com.dp.ocmre.repository.UsuarioRolRepository;
import com.dp.ocmre.security.anterior.JwtUtil;
import com.dp.ocmre.util.HashUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioRolRepository usuarioRolRepository;

     @Autowired
    private UsuarioExternoRepository usuarioExternoRepository;
    

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        final String usuario = request.getUsuarioUsu() != null ? request.getUsuarioUsu().trim() : "";
        final String passwordPlano = request.getPasswordUsu();

        System.out.println("➡️ Usuario recibido: " + usuario);

        // 1) INTENTO: usuario interno (usa hash)
        final String encryptedPassword = HashUtil.sha512(passwordPlano);
        UsuarioEntity usuarioInterno = usuarioRepository.loginNativo(usuario, encryptedPassword);

        if (usuarioInterno != null) {
            List<String> roles = usuarioRolRepository.findRolesByUsuario(usuarioInterno.getUsuarioUsu());
            if (roles == null || roles.isEmpty()) {
                roles = List.of("COMISIONADO");
            }

            String token = jwtUtil.generateToken(usuarioInterno.getUsuarioUsu(), roles);
            return ResponseEntity.ok(Map.of(
                    "message", "Login exitoso",
                    "token", token,
                    "roles", roles
            ));
        }

        UsuarioExternoEntity usuarioExterno = usuarioExternoRepository.loginNativo(usuario, passwordPlano);
        if (usuarioExterno != null) {
            List<String> roles = List.of("EXTERNO"); 
            String token = jwtUtil.generateToken(usuarioExterno.getUsuarioUsu(), roles);
            return ResponseEntity.ok(Map.of(
                    "message", "Login exitoso (externo)",
                    "token", token,
                    "roles", roles
            ));
        }

        // 3) Falló en ambos
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Credenciales inválidas"));
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    //     System.out.println("➡️ Usuario recibido: " + request.getUsuarioUsu());
    //     System.out.println("🔐 Password recibido: " + request.getPasswordUsu());

    //     // ✅ Encriptar la contraseña recibida para comparar:
    //     String encryptedPassword = HashUtil.sha512(request.getPasswordUsu());

    //     // ✅ Buscar al usuario con la contraseña encriptada:
    //     UsuarioEntity usuario = usuarioRepository.loginNativo(
    //         request.getUsuarioUsu(),
    //         encryptedPassword
    //     );

    //     if (usuario == null) {
    //         System.out.println("❌ Usuario no encontrado o contraseña incorrecta");
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    //             .body(Map.of("error", "Credenciales inválidas"));
    //     }

    //     System.out.println("✅ Usuario autenticado correctamente");

    //     // ✅ Obtener roles del usuario:
    //     List<String> roles = usuarioRolRepository.findRolesByUsuario(usuario.getUsuarioUsu());
    //     System.out.println("🟢 Roles encontrados: " + roles);

    //     // 👉 Si no tiene roles asignados, se le asigna COMISIONADO por defecto:
    //     if (roles == null || roles.isEmpty()) {
    //         roles = new ArrayList<>();
    //         roles.add("COMISIONADO");
    //         System.out.println("⚠️ Usuario sin roles, asignado como COMISIONADO por defecto");
    //     }

    //     // ✅ Generar el token JWT con los roles:
    //     String token = jwtUtil.generateToken(usuario.getUsuarioUsu(), roles);

    //     Map<String, Object> response = new HashMap<>();
    //     response.put("message", "Login exitoso");
    //     response.put("token", token);
    //     response.put("roles", roles); // Opcional, útil para el frontend

    //     return ResponseEntity.ok(response);
    // }
}

