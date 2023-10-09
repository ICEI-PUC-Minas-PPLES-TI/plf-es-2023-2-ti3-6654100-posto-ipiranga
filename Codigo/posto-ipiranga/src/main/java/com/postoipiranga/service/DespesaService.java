package com.postoipiranga.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.postoipiranga.controller.dto.DespesaDTO;
import com.postoipiranga.controller.dto.ReceitaDTO;
import com.postoipiranga.model.DespesaModel;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.model.ReceitaModel;
import com.postoipiranga.repository.DespesaRepository;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ReceitaRepository;

import jakarta.transaction.Transactional;

@Service
public class DespesaService {
    private final DespesaRepository despesaRepository;
    private final EstoqueRepository estoqueRepository;
    private final ProductService productService;

    public DespesaService(EstoqueRepository estoqueRepository, ProductService productService, DespesaRepository despesaRepository) {
        this.estoqueRepository = estoqueRepository;
        this.productService = productService;
        this.despesaRepository = despesaRepository;
    }

    @Transactional
    public DespesaModel save(DespesaDTO despesaDTO) throws Exception {
        Optional<ProductModel> producReceita = productService.findById(despesaDTO.getProductId());
        if(!producReceita.isPresent()){
            throw new Exception("Nao possui esse produto");
        }
        modificarEstoqueMais(despesaDTO ,producReceita.get());

        DespesaModel despesaModel = new DespesaModel();
        despesaModel.setDataTransacao(despesaDTO.getDataTransacao());
        despesaModel.setProductId(producReceita.get());
        despesaModel.setQuantidade(despesaDTO.getQuantidade());
        despesaModel.setPrecoUnidade(despesaDTO.getPrecoUnidade());
        despesaModel.setPrecoTotal(despesaDTO.getQuantidade() * despesaDTO.getPrecoUnidade());

        return despesaRepository.save(despesaModel);
        
    }

    public void modificarEstoqueMais(DespesaDTO despesaDTO, ProductModel productModel){
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findByProductId(productModel);
        if(!estoqueReceita.isPresent()){
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade(despesaDTO.getQuantidade());
            estoqueModel.setDataAtualizacao(despesaDTO.getDataTransacao());
            estoqueRepository.save(estoqueModel);
        } else {

            estoqueReceita.get().setDataAtualizacao(despesaDTO.getDataTransacao());
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() + despesaDTO.getQuantidade());
            estoqueRepository.save(estoqueReceita.get());
        }
    }

    public List<DespesaModel> findAll() {
        return despesaRepository.findAll();
    }

    public boolean existsById(long id) {
        return despesaRepository.existsById(id);
    }

    public Optional<DespesaModel> findById(Long id) {
        return despesaRepository.findById(id);
    }

    @Transactional
    public Optional<DespesaModel> delete(Long id) throws Exception {
        Optional<DespesaModel> despesaModelDeletado = despesaRepository.findById(id);
        if(!despesaModelDeletado.isPresent()){
            throw new Error("Nao existe despesa !");
        }
        modificarEstoqueMenos(despesaModelDeletado.get(), despesaModelDeletado.get().getProductId());
        despesaRepository.deleteById(id);
        return despesaModelDeletado;
    }

    public void modificarEstoqueMenos(DespesaModel despesaModelDeletado, ProductModel productModel) throws Exception{
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findByProductId(productModel);
        if(!estoqueReceita.isPresent()){
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade((long) 0);
            estoqueModel.setDataAtualizacao(despesaModelDeletado.getDataTransacao());
            estoqueRepository.save(estoqueModel);
        } else {
            if(estoqueReceita.get().getQuantidade() < despesaModelDeletado.getQuantidade()){
                throw new Exception("Revertendo despesa estoque irá ficar negativo !!");
            }
            estoqueReceita.get().setDataAtualizacao(despesaModelDeletado.getDataTransacao());
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() - despesaModelDeletado.getQuantidade());
            estoqueRepository.save(estoqueReceita.get());
        }
    }
}
