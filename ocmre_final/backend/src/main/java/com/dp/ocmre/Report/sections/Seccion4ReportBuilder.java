package com.dp.ocmre.Report.sections;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class Seccion4ReportBuilder {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");

    public ReportSheet buildGlobalSheet(List<Ficha1Sec4Entity> items, String tituloHoja) {

        ReportSheet sheet = new ReportSheet();
        sheet.title = (tituloHoja == null || tituloHoja.isBlank())
                ? "Sección 4 – Consolidado"
                : tituloHoja;

        ReportBlock block = new ReportBlock();
        block.blockTitle = "Sección 4 (Consejo de Consulta)";

        block.header = new ArrayList<>();

        // ===== META =====
        Collections.addAll(block.header, "ID_FICHA", "USUARIO_REGISTRO");

        // ===== 4.1 - Convocatoria =====
        Collections.addAll(block.header,
                "4.1 Convocado a elecciones 2025 (Sí/No)",
                "4.1 Fecha de convocatoria"
        );

        // ===== 4.2 - Habilitados para votar =====
        Collections.addAll(block.header,
                "4.2 N° Hombres habilitados para votar",
                "4.2 N° Mujeres habilitadas para votar"
        );

        // ===== 4.3 - Ciudadanos =====
        block.header.add("4.3 N° Ciudadanos que integran el Consejo");

        // ===== 4.4 - Último año con Consejo =====
        block.header.add("4.4 Último año que hubo Consejo de Consulta");

        // ===== 4.5 - Motivos sin Consejo =====
        Collections.addAll(block.header,
                "4.5 Motivo – Falta de votantes (X/-)",
                "4.5 Motivo – No hay candidatos (X/-)",
                "4.5 Motivo – Falta apoyo logístico (X/-)",
                "4.5 Motivo – Falta actualizar reglamento (X/-)",
                "4.5 Motivo – Otros (X/-)",
                "4.5 Motivo – Otros – Detalle"
        );

        // ===== 4.6 - Nueva institución =====
        Collections.addAll(block.header,
                "4.6 Crear otra institución de representación (Sí/No)",
                "4.6 Detalle de propuesta"
        );

        // ===== 4.7 - Proyectos de Ley =====
        block.header.add("4.7 Formuló Proyectos de Ley ante Congreso (Sí/No)");

        // ===== 4.8 - Necesidades (Matriz 5 tipos) =====
        String[] tipos = {"Logística", "Infraestructura", "Personal", "Presupuesto", "Otro"};
        for (String tipo : tipos) {
            Collections.addAll(block.header,
                    "4.8 Necesidad " + tipo + " – Seleccionado (X/-)",
                    "4.8 Necesidad " + tipo + " – ¿Gestiones? (Sí/No)",
                    "4.8 Necesidad " + tipo + " – Suficiente/Insuficiente",
                    "4.8 Necesidad " + tipo + " – Observaciones"
            );
            if (tipo.equals("Otro")) {
                block.header.add("4.8 Necesidad Otro – Especifique");
            }
        }
        block.header.add("4.8 Ninguno (X/-)");

        // ===== 4.9 - Capacitaciones =====
        block.header.add("4.9 Recibe capacitaciones el personal (Sí/No)");

        // ===== 4.10 - Instituciones =====
        String[] instituciones = {
                "MRE", "RENIEC", "Migraciones", "INTERPOL", "INEI",
                "JNE", "ONPE", "SUNARP", "Poder Judicial", "Otro"
        };
        for (String inst : instituciones) {
            block.header.add("4.10 Institución " + inst + " (X/-)");
        }
        Collections.addAll(block.header,
                "4.10 Institución Otro – Detalle",
                "4.10 Ninguna capacitación (X/-)"
        );

        // ===== FILAS =====
        block.rows = new ArrayList<>();

        if (items != null) {
            for (Ficha1Sec4Entity e : items) {
                List<String> row = new ArrayList<>();

                // META
                row.add(val(e.getIdFicha()));
                row.add(val(tryUser(e)));

                // 4.1
                row.add(siNo(e.getP41Convocado()));
                row.add(formatDate(e.getP41Fecha()));

                // 4.2
                row.add(val(e.getP42NumHombre()));
                row.add(val(e.getP42NumMujer()));

                // 4.3
                row.add(val(e.getP43Ciudadanos()));

                // 4.4
                row.add(decodificarUltimoAnio(e.getP44UltimoAnio()));

                // 4.5
                row.add(marcaX(e.getP45Votantes()));
                row.add(marcaX(e.getP45Candidatos()));
                row.add(marcaX(e.getP45Apoyo()));
                row.add(marcaX(e.getP45Actualizar()));
                row.add(marcaX(e.getP45Otros()));
                row.add(val(e.getP45OtrosDetalle()));

                // 4.6
                row.add(siNo(e.getP46Consulado()));
                row.add(val(e.getP46Detalle()));

                // 4.7
                row.add(siNo(e.getP47IndicarConsejo()));

                // 4.8 - Logística
                row.add(marcaX(e.getP48ALogistica()));
                row.add(siNo(e.getP48AGestiones()));
                row.add(suficiente(e.getP48ASuficiente()));
                row.add(val(e.getP48AEspecifique()));

                // 4.8 - Infraestructura
                row.add(marcaX(e.getP48BInfra()));
                row.add(siNo(e.getP48BGestiones()));
                row.add(suficiente(e.getP48BSuficiente()));
                row.add(val(e.getP48BEspecifique()));

                // 4.8 - Personal
                row.add(marcaX(e.getP48CPersonal()));
                row.add(siNo(e.getP48CGestiones()));
                row.add(suficiente(e.getP48CSuficiente()));
                row.add(val(e.getP48CEspecifique()));

                // 4.8 - Presupuesto
                row.add(marcaX(e.getP48DPresupuesto()));
                row.add(siNo(e.getP48DGestiones()));
                row.add(suficiente(e.getP48DSuficiente()));
                row.add(val(e.getP48DEspecifique()));

                // 4.8 - Otro
                row.add(marcaX(e.getP48EOtro()));
                row.add(siNo(e.getP48EGestiones()));
                row.add(suficiente(e.getP48ESuficiente()));
                row.add(val(e.getP48EEspecifique()));
                row.add(val(e.getP48EOtroDetalle()));

                // 4.8 - Ninguno
                row.add(marcaX(e.getP48Ninguno()));

                // 4.9
                row.add(siNo(e.getP49Recibe()));

                // 4.10
                row.add(marcaX(e.getP410Mre()));
                row.add(marcaX(e.getP410Reniec()));
                row.add(marcaX(e.getP410Migraciones()));
                row.add(marcaX(e.getP410Interpol()));
                row.add(marcaX(e.getP410Inei()));
                row.add(marcaX(e.getP410Jne()));
                row.add(marcaX(e.getP410Onpe()));
                row.add(marcaX(e.getP410Sunarp()));
                row.add(marcaX(e.getP410PoderJudicial()));
                row.add(marcaX(e.getP410Otro()));
                row.add(val(e.getP410OtroDetalle()));
                row.add(marcaX(e.getP410Ninguna()));

                block.rows.add(row);
            }
        }

        sheet.blocks = new ArrayList<>();
        sheet.blocks.add(block);
        return sheet;
    }

    // ===== HELPERS =====

    private static String val(Object o) {
        return (o == null) ? "" : String.valueOf(o).trim();
    }

    /**
     * Convierte S/N a "Sí"/"No"
     */
    private static String siNo(Object v) {
        if (v == null) return "";
        String s = String.valueOf(v).trim();
        if (s.equalsIgnoreCase("S")) return "Sí";
        if (s.equalsIgnoreCase("N")) return "No";
        return "";
    }

    /**
     * Convierte 'S' a "X", null o '' a "-"
     */
    private static String marcaX(Object v) {
        if (v == null) return "";
        String s = String.valueOf(v).trim();
        if (s.equalsIgnoreCase("S")) return "X";
        return "";
    }

    /**
     * Convierte S/N a "Suficiente"/"Insuficiente"
     */
    private static String suficiente(Object v) {
        if (v == null) return "";
        String s = String.valueOf(v).trim();
        if (s.equalsIgnoreCase("S")) return "Suficiente";
        if (s.equalsIgnoreCase("N")) return "Insuficiente";
        return "";
    }

    /**
     * Decodifica el código de último año
     */
    private static String decodificarUltimoAnio(Object v) {
        if (v == null) return "";
        String s = String.valueOf(v).trim();
        switch (s.toUpperCase()) {
            case "A": return "Antes de 2019";
            case "B": return "2020";
            case "C": return "2021";
            case "D": return "2022";
            case "E": return "2023";
            case "F": return "2024";
            default: return s;
        }
    }

    /**
     * Formatea fecha a dd/MM/yyyy
     */
    private static String formatDate(Object date) {
        if (date == null) return "";
        try {
            return DATE_FORMAT.format(date);
        } catch (Exception e) {
            return String.valueOf(date);
        }
    }

    private static String tryUser(Ficha1Sec4Entity e) {
        try {
            if (e.getUsuRegistro() != null && !e.getUsuRegistro().isBlank()) {
                return e.getUsuRegistro().trim();
            }
        } catch (Throwable ignore) {}
        try {
            if (e.getUsuActualiza() != null && !e.getUsuActualiza().isBlank()) {
                return e.getUsuActualiza().trim();
            }
        } catch (Throwable ignore) {}
        return "";
    }
}