package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Rule;
import com.example.hovedopgave_game_backend.repositories.RuleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RuleService implements IRuleService{

    @Autowired
    private RuleRepo ruleRepo;

    @Override
    public List<Rule> findAll() {
        return ruleRepo.findAll();
    }

    @Override
    public Rule save(Rule object) {
        return ruleRepo.save(object);
    }

    @Override
    public void delete(Rule object) {
        ruleRepo.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        ruleRepo.deleteById(aLong);
    }

    @Override
    public Optional<Rule> findById(Long aLong) {
        return ruleRepo.findById(aLong);
    }
}
