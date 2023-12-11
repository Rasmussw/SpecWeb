package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Breaks;

import java.util.List;

public interface IBreaksService extends CRUDService <Breaks, Long>{
    List<Breaks> findBySpectatorId(long specId);
}
