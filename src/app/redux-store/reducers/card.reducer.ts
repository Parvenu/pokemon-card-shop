import { createFeature, createReducer, on } from '@ngrx/store';
import { Card } from '../../shared/models/card.model';
import { CardsApiActions } from '../actions/card.action';
 
export interface CardsState {
  cards: Card[];
  allLoaded: boolean;
}
 
export const initialState: CardsState = {
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
  name,
  reducer,
  selectCardsState,
  selectCards,
  selectAllLoaded,
} = cardsFeature