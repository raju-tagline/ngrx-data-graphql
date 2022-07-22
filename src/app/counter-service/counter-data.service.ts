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
    return this.http.get<any>(`https://ngrx-332f4-default-rtdb.firebaseio.com/users.json`).pipe(
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
      .post<{ name: string }>(`https://ngrx-332f4-default-rtdb.firebaseio.com/users.json`, data)
      .pipe(
        map((resp: any) => {
          const updateData = {
            email: data && data.email ? data.email : '',
            address: data && data.address ? data.address : '',
            full_name: data && data.full_name ? data.full_name : '',
            gender: data && data.gender ? data.gender : '',
            userId: data && data.userId ? data.userId : '',
            id: resp && resp.name ? resp.name : '',
          };
          console.log('USER updateData :>> ', updateData);
          return updateData;
        })
      );
  }

  override update(user: any): Observable<any> {
    return this.http.put<any>(`https://ngrx-332f4-default-rtdb.firebaseio.com/users/${user.id}.json`, {
      ...user.changes,
    });
  }

  override delete(id: string): Observable<string> {
    return this.http.delete(`https://ngrx-332f4-default-rtdb.firebaseio.com/users/${id}.json`).pipe(
      map((data) => {
        return id;
      })
    );
  }
}
