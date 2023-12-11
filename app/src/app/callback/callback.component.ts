import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hf-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallbackComponent {

}
