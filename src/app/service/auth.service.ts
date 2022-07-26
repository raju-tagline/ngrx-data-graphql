import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.url;
  constructor(private http: HttpClient) {}

  /**
   * userLogin
   */
  public userLogin(login: any): Observable<any> {
    return this.http.post<any>(`${this.url}users/Login`, login);
  }
}
