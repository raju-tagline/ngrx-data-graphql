import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class GraphqlQueryService {
  constructor(private apollo: Apollo) {}

  /**
   * getPosts
   */
  public getPosts(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_POSTS,
    }).valueChanges;
  }
}
