import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: any;

  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    console.log('connection');
  }
}
