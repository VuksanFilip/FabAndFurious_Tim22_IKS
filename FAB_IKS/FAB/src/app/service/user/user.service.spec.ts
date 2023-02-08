import { NewOldPassword } from './../../model/User';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should update the password', () => {
    const id = 1;
    const changepassword: NewOldPassword = {
      newPassword: 'marko456',
      oldPassword: 'marko123',
    };

    userService.changePassword(id, changepassword).subscribe((res) => {
      expect(res).toBeFalsy(); //?
    });
    const req = httpMock.expectOne(
      environment.apiHost + 'api/user/' + id + '/changePassword'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(null);
  });

  it('should return users', () => {
    userService.getUsers().subscribe((users) => {
      expect(users).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(environment.apiHost + 'api/user');
    expect(req.request.method).toEqual('GET');
  });
});
