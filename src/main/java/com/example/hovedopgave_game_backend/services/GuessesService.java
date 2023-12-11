package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Guesses;
import com.example.hovedopgave_game_backend.repositories.GuessesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuessesService implements IGuessesService{
    @Autowired
    private GuessesRepo guessesRepo;

    @Override
    public List<Guesses> findAll() {
        return guessesRepo.findAll();
    }

    @Override
    public Guesses save(Guesses object) {
        return guessesRepo.save(object);
    }

    @Override
    public void delete(Guesses object) {
        guessesRepo.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        guessesRepo.deleteById(aLong);
    }

    @Override
    public Optional<Guesses> findById(Long aLong) {
        return guessesRepo.findById(aLong);
    }


    @Override
    public List<Guesses> findBySpectatorId(long specId) {
        return guessesRepo.findBySpectatorId(specId);
    }
}
