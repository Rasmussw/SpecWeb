import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeycloakAdminService {
  private keycloakAdminUrl = 'http://localhost:8081/admin/realms/SpringBootKeycloak/users';
  private adminTokenUrl = 'http://localhost:8081/realms/master/protocol/openid-connect/token';
  constructor(private http: HttpClient) {}


  async getAdminToken(): Promise<string>{

    const body = new URLSearchParams();
    //disse skal i envirements variables hvis muligt
    body.set('client_id', 'admin-cli');
    body.set('username', 'admin');
    body.set('password', 'admin');
    body.set('grant_type', 'password');

    const adminheaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const res = await this.http.post(this.adminTokenUrl, body, { headers: adminheaders }).toPromise()
    // @ts-ignore
    if (res.hasOwnProperty('access_token')) {
      // @ts-ignore
      const accessToken = res.access_token;
      console.log('admin accestoken =  ' + accessToken);
      return accessToken
    } else {
      console.log('fejl - ingen admin tokken');
      return ''
    }
  }

  async createNewUser(username: string, password: string, adminToken: string){
    const user = {
      username: username,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };
    const url = this.keycloakAdminUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ adminToken,
    });
    return await this.http.post(url, user, { headers: headers }).toPromise();
  }

  /*
  createNewUser (username: string, password: string): Observable<any> {
    const user = {
      username: username,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };
    const body = new URLSearchParams();
    body.set('client_id', 'admin-cli');
    body.set('username', 'admin');
    body.set('password', 'admin');
    body.set('grant_type', 'password');
    const adminheaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const adminUrl = 'http://localhost:8081/realms/master/protocol/openid-connect/token'
    const res =  this.http.post(adminUrl, body, { headers: adminheaders }).subscribe(
      (response: any) => {
        if (response.hasOwnProperty('access_token')) {
          this.accesTokken = response.access_token;
          console.log('access_token = ',  this.accesTokken);
        } else {
          console.error('ingen acces token i response');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    console.log('as = ' + this.accesTokken)




    const url = this.keycloakAdminUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsSEdYU2JqUTJtc255ZFBRMkh0cVFsMGFkRTJ4cVJ5OC1kZl9UTFR1MDBJIn0.eyJleHAiOjE2OTk3ODk4MzIsImlhdCI6MTY5OTc4OTc3MiwianRpIjoiN2UyM2ZjY2EtNGJjOC00NzI2LThhZmYtNGMwM2Y1YzZkODQ4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiI0M2VlYTY1YS0yMWVmLTRhYzQtOWY1NS1hMDc3OWFiMzEwODciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiMDliNDdkMzEtZDMyZS00ODRkLWE1YWYtZDYzMDI4YTEzNjdkIiwiYWNyIjoiMSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjA5YjQ3ZDMxLWQzMmUtNDg0ZC1hNWFmLWQ2MzAyOGExMzY3ZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.Dhw-T367vBHAD9-u47U6DiwkE_Ke4muYwDHn0N7RPATfBZ7QCINS0e8RP4XxQ-eaQ62hZHJPxATkdapREqfK8YqlUoIj3AL-yuZwKL-ilNF_gaLnV-bxjTMgfpmm6ajZdXevyuUQxFZVdsPmVUna2DlvZZ8K7drRSZy_5fxvQZB5p7o5wapX3zlos8ZdC4cVudnf2tJTNeS3394orFFAPlb3zWFcoMG9PLBs72YXgmV_5YVFNDdaunOnV8p_nmYM4zA5AOORXSekjs75ApzexPM4rcH1-6COd2_j1DBkoK-p1eCGlsnO1u1tnGLzV0ap7hX42BIk_T8m9Zg3mLXGFA', // Remember to replace with a valid admin access token
    });

    return this.http.post(url, user, { headers: headers });
  }

   */
}
