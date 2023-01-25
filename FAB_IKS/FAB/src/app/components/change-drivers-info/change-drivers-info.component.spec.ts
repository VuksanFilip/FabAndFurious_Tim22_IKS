import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDriversInfoComponent } from './change-drivers-info.component';

describe('ChangeDriversInfoComponent', () => {
  let component: ChangeDriversInfoComponent;
  let fixture: ComponentFixture<ChangeDriversInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDriversInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDriversInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
