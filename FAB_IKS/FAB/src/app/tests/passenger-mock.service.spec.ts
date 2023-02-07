import { TestBed } from '@angular/core/testing';

import { PassengerMockService } from './passenger-mock.service';

describe('PassengerMockService', () => {
  let service: PassengerMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
