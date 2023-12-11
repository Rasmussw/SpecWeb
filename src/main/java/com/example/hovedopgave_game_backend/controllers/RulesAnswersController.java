package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.services.RulesAnswersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("spectator/ruleAnswers")
public class RulesAnswersController {

    @Autowired
    private RulesAnswersService rulesAnswersService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(rulesAnswersService.findAll());
    }

    @GetMapping("{quizId}")
    public ResponseEntity getRuleAnswersByRuleID(@PathVariable("quizId")long quizId){
        return ResponseEntity.ok(rulesAnswersService.getAnswerByRuleId(quizId));
    }
}
