import { Component, OnDestroy, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeatherCard } from '../../shared/components/weather-card/weather-card';
import { NewsCard } from '../../shared/components/news-card/news-card';
import { DailyVerse } from '../../shared/components/daily-verse/daily-verse';
import { DailyMantra } from '../../shared/components/daily-mantra/daily-mantra';
import { DailyAgenda } from '../../shared/components/daily-agenda/daily-agenda';
import { AppLauncher } from '../../shared/components/app-launcher/app-launcher';
import { ServerStatus } from '../../shared/components/server-status/server-status';

@Component({
  selector: 'app-dashboard',
  imports: [
    DatePipe,
    WeatherCard,
    NewsCard,
    DailyVerse,
    DailyMantra,
    DailyAgenda,
    AppLauncher,
    ServerStatus
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnDestroy {
  readonly today = signal(new Date());

  private readonly clockInterval = setInterval(() => {
    this.today.set(new Date());
  }, 1000);

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  readonly weatherCities = [
    'Saint-Médard-en-Jalles',
    'Nérac'
  ];
}
