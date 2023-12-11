package com.example.hovedopgave_game_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "rules_answers")
public class RulesAnswers {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String answer;
    @Column(name = "is_correct")
    private boolean isCorrect;
    private int point;
    private String explanation;

    @ManyToOne
    @JoinColumn(name = "rule_id")
    @JsonBackReference
    private Rule rule;

    @OneToMany(mappedBy = "rulesAnswers")
    @JsonIgnore
    private List<Breaks> breaks = new ArrayList<>();



}
