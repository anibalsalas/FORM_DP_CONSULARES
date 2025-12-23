package com.dp.ocmre.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dp.ocmre.entity.ficha1.Ficha1ArchivoEntity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1ArchivoRepository;

import jakarta.transaction.Transactional;

@Service
public class Archivo1AdjuntoService {

    @Value("${ruta.archivos.base}")
    private String rutaBase; 

    @Autowired
    private Ficha1ArchivoRepository ficha1ArchivoRepository;

    private static final long MAX_TAMANIO = 100 * 1024 * 1024;

    private static final String[] EXTENSIONES_PERMITIDAS = {
        ".pdf", ".jpg", ".jpeg", ".png", ".gif",
        ".doc", ".docx", ".xls", ".xlsx"
    };

    @Transactional
public void guardarArchivo(MultipartFile archivo, Long idFicha) throws IOException {
    if (archivo.isEmpty()) {
        throw new IllegalArgumentException("El archivo está vacío.");
    }

    String nombreOriginal = archivo.getOriginalFilename();
    if (!validarExtension(nombreOriginal)) {
        throw new IllegalArgumentException("Extensión no permitida: " + nombreOriginal);
    }

    if (archivo.getSize() > MAX_TAMANIO) {
        throw new IllegalArgumentException("Archivo excede el límite de 100MB.");
    }

    String nombreGuardado = System.currentTimeMillis() + "_" + nombreOriginal;
    Path rutaDestino = Paths.get(rutaBase, nombreGuardado);
    Path parentPath = rutaDestino.getParent();
    if (Files.notExists(parentPath)) {
        Files.createDirectories(parentPath);
    }

    try (InputStream inputStream = archivo.getInputStream()) {
        Files.copy(inputStream, rutaDestino, StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
        throw new IllegalArgumentException("No se pudo copiar el archivo.");
    }

    String usuario = SecurityContextHolder.getContext().getAuthentication().getName();
    
    // --- CORRECCIONES PRINCIPALES AQUÍ ---
    Ficha1ArchivoEntity entity = new Ficha1ArchivoEntity();
    
    // Se elimina la línea "entity.setId(id);" porque el ID es generado por la BD.
    
    entity.setIdFicha(idFicha);
    //entity.setIdInputFile(idInputFile); // Se usa el nuevo parámetro para guardar la sección.
    entity.setNombreOriginal(nombreOriginal);
    entity.setNombreGuardado(nombreGuardado);
    entity.setTipoMime(archivo.getContentType());
    entity.setRutaArchivo(rutaDestino.toString());
    entity.setTamanio(archivo.getSize());
    entity.setUsuRegistro(usuario);
    entity.setFchRegistro(new Date());

    ficha1ArchivoRepository.save(entity);
}

    @Transactional
    public void eliminarArchivo(Long idArchivo) {
        Ficha1ArchivoEntity archivo = ficha1ArchivoRepository.findById(idArchivo)
            .orElseThrow(() -> new RuntimeException("Archivo no encontrado con ID: " + idArchivo));

        try {
            Path path = Paths.get(archivo.getRutaArchivo());
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo eliminar el archivo físico: " + e.getMessage());
        }

        ficha1ArchivoRepository.deleteById(idArchivo);
    }



 public List<Ficha1ArchivoEntity> listarArchivos(Long idFicha) {
        return ficha1ArchivoRepository.findByIdFichaOrderByIdDesc(idFicha);
    }
    



public Ficha1ArchivoEntity obtenerArchivoPorId(Long id) {
    return ficha1ArchivoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Archivo no encontrado con ID: " + id));
}



    private boolean validarExtension(String nombre) {
        String nombreLower = nombre.toLowerCase();
        for (String ext : EXTENSIONES_PERMITIDAS) {
            if (nombreLower.endsWith(ext)) return true;
        }
        return false;
    }



    
}
