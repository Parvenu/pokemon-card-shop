import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { shoppingCartReducer } from './reducers/shopping-cart.reducer';
import { cardsFeature } from './reducers/card.reducer'

@NgModule({
  imports: [
    StoreModule.forRoot({shoppingCart: shoppingCartReducer}),
    EffectsModule.forRoot([]),
  ],
})
export class ReduxStoreModule {}