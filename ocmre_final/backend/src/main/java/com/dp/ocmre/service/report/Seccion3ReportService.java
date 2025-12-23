// src/main/java/com/dp/ocmre/service/report/Seccion2ReportService.java
package com.dp.ocmre.service.report;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;
import com.dp.ocmre.entity.ficha1.Ficha1Sec3Entity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec2Repository;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec3Repository;
// ⬇️ Ajusta los paquetes si difieren en tu proyecto
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.Report.export.ExcelExporter;
import com.dp.ocmre.Report.sections.Seccion2ReportBuilder;
import com.dp.ocmre.Report.sections.Seccion3ReportBuilder;

@Service
public class Seccion3ReportService {

    private final Ficha1Sec3Repository repo;
    private final Seccion3ReportBuilder builder;

    public Seccion3ReportService(Ficha1Sec3Repository repo,
                                 Seccion3ReportBuilder builder) {
        this.repo = repo;
        this.builder = builder;
    }

    public byte[] generarExcelGlobal() {
        List<Ficha1Sec3Entity> filas = repo.findAll(Sort.by(Sort.Direction.DESC, "fchRegistro"));
        ReportSheet sheet = builder.buildGlobalSheet(
            filas,
            "REGISTROS SECCIÓN 3 - GLOBAL"
        );
        return new ExcelExporter().export(sheet);
    }

    public List<Ficha1Sec3Entity> listarSeccion3() {
        return repo.findAll(Sort.by(Sort.Direction.ASC, "idFicha"));
    }

}
