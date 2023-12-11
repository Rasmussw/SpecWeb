import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Answer } from '../model/answer';
import { StateService } from './state.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  constructor() {}

  createAnswer(answer: Answer[]) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);

        return this.http.post<Answer[]>(
          this.state.getValue().apiUrl + `/organizer/answers/answers`,
          answer,
          {
            headers: headers,
          }
        );
      })
    );
  }

  updateAnswer(answer: Answer[]) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);

        return this.http.put<Answer[]>(
          this.state.getValue().apiUrl + `/organizer/answers`,
          answer,
          {
            headers: headers,
          }
        );
      })
    );
  }
}
