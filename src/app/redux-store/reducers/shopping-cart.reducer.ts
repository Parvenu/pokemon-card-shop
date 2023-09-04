import { createReducer, on } from '@ngrx/store'
import { ShoppingCartAction } from '../actions/shopping-cart.action'
import { CartItem, FoilCount, ShoppingCart } from '../../shared/models/shopping-cart.model'
import {produce} from 'immer'
import { Card, FOIL } from '../../shared/models/card.model';

export const initialState: ShoppingCart = {items: []};

export const addCard = (shoppingCartState: ShoppingCart, { card, foil }: { card: Card, foil: FOIL}) => {   
    const cartItems = shoppingCartState.items
    const cartItemIndex = cartItems.findIndex(ci => ci.card.id === card.id)
    let updatedCartItems: CartItem[]
    if (cartItemIndex !== -1) {
        const isNewFoil = cartItems[cartItemIndex].foilCount[foil] === undefined
        if(isNewFoil) {
            updatedCartItems = produce(cartItems, draftState => {
                draftState[cartItemIndex].foilCount[foil] = 1
            })
        } else {
            updatedCartItems = produce(cartItems, draftState => {
                draftState[cartItemIndex].foilCount[foil]++
            })
        }
    } else {
        updatedCartItems = produce(cartItems, draftState => {
            const foilCount = {[foil as keyof typeof FOIL] : 1} as FoilCount
            draftState.push({card, foilCount})
        })
    }
    return {...shoppingCartState, items: updatedCartItems}
}

export const removeCard = (shoppingCartState: ShoppingCart, { card, foil }: { card: Card, foil: FOIL}) => {
    const cartItems = shoppingCartState.items
    const cartItemIndex = cartItems.findIndex(ci => ci.card.id === card.id)
    let updatedCartItems: CartItem[] = produce(cartItems, draftState => {
        if (cartItemIndex !== -1 && cartItems[cartItemIndex].foilCount[foil] > 1) {
            draftState[cartItemIndex].foilCount[foil]--
        } else if (cartItems[cartItemIndex]?.foilCount[foil] === 1 && Object.keys(cartItems[cartItemIndex]?.foilCount).length > 1 ) {
            delete draftState[cartItemIndex].foilCount[foil]
        } else if (cartItems[cartItemIndex]?.foilCount[foil] === 1) {
            draftState.splice(cartItemIndex, 1)
        }
    })
    return {...shoppingCartState, items: updatedCartItems}
}

export const shoppingCartReducer = createReducer(
    initialState,
    
    on(ShoppingCartAction.removeCard, removeCard),
    on(ShoppingCartAction.addCard, addCard),
    on(ShoppingCartAction.shoppingCartUpdated, (_state, {}) => {
        return _state
    }),
  )