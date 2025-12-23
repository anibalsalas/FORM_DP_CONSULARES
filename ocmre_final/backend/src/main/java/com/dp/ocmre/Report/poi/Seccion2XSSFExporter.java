package com.dp.ocmre.Report.poi;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.Report.sections.Seccion2ReportBuilder;
import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Component
public class Seccion2XSSFExporter {

    private final Seccion2ReportBuilder builder;

    public Seccion2XSSFExporter(Seccion2ReportBuilder builder) {
        this.builder = builder;
    }

    /** Títulos completos por grupo según estructura de Sección 2 */
    private static final Map<String, String> Q_TITLES = new LinkedHashMap<>() {{
        put("META", "META");
        
        // 2.1 PROTECCIÓN LEGAL
        put("2.1.1-5", "2.1 Protección legal – Asesor legal y registro");
        put("2.1.ORIENT", "2.1 Orientaciones brindadas a connacionales (2022-2025)");
        put("2.1.TEMAS", "2.1 Temáticas de asesorías por año (2022-2025)");
        put("2.1.INTERV", "2.1 Intervenciones ante connacionales detenidos (2022-2025)");
        put("2.1.TIPOS", "2.1 Tipos de intervención por año (2022-2025)");
        
        // TRATA DE PERSONAS
        put("2.1.6-TP", "2.1.6-2.1.17 Trata de Personas (TP) – Orientación/Asistencia");
        put("2.1.7-10-TP", "2.1.7-2.1.10 TP – Protocolo y servicios");
        put("2.1.11-TP", "2.1.11 TP – Canales de acceso a servicios");
        put("2.1.12-TP", "2.1.12 TP – Coordinación con ONG");
        put("2.1.13-TP", "2.1.13 TP – Canales de información");
        put("2.1.14-TP", "2.1.14 TP – Coordinación con entidades");
        put("2.1.15-TP", "2.1.15 TP – Necesidades para prestar el servicio");
        put("2.1.16-17-TP", "2.1.16-2.1.17 TP – Capacitaciones");
        
        // VIOLENCIA DE GÉNERO
        put("2.1.18-VG", "2.1.18 Violencia de Género (VG) – Orientación/Asistencia");
        put("2.1.19-22-VG", "2.1.19-2.1.22 VG – Protocolo y servicios");
        put("2.1.23-VG", "2.1.23 VG – Canales de acceso a servicios");
        put("2.1.24-25-VG", "2.1.24-2.1.25 VG – Coordinación con ONG");
        put("2.1.26-VG", "2.1.26 VG – Canales de información");
        put("2.1.27-VG", "2.1.27 VG – Coordinación con entidades");
        put("2.1.28-VG", "2.1.28 VG – Necesidades para prestar el servicio");
        put("2.1.29-30-VG", "2.1.29-2.1.30 VG – Capacitaciones");
        
        // DETENCIONES/DEPORTACIONES/EXPULSIONES
        put("2.1.31-DDE", "2.1.31 Detenciones/Deportaciones/Expulsiones (DDE) – Casos atendidos");
        put("2.1.32-34-DDE", "2.1.32-2.1.34 DDE – Protocolo y servicios");
        put("2.1.35-DDE", "2.1.35 DDE – Canales de acceso a servicios");
        put("2.1.36-DDE", "2.1.36 DDE – Coordinación emergencia médica");
        put("2.1.37-DDE", "2.1.37 DDE – Canales de información");
        put("2.1.38-DDE", "2.1.38 DDE – Coordinación con entidades");
        put("2.1.39-DDE", "2.1.39 DDE – Necesidades para prestar el servicio");
        put("2.1.40-41-DDE", "2.1.40-2.1.41 DDE – Capacitaciones");
        
        // 2.2 ASISTENCIA HUMANITARIA
        put("2.2.1-2", "2.2 Asistencia Humanitaria – Registro y presupuesto");
        put("2.2.3", "2.2.3 Eventos atendidos (fallecidos, traslados, cremaciones)");
        put("2.2.4", "2.2.4 Ayuda alimentaria y artículos de primera necesidad");
        put("2.2.5", "2.2.5 Alojamiento temporal");
        put("2.2.6", "2.2.6 Apoyo económico para pasajes de retorno");
        put("2.2.7", "2.2.7 Personas atendidas por situación de vulnerabilidad");
        put("2.2.8", "2.2.8 Casos remitidos a otras instituciones");
        put("2.2.9", "2.2.9 Personas beneficiadas en programas de retorno voluntario");
        put("2.2.10", "2.2.10 Necesidades para prestar el servicio");
        put("2.2.11-12", "2.2.11-2.2.12 Capacitaciones");
    }};

