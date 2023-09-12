package com.postoipiranga.controller;

import java.util.List;
import java.util.Optional;

import com.postoipiranga.controller.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postoipiranga.model.UsuarioModel;
import com.postoipiranga.service.UsuarioService;

import javax.validation.Valid;

@RestController
@RequestMapping("/usuarios") 
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<UsuarioModel> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<UsuarioModel> getUsuarioById(@PathVariable long id) {
        return usuarioService.findById(id);
    }

    @PostMapping
    public UsuarioModel createUsuario(@RequestBody @Valid UsuarioModel usuarioModel) {
        usuarioModel.setSenha(passwordEncoder.encode(usuarioModel.getSenha()));
        return usuarioService.save(usuarioModel);
    }

    @PutMapping("/{id}")
    public UsuarioModel updateUsuario(@PathVariable long id, @RequestBody @Valid UsuarioModel usuarioModel) {
        if (usuarioService.existsById(id)) {
            usuarioModel.setId(id);
            return usuarioService.save(usuarioModel);
        } else {
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public Optional<UsuarioModel> deleteUsuario(@PathVariable long id) {
        if (usuarioService.existsById(id)) {
            return usuarioService.delete(id);
        } else {
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO loginDTO){

        try {
            final var result = usuarioService.autenticar(loginDTO.getEmail(), loginDTO.getSenha());

            return ResponseEntity.ok().body(result);

        }catch(RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e);
        }
    }
}
