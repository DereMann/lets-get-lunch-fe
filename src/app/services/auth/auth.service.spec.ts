import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a user object with a valid username and password', () => {
    });
  });
});
