export interface Answer {
  id?: number;
  answer: String;
  correct: boolean
  quiz?: { id: number };
}
