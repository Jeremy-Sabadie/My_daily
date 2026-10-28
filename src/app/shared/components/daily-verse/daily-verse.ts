import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-verse',
  imports: [],
  templateUrl: './daily-verse.html',
  styleUrl: './daily-verse.scss'
})
export class DailyVerse {
  readonly verse = {
    text: 'La vie est un voyage, et non une destination.',
    author: 'Citation de démonstration'
  };
}
