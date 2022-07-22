import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): any {
    // return this.apollo
    //   .watchQuery({
    //     query: GET_POSTS,
    //   })
    //   .valueChanges.pipe(
    //     map((res: any) => {
    //       return res.data.posts.data;
    //     })
    //   );
    return this.http.get<any>(`https://ngrx-332f4-default-rtdb.firebaseio.com/posts.json`).pipe(
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
      .post<{ name: string }>(`https://ngrx-332f4-default-rtdb.firebaseio.com/posts.json`, data)
      .pipe(
        map((resp: any) => {
          const updateData = {
            title: data && data.title ? data.title : '',
            body: data && data.body ? data.body : '',
            userId: data && data.userId ? data.userId : '',
            id: resp && resp.name ? resp.name : '',
          };
          return updateData;
        })
      );
  }

  override update(post: any): Observable<any> {
    return this.http.put<any>(`https://ngrx-332f4-default-rtdb.firebaseio.com/posts/${post.id}.json`, {
      ...post.changes,
    });
  }

  override delete(id: string): Observable<string> {
    return this.http.delete(`https://ngrx-332f4-default-rtdb.firebaseio.com/posts/${id}.json`).pipe(
      map((data) => {
        return id;
      })
    );
  }
}
