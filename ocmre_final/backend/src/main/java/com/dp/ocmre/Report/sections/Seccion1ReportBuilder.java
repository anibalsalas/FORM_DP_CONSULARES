package com.dp.ocmre.Report.sections;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Construye la DATA PLANA que luego tu Exporter POI usará
 * para dibujar el Excel.
 *
 * - Una sola hoja horizontal
 * - Una fila por ficha
 * - Cabecera única
 * - Orden de columnas = orden visual del formulario:
 *   ID_FICHA, USUARIO,
 *   1.1.1 población,
 *   1.1.2 fecha última actualización,
 *   1.1.3 porcentaje no inscrito,
 *   1.1.4 certificados,
 *   1.1.5 necesidades,
 *   1.1.6 capacitación,
 *   1.1.7 instituciones.
 */
@Component
public class Seccion1ReportBuilder {
    /** dd/MM/yyyy porque así se muestra en tu matDatepicker */
    private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public ReportSheet buildGlobalSheet(List<Ficha1Sec1Entity> items, String tituloHoja) {

        // ============================================================
        // Sheet contenedor
        // ============================================================
        ReportSheet sheet = new ReportSheet();
        sheet.title = (tituloHoja == null || tituloHoja.isBlank())
                ? "Sección 1 – Consolidado"
                : tituloHoja;

        // ============================================================
        // Bloque único
        // ============================================================
        ReportBlock block = new ReportBlock();
        block.blockTitle = "Sección 1 (1.1.1 → 1.1.7)";

        block.header = new ArrayList<>();

        // ────────────────────────────────────────────────────────────
        // META
        // ────────────────────────────────────────────────────────────
        Collections.addAll(
                block.header,
                "ID_FICHA",
                "USUARIO_REGISTRO"
        );

        // ────────────────────────────────────────────────────────────
        // 1.1.1 Población peruana registrada
        // Estructura EXACTA según tu tabla HTML:
        //
        //   Nº Hombres
        //     0–12 | 13–17 | 18–64 | 65+ | Desconoce
        //   Cuántos de ellos con discapacidad
        //   Nº Mujeres
        //   Cuántas de ellas con discapacidad
        //   TOTAL
        //
        // y cada uno repite las mismas subcolumnas.
        // También incluimos los totales del final (p111Total...).
        // ────────────────────────────────────────────────────────────
        addGrupoPoblacion(block.header,
                "1.1.1 Nº HOMBRES",
                "0–12","13–17","18–64","65+","Desconoce info"
        );
        addGrupoPoblacion(block.header,
                "1.1.1 HOMBRES c/discapacidad",
                "0–12","13–17","18–64","65+","Desconoce info"
        );
        addGrupoPoblacion(block.header,
                "1.1.1 Nº MUJERES",
                "0–12","13–17","18–64","65+","Desconoce info"
        );
        addGrupoPoblacion(block.header,
                "1.1.1 MUJERES c/discapacidad",
                "0–12","13–17","18–64","65+","Desconoce info"
        );
        addGrupoPoblacion(block.header,
                "1.1.1 TOTAL",
                "0–12","13–17","18–64","65+","Desconoce info (total)"
        );

        // ────────────────────────────────────────────────────────────
        // 1.1.2 Fecha última actualización
        // ────────────────────────────────────────────────────────────
        block.header.add("1.1.2 Fecha última actualización (dd/mm/aaaa)");

        // ────────────────────────────────────────────────────────────
        // 1.1.3 % no inscrito
        // ────────────────────────────────────────────────────────────
        block.header.add("1.1.3 % estimado NO inscrito (0-100)");

        // ────────────────────────────────────────────────────────────
        // 1.1.4 Certificados
        // ────────────────────────────────────────────────────────────
        Collections.addAll(
                block.header,
                "1.1.4 Certificados 2022",
                "1.1.4 Certificados 2023",
                "1.1.4 Certificados 2024",
                "1.1.4 Certificados 2025* (1er semestre)"
        );

        // ────────────────────────────────────────────────────────────
        // 1.1.5 Necesidades
        // HTML: columnas = Seleccionar / ¿Gestiones? / Suficiente o insuficiente /
        //       Especifique (solo 'Otro') / Comentarios u Observaciones
        //
        // Vamos a dejar explícito por cada tipo:
        //
        //  Logística
        //  Infraestructura
        //  Personal
        //  Presupuesto
        //  Otro (especifique)
        //  Ninguno
        // ────────────────────────────────────────────────────────────
        addColsNecesidades(block.header,"1.1.5 Logística",
                "Seleccionado (S/N)",
                "¿Gestiones? (S/N)",
                "Suficiente o insuficiente (S/N)",
                "Comentarios/Observaciones");
        addColsNecesidades(block.header,"1.1.5 Infraestructura",
                "Seleccionado (S/N)",
                "¿Gestiones? (S/N)",
                "Suficiente o insuficiente (S/N)",
                "Comentarios/Observaciones");
        addColsNecesidades(block.header,"1.1.5 Personal",
                "Seleccionado (S/N)",
                "¿Gestiones? (S/N)",
                "Suficiente o insuficiente (S/N)",
                "Comentarios/Observaciones");
        addColsNecesidades(block.header,"1.1.5 Presupuesto",
                "Seleccionado (S/N)",
                "¿Gestiones? (S/N)",
                "Suficiente o insuficiente (S/N)",
                "Comentarios/Observaciones");

        // "Otro" tiene además campo "Especifique"
        addColsNecesidadesOtro(block.header,"1.1.5 Otro",
                "Seleccionado (S/N)",
                "¿Gestiones? (S/N)",
                "Suficiente o insuficiente (S/N)",
                "Especifique",
                "Comentarios/Observaciones");

        // "Ninguno" es solo la marca
        block.header.add("1.1.5 Ninguno – Seleccionado (S/N)");

        // ────────────────────────────────────────────────────────────
        // 1.1.6 Capacitaciones
        // ────────────────────────────────────────────────────────────
        block.header.add("1.1.6 ¿El personal recibe capacitaciones? (S/N)");

        // ────────────────────────────────────────────────────────────
        // 1.1.7 Instituciones que capacitan
        // HTML: checkboxes A..K + detalle 'Otro'
        // ────────────────────────────────────────────────────────────
        Collections.addAll(
                block.header,
                "1.1.7 a) MRE",
                "1.1.7 b) RENIEC",
                "1.1.7 c) MIGRACIONES",
                "1.1.7 d) INTERPOL",
                "1.1.7 e) INEI",
                "1.1.7 f) JNE",
                "1.1.7 g) ONPE",
                "1.1.7 h) SUNARP",
                "1.1.7 i) PODER JUDICIAL",
                "1.1.7 j) OTRO (marcado S/N)",
                "1.1.7 j) OTRO – Especificar"
                
        );

        // ============================================================
        // FILAS
        // ============================================================
        block.rows = new ArrayList<>();

        if (items != null) {
            for (Ficha1Sec1Entity e : items) {

                List<String> row = new ArrayList<>();

                // META
                row.add(val(e.getIdFicha()));          // ID_FICHA
                row.add(val(tryUser(e)));              // USUARIO_REGISTRO (usuRegistro o usuActualiza)

                // ---------- 1.1.1 Nº HOMBRES ----------
                row.add(val(e.getP111Hombres012()));
                row.add(val(e.getP111Hombres1317()));
                row.add(val(e.getP111Hombres1864()));
                row.add(val(e.getP111Hombres65Mas()));
                row.add(flagSN(e.getP111HombresDesconoce())); // 'S','N',''...

                // ---------- 1.1.1 HOMBRES c/discapacidad ----------
                row.add(val(e.getP111HombDiscap012()));
                row.add(val(e.getP111HombDiscap1317()));
                row.add(val(e.getP111HombDiscap1864()));
                row.add(val(e.getP111HombDiscap65Mas()));
                row.add(flagSN(e.getP111HombDiscapDesconoce()));

                // ---------- 1.1.1 Nº MUJERES ----------
                row.add(val(e.getP111Mujeres012()));
                row.add(val(e.getP111Mujeres1317()));
                row.add(val(e.getP111Mujeres1864()));
                row.add(val(e.getP111Mujeres65Mas()));
                row.add(flagSN(e.getP111MujeresDesconoce()));

                // ---------- 1.1.1 MUJERES c/discapacidad ----------
                row.add(val(e.getP111MujDiscap012()));
                row.add(val(e.getP111MujDiscap1317()));
                row.add(val(e.getP111MujDiscap1864()));
                row.add(val(e.getP111MujDiscap65Mas()));
                row.add(flagSN(e.getP111MujDiscapDesconoce()));

                // ---------- 1.1.1 TOTAL ----------
                row.add(val(e.getP111Total012()));
                row.add(val(e.getP111Total1317()));
                row.add(val(e.getP111Total1864()));
                row.add(val(e.getP111Total65Mas()));
                row.add(val(e.getP111TotalDesconoce()));

                // ---------- 1.1.2 Fecha última actualización ----------
                row.add(fmtDate(e.getP112FechaAct()));

                // ---------- 1.1.3 % no inscrito ----------
                row.add(val(e.getP113PorcNoInsc()));

                // ---------- 1.1.4 Certificados ----------
                row.add(val(e.getP114Cert2022()));
                row.add(val(e.getP114Cert2023()));
                row.add(val(e.getP114Cert2024()));
                row.add(val(e.getP114Cert2025()));

                // ---------- 1.1.5 Logística ----------
                row.add(flagSN(e.getP115NecLogistica()));    // Seleccionado
                row.add(flagSN(e.getP115LogGestion()));      // ¿Gestiones? 'S'/'N'
                row.add(flagSN(e.getP115LogSuficiente()));   // Suficiente/Insuficiente 'S'/'N'
                row.add(val(e.getP115LogObservaciones()));   // Comentarios

                // ---------- 1.1.5 Infraestructura ----------
                row.add(flagSN(e.getP115NecInfraestructura()));
                row.add(flagSN(e.getP115InfGestion()));
                row.add(flagSN(e.getP115InfSuficiente()));
                row.add(val(e.getP115InfObservaciones()));

                // ---------- 1.1.5 Personal ----------
                row.add(flagSN(e.getP115NecPersonal()));
                row.add(flagSN(e.getP115PerGestion()));
                row.add(flagSN(e.getP115PerSuficiente()));
                row.add(val(e.getP115PerObservaciones()));

                // ---------- 1.1.5 Presupuesto ----------
                row.add(flagSN(e.getP115NecPresupuesto()));
                row.add(flagSN(e.getP115PreGestion()));
                row.add(flagSN(e.getP115PreSuficiente()));
                row.add(val(e.getP115PreObservaciones()));

                // ---------- 1.1.5 Otro ----------
                row.add(flagSN(e.getP115NecOtro()));          // Seleccionado
                row.add(flagSN(e.getP115OtrGestion()));       // ¿Gestiones?
                row.add(flagSN(e.getP115OtrSuficiente()));    // Suficiente/Insuficiente
                row.add(val(e.getP115OtrEspecifique()));      // Especifique
                row.add(val(e.getP115OtrObservaciones()));    // Comentarios

                // ---------- 1.1.5 Ninguno ----------
                row.add(flagSN(e.getP115NecNinguno()));       // Seleccionado

                // ---------- 1.1.6 Capacitaciones ----------
                row.add(flagSN(e.getP116RecibeCapac()));

                // ---------- 1.1.7 Instituciones ----------
                // En tu TS: p117A..p117K son checkboxes boolean.
                // En tu Entity asumimos getters: getP117a(), getP117b(), ...
                row.add(flagSN(e.getP117a()));      // a) MRE
                row.add(flagSN(e.getP117b()));      // b) RENIEC
                row.add(flagSN(e.getP117c()));      // c) MIGRACIONES
                row.add(flagSN(e.getP117d()));      // d) INTERPOL
                row.add(flagSN(e.getP117e()));      // e) INEI
                row.add(flagSN(e.getP117f()));      // f) JNE
                row.add(flagSN(e.getP117g()));      // g) ONPE
                row.add(flagSN(e.getP117h()));      // h) SUNARP
                row.add(flagSN(e.getP117i()));      // i) PODER JUDICIAL
                row.add(flagSN(e.getP117j()));      // j) OTRO (marcado)
                row.add(val(e.getP117jotro()));     // Detalle OTRO
                row.add(flagSN(e.getP117k()));      // k) Ninguna

                block.rows.add(row);
            }
        }

        sheet.blocks = new ArrayList<>();
        sheet.blocks.add(block);
        return sheet;
    }

