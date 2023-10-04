package com.postoipiranga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;

@Repository
public interface EstoqueRepository extends JpaRepository<EstoqueModel, Long> {
}

