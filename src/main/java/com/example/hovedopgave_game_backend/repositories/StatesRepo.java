package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.State;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatesRepo extends JpaRepository <State, Long> {
}
