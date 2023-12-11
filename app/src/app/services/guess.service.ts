import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap } from 'rxjs';
import { StateService } from './state.service';
import { Guess } from '../model/guess';
import {Quiz} from "../model/quiz";

@Injectable({
  providedIn: 'root',
})
export class GuessService {
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);
  private state = inject(StateService);

  constructor() {}
  createGuess(guess: Guess) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.post<Guess>(
          this.state.getValue().apiUrl + `/spectator/guesses`,
          guess,
          {
            headers: headers,
          }
        );
      })
    );
  }

  getGuessesBySpectatorId(spectatorId: number): Observable<Guess[]> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Guess[]>(
          this.state.getValue().apiUrl +
          `/spectator/guesses/${spectatorId}`,
          { headers }
        );
      })
    );
  }

  getGuessMapByQuizId(quizId: number): Observable<Map<string, number>> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Map<string, number>>(
          this.state.getValue().apiUrl + `/organizer/quizzes/guesses/${quizId}`,
          { headers }
        );
      })
    );
  }
}
