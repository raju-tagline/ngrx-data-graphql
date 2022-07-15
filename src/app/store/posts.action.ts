import { createAction, props } from '@ngrx/store';

export const GET_POSTS = 'posts';

export const GET_POSTS_DATA = '[ POSTS ] get posts page';
export const GET_POSTS_DATA_SUCCESS = '[ POSTS ] get posts success page';
export const GET_POSTS_DATA_FAIL = '[ POSTS ] get posts fail page';

export const get_Post = createAction(GET_POSTS_DATA);
export const get_Post_Success = createAction(
  GET_POSTS_DATA_SUCCESS,
  props<{ posts: any }>()
);
export const get_Post_Fail = createAction(
  GET_POSTS_DATA_FAIL,
  props<{ error: any }>()
);
