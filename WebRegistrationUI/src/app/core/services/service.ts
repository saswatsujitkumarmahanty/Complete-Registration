import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Signup, Login, AuthResponse } from '../models/auth';
import { environment } from '../../../environment/environment';
import { clearAuth, getAvatar } from '../utilities/storage.utilities';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/Auth`;

  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public userName$ = new BehaviorSubject<string>(
    'User'
  );

  public avatarUrl$ = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.isBrowser()) {
      this.userName$.next(localStorage.getItem('userName') || 'User');

      this.avatarUrl$.next(
        getAvatar(localStorage.getItem('userId'))
      );
    }
  }

  SetPassword(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.authUrl}/set-password`,
      payload
    );
  }

  LoginPassword(payload: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authUrl}/login-password`,
      payload
    );
  }

  signup(userData: Signup): Observable<any> {
    return this.http.post(
      `${this.authUrl}/signup`,
      userData
    );
  }

  login(credentials: Login): Observable<any> {
    return this.http.post(
      `${this.authUrl}/login`,
      credentials
    );
  }

  verifyOtp(
    verificationData: { email: string; otpCode: string }
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authUrl}/verify-otp`,
      verificationData
    );
  }

  updateUserName(
    id: string,
    name: string
  ): Observable<any> {
    return this.http.put(
      `${this.authUrl}/update-name/${id}`,
      { name }
    );
  }

  me(): Observable<{
    userId: string;
    email: string;
    name: string;
    role: string;
  }> {
    return this.http.get<{
      userId: string;
      email: string;
      name: string;
      role: string;
    }>(`${this.authUrl}/me`);
  }

  logout(): void {
    if (this.isBrowser()) {
      clearAuth();
      this.userName$.next('User');
      this.avatarUrl$.next(null);
      window.location.href = '/login';
    }
  }
}