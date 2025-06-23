import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private baseUrl = 'http://localhost:5139/Auth';
    constructor(private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return from(axios.post<{ token: string }>(`${this.baseUrl}/login`, credentials).then(response => response.data));
  }

  //register a new user
  register(userData: any): Observable<any> {
    return from(axios.post(`${this.baseUrl}/register`, userData).then(response => response.data));
  }
  
  

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
