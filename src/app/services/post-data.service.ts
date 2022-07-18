import { gql, Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map } from 'rxjs';
import { Post } from '../model/post.model';

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
export class PostDataService extends DefaultDataService<Post> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private apollo: Apollo
  ) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): any {
    return this.apollo
      .watchQuery({
        query: GET_POSTS,
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res.data.posts.data;
        })
      );
  }
}
