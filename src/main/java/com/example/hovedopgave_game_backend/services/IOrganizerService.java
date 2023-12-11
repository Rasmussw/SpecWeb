package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Organizer;

import java.util.Optional;

public interface IOrganizerService extends CRUDService <Organizer, Long>{
    Optional<Organizer> findByTokenId(String tokenId);

}
