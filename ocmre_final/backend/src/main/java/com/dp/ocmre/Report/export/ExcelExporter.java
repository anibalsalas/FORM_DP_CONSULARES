package com.dp.ocmre.Report.export;


import java.io.ByteArrayOutputStream;
import java.util.List;

import com.dp.ocmre.Report.dto.*;
import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportKV;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

@Component
public class ExcelExporter {

    public byte[] export(ReportSheet sheet) {
        try (Workbook wb = new XSSFWorkbook(); ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            Sheet sh = wb.createSheet("Sección 1");

            // Estilos
            CellStyle h1 = wb.createCellStyle();
            Font f1 = wb.createFont(); f1.setBold(true); f1.setFontHeightInPoints((short)12);
            h1.setFont(f1);

            CellStyle th = wb.createCellStyle();
            Font fth = wb.createFont(); fth.setBold(true);
            th.setFont(fth);
            th.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
            th.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            th.setBorderBottom(BorderStyle.THIN);
            th.setBorderTop(BorderStyle.THIN);
            th.setBorderLeft(BorderStyle.THIN);
            th.setBorderRight(BorderStyle.THIN);

            CellStyle td = wb.createCellStyle();
            td.setBorderBottom(BorderStyle.THIN);
            td.setBorderTop(BorderStyle.THIN);
            td.setBorderLeft(BorderStyle.THIN);
            td.setBorderRight(BorderStyle.THIN);

            int r = 0;

            // Título general
            Row title = sh.createRow(r++);
            Cell ctitle = title.createCell(0);
            ctitle.setCellValue(sheet.title);
            ctitle.setCellStyle(h1);

            for (ReportBlock b : sheet.blocks) {
                r++; // espacio
                Row bh = sh.createRow(r++);
                Cell cbh = bh.createCell(0);
                cbh.setCellValue(b.blockTitle);
                cbh.setCellStyle(h1);

                if (!b.header.isEmpty()) {
                    Row rh = sh.createRow(r++);
                    for (int i=0;i<b.header.size();i++){
                        Cell ch = rh.createCell(i);
                        ch.setCellValue(b.header.get(i));
                        ch.setCellStyle(th);
                    }
                    for (List<String> row : b.rows) {
                        Row rr = sh.createRow(r++);
                        for (int i=0;i<row.size();i++){
                            Cell cd = rr.createCell(i);
                            cd.setCellValue(row.get(i) == null ? "" : row.get(i));
                            cd.setCellStyle(td);
                        }
                    }
                } else if (!b.kv.isEmpty()) {
                    // par clave-valor: 2 columnas
                    Row rh = sh.createRow(r++);
                    Cell ck = rh.createCell(0); ck.setCellValue("Detalle"); ck.setCellStyle(th);
                    Cell cv = rh.createCell(1); cv.setCellValue("Valor");   cv.setCellStyle(th);
                    for (ReportKV p : b.kv) {
                        Row rr = sh.createRow(r++);
                        Cell c0 = rr.createCell(0); c0.setCellValue(p.key);   c0.setCellStyle(td);
                        Cell c1 = rr.createCell(1); c1.setCellValue(p.value); c1.setCellStyle(td);
                    }
                }
            }

            // Auto-size
            for (int i=0;i<10;i++) sh.autoSizeColumn(i);

            wb.write(bos);
            return bos.toByteArray();
        } catch (Exception ex) {
            throw new RuntimeException("Error generando XLSX Sección 1", ex);
        }
    }
}
