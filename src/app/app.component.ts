import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public GET_POSTS = gql`
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
  title = 'ngrx-data';
  constructor(private apollo: Apollo) {
    this.getPosts().subscribe((resp:any) => {
      console.log('resp :>> ', resp);
    })
  }

  /**
   * getPosts
   */
  public getPosts(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.GET_POSTS,
    }).valueChanges;
  }
}
