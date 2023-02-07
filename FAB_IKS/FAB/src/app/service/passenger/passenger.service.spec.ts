import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let service: PassengerService;
  let httpController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],});
    service = TestBed.inject(PassengerService);
    httpController = TestBed.inject(HttpTestingController);
  }); 
  
  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return registered passenger', () => {
    const user = {
      name: 'ime',
      surname: 'prezime',
      profilePicture: 'slika',
      telephoneNumber: '0652780029',
      address: 'adresa',
      email: 'asd@gmail.com',
      password: 'sifra'
    }

    service.registerNewPassenger(user).subscribe(result => {
      expect(result).toBeTruthy();
      if (result) {
        expect(result.name).toEqual('ime');
        expect(result.surname).toEqual('prezime');
        expect(result.profilePicture).toEqual('slika');
        expect(result.telephoneNumber).toEqual('0652780029');
        expect(result.address).toEqual('adresa');
        expect(result.email).toEqual('asd@gmail.com');
      }
    })

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:8084/api/passenger'
    });
    req.flush(user);
  })
});
