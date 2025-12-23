package com.dp.ocmre.Report.sections;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.entity.ficha1.Ficha1Sec3Entity;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class Seccion3ReportBuilder {

    public ReportSheet buildGlobalSheet(List<Ficha1Sec3Entity> items, String tituloHoja) {

        ReportSheet sheet = new ReportSheet();
        sheet.title = (tituloHoja == null || tituloHoja.isBlank())
                ? "Sección 3 – Consolidado"
                : tituloHoja;

        ReportBlock block = new ReportBlock();
        block.blockTitle = "Sección 3 (Vinculación con las comunidades nacionales)";

        block.header = new ArrayList<>();

        // ===== META =====
        Collections.addAll(block.header, "ID_FICHA", "USUARIO_REGISTRO");

        // ===== 3.1 - 3.3: Asociaciones, Actividades, Personas =====
        Collections.addAll(block.header,
                "3.1 Número de asociaciones peruanas registradas",
                "3.1 No cuenta con asociaciones (S/N)",
                "3.2 Número de actividades sobre reinserción y retorno",
                "3.3 Número de personas beneficiadas"
        );

        // ===== 3.4: Iniciativas de comunidades =====
        Collections.addAll(block.header,
                "3.4 Iniciativa – Culturales (S/N)",
                "3.4 Iniciativa – Artísticas (S/N)",
                "3.4 Iniciativa – Comerciales (S/N)",
                "3.4 Iniciativa – Religiosas (S/N)",
                "3.4 Iniciativa – Otras (S/N)",
                "3.4 Iniciativa – Otras – Detalle"
        );

        // ===== 3.5 - 3.6: Centro cultural y Calendario =====
        Collections.addAll(block.header,
                "3.5 Existe centro cultural o museo (Sí/No)",
                "3.6 Existe calendario de actividades culturales (Sí/No)"
        );

        // ===== 3.7: Ayuda a comunidades =====
        Collections.addAll(block.header,
                "3.7 Ayuda – Iniciativas de regularización migratoria (S/N)",
                "3.7 Ayuda – Mecanismos de participación (S/N)",
                "3.7 Ayuda – Festividades y celebraciones (S/N)",
                "3.7 Ayuda – Programas de asistencia (S/N)",
                "3.7 Ayuda – Otros (S/N)",
                "3.7 Ayuda – Otros – Detalle"
        );

        // ===== 3.8: Gremios peruanos (Tabla 2x4) =====
        Collections.addAll(block.header,
                "3.8 Gremios – Hombres – Industrial",
                "3.8 Gremios – Hombres – Comerciante",
                "3.8 Gremios – Hombres – Estudiante",
                "3.8 Gremios – Hombres – Otro",
                "3.8 Gremios – Hombres – Otro – Detalle",
                "3.8 Gremios – Mujeres – Industrial",
                "3.8 Gremios – Mujeres – Comerciante",
                "3.8 Gremios – Mujeres – Estudiante",
                "3.8 Gremios – Mujeres – Otro"
        );

        // ===== 3.9: Necesidades (Matriz 5 tipos) =====
        String[] tipos = {"Logística", "Infraestructura", "Personal", "Presupuesto", "Otro"};
        for (String tipo : tipos) {
            Collections.addAll(block.header,
                    "3.9 Necesidad " + tipo + " – Seleccionado (S/N)",
                    "3.9 Necesidad " + tipo + " – ¿Gestiones? (Sí/No)",
                    "3.9 Necesidad " + tipo + " – Suficiente/Insuficiente",
                    "3.9 Necesidad " + tipo + " – Observaciones"
            );
            if (tipo.equals("Otro")) {
                block.header.add("3.9 Necesidad Otro – Especifique");
            }
        }
        block.header.add("3.9 Ninguno (S/N)");

        // ===== 3.10: Capacitaciones =====
        block.header.add("3.10 Recibe capacitaciones el personal (Sí/No)");

        // ===== 3.11: Instituciones capacitadoras =====
        String[] instituciones = {
                "MRE", "RENIEC", "Migraciones", "INTERPOL", "INEI",
                "JNE", "ONPE", "SUNARP", "Poder Judicial", "Otros"
        };
        for (String inst : instituciones) {
            block.header.add("3.11 Institución " + inst + " (S/N)");
        }
        Collections.addAll(block.header,
                "3.11 Institución Otros – Detalle",
                "3.11 Ninguna capacitación (S/N)"
        );

        // ===== FILAS =====
        block.rows = new ArrayList<>();

        if (items != null) {
            for (Ficha1Sec3Entity e : items) {
                List<String> row = new ArrayList<>();

                // META
                row.add(val(e.getIdFicha()));
                row.add(val(tryUser(e)));

                // 3.1 - 3.3
                row.add(val(e.getP31NumAsocion()));
                row.add(flagSN(e.getP31NoCuenta()));
                row.add(val(e.getP32NumActividad()));
                row.add(val(e.getP33NumPersonas()));

                // 3.4: Iniciativas
                row.add(flagSN(e.getP34Cultural()));
                row.add(flagSN(e.getP34Artistica()));
                row.add(flagSN(e.getP34Comerciales()));
                row.add(flagSN(e.getP34Religiosos()));
                row.add(flagSN(e.getP34Otros()));
                row.add(val(e.getP34OtrosDetalles()));

                // 3.5 - 3.6
                row.add(siNo(e.getP35CentroCultural()));
                row.add(siNo(e.getP36Calendario()));

                // 3.7: Ayuda a comunidades
                row.add(flagSN(e.getP37Iniciativas()));
                row.add(flagSN(e.getP37Mecanismo()));
                row.add(flagSN(e.getP37Festividades()));
                row.add(flagSN(e.getP37Programas()));
                row.add(flagSN(e.getP37Otros()));
                row.add(val(e.getP37OtrosDetalle()));

                // 3.8: Gremios
                row.add(val(e.getP38HombreIndustrial()));
                row.add(val(e.getP38HombreComerciante()));
                row.add(val(e.getP38HombreEstudiante()));
                row.add(val(e.getP38HombreOtro()));
                row.add(val(e.getP38HombreOtroDetalle()));
                row.add(val(e.getP38MujerIndustrial()));
                row.add(val(e.getP38MujerComerciante()));
                row.add(val(e.getP38MujerEstudiante()));
                row.add(val(e.getP38MujerOtro()));

                // 3.9: Necesidades (5 tipos)
                // Logística
                row.add(flagSN(e.getP39ALogistica()));
                row.add(siNo(e.getP39AGestiones()));
                row.add(suficiente(e.getP39ASuficiente()));
                row.add(val(e.getP39AEspecifique()));

                // Infraestructura
                row.add(flagSN(e.getP39BInfra()));
                row.add(siNo(e.getP39BGestiones()));
                row.add(suficiente(e.getP39BSuficiente()));
                row.add(val(e.getP39BEspecifique()));

                // Personal
                row.add(flagSN(e.getP39CPersonal()));
                row.add(siNo(e.getP39CGestiones()));
                row.add(suficiente(e.getP39CSuficiente()));
                row.add(val(e.getP39CEspecifique()));

                // Presupuesto
                row.add(flagSN(e.getP39DPresupuesto()));
                row.add(siNo(e.getP39DGestiones()));
                row.add(suficiente(e.getP39DSuficiente()));
                row.add(val(e.getP39DEspecifique()));

                // Otro
                row.add(flagSN(e.getP39EOtro()));
                row.add(siNo(e.getP39EGestiones()));
                row.add(suficiente(e.getP39ESuficiente()));
                row.add(val(e.getP39EEspecifique()));
                row.add(val(e.getP39EOtroDetalle()));

                // Ninguno
                row.add(flagSN(e.getP39Ninguno()));

                // 3.10: Capacitaciones
                row.add(siNo(e.getP310Recibe()));

                // 3.11: Instituciones
                row.add(flagSN(e.getP311Mre()));
                row.add(flagSN(e.getP311Reniec()));
                row.add(flagSN(e.getP311Migraciones()));
                row.add(flagSN(e.getP311Interpol()));
                row.add(flagSN(e.getP311Inei()));
                row.add(flagSN(e.getP311Jne()));
                row.add(flagSN(e.getP311Onpe()));
                row.add(flagSN(e.getP311Sunarp()));
                row.add(flagSN(e.getP311PoderJudicial()));
                row.add(flagSN(e.getP311Otros()));
                row.add(val(e.getP311OtrosDetalle()));
                row.add(flagSN(e.getP311Ninguna()));

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

    private static String flagSN(Object v) {
        if (v == null) return "";
        String x = String.valueOf(v).trim();
        if (x.equalsIgnoreCase("S")) return "S";
        if (x.equalsIgnoreCase("N")) return "N";
        return x.isEmpty() ? "" : x;
    }

    /**
     * Convierte S/N a "Sí"/"No" para mejor legibilidad en Excel
     */
    private static String siNo(Object v) {
        if (v == null) return "";
        String s = String.valueOf(v).trim();
        if (s.equalsIgnoreCase("S")) return "Sí";
        if (s.equalsIgnoreCase("N")) return "No";
        return "";
    }

    /**
     * Convierte S/N a "Suficiente"/"Insuficiente" para la matriz de necesidades
     */
    private static String suficiente(Object v) {
        if (v == null) return "";
        String s = String.valueOf(v).trim();
        if (s.equalsIgnoreCase("S")) return "Suficiente";
        if (s.equalsIgnoreCase("N")) return "Insuficiente";
        return "";
    }

    private static String tryUser(Ficha1Sec3Entity e) {
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