import { GraphqlQueryService } from 'src/app/services/graphql-query.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { GET_POSTS_DATA, get_Post_Success } from './posts.action';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private graphqlQueryService: GraphqlQueryService
  ) {}

  loadPosts$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(GET_POSTS_DATA),
      exhaustMap((action: any): any => {
        return this.graphqlQueryService.getPosts().pipe(
          map((data: any) => {
            return get_Post_Success({ posts: data?.data?.posts?.data });
          })
        );
      })
    );
  });
}
