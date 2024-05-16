import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map } from 'rxjs';
import { ShoppingCartAction } from '../actions/shopping-cart.action';

@Injectable()
export class ShoppingCartEffects {
  public updateShoppingCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingCartAction.addCard, ShoppingCartAction.removeCard),
      map(() => ShoppingCartAction.shoppingCartUpdated()),
    );
  });
  constructor(private actions$: Actions) {}
}
