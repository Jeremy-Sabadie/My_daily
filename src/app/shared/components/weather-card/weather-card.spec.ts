import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCard } from './weather-card';

describe('WeatherCard', () => {
  let component: WeatherCard;
  let fixture: ComponentFixture<WeatherCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('city', 'Bordeaux');
    fixture.componentRef.setInput('latitude', 44.84);
    fixture.componentRef.setInput('longitude', -0.58);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
