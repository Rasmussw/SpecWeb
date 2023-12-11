package com.example.hovedopgave_game_backend.models;

import jakarta.persistence.*;

import lombok.*;



@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "access_codes")
public class AccessCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String code;
    @Column(name = "is_activated")
    private boolean isActivated;
    // Many access codes to one competition
    @ManyToOne
    @JoinColumn(name = "competition_id")
    private Competition competition;

    // Many access code to one spectator
    @ManyToOne
    @JoinColumn(name = "spectator_id")
    private Spectator spectator;
}
