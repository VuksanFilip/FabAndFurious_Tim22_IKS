import { TestBed } from '@angular/core/testing';

import { DriverMockService } from './driver-mock.service';

describe('DriverMockService', () => {
  let service: DriverMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
