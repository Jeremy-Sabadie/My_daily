import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLauncher } from './app-launcher';

describe('AppLauncher', () => {
  let component: AppLauncher;
  let fixture: ComponentFixture<AppLauncher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLauncher],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLauncher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
