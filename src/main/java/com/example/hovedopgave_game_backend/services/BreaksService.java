package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Breaks;
import com.example.hovedopgave_game_backend.repositories.BreaksRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BreaksService implements IBreaksService{

    @Autowired
    private BreaksRepo breaksRepo;

    @Override
    public List<Breaks> findAll() {
        return breaksRepo.findAll();
    }

    @Override
    public Breaks save(Breaks object) {
        return breaksRepo.save(object);
    }

    @Override
    public void delete(Breaks object) {
        breaksRepo.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        breaksRepo.deleteById(aLong);
    }

    @Override
    public Optional<Breaks> findById(Long aLong) {
        return breaksRepo.findById(aLong);
    }

    @Override
    public List<Breaks> findBySpectatorId(long specId) {
        return breaksRepo.findBySpectatorId(specId);
    }
}
