import { CounterService } from './../counter-service/counter.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, mergeMap, map, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterResolver implements Resolve<boolean> {
  constructor(private counterService: CounterService) {}
  resolve(): Observable<boolean> {
    return this.counterService.loaded$.pipe(
      mergeMap((loaded) => {
        if (loaded) {
          return of(true);
        }
        return this.counterService.getAll().pipe(
          map((res: any) => {
            return !!res;
          })
        );
      }),
      first()
    );
  }
}
