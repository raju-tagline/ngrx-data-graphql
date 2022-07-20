import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const GET_POSTS = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CounterDataService extends DefaultDataService<any> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apollo: Apollo
  ) {
    super('Counter', http, httpUrlGenerator);
  }

  override getAll(): Observable<any[]> {
    return this.apollo
      .watchQuery({
        query: GET_POSTS,
      })
      .valueChanges.pipe(
        map((data: any) => {
          return data.data.posts.data;
        })
      );
  }
}
