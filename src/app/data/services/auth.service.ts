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

  loginUser(loginDto: LoginDto): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/auth/login`, loginDto);
  }

  refreshToken(): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/auth/refreshToken`, {
      refreshToken: localStorage.getItem('refreshToken'),
    });
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/auth/logout`, {
      body: { refreshToken: localStorage.getItem('refreshToken') },
    });
  }
}
