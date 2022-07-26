import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService extends EntityCollectionServiceBase<any> {
  constructor(
    entityCollectionServiceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Student', entityCollectionServiceElementsFactory);
  }
}
