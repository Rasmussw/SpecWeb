import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Competition } from '../model/competition';
import { jwtDecode } from 'jwt-decode';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  getAllCompetitionsBySubID(): Observable<Competition[]> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);
        const subId: string | undefined = jwtDecode(token).sub;
        console.log('sub-tokenid:', subId);

        return this.http.get<Competition[]>(
          this.state.getValue().apiUrl + `/organizer/competitions/${subId}`,
          { headers }
        );
      })
    );
  }

  getCompetitionById(compId: number): Observable<Competition> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Competition>(
          this.state.getValue().apiUrl + `/spectator/competitions/${compId}`,
          { headers }
        );
      })
    );
  }
}
