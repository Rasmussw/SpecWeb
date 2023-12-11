import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rule } from '../../../../model/rule';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hf-level-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './level-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelResultComponent {
  @Input() selectedRule: Rule | undefined;
  @Input() selectedRuleAnswerId: number | undefined;
  @Input() isButtonClicked: boolean | undefined;
  @Output() buttonClick = new EventEmitter<boolean>();

  onButtonClick() {
    this.isButtonClicked = true;
    this.buttonClick.emit(this.isButtonClicked);
  }
  protected readonly Number = Number;
}
