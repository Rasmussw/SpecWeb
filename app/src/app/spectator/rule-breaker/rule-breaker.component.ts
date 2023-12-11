import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Avatar } from '../../model/avatar';
import { Break } from '../../model/break';
import { BreaksService } from '../../services/breaks.service';
import { AvatarsComponent } from './avatars/avatars.component';
import { RuleService } from '../../services/rule.service';
import { Rule } from '../../model/rule';

@Component({
  selector: 'hf-rule-breaker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AvatarsComponent],
  templateUrl: './rule-breaker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleBreakerComponent implements OnInit {
  private state: StateService = inject(StateService);
  private breakService: BreaksService = inject(BreaksService);
  private ruleService: RuleService = inject(RuleService);

  avatars = toSignal(this.state.observeClone('avatars'), {
    initialValue: [] as Avatar[],
  });
  breaks = toSignal(this.state.observeClone('breaks'), {
    initialValue: [] as Break[],
  });
  pointSum = toSignal(this.state.observeClone('pointSum'), {
    initialValue: 0 as number,
  });
  rules = toSignal(this.state.observeClone('rules'), {
    initialValue: [] as Rule[],
  });

  ngOnInit() {
    const spectatorId = this.state.getValue().spectatorId!;
    this.handleGetBreaks(spectatorId);
    //this.handleCalculatePointSum();
  }

  constructor() {
    //this.handleCalculatePointSum();
  }
  handleGetBreaks(spectatorId: number) {
    this.breakService
      .getBreaksBySpectatorId(spectatorId)
      .subscribe((breaks) => {
        this.state.set('breaks', breaks);
        console.log('getBreaks(): ', breaks);
        this.handleCalculatePointSum(breaks);
      });
  }
  //calculate breaks sum
  handleCalculatePointSum(breaks: Break[]) {
    let sum = 0;
    for (const b of this.breaks()) {
      console.log('point: ', b.rulesAnswers?.point!);
      sum += b.rulesAnswers?.point!;
    }

    this.state.set('pointSum', sum);
    console.log('point sum(): ', this.pointSum());
  }
}
