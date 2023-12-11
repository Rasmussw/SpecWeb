import { inject, Injectable } from '@angular/core';
import { StateService } from './state.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccessCode } from '../model/access-code';
import { Observable, switchMap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccessCodeService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  findAccessCodeBySpectator(specId: number) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<AccessCode>(
          this.state.getValue().apiUrl + `/spectator/access-code/${specId}`,
          {
            headers,
          }
        );
      })
    );
  }
  getAllAccessCodes(): Observable<AccessCode[]> {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<AccessCode[]>(
          this.state.getValue().apiUrl + `/spectator/access-code`,
          { headers }
        );
      })
    );
  }

  updateAccessCode(accessCode: AccessCode) {
    console.log('er jeg i service?');
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        console.log('token ', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        console.log('headers ', headers);
        const tokenId: string | undefined = jwtDecode(token).sub;
        console.log('subId for update ', tokenId);
        console.log(
          'url: ',
          this.state.getValue().apiUrl + `/spectator/access-code/${tokenId}`
        );
        return this.http.put<AccessCode>(
          this.state.getValue().apiUrl + `/spectator/access-code/${tokenId}`,
          accessCode,
          {
            headers: headers,
          }
        );
      })
    );
  }
}
