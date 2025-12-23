package com.dp.ocmre.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dp.ocmre.dto.BajaFichaRequest;
import com.dp.ocmre.dto.EntidadExternaDTO;
import com.dp.ocmre.dto.Ficha1CompletaDTO;
import com.dp.ocmre.dto.ReporteEstadisticoDTO;
import com.dp.ocmre.dto.ResponseMessage;
import com.dp.ocmre.dto.ResumenFichaPorRegionDTO;
import com.dp.ocmre.entity.TdependenciasEntity;
import com.dp.ocmre.entity.UsuarioEntity;
import com.dp.ocmre.entity.ficha1.Ficha1ArchivoEntity;
import com.dp.ocmre.entity.ficha1.Ficha1PadronEntity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec10Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec11Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec12Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec13Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec3Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec5Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec6Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec7Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec8Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec9Entity;
import com.dp.ocmre.entity.ficha1.Ficha1SecEntity;
import com.dp.ocmre.entity.ficha1.FichaArchivo2Entity;
import com.dp.ocmre.entity.ficha1.FichaArchivo3Entity;
import com.dp.ocmre.repository.UsuarioRepository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Archivo2Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Archivo3Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1ArchivoRepository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1PadronRepository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec10Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec11Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec12Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec13Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec1Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec2Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec3Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec4Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec5Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec6Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec7Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec8Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec9Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1SecRepository;
import com.dp.ocmre.security.anterior.JwtUtil;
import com.dp.ocmre.security.service.AuthService;
import com.dp.ocmre.service.Archivo1AdjuntoService;
import com.dp.ocmre.service.Archivo2AdjuntoService;
import com.dp.ocmre.service.Ficha1Service;
import com.dp.ocmre.service.ReporteService;
import com.dp.ocmre.service.VariableSistemaLocalService;
import com.dp.ocmre.service.VariableSistemaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import static com.dp.ocmre.security.ConstantesRoles.ADMINISTRADOR;
//import static com.dp.ocmre.security.ConstantesRoles.COMISIONADO;
import static com.dp.ocmre.security.ConstantesRoles.ESPECIALISTA;
//import static com.dp.ocmre.security.ConstantesRoles.OFICINA_CONSULAR;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ficha1")
public class Ficha1Controller {

    @Autowired
    VariableSistemaLocalService variableSistemaLocalService;

    @Autowired
    VariableSistemaService variableSistemaService;

    

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

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private Ficha1PadronRepository fichaPadronRepository;

    @Autowired
    private Ficha1ArchivoRepository archivoRepository;
    
     @Autowired
    private Ficha1Archivo2Repository archivo2Repository;

    @Autowired
    private Ficha1Archivo3Repository archivo3Repository;

    @Autowired
    private Archivo2AdjuntoService archivo2Service;


    @Autowired
    private Ficha1Service fichaService;

    @Autowired
    private ReporteService reporteService;

    @Autowired
    private Archivo1AdjuntoService archivoService;


    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AuthService authService;



 @GetMapping("/listarFichas")
public ResponseEntity<List<Ficha1SecEntity>> listarFichas() {
    //var auth = SecurityContextHolder.getContext().getAuthentication();
    
    String username = authService.getAuth().getUsername();
    
    
    List<String> rolesRequeridos = List.of(ADMINISTRADOR,ESPECIALISTA);
    

    boolean esAdminOEspecialista = rolesRequeridos.stream()
            .anyMatch(authService.getScopesAuth()::contains);
    
    List<Ficha1SecEntity> fichas;
    
    if (esAdminOEspecialista) {
        fichas = fichaRepository.findAllByOrderByIdFichaDesc();
    } else {
        fichas = fichaRepository.findByUsuRegistroOrderByIdFichaDesc(username);
    }

    return ResponseEntity.ok(fichas);
}


        @GetMapping("/existeEntidad")
        public ResponseEntity<Boolean> existeEntidad(
                @RequestParam(name = "entidadNombre") String entidadNombre,
                @RequestParam(name = "excluirId", required = false) Long excluirId) {

            if (entidadNombre == null || entidadNombre.isBlank()) {
                return ResponseEntity.badRequest().body(false);
            }
            boolean existe = fichaRepository.existsEntidadActivaByNombre(entidadNombre.trim(), excluirId);
            return ResponseEntity.ok(existe);
        }


    @GetMapping("/padron")
    public ResponseEntity<List<Ficha1PadronEntity>> listarPadron() {
    List<Ficha1PadronEntity> lista = fichaPadronRepository.findAll();
    return ResponseEntity.ok(lista);
    }

   

       
      @GetMapping("/datosEntrevistador")
public ResponseEntity<Map<String, String>> obtenerDatosEntrevistador(
		//@RequestHeader("Authorization") String token
		) {
    	  //System.out.println("token: "+token);
    try {
        // Validar que el token no sea nulo o vacío
        /*if (token == null || token.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El token de autorización es requerido."));
        }*/

        // Extraer el nombre de usuario desde el token
        //String username = jwtUtil.getUsernameFromToken(token.replace("Bearer ", ""));
    	String username = authService.getAuth().getUsername();
    	System.out.println("username: "+username);

        // Buscar el usuario en la base de datos
        Optional<UsuarioEntity> usuarioOpt = usuarioRepository.findByUsuarioTrim(username);

        // Verificar si el usuario existe
        if (usuarioOpt.isEmpty()) {
        	System.out.println("No encontrado: "+username);
            return ResponseEntity.status(404).body(Map.of("error", "Usuario no encontrado."));
        }

        // Obtener el usuario y su dependencia
        UsuarioEntity usuario = usuarioOpt.get();
        TdependenciasEntity dependencia = usuario.getDependencia();

        // Crear el mapa de datos a devolver
        Map<String, String> datos = new HashMap<>();
        datos.put("txt_comisionado", usuario.getNombre()); 
        datos.put("txt_desc_depe_tde", dependencia != null ? dependencia.getDesc_depe_tde() : "Sin dependencia");

        // Devolver los datos
        return ResponseEntity.ok(datos);

    } catch (Exception e) {
        // Manejar errores inesperados
        return ResponseEntity.status(500).body(Map.of("error", "Error al procesar la solicitud: " + e.getMessage()));
    }
}

 



@PostMapping("/guardarFicha")
public ResponseEntity<Ficha1SecEntity> guardarFicha(@RequestBody Ficha1SecEntity ficha) {
    String usuario_usu = "";
    String codi_depe_tde = "";
    if (ficha.getIdFicha() != null) {
        return ResponseEntity.badRequest().body(null); // O lanzar una excepción controlada
    }

    String usuarioActual = authService.getAuth().getUsername();
    Date ahora = new Date();


            usuario_usu = variableSistemaService.userID().trim().toUpperCase();
          //  fecha_hora = variableSistemaLocalService.getFecha_hora_sistema();
            codi_depe_tde = variableSistemaLocalService.dependenciaFisicaPersonal(usuario_usu.trim());
            


    ficha.setFchRegistro(ahora);
    ficha.setUsuRegistro(usuarioActual);
    ficha.setFchActualiza(null);
    ficha.setUsuActualiza(null);

    Ficha1SecEntity guardada = fichaRepository.save(ficha);
    return ResponseEntity.ok(guardada);
}

//4040644419

   @PutMapping("/actualizarFicha/{idFicha}")
public ResponseEntity<?> actualizarFicha(@PathVariable Long idFicha, @RequestBody Ficha1SecEntity ficha) {
    Optional<Ficha1SecEntity> existenteOpt = fichaRepository.findById(idFicha);

    if (existenteOpt.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    try {
        Ficha1SecEntity existente = existenteOpt.get();
        String usuarioActual = authService.getAuth().getUsername();
        Date ahora = new Date();

        // Preservar datos originales
        ficha.setFchRegistro(existente.getFchRegistro());
        ficha.setUsuRegistro(existente.getUsuRegistro());

        // Setear ID y campos de auditoría
        ficha.setIdFicha(idFicha);
        ficha.setFchActualiza(ahora);
        ficha.setUsuActualiza(usuarioActual);

        Ficha1SecEntity actualizado = fichaRepository.save(ficha);
        return ResponseEntity.ok(actualizado);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error al actualizar ocmre: " + e.getMessage(), "estado", "error"));
    }
}






@PostMapping("/guardarFichaSeccion1")
public ResponseEntity<Map<String, String>> guardarFichaSeccion1(@RequestBody Ficha1Sec1Entity ficha1) {
    try {
        Long idFicha = ficha1.getIdFicha(); // viene del padre

        if (idFicha == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "mensaje", "Error: ID de Ficha no puede ser nulo",
                "estado", "error"
            ));
        }

        // Seteamos ambos IDs
        ficha1.setIdFichas1(idFicha); // PK
        ficha1.setIdFicha(idFicha);  // FK, redundante pero útil si está en la entidad

        String usuarioActual = authService.getAuth().getUsername();
        Date ahora = new Date();

        // CAMBIO CLAVE: usar findByIdFicha en lugar de findById
        Ficha1Sec1Entity existente = ficha1Repository.findByIdFicha(idFicha);

        Map<String, String> response = new HashMap<>();

        if (existente != null) {
            BeanUtils.copyProperties(ficha1, existente, "idFichas1", "fchRegistro", "usuRegistro");

            existente.setFchActualiza(ahora);
            existente.setUsuActualiza(usuarioActual);

            ficha1Repository.save(existente);

            response.put("mensaje", "Sección 1 actualizada correctamente");
            response.put("estado", "actualizado");

        } else {
            ficha1.setFchRegistro(ahora);
            ficha1.setUsuRegistro(usuarioActual);
            ficha1.setFchActualiza(null);
            ficha1.setUsuActualiza(null);

            ficha1Repository.save(ficha1);

            response.put("mensaje", "Sección 1 guardada correctamente");
            response.put("estado", "creado");
        }

        return ResponseEntity.ok(response);

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "mensaje", "Error interno del servidor: " + e.getMessage(),
            "estado", "error"
        ));
    }
}


