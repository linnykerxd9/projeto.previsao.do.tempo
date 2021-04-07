import { Units } from './../../../../shared/models/units.enum';
import { UnitSelectorComponent } from './../../container/unit-selector/unit-selector.component';

import { CityTypeaheadItem } from './../../../../shared/models/city-typeahead-item.model';
import { Bookmark } from './../../../../shared/models/bookmark.model';
import { CityWeather } from './../../../../shared/models/weather.model';
import { combineLatest, Observable, Subject, Subscriber } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComponentPortal, DomPortalOutlet, PortalOutlet } from '@angular/cdk/portal';
import * as fromHomeSelector from './../../State/home.selector';
import * as fromHomeActions from './../../State/home.actions';
import * as fromBookMarksSelector from '../../../bookmarks/state/bookmarks.selector';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jl-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather$: Observable<CityWeather>;
  cityWeather: CityWeather;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  bookmarksList$: Observable<Bookmark[]>;
  isCurrentFavorite$: Observable<boolean>;

  searchControl: FormControl;
  searchControlWithAutoComplete: FormControl;
  unit$: Observable<Units>;

  private portalOutlet: PortalOutlet;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }
  ngOnInit() {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutoComplete = new FormControl(undefined);

    this.searchControlWithAutoComplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherById({ id: value.geonameid.toString() }));
        }
      });

    this.cityWeather$ = this.store.pipe(select(fromHomeSelector.SelectorCurrentWheater));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.cityWeather = value);
    this.loading$ = this.store.pipe(select(fromHomeSelector.SelectorCurrentWheaterLoading));
    this.error$ = this.store.pipe(select(fromHomeSelector.SelectorCurrentWheaterError));

    this.bookmarksList$ = this.store.pipe(select(fromBookMarksSelector.selectBookmarksList));

    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarksList]) => {
          if (!!current) {
            return bookmarksList.some(bookmark => bookmark.id === current.city.id);
          }
          return false;
        }),
      );

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
    this.setupPortal();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
    this.portalOutlet.detach();
  }
  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather( {query}));
  }
  onToggleBookmark() {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmarks({ entity: bookmark }));
  }

  private setupPortal() {
    const el = document.querySelector('#navbar-portal-outlet');
    this.portalOutlet = new DomPortalOutlet(
      el,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
  }
}


