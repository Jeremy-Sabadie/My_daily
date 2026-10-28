import { Component, input, inject, signal, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss'
})
export class WeatherCard implements OnInit {
  city = input.required<string>();
  latitude = input.required<number>();
  longitude = input.required<number>();

  readonly weather = signal<{temperature: number; condition: string; icon: string} | null>(null);
  readonly error = signal(false);

  private readonly service = inject(WeatherService);

  ngOnInit(): void {
    this.service.getWeather(this.latitude(), this.longitude()).subscribe({
      next: data => this.weather.set(data),
      error: () => this.error.set(true)
    });
  }
}
