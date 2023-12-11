package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.RulesAnswers;

import java.util.List;

public interface IRulesAnswersService extends CRUDService <RulesAnswers, Long>{
    List<RulesAnswers> getAnswerByRuleId(long id);
}
