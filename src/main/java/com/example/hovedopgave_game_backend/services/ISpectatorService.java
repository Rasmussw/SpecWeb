package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Organizer;
import com.example.hovedopgave_game_backend.models.Spectator;

import java.util.Optional;

public interface ISpectatorService extends CRUDService <Spectator, Long>{
    Optional<Spectator> findByTokenId(String tokenId);
}
