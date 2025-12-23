package com.dp.ocmre.controller;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.dp.ocmre.Report.poi.Seccion1XSSFExporter;
import com.dp.ocmre.Report.poi.Seccion2XSSFExporter;
import com.dp.ocmre.Report.poi.Seccion3XSSFExporter;
import com.dp.ocmre.Report.poi.Seccion4XSSFExporter;
import com.dp.ocmre.Report.sections.Seccion1ReportBuilder;
import com.dp.ocmre.Report.sections.Seccion2ReportBuilder;
import com.dp.ocmre.Report.sections.Seccion3ReportBuilder;
import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec3Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;
import com.dp.ocmre.service.report.Seccion1ReportService;
import com.dp.ocmre.service.report.Seccion2ReportService;
import com.dp.ocmre.service.report.Seccion3ReportService;
import com.dp.ocmre.service.report.Seccion4ReportService;

@RestController
@RequestMapping("/api/reportes")
public class ReportesController {

    private static final Logger log = LoggerFactory.getLogger(ReportesController.class);

    // ===== SECCIÓN 1 =====
    private final Seccion1ReportBuilder seccion1ReportBuilder;
    private final Seccion1XSSFExporter excelExporter; 
    private final Seccion1ReportService s1;

    // ===== SECCIÓN 2 =====
    private final Seccion2ReportBuilder seccion2ReportBuilder;
    private final Seccion2XSSFExporter excelExporter2; 
    private final Seccion2ReportService s2;

    // ===== SECCIÓN 3 =====
    private final Seccion3ReportBuilder seccion3ReportBuilder;
    private final Seccion3XSSFExporter excelExporter3; 
    private final Seccion3ReportService s3;

    // ===== SECCIÓN 4 =====
    private final Seccion4XSSFExporter excelExporter4; 
    private final Seccion4ReportService s4;

    public ReportesController(
        Seccion1ReportService s1,
        Seccion1ReportBuilder seccion1ReportBuilder,
        Seccion1XSSFExporter excelExporter,
        
        Seccion2ReportService s2,
        Seccion2ReportBuilder seccion2ReportBuilder,
        Seccion2XSSFExporter excelExporter2,

        Seccion3ReportService s3,
        Seccion3ReportBuilder seccion3ReportBuilder,
        Seccion3XSSFExporter excelExporter3,

        Seccion4ReportService s4,
        Seccion4XSSFExporter excelExporter4
    ) {
        this.s1 = s1;
        this.seccion1ReportBuilder = seccion1ReportBuilder;
        this.excelExporter = excelExporter;

        this.s2 = s2;
        this.seccion2ReportBuilder = seccion2ReportBuilder;
        this.excelExporter2 = excelExporter2;

        this.s3 = s3;
        this.seccion3ReportBuilder = seccion3ReportBuilder;
        this.excelExporter3 = excelExporter3;

        this.s4 = s4;
        this.excelExporter4 = excelExporter4;
    }

    @GetMapping("/seccion/1.xlsx")
    public ResponseEntity<byte[]> descargarS1Global() {
        byte[] xlsx = s1.generarExcelGlobal();
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.parseMediaType(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        h.setContentDisposition(ContentDisposition.attachment()
            .filename("Seccion1_Reporte_Global.xlsx").build());
        return new ResponseEntity<>(xlsx, h, HttpStatus.OK);
    }

    @GetMapping("/seccion1.xlsx")
    public void exportSeccion1(HttpServletResponse resp) throws IOException {
        List<Ficha1Sec1Entity> data = s1.listarSeccion1();
        String title = "Sección 1 – Consolidado";
        resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        resp.setHeader("Content-Disposition", "attachment; filename=\"seccion1.xlsx\"");
        excelExporter.export(data, title, resp.getOutputStream());
        resp.getOutputStream().flush();
    }

    @GetMapping("/seccion2.xlsx")
    public void exportSeccion2(HttpServletResponse resp) {
        try {
            List<Ficha1Sec2Entity> data = s2.listarSeccion2();
            
            if (data.isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
                return;
            }
            
            String title = "Sección 2 – Consolidado";
            resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            resp.setHeader("Content-Disposition", "attachment; filename=\"seccion2.xlsx\"");
            
            excelExporter2.export(data, title, resp.getOutputStream());
            resp.getOutputStream().flush();
            
        } catch (Exception e) {
            log.error("Error generando reporte Sección 2", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try {
                resp.getWriter().write("Error generando reporte: " + e.getMessage());
            } catch (IOException ignored) {}
        }
    }

    @GetMapping("/seccion3.xlsx")
    public void exportSeccion3(HttpServletResponse resp) throws IOException {
        List<Ficha1Sec3Entity> data = s3.listarSeccion3();
        String title = "Sección 3 – Consolidado";
        resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        resp.setHeader("Content-Disposition", "attachment; filename=\"seccion3.xlsx\"");
        excelExporter3.export(data, title, resp.getOutputStream());
        resp.getOutputStream().flush();
    }

    @GetMapping("/seccion4.xlsx")
    public void exportSeccion4(HttpServletResponse resp) {
        try {
            List<Ficha1Sec4Entity> data = s4.listarSeccion4();
            
            if (data.isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
                return;
            }
            
            String title = "Sección 4 – Consolidado";
            resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            resp.setHeader("Content-Disposition", "attachment; filename=\"seccion4.xlsx\"");
            
            excelExporter4.export(data, title, resp.getOutputStream());
            resp.getOutputStream().flush();
            
        } catch (Exception e) {
            log.error("Error generando reporte Sección 4", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try {
                resp.getWriter().write("Error generando reporte: " + e.getMessage());
            } catch (IOException ignored) {}
        }
    }
}