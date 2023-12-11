import {
  ChangeDetectionStrategy,
  Component,
  inject, OnInit,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from '../../model/competition';
import { RouterLink } from '@angular/router';
import { OrganizerService } from '../../services/organizer.service';
import { StateService } from '../../services/state.service';
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";
import {Observable} from "rxjs";

@Component({
  selector: 'hf-competition-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './competition-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionListComponent {
  private competitionService = inject(CompetitionService);
  private state = inject(StateService);

  constructor() {
    this.competitionService
      .getAllCompetitionsBySubID()
      .subscribe((c) => console.log(c));
    console.log('All competitions: ', this.allCompetitions);
  }

  allCompetitions: Signal<Competition[]> = toSignal(
    this.competitionService.getAllCompetitionsBySubID(),
    {
      initialValue: [] as Competition[],
    }
  );
}
