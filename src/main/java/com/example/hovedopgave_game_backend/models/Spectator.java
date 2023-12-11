package com.example.hovedopgave_game_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "spectators")
public class Spectator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String mail;
    @Column(name = "token_id")
    private String tokenId;

    @OneToMany(mappedBy = "spectator")
    @JsonBackReference
    private List<Quiz> quizzes = new ArrayList<>();

    @OneToMany(mappedBy = "spectator")
    @JsonIgnore
    private List<AccessCode> accessCodes = new ArrayList<>();


    @OneToMany(mappedBy = "spectator")
    @JsonIgnore
    private List<Guesses> guesses = new ArrayList<>();

    @OneToMany(mappedBy = "spectator")
    @JsonIgnore
    private List<Breaks> breaks = new ArrayList<>();

}
