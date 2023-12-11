package com.example.hovedopgave_game_backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "rules")
public class Rule {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private int level;
    private String ruleTxt;

    private byte[] ruleImage;

    private byte[] ruleVideo;

    @OneToMany(mappedBy = "rule")
    private List<RulesAnswers> rulesAnswers = new ArrayList<>();
}
