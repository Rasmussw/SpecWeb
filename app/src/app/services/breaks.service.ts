import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Break } from '../model/break';
import { StateService } from './state.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class BreaksService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  constructor() {}

  getBreaksBySpectatorId(spectatorId: number): Observable<Break[]> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Break[]>(
          this.state.getValue().apiUrl + `/spectator/break/${spectatorId}`,
          { headers }
        );
      })
    );
  }

  createBreak(specBreak: Break): Observable<Break> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.post<Break>(
          this.state.getValue().apiUrl + `/spectator/break`,
          specBreak,
          {
            headers: headers,
          }
        );
      })
    );
  }
}
