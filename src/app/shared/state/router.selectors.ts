import { RouterReducerState } from '@ngrx/router-store';
import { RouterState } from './router.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectorRouterReducerState = createFeatureSelector<RouterReducerState<RouterState>>('router');

export const selectorRouterState = createSelector(
  selectorRouterReducerState,
  (routerReducerState: RouterReducerState<RouterState>) => (routerReducerState && routerReducerState.state) || { },

);

export const selectRouterQueryParams = createSelector(
  selectorRouterState,
  (routerState: RouterState) => (routerState && routerState.queryParams) || {},
);
