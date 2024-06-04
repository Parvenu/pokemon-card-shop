import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { shoppingCartReducer } from './reducers/shopping-cart.reducer';
import { filterTypesReducer } from './reducers/filters-data.reducer';
import { filterReducer } from './reducers/filter.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      shoppingCart: shoppingCartReducer,
      filterTypes: filterTypesReducer,
      filters: filterReducer,
    }),
    EffectsModule.forRoot([]),
  ],
})
export class ReduxStoreModule {}
