package com.example.hovedopgave_game_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

//@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "quizzes")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String question;
    private String time;

    // Quizzes can have one spectator/winner
    @ManyToOne
    @Nullable
    @JoinColumn(name = "spectator_id")
    private Spectator spectator;
    // Quizzes can have one competition
    @ManyToOne
    @JoinColumn(name = "competition_id")

    private Competition competition;
    //Quizzes can have one state
    @ManyToOne
    @JoinColumn(name = "state_id")

    private State state;

    // One Quiz can have many answers
    @OneToMany(mappedBy = "quiz")
    private List<Answer> answers = new ArrayList<>();

}
