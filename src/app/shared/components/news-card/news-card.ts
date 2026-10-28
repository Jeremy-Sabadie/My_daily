import { Component } from '@angular/core';

interface News {
  category: string;
  title: string;
  summary: string;
  source: string;
  image: string;
}

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss'
})
export class NewsCard {
  readonly articles: News[] = [
    {
      category: 'TECHNOLOGIE',
      title: "L'intelligence artificielle transforme nos usages",
      summary: "De nouveaux outils accompagnent les professionnels dans leurs activités quotidiennes.",
      source: 'Démonstration',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop'
    },
    {
      category: 'NATURE',
      title: 'Les Pyrénées au rythme des saisons',
      summary: 'Paysages, biodiversité et patrimoine naturel au cœur de nos montagnes.',
      source: 'Démonstration',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop'
    },
    {
      category: 'SCIENCES',
      title: 'Explorer les grandes découvertes de demain',
      summary: 'La recherche scientifique ouvre de nouvelles perspectives pour notre avenir.',
      source: 'Démonstration',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop'
    }
  ];
}
