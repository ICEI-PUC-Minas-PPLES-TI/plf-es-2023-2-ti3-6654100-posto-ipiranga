package com.postoipiranga.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.postoipiranga.model.ReceitaModel;

@Repository
public interface ReceitaRepository extends JpaRepository<ReceitaModel, Long> {
}
