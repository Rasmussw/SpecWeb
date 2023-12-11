import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  export class ApiService {
  private readonly apiUrlOrganizer: string = 'http://localhost:8080';
  private readonly apiUrlSpectator: string = 'http://localhost:8080/spectator'
  constructor() {}

  getApiUrlOrganizer(): string {
    return this.apiUrlOrganizer;
  }
  getApiUrlSpectator(): string {
    return this.apiUrlSpectator;
  }
}
