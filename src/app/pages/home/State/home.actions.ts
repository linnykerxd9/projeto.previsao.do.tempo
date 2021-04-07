import { Bookmark } from './../../../shared/models/bookmark.model';
import { createAction, props } from '@ngrx/store';

export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<{ query: string }>()
);
export const loadCurrentSuccess = createAction(
  '[Weather API] Load Current Success',
  props<{ entity: any }>()
);
export const loadCurrentWeatherById  = createAction(
  '[HOME] Load Current Weather By Id',
  props<{ id: string }>(),
);
export const loadCurrentFailed = createAction(
  '[Weather API] Load Current Failed'
);
export const toggleBookmarks = createAction(
  '[HOME] Toggle Bookmark',
  props<{ entity: Bookmark }>()
);
export const clearHomeState = createAction('[Home] Clear Home State');
