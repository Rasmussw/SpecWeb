import { RulesAnswers } from './rules-answers';

export interface Break {
  id?: number;
  spectator: { id: number };
  rulesAnswers: RulesAnswers;
}
