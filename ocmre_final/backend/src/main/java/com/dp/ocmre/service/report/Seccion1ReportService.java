// src/main/java/com/dp/ocmre/service/report/Seccion1ReportService.java
package com.dp.ocmre.service.report;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.ficha1.Ficha1Sec1Entity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec1Repository;

// ⬇️ Ajusta los paquetes si difieren en tu proyecto
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.Report.export.ExcelExporter;
import com.dp.ocmre.Report.sections.Seccion1ReportBuilder;



@Service
public class Seccion1ReportService {

  @Autowired
    private Ficha1Sec1Repository ficha1Repository;

 private final Ficha1Sec1Repository repo;
    private final Seccion1ReportBuilder builder;

    public Seccion1ReportService(Ficha1Sec1Repository repo,
                                 Seccion1ReportBuilder builder) {
        this.repo = repo;
        this.builder = builder;
    }

    /** Exporta TODOS los registros de Sección 1, sin filtros. */
    public byte[] generarExcelGlobal() {
        // ordena por fecha o por ID, ajusta si prefieres
        List<Ficha1Sec1Entity> filas = repo.findAll(Sort.by(Sort.Direction.DESC, "fchRegistro"));
        ReportSheet sheet = builder.buildGlobalSheet(
            filas,
            "REGISTROS SECCIÓN 1 - GLOBAL"
        );
        // ExcelExporter no es @Component en tu código: instáncialo directo
        return new ExcelExporter().export(sheet);
    }


        public List<Ficha1Sec1Entity> listarSeccion1() {
        // ordénalo como prefieras
        return ficha1Repository.findAll(Sort.by(Sort.Direction.ASC, "idFicha"));
    }

}
