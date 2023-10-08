package com.postoipiranga.controller.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstoqueDTO {
    private Long id;
    private Long productId;
    private Date dataAtualizacao;
    private Long quantidade;
}
