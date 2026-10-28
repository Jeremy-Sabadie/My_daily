import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AgendaEvent {
  id: string;
  title: string;
  start: string;
}

@Component({
  selector: 'app-daily-agenda',
  standalone: true,
  templateUrl: './daily-agenda.html',
  styleUrl: './daily-agenda.scss'
})
export class DailyAgenda implements OnInit {
  private readonly http = inject(HttpClient);

  readonly events = signal<AgendaEvent[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  private readonly today = new Date();

  private readonly todayKey = this.dateKey(this.today);

  readonly todayEvents = computed(() =>
    this.events()
      .filter(event => event.start.slice(0, 10) === this.todayKey)
      .sort((a, b) => a.start.localeCompare(b.start))
  );

  readonly upcomingEvents = computed(() => {
    const end = new Date(this.today);
    end.setDate(end.getDate() + 7);

    return this.events()
      .filter(event => {
        const day = event.start.slice(0, 10);
        return day > this.todayKey && day <= this.dateKey(end);
      })
      .sort((a, b) => a.start.localeCompare(b.start));
  });

  ngOnInit(): void {
    this.http.get<AgendaEvent[]>('/api/agenda').subscribe({
      next: events => {
        this.events.set(events);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  private dateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  time(start: string): string {
    return start.slice(11, 16);
  }

  dayLabel(start: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(new Date(`${start.slice(0, 10)}T12:00:00`));
  }
}
