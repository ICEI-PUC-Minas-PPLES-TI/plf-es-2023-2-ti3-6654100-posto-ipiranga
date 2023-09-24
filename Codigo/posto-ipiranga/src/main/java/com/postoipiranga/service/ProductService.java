package com.postoipiranga.service;

import com.postoipiranga.model.ProductModel;
import com.postoipiranga.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

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
