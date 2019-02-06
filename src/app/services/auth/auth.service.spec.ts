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
      const user = { 'username': 'myUser', 'password': 'password' };
      const signupResponse = {
        '__v': 0,
        'username': 'myUser',
        'password': '$2a$10$oF7YW1FyOSW3Gw7G4ThbO.ibduCgF3U0gVI/GE9fKQcGtVEBs0B.2',
        '_id': '5a550ea739fbc4ca3ee0ce58',
        'dietPreferences': []
      };
      let response;

      authService.signup(user).subscribe(res => {
        response = res;
      });

      http.expectOne('http://localhost:8080/api/users').flush(signupResponse);
      expect(response).toEqual(signupResponse);
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = { username: 'myUser', password: 'pswd' };
      const signupResponse = 'Your password must be at least 5 characters long.';
      let errorResponse;
      authService.signup(user).subscribe(res => { }, err => {
        errorResponse = err;
      });
      http
        .expectOne('http://localhost:8080/api/users')
        .flush({ message: signupResponse }, { status: 400, statusText: 'Bad Request' });
      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();
    });
  });
});
