package com.dp.ocmre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dp.ocmre.entity.RolEntity;
import com.dp.ocmre.service.RolService;

@RestController
@RequestMapping("/api/roles")
//@CrossOrigin(origins = "*")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public List<RolEntity> listarRoles() {
        return rolService.listarRoles();
    }

    // @PostMapping
    // public ResponseEntity<RolEntity> crearRol(@RequestBody RolEntity rol) {
    //     return ResponseEntity.ok(rolService.guardarRol(rol));
    // }

    
       @PostMapping
    public ResponseEntity<RolEntity> crearRol(@RequestBody RolEntity nuevoRol) {
        RolEntity rolGuardado = rolService.crearRol(nuevoRol);
        return ResponseEntity.ok(rolGuardado);
    }


     // 🔵 ACTUALIZAR ROL
     @PutMapping("/{id}")
     public ResponseEntity<RolEntity> actualizarRol(@PathVariable Long id, @RequestBody RolEntity rol) {
         rol.setIdRol(id);
         return ResponseEntity.ok(rolService.guardarRol(rol));
     }
 
     // 🔴 ELIMINAR ROL
     @DeleteMapping("/{id}")
     public ResponseEntity<Void> eliminarRol(@PathVariable Long id) {
         rolService.eliminarRol(id);
         return ResponseEntity.noContent().build();
     }
}

