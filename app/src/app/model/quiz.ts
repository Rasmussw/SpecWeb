import { Answer } from './answer';

export interface Quiz {
  id?: number;
  question?: string;
  time?: String;
  spectator?: { id?: number, username?: string, tokenId?: string, mail?: string,};
  competition?: { id: number };
  state?: { id: number };
  answers?: Answer[];
}
