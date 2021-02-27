import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:3000/api/register"
  private loginUrl = "http://localhost:3000/api/login"

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user)
  }
}