    // ============================================================
    // HELPERS CABECERA
    // ============================================================

    /** Agrega columnas de un bloque de población 1.1.1 */
    private static void addGrupoPoblacion(List<String> header,
                                          String tituloGrupo,
                                          String... subcols) {
        for (String sc : subcols) {
            header.add(tituloGrupo + " – " + sc);
        }
    }

    /** 1.1.5 para Logística / Infraestructura / Personal / Presupuesto */
    private static void addColsNecesidades(List<String> header,
                                           String tipo,
                                           String seleccionadoLabel,
                                           String gestionesLabel,
                                           String suficienteLabel,
                                           String obsLabel) {
        header.add(tipo + " – " + seleccionadoLabel);
        header.add(tipo + " – " + gestionesLabel);
        header.add(tipo + " – " + suficienteLabel);
        header.add(tipo + " – " + obsLabel);
    }

    /** 1.1.5 para "Otro" (tiene 'Especifique') */
    private static void addColsNecesidadesOtro(List<String> header,
                                               String tipo,
                                               String seleccionadoLabel,
                                               String gestionesLabel,
                                               String suficienteLabel,
                                               String especifiqueLabel,
                                               String obsLabel) {
        header.add(tipo + " – " + seleccionadoLabel);
        header.add(tipo + " – " + gestionesLabel);
        header.add(tipo + " – " + suficienteLabel);
        header.add(tipo + " – " + especifiqueLabel);
        header.add(tipo + " – " + obsLabel);
    }

