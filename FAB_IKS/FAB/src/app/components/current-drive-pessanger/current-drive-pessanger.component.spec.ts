import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDrivePessangerComponent } from './current-drive-pessanger.component';

describe('CurrentDrivePessangerComponent', () => {
  let component: CurrentDrivePessangerComponent;
  let fixture: ComponentFixture<CurrentDrivePessangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDrivePessangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentDrivePessangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
