import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingRidesDriverComponent } from './incoming-rides-driver.component';

describe('IncomingRidesDriverComponent', () => {
  let component: IncomingRidesDriverComponent;
  let fixture: ComponentFixture<IncomingRidesDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingRidesDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingRidesDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
