import { ComponentsModule } from './../../shared/components/components.module';
import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';
import { DetailsEffects } from './state/details.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from './containers/details/details.page';
import { DetailsGuard } from './service/details.guard';
import { detailsReducer } from './state/details.reducer';



@NgModule({
  declarations: [
    DetailsPage,
    DailyWeatherComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: DetailsPage, canActivate: [DetailsGuard]
    }]),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    ComponentsModule
  ],
  providers: [
    DetailsGuard
  ]
})
export class DetailsModule { }
