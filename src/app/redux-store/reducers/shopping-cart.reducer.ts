import { createReducer, on } from '@ngrx/store';
import { ShoppingCartAction } from '../actions/shopping-cart.action';
import { CartItem, ShoppingCart } from '../../shared/models/shopping-cart.model';
import { produce } from 'immer';
import { Card, FOIL } from '../../shared/models/card.model';

export const initialState: ShoppingCart = { items: [] };

export const addItem = (shoppingCartState: ShoppingCart, { card, foil }: { card: Card; foil: FOIL }) => {
  const currentItemCount = getItemCount(shoppingCartState, { card, foil });
  if (currentItemCount === 0) {
    return addNewItem(shoppingCartState, { card, foil });
  }
  return changeItemCount(shoppingCartState, { card, foil, newCount: currentItemCount + 1 });
};

export const deleteItem = (shoppingCartState: ShoppingCart, { card, foil }: { card: Card; foil: FOIL }) => {
  const cartItems = shoppingCartState.items;
  const cardToUpdateIndex = cartItems.findIndex((ci) => ci.card.id === card.id && ci.foil === foil);
  const cardToUpdate = cartItems[cardToUpdateIndex];
  if (cardToUpdate === undefined) return shoppingCartState;
  const updatedCartItems = produce(cartItems, (draftState) => {
    draftState.splice(cardToUpdateIndex, 1);
  });
  return { ...shoppingCartState, items: updatedCartItems };
};

export const changeItemCount = (
  shoppingCartState: ShoppingCart,
  { card, foil, newCount }: { card: Card; foil: FOIL; newCount: number },
) => {
  const cartItems = shoppingCartState.items;
  const cardToUpdateIndex = cartItems.findIndex((ci) => ci.card.id === card.id && ci.foil === foil);
  const cardToUpdate = cartItems[cardToUpdateIndex];
  if (cardToUpdate === undefined) return shoppingCartState;
  if (newCount === 0) return deleteItem(shoppingCartState, { card, foil });
  const updatedCartItem: CartItem = produce(cardToUpdate, (draftState) => {
    draftState.count = newCount;
  });
  const updatedCartItems: CartItem[] = produce(cartItems, (draftState) => {
    draftState[cardToUpdateIndex] = updatedCartItem;
  });
  return { ...shoppingCartState, items: updatedCartItems };
};

function addNewItem(shoppingCartState: ShoppingCart, { card, foil }: { card: Card; foil: FOIL }) {
  const updatedCartItems: CartItem[] = produce(shoppingCartState.items, (draftState) => {
    draftState.push({ card, foil, count: 1 });
  });
  return { ...shoppingCartState, items: updatedCartItems };
}

function getItemCount(shoppingCartState: ShoppingCart, { card, foil }: { card: Card; foil: FOIL }): number {
  const cartItem = shoppingCartState.items.find((item) => item.card.id === card.id && item.foil === foil);
  return cartItem === undefined ? 0 : cartItem.count ?? 0;
}

export const shoppingCartReducer = createReducer(
  initialState,
  on(ShoppingCartAction.addItem, addItem),
  on(ShoppingCartAction.deleteItem, deleteItem),
  on(ShoppingCartAction.changeItemCount, changeItemCount),
  on(ShoppingCartAction.shoppingCartUpdated, (_state, {}) => {
    return _state;
  }),
);
