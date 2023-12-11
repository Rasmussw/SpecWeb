package com.example.hovedopgave_game_backend.repositories;

import com.example.hovedopgave_game_backend.models.Competition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompetitionRepo extends JpaRepository <Competition, Long> {
    List<Competition> getAllByOrganizer_Id(long id);
}
