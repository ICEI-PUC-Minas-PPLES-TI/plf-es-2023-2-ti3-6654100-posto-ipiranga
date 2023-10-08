package com.postoipiranga.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.postoipiranga.bean.ProductBean;
import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ProductRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

@Service
public class EstoqueService {

    private final EstoqueRepository estoqueRepository;
    private final ProductService productService;

    public EstoqueService(EstoqueRepository estoqueRepository, ProductService productService) {
        this.estoqueRepository = estoqueRepository;
        this.productService = productService;
    }

    @Transactional
    public EstoqueModel save(EstoqueDTO estoqueDTO) throws Exception {
        Optional<ProductModel> producEstoque = productService.findById(estoqueDTO.getProductId());
        if(!producEstoque.isPresent()){
            throw new Exception("Nao possui esse produto");
        }
        EstoqueModel estoqueModel = new EstoqueModel();
        estoqueModel.setDataAtualizacao(estoqueDTO.getDataAtualizacao());
        estoqueModel.setProductId(producEstoque.get());
        estoqueModel.setQuantidade(estoqueDTO.getQuantidade());
        return estoqueRepository.save(estoqueModel);
    }

    public List<EstoqueModel> findAll() {
        return estoqueRepository.findAll();
    }

    public boolean existsById(long id) {
        return estoqueRepository.existsById(id);
    }

    public Optional<EstoqueModel> findById(Long id) {
        return estoqueRepository.findById(id);
    }

    @Transactional
    public Optional<EstoqueModel> delete(Long id) {
        Optional<EstoqueModel> estoqueModelDeletado = estoqueRepository.findById(id);
        estoqueRepository.deleteById(id);
        return estoqueModelDeletado;
    }

}
