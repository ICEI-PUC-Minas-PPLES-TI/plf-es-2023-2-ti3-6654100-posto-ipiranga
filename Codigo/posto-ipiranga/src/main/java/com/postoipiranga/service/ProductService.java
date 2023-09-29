package com.postoipiranga.service;

import com.postoipiranga.bean.ProductBean;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.repository.ProductRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    @PersistenceContext
    private EntityManager emf;

    public ProductService(ProductRepository productRepository, EntityManager emf) {
        this.productRepository = productRepository;
        this.emf = emf;
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

    public ProductBean findProductDetalhado(Long id){
        StringBuilder queryBuilder = new StringBuilder("SELECT e.produto_id as id, ");
        queryBuilder.append("SUM(CASE WHEN e.venda = false THEN e.quantidade ELSE -e.quantidade END) AS quantidade, ");
        queryBuilder.append("p.nome, p.marca, p.preco, p.unidade_medida ");
        queryBuilder.append("FROM estoque as e, produto as p ");
        queryBuilder.append("WHERE e.produto_id = p.id ");
        queryBuilder.append("AND p.id = :id ");
        queryBuilder.append("GROUP BY e.produto_id, p.nome, p.marca, p.preco, p.unidade_medida");
        
        Query query = emf.createNativeQuery(queryBuilder.toString());
        query.setParameter("id", id);
        query.unwrap(NativeQuery.class).addScalar("id").addScalar("quantidade")
        .addScalar("nome").addScalar("marca").addScalar("preco").addScalar("unidade_medida");
        Object[] result = (Object[]) query.getSingleResult();
        ProductBean productBean = new ProductBean(result);
        return productBean;
    }

    public List<ProductBean> findProductsDetalhados(){
        StringBuilder queryBuilder = new StringBuilder("SELECT e.produto_id as id, ");
        queryBuilder.append("SUM(CASE WHEN e.venda = false THEN e.quantidade ELSE -e.quantidade END) AS quantidade, ");
        queryBuilder.append("p.nome, p.marca, p.preco, p.unidade_medida ");
        queryBuilder.append("FROM estoque as e, produto as p ");
        queryBuilder.append("WHERE e.produto_id = p.id ");
        queryBuilder.append("GROUP BY e.produto_id, p.nome, p.marca, p.preco, p.unidade_medida");
        
        Query query = emf.createNativeQuery(queryBuilder.toString());
        query.unwrap(NativeQuery.class).addScalar("id").addScalar("quantidade")
        .addScalar("nome").addScalar("marca").addScalar("preco").addScalar("unidade_medida");
        List<Object[]> result = query.getResultList();
        List<ProductBean> listaProdutos = result.stream().map(i -> new ProductBean(i)).toList();
        return listaProdutos;
    }
}
