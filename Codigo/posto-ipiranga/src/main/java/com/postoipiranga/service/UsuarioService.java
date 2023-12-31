package com.postoipiranga.service;

import java.util.List;
import java.util.Optional;

import com.postoipiranga.helper.PerfilCliente;
import org.springframework.stereotype.Service;

import com.postoipiranga.model.UsuarioModel;
import com.postoipiranga.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService { 

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public UsuarioModel save(UsuarioModel usuarioModel) {

        final var existePerfilAdm = usuarioRepository.existsByPerfil(usuarioModel.getPerfil());

        if(existePerfilAdm)
            usuarioModel.setPerfil(PerfilCliente.USUARIO);

        return usuarioRepository.save(usuarioModel);
    }

    public List<UsuarioModel> findAll() { 
        return usuarioRepository.findAll(); 
    }

    public boolean existsById(long id) {
        return usuarioRepository.existsById(id); 
    }

    public Optional<UsuarioModel> findById(Long id) { 
        return usuarioRepository.findById(id);
    }

    @Transactional
    public Optional<UsuarioModel> delete(Long id) { 
        Optional<UsuarioModel> usuarioModelDeletado = usuarioRepository.findById(id); 
        usuarioRepository.deleteById(id); 
        return usuarioModelDeletado;
    }

    public UsuarioModel autenticar(String email, String senha) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email);

        if(!usuario.getStatus()){
            throw new RuntimeException("Usuário não pode realizar login. Está inativo.");
        }

        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;
        }

        throw new RuntimeException("Usuário ou senha inválidos");
    }
}
