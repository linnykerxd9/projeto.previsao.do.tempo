
import { HomePage } from './container/home/home.page';
import { ComponentsModule } from './../../shared/components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { StoreModule } from '@ngrx/store';
import { homeReducer } from './State/home.reducer';
import { HomeEffects } from './State/home.effects';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { RouterModule } from '@angular/router';
import { UnitSelectorComponent } from './container/unit-selector/unit-selector.component';






@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),

  ],
  declarations: [
    HomePage,
    CurrentWeatherComponent,
    UnitSelectorComponent
  ]
})
export class HomeModule { }
