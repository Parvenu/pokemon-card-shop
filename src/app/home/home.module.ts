import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CardEffects } from '../redux-store/effects/card.effect';
import { SharedModule } from '../shared/shared.module';
import { CardListComponent } from './card-list/card-list.component';
import { CardDetailDialogComponent } from './card-detail/card-detail.component';
import { FilterCardsComponent } from './filter-cards/filter-cards.component';
import { cardsFeature } from '../redux-store/reducers/card.reducer';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { FilterDataEffects } from '../redux-store/effects/filter-data.effect';
import { ShoppingCartEffects } from '../redux-store/effects/shopping-cart.effect';


const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    }
  ];

@NgModule({
    declarations:[
       HomeComponent,
       CardListComponent,
       CardDetailDialogComponent,
       FilterCardsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        EffectsModule.forFeature(CardEffects, FilterDataEffects, ShoppingCartEffects),
        StoreModule.forFeature(cardsFeature),
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule, HomeComponent],
    providers: []
  })
  export class HomeModule {}