import { Component, OnInit, OnDestroy, signal } from '@angular/core';

interface Verse {
  text: string;
  reference: string;
}

@Component({
  selector: 'app-daily-verse',
  standalone: true,
  templateUrl: './daily-verse.html',
  styleUrl: './daily-verse.scss'
})
export class DailyVerse implements OnInit, OnDestroy {
  readonly verse = signal<Verse>({
    text: 'Chargement du verset…',
    reference: 'YouVersion'
  });

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    void this.loadVerse();
    this.timer = setInterval(() => void this.loadVerse(), 3_600_000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private async loadVerse(): Promise<void> {
    try {
      const response = await fetch('/api/verse', { cache: 'no-store' });
      if (!response.ok) throw new Error('API verset indisponible');

      const data: Verse = await response.json();
      if (data.text && data.reference) {
        this.verse.set({ text: data.text, reference: data.reference });
      }
    } catch (error) {
      console.error('Impossible de charger le verset quotidien', error);
    }
  }
}
