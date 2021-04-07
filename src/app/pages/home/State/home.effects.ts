import { CityWeather } from './../../../shared/models/weather.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as FromHomeActions from './home.actions';
import { WeatherService } from 'src/app/shared/services/wheater.service';

@Injectable()
export class HomeEffects {

  loadCurrentWeather = createEffect(() => this.actions$
    .pipe(
      ofType(FromHomeActions.loadCurrentWeather),
      mergeMap(({ query }) => this.weatherService.getCityWeatherByQuery(query)),
      catchError((err, caught$) => {
        this.store.dispatch(FromHomeActions.loadCurrentFailed());
        return caught$;
      }),
      map((entity: any) => FromHomeActions.loadCurrentSuccess({entity}))
    ),
  );
  loadCurrentWeatherById$ = createEffect(() => this.actions$
    .pipe(
      ofType(FromHomeActions.loadCurrentWeatherById),
      mergeMap(({ id }: { id: string }) =>
        this.weatherService.getCityWeatherById(id)
      ),
      catchError((err, caught$) => {
        this.store.dispatch(FromHomeActions.loadCurrentFailed());
        return caught$;
      }),
      map((entity: CityWeather) => FromHomeActions.loadCurrentSuccess({ entity })),
    ));

  constructor(private actions$: Actions,
              private store: Store,
              private weatherService: WeatherService) { }
}
