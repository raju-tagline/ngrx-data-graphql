import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url: string = environment.url;
  constructor(private http: HttpClient) {}

  /**
   * studentData
   */
  public studentData() {
    return this.http.get<any>(`${this.url}student/getStudentDetail`);
  }
}
