import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  constructor() {
    this.getOrganizerID().subscribe((orgID: number): void => {
      console.log('Set orgId', orgID);
      this.state.set('organizerId', orgID);
    });
  }
  getOrganizerID() {
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

        return this.http.get<number>(
          this.state.getValue().apiUrl + `/organizer/organizers/${subId}`,
          {
            headers,
          }
        );
      })
    );
  }
}
