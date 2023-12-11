package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.State;
import com.example.hovedopgave_game_backend.repositories.StatesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StateService implements IStateService {
    @Autowired
    private StatesRepo statesRepo;


    @Override
    public List<State> findAll() {
        return statesRepo.findAll();
    }

    @Override
    public State save(State state) {
        return statesRepo.save(state);
    }

    @Override
    public void delete(State state) {
        statesRepo.delete(state);
    }

    @Override
    public void deleteById(Long id) {
        statesRepo.deleteById(id);
    }

    @Override
    public Optional<State> findById(Long id) {
        return statesRepo.findById(id);
    }
}
