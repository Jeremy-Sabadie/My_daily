import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NewsArticle {
  category: string;
  title: string;
  description: string;
  url: string;
  date: string;
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss'
})
export class NewsCard implements OnInit {
  private readonly http = inject(HttpClient);

  readonly articles = signal<NewsArticle[]>([]);
  readonly error = signal(false);

  ngOnInit(): void {
    this.http.get<NewsArticle[]>('/api/news')
      .subscribe({
        next: articles => this.articles.set(articles),
        error: () => this.error.set(true)
      });
  }
}
