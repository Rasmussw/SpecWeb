import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'hf-nav-tabs',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './nav-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavTabsComponent {
  @Input() firstTabTitle: String | undefined;
  @Input() firstTabLink: String | undefined;
  @Input() secondTabTitle: String | undefined;
  @Input() secondTabLink: String | undefined;
}
