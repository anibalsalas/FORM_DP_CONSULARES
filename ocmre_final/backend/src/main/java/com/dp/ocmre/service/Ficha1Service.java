package com.dp.ocmre.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dp.ocmre.dto.EntidadExternaDTO;
import com.dp.ocmre.dto.Ficha1CompletaDTO;
import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec3Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec5Entity;
// IMPORTACIONES AÑADIDAS HASTA EL 13
import com.dp.ocmre.entity.ficha1.Ficha1Sec6Entity; 
import com.dp.ocmre.entity.ficha1.Ficha1Sec7Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec8Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec9Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec10Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec11Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec12Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec13Entity;
// FIN IMPORTACIONES AÑADIDAS
import com.dp.ocmre.entity.ficha1.Ficha1SecEntity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec1Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec2Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec3Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec4Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec5Repository;
// REPOSITORIOS AÑADIDOS HASTA EL 13
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec6Repository; 
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec7Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec8Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec9Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec10Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec11Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec12Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec13Repository;
// FIN REPOSITORIOS AÑADIDOS
import com.dp.ocmre.repository.repositoryFicha1.Ficha1SecRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;



@Service
public class Ficha1Service {

    @Autowired
    private Ficha1SecRepository fichaRepository;
    @Autowired
    private Ficha1Sec1Repository ficha1Repository;
    @Autowired
    private Ficha1Sec2Repository ficha2Repository;
    @Autowired
    private Ficha1Sec3Repository ficha3Repository;
    @Autowired
    private Ficha1Sec4Repository ficha4Repository;
    @Autowired
    private Ficha1Sec5Repository ficha5Repository;
    // INYECCIÓN DE DEPENDENCIAS AÑADIDA HASTA EL 13
    @Autowired
    private Ficha1Sec6Repository ficha6Repository;
    @Autowired
    private Ficha1Sec7Repository ficha7Repository;
    @Autowired
    private Ficha1Sec8Repository ficha8Repository;
    @Autowired
    private Ficha1Sec9Repository ficha9Repository;
    @Autowired
    private Ficha1Sec10Repository ficha10Repository;
    @Autowired
    private Ficha1Sec11Repository ficha11Repository;
    @Autowired
    private Ficha1Sec12Repository ficha12Repository;
    @Autowired
    private Ficha1Sec13Repository ficha13Repository;
    // FIN INYECCIÓN DE DEPENDENCIAS

    

public Ficha1CompletaDTO obtenerFichaCompletaPorId(Long id) {
    Ficha1CompletaDTO dto = new Ficha1CompletaDTO();
    dto.setFicha(fichaRepository.findById(id).orElse(null));
    dto.setFicha1(ficha1Repository.findByIdFicha(id));   // CAMBIO
    dto.setFicha2(ficha2Repository.findByIdFicha(id));   // CAMBIO
    dto.setFicha3(ficha3Repository.findByIdFicha(id));   // CAMBIO
    dto.setFicha4(ficha4Repository.findByIdFicha(id)); 
    dto.setFicha5(ficha5Repository.findByIdFicha(id)); 
    // AGREGANDO HASTA EL 13
    dto.setFicha6(ficha6Repository.findByIdFicha(id));
    dto.setFicha7(ficha7Repository.findByIdFicha(id));
    dto.setFicha8(ficha8Repository.findByIdFicha(id));
    dto.setFicha9(ficha9Repository.findByIdFicha(id));
    dto.setFicha10(ficha10Repository.findByIdFicha(id));
    dto.setFicha11(ficha11Repository.findByIdFicha(id));
    dto.setFicha12(ficha12Repository.findByIdFicha(id));
    dto.setFicha13(ficha13Repository.findByIdFicha(id));
    // FIN AGREGANDO

    return dto;
}





    public void actualizarValidaS1(Long idFichas1, String validaS1) {
        Ficha1Sec1Entity ficha = ficha1Repository.findById(idFichas1)
                .orElseThrow(() -> new RuntimeException("Ficha 1 no encontrada"));
        ficha.setValida_s1(validaS1);
        ficha1Repository.save(ficha);
    }



