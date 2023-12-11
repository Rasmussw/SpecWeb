import { Quiz } from './quiz';
import { AccessCode } from './access-code';
import { Competition } from './competition';
import { Avatar } from './avatar';
import { Break } from './break';
import { Rule } from './rule';

export interface State {
  apiUrl?: string;
  competitions: [];
  currentCompetition: Competition | null;
  competitionId: number | undefined;
  organizerId: number | undefined;
  spectatorId: number | undefined;
  quizzes: Quiz[];
  accessCodes: AccessCode[];
  activatedQuiz: Quiz | null;
  // to check if you made a guess to an active quiz
  hasGuessed: boolean | undefined;
  guessMap: Map<number, string>;
  avatars: Avatar[];
  breaks: Break[];
  pointSum: number;
  rules: Rule[];
  selectedRule: Rule | undefined;
}
