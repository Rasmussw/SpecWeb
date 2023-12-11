package com.example.hovedopgave_game_backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "breaks")
public class Breaks {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "spectator_id")
    private Spectator spectator;

    @ManyToOne
    @JoinColumn(name = "rules_answers_id")
    private RulesAnswers rulesAnswers;

}
