package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.AccessCode;
import com.example.hovedopgave_game_backend.models.Organizer;
import com.example.hovedopgave_game_backend.models.Spectator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccessCodeRepo extends JpaRepository <AccessCode, Long> {
    AccessCode getBySpectator(Spectator spectator);
}
