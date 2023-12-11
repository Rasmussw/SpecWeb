package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.AccessCode;
import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.repositories.AccessCodeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AccessCodeService implements IAccessCodeService {
    @Autowired
    private AccessCodeRepo accessCodeRepo;

    @Override
    public List<AccessCode> findAll() {
        return accessCodeRepo.findAll();
    }

    @Override
    public AccessCode save(AccessCode accessCode) {
        return accessCodeRepo.save(accessCode);
    }

    @Override
    public void delete(AccessCode accessCode) {
        accessCodeRepo.delete(accessCode);
    }

    @Override
    public void deleteById(Long id) {
        accessCodeRepo.deleteById(id);
    }

    @Override
    public Optional<AccessCode> findById(Long id) {
        return accessCodeRepo.findById(id);
    }

    @Override
    public AccessCode getBySpectator(Spectator spectator) {
        return accessCodeRepo.getBySpectator(spectator);
    }
}
