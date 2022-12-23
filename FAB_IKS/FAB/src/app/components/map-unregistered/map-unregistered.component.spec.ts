import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUnregisteredComponent } from './map-unregistered.component';

describe('MapUnregisteredComponent', () => {
  let component: MapUnregisteredComponent;
  let fixture: ComponentFixture<MapUnregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapUnregisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapUnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
