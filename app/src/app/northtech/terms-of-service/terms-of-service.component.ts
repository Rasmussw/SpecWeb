import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule, ViewportScroller} from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'hf-terms-of-service',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './terms-of-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfServiceComponent implements OnInit {
  private viewPortScroller = inject(ViewportScroller);
  ngOnInit(): void {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}
