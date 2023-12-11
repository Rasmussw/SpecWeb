import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'hf-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent implements OnInit {
  private viewPortScroller = inject(ViewportScroller);
  ngOnInit(): void {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}