    /** Si no quieres "META" fusionado sobre ID_FICHA y USUARIO_REGISTRO, pon esto en false. */
    private static final boolean MERGE_META_BAND = true;

    public void export(List<Ficha1Sec2Entity> items, String tituloHoja, OutputStream out) throws IOException {
        ReportSheet model = builder.buildGlobalSheet(items, tituloHoja);
        writeSheet(model, out);
    }

    public void writeSheet(ReportSheet model, OutputStream out) throws IOException {
        try (XSSFWorkbook wb = new XSSFWorkbook()) {
            String sheetName = sanitizeSheetName(
                model.title == null || model.title.isBlank() ? "Sección 2 – Consolidado" : model.title
            );

            XSSFSheet sh = wb.createSheet(sheetName);

            // ===== Estilos =====
            CellStyle stGroup = styleGroupHeader(wb);
            CellStyle stSub   = styleSubHeader(wb);
            CellStyle stData  = styleData(wb);

            if (model.blocks == null || model.blocks.isEmpty()) {
                XSSFRow r0 = sh.createRow(0);
                XSSFCell c0 = r0.createCell(0, CellType.STRING);
                c0.setCellValue("Sin datos");
                c0.setCellStyle(stGroup);
                r0.setHeightInPoints(36f);
                wb.write(out);
                return;
            }

            ReportBlock block = model.blocks.get(0);
            List<String> header = block.header != null ? block.header : Collections.emptyList();
            List<List<String>> rows = block.rows != null ? block.rows : Collections.emptyList();
            int lastCol = Math.max(0, header.size() - 1);

            // ===== Fila 0: cabecera de "preguntas" (merged) =====
            XSSFRow row0 = sh.createRow(0);
            ensureCells(row0, lastCol);
            row0.setHeightInPoints(40f); // Altura mayor para sección 2 (más texto)

            // ===== Fila 1: subheaders =====
            XSSFRow row1 = sh.createRow(1);
            row1.setHeightInPoints(32f);

            // spans por prefijo
            List<GroupSpan> spans = computeSpans(header);

            // pintar fila 0 (merge + estilo)
            for (GroupSpan gs : spans) {
                String title = Q_TITLES.getOrDefault(gs.code, gs.code);

                // Si no quieres fusionar "META", pinto vacío y no hago merge
                if ("META".equals(gs.code) && !MERGE_META_BAND) {
                    for (int c = gs.startCol; c <= gs.endCol; c++) {
                        setCell(row0, c, "", stGroup);
                    }
                    continue;
                }

                setCell(row0, gs.startCol, title, stGroup);
                for (int c = gs.startCol; c <= gs.endCol; c++) {
                    row0.getCell(c).setCellStyle(stGroup);
                }
                if (gs.endCol > gs.startCol) {
                    sh.addMergedRegion(new CellRangeAddress(0, 0, gs.startCol, gs.endCol));
                }
            }

            // pintar fila 1 (subheaders explícitos)
            for (int c = 0; c < header.size(); c++) {
                setCell(row1, c, header.get(c), stSub);
            }

            // ===== Datos (desde fila 2) =====
            int r = 2;
            for (List<String> dataRow : rows) {
                XSSFRow rr = sh.createRow(r++);
                for (int c = 0; c < header.size(); c++) {
                    String v = c < dataRow.size() ? safe(dataRow.get(c)) : "";
                    setCell(rr, c, v, stData);
                }
            }

            // ===== Freeze, AutoFilter, AutoSize =====
            // Congela 2 columnas y SOLO 1 fila (la de subheaders)
            sh.createFreezePane(2, 1);

            if (lastCol >= 0) {
                int lastRowIndex = Math.max(1, rows.size() + 1);
                sh.setAutoFilter(new CellRangeAddress(1, lastRowIndex, 0, lastCol));
            }

            // Autoajuste con ancho mínimo
            for (int c = 0; c <= lastCol; c++) {
                try {
                    sh.autoSizeColumn(c);
                    int minWidth = 4200; // ~28-30 chars
                    if (sh.getColumnWidth(c) < minWidth) {
                        sh.setColumnWidth(c, minWidth);
                    }
                } catch (Exception ignore) {}
            }

            // Modo impresión amigable (apaisado + ajustar a 1 página de ancho)
            PrintSetup ps = sh.getPrintSetup();
            ps.setLandscape(true);
            sh.setFitToPage(true);
            sh.getCTWorksheet().getPageSetup();

            wb.write(out);
        }
    }

