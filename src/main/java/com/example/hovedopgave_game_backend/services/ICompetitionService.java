package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Competition;

import java.util.List;

public interface ICompetitionService extends CRUDService <Competition, Long>{
    List<Competition> getAllByOrganizer_Id(long id);
}
