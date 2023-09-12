package com.postoipiranga.service;

import java.util.List;
import java.util.Optional;

import com.postoipiranga.exception.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.postoipiranga.model.UsuarioModel;
import com.postoipiranga.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService { 
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UsuarioModel save(UsuarioModel usuarioModel) { 
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

        if (usuario != null && passwordEncoder.matches(senha, usuario.getSenha())) {
            return usuario;
        }

        throw new CustomAuthenticationException("Usuário ou senha inválidos");
    }
}
