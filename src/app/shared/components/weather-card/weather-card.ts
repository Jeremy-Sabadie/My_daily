import { Component, input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss'
})
export class WeatherCard {
  city = input.required<string>();
  temperature = input<number>(18);
  condition = input<string>('Partiellement nuageux');
}
