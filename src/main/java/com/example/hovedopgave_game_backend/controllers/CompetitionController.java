package com.example.hovedopgave_game_backend.controllers;

import com.example.hovedopgave_game_backend.models.Competition;
import com.example.hovedopgave_game_backend.models.Organizer;
import com.example.hovedopgave_game_backend.services.CompetitionService;
import com.example.hovedopgave_game_backend.services.OrganizerService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
//@RequestMapping("competitions")
public class CompetitionController {
    private CompetitionService competitionService;
    private OrganizerService organizerService;

    public CompetitionController(CompetitionService competitionService, OrganizerService organizerService) {
        this.competitionService = competitionService;
        this.organizerService = organizerService;
    }

    @GetMapping("/organizer/competitions")
    public ResponseEntity getAll(){
        return ResponseEntity.ok(this.competitionService.findAll());
    }

    @GetMapping("/spectator/competitions/{id}")
    public ResponseEntity getByID(@PathVariable("id") long id){
        Optional<Competition> competition = competitionService.findById(id);
        if (competition.isPresent()) {
            return new ResponseEntity<>(competition.get(), HttpStatus.OK);
        } else {
            System.out.println("No competition found with id: " + id);
            return new ResponseEntity<>("No Competition found", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/organizer/competitions/{tokenId}")
    public ResponseEntity getByTokenID(@PathVariable("tokenId") String tokenId){

        Optional<Organizer> organizer = organizerService.findByTokenId(tokenId);
        if (organizer.isPresent()) {
            long organizerId = organizer.get().getId();
            List<Competition> competitions = competitionService.getAllByOrganizer_Id(organizerId);
            return new ResponseEntity<>(competitions, HttpStatus.OK);
        } else {
            System.out.println("No Organizer found with token_id: " + tokenId);
            return new ResponseEntity<>("No Organizer found", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/organizer/competitions")
    public ResponseEntity create(@RequestBody Competition competition){
        Map<String, String> message = new HashMap<>();
        if (competition != null){
            competitionService.save(competition);
            message.put("Message", "Competition is created " + competition );
        } else {
            message.put("Message", "Failed to create Competition: " + competition);
        }
        return ResponseEntity.ok(message);
    }


}
