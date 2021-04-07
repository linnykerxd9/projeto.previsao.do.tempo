import { Bookmark } from './../../../shared/models/bookmark.model';

import { createAction, props } from '@ngrx/store';


export const removeBookmarks = createAction(
  '[BookMarks] Remove BookMarks',
  props<{ id: number }>()
);

export const toggleBookmarksById = createAction(
  '[Bookmarks] Toggle Bookmarks by id',
  props<{ id: number }>(),
);

export const updateBookmarksList = createAction(
  '[Bookmarks] Update Bookmarks List',
  props<{ list: Bookmark[] }>(),
);