@PostMapping("/guardarFichaSeccion2")
public ResponseEntity<Map<String, String>> guardarFichaSeccion2(@RequestBody Map<String, Object> payload) {
    
    // DEPURACIÓN 1: Ver el payload crudo que llega desde Angular.
    // Esto es crucial para encontrar el campo que es un objeto en lugar de un String.
    logger.info("BACKEND (S2): Payload crudo recibido -> {}", payload.toString());

    try {
        // MEJORA: Usamos ObjectMapper para convertir el Map a nuestra entidad de forma segura.
        // Si la deserialización falla aquí, el bloque catch nos dará el error exacto.
        final ObjectMapper mapper = new ObjectMapper();
        final Ficha1Sec2Entity ficha2 = mapper.convertValue(payload, Ficha1Sec2Entity.class);

        Long idFicha = ficha2.getIdFicha();

        if (idFicha == null) {
            logger.error("BACKEND (S2): ERROR - El idFicha es nulo. Abortando.");
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha2.setIdFichaS2(idFicha);

        String usuarioActual = authService.getAuth().getUsername();
        Date ahora = new Date();
        Optional<Ficha1Sec2Entity> existente = ficha2Repository.findById(ficha2.getIdFichaS2());
        Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            Ficha1Sec2Entity fichaExistente = existente.get();
            ficha2.setUsuRegistro(fichaExistente.getUsuRegistro());
            ficha2.setFchRegistro(fichaExistente.getFchRegistro());
            ficha2.setUsuActualiza(usuarioActual);
            ficha2.setFchActualiza(ahora);
            response.put("mensaje", "Sección 2 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha2.setUsuRegistro(usuarioActual);
            ficha2.setFchRegistro(ahora);
            response.put("mensaje", "Sección 2 guardada correctamente");
            response.put("estado", "creado");
        }
        
        logger.info("BACKEND (S2): OBJETO FINAL ANTES DE 'SAVE' -> {}", ficha2.toString());
        
        ficha2Repository.save(ficha2);
        ficha2Repository.flush();
        
        logger.info("BACKEND (S2): Guardado exitoso para Ficha ID {}.", idFicha);
        return ResponseEntity.ok(response);

    } catch (Exception e) {
        logger.error("BACKEND (S2): EXCEPCIÓN al procesar el guardado: ", e);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 2: " + e.getMessage(), "estado", "error"));
    }
}


@PostMapping("/guardarFichaSeccion3")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion3(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S3): Payload crudo -> {}", payload);
        try {
         final ObjectMapper mapper = new ObjectMapper();
         final Ficha1Sec3Entity ficha3 = mapper.convertValue(payload, Ficha1Sec3Entity.class);

        // 2) Validar idFicha y fijar PK de la sección (1 fila por ficha)
        final Long idFicha = ficha3.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S3): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest().body(Map.of(
                "mensaje", "Error: El ID de la Ficha no puede ser nulo.",
                "estado",  "error"
            ));
        }
        ficha3.setIdFichas3(idFicha);

        // 3) Auditoría
        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec3Entity> existente = ficha3Repository.findById(ficha3.getIdFichas3());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            // Update: mantener alta y registrar modificación
            final Ficha1Sec3Entity old = existente.get();
            ficha3.setUsuRegistro(old.getUsuRegistro());
            ficha3.setFchRegistro(old.getFchRegistro());
            ficha3.setUsuActualiza(usuarioActual);
            ficha3.setFchActualiza(ahora);

            response.put("mensaje", "Sección 3 actualizada correctamente");
            response.put("estado",  "actualizado");
        } else {
            // Insert
            ficha3.setUsuRegistro(usuarioActual);
            ficha3.setFchRegistro(ahora);
            ficha3.setUsuActualiza(null);
            ficha3.setFchActualiza(null);

            response.put("mensaje", "Sección 3 guardada correctamente");
            response.put("estado",  "creado");
        }

        logger.info("BACKEND (S3): OBJETO FINAL ANTES DE SAVE -> {}", ficha3);
        ficha3Repository.saveAndFlush(ficha3);
        logger.info("BACKEND (S3): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);

    } catch (Exception e) {
        logger.error("BACKEND (S3): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "mensaje", "Error interno al procesar la Sección 3: " + e.getMessage(),
            "estado",  "error"
        ));
    }
}




 @PostMapping("/guardarFichaSeccion4")
    @Transactional
    public ResponseEntity<Map<String, String>> guardarFichaSeccion4(@RequestBody Map<String, Object> payload) {
        logger.info("BACKEND (S4): Payload crudo -> {}", payload);
        try {
         final ObjectMapper mapper = new ObjectMapper();
         final Ficha1Sec4Entity ficha4 = mapper.convertValue(payload, Ficha1Sec4Entity.class);

            final Long idFicha = ficha4.getIdFicha();
            if (idFicha == null) {
                logger.error("BACKEND (S4): ERROR - idFicha es nulo.");
                return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
            }

            ficha4.setIdFichas4(idFicha); // clave = idFicha (una fila por sección)

            final String usuarioActual = authService.getAuth().getUsername();
            final Date ahora = new Date();

            final Optional<Ficha1Sec4Entity> existente = ficha4Repository.findById(ficha4.getIdFichas4());
            final Map<String, String> response = new HashMap<>();

            if (existente.isPresent()) {
                // Actualiza manteniendo auditoría de registro
                final Ficha1Sec4Entity old = existente.get();
                ficha4.setUsuRegistro(old.getUsuRegistro());
                ficha4.setFchRegistro(old.getFchRegistro());
                ficha4.setUsuActualiza(usuarioActual);
                ficha4.setFchActualiza(ahora);

                response.put("mensaje", "Sección 4 actualizada correctamente");
                response.put("estado", "actualizado");
            } else {
                // Inserción
                ficha4.setUsuRegistro(usuarioActual);
                ficha4.setFchRegistro(ahora);
                ficha4.setUsuActualiza(null);
                ficha4.setFchActualiza(null);

                response.put("mensaje", "Sección 4 guardada correctamente");
                response.put("estado", "creado");
            }

            logger.info("BACKEND (S4): OBJETO FINAL ANTES DE SAVE -> {}", ficha4);
            ficha4Repository.saveAndFlush(ficha4);
            logger.info("BACKEND (S4): Guardado exitoso para Ficha ID {}.", idFicha);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("BACKEND (S4): EXCEPCIÓN al procesar guardado.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("mensaje", "Error interno al procesar la Sección 4: " + e.getMessage(),
                                 "estado", "error"));
        }
    }


/**
 * Guarda o actualiza los datos de la Sección 5.
 * Asume que Ficha1Sec5Entity y ficha5Repository existen y están inyectados.
 */
