import { ofType } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { get_Post_Success, GET_POSTS_DATA_SUCCESS } from './posts.action';
import { initialState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(get_Post_Success, (state: any, action: any) => {
    return {
      ...state,
      posts: action?.posts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
