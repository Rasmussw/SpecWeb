package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Guesses;

import java.util.List;

public interface IGuessesService  extends CRUDService <Guesses, Long>{
    List<Guesses> findBySpectatorId(long specId);
}
