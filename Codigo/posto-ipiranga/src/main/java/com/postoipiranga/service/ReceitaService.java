package com.postoipiranga.service;

import com.postoipiranga.controller.dto.ReceitaDTO;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.model.ReceitaModel;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ReceitaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        if (producReceita.isEmpty()) {
            throw new Exception("Nao possui esse produto");
        }
        modificarEstoqueMais(receitaDTO, producReceita.get());

        ReceitaModel receitaModel = new ReceitaModel();
        receitaModel.setDataTransacao(receitaDTO.getDataTransacao());
        receitaModel.setProductId(producReceita.get());
        receitaModel.setQuantidade(receitaDTO.getQuantidade());
        receitaModel.setPrecoTotal(producReceita.get().getPreco());
        receitaModel.setPrecoTotal(receitaDTO.getQuantidade() * producReceita.get().getPreco());

        return receitaRepository.save(receitaModel);

    }

    public void modificarEstoqueMais(ReceitaDTO receitaDTO, ProductModel productModel) throws Exception {
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findById(productModel.getId());
        if (estoqueReceita.isEmpty()) {
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade(0L);
            estoqueModel.setDataAtualizacao(receitaDTO.getDataTransacao());
            estoqueRepository.save(estoqueModel);
        } else {
            if (estoqueReceita.get().getQuantidade() < receitaDTO.getQuantidade()) {
                throw new Exception("Vendendo mais produtos do que disponivel !!");
            }
            estoqueReceita.get().setDataAtualizacao(receitaDTO.getDataTransacao());
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() - receitaDTO.getQuantidade());
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
        if (receitaModelDeletado.isEmpty()) {
            throw new Error("Nao existe receita !");
        }
        modificarEstoqueMenos(receitaModelDeletado.get(), receitaModelDeletado.get().getProductId());
        receitaRepository.deleteById(id);
        return receitaModelDeletado;
    }

    public void modificarEstoqueMenos(ReceitaModel receitaModelDeletado, ProductModel productModel) {
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findByProductId(productModel);
        if (estoqueReceita.isEmpty()) {
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade(receitaModelDeletado.getQuantidade());
            estoqueModel.setDataAtualizacao(receitaModelDeletado.getDataTransacao());
            estoqueRepository.save(estoqueModel);
        } else {
            estoqueReceita.get().setDataAtualizacao(receitaModelDeletado.getDataTransacao());
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() + receitaModelDeletado.getQuantidade());
            estoqueRepository.save(estoqueReceita.get());
        }
    }

}
