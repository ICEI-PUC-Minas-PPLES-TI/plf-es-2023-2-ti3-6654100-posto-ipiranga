package com.postoipiranga.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.postoipiranga.helper.PerfilCliente;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.model.UsuarioModel;
import com.postoipiranga.repository.ProductRepository;
import com.postoipiranga.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductModel save(ProductModel productModel) {

        return productRepository.save(productModel);
    }

    public List<ProductModel> findAll() { 
        return productRepository.findAll(); 
    }

    public boolean existsById(long id) {
        return productRepository.existsById(id); 
    }

    public Optional<ProductModel> findById(Long id) { 
        return productRepository.findById(id);
    }

    @Transactional
    public Optional<ProductModel> delete(Long id) { 
        Optional<ProductModel> productModelDeletado = productRepository.findById(id); 
        productRepository.deleteById(id); 
        return productModelDeletado;
    }
}
