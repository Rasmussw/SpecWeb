import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { StateService } from '../../services/state.service';
import { Quiz } from '../../model/quiz';
import { Guess } from '../../model/guess';
import { GuessService } from '../../services/guess.service';

@Component({
  selector: 'hf-tops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopsComponent implements OnInit {
  private state: StateService = inject(StateService);
  private quizService: QuizService = inject(QuizService);
  private guessService: GuessService = inject(GuessService);

  expiredQuizzess: WritableSignal<Quiz[]> = signal([]);
  guesses: Guess[] = [];
  specId: number = 0;

  ngOnInit() {
    const compId = this.state.getValue().currentCompetition?.id!;
    console.log('compId ', compId);
    this.quizService
      .getAllQuizzesByCompetitionId(compId)
      .subscribe((quizzes) => {
        const expiredQuizzes = [];
        for (let quiz of quizzes) {
          if (quiz.state?.id === 2) {
            expiredQuizzes.push(quiz);
          }
        }
        console.log('expired quizzess ', expiredQuizzes);
        this.expiredQuizzess.set(expiredQuizzes);
      });
    this.getGuesses();
    this.specId = this.state.getValue().spectatorId!;
  }

  getGuesses() {
    const specId = this.state.getValue().spectatorId!;
    this.guessService.getGuessesBySpectatorId(specId).subscribe((guesses) => {
      console.log('guesses: ', guesses);
      this.guesses = guesses;
    });
  }
}
