package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Breaks;
import com.example.hovedopgave_game_backend.models.Guesses;
import com.example.hovedopgave_game_backend.services.BreaksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("spectator/break")
public class BreaksController {

    @Autowired
    private BreaksService breaksService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(breaksService.findAll());
    }

    @PostMapping
    public ResponseEntity createBreak(@RequestBody Breaks breaks){
        if (breaks != null){
            breaksService.save(breaks);
            return new ResponseEntity<>(breaks, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create break: ", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{spectatorId}")
    public ResponseEntity getBySpecID(@PathVariable("spectatorId") long spectatorId){
        List<Breaks> breaks = breaksService.findBySpectatorId(spectatorId);
        return new ResponseEntity<>(breaks, HttpStatus.OK);
    }
}
