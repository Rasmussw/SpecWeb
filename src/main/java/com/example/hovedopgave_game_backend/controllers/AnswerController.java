package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Answer;
import com.example.hovedopgave_game_backend.models.Quiz;
import com.example.hovedopgave_game_backend.repositories.AnswerRepo;
import com.example.hovedopgave_game_backend.repositories.StatesRepo;
import com.example.hovedopgave_game_backend.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("organizer/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(answerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity getByID(@PathVariable("id") long id){
        Optional<Answer> answer = answerService.findById(id);
        if (answer.isPresent()) {
            return new ResponseEntity<>(answer.get(), HttpStatus.OK);
        } else {
            System.out.println("No Answer found with id: " + id);
            return new ResponseEntity<>("No Answer found", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity getByQuizID(@PathVariable("quizId")long quizId){
        return ResponseEntity.ok(answerService.getAnswerByQuizId(quizId));
    }

    @PostMapping()
    public ResponseEntity createAnswer(@RequestBody Answer answer){
        answerService.save(answer);
        return new ResponseEntity(answer, HttpStatus.CREATED);
    }

    @PostMapping("answers")
    public ResponseEntity createAnswers(@RequestBody List<Answer> answers){
        for (int i = 0; i < answers.size(); i++) {
            answerService.save(answers.get(i));
        }
        return new ResponseEntity(answers, HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity updateAnswersForAQuiz(@RequestBody List<Answer> answers){
        List<Answer> newAnswers = new ArrayList<>();
        for (int i = 0; i < answers.size(); i++) {
            Answer newAnswer = answers.get(i);
            if(answerService.findById(newAnswer.getId()).isPresent()){
                Answer oldAnswer = answerService.findById(newAnswer.getId()).get();
                oldAnswer.setAnswer(newAnswer.getAnswer());
                oldAnswer.setCorrect(newAnswer.isCorrect());
                answerService.save(oldAnswer);
                newAnswers.add(oldAnswer);
            }
        }
        return new ResponseEntity(newAnswers, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAsnwer(@PathVariable ("id") long id){
        Map<String, String> message = new HashMap<>();
        if(answerService.findById(id).isPresent()){
            answerService.deleteById(id);
            message.put("Message", "answer deleted with id " + id );
        }else {
            message.put("Message", "no answer with id " + id );
        }
        return ResponseEntity.ok(message);
    }
}