    // ============================================================
    // HELPERS VALORES / FORMATEO
    // ============================================================

    /** Convierte cualquier cosa a texto seguro: null -> "" */
    private static String val(Object o) {
        return (o == null) ? "" : String.valueOf(o).trim();
    }

    /**
     * Normaliza banderas tipo 'S','N','', boolean, etc.
     * - Si ya viene 'S'/'N' la dejamos igual.
     * - true -> "S"
     * - false -> ""
     * - null -> ""
     */
    private static String flagSN(Object v) {
        if (v == null) return "";
        if (v instanceof Boolean b) return b ? "S" : "";
        String x = String.valueOf(v).trim();
        if (x.equalsIgnoreCase("S")) return "S";
        if (x.equalsIgnoreCase("N")) return "N"; // en 1.1.5 gestión/suficiente puede venir 'N'
        if (x.equalsIgnoreCase("true"))  return "S";
        if (x.equalsIgnoreCase("false")) return "";
        return x;
    }

    /**
     * Formatea fecha a dd/MM/yyyy:
     * - acepta LocalDate o java.util.Date
     * - si falla => string plano
     * - null => ""
     */
    private static String fmtDate(Object d) {
        if (d == null) return "";
        if (d instanceof LocalDate ld) {
            return DF.format(ld);
        }
        if (d instanceof Date ud) {
            LocalDate ld = ud.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            return DF.format(ld);
        }

        // último intento: parsear string ISO yyyy-MM-dd
        try {
            LocalDate parsed = LocalDate.parse(String.valueOf(d));
            return DF.format(parsed);
        } catch (Exception ignore) {
        }
        // fallback bruto:
        return String.valueOf(d);
    }

    /**
     * Tu entidad tiene usuRegistro / usuActualiza.
     * Intentamos devolver primero usuRegistro, si no usuActualiza.
     */
    private static String tryUser(Ficha1Sec1Entity e) {
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
