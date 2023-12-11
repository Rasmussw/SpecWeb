import { inject, Injectable } from '@angular/core';
import { StateService } from './state.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Rule } from '../model/rule';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private state = inject(StateService);
  private http = inject(HttpClient);
  private oidcService = inject(OidcSecurityService);

  constructor() {
    this.getAllRules().subscribe((rules) => {
      this.state.set('rules', rules);
    });
    this.state
      .observeClone('rules')
      .subscribe((rules) => console.log('rules:', rules));
  }
  getAllRules(): Observable<Rule[]> {
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

        return this.http.get<Rule[]>(
          this.state.getValue().apiUrl + `/spectator/rule`,
          { headers }
        );
      })
    );
  }

  findBySpectatorId(specId: number) {
    return this.oidcService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Rule>(
          this.state.getValue().apiUrl + `/spectator/rule/${specId}`,
          { headers }
        );
      })
    );
  }
}
