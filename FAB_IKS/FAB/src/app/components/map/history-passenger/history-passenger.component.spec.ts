import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPassengerComponent } from './history-passenger.component';

describe('HistoryPassengerComponent', () => {
  let component: HistoryPassengerComponent;
  let fixture: ComponentFixture<HistoryPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
