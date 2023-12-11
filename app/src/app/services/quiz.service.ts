import { inject, Injectable } from '@angular/core';
import { StateService } from './state.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap } from 'rxjs';
import { Quiz } from '../model/quiz';
import { Spectator } from '../model/spectator';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  constructor() {}

  createQuiz(quiz: Quiz) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);

        return this.http.post<Quiz>(
          this.state.getValue().apiUrl + `/organizer/quizzes`,
          quiz,
          {
            headers: headers,
          }
        );
      })
    );
  }

  getAllQuizzesByCompetitionId(compId: number): Observable<Quiz[]> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<Quiz[]>(
          this.state.getValue().apiUrl + `/quizzes/competition/${compId}`,
          { headers }
        );
      })
    );
  }

  getQuizById(quizId: number): Observable<Quiz> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Quiz>(
          this.state.getValue().apiUrl + `/organizer/quizzes/${quizId}`,
          { headers }
        );
      })
    );
  }

  deleteQuiz(quizId: number) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);

        return this.http.delete(
          this.state.getValue().apiUrl + `/organizer/quizzes/${quizId}`,
          {
            headers: headers,
          }
        );
      })
    );
  }

  updateQuiz(quiz: Quiz) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);

        return this.http.put<Quiz>(
          this.state.getValue().apiUrl + `/organizer/quizzes`,
          quiz,
          {
            headers: headers,
          }
        );
      })
    );
  }

  getWinner(quizId: number) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<Spectator>(
          this.state.getValue().apiUrl + `/organizer/quizzes/winner/${quizId}`,
          { headers }
        );
      })
    );
  }
}
