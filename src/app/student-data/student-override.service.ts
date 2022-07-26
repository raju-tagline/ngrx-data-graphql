import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

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
}
