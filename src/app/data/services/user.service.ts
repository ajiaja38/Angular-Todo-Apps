import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../global/base-url';
import { RegisterDto } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  registerUser(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/user`, {
      ...registerDto,
      role: 'USER',
    });
  }

  getLoggedUser(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/user/logged/in`);
  }
}
