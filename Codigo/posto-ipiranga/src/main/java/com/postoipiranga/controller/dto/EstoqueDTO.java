package com.postoipiranga.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstoqueDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("quantidade")
    private Long quantidade;
}
