package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.RulesAnswers;
import com.example.hovedopgave_game_backend.repositories.RulesAnswersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RulesAnswersService implements IRulesAnswersService{

    @Autowired
    private RulesAnswersRepo rulesAnswersRepo;

    @Override
    public List<RulesAnswers> findAll() {
        return rulesAnswersRepo.findAll();
    }

    @Override
    public RulesAnswers save(RulesAnswers object) {
        return rulesAnswersRepo.save(object);
    }

    @Override
    public void delete(RulesAnswers object) {
        rulesAnswersRepo.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        rulesAnswersRepo.deleteById(aLong);
    }

    @Override
    public Optional<RulesAnswers> findById(Long aLong) {
        return rulesAnswersRepo.findById(aLong);
    }

    @Override
    public List<RulesAnswers> getAnswerByRuleId(long id) {
        return rulesAnswersRepo.getAnswerByRuleId(id);
    }
}
