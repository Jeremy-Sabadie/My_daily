import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-agenda',
  imports: [],
  templateUrl: './daily-agenda.html',
  styleUrl: './daily-agenda.scss'
})
export class DailyAgenda {
  readonly events = [
    { time: '09:00', title: 'Premier rendez-vous' },
    { time: '14:30', title: 'Deuxième rendez-vous' }
  ];
}
