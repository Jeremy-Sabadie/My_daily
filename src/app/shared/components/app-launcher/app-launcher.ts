import { Component } from '@angular/core';

@Component({
  selector: 'app-app-launcher',
  imports: [],
  templateUrl: './app-launcher.html',
  styleUrl: './app-launcher.scss'
})
export class AppLauncher {
  readonly apps = [
    {
      name: 'My Popote',
      icon: '🍲',
      url: 'https://my-popote.duckdns.org/'
    },
    {
      name: 'ProductPulse',
      icon: '📊',
      url: 'https://my-popote.duckdns.org/productpulse/'
    },
    {
      name: 'Paperless',
      icon: '📄',
      url: 'https://my-paperless-vps.duckdns.org/'
    },
    {
      name: 'Uptime Kuma',
      icon: '📡',
      url: 'https://my-monitoring.duckdns.org/'
    }
  ];
}
