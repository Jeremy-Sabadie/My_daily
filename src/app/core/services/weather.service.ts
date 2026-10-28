import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);

  getWeather(latitude: number, longitude: number) {
    return this.http.get<{
      current: {
        temperature_2m: number;
        weather_code: number;
      };
    }>('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,weather_code',
        timezone: 'Europe/Paris'
      }
    }).pipe(
      map(({ current }): WeatherData => ({
        temperature: Math.round(current.temperature_2m),
        ...this.describe(current.weather_code)
      }))
    );
  }

  private describe(code: number) {
    if (code === 0) return { condition: 'Ciel dégagé', icon: '☀️' };
    if (code <= 3) return { condition: 'Partiellement nuageux', icon: '⛅' };
    if (code <= 48) return { condition: 'Brouillard', icon: '🌫️' };
    if (code <= 67) return { condition: 'Pluie', icon: '🌧️' };
    if (code <= 77) return { condition: 'Neige', icon: '❄️' };
    if (code <= 82) return { condition: 'Averses', icon: '🌦️' };
    if (code <= 86) return { condition: 'Neige', icon: '❄️' };
    return { condition: 'Orages', icon: '⛈️' };
  }
}
