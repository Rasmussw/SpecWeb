package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Quiz;
import com.example.hovedopgave_game_backend.models.Rule;
import com.example.hovedopgave_game_backend.services.OrganizerService;
import com.example.hovedopgave_game_backend.services.RuleService;
import org.apache.tomcat.util.digester.Rules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("spectator/rule")
public class RuleController {

    @Autowired
    private RuleService ruleService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(ruleService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity getByID(@PathVariable("id") long id){
        Optional<Rule> rule = ruleService.findById(id);
        if (rule.isPresent()) {
            return new ResponseEntity<>(rule.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Rule found", HttpStatus.BAD_REQUEST);
        }
    }
}
