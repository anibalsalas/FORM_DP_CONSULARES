// src/main/java/com/dp/ocmre/service/report/Seccion2ReportService.java
package com.dp.ocmre.service.report;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec2Repository;

import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.Report.export.ExcelExporter;
import com.dp.ocmre.Report.sections.Seccion2ReportBuilder;

@Service
public class Seccion2ReportService {

    private final Ficha1Sec2Repository repo;
    private final Seccion2ReportBuilder builder;

    public Seccion2ReportService(Ficha1Sec2Repository repo,
                                 Seccion2ReportBuilder builder) {
        this.repo = repo;
        this.builder = builder;
    }

    public byte[] generarExcelGlobal() {
        List<Ficha1Sec2Entity> filas = repo.findAll(Sort.by(Sort.Direction.DESC, "fchRegistro"));
        ReportSheet sheet = builder.buildGlobalSheet(
            filas,
            "REGISTROS SECCIÓN 2 - GLOBAL"
        );
        return new ExcelExporter().export(sheet);
    }

    public List<Ficha1Sec2Entity> listarSeccion2() {
        return repo.findAll(Sort.by(Sort.Direction.ASC, "idFicha"));
    }

}
