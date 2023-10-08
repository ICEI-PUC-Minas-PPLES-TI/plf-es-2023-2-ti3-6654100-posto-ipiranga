package com.postoipiranga.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.controller.dto.ReceitaDTO;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.model.ReceitaModel;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ReceitaRepository;

import jakarta.transaction.Transactional;
@Service
public class ReceitaService {
    private final ReceitaRepository receitaRepository;
    private final EstoqueRepository estoqueRepository;
    private final ProductService productService;

    public ReceitaService(EstoqueRepository estoqueRepository, ProductService productService, ReceitaRepository receitaRepository) {
        this.estoqueRepository = estoqueRepository;
        this.productService = productService;
        this.receitaRepository = receitaRepository;
    }

    @Transactional
    public ReceitaModel save(ReceitaDTO receitaDTO) throws Exception {
        Optional<ProductModel> producReceita = productService.findById(receitaDTO.getProductId());
        if(!producReceita.isPresent()){
            throw new Exception("Nao possui esse produto");
        }
        modificarEstoque(receitaDTO,producReceita.get());

        ReceitaModel receitaModel =  new ReceitaModel();
        receitaModel.setDataTransacao(receitaDTO.getDataTransacao());
        receitaModel.setProductId(producReceita.get());
        receitaModel.setQuantidade(receitaDTO.getQuantidade());
        receitaModel.setPrecoTotal(producReceita.get().getPreco());
        receitaModel.setPrecoTotal(receitaDTO.getQuantidade() * producReceita.get().getPreco());

        return receitaRepository.save(receitaModel);
        
    }

    public void modificarEstoque(ReceitaDTO receitaDTO, ProductModel productModel){
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findByProductId(productModel);
        if(!estoqueReceita.isPresent()){
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade(receitaDTO.getQuantidade());
            estoqueModel.setDataAtualizacao(receitaDTO.getDataTransacao());
            estoqueRepository.save(estoqueModel);
        } else {
            estoqueReceita.get().setDataAtualizacao(receitaDTO.getDataTransacao());
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() + receitaDTO.getQuantidade());
            estoqueRepository.save(estoqueReceita.get());
        }
    }

    public List<ReceitaModel> findAll() {
        return receitaRepository.findAll();
    }

    public boolean existsById(long id) {
        return receitaRepository.existsById(id);
    }

    public Optional<ReceitaModel> findById(Long id) {
        return receitaRepository.findById(id);
    }

    @Transactional
    public Optional<ReceitaModel> delete(Long id) {
        Optional<ReceitaModel> receitaModelDeletado = receitaRepository.findById(id);
        receitaRepository.deleteById(id);
        return receitaModelDeletado;
    }

}
