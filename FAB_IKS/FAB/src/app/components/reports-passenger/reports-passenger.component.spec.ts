import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPassengerComponent } from './reports-passenger.component';

describe('ReportsPassengerComponent', () => {
  let component: ReportsPassengerComponent;
  let fixture: ComponentFixture<ReportsPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
