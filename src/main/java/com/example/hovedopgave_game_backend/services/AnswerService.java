package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Answer;
import com.example.hovedopgave_game_backend.repositories.AnswerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService implements IAnswerService {
    @Autowired
    private AnswerRepo answerRepo;

    @Override
    public List<Answer> findAll() {
        return answerRepo.findAll();
    }

    @Override
    public Answer save(Answer answer) {
        return answerRepo.save(answer);
    }

    @Override
    public void delete(Answer answer) {
        answerRepo.delete(answer);
    }

    @Override
    public void deleteById(Long id) {
        answerRepo.deleteById(id);
    }

    @Override
    public Optional<Answer> findById(Long id) {
        return answerRepo.findById(id);
    }

    @Override
    public List<Answer> getAnswerByQuizId(long quizId) {
        return answerRepo.getAnswerByQuizId(quizId);
    }
}
