import { Component } from '@angular/core';

@Component({
  selector: 'app-server-status',
  imports: [],
  templateUrl: './server-status.html',
  styleUrl: './server-status.scss'
})
export class ServerStatus {
  readonly services = [
    { name: 'My Popote', status: 'Démo' },
    { name: 'ProductPulse', status: 'Démo' },
    { name: 'Paperless', status: 'Démo' },
    { name: 'Uptime Kuma', status: 'Démo' }
  ];
}
