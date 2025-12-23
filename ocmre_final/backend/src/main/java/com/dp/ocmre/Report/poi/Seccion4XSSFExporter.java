package com.dp.ocmre.Report.poi;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.Report.sections.Seccion4ReportBuilder;  // ← IMPORTANTE: Builder, NO Service
import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Component
public class Seccion4XSSFExporter {

    private final Seccion4ReportBuilder builder;  // ← DEBE SER Builder, NO Service

    public Seccion4XSSFExporter(Seccion4ReportBuilder builder) {
        this.builder = builder;
    }

    /** Títulos completos por grupo según estructura de Sección 4 */
    private static final Map<String, String> Q_TITLES = new LinkedHashMap<>() {{
        put("META", "META");
        
        // 4.1-4.2: Convocatoria
        put("4.1-4.2", "4.1-4.2 Convocatoria y Habilitados para votar");
        
        // 4.3-4.4: Consejo
        put("4.3-4.4", "4.3-4.4 Ciudadanos del Consejo y Último año");
        
        // 4.5: Motivos
        put("4.5", "4.5 Motivos por los que no han existido Consejos");
        
        // 4.6-4.7: Institución y Proyectos
        put("4.6-4.7", "4.6-4.7 Nueva institución y Proyectos de Ley");
        
        // 4.8: Necesidades
        put("4.8-LOGISTICA", "4.8 Necesidades – Logística");
        put("4.8-INFRA", "4.8 Necesidades – Infraestructura");
        put("4.8-PERSONAL", "4.8 Necesidades – Personal");
        put("4.8-PRESUPUESTO", "4.8 Necesidades – Presupuesto");
        put("4.8-OTRO", "4.8 Necesidades – Otro");
        put("4.8-NINGUNO", "4.8 Necesidades – Ninguno");
        
        // 4.9: Capacitaciones
        put("4.9", "4.9 Capacitaciones del personal");
        
        // 4.10: Instituciones
        put("4.10", "4.10 Instituciones que brindan capacitaciones");
    }};

    private static final boolean MERGE_META_BAND = true;

    public void export(List<Ficha1Sec4Entity> items, String tituloHoja, OutputStream out) throws IOException {
        ReportSheet model = builder.buildGlobalSheet(items, tituloHoja);
        writeSheet(model, out);
    }

    public void writeSheet(ReportSheet model, OutputStream out) throws IOException {
        try (XSSFWorkbook wb = new XSSFWorkbook()) {
            String sheetName = sanitizeSheetName(
                model.title == null || model.title.isBlank() ? "Sección 4 – Consolidado" : model.title
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
                    int minWidth = 4200;
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
        if (colIndex <= 1) return "META";
        String t = colText != null ? colText.trim() : "";

        // 4.1-4.2
        if (t.startsWith("4.1 ") || t.startsWith("4.2 ")) {
            return "4.1-4.2";
        }

        // 4.3-4.4
        if (t.startsWith("4.3 ") || t.startsWith("4.4 ")) {
            return "4.3-4.4";
        }

        // 4.5
        if (t.startsWith("4.5 Motivo")) {
            return "4.5";
        }

        // 4.6-4.7
        if (t.startsWith("4.6 ") || t.startsWith("4.7 ")) {
            return "4.6-4.7";
        }

        // 4.8
        if (t.contains("Necesidad Logística")) {
            return "4.8-LOGISTICA";
        }
        if (t.contains("Necesidad Infraestructura")) {
            return "4.8-INFRA";
        }
        if (t.contains("Necesidad Personal")) {
            return "4.8-PERSONAL";
        }
        if (t.contains("Necesidad Presupuesto")) {
            return "4.8-PRESUPUESTO";
        }
        if (t.contains("Necesidad Otro")) {
            return "4.8-OTRO";
        }
        if (t.startsWith("4.8 Ninguno")) {
            return "4.8-NINGUNO";
        }

        // 4.9
        if (t.startsWith("4.9 ")) {
            return "4.9";
        }

        // 4.10
        if (t.startsWith("4.10 ")) {
            return "4.10";
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