import { createReducer, on } from '@ngrx/store';
import { ShoppingCartAction } from '../actions/shopping-cart.action';
import { CartItem, ShoppingCart } from '../../shared/models/shopping-cart.model';
import { produce } from 'immer';
import { Card, FOIL } from '../../shared/models/card.model';

export const initialState: ShoppingCart = { items: [] };

export const addCard = (shoppingCartState: ShoppingCart, { card, foil }: { card: Card; foil: FOIL }) => {
  const cartItems = shoppingCartState.items;
  const cartItemIndex = cartItems.findIndex((ci) => ci.card.id === card.id);
  let updatedCartItems: CartItem[] = produce(cartItems, (draftState) => {
    if (cartItemIndex === -1) {
      draftState.push({ card, foilCount: new Map().set(foil, 1) });
      return;
    }
    const cardCount = draftState[cartItemIndex].foilCount.get(foil);
    draftState[cartItemIndex].foilCount.set(foil, (cardCount ?? 0) + 1);
    return;
  });
  return { ...shoppingCartState, items: updatedCartItems };
};

export const removeCard = (shoppingCartState: ShoppingCart, { card, foil }: { card: Card; foil: FOIL }) => {
  const cartItems = shoppingCartState.items;
  const cartItemIndex = cartItems.findIndex((ci) => ci.card.id === card.id);
  let updatedCartItems: CartItem[] = produce(cartItems, (draftState) => {
    const cardToRemove = draftState[cartItemIndex];
    let foilCount = cardToRemove.foilCount.get(foil) ?? 0;
    if (foilCount > 0) {
      cardToRemove.foilCount.set(foil, --foilCount);
    }
    if (foilCount === 0) {
      cardToRemove.foilCount.delete(foil);
    }
    if (hasNoCard(cardToRemove)) {
      draftState.splice(cartItemIndex, 1);
    }
  });
  return { ...shoppingCartState, items: updatedCartItems };
};

function hasNoCard(card: CartItem): boolean {
  let res = true;
  for (const [, count] of card?.foilCount) {
    if (count > 0) res = false;
  }
  return res;
}

export const shoppingCartReducer = createReducer(
  initialState,

  on(ShoppingCartAction.removeCard, removeCard),
  on(ShoppingCartAction.addCard, addCard),
  on(ShoppingCartAction.shoppingCartUpdated, (_state, {}) => {
    return _state;
  }),
);
