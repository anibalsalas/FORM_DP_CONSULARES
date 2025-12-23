package com.dp.ocmre.repository.repositoryFicha1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dp.ocmre.entity.ficha1.Ficha1PadronEntity;


@Repository
public interface Ficha1PadronRepository extends JpaRepository<Ficha1PadronEntity, Integer> {
  
}