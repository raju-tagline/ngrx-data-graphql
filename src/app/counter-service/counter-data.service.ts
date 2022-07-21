import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterDataService extends DefaultDataService<any> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Users', http, httpUrlGenerator);
  }

  override getAll(): any {
    return this.http.get<any>(`${environment.url}users.json`).pipe(
      map((data: any) => {
        const posts: any[] = [];
        for (let key in data) {
          posts.push({ ...data[key], id: key });
        }
        return posts;
      })
    );
  }

  override add(data: any): Observable<any> {
    return this.http
      .post<{ name: string }>(`${environment.url}users.json`, data)
      .pipe(
        map((resp: any) => {
          const updateData = {
            email: resp.email,
            address: resp.address,
            full_name: resp.full_name,
            gender: resp.gender,
            userId: resp.userId,
            id: resp.name,
          };
          return updateData;
        })
      );
  }
}
