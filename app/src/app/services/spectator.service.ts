import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap } from 'rxjs';
import { Spectator } from '../model/spectator';
import { StateService } from './state.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SpectatorService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);
  private url: String = 'http://localhost:8080/spectator/spectators';

  constructor() {
    this.getSpectatorID().subscribe((specID: number): void => {
      console.log('Set specId', specID);
      this.state.set('spectatorId', specID);
    });
  }
  getSpectatorID() {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);
        const subId: string | undefined = jwtDecode(token).sub;
        console.log('sub-tokenid:', subId);

        return this.http.get<number>(
          this.state.getValue().apiUrl + `/spectator/spectators/token/${subId}`,
          {
            headers,
          }
        );
      })
    );
  }

  createQuiz(spectator: Spectator) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);

        return this.http.post<Spectator>(this.url + `/create`, spectator, {
          headers: headers,
        });
      })
    );
  }
}