    /* =================== spans por grupo =================== */

    private List<GroupSpan> computeSpans(List<String> header) {
        List<GroupSpan> spans = new ArrayList<>();
        if (header == null || header.isEmpty()) return spans;

        int n = header.size();
        String current = codeOf(header.get(0), 0);
        int start = 0;

        for (int c = 1; c < n; c++) {
            String code = codeOf(header.get(c), c);
            if (!Objects.equals(code, current)) {
                spans.add(new GroupSpan(current, start, c - 1));
                current = code;
                start = c;
            }
        }
        spans.add(new GroupSpan(current, start, n - 1));
        return spans;
    }

    private String codeOf(String colText, int colIndex) {
        if (colIndex <= 1) return "META"; // ID_FICHA y USUARIO_REGISTRO
        String t = colText != null ? colText.trim() : "";

        // 2.1.1-5: Asesor legal
        if (t.startsWith("2.1.1") || t.startsWith("2.1.2") || t.startsWith("2.1.3") || 
            t.startsWith("2.1.4") || t.startsWith("2.1.5")) {
            return "2.1.1-5";
        }

        // Orientaciones
        if (t.contains("Orientaciones 20")) {
            return "2.1.ORIENT";
        }

        // Temáticas
        if (t.contains("Temática 20")) {
            return "2.1.TEMAS";
        }

        // Intervenciones mayores/menores
        if ((t.contains("Mayores detenidos") || t.contains("Menores retenidos")) && 
            !t.startsWith("2.1.6") && !t.startsWith("2.1.18") && !t.startsWith("2.1.31")) {
            return "2.1.INTERV";
        }

        // Tipos de intervención
        if (t.contains("Tipo intervención 20")) {
            return "2.1.TIPOS";
        }

        // TRATA DE PERSONAS
        if (t.startsWith("2.1.6 TP")) {
            return "2.1.6-TP";
        }
        if (t.startsWith("2.1.7 TP") || t.startsWith("2.1.8 TP") || 
            t.startsWith("2.1.9 TP") || t.startsWith("2.1.10 TP")) {
            return "2.1.7-10-TP";
        }
        if (t.startsWith("2.1.11 TP")) {
            return "2.1.11-TP";
        }
        if (t.startsWith("2.1.12 TP")) {
            return "2.1.12-TP";
        }
        if (t.startsWith("2.1.13 TP")) {
            return "2.1.13-TP";
        }
        if (t.startsWith("2.1.14 TP")) {
            return "2.1.14-TP";
        }
        if (t.startsWith("2.1.15 TP")) {
            return "2.1.15-TP";
        }
        if (t.startsWith("2.1.16 TP") || t.startsWith("2.1.17 TP")) {
            return "2.1.16-17-TP";
        }

        // VIOLENCIA DE GÉNERO
        if (t.startsWith("2.1.18 VG")) {
            return "2.1.18-VG";
        }
        if (t.startsWith("2.1.19 VG") || t.startsWith("2.1.20 VG") || 
            t.startsWith("2.1.21 VG") || t.startsWith("2.1.22 VG")) {
            return "2.1.19-22-VG";
        }
        if (t.startsWith("2.1.23 VG")) {
            return "2.1.23-VG";
        }
        if (t.startsWith("2.1.24 VG") || t.startsWith("2.1.25 VG")) {
            return "2.1.24-25-VG";
        }
        if (t.startsWith("2.1.26 VG")) {
            return "2.1.26-VG";
        }
        if (t.startsWith("2.1.27 VG")) {
            return "2.1.27-VG";
        }
        if (t.startsWith("2.1.28 VG")) {
            return "2.1.28-VG";
        }
        if (t.startsWith("2.1.29 VG") || t.startsWith("2.1.30 VG")) {
            return "2.1.29-30-VG";
        }

        // DETENCIONES/DEPORTACIONES/EXPULSIONES
        if (t.startsWith("2.1.31 DDE")) {
            return "2.1.31-DDE";
        }
        if (t.startsWith("2.1.32 DDE") || t.startsWith("2.1.33 DDE") || 
            t.startsWith("2.1.34 DDE")) {
            return "2.1.32-34-DDE";
        }
        if (t.startsWith("2.1.35 DDE")) {
            return "2.1.35-DDE";
        }
        if (t.startsWith("2.1.36 DDE")) {
            return "2.1.36-DDE";
        }
        if (t.startsWith("2.1.37 DDE")) {
            return "2.1.37-DDE";
        }
        if (t.startsWith("2.1.38 DDE")) {
            return "2.1.38-DDE";
        }
        if (t.startsWith("2.1.39 DDE")) {
            return "2.1.39-DDE";
        }
        if (t.startsWith("2.1.40 DDE") || t.startsWith("2.1.41 DDE")) {
            return "2.1.40-41-DDE";
        }

        // ASISTENCIA HUMANITARIA
        if (t.startsWith("2.2.1") || t.startsWith("2.2.2")) {
            return "2.2.1-2";
        }
        if (t.startsWith("2.2.3")) {
            return "2.2.3";
        }
        if (t.startsWith("2.2.4")) {
            return "2.2.4";
        }
        if (t.startsWith("2.2.5")) {
            return "2.2.5";
        }
        if (t.startsWith("2.2.6")) {
            return "2.2.6";
        }
        if (t.startsWith("2.2.7")) {
            return "2.2.7";
        }
        if (t.startsWith("2.2.8")) {
            return "2.2.8";
        }
        if (t.startsWith("2.2.9")) {
            return "2.2.9";
        }
        if (t.startsWith("2.2.10")) {
            return "2.2.10";
        }
        if (t.startsWith("2.2.11") || t.startsWith("2.2.12")) {
            return "2.2.11-12";
        }

        return "META";
    }

