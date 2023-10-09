package com.postoipiranga.controller;

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

import com.postoipiranga.controller.dto.DespesaDTO;
import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.controller.dto.MessageDTO;
import com.postoipiranga.service.DespesaService;
import com.postoipiranga.service.EstoqueService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/despesa")
public class DespesaController {
    private final DespesaService despesaService;

    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
        
    }

    @GetMapping
    public ResponseEntity<?> getAllDespesa() {

        try {
            final var response = despesaService.findAll();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDespesaById(@PathVariable @Valid final long id) {

        try {
            if(despesaService.existsById(id)){
                final var response = despesaService.findById(id);
                return ResponseEntity.ok(response);
            }else{
                final var message = new MessageDTO("Despesa with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createDespesa(@RequestBody @Valid final DespesaDTO despesaDTO) {
        
        try {
            final var response = despesaService.save(despesaDTO);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDespesa(@PathVariable final long id) {

        try {

            if (despesaService.existsById(id)) {

                final var response = despesaService.delete(id);

                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Despesa with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }
}
