package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.AccessCode;
import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.services.AccessCodeService;
import com.example.hovedopgave_game_backend.services.SpectatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("spectator/access-code")
public class AccessCodeController {
    @Autowired
    private AccessCodeService accessCodeService;

    @Autowired
    private SpectatorService spectatorService;

    @GetMapping
    public ResponseEntity getAll() {
        return ResponseEntity.ok(accessCodeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity getBySpectator(@PathVariable long id){
        Optional<Spectator> spectator = spectatorService.findById(id);

        if (spectator.isPresent()){
            Spectator newSpectator = new Spectator();
            newSpectator.setId(id);
            System.out.println("k");
            return new ResponseEntity(accessCodeService.getBySpectator(newSpectator), HttpStatus.OK);
        } else {
            return new ResponseEntity("No spectator with id " + id, HttpStatus.BAD_REQUEST);
        }
    }




    @PutMapping("/{tokenId}")
    public ResponseEntity updateAccessCode(@RequestBody AccessCode accessCode, @PathVariable("tokenId") String tokenId) {
        Optional<Spectator> spectator = spectatorService.findByTokenId(tokenId);
        AccessCode accessCodeToUpdate = accessCodeService.findById(accessCode.getId())
                .orElseThrow(() -> new RuntimeException("AccessCode not found for ID: " + accessCode.getId()));

        if (spectator.isPresent()) {
            Spectator spectatorToSet = spectator.get();
            accessCodeToUpdate.setSpectator(spectatorToSet);
            accessCodeToUpdate.setActivated(accessCode.isActivated());
            accessCodeService.save(accessCodeToUpdate);
            return new ResponseEntity(accessCodeToUpdate, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}

