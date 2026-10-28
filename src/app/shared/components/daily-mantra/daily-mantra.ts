import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-daily-mantra',
  standalone: true,
  templateUrl: './daily-mantra.html',
  styleUrl: './daily-mantra.scss'
})
export class DailyMantra {
  private readonly mantras = [
    'Chaque petit progrès me rapproche de mes objectifs.',
    'Je construis mon avenir, une étape à la fois.',
    'Aujourd’hui, je choisis d’avancer avec confiance.',
    'Ma persévérance est plus forte que mes difficultés.',
    'Je progresse à mon rythme, et chaque progrès compte.',
    'Je transforme mes idées en réalisations concrètes.',
    'Je peux être fier du chemin déjà parcouru.',
    'Chaque journée m’offre une nouvelle possibilité.',
    'Je concentre mon énergie sur ce que je peux accomplir.',
    'Je prends le temps nécessaire pour bien faire les choses.',
    'Mes efforts d’aujourd’hui préparent mes réussites de demain.',
    'Je cultive la curiosité, la patience et la détermination.'
  ];

  private readonly today = signal(new Date());

  readonly mantra = computed(() => {
    const date = this.today();
    const start = new Date(date.getFullYear(), 0, 1);
    const day = Math.floor(
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
       Date.UTC(start.getFullYear(), 0, 1)) / 86400000
    );
    return this.mantras[day % this.mantras.length];
  });
}
