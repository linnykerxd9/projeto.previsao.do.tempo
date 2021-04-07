import { createReducer, Action, on } from '@ngrx/store';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

import * as fromHomeActions from '../../home/State/home.actions';
import * as fromBookmarksActions from './bookmarks.actions';
export interface BookmarkState {
  list: Bookmark[];
}

export const BookmarksInitialState: BookmarkState = {
  list: [],
};

const reducer = createReducer(
  BookmarksInitialState,
  on(fromHomeActions.toggleBookmarks, (state, { entity }) => ({
    ...state,
    list: toggleBookMark(state.list, entity)
  })),
  on(fromBookmarksActions.removeBookmarks, (state, { id }) => ({
    ...state,
    list: state.list.filter(b => b.id !== id)
  })),
  on(fromBookmarksActions.updateBookmarksList, (state, { list }) => ({
    ...state,
    list,
  })),
);

export function bookmarkReducer(state: BookmarkState | undefined, action: Action) {
  return reducer(state, action);
}

function toggleBookMark(list: Bookmark[], entity: Bookmark): Bookmark[] {
  if (!!list.find(bookmark => bookmark.id === entity.id)) {
    return list.filter(bookmark => bookmark.id === entity.id);
  }
  return [...list, entity];
  }
