import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  time: number = 0
  stringTime: BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  intervalId: any;


  get stringTime$() {
    return this.stringTime.asObservable();
  }
  startTimer(timeInSeconds: number) {
    this.time = timeInSeconds;
    this.intervalId = setInterval(() => {
      if (this.time > 0) {
        this.time--;
        const formattedTime =
          Math.floor(this.time / 60).toString().padStart(2, '0') +
          ':' +
          (this.time - Math.floor(this.time / 60) * 60).toString().padStart(2, '0');
        this.stringTime.next(formattedTime);
      } else {
        clearInterval(this.intervalId);
        console.log('Countdown finished!');
      }
    }, 1000);
  }
}
