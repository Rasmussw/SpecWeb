import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsComponent } from '../../../../components/nav-tabs/nav-tabs.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';
import { StateService } from '../../../../services/state.service';
import { catchError, throwError } from 'rxjs';
import { AnswerService } from '../../../../services/answer.service';
import { Answer } from '../../../../model/answer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'hf-create-quiz',
  standalone: true,
  imports: [CommonModule, NavTabsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQuizComponent {
  private router = inject(Router);
  private quizService = inject(QuizService);
  private answerService = inject(AnswerService);
  private state = inject(StateService);
  competitionIdForRouting = this.state.getValue().competitionId;
  createQuiz: String = 'Create Quiz';
  myQuizzes: String = 'My Quizzes';
  answerGroup: FormGroup;
  controlFormId: number = 0;
  controlFormIds: number[] = [];

  // Quiz
  question = new FormControl('');

  //Correct answer
  correctAnswer = new FormControl('');

  //Other answer options
  answer1 = new FormControl('');

  constructor() {
    this.answerGroup = new FormGroup({});
  }

  // TODO lav en handle på hvis state.competition id er tomt, så må den ikke poste!
  onCreateQuizInComponent() {
    // create quiz object
    // post quiz object
    console.log(this.question.value);
    const quiz = {
      id: 0,
      question: this.question.value!,
      competition: {
        id: this.state.getValue().competitionId!,
      },
      state: {
        id: 3,
      },
    };
    console.log(quiz);

    // POST
    this.quizService
      .createQuiz(quiz)
      .pipe(
        catchError((error) => {
          console.error('something went wrong creating quiz', error);
          return throwError(error);
        })
      )
      .subscribe((response) => {
        console.log('Created quiz id: ', response.id);
        console.log('Created quiz : ', response);
        this.onCreateAnswers(response.id!);
      });
  }

  onCreateAnswers(quizId: number) {
    // Post answer object with correct=true
    const answers: Answer[] = [];
    answers.push({
      answer: this.correctAnswer.value!,
      correct: true,
      quiz: {
        id: quizId,
      },
    });

    answers.push({
      answer: this.answer1.value!,
      correct: false,
      quiz: {
        id: quizId,
      },
    });

    for (const answer of this.controlFormIds) {
      if (this.answerGroup.get(String(answer))?.value !== '') {
        const newanswer = {
          answer: this.answerGroup.get(String(answer))?.value,
          correct: false,
          quiz: {
            id: quizId,
          },
        };
        answers.push(newanswer);
      }
    }
    this.answerService.createAnswer(answers).subscribe(() => {
      setTimeout(() => {
        this.router.navigate(['/organizer-my-quizzes']);
      }, 500);
    });
  }

  // Discards whats you are doing on return to the previous page
  emptyForms() {
    // Empty form inputs
    this.deleteAnswerRows();
    this.question.reset();
    this.correctAnswer.reset();
    this.answer1.reset();
    this.controlFormIds = [];
  }

  deleteAnswerRows() {
    for (const argument of this.controlFormIds) {
      this.answerGroup.get(String(argument))?.reset();
      this.answerGroup.removeControl(String(argument));
    }
  }

  addAnswerRow() {
    this.answerGroup.addControl(`${this.controlFormId}`, new FormControl(''));
    this.controlFormIds.push(this.controlFormId);
    this.controlFormId++;
  }
}
