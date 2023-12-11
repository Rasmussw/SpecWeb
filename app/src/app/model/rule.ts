import { RulesAnswers } from './rules-answers';

export interface Rule {
  id: number;
  level: number;
  ruleTxt: string;
  ruleImage: string;
  ruleVideo?: any;
  rulesAnswers: RulesAnswers[];
}
