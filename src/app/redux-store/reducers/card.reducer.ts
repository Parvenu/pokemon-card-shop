import { createFeature, createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/shared/models/card.model';
import { CardsApiActions } from '../actions/card.action';
import {produce} from "immer"
 
export interface CardsState {
  cards: Card[];
  allLoaded: boolean;
}
 
const initialState: CardsState = {
  cards: [],
  allLoaded: false,
};
 
export const cardsFeature = createFeature({
  name: 'cards',
  reducer: createReducer(
    initialState,
    on(CardsApiActions.retrievedCardList, (state, { cards, page, allLoaded }) => {
        if(page && page > 1 ) {
            return {cards: state.cards.concat(cards), allLoaded}
        } else {
            return {cards: cards.concat([]), allLoaded}
        } 
    }),
    on(CardsApiActions.loadFilterdCards, (_state, { filters }) => {
        return _state
    }),
  ),
});
 
export const {
  name, // feature name
  reducer, // feature reducer
  selectCardsState, // feature selector
  selectCards, // selector for `books` property
  selectAllLoaded, // selector for `loading` property
} = cardsFeature