package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Answer;

import java.util.List;

public interface IAnswerService extends CRUDService <Answer, Long>{
    List<Answer> getAnswerByQuizId(long id);
}
