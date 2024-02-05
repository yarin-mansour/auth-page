import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LOCALSTORAGE_TOKEN_KEY } from '../../app.config';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetResponse } from '../interfaces';

export const fakeLoginResponse: LoginResponse = {
  accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDcyNzE2NjgsImV4cCI6MTczODgwNzY2OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.DyU0UYXDbrkIV-mpGTfbss9_6WeuvER7odwGat_Ua9Y',
  refreshToken: {
    id: 1,
    userId: 2,
    token: 'someFakeToken',
    refreshCount: 2,
    expiryDate: new Date(),
  },
  tokenType: 'JWT'
}

export const fakeRegisterResponse: RegisterResponse = {
  status: 200,
  message: 'Registerd sucessfully'
}

export const fakeResetRespone: ResetResponse = {
    status: 200,
    email: 'some@email.com'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly nzMessageService: NzMessageService,
    private jwtService: JwtHelperService
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return of(fakeLoginResponse).pipe(
      tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
      tap(() => this.nzMessageService.success(`Welcome ${loginRequest.email}`))
    );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return of(fakeRegisterResponse).pipe(
      tap((res: RegisterResponse) => this.nzMessageService.success(`${registerRequest.username} created successfully`)),
    );
  }

  sendResetEmail(email: string): Observable<ResetResponse> {
    return of(fakeResetRespone).pipe(
      tap((res: ResetResponse) => this.nzMessageService.success(`Reset link sent!`)),
    );
  }

  logout(): Observable<void> {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    return of(void 0);
  }

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }
}