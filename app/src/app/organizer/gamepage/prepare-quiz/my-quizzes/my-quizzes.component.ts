import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsComponent } from '../../../../components/nav-tabs/nav-tabs.component';
import { QuizService } from '../../../../services/quiz.service';
import { StateService } from '../../../../services/state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz } from '../../../../model/quiz';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Answer } from '../../../../model/answer';
import { AnswerService } from '../../../../services/answer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hf-my-quizzes',
  standalone: true,
  imports: [CommonModule, NavTabsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './my-quizzes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyQuizzesComponent implements OnInit {
  private quizService: QuizService = inject(QuizService);
  private answerService: AnswerService = inject(AnswerService);
  private state: StateService = inject(StateService);
  competitionIdForRouting = this.state.getValue().competitionId;
  createQuiz: String = 'Create Quiz';
  myQuizzes: String = 'My Quizzes';
  openUpdate: boolean[] = [];
  answers: Answer[] = [];
  //form
  question = new FormControl('');
  answerGroup: FormGroup;
  selectedQuizId: number | undefined = 0;

  constructor() {
    this.answerGroup = new FormGroup({});
    // To see the quizzes in the console from state
    this.state
      .observe('quizzes')
      .subscribe((quiz) => console.log('quiz: ', quiz));

    this.state
      .observe('competitionId')
      .subscribe((competitionID) =>
        console.log('my quizzes comp id: ', competitionID)
      );
  }
  ngOnInit() {
    this.getQuizzes();
  }

  allQuizzes: Signal<Quiz[]> = toSignal(this.state.observeClone('quizzes'), {
    initialValue: [] as Quiz[],
  });

  toggleOpenUpdateForm(index: number) {
    console.log('i toggle metode');
    this.openUpdate[index] = !this.openUpdate[index];
  }

  onDeleteQuiz(quizId: number, index: number) {
    // TODO notification - sikker på at du vil slette quizzen
    alert('sikker?');

    //delete
    this.quizService.deleteQuiz(quizId).subscribe(() => this.getQuizzes());

    //this.toggleOpenUpdateForm(index);
  }

  getQuizzes() {
    const compId = this.state.getValue().competitionId!;
    this.quizService
      .getAllQuizzesByCompetitionId(compId!)
      .subscribe((quizzes) => {
        this.state.set('quizzes', quizzes);
      });
  }
  updateQuiz(quiz: Quiz, index: number) {
    this.selectedQuizId = quiz.id;
    // Opens update functionality
    //this.toggleOpenUpdateForm(index);
    //answers length
    this.answers = quiz.answers!;

    this.answerGroup = new FormGroup({});

    this.answers.forEach((value) => {
      const controlName = `${value.id}`;
      this.answerGroup.addControl(controlName, new FormControl(value.answer));
    });
    // Set question in inputs
    this.question.setValue(quiz.question!);
  }

  isCorrectAnswer(id: String): boolean {
    for (const answer of this.answers) {
      if (String(answer.id) === id && answer.correct) {
        console.log('id = ' + id);
        return true;
      }
    }
    return false;
  }

  updateQuizAndAnswers(index: number) {
    // Quiz to update
    const quiz = {
      id: this.selectedQuizId,
      question: this.question.value!,
    };

    // Answers to update
    const updatedAnswerList: Answer[] = [];
    for (const answer of this.answers) {
      const newanswer = {
        id: answer.id,
        answer: this.answerGroup.get(`${answer.id}`)?.value!,
        correct: answer.correct,
      };
      updatedAnswerList.push(newanswer);
    }

    // calls the update API from service classes
    this.quizService.updateQuiz(quiz).subscribe();
    this.answerService
      .updateAnswer(updatedAnswerList)
      .subscribe(() => this.getQuizzes());

    // Close toggleOpenUpdateForm()
    this.toggleOpenUpdateForm(index);
  }
}
