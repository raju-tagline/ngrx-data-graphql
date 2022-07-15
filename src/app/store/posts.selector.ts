import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GET_POSTS } from './posts.action';

export const get_post_select:any = createFeatureSelector<any>(GET_POSTS);

export const get_posts = createSelector(get_post_select, (state: any):any => {
  return state;
});
