package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.Answer;
import com.example.hovedopgave_game_backend.models.RulesAnswers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RulesAnswersRepo extends JpaRepository<RulesAnswers, Long> {
    List<RulesAnswers> getAnswerByRuleId(long id);
}
