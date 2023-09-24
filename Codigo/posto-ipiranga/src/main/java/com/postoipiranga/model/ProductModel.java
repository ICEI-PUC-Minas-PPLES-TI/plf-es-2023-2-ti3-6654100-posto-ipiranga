package com.postoipiranga.model;

import com.postoipiranga.helper.PerfilCliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="PRODUTO")
@Getter
@Setter
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length=150, nullable=false)
    private String nome;
    @Column(length=150, nullable=true)
    private String marca;
    @Column(length=150, nullable=false)
    private String unidadeMedida;
    @Column(nullable=false)
    private Long quantidade;
    @Column(nullable=false)
    private Long preco;

}
