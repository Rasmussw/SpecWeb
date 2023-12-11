package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Quiz;
import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.services.DropTableService;
import com.example.hovedopgave_game_backend.services.QuizService;
import com.example.hovedopgave_game_backend.services.SpectatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
public class QuizController {
    @Autowired
    private QuizService quizService;

    @Autowired
    private SpectatorService spectatorService;

    @GetMapping()
    public ResponseEntity getAll(){
        return ResponseEntity.ok(quizService.findAll());
    }

    @GetMapping("/organizer/quizzes/{id}")
    public ResponseEntity getByID(@PathVariable("id") long id){
        Optional<Quiz> quiz = quizService.findById(id);
        if (quiz.isPresent()) {
            return new ResponseEntity<>(quiz.get(), HttpStatus.OK);
        } else {
            System.out.println("No Quiz found with id: " + id);
            return new ResponseEntity<>("No Quiz found", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/quizzes/competition/{compId}")
    public ResponseEntity getByCompetitionID(@PathVariable("compId") long compId){
        return ResponseEntity.ok(quizService.findAllByCompetitionId(compId));
    }

    @PostMapping("/organizer/quizzes")
    public ResponseEntity create(@RequestBody Quiz quiz){
        System.out.println("quiz create: " + quiz.toString());
        if (quiz != null){
            quizService.save(quiz);
            return new ResponseEntity<>(quiz, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create Quiz: ", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/organizer/quizzes")
    public ResponseEntity updateQuiz(@RequestBody Quiz newQuiz){
        if(quizService.findById(newQuiz.getId()).isPresent()){
            Quiz oldQuiz = quizService.findById(newQuiz.getId()).get();
            oldQuiz.setQuestion(newQuiz.getQuestion());
            if(newQuiz.getSpectator() != null){
                oldQuiz.setSpectator(newQuiz.getSpectator());
            }
            if (newQuiz.getState() != null){
                oldQuiz.setState(newQuiz.getState());
            }
            if (newQuiz.getTime() != null){
                oldQuiz.setTime(newQuiz.getTime());
            }
            quizService.save(oldQuiz);
            return new ResponseEntity(oldQuiz, HttpStatus.OK);
        } else {
            return new ResponseEntity("not updated", HttpStatus.BAD_REQUEST);
        }
    }

    //quiz and its answers gets deleted
    @DeleteMapping("/organizer/quizzes/{id}")
    public ResponseEntity deleteQuiz(@PathVariable ("id") long id){
        Map<String, String> message = new HashMap<>();
        if(quizService.findById(id).isPresent()){
            quizService.deleteById(id);
            message.put("Message", "quiz deleted with id " + id );
        }else {
            message.put("Message", "no quiz with id " + id );
        }
        return ResponseEntity.ok(message);
    }

    @GetMapping("/organizer/quizzes/guesses/{id}")
    public ResponseEntity getGuesses(@PathVariable ("id") long id){
        Optional<Quiz> quiz = quizService.findById(id);
        Map<String, Integer> map = quizService.getGuessMapForQuiz(quiz);
        return new ResponseEntity(map, HttpStatus.OK);
    }

    @GetMapping("/organizer/quizzes/winner/{id}")
    public ResponseEntity getWinner(@PathVariable ("id") long id){
        System.out.println("ID = " + id);
        Optional<Quiz> quiz = quizService.findById(id);
        List<Spectator> spectators = quizService.getSpectatorsWithCorrectGuess(quiz);
        if(!spectators.isEmpty()){
            Spectator winner = spectatorService.getRandomSpecator(spectators);
            quiz.get().setSpectator(winner);
            quizService.save(quiz.get());
            return new ResponseEntity(winner, HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

}