@PostMapping("/guardarFichaSeccion5")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion5(@RequestBody Map<String, Object> payload) {
    // 1. Logs adaptados a S5
    logger.info("BACKEND (S5): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        // 2. Entidad adaptada a Ficha1Sec5Entity
        final Ficha1Sec5Entity ficha5 = mapper.convertValue(payload, Ficha1Sec5Entity.class);

        final Long idFicha = ficha5.getIdFicha();
        if (idFicha == null) {
            // Log adaptado a S5
            logger.error("BACKEND (S5): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        // 3. Setter del ID adaptado (asumiendo setIdFichas5)
        ficha5.setIdFichas5(idFicha); // clave = idFicha (una fila por sección)

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        // 4. Repositorio y getter adaptados (asumiendo ficha5Repository y getIdFichas5)
        final Optional<Ficha1Sec5Entity> existente = ficha5Repository.findById(ficha5.getIdFichas5());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            // Actualiza manteniendo auditoría de registro
            final Ficha1Sec5Entity old = existente.get();
            ficha5.setUsuRegistro(old.getUsuRegistro());
            ficha5.setFchRegistro(old.getFchRegistro());
            ficha5.setUsuActualiza(usuarioActual);
            ficha5.setFchActualiza(ahora);

            // 5. Mensaje adaptado
            response.put("mensaje", "Sección 5 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            // Inserción
            ficha5.setUsuRegistro(usuarioActual);
            ficha5.setFchRegistro(ahora);
            ficha5.setUsuActualiza(null);
            ficha5.setFchActualiza(null);

            // 6. Mensaje adaptado
            response.put("mensaje", "Sección 5 guardada correctamente");
            response.put("estado", "creado");
        }

        // Logs adaptados a S5
        logger.info("BACKEND (S5): OBJETO FINAL ANTES DE SAVE -> {}", ficha5);
        
        // 7. Repositorio adaptado
        ficha5Repository.saveAndFlush(ficha5);
        logger.info("BACKEND (S5): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        // Logs y mensaje de error adaptados a S5
        logger.error("BACKEND (S5): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 5: " + e.getMessage(),
                         "estado", "error"));
    }
}




/*
 * =============================================================================
 * SECCIÓN 6
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 6.
 */
@PostMapping("/guardarFichaSeccion6")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion6(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S6): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec6Entity ficha6 = mapper.convertValue(payload, Ficha1Sec6Entity.class);

        final Long idFicha = ficha6.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S6): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        // Setter del ID adaptado
        ficha6.setIdFichas6(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        // Repositorio y getter adaptados
        final Optional<Ficha1Sec6Entity> existente = ficha6Repository.findById(ficha6.getIdFichas6());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            // Actualiza manteniendo auditoría de registro
            final Ficha1Sec6Entity old = existente.get();
            ficha6.setUsuRegistro(old.getUsuRegistro());
            ficha6.setFchRegistro(old.getFchRegistro());
            ficha6.setUsuActualiza(usuarioActual);
            ficha6.setFchActualiza(ahora);

            // Mensaje adaptado
            response.put("mensaje", "Sección 6 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            // Inserción
            ficha6.setUsuRegistro(usuarioActual);
            ficha6.setFchRegistro(ahora);
            ficha6.setUsuActualiza(null);
            ficha6.setFchActualiza(null);

            // Mensaje adaptado
            response.put("mensaje", "Sección 6 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S6): OBJETO FINAL ANTES DE SAVE -> {}", ficha6);
        
        // Repositorio adaptado
        ficha6Repository.saveAndFlush(ficha6);
        logger.info("BACKEND (S6): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        // Logs y mensaje de error adaptados a S6
        logger.error("BACKEND (S6): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 6: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 7
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 7.
 */
@PostMapping("/guardarFichaSeccion7")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion7(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S7): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec7Entity ficha7 = mapper.convertValue(payload, Ficha1Sec7Entity.class);

        final Long idFicha = ficha7.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S7): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha7.setIdFichas7(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec7Entity> existente = ficha7Repository.findById(ficha7.getIdFichas7());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec7Entity old = existente.get();
            ficha7.setUsuRegistro(old.getUsuRegistro());
            ficha7.setFchRegistro(old.getFchRegistro());
            ficha7.setUsuActualiza(usuarioActual);
            ficha7.setFchActualiza(ahora);

            response.put("mensaje", "Sección 7 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha7.setUsuRegistro(usuarioActual);
            ficha7.setFchRegistro(ahora);
            ficha7.setUsuActualiza(null);
            ficha7.setFchActualiza(null);

            response.put("mensaje", "Sección 7 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S7): OBJETO FINAL ANTES DE SAVE -> {}", ficha7);
        
        ficha7Repository.saveAndFlush(ficha7);
        logger.info("BACKEND (S7): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S7): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 7: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 8
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 8.
 */
@PostMapping("/guardarFichaSeccion8")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion8(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S8): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec8Entity ficha8 = mapper.convertValue(payload, Ficha1Sec8Entity.class);

        final Long idFicha = ficha8.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S8): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha8.setIdFichas8(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec8Entity> existente = ficha8Repository.findById(ficha8.getIdFichas8());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec8Entity old = existente.get();
            ficha8.setUsuRegistro(old.getUsuRegistro());
            ficha8.setFchRegistro(old.getFchRegistro());
            ficha8.setUsuActualiza(usuarioActual);
            ficha8.setFchActualiza(ahora);

            response.put("mensaje", "Sección 8 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha8.setUsuRegistro(usuarioActual);
            ficha8.setFchRegistro(ahora);
            ficha8.setUsuActualiza(null);
            ficha8.setFchActualiza(null);

            response.put("mensaje", "Sección 8 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S8): OBJETO FINAL ANTES DE SAVE -> {}", ficha8);
        
        ficha8Repository.saveAndFlush(ficha8);
        logger.info("BACKEND (S8): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S8): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 8: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 9
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 9.
 */
@PostMapping("/guardarFichaSeccion9")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion9(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S9): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec9Entity ficha9 = mapper.convertValue(payload, Ficha1Sec9Entity.class);

        final Long idFicha = ficha9.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S9): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha9.setIdFichas9(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec9Entity> existente = ficha9Repository.findById(ficha9.getIdFichas9());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec9Entity old = existente.get();
            ficha9.setUsuRegistro(old.getUsuRegistro());
            ficha9.setFchRegistro(old.getFchRegistro());
            ficha9.setUsuActualiza(usuarioActual);
            ficha9.setFchActualiza(ahora);

            response.put("mensaje", "Sección 9 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha9.setUsuRegistro(usuarioActual);
            ficha9.setFchRegistro(ahora);
            ficha9.setUsuActualiza(null);
            ficha9.setFchActualiza(null);

            response.put("mensaje", "Sección 9 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S9): OBJETO FINAL ANTES DE SAVE -> {}", ficha9);
        
        ficha9Repository.saveAndFlush(ficha9);
        logger.info("BACKEND (S9): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S9): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 9: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 10
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 10.
 */
@PostMapping("/guardarFichaSeccion10")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion10(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S10): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec10Entity ficha10 = mapper.convertValue(payload, Ficha1Sec10Entity.class);

        final Long idFicha = ficha10.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S10): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha10.setIdFichas10(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec10Entity> existente = ficha10Repository.findById(ficha10.getIdFichas10());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec10Entity old = existente.get();
            ficha10.setUsuRegistro(old.getUsuRegistro());
            ficha10.setFchRegistro(old.getFchRegistro());
            ficha10.setUsuActualiza(usuarioActual);
            ficha10.setFchActualiza(ahora);

            response.put("mensaje", "Sección 10 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha10.setUsuRegistro(usuarioActual);
            ficha10.setFchRegistro(ahora);
            ficha10.setUsuActualiza(null);
            ficha10.setFchActualiza(null);

            response.put("mensaje", "Sección 10 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S10): OBJETO FINAL ANTES DE SAVE -> {}", ficha10);
        
        ficha10Repository.saveAndFlush(ficha10);
        logger.info("BACKEND (S10): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S10): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 10: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 11
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 11.
 */
@PostMapping("/guardarFichaSeccion11")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion11(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S11): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec11Entity ficha11 = mapper.convertValue(payload, Ficha1Sec11Entity.class);

        final Long idFicha = ficha11.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S11): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha11.setIdFichas11(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec11Entity> existente = ficha11Repository.findById(ficha11.getIdFichas11());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec11Entity old = existente.get();
            ficha11.setUsuRegistro(old.getUsuRegistro());
            ficha11.setFchRegistro(old.getFchRegistro());
            ficha11.setUsuActualiza(usuarioActual);
            ficha11.setFchActualiza(ahora);

            response.put("mensaje", "Sección 11 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha11.setUsuRegistro(usuarioActual);
            ficha11.setFchRegistro(ahora);
            ficha11.setUsuActualiza(null);
            ficha11.setFchActualiza(null);

            response.put("mensaje", "Sección 11 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S11): OBJETO FINAL ANTES DE SAVE -> {}", ficha11);
        
        ficha11Repository.saveAndFlush(ficha11);
        logger.info("BACKEND (S11): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S11): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 11: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 12
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 12.
 */
@PostMapping("/guardarFichaSeccion12")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion12(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S12): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec12Entity ficha12 = mapper.convertValue(payload, Ficha1Sec12Entity.class);

        final Long idFicha = ficha12.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S12): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha12.setIdFichas12(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec12Entity> existente = ficha12Repository.findById(ficha12.getIdFichas12());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec12Entity old = existente.get();
            ficha12.setUsuRegistro(old.getUsuRegistro());
            ficha12.setFchRegistro(old.getFchRegistro());
            ficha12.setUsuActualiza(usuarioActual);
            ficha12.setFchActualiza(ahora);

            response.put("mensaje", "Sección 12 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha12.setUsuRegistro(usuarioActual);
            ficha12.setFchRegistro(ahora);
            ficha12.setUsuActualiza(null);
            ficha12.setFchActualiza(null);

            response.put("mensaje", "Sección 12 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S12): OBJETO FINAL ANTES DE SAVE -> {}", ficha12);
        
        ficha12Repository.saveAndFlush(ficha12);
        logger.info("BACKEND (S12): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S12): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 12: " + e.getMessage(),
                         "estado", "error"));
    }
}


// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 13
 * =============================================================================
 */
/**
 * Guarda o actualiza los datos de la Sección 13.
 */
@PostMapping("/guardarFichaSeccion13")
@Transactional
public ResponseEntity<Map<String, String>> guardarFichaSeccion13(@RequestBody Map<String, Object> payload) {
    logger.info("BACKEND (S13): Payload crudo -> {}", payload);
    try {
        final ObjectMapper mapper = new ObjectMapper();
        
        final Ficha1Sec13Entity ficha13 = mapper.convertValue(payload, Ficha1Sec13Entity.class);

        final Long idFicha = ficha13.getIdFicha();
        if (idFicha == null) {
            logger.error("BACKEND (S13): ERROR - idFicha es nulo.");
            return ResponseEntity.badRequest()
                .body(Map.of("mensaje", "Error: El ID de la Ficha no puede ser nulo.", "estado", "error"));
        }

        ficha13.setIdFichas13(idFicha); 

        final String usuarioActual = authService.getAuth().getUsername();
        final Date ahora = new Date();

        final Optional<Ficha1Sec13Entity> existente = ficha13Repository.findById(ficha13.getIdFichas13());
        final Map<String, String> response = new HashMap<>();

        if (existente.isPresent()) {
            final Ficha1Sec13Entity old = existente.get();
            ficha13.setUsuRegistro(old.getUsuRegistro());
            ficha13.setFchRegistro(old.getFchRegistro());
            ficha13.setUsuActualiza(usuarioActual);
            ficha13.setFchActualiza(ahora);

            response.put("mensaje", "Sección 13 actualizada correctamente");
            response.put("estado", "actualizado");
        } else {
            ficha13.setUsuRegistro(usuarioActual);
            ficha13.setFchRegistro(ahora);
            ficha13.setUsuActualiza(null);
            ficha13.setFchActualiza(null);

            response.put("mensaje", "Sección 13 guardada correctamente");
            response.put("estado", "creado");
        }

        logger.info("BACKEND (S13): OBJETO FINAL ANTES DE SAVE -> {}", ficha13);
        
        ficha13Repository.saveAndFlush(ficha13);
        logger.info("BACKEND (S13): Guardado exitoso para Ficha ID {}.", idFicha);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        logger.error("BACKEND (S13): EXCEPCIÓN al procesar guardado.", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("mensaje", "Error interno al procesar la Sección 13: " + e.getMessage(),
                         "estado", "error"));
    }
}
private static final Logger logger = LoggerFactory.getLogger(Ficha1Controller.class);


@PutMapping("/marcarcompleta/{id}")
public ResponseEntity<?> marcarFichaComoCompleta(@PathVariable Long id) {
    Optional<Ficha1SecEntity> fichaOpt = fichaRepository.findById(id);
    if (fichaOpt.isPresent()) {
        Ficha1SecEntity ficha = fichaOpt.get();
        ficha.setEstado("C");
        //ocmre.setFchActualiza(LocalDate.now()); // opcional
        ficha.setFchActualiza(java.sql.Date.valueOf(LocalDate.now()));
        fichaRepository.save(ficha);
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ficha no encontrada");
    }
}






////////////////////////////////////////////////////////////////////////////////////
/// 
///

// @PostMapping("/guardarFichaCompleta")
// @Transactional
// public ResponseEntity<String> guardarFichaCompleta(@RequestBody Ficha1CompletaDTO fichaCompletaDTO) {
//     try {
//         // Extraer las entidades del DTO
//         Ficha1SecEntity ficha = fichaCompletaDTO.getFicha();
//         Ficha1Sec1Entity ficha1 = fichaCompletaDTO.getFicha1();
//         Ficha1Sec2Entity ficha2 = fichaCompletaDTO.getFicha2();
//         Ficha1Sec3Entity ficha3 = fichaCompletaDTO.getFicha3();
//         Ficha1Sec4Entity ficha4 = fichaCompletaDTO.getFicha4();

//         Ficha1Sec5Entity ficha5 = fichaCompletaDTO.getFicha5();
//         Ficha1Sec6Entity ficha6 = fichaCompletaDTO.getFicha6();
//         Ficha1Sec7Entity ficha7 = fichaCompletaDTO.getFicha7();
//         Ficha1Sec8Entity ficha8 = fichaCompletaDTO.getFicha8();
//         Ficha1Sec9Entity ficha9 = fichaCompletaDTO.getFicha9();
//         Ficha1Sec10Entity ficha10 = fichaCompletaDTO.getFicha10();
//         Ficha1Sec11Entity ficha11 = fichaCompletaDTO.getFicha11();
//         Ficha1Sec12Entity ficha12 = fichaCompletaDTO.getFicha12();
//         Ficha1Sec13Entity ficha13 = fichaCompletaDTO.getFicha13();

//         // Validar que las entidades no sean nulas
//         if (ficha == null || ficha1 == null || ficha2 == null || ficha3 == null || ficha4 == null || ficha5 == null || ficha6 == null 
//         || ficha7 == null || ficha8 == null || ficha9 == null 
//         || ficha10 == null || ficha11 == null || ficha12 == null || ficha13 == null) {
//             return ResponseEntity.badRequest().body("Error: Datos incompletos en la solicitud.");
//         }

//         // Guardar la ocmre principal
//         fichaRepository.save(ficha);

//         // Obtener el ID generado para la ocmre
//         Long idFicha = ficha.getIdFicha();

//         // Asociar el ID de la ocmre a las secciones
//         ficha1.setIdFichas1(idFicha);
//         ficha2.setIdFichas2(idFicha);
//         ficha3.setIdFichas3(idFicha);
//         ficha3.setIdFichas4(idFicha);
//         ficha3.setIdFichas5(idFicha);
//         ficha3.setIdFichas6(idFicha);
//         ficha3.setIdFichas7(idFicha);
//         ficha3.setIdFichas8(idFicha);
//         ficha3.setIdFichas9(idFicha);
//         ficha3.setIdFichas10(idFicha);
//         ficha3.setIdFichas11(idFicha);
//         ficha3.setIdFichas12(idFicha);
//         ficha3.setIdFichas13(idFicha);
       
//         // Guardar las secciones
//         ficha1Repository.save(ficha1);
//         ficha2Repository.save(ficha2);
//         ficha3Repository.save(ficha3);
//         ficha4Repository.save(ficha4);

//         ficha5Repository.save(ficha5);
//         ficha6Repository.save(ficha6);
//         ficha7Repository.save(ficha7);
//         ficha8Repository.save(ficha8);
//         ficha9Repository.save(ficha9);
//         ficha10Repository.save(ficha10);
//         ficha11Repository.save(ficha11);
//         ficha12Repository.save(ficha12);
//         ficha13Repository.save(ficha13);

//         return ResponseEntity.ok("Ficha completa guardada correctamente");
//     } catch (Exception e) {
//         // Manejar errores y devolver una respuesta adecuada
//         return ResponseEntity.internalServerError().body("Error al guardar ocmre completa: " + e.getMessage());
//     }
// }


@GetMapping("/obtenerFicha/{id}")
public ResponseEntity<Ficha1SecEntity> obtenerFichaPorId(@PathVariable Long id) {
    return fichaRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}




//@PreAuthorize("hasAnyRole('ESPECIALISTA', 'ADMINISTRADOR', 'COMISIONADO')")
@GetMapping("/obtenerFichaCompleta/{id}")
public ResponseEntity<Ficha1CompletaDTO> obtenerFichaCompleta(@PathVariable Long id) {
    System.out.println("=======> [INICIO] ENTRÓ AL MÉTODO obtenerFichaCompleta: " + id);
    Ficha1CompletaDTO dto = fichaService.obtenerFichaCompletaPorId(id);
    System.out.println("🔍 Obteniendo ocmre completa para ID: " + id);
    System.out.println("Ficha: " + dto.getFicha());
    System.out.println("Ficha1: " + dto.getFicha1());
    System.out.println("=======> [FINAL] TERMINÓ obtenerFichaCompleta");
    return ResponseEntity.ok(dto);
}



//////////MONITOREO//////////
//  @GetMapping("/resumen-por-region")
// public ResponseEntity<List<ResumenFichaPorRegionDTO>> obtenerResumenPorRegion() {
//     List<Ficha1PadronEntity> padron = fichaPadronRepository.findAll();
//     List<Ficha1SecEntity> fichas = fichaRepository.findAll();

//     Map<String, ResumenFichaPorRegionDTO> resumenMap = new HashMap<>();

//     for (Ficha1PadronEntity entidad : padron) {
//         String region = entidad.getDes_departament() != null ? entidad.getDes_departament().toUpperCase() : "SIN REGIÓN";

//         ResumenFichaPorRegionDTO resumen = resumenMap.getOrDefault(region, new ResumenFichaPorRegionDTO());
//         resumen.setRegion(region);
//         resumen.setTotal(resumen.getTotal() + 1);

//         // Buscar ocmre registrada en base al cod_unico
//         Optional<Ficha1SecEntity> ficha = fichas.stream()
//             .filter(f -> f.getCodUnico() != null && f.getCodUnico().equals(entidad.getRuc()))
//             .findFirst();

//         if (ficha.isPresent()) {
//             if ("C".equals(ficha.get().getEstado())) {
//                 resumen.setCompletas(resumen.getCompletas() + 1);
//             } else {
//                 resumen.setIncompletas(resumen.getIncompletas() + 1);
//             }
//         } else {
//             resumen.setFaltanRegistrar(resumen.getFaltanRegistrar() + 1);
//         }

//         resumenMap.put(region, resumen);
//     }

//     // Calcular % de avance
//     for (ResumenFichaPorRegionDTO dto : resumenMap.values()) {
//         if (dto.getTotal() > 0) {
//             double avance = (dto.getCompletas() * 100.0) / dto.getTotal();
//             dto.setPorcentajeAvance(Math.round(avance * 100.0) / 100.0);
//         }
//     }

//     return ResponseEntity.ok(new ArrayList<>(resumenMap.values()));
// }

////////////v2/////////////
// @GetMapping("/resumen-por-region")
// public ResponseEntity<List<ResumenFichaPorRegionDTO>> obtenerResumenPorRegion() {
//     List<Ficha1PadronEntity> padron = fichaPadronRepository.findAll();

//     // Solo activas desde BD (excluye 'X')
//     List<Ficha1SecEntity> activas = fichaRepository.findByEstadoRegistroIsNullOrEstadoRegistroNot("X");

//     // Index por codUnico, quedándote con la más reciente
//     Map<String, Ficha1SecEntity> porCodUnico = activas.stream()
//         .filter(f -> f.getCodUnico() != null)
//         .collect(Collectors.toMap(
//             Ficha1SecEntity::getCodUnico,
//             f -> f,
//             (a, b) -> {
//                 // Elige la más reciente (ajusta a tus campos reales de auditoría)
//                 var da = a.getFchActualiza();
//                 var db = b.getFchActualiza();
//                 if (da == null && db == null) return b;
//                 if (da == null) return b;
//                 if (db == null) return a;
//                 return da.after(db) ? a : b;
//             }
//         ));

//     Map<String, ResumenFichaPorRegionDTO> resumenMap = new HashMap<>();

//     for (Ficha1PadronEntity entidad : padron) {
//         String region = entidad.getDes_departament() != null ? entidad.getDes_departament().toUpperCase() : "SIN REGIÓN";

//         ResumenFichaPorRegionDTO resumen = resumenMap.getOrDefault(region, new ResumenFichaPorRegionDTO());
//         resumen.setRegion(region);
//         resumen.setTotal(resumen.getTotal() + 1);

//         // Busca activa por cod_unico (aquí usas RUC como clave)
//         Ficha1SecEntity ficha = porCodUnico.get(entidad.getRuc());

//         if (ficha != null) {
//             if ("C".equals(ficha.getEstado())) {
//                 resumen.setCompletas(resumen.getCompletas() + 1);
//             } else {
//                 resumen.setIncompletas(resumen.getIncompletas() + 1);
//             }
//         } else {
//             // No hay ficha activa => falta registrar
//             resumen.setFaltanRegistrar(resumen.getFaltanRegistrar() + 1);
//         }

//         resumenMap.put(region, resumen);
//     }

//     // % de avance
//     for (ResumenFichaPorRegionDTO dto : resumenMap.values()) {
//         if (dto.getTotal() > 0) {
//             double avance = (dto.getCompletas() * 100.0) / dto.getTotal();
//             dto.setPorcentajeAvance(Math.round(avance * 100.0) / 100.0);
//         }
//     }

//     return ResponseEntity.ok(new ArrayList<>(resumenMap.values()));
// }
@GetMapping("/resumen-por-region")
public ResponseEntity<List<ResumenFichaPorRegionDTO>> obtenerResumenPorRegion() {
    var padron = fichaPadronRepository.findAll();
    var activas = fichaRepository.findByEstadoRegistroIsNullOrEstadoRegistroNot("X");

    // cod_unico que tienen ≥1 ficha activa 'C'
    Set<String> codsConCompleta = activas.stream()
        .filter(f -> notBlank(f.getCodUnico()))
        .filter(f -> "C".equalsIgnoreCase(safeTrim(f.getEstado())))
        .map(f -> normCod(f.getCodUnico()))
        .collect(Collectors.toSet());

    Map<String, ResumenFichaPorRegionDTO> resumenMap = new HashMap<>();

    for (var entidad : padron) {
        String region = normDistrito(entidad.getDes_distrito());
        var resumen = resumenMap.getOrDefault(region, new ResumenFichaPorRegionDTO());
        resumen.setRegion(region);
        resumen.setTotal(resumen.getTotal() + 1);

        String key = normCod(entidad.getCod_unico()); 
        if (codsConCompleta.contains(key)) {
            resumen.setCompletas(resumen.getCompletas() + 1);
        }
        resumenMap.put(region, resumen);
    }

    for (var dto : resumenMap.values()) {
        // si tu DTO aún tiene 'incompletas'
        try { dto.getClass().getMethod("setIncompletas", int.class).invoke(dto, 0); } catch (Exception ignored) {}
        int faltan = Math.max(0, dto.getTotal() - dto.getCompletas());
        dto.setFaltanRegistrar(faltan);
        dto.setPorcentajeAvance(dto.getTotal() > 0
            ? Math.round((dto.getCompletas() * 10000.0) / dto.getTotal()) / 100.0
            : 0.0);
    }

    var result = new ArrayList<>(resumenMap.values());
    result.sort(Comparator.comparing(ResumenFichaPorRegionDTO::getRegion));
    return ResponseEntity.ok(result);
}

private static boolean notBlank(String s){ return s != null && !s.isBlank(); }
private static String safeTrim(String s){ return s == null ? "" : s.trim(); }
private static String normCod(String s){ return s == null ? null : s.replaceAll("\\D", "").trim(); }
private static String normDistrito(String s){
    if (s == null) return "SIN REGIÓN";
    String n = java.text.Normalizer.normalize(s, java.text.Normalizer.Form.NFD).replaceAll("\\p{M}", "");
    return n.toUpperCase(java.util.Locale.ROOT).trim().replaceAll("\\s+", " ");
}
////////VALIDAR SECCIONES ///////


@PostMapping("/validarSeccion1")
public ResponseEntity<Map<String, String>> validarSeccion1(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec1Entity> optional = ficha1Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 1 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec1Entity ficha = optional.get();
    ficha.setValida_s1("1"); // ✅ Guardamos como validada
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha1Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 1 validada correctamente",
        "estado", "validado"
    ));
}





@PostMapping("/validarSeccion2")
public ResponseEntity<Map<String, String>> validarSeccion2(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec2Entity> optional = ficha2Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 2 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec2Entity ficha = optional.get();
    ficha.setValida_s2("1"); // ✅ Guardamos como validada
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha2Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 2 validada correctamente",
        "estado", "validado"
    ));
}



@PostMapping("/validarSeccion3")
public ResponseEntity<Map<String, String>> validarSeccion3(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec3Entity> optional = ficha3Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 3 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec3Entity ficha = optional.get();
    ficha.setValida_s3("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha3Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 3 validada correctamente",
        "estado", "validado"
    ));
}



@PostMapping("/validarSeccion4")
public ResponseEntity<Map<String, String>> validarSeccion4(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec4Entity> optional = ficha4Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 4 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec4Entity ficha = optional.get();
    ficha.setValida_s4("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha4Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 4 validada correctamente",
        "estado", "validado"
    ));
}


@PostMapping("/validarSeccion5")
public ResponseEntity<Map<String, String>> validarSeccion5(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec5Entity> optional = ficha5Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 4 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec5Entity ficha = optional.get();
    ficha.setValida_s5("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha5Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 5 validada correctamente",
        "estado", "validado"
    ));
}



// ASUME QUE ESTÁS DENTRO DE UNA CLASE @RestController O @Controller CON LAS INYECCIONES Y LOGGERS NECESARIOS.

/*
 * =============================================================================
 * SECCIÓN 6
 * =============================================================================
 */
@PostMapping("/validarSeccion6")
public ResponseEntity<Map<String, String>> validarSeccion6(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    // Se busca por el ID de la entidad, que es igual al idFicha
    Optional<Ficha1Sec6Entity> optional = ficha6Repository.findById(idFicha); 
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 6 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec6Entity ficha = optional.get();
    ficha.setValida_s6("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha6Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 6 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 7
 * =============================================================================
 */
@PostMapping("/validarSeccion7")
public ResponseEntity<Map<String, String>> validarSeccion7(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec7Entity> optional = ficha7Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 7 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec7Entity ficha = optional.get();
    ficha.setValida_s7("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha7Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 7 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 8
 * =============================================================================
 */
@PostMapping("/validarSeccion8")
public ResponseEntity<Map<String, String>> validarSeccion8(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec8Entity> optional = ficha8Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 8 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec8Entity ficha = optional.get();
    ficha.setValida_s8("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha8Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 8 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 9
 * =============================================================================
 */
@PostMapping("/validarSeccion9")
public ResponseEntity<Map<String, String>> validarSeccion9(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec9Entity> optional = ficha9Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 9 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec9Entity ficha = optional.get();
    ficha.setValida_s9("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha9Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 9 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 10
 * =============================================================================
 */
@PostMapping("/validarSeccion10")
public ResponseEntity<Map<String, String>> validarSeccion10(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec10Entity> optional = ficha10Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 10 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec10Entity ficha = optional.get();
    ficha.setValida_s10("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha10Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 10 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 11
 * =============================================================================
 */
@PostMapping("/validarSeccion11")
public ResponseEntity<Map<String, String>> validarSeccion11(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec11Entity> optional = ficha11Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 11 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec11Entity ficha = optional.get();
    ficha.setValida_s11("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha11Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 11 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 12
 * =============================================================================
 */
@PostMapping("/validarSeccion12")
public ResponseEntity<Map<String, String>> validarSeccion12(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec12Entity> optional = ficha12Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 12 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec12Entity ficha = optional.get();
    ficha.setValida_s12("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha12Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 12 validada correctamente",
        "estado", "validado"
    ));
}

// -----------------------------------------------------------------------------

/*
 * =============================================================================
 * SECCIÓN 13
 * =============================================================================
 */
@PostMapping("/validarSeccion13")
public ResponseEntity<Map<String, String>> validarSeccion13(@RequestBody Map<String, Long> datos) {
    Long idFicha = datos.get("idFicha");

    if (idFicha == null) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "ID de ocmre no proporcionado",
            "estado", "error"
        ));
    }

    Optional<Ficha1Sec13Entity> optional = ficha13Repository.findById(idFicha);
    if (optional.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "mensaje", "No se encontró la sección 13 de la ocmre",
            "estado", "error"
        ));
    }

    Ficha1Sec13Entity ficha = optional.get();
    ficha.setValida_s13("1"); 
    ficha.setFchValida(LocalDate.now());
    ficha.setUsuValida(authService.getAuth().getUsername());

    ficha13Repository.save(ficha);

    return ResponseEntity.ok(Map.of(
        "mensaje", "Sección 13 validada correctamente",
        "estado", "validado"
    ));
}
/////////adjuntar archivos/////
/////////adjuntar archivos/////


@PostMapping("/adjuntar-archivo")
public ResponseEntity<?> subirArchivo(
        @RequestParam("archivo_adjunto") MultipartFile[] archivos,
        
        // CORRECCIÓN: Se elimina el parámetro 'id_input_file'.
        
        @RequestParam("id_ficha") Long idFicha) {

    try {
        for (MultipartFile archivo : archivos) {
            if (!archivo.isEmpty()) {
                // CORRECCIÓN: La llamada al servicio ahora solo pasa los parámetros necesarios.
                // Tu ArchivoService debe tener un método guardarArchivo que acepte estos 2 parámetros.
                archivoService.guardarArchivo(archivo, idFicha);
            }
        }

        // Devolver lista actualizada (ahora solo se busca por idFicha).
        List<Ficha1ArchivoEntity> lista = archivoService.listarArchivos(idFicha);

        return ResponseEntity.ok(Map.of(
                "mensaje", "Archivos subidos correctamente",
                "estado", "OK",
                "archivos", lista
        ));

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "mensaje", "Error al subir archivos: " + e.getMessage(),
                "estado", "ERROR"
        ));
    }
}



   @DeleteMapping("/archivo/eliminar/{id}")
    public ResponseEntity<?> eliminarArchivo(@PathVariable Long id) {
        try {
            archivoService.eliminarArchivo(id);
            return ResponseEntity.ok(Map.of(
                    "mensaje", "Archivo eliminado correctamente",
                    "estado", "OK"
                ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
        }
    }


@GetMapping("/archivo/{id}/descargar")
    public ResponseEntity<Resource> descargarArchivo(@PathVariable Long id) {

        // 1. Buscar el archivo en la base de datos usando solo su ID único.
        Ficha1ArchivoEntity archivo = archivoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado en la base de datos con ID: " + id));

        try {
            // 2. Obtener la ruta del archivo en el disco.
            Path filePath = Path.of(archivo.getRutaArchivo());
            
            // --- Log de Depuración ---
            logger.info("Intentando acceder al archivo en la ruta: {}", filePath.toAbsolutePath());

            Resource resource = new UrlResource(filePath.toUri());

            // 3. Verificaciones separadas para un mejor diagnóstico.
            if (!resource.exists()) {
                logger.error("El archivo NO EXISTE en la ruta: {}", filePath.toAbsolutePath());
                throw new RuntimeException("Error crítico: El archivo físico no fue encontrado en el servidor.");
            }
            if (!resource.isReadable()) {
                logger.error("El archivo EXISTE pero NO SE PUEDE LEER en la ruta: {}", filePath.toAbsolutePath());
                throw new RuntimeException("Error crítico: No se tienen permisos para leer el archivo en el servidor.");
            }

            // 4. Construir y devolver la respuesta. Spring se encarga del resto.
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archivo.getNombreOriginal() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            logger.error("La ruta del archivo almacenada en la base de datos es inválida: {}", archivo.getRutaArchivo(), e);
            throw new RuntimeException("Error: La ruta del archivo es inválida.");
        } catch (Exception e) {
            // Captura cualquier otra excepción inesperada durante el proceso.
            logger.error("Error inesperado al intentar descargar el archivo con ID: {}", id, e);
            throw new RuntimeException("Error interno del servidor al procesar la descarga.");
        }
    }




   @GetMapping("/fichas/{idFicha}/archivos")
    public ResponseEntity<List<Ficha1ArchivoEntity>> listarArchivosPorFicha1(
            @PathVariable("idFicha") Long idFicha) {
        
        List<Ficha1ArchivoEntity> archivos = archivoRepository.findByIdFichaOrderByIdDesc(idFicha); 
        return ResponseEntity.ok(archivos);
    }


      @GetMapping("/archivo/listar2")
    public ResponseEntity<List<FichaArchivo2Entity>> listar2(
            @RequestParam("id_ficha") Long idFicha,
            @RequestParam("id_input_file") String idInputFile,
            @RequestParam("cod_unico") String codUnico) {

        List<FichaArchivo2Entity> archivos = archivo2Repository
            .findByIdFichaAndIdInputFileAndCodUnico(idFicha, idInputFile, codUnico);
        return ResponseEntity.ok(archivos);
    }

    

 


  @GetMapping("/seccion1/listar")
        public ResponseEntity<List<Ficha1Sec1Entity>> listarFichasSeccion1() {
            List<Ficha1Sec1Entity> fichas = ficha1Repository.findAll();
            return ResponseEntity.ok(fichas);
        }





      @PatchMapping("/actualizarValidaS1")
    public ResponseEntity<?> actualizarValidaS1(@RequestBody Ficha1Sec1Entity request) {
        System.out.println("request: "+request);
        try {
            fichaService.actualizarValidaS1(request.getIdFichas1(), request.getValida_s1());
            return ResponseEntity.ok(new ResponseMessage("Sección 1 validada correctamente."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 1."));
        }
    }



        @PatchMapping("/actualizarValidaS2")
    public ResponseEntity<?> actualizarValidaS2(@RequestBody Ficha1Sec2Entity request) {
        try {
            fichaService.actualizarValidaS2(request.getIdFichaS2(), request.getValida_s2());
            return ResponseEntity.ok(new ResponseMessage("Sección 2 validada correctamente."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 2."));
        }
    }





    @PatchMapping("/actualizarValidaS3")
public ResponseEntity<?> actualizarValidaS3(@RequestBody Ficha1Sec3Entity request) {
    try {
        fichaService.actualizarValidaS3(request.getIdFichas3(), request.getValida_s3());
        return ResponseEntity.ok(new ResponseMessage("Sección 3 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 3."));
    }
}

    @PatchMapping("/actualizarValidaS4")
public ResponseEntity<?> actualizarValidaS4(@RequestBody Ficha1Sec4Entity request) {
    try {
        fichaService.actualizarValidaS4(request.getIdFichas4(), request.getValida_s4());
        return ResponseEntity.ok(new ResponseMessage("Sección 4 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 4."));
    }
}
  

/*
 * =============================================================================
 * SECCIÓN 5
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS5")
public ResponseEntity<?> actualizarValidaS5(@RequestBody Ficha1Sec5Entity request) {
    try {
        // Llama al método del service correspondiente
        fichaService.actualizarValidaS5(request.getIdFichas5(), request.getValida_s5());
        return ResponseEntity.ok(new ResponseMessage("Sección 5 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 5."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 6
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS6")
public ResponseEntity<?> actualizarValidaS6(@RequestBody Ficha1Sec6Entity request) {
    try {
        fichaService.actualizarValidaS6(request.getIdFichas6(), request.getValida_s6());
        return ResponseEntity.ok(new ResponseMessage("Sección 6 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 6."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 7
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS7")
public ResponseEntity<?> actualizarValidaS7(@RequestBody Ficha1Sec7Entity request) {
    try {
        fichaService.actualizarValidaS7(request.getIdFichas7(), request.getValida_s7());
        return ResponseEntity.ok(new ResponseMessage("Sección 7 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 7."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 8
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS8")
public ResponseEntity<?> actualizarValidaS8(@RequestBody Ficha1Sec8Entity request) {
    try {
        fichaService.actualizarValidaS8(request.getIdFichas8(), request.getValida_s8());
        return ResponseEntity.ok(new ResponseMessage("Sección 8 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 8."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 9
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS9")
public ResponseEntity<?> actualizarValidaS9(@RequestBody Ficha1Sec9Entity request) {
    try {
        fichaService.actualizarValidaS9(request.getIdFichas9(), request.getValida_s9());
        return ResponseEntity.ok(new ResponseMessage("Sección 9 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 9."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 10
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS10")
public ResponseEntity<?> actualizarValidaS10(@RequestBody Ficha1Sec10Entity request) {
    try {
        fichaService.actualizarValidaS10(request.getIdFichas10(), request.getValida_s10());
        return ResponseEntity.ok(new ResponseMessage("Sección 10 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 10."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 11
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS11")
public ResponseEntity<?> actualizarValidaS11(@RequestBody Ficha1Sec11Entity request) {
    try {
        fichaService.actualizarValidaS11(request.getIdFichas11(), request.getValida_s11());
        return ResponseEntity.ok(new ResponseMessage("Sección 11 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 11."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 12
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS12")
public ResponseEntity<?> actualizarValidaS12(@RequestBody Ficha1Sec12Entity request) {
    try {
        fichaService.actualizarValidaS12(request.getIdFichas12(), request.getValida_s12());
        return ResponseEntity.ok(new ResponseMessage("Sección 12 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 12."));
    }
}


/*
 * =============================================================================
 * SECCIÓN 13
 * =============================================================================
 */
@PatchMapping("/actualizarValidaS13")
public ResponseEntity<?> actualizarValidaS13(@RequestBody Ficha1Sec13Entity request) {
    try {
        fichaService.actualizarValidaS13(request.getIdFichas13(), request.getValida_s13());
        return ResponseEntity.ok(new ResponseMessage("Sección 13 validada correctamente."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ResponseMessage("Error al validar la sección 13."));
    }
}


   @GetMapping("/listar")
    public List<ReporteEstadisticoDTO> listarReportes() {
        return reporteService.listarReportes();
    }


//     @PutMapping("/marcar-validada/{idFicha}")
// public ResponseEntity<?> marcarFichaComoValidada(@PathVariable Long idFicha) {
//     Optional<Ficha1SecEntity> fichaOpt = fichaRepository.findById(idFicha);
//     if (fichaOpt.isPresent()) {
//         Ficha1SecEntity ficha = fichaOpt.get();
//         ficha.setFlagValidar("1");
//         fichaRepository.save(ficha);
//         return ResponseEntity.ok("Ficha marcada como validada.");
//     } else {
//         return ResponseEntity.notFound().build();
//     }
// }

@PutMapping(value = "/marcar-validada/{idFicha}", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> marcarFichaComoValidada(@PathVariable Long idFicha) {
    return fichaRepository.findById(idFicha)
        .map(ficha -> {
            ficha.setFlagValidar("1");
            fichaRepository.save(ficha);
            return ResponseEntity.ok(Map.of(
                "ok", true,
                "mensaje", "Ficha marcada como validada.",
                "idFicha", idFicha,
                "flagValidar", ficha.getFlagValidar()
            ));
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
}





///////////////////////////////////// ADJUNTAR ARCHIVO D7/////////////////////////////
/// 
/// 
/////////adjuntar archivos/////



      @GetMapping("/archivo/listar3")
    public ResponseEntity<List<FichaArchivo3Entity>> listar3(
            @RequestParam("id_ficha") Long idFicha,
            @RequestParam("id_input_file") String idInputFile,
            @RequestParam("cod_unico") String codUnico) {

        List<FichaArchivo3Entity> archivos = archivo3Repository
            .findByIdFichaAndIdInputFileAndCodUnico(idFicha, idInputFile, codUnico);

        return ResponseEntity.ok(archivos);
    }

    
@GetMapping("/archivo/{id}/descargar3")
    public ResponseEntity<Resource> descargarArchivo3(@PathVariable Long id) {

        // 1. Buscar el archivo en la base de datos usando solo su ID único.
        FichaArchivo3Entity archivo = archivo3Repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado en la base de datos con ID: " + id));

        try {
            // 2. Obtener la ruta del archivo en el disco.
            Path filePath = Paths.get(archivo.getRutaArchivo());
            
            // --- Log de Depuración ---
            logger.info("Intentando acceder al archivo en la ruta: {}", filePath.toAbsolutePath());

            Resource resource = new UrlResource(filePath.toUri());

            // 3. Verificaciones separadas para un mejor diagnóstico.
            if (!resource.exists()) {
                logger.error("El archivo NO EXISTE en la ruta: {}", filePath.toAbsolutePath());
                throw new RuntimeException("Error crítico: El archivo físico no fue encontrado en el servidor.");
            }
            if (!resource.isReadable()) {
                logger.error("El archivo EXISTE pero NO SE PUEDE LEER en la ruta: {}", filePath.toAbsolutePath());
                throw new RuntimeException("Error crítico: No se tienen permisos para leer el archivo en el servidor.");
            }

            // 4. Construir y devolver la respuesta. Spring se encarga del resto.
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archivo.getNombreOriginal() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            logger.error("La ruta del archivo almacenada en la base de datos es inválida: {}", archivo.getRutaArchivo(), e);
            throw new RuntimeException("Error: La ruta del archivo es inválida.");
        } catch (Exception e) {
            // Captura cualquier otra excepción inesperada durante el proceso.
            logger.error("Error inesperado al intentar descargar el archivo con ID: {}", id, e);
            throw new RuntimeException("Error interno del servidor al procesar la descarga.");
        }
    }





    //////////////////////////////////////ELIMINACION DE FICHA //////////////////////////
/// 
/// 

private final Ficha1Service service;

  public Ficha1Controller(Ficha1Service service) { this.service = service; }

@PutMapping("/fichas/{id}/baja")
  public ResponseEntity<?> darBaja(
      @PathVariable Long id,
      @RequestBody BajaFichaRequest req,
      Principal principal 
  ) {
    service.darBaja(id, req.observacionBaja(), principal != null ? principal.getName() : "sistema");
    return ResponseEntity.ok().body(Map.of("mensaje", "Ficha dada de baja"));
  }

  @GetMapping("/fichas")
  public List<Ficha1SecEntity> listar() {
    return service.listarActivas(); // ya no incluye 'X'
  }




  @GetMapping("/api/whoami")
public Map<String,Object> whoami(Authentication auth, Jwt jwt) {
  return Map.of(
    "name", auth.getName(),
    "authorities", auth.getAuthorities()
    // "claims_roles", jwt.getClaims().get("roles"),
    // "scope", jwt.getClaimAsString("scope")
  );
}







@GetMapping("/entidadExterno/{codUnicoEntidad}")
public ResponseEntity<EntidadExternaDTO> obtenerDatosEntidadPorCodUnicoEntidad(
        @PathVariable("codUnicoEntidad") String codUnicoEntidad) {
    
    System.out.println("\n╔════════════════════════════════════════════════════════════╗");
    System.out.println("║  CONTROLLER: GET /api/ficha1/entidadExterno/" + codUnicoEntidad);
    System.out.println("╚════════════════════════════════════════════════════════════╝");
    
    // Validación de entrada
    if (codUnicoEntidad == null || codUnicoEntidad.trim().isEmpty()) {
        System.out.println("CONTROLLER: ❌ ERROR - codUnicoEntidad es NULL o vacío");
        System.out.println("CONTROLLER: Devolviendo 400 BAD REQUEST\n");
        return ResponseEntity.badRequest().build();
    }
    
    System.out.println("CONTROLLER: codUnicoEntidad recibido: '" + codUnicoEntidad + "'");
    System.out.println("CONTROLLER: Llamando al servicio...");
    
    // Llamada al servicio
    EntidadExternaDTO datosEntidad = fichaService.obtenerEntidadPorCodUnicoEntidad(codUnicoEntidad.toUpperCase());
    
    if (datosEntidad != null) {
        System.out.println("CONTROLLER: ✅ ÉXITO - Entidad encontrada");
        System.out.println("CONTROLLER: Devolviendo 200 OK con datos");
        System.out.println("CONTROLLER: JSON response:");
        System.out.println("  - nom_entidad: " + datosEntidad.getNom_entidad());
        System.out.println("  - ruc: " + datosEntidad.getRuc());
        System.out.println("  - cod_unico: " + datosEntidad.getCod_unico());
        System.out.println("  - des_departament: " + datosEntidad.getDes_departament());
        System.out.println("  - des_provincia: " + datosEntidad.getDes_provincia());
        System.out.println("  - nom_autoridad: " + datosEntidad.getNom_autoridad());
        System.out.println("  - telefono: " + datosEntidad.getTelefono());
        System.out.println("  - telef_emer: " + datosEntidad.getTelef_emer());
        System.out.println("╔════════════════════════════════════════════════════════════╗\n");
        return ResponseEntity.ok(datosEntidad);
    } else {
        System.out.println("CONTROLLER: ⚠️ ADVERTENCIA - Entidad NO encontrada");
        System.out.println("CONTROLLER: Devolviendo 404 NOT FOUND");
        System.out.println("CONTROLLER: Posibles causas:");
        System.out.println("  1. El cod_unico '" + codUnicoEntidad + "' no existe en mre_padron");
        System.out.println("  2. Hay espacios en blanco adicionales en la BD");
        System.out.println("  3. La consulta SQL tiene un error");
        System.out.println("╔════════════════════════════════════════════════════════════╗\n");
        return ResponseEntity.notFound().build();
    }
}









//   @GetMapping("/existeFichaExterno")
//   public ResponseEntity<Boolean> existeMiFicha(Authentication auth) {
//     String usuario = auth.getName(); 
//     boolean existe = fichaRepository.existsByUsuRegistroAndEstadoRegistroNot(usuario, "X"); 
//     return ResponseEntity.ok(existe);
//   }

  @GetMapping("/existeFichaExterno")
    public ResponseEntity<Boolean> existeMiFicha() {
    String usuario = authService.getAuth().getUsername();
    System.out.println(usuario);
    boolean existe = fichaRepository.existeActivaIncluyeNull(usuario, "X");
    return ResponseEntity.ok(existe);
    }



@PostMapping("/adjuntar-archivo2")
public ResponseEntity<?> subirArchivo2(
        @RequestParam("archivo_adjunto") MultipartFile[] archivos,
        
        // CORRECCIÓN: Se elimina el parámetro 'id_input_file'.
        
        @RequestParam("id_ficha") Long idFicha) {

    try {
        for (MultipartFile archivo : archivos) {
            if (!archivo.isEmpty()) {
                // CORRECCIÓN: La llamada al servicio ahora solo pasa los parámetros necesarios.
                // Tu ArchivoService debe tener un método guardarArchivo que acepte estos 2 parámetros.
                archivo2Service.guardarArchivo2(archivo, idFicha);
            }
        }

        // Devolver lista actualizada (ahora solo se busca por idFicha).
        List<FichaArchivo2Entity> lista = archivo2Service.listarArchivos2(idFicha);

        return ResponseEntity.ok(Map.of(
                "mensaje", "Archivos subidos correctamente",
                "estado", "OK",
                "archivos", lista
        ));

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "mensaje", "Error al subir archivos: " + e.getMessage(),
                "estado", "ERROR"
        ));
    }
}

//     /////////adjuntar archivos/////
// @PostMapping("/adjuntar-archivo2")
// public ResponseEntity<?> subirArchivo2(
//         @RequestParam("archivo_adjunto") MultipartFile[] archivos,
        
//         // CORRECCIÓN: Se elimina el parámetro 'id_input_file'.
        
//         @RequestParam("id_ficha") Long idFicha) {

//     try {
//         for (MultipartFile archivo : archivos) {
//             if (!archivo.isEmpty()) {
                
//                 archivo2Service.guardarArchivo2(archivo, idFicha);
//             }
//         }

//         List<FichaArchivo2Entity> lista = archivo2Service.listarArchivos2(idFicha);

//         return ResponseEntity.ok(Map.of(
//                 "mensaje", "Archivos subidos correctamente",
//                 "estado", "OK",
//                 "archivos", lista
//         ));

//     } catch (Exception e) {
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
//                 "mensaje", "Error al subir archivos: " + e.getMessage(),
//                 "estado", "ERROR"
//         ));
//     }
// }


@GetMapping("/fichas/{idFicha}/archivos2")
    public ResponseEntity<List<FichaArchivo2Entity>> listarArchivosPorFicha2(
            @PathVariable("idFicha") Long idFicha) {
        
        List<FichaArchivo2Entity> archivos = archivo2Repository.findByIdFichaOrderByIdDesc(idFicha); 
        return ResponseEntity.ok(archivos);
    }

    
@GetMapping("/archivo/{id}/descargar2")
    public ResponseEntity<Resource> descargarArchivo2(@PathVariable Long id) {

        // 1. Buscar el archivo en la base de datos usando solo su ID único.
        FichaArchivo2Entity archivo = archivo2Repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado en la base de datos con ID: " + id));

        try {
            // 2. Obtener la ruta del archivo en el disco.
            Path filePath = Paths.get(archivo.getRutaArchivo());
            
            // --- Log de Depuración ---
            logger.info("Intentando acceder al archivo en la ruta: {}", filePath.toAbsolutePath());

            Resource resource = new UrlResource(filePath.toUri());

            // 3. Verificaciones separadas para un mejor diagnóstico.
            if (!resource.exists()) {
                logger.error("El archivo NO EXISTE en la ruta: {}", filePath.toAbsolutePath());
                throw new RuntimeException("Error crítico: El archivo físico no fue encontrado en el servidor.");
            }
            if (!resource.isReadable()) {
                logger.error("El archivo EXISTE pero NO SE PUEDE LEER en la ruta: {}", filePath.toAbsolutePath());
                throw new RuntimeException("Error crítico: No se tienen permisos para leer el archivo en el servidor.");
            }

            // 4. Construir y devolver la respuesta. Spring se encarga del resto.
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archivo.getNombreOriginal() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            logger.error("La ruta del archivo almacenada en la base de datos es inválida: {}", archivo.getRutaArchivo(), e);
            throw new RuntimeException("Error: La ruta del archivo es inválida.");
        } catch (Exception e) {
            // Captura cualquier otra excepción inesperada durante el proceso.
            logger.error("Error inesperado al intentar descargar el archivo con ID: {}", id, e);
            throw new RuntimeException("Error interno del servidor al procesar la descarga.");
        }
    }


     @DeleteMapping("/archivo/eliminar2/{id}")
    public ResponseEntity<?> eliminarArchivo2(@PathVariable Long id) {
        try {
            archivo2Service.eliminarArchivo2(id);
            //return ResponseEntity.ok("Archivo eliminado correctamente.");

            return ResponseEntity.ok(Map.of(
                    "mensaje", "Archivo eliminado correctamente",
                    "estado", "OK"
                ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
        }
    }

}
