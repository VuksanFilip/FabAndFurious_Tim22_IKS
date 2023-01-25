import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPassengerComponent } from './notifications-passenger.component';

describe('NotificationsPassengerComponent', () => {
  let component: NotificationsPassengerComponent;
  let fixture: ComponentFixture<NotificationsPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
