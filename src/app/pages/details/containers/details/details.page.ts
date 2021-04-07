import { selectUnitConfig } from './../../../../shared/state/config/config.selectors';
import { Units } from './../../../../shared/models/units.enum';
import { CityDailyWeather } from './../../../../shared/models/weather.model';
import { Observable } from 'rxjs';
import { AppState } from './../../../../shared/state/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromDetailsAction from '../../state/details.actions';
import * as fromDetailsSelectors from '../../state/details.selectors';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';

@Component({
  selector: 'jl-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  unit$: Observable<Units>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(fromDetailsAction.loadWeatherDetails());

    this.details$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsEntity));
    this.loading$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsLoading));
    this.error$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsError));
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
  }

}