    public void actualizarValidaS2(Long idFichaS2, String validaS2) {
        Ficha1Sec2Entity ficha = ficha2Repository.findById(idFichaS2)
                .orElseThrow(() -> new RuntimeException("Ficha 2 no encontrada"));
        ficha.setValida_s2(validaS2);
        ficha2Repository.save(ficha);
    }



public void actualizarValidaS3(Long idFichas3, String validaS3) {
    Ficha1Sec3Entity ficha = ficha3Repository.findById(idFichas3)
            .orElseThrow(() -> new RuntimeException("Ficha 3 no encontrada"));
    ficha.setValida_s3(validaS3);
    ficha3Repository.save(ficha);
}

public void actualizarValidaS4(Long idFichas4, String validaS4) {
    Ficha1Sec4Entity ficha = ficha4Repository.findById(idFichas4)
            .orElseThrow(() -> new RuntimeException("Ficha 4 no encontrada"));
    ficha.setValida_s4(validaS4);
    ficha4Repository.save(ficha);
}


public void actualizarValidaS5(Long idFichas5, String validaS5) {
    Ficha1Sec5Entity ficha = ficha5Repository.findById(idFichas5)
            .orElseThrow(() -> new RuntimeException("Ficha 5 no encontrada"));
    ficha.setValida_s5(validaS5);
    ficha5Repository.save(ficha);
}

// MÉTODOS ACTUALIZAR AÑADIDOS HASTA EL 13

public void actualizarValidaS6(Long idFichas6, String validaS6) {
    Ficha1Sec6Entity ficha = ficha6Repository.findById(idFichas6)
            .orElseThrow(() -> new RuntimeException("Ficha 6 no encontrada"));
    ficha.setValida_s6(validaS6);
    ficha6Repository.save(ficha);
}

public void actualizarValidaS7(Long idFichas7, String validaS7) {
    Ficha1Sec7Entity ficha = ficha7Repository.findById(idFichas7)
            .orElseThrow(() -> new RuntimeException("Ficha 7 no encontrada"));
    ficha.setValida_s7(validaS7);
    ficha7Repository.save(ficha);
}

public void actualizarValidaS8(Long idFichas8, String validaS8) {
    Ficha1Sec8Entity ficha = ficha8Repository.findById(idFichas8)
            .orElseThrow(() -> new RuntimeException("Ficha 8 no encontrada"));
    ficha.setValida_s8(validaS8);
    ficha8Repository.save(ficha);
}

public void actualizarValidaS9(Long idFichas9, String validaS9) {
    Ficha1Sec9Entity ficha = ficha9Repository.findById(idFichas9)
            .orElseThrow(() -> new RuntimeException("Ficha 9 no encontrada"));
    ficha.setValida_s9(validaS9);
    ficha9Repository.save(ficha);
}

public void actualizarValidaS10(Long idFichas10, String validaS10) {
    Ficha1Sec10Entity ficha = ficha10Repository.findById(idFichas10)
            .orElseThrow(() -> new RuntimeException("Ficha 10 no encontrada"));
    ficha.setValida_s10(validaS10);
    ficha10Repository.save(ficha);
}

public void actualizarValidaS11(Long idFichas11, String validaS11) {
    Ficha1Sec11Entity ficha = ficha11Repository.findById(idFichas11)
            .orElseThrow(() -> new RuntimeException("Ficha 11 no encontrada"));
    ficha.setValida_s11(validaS11);
    ficha11Repository.save(ficha);
}

public void actualizarValidaS12(Long idFichas12, String validaS12) {
    Ficha1Sec12Entity ficha = ficha12Repository.findById(idFichas12)
            .orElseThrow(() -> new RuntimeException("Ficha 12 no encontrada"));
    ficha.setValida_s12(validaS12);
    ficha12Repository.save(ficha);
}

public void actualizarValidaS13(Long idFichas13, String validaS13) {
    Ficha1Sec13Entity ficha = ficha13Repository.findById(idFichas13)
            .orElseThrow(() -> new RuntimeException("Ficha 13 no encontrada"));
    ficha.setValida_s13(validaS13);
    ficha13Repository.save(ficha);
}

// FIN MÉTODOS ACTUALIZAR AÑADIDOS


private final Ficha1SecRepository repo;

public Ficha1Service(Ficha1SecRepository repo) { this.repo = repo; }


    @Transactional
    public void darBaja(Long idFicha, String observacion, String usuario) {
    Ficha1SecEntity f = repo.findById(idFicha)
        .orElseThrow(() -> new EntityNotFoundException("Ficha no encontrada"));
    f.setEstadoRegistro("X");
    f.setObservacionBaja(observacion);
    f.setFchBaja(LocalDateTime.now());
    f.setUsuBaja(usuario);
    repo.save(f);
    }

    public List<Ficha1SecEntity> listarActivas() {
    return repo.findByEstadoRegistroIsNullOrEstadoRegistroNot("");
    }



    // public EntidadExternaDTO obtenerEntidadPorCodUnicoEntidad(String codUnicoEntidad) {
    //     // Llama al repositorio para obtener la proyección directa al DTO
    //     return fichaRepository.findEntidadByCodUnicoForDTO(codUnicoEntidad)
    //             .orElse(null); // Devuelve el DTO o null si no existe
    // }




    public EntidadExternaDTO obtenerEntidadPorCodUnicoEntidad(String codUnicoEntidad) {
    System.out.println("═══════════════════════════════════════════");
    System.out.println("SERVICE: Iniciando búsqueda de entidad");
    System.out.println("SERVICE: codUnicoEntidad recibido: '" + codUnicoEntidad + "'");
    
    if (codUnicoEntidad == null || codUnicoEntidad.trim().isEmpty()) {
        System.out.println("SERVICE: ❌ ERROR - codUnicoEntidad es NULL o vacío");
        return null;
    }
    
    Optional<EntidadExternaDTO> resultado = fichaRepository.findEntidadByCodUnicoForDTO(codUnicoEntidad.trim());
    
    if (resultado.isPresent()) {
        EntidadExternaDTO dto = resultado.get();
        System.out.println("SERVICE: ✅ ÉXITO - Entidad encontrada");
        System.out.println("SERVICE: Datos obtenidos: " + dto.toString());
        System.out.println("═══════════════════════════════════════════");
        return dto;
    } else {
        System.out.println("SERVICE: ⚠️ ADVERTENCIA - NO se encontró entidad con codUnico: '" + codUnicoEntidad + "'");
        System.out.println("SERVICE: Verifica que el valor exista en la tabla mre_padron");
        System.out.println("═══════════════════════════════════════════");
        return null;
    }
}

}