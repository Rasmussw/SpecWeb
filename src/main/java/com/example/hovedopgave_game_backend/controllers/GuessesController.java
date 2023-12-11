package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Guesses;
import com.example.hovedopgave_game_backend.models.Quiz;
import com.example.hovedopgave_game_backend.services.GuessesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("spectator/guesses")
public class GuessesController {
    @Autowired
    private GuessesService guessesService;

    @GetMapping
    public ResponseEntity getAllGuesses(){
        return new ResponseEntity(guessesService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createGuess(@RequestBody Guesses guesses){
        System.out.println("guess = " + guesses);
        if (guesses != null){
            guessesService.save(guesses);
            return new ResponseEntity<>(guesses, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create Guess: ", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{spectatorId}")
    public ResponseEntity getByID(@PathVariable("spectatorId") long spectatorId){
        List<Guesses> guesses = guessesService.findBySpectatorId(spectatorId);
        return new ResponseEntity<>(guesses, HttpStatus.OK);
    }


}
