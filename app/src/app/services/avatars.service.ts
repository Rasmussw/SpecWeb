import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AVATARS } from '../mock/mock-avatars';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class AvatarsService {
  private state = inject(StateService);

  constructor() {
    this.state.observe('avatars').subscribe((a) => console.log('avatars: ', a));
    this.getAllAvatars();
  }

  getAllAvatars() {
    this.state.set('avatars', AVATARS);
    return of(AVATARS);
  }
}
