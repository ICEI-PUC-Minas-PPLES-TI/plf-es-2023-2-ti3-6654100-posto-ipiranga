package com.postoipiranga.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.controller.dto.MessageDTO;
import com.postoipiranga.controller.dto.ReceitaDTO;
import com.postoipiranga.service.ReceitaService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/receita")
public class ReceitaController {
    private final ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService) {
        this.receitaService = receitaService;
        
    }

    @GetMapping
    public ResponseEntity<?> getAllReceita() {

        try {
            final var response = receitaService.findAll();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReceitaById(@PathVariable @Valid final long id) {

        try {
            if(receitaService.existsById(id)){
                final var response = receitaService.findById(id);
                return ResponseEntity.ok(response);
            }else{
                final var message = new MessageDTO("Receita with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createReceita(@RequestBody @Valid final ReceitaDTO receitaDTO) {
        
        try {
            final var response = receitaService.save(receitaDTO);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReceita(@PathVariable final long id) {

        try {

            if (receitaService.existsById(id)) {

                final var response = receitaService.delete(id);

                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Estoque with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }
}

