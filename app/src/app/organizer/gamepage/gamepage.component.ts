import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StateService } from '../../services/state.service';
import { map } from 'rxjs';

@Component({
  selector: 'hf-gamepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gamepage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamepageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private state = inject(StateService);
  competitionId: WritableSignal<string | null> = signal(null);
  constructor() {
    // Saves the selected competition ID in state
    this.activatedRoute.paramMap
      .pipe(
        takeUntilDestroyed(),
        map((params) => Number(params.get('id')))
      )
      .subscribe((id) =>
        id ? this.state.set('competitionId', id) : this.competitionId.set(null)
      );
    // To see the competitionId in the console
    this.state
      .observe('competitionId')
      .subscribe((id) => console.log('compID : ', id));
  }
}
