import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../interface';
import { Observable } from 'rxjs';
import { BASE_URL } from '../global/base-url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  loginUser(
    loginDto: LoginDto
  ): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${BASE_URL}/auth/login`,
      loginDto
    );
  }
}
