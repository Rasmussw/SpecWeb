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
import { Router, RouterLink } from '@angular/router';
import { StateService } from '../../../../services/state.service';
import { QuizService } from '../../../../services/quiz.service';
import { Quiz } from '../../../../model/quiz';
import { toSignal } from '@angular/core/rxjs-interop';
import { Answer } from '../../../../model/answer';
import { SocketioService } from '../../../../services/socketio.service';

@Component({
  selector: 'hf-activate-quiz',
  standalone: true,
  imports: [CommonModule, NavTabsComponent, RouterLink],
  templateUrl: './activate-quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateQuizComponent implements OnInit {
  private socketioService: SocketioService = inject(SocketioService);
  private state: StateService = inject(StateService);
  private router = inject(Router);
  private quizService: QuizService = inject(QuizService);
  competitionIdForRouting: number | undefined =
    this.state.getValue().competitionId;
  allQuizzes: Signal<Quiz[]> = toSignal(this.state.observeClone('quizzes'), {
    initialValue: [] as Quiz[],
  });
  // Open/Close questions dropdown
  openQuestionDropDown: Boolean = false;
  // the selected quiz activate to activate
  selectedQuiz: Quiz = {};
  // the selected quiz question
  selectedQuizQuestion: WritableSignal<String> = signal('');
  // show if quiz is selected
  handleShowAnswerOptions: WritableSignal<Boolean> = signal(false);
  // selected quiz answers
  selectedQuizAnswers: WritableSignal<Answer[]> = signal([]);
  // Open/Close select time dropdown
  openTimerDropDown: Boolean = false;
  // List with Time options
  allTimes: Signal<string[]> = signal(['0.5', '1', '5', '10', '15', '20']);
  //
  selectedTime: WritableSignal<String> = signal('');

  activatedQuiz = toSignal(this.state.observeClone('activatedQuiz'), {
    initialValue: {} as Quiz,
  });

  ngOnInit() {
    this.getQuizzes();
    this.socketioService.setupSocketConnection();
  }

  constructor() {
    this.state
      .observe('hasGuessed')
      .subscribe((guess) => console.log('guess state from activate: ', guess));
  }

  // This opens and close the question dropdown
  toggleOpenQuestionDropDown() {
    console.log('Before toggle - Question: ', this.openQuestionDropDown);
    this.openQuestionDropDown = !this.openQuestionDropDown;
    console.log('After toggle - Question: ', this.openQuestionDropDown);
  }
  // This opens and close the timer dropdown
  toggleOpenTimerDropDown() {
    console.log('Before toggle - Timer: ', this.openTimerDropDown);
    this.openTimerDropDown = !this.openTimerDropDown;
    console.log('After toggle- Timer: ', this.openTimerDropDown);
  }
  getQuizzes() {
    const compId = this.state.getValue().competitionId!;
    this.quizService
      .getAllQuizzesByCompetitionId(compId)
      .subscribe((quizzes) => {
        this.state.set('quizzes', quizzes);
      });
  }
  handleSelectedQuiz(quiz: Quiz) {
    // save the selected Quiz
    console.log(quiz);
    this.selectedQuiz = quiz;
    // save the selected Quiz Question
    this.selectedQuizQuestion.set(quiz.question!);
    // save the quiz answers so it can be shown
    this.selectedQuizAnswers.set(quiz.answers!);
    // close quiz dropdown
    this.toggleOpenQuestionDropDown();
    // show answer options to quiz
    this.handleShowAnswerOptions.set(true);
  }

  handleSelectedTime(time: String) {
    // save the selected time
    console.log('Selected time: ', time);
    this.selectedTime.set(time);
    // close timer dropdown
    this.toggleOpenTimerDropDown();
  }

  handleActivateQuiz() {
    // reset state.hasGuessed, so spectators can participate/make a guess
    this.state.set('hasGuessed', false);
    this.state
      .observe('hasGuessed')
      .subscribe((guess) =>
        console.log('hasGuessed in handleActivateQuiz function', guess)
      );

    // activate selected quiz
    const quizToUpdate = {
      id: this.selectedQuiz!.id,
      question: this.selectedQuiz.question,
      time: this.selectedTime(),
      state: {
        id: 1, // 1 = guessable
      },
      competition: {
        id: this.selectedQuiz.competition?.id!,
      },
      answers: this.selectedQuizAnswers(),
    };
    console.log('answers to selected quiz: ', this.selectedQuizAnswers());
    console.log('Quiz to activate/update: ', quizToUpdate);
    this.quizService.updateQuiz(quizToUpdate).subscribe(
      () =>
        setTimeout(() => {
          this.router.navigate(['/organizer-released-quizzes']);
        }, 500),

      this.socketioService.socket.emit('startTimer', { data: quizToUpdate })
    );
    console.log('Emit start timer activate quiz');
  }
}
