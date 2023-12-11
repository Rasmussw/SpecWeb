package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.Guesses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuessesRepo extends JpaRepository<Guesses, Long> {
    List<Guesses> findBySpectatorId(long specId);
}
