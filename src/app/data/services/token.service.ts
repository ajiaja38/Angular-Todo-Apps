import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly router: Router) {}

  setToken(accessToken: string, refreshToken: string, url: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.router.navigateByUrl(url);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
