import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let passengerService: PassengerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PassengerService],
    });
    passengerService = TestBed.inject(PassengerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(passengerService).toBeTruthy();
  });

  it('should return passengers', () => {
    passengerService.getAllPassengers().subscribe((passengers) => {
      expect(passengers).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(environment.apiHost + 'api/passenger');
    expect(req.request.method).toEqual('GET');
  });

  it('should return registered passenger', () => {
    const user = {
      name: 'ime',
      surname: 'prezime',
      profilePicture: 'slika',
      telephoneNumber: '0652780029',
      address: 'adresa',
      email: 'asd@gmail.com',
      password: 'sifra',
    };

    passengerService.registerNewPassenger(user).subscribe((result) => {
      expect(result).toBeTruthy();
      if (result) {
        expect(result.name).toEqual('ime');
        expect(result.surname).toEqual('prezime');
        expect(result.profilePicture).toEqual('slika');
        expect(result.telephoneNumber).toEqual('0652780029');
        expect(result.address).toEqual('adresa');
        expect(result.email).toEqual('asd@gmail.com');
      }
    });

    const req = httpMock.expectOne(environment.apiHost + 'api/passenger');
    expect(req.request.method).toEqual('POST');

    req.flush(user);
  });
});
