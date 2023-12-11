package com.example.hovedopgave_game_backend.services;

import com.example.hovedopgave_game_backend.models.Answer;
import com.example.hovedopgave_game_backend.models.Guesses;
import com.example.hovedopgave_game_backend.models.Quiz;
import com.example.hovedopgave_game_backend.models.Spectator;
import com.example.hovedopgave_game_backend.repositories.QuizRepo;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class QuizServiceTest {
    @Autowired
    QuizRepo quizRepo;
    private QuizService quizService;

    @BeforeEach
    public void setUp(){
        quizService = new QuizService(quizRepo);
    }

    @Test
    void testGetGuessMapForQuiz() {
        // Arrange

        //initialissere objecter
        Quiz quiz = new Quiz();

        Spectator spectator = new Spectator();

        Guesses guesses1 = new Guesses();
        Guesses guesses2 = new Guesses();
        Guesses guesses3 = new Guesses();

        Answer correctAnswer1 = new Answer();
        Answer correctAnswer2 = new Answer();
        Answer incorrectAnswer = new Answer();

        //setter answers værdier
        correctAnswer1.setCorrect(true);
        correctAnswer1.setGuesses(List.of(guesses1));
        correctAnswer2.setCorrect(true);
        correctAnswer2.setGuesses(List.of(guesses2));
        incorrectAnswer.setCorrect(false);
        incorrectAnswer.setGuesses(List.of(guesses3));

        //setter guesses værdier
        guesses1.setSpectator(spectator);
        guesses1.setAnswer(correctAnswer1);
        guesses3.setSpectator(spectator);
        guesses3.setAnswer(correctAnswer2);
        guesses2.setSpectator(spectator);
        guesses2.setAnswer(incorrectAnswer);

        //setter quiz værdier
        List<Answer> answers = List.of(correctAnswer1, incorrectAnswer, correctAnswer2);
        quiz.setAnswers(answers);

        Optional<Quiz> optionalQuiz = Optional.of(quiz);

        // Act
        Map<String, Integer> result = this.quizService.getGuessMapForQuiz(optionalQuiz);

        // Assert

        //tjekker den ikke er null
        assertNotNull(result);
        //tjekker at nøglen Guesses som metoden returnere har den korrekte værdi værdi på 3
        assertEquals(3, result.get("Guesses"));
        //tjekker at nøglen CorrectGuesses som metoden returnere har den korrekte værdi på 2
        assertEquals(2, result.get("CorrectGuesses"));
    }

    @Test
    void getSpectatorsWithCorrectGuess() {
        // Arrange

        //initialissere objecter
        Spectator spectator = new Spectator();
        Spectator spectator1 = new Spectator();
        Spectator spectator2 = new Spectator();

        Guesses guesses1 = new Guesses();
        Guesses guesses2 = new Guesses();
        Guesses guesses3 = new Guesses();
        Guesses guesses4 = new Guesses();

        Answer correctAnswer1 = new Answer();
        Answer correctAnswer2 = new Answer();
        Answer correctAnswer3 = new Answer();
        Answer incorrectAnswer = new Answer();

        //setter answers værdier
        correctAnswer1.setCorrect(true);
        correctAnswer1.setGuesses(List.of(guesses1));

        correctAnswer2.setCorrect(true);
        correctAnswer2.setGuesses(List.of(guesses2));

        incorrectAnswer.setCorrect(false);
        incorrectAnswer.setGuesses(List.of(guesses3));

        correctAnswer3.setCorrect(true);
        correctAnswer3.setGuesses(List.of(guesses4));

        //setter guesses værdier
        guesses1.setSpectator(spectator);
        guesses1.setAnswer(correctAnswer1);
        guesses3.setSpectator(spectator);
        guesses3.setAnswer(correctAnswer2);
        guesses2.setSpectator(spectator2);
        guesses2.setAnswer(incorrectAnswer);
        guesses4.setAnswer(correctAnswer3);
        guesses4.setSpectator(spectator1);

        Quiz quiz = new Quiz();
        //setter quiz værdier
        List<Answer> answers = List.of(correctAnswer1, incorrectAnswer, correctAnswer2);
        quiz.setAnswers(answers);

        Optional<Quiz> optionalQuiz = Optional.of(quiz);

        // Act
        List<Spectator> spectators = this.quizService.getSpectatorsWithCorrectGuess(optionalQuiz);
        List<Spectator> spectatorsWhoAnsweredCorrect = new ArrayList<>();
        spectatorsWhoAnsweredCorrect.add(spectator);
        spectatorsWhoAnsweredCorrect.add(spectator2);


        // Assert

        //tjekker den ikke er null
        assertNotNull(spectators);
        //testent tjekker at der bliver tilføjet det korrekte antal a spectators i metoden
        //den tager højde for at en spectator kun må tilføjes en enkel gang.
        assertEquals(2, spectators.size());
        //der bliver testet at metoden returnere en liste med de rigtige spectators
        assertIterableEquals(spectatorsWhoAnsweredCorrect, spectators);
    }
}
