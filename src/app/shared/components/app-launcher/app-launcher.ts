import { Component } from '@angular/core';

@Component({
  selector: 'app-app-launcher',
  imports: [],
  templateUrl: './app-launcher.html',
  styleUrl: './app-launcher.scss'
})
export class AppLauncher {
  readonly apps = [
    { name: 'My Popote', icon: '🍲' },
    { name: 'ProductPulse', icon: '📊' },
    { name: 'Paperless', icon: '📄' },
    { name: 'Uptime Kuma', icon: '📡' }
  ];
}
