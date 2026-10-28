import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyMantra } from './daily-mantra';

describe('DailyMantra', () => {
  let component: DailyMantra;
  let fixture: ComponentFixture<DailyMantra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyMantra],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyMantra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