    /* =================== estilos =================== */

    private CellStyle styleGroupHeader(Workbook wb) {
        Font f = wb.createFont();
        f.setBold(true);
        f.setFontHeightInPoints((short) 11);

        CellStyle st = wb.createCellStyle();
        st.setWrapText(true);
        st.setAlignment(HorizontalAlignment.CENTER);
        st.setVerticalAlignment(VerticalAlignment.CENTER);
        st.setBorderTop(BorderStyle.THIN);
        st.setBorderBottom(BorderStyle.THIN);
        st.setBorderLeft(BorderStyle.THIN);
        st.setBorderRight(BorderStyle.THIN);
        st.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        st.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        st.setFont(f);
        return st;
    }

    private CellStyle styleSubHeader(Workbook wb) {
        Font f = wb.createFont();
        f.setBold(true);
        f.setFontHeightInPoints((short) 10);

        CellStyle st = wb.createCellStyle();
        st.setWrapText(true);
        st.setAlignment(HorizontalAlignment.CENTER);
        st.setVerticalAlignment(VerticalAlignment.CENTER);
        st.setBorderTop(BorderStyle.THIN);
        st.setBorderBottom(BorderStyle.THIN);
        st.setBorderLeft(BorderStyle.THIN);
        st.setBorderRight(BorderStyle.THIN);
        st.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        st.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        st.setFont(f);
        return st;
    }

    private CellStyle styleData(Workbook wb) {
        Font f = wb.createFont();
        f.setFontHeightInPoints((short) 10);

        CellStyle st = wb.createCellStyle();
        st.setWrapText(true);
        st.setAlignment(HorizontalAlignment.LEFT);
        st.setVerticalAlignment(VerticalAlignment.TOP);
        st.setBorderTop(BorderStyle.THIN);
        st.setBorderBottom(BorderStyle.THIN);
        st.setBorderLeft(BorderStyle.THIN);
        st.setBorderRight(BorderStyle.THIN);
        st.setFont(f);
        DataFormat df = wb.createDataFormat();
        st.setDataFormat(df.getFormat("@")); // Fuerza texto
        return st;
    }

    /* =================== utilidades =================== */

    private void setCell(XSSFRow row, int col, String value, CellStyle style) {
        XSSFCell cell = row.getCell(col);
        if (cell == null) cell = row.createCell(col, CellType.STRING);
        cell.setCellValue(safe(value));
        if (style != null) cell.setCellStyle(style);
    }

    private void ensureCells(XSSFRow row, int lastCol) {
        for (int c = 0; c <= lastCol; c++) {
            if (row.getCell(c) == null) row.createCell(c, CellType.STRING);
        }
    }

    private String sanitizeSheetName(String name) {
        String n = name.replaceAll("[\\\\/\\?\\*\\[\\]]", " ");
        return n.length() > 31 ? n.substring(0, 31) : n;
    }

    private String safe(String s) { return s == null ? "" : s; }

    private static final class GroupSpan {
        final String code;
        final int startCol;
        final int endCol;
        GroupSpan(String code, int startCol, int endCol) {
            this.code = code;
            this.startCol = startCol;
            this.endCol = endCol;
        }
    }
}