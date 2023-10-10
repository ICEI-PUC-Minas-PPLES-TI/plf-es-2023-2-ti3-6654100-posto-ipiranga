package com.postoipiranga.controller.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class DespesaDTO {
    private Long id;
    private Long productId;
    private Date dataTransacao;
    private double precoUnidade;
    private Long quantidade;
}
