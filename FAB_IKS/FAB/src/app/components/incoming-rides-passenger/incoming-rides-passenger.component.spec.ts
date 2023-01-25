import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingRidesPassengerComponent } from './incoming-rides-passenger.component';

describe('IncomingRidesPassengerComponent', () => {
  let component: IncomingRidesPassengerComponent;
  let fixture: ComponentFixture<IncomingRidesPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingRidesPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingRidesPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
