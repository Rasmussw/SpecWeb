import { Injectable } from '@angular/core';
import { ObservableStore } from '@northtech/ratatosk';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root',
})
export class StateService extends ObservableStore<State> {
  constructor() {
    super({
      competitions: [],
      currentCompetition: null,
      competitionId: undefined,
      organizerId: undefined,
      spectatorId: undefined,
      quizzes: [],
      accessCodes: [],
      activatedQuiz: null,
      hasGuessed: undefined,
      guessMap: new Map<number, string>(),
      avatars: [],
      breaks: [],
      pointSum: 0,
      rules: [],
      selectedRule: undefined,
    });
    this.set('apiUrl', 'http://localhost:8080');
  }
}
