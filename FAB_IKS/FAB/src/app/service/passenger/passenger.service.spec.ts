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
    const user = { //promeniti podatke
      name: 'Test',
      surname: 'Test',
      profilePicture: 'picture',
      telephoneNumber: '0652780029',
      address: 'Test',
      email: 'mail234@mail.com',
      password: 'Test1test'
    }

    service.registerNewPassenger(user).subscribe(result => {
      expect(result).toBeTruthy();
      if (result) {
        expect(result.name).toEqual('Test');
        expect(result.surname).toEqual('Test');
        expect(result.profilePicture).toEqual('picture');
        expect(result.telephoneNumber).toEqual('+0652780029');
        expect(result.address).toEqual('Test');
        expect(result.email).toEqual('mail234@mail.com');
      }
    })

    const req = httpController.expectOne({
      method: 'POST', //?
      url: 'http://localhost:8084/api/passenger'
    });
    req.flush(user);
  })
});
