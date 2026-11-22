import { Component, inject } from '@angular/core';
import { AuthService } from '@flight-demo/shared/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly auth = inject(AuthService);
}

export default App;
