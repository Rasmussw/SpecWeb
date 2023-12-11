import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarsService } from '../../../services/avatars.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { toSignal } from '@angular/core/rxjs-interop';

// By NorthTech, with our own adjustments and logic

@Component({
  selector: 'hf-avatars',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './avatars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsComponent implements OnInit, OnDestroy {
  private avatarService = inject(AvatarsService);
  private state: StateService = inject(StateService);

  //avatars = this.avatarService.getAllAvatars();
  avatars = this.state.observeClone('avatars');
  pointSum = toSignal(this.state.observeClone('pointSum'), {
    initialValue: 0 as number,
  });

  currentSlide = 0;
  avatarsSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  size: Observable<number> = this.avatarsSize.asObservable();
  destroy: Subject<unknown> = new Subject();

  ngOnInit(): void {
    this.avatars.subscribe((avatars) => {
      this.avatarsSize.next(avatars.length);
    });
    setInterval(() => this.onNextClick(), 10000);
  }

  onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.avatarsSize.value - 1 : previous;
  }

  onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.avatarsSize.value ? 0 : next;
  }

  changeSlide(index: number): void {
    this.currentSlide = index;
  }
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
