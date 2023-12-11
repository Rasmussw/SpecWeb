package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Competition;
import com.example.hovedopgave_game_backend.models.Organizer;
import com.example.hovedopgave_game_backend.repositories.OrganizerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizerService implements IOrganizerService {
    @Autowired
    private OrganizerRepo organizerRepo;

    @Override
    public List<Organizer> findAll() {
        return organizerRepo.findAll();
    }

    @Override
    public Organizer save(Organizer organizer) {
        return organizerRepo.save(organizer);
    }

    @Override
    public void delete(Organizer organizer) {
        organizerRepo.delete(organizer);
    }

    @Override
    public void deleteById(Long id) {
        organizerRepo.deleteById(id);
    }

    @Override
    public Optional<Organizer> findById(Long id) {
        return organizerRepo.findById(id);
    }


    @Override
    public Optional<Organizer> findByTokenId(String tokenId) {
        return organizerRepo.findByTokenId(tokenId);
    }
}
