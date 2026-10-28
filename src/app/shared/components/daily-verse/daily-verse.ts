import { Component, computed, signal } from '@angular/core';

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
export class DailyVerse {
  private readonly verses: Verse[] = [
    { text: 'L’Éternel est mon berger : je ne manquerai de rien.', reference: 'Psaume 23:1' },
    { text: 'Je puis tout par celui qui me fortifie.', reference: 'Philippiens 4:13' },
    { text: 'Ne crains point, car je suis avec toi.', reference: 'Ésaïe 41:10' },
    { text: 'Tout ce que vous faites, faites-le de bon cœur.', reference: 'Colossiens 3:23' },
    { text: 'La réponse douce calme la fureur.', reference: 'Proverbes 15:1' },
    { text: 'Il y a un temps pour tout.', reference: 'Ecclésiaste 3:1' },
    { text: 'Demandez, et l’on vous donnera ; cherchez, et vous trouverez.', reference: 'Matthieu 7:7' },
    { text: 'Que tout ce que vous faites se fasse avec charité.', reference: '1 Corinthiens 16:14' },
    { text: 'L’amour est patient, il est plein de bonté.', reference: '1 Corinthiens 13:4' },
    { text: 'La vérité vous affranchira.', reference: 'Jean 8:32' },
    { text: 'Heureux ceux qui procurent la paix.', reference: 'Matthieu 5:9' },
    { text: 'Fortifiez-vous et ayez du courage !', reference: 'Josué 1:9' }
  ];

  private readonly today = signal(new Date());

  readonly verse = computed(() => {
    const date = this.today();
    const day = Math.floor(
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
       Date.UTC(date.getFullYear(), 0, 1)) / 86400000
    );

    return this.verses[day % this.verses.length];
  });
}
