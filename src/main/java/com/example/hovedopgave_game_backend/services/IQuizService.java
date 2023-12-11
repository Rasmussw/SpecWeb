package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Quiz;

import java.util.List;

public interface IQuizService extends CRUDService <Quiz, Long>{
    List<Quiz> findAllByCompetitionId(long competitionId);
}
