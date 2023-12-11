package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Competition;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DropTableService {
    @Autowired
    private CompetitionService competitionService;

    @PersistenceContext
    private EntityManager entityManager;

    @Scheduled(fixedRate = 24*60*60*1000) // Execute every 1day
    @Transactional //
    public void dropOldTables() {

        List<Competition> competitions = competitionService.findAll();
        LocalDate date = LocalDate.now(); // = fx - 2023-12-07
        for (Competition competition:competitions) {
            LocalDate competitionEndDate = LocalDate.parse(competition.getEndDate().substring(0,10)); // substring to get in localdate format yyyy-mm-dd
            if (date.isAfter(competitionEndDate)){
                //Delete quiz data form Quiz table with competition id
                String deleteQuery = "DELETE FROM Quiz q WHERE q.competition.id = :compId";
                entityManager.createQuery(deleteQuery)
                      .setParameter("compId",competition.getId())
                      .executeUpdate();
            }
        }

    }
}
