import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, switchMap, catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface ServiceStatus {
  name: string;
  status: string;
}

@Component({
  selector: 'app-server-status',
  standalone: true,
  templateUrl: './server-status.html',
  styleUrl: './server-status.scss'
})
export class ServerStatus implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly services = signal<ServiceStatus[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    timer(0, 60000).pipe(
      switchMap(() =>
        this.http.get<ServiceStatus[]>('/api/status').pipe(
          catchError(() => of([
            { name: 'My Popote', status: 'Indisponible' },
            { name: 'ProductPulse', status: 'Indisponible' },
            { name: 'Paperless', status: 'Indisponible' },
            { name: 'Uptime Kuma', status: 'Indisponible' }
          ]))
        )
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(services => {
      this.services.set(services);
      this.loading.set(false);
    });
  }
}
