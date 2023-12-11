import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Rule } from '../../../model/rule';
import { map } from 'rxjs';
import { StateService } from '../../../services/state.service';
import { RuleService } from '../../../services/rule.service';
import { BreaksService } from '../../../services/breaks.service';
import { LevelResultComponent } from './level-result/level-result.component';
import { SpectatorService } from '../../../services/spectator.service';
import { Break } from '../../../model/break';

@Component({
  selector: 'hf-levels',
  standalone: true,
  imports: [CommonModule, RouterLink, LevelResultComponent],
  templateUrl: './levels.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent implements OnDestroy {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private ruleService: RuleService = inject(RuleService);
  private breakService: BreaksService = inject(BreaksService);
  private spectatorService: SpectatorService = inject(SpectatorService);
  private state: StateService = inject(StateService);

  selectedRule: Signal<Rule | undefined> = toSignal(
    this.state.observeClone('selectedRule'),
    {
      initialValue: {} as Rule,
    }
  );
  selectedRuleAnswerId: WritableSignal<number> = signal(0);
  hasMadeABreak = signal(false);
  spectatorId = this.state.observeClone('spectatorId');

  selectedRuleImageDecoded = '';
  specId = 0;
  breaks: Break[] = [];
  isButtonClicked = false;

  handleButtonClick(value: boolean) {
    this.isButtonClicked = value;
    this.hasMadeABreak.set(false);
  }

  constructor() {
    effect(() => console.log('selected rule', this.selectedRule()));

    // Saves the selected rule ID in state
    this.activatedRoute.paramMap
      .pipe(
        takeUntilDestroyed(),
        map((params) => Number(params.get('id')))
      )
      .subscribe((id) =>
        this.ruleService.findBySpectatorId(id).subscribe((rule) => {
          this.selectedRuleImageDecoded = atob(rule.ruleImage);
          if (rule.ruleImage !== null) {
            this.state.set('selectedRule', {
              ...rule,
              ruleImage: atob(rule.ruleImage),
            });
          } else {
            this.state.set('selectedRule', rule);
          }

          this.handleHasMadeBreak();
        })
      );
  }

  // inspired- using it in html to convert number to char
  // web: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
  protected readonly String = String;

  handleSelectedBreak(ruleAnswerId: number) {
    this.selectedRuleAnswerId.set(ruleAnswerId);
  }

  handleCreateBreak() {
    const newBreak = {
      id: 0,
      spectator: {
        id: this.state.getValue().spectatorId!,
      },
      rulesAnswers: {
        id: this.selectedRuleAnswerId(),
      },
    };
    console.log('newBreak før: ', newBreak);
    this.breakService.createBreak(newBreak).subscribe(() => {
      this.hasMadeABreak.set(true);
    });
  }

  handleHasMadeBreak() {
    this.spectatorService.getSpectatorID().subscribe((id) => {
      this.specId = id;
      this.breakService.getBreaksBySpectatorId(this.specId).subscribe((b) => {
        this.breaks = b;
        let ruleAnswers = this.state.getValue().selectedRule!.rulesAnswers;

        for (let b of this.breaks) {
          for (let ruleAnswer of ruleAnswers) {
            if (b.rulesAnswers.id === ruleAnswer.id) {
              console.log('already breaked');
              this.selectedRuleAnswerId.set(ruleAnswer.id);
              this.hasMadeABreak.set(true);
            }
          }
        }
      });
    });

    console.log('specId: ', this.specId);
    console.log('breaks[] length: ', this.breaks.length);
  }

  ngOnDestroy() {
    this.state.set('selectedRule', undefined);
  }
}
