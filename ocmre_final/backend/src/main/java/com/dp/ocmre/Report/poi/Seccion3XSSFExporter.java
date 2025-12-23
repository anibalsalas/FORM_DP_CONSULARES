package com.dp.ocmre.Report.poi;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.Report.sections.Seccion3ReportBuilder;
import com.dp.ocmre.entity.ficha1.Ficha1Sec3Entity;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Component
public class Seccion3XSSFExporter {

    private final Seccion3ReportBuilder builder;

    public Seccion3XSSFExporter(Seccion3ReportBuilder builder) {
        this.builder = builder;
    }

    /** Títulos completos por grupo según estructura de Sección 3 */
    private static final Map<String, String> Q_TITLES = new LinkedHashMap<>() {{
        put("META", "META");
        
        // 3.1-3.3: Asociaciones y actividades
        put("3.1-3.3", "3.1-3.3 Asociaciones, Actividades y Personas beneficiadas");
        
        // 3.4: Iniciativas
        put("3.4", "3.4 Iniciativas de las comunidades peruanas");
        
        // 3.5-3.6: Centro cultural y calendario
        put("3.5-3.6", "3.5-3.6 Centro cultural y Calendario de actividades");
        
        // 3.7: Ayuda a comunidades
        put("3.7", "3.7 Ayuda de la Oficina Consular a comunidades");
        
        // 3.8: Gremios
        put("3.8", "3.8 Gremios peruanos en el país receptor");
        
        // 3.9: Necesidades
        put("3.9-LOGISTICA", "3.9 Necesidades – Logística");
        put("3.9-INFRA", "3.9 Necesidades – Infraestructura");
        put("3.9-PERSONAL", "3.9 Necesidades – Personal");
        put("3.9-PRESUPUESTO", "3.9 Necesidades – Presupuesto");
        put("3.9-OTRO", "3.9 Necesidades – Otro");
        put("3.9-NINGUNO", "3.9 Necesidades – Ninguno");
        
        // 3.10: Capacitaciones
        put("3.10", "3.10 Capacitaciones del personal");
        
        // 3.11: Instituciones
        put("3.11", "3.11 Instituciones que brindan capacitaciones");
    }};

    /** Si no quieres "META" fusionado sobre ID_FICHA y USUARIO_REGISTRO, pon esto en false. */
    private static final boolean MERGE_META_BAND = true;

    public void export(List<Ficha1Sec3Entity> items, String tituloHoja, OutputStream out) throws IOException {
        ReportSheet model = builder.buildGlobalSheet(items, tituloHoja);
        writeSheet(model, out);
    }

    public void writeSheet(ReportSheet model, OutputStream out) throws IOException {
        try (XSSFWorkbook wb = new XSSFWorkbook()) {
            String sheetName = sanitizeSheetName(
                model.title == null || model.title.isBlank() ? "Sección 3 – Consolidado" : model.title
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
            row0.setHeightInPoints(40f);

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
            sh.createFreezePane(2, 1);

            if (lastCol >= 0) {
                int lastRowIndex = Math.max(1, rows.size() + 1);
                sh.setAutoFilter(new CellRangeAddress(1, lastRowIndex, 0, lastCol));
            }

            for (int c = 0; c <= lastCol; c++) {
                try {
                    sh.autoSizeColumn(c);
                    int minWidth = 4200; // ~28-30 chars
                    if (sh.getColumnWidth(c) < minWidth) {
                        sh.setColumnWidth(c, minWidth);
                    }
                } catch (Exception ignore) {}
            }

            PrintSetup ps = sh.getPrintSetup();
            ps.setLandscape(true);
            sh.setFitToPage(true);

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

        // 3.1-3.3
        if (t.startsWith("3.1 ") || t.startsWith("3.2 ") || t.startsWith("3.3 ")) {
            return "3.1-3.3";
        }

        // 3.4: Iniciativas
        if (t.startsWith("3.4 Iniciativa")) {
            return "3.4";
        }

        // 3.5-3.6
        if (t.startsWith("3.5 ") || t.startsWith("3.6 ")) {
            return "3.5-3.6";
        }

        // 3.7: Ayuda
        if (t.startsWith("3.7 Ayuda")) {
            return "3.7";
        }

        // 3.8: Gremios
        if (t.startsWith("3.8 Gremios")) {
            return "3.8";
        }

        // 3.9: Necesidades
        if (t.contains("Necesidad Logística")) {
            return "3.9-LOGISTICA";
        }
        if (t.contains("Necesidad Infraestructura")) {
            return "3.9-INFRA";
        }
        if (t.contains("Necesidad Personal")) {
            return "3.9-PERSONAL";
        }
        if (t.contains("Necesidad Presupuesto")) {
            return "3.9-PRESUPUESTO";
        }
        if (t.contains("Necesidad Otro")) {
            return "3.9-OTRO";
        }
        if (t.startsWith("3.9 Ninguno")) {
            return "3.9-NINGUNO";
        }

        // 3.10
        if (t.startsWith("3.10 ")) {
            return "3.10";
        }

        // 3.11
        if (t.startsWith("3.11 ")) {
            return "3.11";
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
        st.setDataFormat(df.getFormat("@"));
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