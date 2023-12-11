export interface RulesAnswers {
  id: number;
  answer?: string;
  correct?: boolean;
  point?: number;
  rule?: { id: number };
  explanation?: string;
}
