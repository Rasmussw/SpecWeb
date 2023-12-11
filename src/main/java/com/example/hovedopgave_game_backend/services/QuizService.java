package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Answer;
import com.example.hovedopgave_game_backend.models.Guesses;
import com.example.hovedopgave_game_backend.models.Quiz;
import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.repositories.QuizRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class QuizService implements IQuizService {
    @Autowired
    private QuizRepo quizRepo;

    @Override
    public List<Quiz> findAll() {
        return quizRepo.findAll();
    }

    @Override
    public Quiz save(Quiz quiz) {
        return quizRepo.save(quiz);
    }

    @Override
    public void delete(Quiz quiz) {
        quizRepo.delete(quiz);
    }

    @Override
    public void deleteById(Long id) {
        quizRepo.deleteById(id);
    }

    @Override
    public Optional<Quiz> findById(Long id) {
        return quizRepo.findById(id);
    }

    @Override
    public List<Quiz> findAllByCompetitionId(long competitionId) {
        return quizRepo.findAllByCompetitionId(competitionId);
    }

    public Map<String,Integer> getGuessMapForQuiz(Optional<Quiz> quiz){
        int guesses = 0;
        int correctGuesses = 0;

        for (int i = 0; i < quiz.get().getAnswers().size(); i++) {
            guesses = guesses + quiz.get().getAnswers().get(i).getGuesses().size();
            if (quiz.get().getAnswers().get(i).isCorrect()){
                correctGuesses = correctGuesses + quiz.get().getAnswers().get(i).getGuesses().size();
            }
        }
        Map<String, Integer> map = new HashMap();
        map.put("CorrectGuesses",correctGuesses);
        map.put("Guesses", guesses);

        return map;
    }

    public List<Spectator> getSpectatorsWithCorrectGuess(Optional<Quiz> quiz){
        List<Spectator> spectators = new ArrayList<>();

        for (Answer answer :quiz.get().getAnswers()) {
            if (answer.isCorrect()){
                for (Guesses guesses: answer.getGuesses()) {
                    if (!spectators.contains(guesses.getSpectator())){
                        spectators.add(guesses.getSpectator());
                    }
                }
            }
        }
        return spectators;
    }
}
