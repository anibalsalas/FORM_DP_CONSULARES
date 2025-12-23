package com.dp.ocmre.service.report;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dp.ocmre.entity.ficha1.Ficha1Sec4Entity;
import com.dp.ocmre.repository.repositoryFicha1.Ficha1Sec4Repository;

@Service
public class Seccion4ReportService {

    private final Ficha1Sec4Repository repo;

    public Seccion4ReportService(Ficha1Sec4Repository repo) {
        this.repo = repo;
    }

    public List<Ficha1Sec4Entity> listarSeccion4() {
        return repo.findAll(Sort.by(Sort.Direction.ASC, "idFicha"));
    }
}