package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.Breaks;
import com.example.hovedopgave_game_backend.models.Guesses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreaksRepo extends JpaRepository<Breaks, Long> {
    List<Breaks> findBySpectatorId(long specId);
}
