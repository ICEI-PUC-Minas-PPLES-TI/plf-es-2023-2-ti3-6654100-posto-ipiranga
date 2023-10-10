package com.postoipiranga.controller.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceitaDTO {
    private Long id;
    private Long productId;
    private Date dataTransacao;
    private Long quantidade;
}
