import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPassengerComponent } from './favorites-passenger.component';

describe('FavoritesPassengerComponent', () => {
  let component: FavoritesPassengerComponent;
  let fixture: ComponentFixture<FavoritesPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
