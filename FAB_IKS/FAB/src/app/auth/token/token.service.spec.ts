import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when token is not found', () => {
    localStorage.removeItem('user');
    const decodedToken = service.getDecodeAccessToken();
    expect(decodedToken).toBeNull();
  });

  it('should return the decoded access token (driver)', () => {
    const testToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8';
    localStorage.setItem('user', testToken);
    const decodedToken = service.getDecodeAccessToken();
    expect(decodedToken).toEqual({ role: [{ authority: 'DRIVER' }] });
  });
});
