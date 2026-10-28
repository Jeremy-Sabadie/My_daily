import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyAgenda } from './daily-agenda';

describe('DailyAgenda', () => {
  let component: DailyAgenda;
  let fixture: ComponentFixture<DailyAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyAgenda],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyAgenda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
