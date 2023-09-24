package com.postoipiranga.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.postoipiranga.controller.dto.LoginDTO;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.model.UsuarioModel;
import com.postoipiranga.service.ProductService;
import com.postoipiranga.service.UsuarioService;

public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductModel> getAllUsuarios() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ProductModel> getUsuarioById(@PathVariable long id) {
        return productService.findById(id);
    }

    @PostMapping
    public ProductModel createUsuario(@RequestBody @Valid ProductModel productModel) {
        return productService.save(productModel);
    }

    @PutMapping("/{id}")
    public ProductModel updateUsuario(@PathVariable long id, @RequestBody @Valid ProductModel productModel) {
        if (productService.existsById(id)) {
            productModel.setId(id);
            return productService.save(productModel);
        } else {
            throw new IllegalArgumentException("Produto with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public Optional<ProductModel> deleteProduto(@PathVariable long id) {
        if (productService.existsById(id)) {
            return productService.delete(id);
        } else {
            throw new IllegalArgumentException("Produto with ID " + id + " not found.");
        }
    }
}
