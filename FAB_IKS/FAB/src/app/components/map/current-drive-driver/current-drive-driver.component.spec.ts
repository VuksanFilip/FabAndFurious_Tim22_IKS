import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDriveDriverComponent } from './current-drive-driver.component';

describe('CurrentDriveDriverComponent', () => {
  let component: CurrentDriveDriverComponent;
  let fixture: ComponentFixture<CurrentDriveDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDriveDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentDriveDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
