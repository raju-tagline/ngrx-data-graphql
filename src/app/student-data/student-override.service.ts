import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root',
})
export class StudentOverrideService extends DefaultDataService<any> {
  private url: string = environment.url;
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Student', http, httpUrlGenerator);
  }

  override getAll(): any {
    return this.http.get<any>(`${this.url}student/getStudentDetail`).pipe(
      map((data: any): any => {
        if (data && data.statusCode === 200) {
          const studentList = [data.data];
          return studentList;
        }
      })
    );
  }

  override update(studentData: any): Observable<any> {
    return this.http.put<any>(`${this.url}student/studentProfile`, {
      ...studentData.changes,
    });
  }
}
