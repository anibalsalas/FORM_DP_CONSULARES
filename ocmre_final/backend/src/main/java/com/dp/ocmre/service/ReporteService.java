package com.dp.ocmre.service;


import com.dp.ocmre.dto.ReporteEstadisticoDTO;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReporteService {

    // Simulación (en producción usas tu service real de fechas)
    private Date getFechaHoraSistema() {
        return new Date();
    }

    private final SimpleDateFormat formatter_dma = new SimpleDateFormat("dd-MM-yyyy");

    public List<ReporteEstadisticoDTO> listarReportes() {
        List<ReporteEstadisticoDTO> lista = new ArrayList<>();
        lista.add(new ReporteEstadisticoDTO("destination_631", "Reporte 1", generarToken("destination_631")));
        lista.add(new ReporteEstadisticoDTO("destination_632", "Reporte 2", generarToken("destination_632")));
        lista.add(new ReporteEstadisticoDTO("destination_633", "Reporte 3", generarToken("destination_633")));
        // ... sigue hasta el 12 igual que tu versión original
        return lista;
    }

    private String generarToken(String destino) {
        try {
            String date = formatter_dma.format(getFechaHoraSistema());
            String password = date + "SomeExtraText" + destino;
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(password.getBytes());

            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }

            return sb.toString() + "&dst=" + destino;
        } catch (Exception e) {
            return "";
        }
    }
}
