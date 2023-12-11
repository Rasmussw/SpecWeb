package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.Organizer;
import com.example.hovedopgave_game_backend.models.Spectator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpectatorRepo extends JpaRepository <Spectator, Long> {
    Optional<Spectator> findByTokenId(String tokenId);
}
