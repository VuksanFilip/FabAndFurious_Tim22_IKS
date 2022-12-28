import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRegisteredComponent } from './map-registered.component';

describe('MapRegisteredComponent', () => {
  let component: MapRegisteredComponent;
  let fixture: ComponentFixture<MapRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRegisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
