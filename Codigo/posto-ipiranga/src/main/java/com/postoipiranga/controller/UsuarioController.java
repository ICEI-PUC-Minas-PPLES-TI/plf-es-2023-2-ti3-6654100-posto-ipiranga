package com.postoipiranga.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/usuarios") 
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioModel> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<UsuarioModel> getUsuarioById(@PathVariable long id) {
        return usuarioService.findById(id);
    }

    @PostMapping
    public UsuarioModel createUsuario(@RequestBody UsuarioModel usuarioModel) {
        return usuarioService.save(usuarioModel);
    }

    @PutMapping("/{id}")
    public UsuarioModel updateUsuario(@PathVariable long id, @RequestBody UsuarioModel usuarioModel) {
        // Check if the usuario with the given ID exists, and then update it
        if (usuarioService.existsById(id)) {
            usuarioModel.setId(id); // Ensure the ID is set correctly
            return usuarioService.save(usuarioModel);
        } else {
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public Optional<UsuarioModel> deleteUsuario(@PathVariable long id) {
        // Check if the usuario with the given ID exists, and then delete it
        if (usuarioService.existsById(id)) {
            return usuarioService.delete(id);
        } else {
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }
}
