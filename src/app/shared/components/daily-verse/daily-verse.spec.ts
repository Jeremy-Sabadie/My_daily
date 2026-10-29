import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DailyVerse } from './daily-verse';

describe('DailyVerse', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should load the daily verse from the API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        text: 'Verset de test',
        reference: 'Jean 3:16'
      })
    });

    vi.stubGlobal('fetch', fetchMock);

    await TestBed.configureTestingModule({
      imports: [DailyVerse]
    }).compileComponents();

    const fixture = TestBed.createComponent(DailyVerse);
    fixture.detectChanges();
    await fixture.whenStable();
    await vi.waitFor(() => {
      expect(fixture.componentInstance.verse()).toEqual({
        text: 'Verset de test',
        reference: 'Jean 3:16'
      });
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/verse', {
      cache: 'no-store'
    });
    expect(fixture.componentInstance.verse()).toEqual({
      text: 'Verset de test',
      reference: 'Jean 3:16'
    });

    fixture.destroy();
  });
});
