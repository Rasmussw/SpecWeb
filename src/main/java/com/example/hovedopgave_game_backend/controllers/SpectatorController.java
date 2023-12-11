package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Organizer;
import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.services.SpectatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("spectator/spectators")
public class SpectatorController {
    @Autowired
    private SpectatorService spectatorService;

    @PostMapping("/create")
    public ResponseEntity createUser(@RequestBody Spectator spectator){
        Optional<Spectator> checkSpectator = spectatorService.findByTokenId(spectator.getTokenId());
        if(checkSpectator.isEmpty()){
            System.out.println("Spectator findes ikke og oprettes");
            spectatorService.save(spectator);
            return new ResponseEntity<>("spectator oprettet = " + spectator, HttpStatus.CREATED);
        } else {
            System.out.println("Spectator findes og oprettes ikke");
            return new ResponseEntity<>("Spectator findes og oprettes ikke", HttpStatus.OK);
        }
    }

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(spectatorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity getByID(@PathVariable("id") long id){
        Optional<Spectator> spectator = spectatorService.findById(id);
        if (spectator.isPresent()) {
            return new ResponseEntity<>(spectator.get(), HttpStatus.OK);
        } else {
            System.out.println("No Spectator found with id: " + id);
            return new ResponseEntity<>("No Spectator found", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Spectator spectator){
        Map<String, String> message = new HashMap<>();
        if (spectator != null){
            spectatorService.save(spectator);
            message.put("Message", "Spectator is created " + spectator );
        } else {
            message.put("Message", "Failed to created Spectator: " + spectator);
        }
        return ResponseEntity.ok(message);
    }

    @GetMapping("/token/{tokenId}")
    public ResponseEntity findByTokenId(@PathVariable("tokenId") String tokenId){
        Optional<Spectator> spectator = spectatorService.findByTokenId(tokenId);
        if (spectator.isPresent()) {
            return new ResponseEntity<>(spectator.get().getId(), HttpStatus.OK);
        } else {
            System.out.println("No Spectator found with id: " + tokenId);
            return new ResponseEntity<>("No Spectator found", HttpStatus.BAD_REQUEST);
        }
    }


    // UPDATE USERNAME FOR TESTING with REPO not in service //
    /*
    @PutMapping("/{id}")
    public ResponseEntity updateUsername(@PathVariable("id") long id, @RequestBody Spectator spectator){
        Spectator findSpectatorToUpdate = spectatorRepo.findById(id).get();
        findSpectatorToUpdate.setUsername(spectator.getUsername());
        spectatorRepo.save(findSpectatorToUpdate);
        return ResponseEntity.ok(findSpectatorToUpdate);
    }
     */




}
