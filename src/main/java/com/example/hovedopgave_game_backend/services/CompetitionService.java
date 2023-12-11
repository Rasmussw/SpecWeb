package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Competition;
import com.example.hovedopgave_game_backend.repositories.CompetitionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompetitionService implements ICompetitionService {
    @Autowired
    private CompetitionRepo competitionRepo;
    @Autowired
    private OrganizerService organizerService;

    @Override
    public List<Competition> findAll() {
        return competitionRepo.findAll();
    }
    @Override
    public Optional<Competition> findById(Long id) {
        return competitionRepo.findById(id);
    }

    @Override
    public void delete(Competition competition) {
        competitionRepo.delete(competition);
    }

    @Override
    public void deleteById(Long id) {
        competitionRepo.deleteById(id);
    }

    @Override
    public Competition save(Competition competition) {
        return competitionRepo.save(competition);
    }

    @Override
    public List<Competition> getAllByOrganizer_Id(long id) {
        return competitionRepo.getAllByOrganizer_Id(id);
    }
}
