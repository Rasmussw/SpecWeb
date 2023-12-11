package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.repositories.QuizRepo;
import com.example.hovedopgave_game_backend.repositories.SpectatorRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SpectatorServiceTest {

    @Autowired
    SpectatorRepo spectatorRepo;
    private SpectatorService spectatorService;

    @BeforeEach
    public void setUp(){
        spectatorService = new SpectatorService(spectatorRepo);
    }

    @Test
    void getRandomSpecator() {
        //Arrange

        //initialissere objecter
        Spectator spectator = new Spectator();
        Spectator spectator1 = new Spectator();
        Spectator spectator2 = new Spectator();

        //tilføjer spectatorne til en liste
        List<Spectator> spectators = new ArrayList<>();
        spectators.add(spectator);
        spectators.add(spectator1);
        spectators.add(spectator2);

        //Act
        Spectator randomSpecator = spectatorService.getRandomSpecator(spectators);

        //Assert

        //tjekker den ikke er null
        assertNotNull(randomSpecator);
        //tjekker at listen metoden tager i mod indeholde den spectator metoden returnere
        assertEquals(true, spectators.contains(randomSpecator));
    }
}
