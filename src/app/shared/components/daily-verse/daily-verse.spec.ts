import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyVerse } from './daily-verse';

describe('DailyVerse', () => {
  let component: DailyVerse;
  let fixture: ComponentFixture<DailyVerse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyVerse],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyVerse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
