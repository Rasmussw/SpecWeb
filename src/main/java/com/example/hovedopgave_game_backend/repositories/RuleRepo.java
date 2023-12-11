package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RuleRepo extends JpaRepository<Rule, Long> {
}
