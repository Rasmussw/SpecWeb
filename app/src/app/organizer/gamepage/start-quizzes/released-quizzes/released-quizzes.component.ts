import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsComponent } from '../../../../components/nav-tabs/nav-tabs.component';
import { StateService } from '../../../../services/state.service';
import { RouterLink } from '@angular/router';
import { Quiz } from '../../../../model/quiz';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuizService } from '../../../../services/quiz.service';
import { GuessService } from '../../../../services/guess.service';
import { SocketioService } from '../../../../services/socketio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hf-released-quizzes',
  standalone: true,
  imports: [CommonModule, NavTabsComponent, RouterLink],
  templateUrl: './released-quizzes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleasedQuizzesComponent implements OnInit {
  private socketioService = inject(SocketioService);
  private guessService: GuessService = inject(GuessService);
  private state: StateService = inject(StateService);
  private quizService: QuizService = inject(QuizService);
  private toastr: ToastrService = inject(ToastrService);
  competitionIdForRouting = this.state.getValue().competitionId;
  // quiz state 3 = awaiting
  awaiting: WritableSignal<number> = signal(3);
  allQuizzes: Signal<Quiz[]> = toSignal(this.state.observeClone('quizzes'), {
    initialValue: [] as Quiz[],
  });
  activatedQuiz = toSignal(this.state.observeClone('activatedQuiz'), {
    initialValue: {} as Quiz,
  });

  myTime: string = '';
  map: Map<number, string> = new Map<number, string>();
  guessMap = this.state.getValue().guessMap;
  guesses: WritableSignal<ReadonlyMap<number, string>> = signal(this.guessMap);

  ngOnInit() {
    this.getQuizzes();
    this.socketioService.setupSocketConnection();

    this.socketioService.socket.on('updateTime', (data: any) => {
      console.log('on update time in released quizzes ', data.time);
      this.state.set('activatedQuiz', data);

      if (data.time === '00:00') {
        // Update state in DB to expired (2)
        const updateQuiz = { ...data, state: { id: 2 } };
        this.quizService.updateQuiz(updateQuiz).subscribe();
        // remove activated quiz from state.activatedQuiz
        this.state.set('activatedQuiz', null);

        console.log('on update - Times up 00:00', updateQuiz);
        this.getQuizzes();
      }
    });
  }

  getQuizzes() {
    const compId = this.state.getValue().competitionId!;
    this.quizService
      .getAllQuizzesByCompetitionId(compId)
      .subscribe((quizzes) => {
        for (const quiz of quizzes) {
          this.getGuessesForQuiz(quiz.id!);
        }
        this.state.set('quizzes', quizzes);
      });

    this.state
      .observe('activatedQuiz')
      .subscribe((activatedQuiz) =>
        console.log('activatedQuiz in: ', activatedQuiz)
      );
  }

  getGuessesForQuiz(quizId: number) {
    setInterval(() => {
      this.guessService.getGuessMapByQuizId(quizId!).subscribe((guesses) => {
        const guessesArray = Object.entries(guesses);
        let guessNumberArray: number[] = [];

        for (const [key, value] of guessesArray) {
          guessNumberArray.push(value);
        }
        guessNumberArray.sort();
        let strnum = guessNumberArray[0] + '/' + guessNumberArray[1];

        this.map.set(quizId, strnum);
        if (this.guessMap.size == 0) {
          this.guesses.set(this.map);
        }
        this.state.set('guessMap', this.map);
      });
    }, 5000);
  }

  getWinnerForQuiz(quizId: number) {
    this.quizService.getWinner(quizId).subscribe((spectator) => {
      console.log('ny fundet winner = ' + spectator.username!);
      this.getQuizzes(); // it works, but it refreshes the list in new order..
    });
  }

  handleFindWinner(quizId: number) {
    this.getWinnerForQuiz(quizId);
  }

  handleAnnounceWinner(quiz: Quiz) {
    this.socketioService.socket.emit('announce winner', quiz);
  }

  protected readonly inject = inject;
}
