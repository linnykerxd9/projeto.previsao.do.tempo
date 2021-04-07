import { HomeState } from './home.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const SelectorHomeState = createFeatureSelector('home');

export const SelectorCurrentWheater = createSelector(
  SelectorHomeState,
  (homeState: HomeState) => homeState.entity
);

export const SelectorCurrentWheaterLoading = createSelector(
  SelectorHomeState,
  (homeState: HomeState) => homeState.loading
);

export const SelectorCurrentWheaterError = createSelector(
  SelectorHomeState,
  (homeState: HomeState) => homeState.error
);
