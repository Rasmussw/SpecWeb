import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz } from '../../model/quiz';
import { GuessService } from '../../services/guess.service';
import { Guess } from '../../model/guess';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hf-lucky-shot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lucky-shot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuckyShotComponent {
  private state: StateService = inject(StateService);
  private guessService: GuessService = inject(GuessService);

  activatedQuiz = toSignal(this.state.observeClone('activatedQuiz'), {
    initialValue: {} as Quiz,
  });
  selectedAnswerId: WritableSignal<number> = signal(0);
  correctAnswer: WritableSignal<String> = signal('');

  hasGuessed = toSignal(this.state.observe('hasGuessed'), {
    initialValue: false as boolean,
  });

  constructor() {
    this.hasSpectatorGuessedQuiz(this.state.getValue().spectatorId!);
  }

  handleUpdateAnswer(answerId: number) {
    this.selectedAnswerId.set(answerId);
  }

  handleCorrectAnswer(){
    for (const answer of this.activatedQuiz()?.answers!) {
      if (answer?.id === this.selectedAnswerId() && answer.correct){
        this.correctAnswer.set(answer.answer + " is correct")
      } else if(answer?.id === this.selectedAnswerId()){
        this.correctAnswer.set(answer.answer + " is not correct")
      }
    }
  }

  hasSpectatorGuessedQuiz(spectatorId:number){
    this.guessService.getGuessesBySpectatorId(spectatorId).subscribe((guesses) => {
      for (const guess of guesses) {
        for (const answer of this.activatedQuiz()?.answers!) {
          if (guess.answer.id === answer.id){
            this.state.set("hasGuessed", true)
          }
        }
      }
    })
  }


  handleCreateGuess() {
    // create guess object
    const newGuess: Guess = {
      spectator: {
        id: this.state.getValue().spectatorId!,
      },
      answer: {
        id: this.selectedAnswerId(),
      },
    };
    console.log('created guess: ', newGuess);

    // send guess to backend
    this.guessService.createGuess(newGuess).subscribe((responseGuess) => {
      // set to true when a spectator has made a guess
      this.state.set('hasGuessed', true);
      });
  }
}
