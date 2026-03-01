import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

type Role = 'user' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:5000/api/auth';
  readonly user = signal<AuthUser | null>(this.getStoredUser());

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  register(payload: { name: string; email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.api}/register`, payload).pipe(tap((res) => this.setSession(res)));
  }

  login(payload: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.api}/login`, payload).pipe(tap((res) => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return this.user()?.role === 'admin';
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private setSession(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.user.set(data.user);
  }

  private getStoredUser(): AuthUser | null {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }
}
