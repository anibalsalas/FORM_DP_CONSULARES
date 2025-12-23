package com.dp.ocmre.service;

import com.dp.ocmre.entity.ficha1.Ficha1ArchivoEntity;
import com.dp.ocmre.entity.ficha1.FichaArchivo3Entity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Archivo3Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1ArchivoRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import java.io.IOException;
import java.nio.file.*;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class Archivo3AdjuntoService {

    @Value("${ruta.archivos.base}")
    private String rutaBase; 

    @Autowired
    private Ficha1Archivo3Repository fichaArchivo3Repository;

    private static final long MAX_TAMANIO = 100 * 1024 * 1024;

    private static final String[] EXTENSIONES_PERMITIDAS = {
        ".pdf", ".jpg", ".jpeg", ".png", ".gif",
        ".doc", ".docx", ".xls", ".xlsx"
    };

    @Transactional
    public void guardarArchivo3(MultipartFile archivo, Long idFicha, String codUnico, String idInputFile) throws IOException {
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

        Files.createDirectories(rutaDestino.getParent());
        Files.copy(archivo.getInputStream(), rutaDestino, StandardCopyOption.REPLACE_EXISTING);

        String usuario = SecurityContextHolder.getContext().getAuthentication().getName();
        String seccion = idInputFile.length() >= 2 ? idInputFile.substring(0, 2).toUpperCase() : "";

        FichaArchivo3Entity entity = new FichaArchivo3Entity();
        entity.setIdFicha(idFicha);
        entity.setCodUnico(codUnico);
        entity.setIdInputFile(idInputFile);
        entity.setNombreOriginal(nombreOriginal);
        entity.setNombreGuardado(nombreGuardado);
        entity.setTipoMime(archivo.getContentType());
        entity.setRutaArchivo(rutaDestino.toString());
        entity.setTamanio(archivo.getSize());
        entity.setUsuRegistro(usuario);
        entity.setFchRegistro(new Date());
        entity.setSeccion(seccion);

        fichaArchivo3Repository.save(entity);
    }


    

    @Transactional
    public void eliminarArchivo3(Long idArchivo) {
        FichaArchivo3Entity archivo = fichaArchivo3Repository.findById(idArchivo)
            .orElseThrow(() -> new RuntimeException("Archivo no encontrado con ID: " + idArchivo));

        try {
            Path path = Paths.get(archivo.getRutaArchivo());
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo eliminar el archivo físico: " + e.getMessage());
        }

        fichaArchivo3Repository.deleteById(idArchivo);
    }


    public List<FichaArchivo3Entity> listarArchivos3(Long idFicha, String idInputFile, String codUnico) {
    return fichaArchivo3Repository.findByIdFichaAndIdInputFileAndCodUnico(idFicha, idInputFile, codUnico);
}





public FichaArchivo3Entity obtenerArchivoPorId(Long id) {
    return fichaArchivo3Repository.findById(id)
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
