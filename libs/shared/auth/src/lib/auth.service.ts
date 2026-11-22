import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly username = signal('');

  login(username: string): void {
    this.username.set(username);
  }
}
