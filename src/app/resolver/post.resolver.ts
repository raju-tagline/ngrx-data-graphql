import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first, map, mergeMap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<boolean> {
  constructor(private postService: PostService) {}

  resolve(): Observable<boolean> {
    return this.postService.loaded$.pipe(
      mergeMap((loaded) => {
        if (loaded) {
          return of(true);
        }
        return this.postService.getAll().pipe(
          map((res: any) => {
            return !!res;
          })
        );
      }),
      first()
    );
  }
}
