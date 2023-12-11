package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.AccessCode;
import com.example.hovedopgave_game_backend.models.Spectator;

import java.util.List;

public interface IAccessCodeService extends CRUDService <AccessCode, Long>{
    AccessCode getBySpectator(Spectator spectator);
}
