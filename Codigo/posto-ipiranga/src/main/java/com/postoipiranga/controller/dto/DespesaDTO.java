package com.postoipiranga.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.postoipiranga.model.DespesaModel;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DespesaDTO {

    @JsonProperty("descricao")
    private String descricao;
    @JsonProperty("valor")
    private Double valor;

    public void applyTo(DespesaModel despesa) {
        if (descricao != null) {
            despesa.setDescricao(descricao);
        }

        if (valor != null) {
            despesa.setValor(valor);
        }
    }
}
