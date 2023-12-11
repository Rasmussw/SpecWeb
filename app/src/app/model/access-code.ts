export interface AccessCode {
  id?: number;
  code: string | undefined;
  competition?: { id: number | null };
  spectator?: { id: number | null} ;
  activated: boolean;
}
